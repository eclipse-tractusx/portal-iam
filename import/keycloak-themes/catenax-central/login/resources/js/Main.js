/********************************************************************************
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

const getNodeOrViewable = (c) => c.hasOwnProperty('view') ? c.view : c

const getTextNode = (c, tc) => document.createTextNode(tc === 'string' ? c : '' + c)

const append = (n, c) => {
    if (!(c instanceof Array)) c = [c]
    for (let i in c) {
        const tc = typeof c[i]
        if (tc !== 'undefined')
            try {
                n.appendChild(
                    tc === 'object'
                        ? getNodeOrViewable(c[i])
                        : getTextNode(c[i], tc)
                )
            } catch (e) {
                const pre = document.createElement('pre')
                pre.appendChild(document.createTextNode(JSON.stringify(c[i], null, 4)))
                n.appendChild(pre)
            }
    }
    return n
}

const N = (tag, c, att) => {
    const n = document.createElement(tag)
    if (att) for (let a of Object.keys(att)) n.setAttribute(a, att[a])
    if (typeof c === 'undefined' || c === null || c === false) return n
    return append(n, c)
}
const SEARCH_VALIDATION_REGEX =
  /^[a-zA-ZÀ-ÿŚął\d][a-zA-ZÀ-ÿŚął\d !#'$@&%()*+,\-_./:;=<>?[\]\\^]{0,255}$/

const remove = (n) => n.parentElement.removeChild(n)

const clear = (n) => {
  if (!n) return
  while (n.childNodes.length > 0) n.removeChild(n.firstChild)
  return n
}

const addEvents = (node, evts) => {
  Object.keys(evts).forEach((key) => node.addEventListener(key, evts[key]))
  return node
}

const escapeNames = (string) => string
    .split('\n')
    .map(line => line.match(/^\s+"name": "/)
        ? `"name": "${line.trim().substring(9, line.trim().length - 2).replaceAll('"', "\\\"")}",`
        : line
    )
    .join('\n')

const getSelectedIDP = (providers) => {
  let idp
  try {
      const params = new URLSearchParams(location.search)
      const redURI = params.get('redirect_uri')
      const redParams = new URLSearchParams(redURI.replace(/^[^?]+/,''))
      const alias = redParams.get('with_idp')
      idp = providers.filter(p => p.alias === alias)[0].name
  } catch (e) {
  }
  return idp || localStorage.getItem('IDP') || ''
}

function debounce(func, timeout = 220) {
  let timer
  return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), timeout)
  }
}

const processChange = debounce((e) => Selector.filter(e))

class Viewable {
  getView() {
      return this.view
  }

  append(p) {
      this.getView().appendChild(p instanceof HTMLElement ? p : p.getView())
      return this
  }

  appendTo(p) {
      (p instanceof HTMLElement ? p : p.getView()).appendChild(this.getView())
      return this
  }
}

class SearchInput extends Viewable {

  constructor(providers) {
      super()
      this.input = addEvents(
          N('input', null, {
              type: 'search',
              class: 'search',
              placeholder: 'Enter your company name',
              value: getSelectedIDP(providers),
          }),
          {
              keyup: (e) => processChange(e.target.value),
              search: (e) => processChange(e.target.value),
          }
      )
      this.view = N('div', this.input, { class: 'search-container' })
      this.view.firstChild.select()
  }

  focus() {
      this.input.focus()
      return this
  }
}

class SelectProvider extends Viewable {
  constructor(providers) {
      super()
      this.providers = providers
      this.view = N('div')
  }

  displayError(expr) {
      this.view.appendChild(
          N(
              'div',
              [
                  N('p', 'No results found for', { class: 'error-main' }),
                  N('p', `"${expr}"`, { class: 'error-subtitle' }),
                  N('p', 'Please check your entry for typing errors.', {
                      class: 'error-subtitle-2',
                  }),
                  addEvents(
                      N('button', [N('span', 'Show '), 'list of all companies again'], {
                          class: 'error-button',
                      }),
                      {
                          click: () => {
                              clear(this.view)
                              this.appendSearchResult(this.providers)
                          },
                      }
                  ),
              ],
              { class: 'error-container' }
          )
      )
  }

  appendSearchResult(filteredProviders) {
      this.view.appendChild(
          N(
              'ul',
              filteredProviders.map(
                  (p) =>
                      N(
                          'li',
                          addEvents(
                              N('a', [
                                  N('div', '', { class: `idp-main ${p.alias.replace(/-/g, '_')}` }),
                                  N('div', p.name, { class: 'idp-name' }),
                              ], {
                                  href: p.url.match(/^https?:\/\//)
                                      ? p.url
                                      : `${location.origin}${p.url}`,
                              }),
                              {
                                  click: () => {
                                      localStorage.setItem('IDP', p.name)
                                  },
                              }
                          ),
                          { class: 'idp-card' }
                      )
              )
          )
      )
  }

  filter(expr) {
      clear(this.view)

      expr = expr.trim()
      expr = expr || expr === ''
          ? expr.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
          : '.'

      if (expr && !SEARCH_VALIDATION_REGEX.test(expr)) {
          this.displayError(expr)
          return this
      }

      const filteredProviders = this.providers.filter((n) =>
          n.name.toLowerCase().match(expr?.toLowerCase())
      )

      if (filteredProviders.length === 0) {
          this.displayError(expr || ' ')
          return this
      }

      this.appendSearchResult(filteredProviders)

      return this
  }
}

class Page extends Viewable {
  constructor() {
      super()
      this.view = document.body
  }
}

class Header extends Viewable {
  constructor() {
      super()
      this.view = N(
          'header',
          [
              N('div', null, { class: 'logo' }),
              N('div', 'Search and select', { class: 'title' }),
              N('div', 'Search and select your company name to login', { class: 'subtitle' }),
              Search.getView()
          ]
      )
  }
}

class Footer extends Viewable {
  constructor() {
      super()
      this.view = N('footer', [
          N('div', '', { class: 'links' }),
          N('div', 'Copyright © Segittur', { class: 'copy' })
      ])
  }
}

class Main extends Viewable {
  constructor() {
      super()
      this.view = N('main', Selector.getView())
  }
}

let Search
let Selector

window.onload = () => {
    let icon = document.querySelectorAll('link[rel=icon]')[0]
    if (!icon) {
      icon = document.createElement('link')
      icon.rel = 'icon'
      document.head.appendChild(icon)
    }
    icon.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD39/f/9/f4//j4+P/5+fj/9fT3//f39//39/f/+Pj4//n5+P/4+Pj/6+v0/9/i8P/r7vT/9/f4//j4+P/39/f/+/v8//z8/P/7+vz/08D1/8268v/9/vz//Pz8//Tz+v/s6/n/9fT6//z8/P/2+Pr/4ur1/+Lr9f/5+vv//Pz8///////+/f7/0Lf3/4lN8f+4mvL/3dL4/9vS9//Buvf/hX70/8HA9//V2vn/1d76//v9/v/q8fn/3uv4//v9/v//////7un3/7CC8f+DPvP/lGPz/4hf8/+6p/T/ta33/29n9v+1tPf/q7b4/2yH9/+0x/j/+fv+/+Tw+v/l8Pr/+fb8/+bd8/+/lvb/hD/0/4JI9v+HW/T/0cT1/7Wu+P9waff/trX4/8XO+f9ohvj/YIr3/7nP+P/8/v7/1+n5/+3j9v/y6/j/wZn3/4M+9P+FT/T/x7P1//z8/v+0rPf/cGn2/7W0+P/7/P7/tcb4/1uI+f9snff/6/L8/+by+//k1vP/+vf8/8CZ9/+CPPT/oHTz//j1/P//////s6z3/3Bp9v+1tPf////+//P2/f99ofn/UYz4/8PZ+f/1+/7/5NLy//38/f/AmPf/gjvz/7iY8/////7////+/7Os9/9wafb/tbT3/////v/+////mLf6/0uI+v+oyPn/+v3+/+TT8//9/P3/w5/3/4I78/+3lvP////+/////v+zrPf/cGn2/7W09////////v///5e2+v9KiPr/n8T4//j9/v/m2fT/+vf7/9a/+f+FQvP/nnDy//Xx/P////7/s6z3/3Bp9v+0tPf//////+7z/f93nfj/S4n6/5/E+f/y+fz/7uf3/+/p9//z7f3/m2b0/4RK9f+/pvT/+vj9/7Ss+P9wafb/tbT3//b4/v+kufn/XIf4/06K+v+gxfj/4/H6//v5/f/n3vP//f39/9TA+f+KVPT/glb0/8q89f+1rvf/cGn2/7a19/+9x/n/Y4H4/1mF+v9Pivr/msH3/9fp+P//////8ez5/+3n9//9/P7/z7v4/41n8/+6qPT/s632/21n9v+1s/f/rLj3/3eO9P90m/f/Ton5/4a09f/q8/r///////7+///t6Pb/7+v3//7+/v/p4fv/5Nz4/8bC+P+QivT/x8b3/97i+f/j5/r/n7z5/2WX9v/J3Pr//v///////////////v7///Ht+P/s6PX/+Pf7/////v/8/P7/9/f+//v8/v///////////8jZ+f/V4vv/////////////////////////////////+Pf8/+7p9v/08fn/////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='
    const CX_PROVIDERS = JSON.parse(
        escapeNames(
            [...document.getElementById('providers').childNodes].map(n => n.data).join('')
        )
    ).slice(0,-1)
    while (document.body.childNodes.length > 0) {
      document.body.removeChild(document.body.firstChild)
    } 
    Search = new SearchInput(CX_PROVIDERS)
    Selector = new SelectProvider(CX_PROVIDERS)
    new Page()
      .append(new Header())
      .append(new Main())
      .append(new Footer())
    Selector.filter(Search.focus().input.value)
}
