/********************************************************************************
 * Copyright (c) 2021-2023 Contributors to the Eclipse Foundation
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

const ENV = location.hostname.includes('.dev.') ? 'dev' : 'int';
const ASSET_BASE = `https://portal.${ENV}.demo.catena-x.net/assets/themes/centralidp`;
window.onload = () => {
    let icon = document.querySelectorAll('link[rel=icon]')[0];
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.href = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABT1JREFUaEPlWT1MY0cQ/ubZkEhJ4TRJS9oIg9FhpFSBpDgp8SNcF0xxRkkPaS8Fpri0QJ8I7iTs64AzKZNAFQkjYWyU9qBMmoCUSLnEZqJ9frbfz+6+fTa6QLKlPW9nvtnZ+WZmCQMu3kQKr2EFQAGECZrH+YBbxvqcYkkHhLmMaTA2AYw4fxFmaB4Hg+wZ99u+AXAJawCWfQrvAgA3ZH4EkAl5604AKGELwEPpUd8RAC+6MR9EcUcAsPKi/R8B7PyUGUkmmw+JaITZzWbAJZgOmi1r78H7NW1ajpWFeBsZEE5u4gSE4UNDrRVmFCJS567FrdVPpn6uyeSMAXAZK2AUtcoMQmjnJJNKNFsrFEzBUQTAtGxP1TfC1y7iQy5jxCWr6SgdILyrY+Lvjt7LsJXY8YRK5JZeASJs5SYbi77fdDvwNpZAjtdTBpquKK+Wq1RHVwDSn6CBEhBv2JNnXQKVhpBDVq9jDdHx2VPJWKQFhyN8S3j9mpKbAIeJz8RgqQzP2Nkzp2QJAdAyrVzhlSjkKI/d4N+Vo7ElEK/3baf6wwM725gJAejD+EMQCsG4b6fGlijyou9Nz8hDAjlOYPAcgA90wIeH6Z374/VffSfAJQhvLRl4THi9SHlH3rdcr5veGzBwRYSCPdnwnWDlKL0FUpQsQqNFs/a9eqULwC2NRZEWtU5BmAt5/SSTSjYdrwvvGS0C9v5OJgoPJmqXsg8qx+kaGOOy/wg0n8vWn3kB7ILxqVYzY5UWwlxQOU7PuanWJFs5XrdAxVy2rr0flePRdTDJI8LlBQcAP8UbSOL3CONDWUaQUlyvAzhsNhOFYIng8I3IKp6OrlIdKwIsur3QYvDXs9mzr9oASvgQwPcaABuU9zcvleroNBFtmpKSzutccsJOhF+K8r3MaA7gGT7DNcpKAC/xFi2iG6fPq+m1WKUA4dS6bhWC9Yyb9Xz3pj8AZXwOxjdSAIQ9mu9dzP3q2DKDRTtpuGjVztZDDOz1unej/gBs4zEIj6QWBS5upTp2YsSqeq+LuPb3067yVwAgrW5oOh4g3mgmksVgegxNMSQe+5cB0AVwXejUKV77pFOMWwWA8aQ5lFgOeb3dBImLalLMnVK+J2eehWLdAX8IqUoBJz2bNEG+Y/IT5X41vcuQkyuBvshl69+2eaBPAKpSwG2Cdgy93oHg4xqXJH9TpTpfKREXgPA6GMuzU41Q/R+zCRL2SctxbRkBIGHRRx/fq/8Q+wREg/JXa/hSWgq056TmJTRhD3+i4CVJgej5UbpA7XujXMPD9Ob98fofHQCPQHiskA6VEUE5FSlp9A/UBInQzWUbTtXbBqAvJWqUx4TMGFkpYEDPN9AEBVpKLsEWJ6dRvk55fBnI690CzMDoTqwP3gTJmnp+ireRxC8RhogmunNpxTDKPNaBG2qC6KKZtDJeruk1NCXnYULbhxp62i92Q00QCKfNRGI6SJReACIkRO6+qXUqxjK0gNBI0CTLeI3QtZ7Bpl49+48DS+H1zhb7x+kXJo2QSesZngsNFkoX7phF+U7mjlzEG4N+Kcrx4Efyydw2iiDn5THO2sBLFIOkFNxAtKIARUw/5E2QzBjldNoZpVsoRk4qAGleVyGPAmBxa0I1So8FoCPsFmZzIOdJVYxNUiCc4xo1WDiI+6waBcDONoxH/l0mjhMng8r+xwHQhZ2ttx/NDVes4zLcUyumPQHGE3uqEfXk5Nv/9gBQMG2U024HgECBFmV0gKXjiA8u6w8h9RTDVNMrPwH3lfKciLdksyNTwzty/wATsrFPLbsvywAAAABJRU5ErkJggg=='
    const CX_PROVIDERS = JSON.parse(document.getElementById('providers').firstChild.data).slice(0,-1);
    while (document.body.childNodes.length > 0) {
        document.body.removeChild(document.body.firstChild);
    }
    const providers = document.createTextNode(`CX_PROVIDERS=${JSON.stringify(CX_PROVIDERS)}`);
    const data = document.createElement('script');
    data.appendChild(providers);
    document.head.appendChild(data);
    const script = document.createElement('script');
    script.src = `${ASSET_BASE}/Main.js`;
    document.head.appendChild(script)
    const style = document.createElement('link');
    style.href = `${ASSET_BASE}/Main.css`;
    style.rel = 'stylesheet';
    document.head.appendChild(style)
}
