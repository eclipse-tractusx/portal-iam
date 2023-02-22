/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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
  /^[a-zA-Z][a-zA-Z0-9 !#'$@&%()*+,\-_./:;=<>?[\]\\^]{0,255}$/

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
              N('div', 'your company name to login', { class: 'subtitle' }),
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
          N('div', 'Copyright © Catena-X Automotive Network.', { class: 'copy' })
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
    icon.href = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABT1JREFUaEPlWT1MY0cQ/ubZkEhJ4TRJS9oIg9FhpFSBpDgp8SNcF0xxRkkPaS8Fpri0QJ8I7iTs64AzKZNAFQkjYWyU9qBMmoCUSLnEZqJ9frbfz+6+fTa6QLKlPW9nvtnZ+WZmCQMu3kQKr2EFQAGECZrH+YBbxvqcYkkHhLmMaTA2AYw4fxFmaB4Hg+wZ99u+AXAJawCWfQrvAgA3ZH4EkAl5604AKGELwEPpUd8RAC+6MR9EcUcAsPKi/R8B7PyUGUkmmw+JaITZzWbAJZgOmi1r78H7NW1ajpWFeBsZEE5u4gSE4UNDrRVmFCJS567FrdVPpn6uyeSMAXAZK2AUtcoMQmjnJJNKNFsrFEzBUQTAtGxP1TfC1y7iQy5jxCWr6SgdILyrY+Lvjt7LsJXY8YRK5JZeASJs5SYbi77fdDvwNpZAjtdTBpquKK+Wq1RHVwDSn6CBEhBv2JNnXQKVhpBDVq9jDdHx2VPJWKQFhyN8S3j9mpKbAIeJz8RgqQzP2Nkzp2QJAdAyrVzhlSjkKI/d4N+Vo7ElEK/3baf6wwM725gJAejD+EMQCsG4b6fGlijyou9Nz8hDAjlOYPAcgA90wIeH6Z374/VffSfAJQhvLRl4THi9SHlH3rdcr5veGzBwRYSCPdnwnWDlKL0FUpQsQqNFs/a9eqULwC2NRZEWtU5BmAt5/SSTSjYdrwvvGS0C9v5OJgoPJmqXsg8qx+kaGOOy/wg0n8vWn3kB7ILxqVYzY5UWwlxQOU7PuanWJFs5XrdAxVy2rr0flePRdTDJI8LlBQcAP8UbSOL3CONDWUaQUlyvAzhsNhOFYIng8I3IKp6OrlIdKwIsur3QYvDXs9mzr9oASvgQwPcaABuU9zcvleroNBFtmpKSzutccsJOhF+K8r3MaA7gGT7DNcpKAC/xFi2iG6fPq+m1WKUA4dS6bhWC9Yyb9Xz3pj8AZXwOxjdSAIQ9mu9dzP3q2DKDRTtpuGjVztZDDOz1unej/gBs4zEIj6QWBS5upTp2YsSqeq+LuPb3067yVwAgrW5oOh4g3mgmksVgegxNMSQe+5cB0AVwXejUKV77pFOMWwWA8aQ5lFgOeb3dBImLalLMnVK+J2eehWLdAX8IqUoBJz2bNEG+Y/IT5X41vcuQkyuBvshl69+2eaBPAKpSwG2Cdgy93oHg4xqXJH9TpTpfKREXgPA6GMuzU41Q/R+zCRL2SctxbRkBIGHRRx/fq/8Q+wREg/JXa/hSWgq056TmJTRhD3+i4CVJgej5UbpA7XujXMPD9Ob98fofHQCPQHiskA6VEUE5FSlp9A/UBInQzWUbTtXbBqAvJWqUx4TMGFkpYEDPN9AEBVpKLsEWJ6dRvk55fBnI690CzMDoTqwP3gTJmnp+ireRxC8RhogmunNpxTDKPNaBG2qC6KKZtDJeruk1NCXnYULbhxp62i92Q00QCKfNRGI6SJReACIkRO6+qXUqxjK0gNBI0CTLeI3QtZ7Bpl49+48DS+H1zhb7x+kXJo2QSesZngsNFkoX7phF+U7mjlzEG4N+Kcrx4Efyydw2iiDn5THO2sBLFIOkFNxAtKIARUw/5E2QzBjldNoZpVsoRk4qAGleVyGPAmBxa0I1So8FoCPsFmZzIOdJVYxNUiCc4xo1WDiI+6waBcDONoxH/l0mjhMng8r+xwHQhZ2ttx/NDVes4zLcUyumPQHGE3uqEfXk5Nv/9gBQMG2U024HgECBFmV0gKXjiA8u6w8h9RTDVNMrPwH3lfKciLdksyNTwzty/wATsrFPLbsvywAAAABJRU5ErkJggg=='
    const CX_PROVIDERS = JSON.parse(document.getElementById('providers').firstChild.data).slice(0,-1)
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
