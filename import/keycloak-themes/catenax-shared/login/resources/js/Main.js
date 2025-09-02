/********************************************************************************
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

const remove = (n) => {
    try {
        n.parentElement.removeChild(n)
    } catch (e) {
        // ignore
    }
    return n
}

const clear = (n) => {
    if (!n) return
    while (n.childNodes.length > 0) n.removeChild(n.firstChild)
    return n
}

const wrap = (c, p) => {
    const parent = c.parentElement
    parent.insertBefore(p, c)
    parent.removeChild(c)
    p.appendChild(c)
    return c
}

const addEvents = (node, evts) => {
    Object.keys(evts).forEach((key) => node.addEventListener(key, evts[key]))
    return node
}

class State {

    atts = {
        username: undefined,
        password: undefined,
        confirm: undefined,
        valid: [false],
    }

    listener = {
        username: [],
        password: [],
        confirm: [],
        valid: []
    }

    static getInstance() {
        return State.instance ?? (State.instance = new State())
    }

    addListener(att, listener) {
        if (Array.isArray(listener))
            this.listener[att].push(...listener)
        else
            this.listener[att].push(listener)
        return this
    }

    setValue(att, value) {
        if (this.atts[att] === value) {
            return
        }
        this.atts[att] = value
        this.listener[att].forEach((listener) => listener[`${att}Changed`](value))
        return this
    }

    addPasswordListener(listener) { this.addListener('password', listener) }

    addConfirmListener(listener) { this.addListener('confirm', listener) }

    addValidListener(listener) { this.addListener('valid', listener) }

    setUsername(value) { this.setValue('username', value) }

    setPassword(value) { this.setValue('password', value) }

    setConfirm(value) { this.setValue('confirm', value) }

    setValid(value) { this.setValue('valid', value) }

}

const Messages = {
    en: {
        OK_LENGTH: 'has a minimum length of 15 characters',
        HAS_LOWER: 'contains lower case characters [a-z]',
        HAS_UPPER: 'contains upper case characters [A-Z]',
        HAS_NUMBER: 'contains numbers [0-9]',
        HAS_SPECIAL: 'contains characters other than [a-z] [A-Z] [0-9]',
        OK_CONFIRM: 'confirmation and password are equal',
    }
}


class Validator {

    rules = [
        ['OK_LENGTH', /^.{15,200}$/],
        ['HAS_LOWER', /[a-z]/],
        ['HAS_UPPER', /[A-Z]/],
        ['HAS_NUMBER', /\d/],
        ['HAS_SPECIAL', /[^a-zA-Z0-9]/],
        ['OK_CONFIRM', (expr) => expr !== '' && expr === State.getInstance().atts.confirm],
    ]

    static getInstance() {
        return Validator.instance ?? (Validator.instance = new Validator())
    }

    constructor() {
        this.state = State.getInstance()
        this.state.addPasswordListener(this)
        this.state.addConfirmListener(this)
    }

    passwordChanged(value) {
        this.password = value
        this.checkValid()
    }

    confirmChanged(value) {
        this.confirm = value
        this.checkValid()
    }

    checkRule(rule) {
        const check = rule[1]
        if (check instanceof RegExp)
            return !!this.password.match(check)
        else if (check instanceof Function)
            return check(this.password)
        return false
    }

    checkValid() {
        this.state.setValid(
            this.rules.map(this.checkRule.bind(this))
        )
    }

}

class Viewable {

    constructor(view) {
        this.view = view
    }

    getView() {
        return this.view
    }

    append(c) {
        append(this.getView(), c)
        return this
    }

    appendTo(p) {
        append(p, this.getView())
        return this
    }

    detach() {
        remove(this.view)
        return this
    }

    clear() {
        clear(this.view)
        return this
    }

}

class Card extends Viewable {

    constructor(name) {
        super(
            addEvents(
                N('div',
                    [
                        N('div',
                            N('div', 'switch company', { class: 'switch' }),
                            { class: 'overlay' }
                        ),
                        N('div', null, { class: 'card-image' }),
                        N('div', name, { class: 'card-name' }),
                    ], { class: 'card' }
                ),
                {
                    click: (e) => {
                        e.preventDefault()
                        history.back()
                    }
                }
            )
        )
    }

}

class Form extends Viewable {

    static fromPage() {
        try {
            const form = document.getElementsByTagName('form').item(0)
            switch (form.id) {
                case 'kc-form-login': return new FormLogin(form)
                case 'kc-passwd-update-form': return new FormUpdate(form)
                case 'kc-reset-passwd-form': return new FormReset(form)
            }
        } catch (e) {
            return null
        }
    }

    constructor(form) {
        super(form)
    }

    appendPasswordButton(password) {
        const toggle = addEvents(
            N('div', null, { class: 'hidden' }),
            {
                click: ((e) => {
                    e.preventDefault()
                    const input = e.currentTarget.previousSibling
                    const isHidden = input.getAttribute('type') === 'password'
                    input.setAttribute('type', isHidden ? 'text' : 'password')
                    e.currentTarget.className = isHidden ? 'visible' : 'hidden'
                })
            }
        )
        const wrapper = N('div', null, { class: 'pwwrapper' })
        wrap(password, wrapper)
        wrapper.appendChild(toggle)
        return this
    }

}

class FormLogin extends Form {

    constructor(form) {
        super(
            N('div', [
                N('h3', 'Login to Segittur'),
                form
            ])
        )
        setTimeout((() => {
            this.appendPasswordButton(document.getElementById('username'))
            this.appendPasswordButton(document.getElementById('password'))
            document.getElementById('username').focus()
        }), 300)
    }

}

class PasswordPolicyHint extends Viewable {

    constructor() {
        super(
            N('ul', null, { class: 'password-policy-hint' })
        )
        this.hints = Validator.getInstance().rules.map(rule => N('li', Messages.en[rule[0]]))
        this.append(this.hints)
        State.getInstance().addValidListener(this)
    }

    validChanged(valid) {
        valid.forEach((v, i) => this.hints[i].className = v ? 'valid' : 'invalid')
    }

}

class FormUpdate extends Form {

    constructor(form) {
        super(
            N('div', [
                N('h3', 'Update your password'),
                N('p', 'Enter a new login password and confirm it.'),
                form
            ])
        )
        this.form = form
        State.getInstance().addValidListener(this)

        setTimeout((() => {
            const password = document.getElementById('password-new')
            this.setItems()
                .appendPasswordButton(
                    addEvents(
                        password,
                        {
                            'keyup': (e) => this.checkPolicy('password', e.currentTarget.value),
                            'focus': (e) => this.checkPolicy('password', e.currentTarget.value),
                        }
                    )
                )
                .appendPasswordButton(
                    addEvents(
                        document.getElementById('password-confirm'),
                        {
                            'keyup': (e) => this.checkPolicy('confirm', e.currentTarget.value),
                            'focus': (e) => this.checkPolicy('confirm', e.currentTarget.value),
                        }
                    )
                )
            password.focus()
        }), 300)
    }

    setItems() {
        const items = [...document.querySelectorAll('#kc-passwd-update-form>div')]
        this.section = {
            password: items[0],
            confirm: items[1],
            submit: items[2],
            policy: new PasswordPolicyHint().getView(),
        }
        this.button = document.querySelectorAll('input[type=submit]')[0]
        this.button.setAttribute('disabled', '')
        State.getInstance().setUsername(document.getElementById('username')?.value ?? '')
        Validator.getInstance()
        return this
    }

    checkPolicy(att, value) {
        this.form.insertBefore(remove(this.section.policy), this.section.submit)
        State.getInstance().setValue(att, value)
    }

    validChanged(valid) {
        if (valid.reduce((a, o) => a && o))
            this.button.removeAttribute('disabled')
        else
            this.button.setAttribute('disabled', '')
    }

}

class FormReset extends Form {

    constructor(form) {
        super(
            N('div', [
                N('h3', 'Reset your password'),
                N('p', 'Enter your username or email address.'),
                form
            ])
        )
    }

}

class Section extends Viewable {

    constructor() {
        super(
            N('section',
                N('div', [
                    N('div', null, { class: 'user-icon' }),
                ], { class: 'section-header' })
            )
        )
    }

}

class App extends Viewable {

    constructor(clear) {
        super(document.body)
        this.setIcon()
        if (clear)
            this.clear()
    }

    setIcon() {
        let icon = document.querySelectorAll('link[rel=icon]')[0]
        if (!icon) {
            icon = document.createElement('link')
            icon.rel = 'icon'
            document.head.appendChild(icon)
        }
        icon.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD39/f/9/f4//j4+P/5+fj/9fT3//f39//39/f/+Pj4//n5+P/4+Pj/6+v0/9/i8P/r7vT/9/f4//j4+P/39/f/+/v8//z8/P/7+vz/08D1/8268v/9/vz//Pz8//Tz+v/s6/n/9fT6//z8/P/2+Pr/4ur1/+Lr9f/5+vv//Pz8///////+/f7/0Lf3/4lN8f+4mvL/3dL4/9vS9//Buvf/hX70/8HA9//V2vn/1d76//v9/v/q8fn/3uv4//v9/v//////7un3/7CC8f+DPvP/lGPz/4hf8/+6p/T/ta33/29n9v+1tPf/q7b4/2yH9/+0x/j/+fv+/+Tw+v/l8Pr/+fb8/+bd8/+/lvb/hD/0/4JI9v+HW/T/0cT1/7Wu+P9waff/trX4/8XO+f9ohvj/YIr3/7nP+P/8/v7/1+n5/+3j9v/y6/j/wZn3/4M+9P+FT/T/x7P1//z8/v+0rPf/cGn2/7W0+P/7/P7/tcb4/1uI+f9snff/6/L8/+by+//k1vP/+vf8/8CZ9/+CPPT/oHTz//j1/P//////s6z3/3Bp9v+1tPf////+//P2/f99ofn/UYz4/8PZ+f/1+/7/5NLy//38/f/AmPf/gjvz/7iY8/////7////+/7Os9/9wafb/tbT3/////v/+////mLf6/0uI+v+oyPn/+v3+/+TT8//9/P3/w5/3/4I78/+3lvP////+/////v+zrPf/cGn2/7W09////////v///5e2+v9KiPr/n8T4//j9/v/m2fT/+vf7/9a/+f+FQvP/nnDy//Xx/P////7/s6z3/3Bp9v+0tPf//////+7z/f93nfj/S4n6/5/E+f/y+fz/7uf3/+/p9//z7f3/m2b0/4RK9f+/pvT/+vj9/7Ss+P9wafb/tbT3//b4/v+kufn/XIf4/06K+v+gxfj/4/H6//v5/f/n3vP//f39/9TA+f+KVPT/glb0/8q89f+1rvf/cGn2/7a19/+9x/n/Y4H4/1mF+v9Pivr/msH3/9fp+P//////8ez5/+3n9//9/P7/z7v4/41n8/+6qPT/s632/21n9v+1s/f/rLj3/3eO9P90m/f/Ton5/4a09f/q8/r///////7+///t6Pb/7+v3//7+/v/p4fv/5Nz4/8bC+P+QivT/x8b3/97i+f/j5/r/n7z5/2WX9v/J3Pr//v///////////////v7///Ht+P/s6PX/+Pf7/////v/8/P7/9/f+//v8/v///////////8jZ+f/V4vv/////////////////////////////////+Pf8/+7p9v/08fn/////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='
        return this
    }

}

class Header extends Viewable {

    constructor(title) {
        super()
        this.view = N(
            'header',
            [
                N('div', null, { class: 'logo' }),
                N('div', '', { class: 'title' }),
                N('div', 'Login', { class: 'subtitle' }),
            ]
        )
    }

}

class Main extends Viewable {

    constructor() {
        super(N('main'))
    }

}

class Footer extends Viewable {

    constructor() {
        super(
            N('footer', [
                N('div', '', { class: 'links' }),
                N('div', 'Copyright © Segittur', { class: 'copy' })
            ])
        )
    }

}

addEvents(
    window,
    {
        load: () => {
            const title = document.getElementsByTagName('h1').item(0).firstChild.data
            const content = document.getElementById('kc-content')
            const form = Form.fromPage()
            new App(true)
                .append(new Header(title))
                .append(
                    new Main().append(
                        new Section()
                            .append(form || content)
                    )
                )
                .append(new Footer())
        }
    }
)
