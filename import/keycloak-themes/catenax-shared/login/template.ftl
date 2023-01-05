<#--
- Copyright (c) 2021-2023 Contributors to the Eclipse Foundation
-
- See the NOTICE file(s) distributed with this work for additional
- information regarding copyright ownership.
-
- This program and the accompanying materials are made available under the
- terms of the Apache License, Version 2.0 which is available at
- https://www.apache.org/licenses/LICENSE-2.0.
-
- Unless required by applicable law or agreed to in writing, software
- distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
- WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
- License for the specific language governing permissions and limitations
- under the License.
-
- SPDX-License-Identifier: Apache-2.0
-->

<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false displayWide=false showAnotherWayIfPresent=true bodyDivClass="login-container">
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle", realm.name)}</title>
    <link rel="icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABT1JREFUaEPlWT1MY0cQ/ubZkEhJ4TRJS9oIg9FhpFSBpDgp8SNcF0xxRkkPaS8Fpri0QJ8I7iTs64AzKZNAFQkjYWyU9qBMmoCUSLnEZqJ9frbfz+6+fTa6QLKlPW9nvtnZ+WZmCQMu3kQKr2EFQAGECZrH+YBbxvqcYkkHhLmMaTA2AYw4fxFmaB4Hg+wZ99u+AXAJawCWfQrvAgA3ZH4EkAl5604AKGELwEPpUd8RAC+6MR9EcUcAsPKi/R8B7PyUGUkmmw+JaITZzWbAJZgOmi1r78H7NW1ajpWFeBsZEE5u4gSE4UNDrRVmFCJS567FrdVPpn6uyeSMAXAZK2AUtcoMQmjnJJNKNFsrFEzBUQTAtGxP1TfC1y7iQy5jxCWr6SgdILyrY+Lvjt7LsJXY8YRK5JZeASJs5SYbi77fdDvwNpZAjtdTBpquKK+Wq1RHVwDSn6CBEhBv2JNnXQKVhpBDVq9jDdHx2VPJWKQFhyN8S3j9mpKbAIeJz8RgqQzP2Nkzp2QJAdAyrVzhlSjkKI/d4N+Vo7ElEK/3baf6wwM725gJAejD+EMQCsG4b6fGlijyou9Nz8hDAjlOYPAcgA90wIeH6Z374/VffSfAJQhvLRl4THi9SHlH3rdcr5veGzBwRYSCPdnwnWDlKL0FUpQsQqNFs/a9eqULwC2NRZEWtU5BmAt5/SSTSjYdrwvvGS0C9v5OJgoPJmqXsg8qx+kaGOOy/wg0n8vWn3kB7ILxqVYzY5UWwlxQOU7PuanWJFs5XrdAxVy2rr0flePRdTDJI8LlBQcAP8UbSOL3CONDWUaQUlyvAzhsNhOFYIng8I3IKp6OrlIdKwIsur3QYvDXs9mzr9oASvgQwPcaABuU9zcvleroNBFtmpKSzutccsJOhF+K8r3MaA7gGT7DNcpKAC/xFi2iG6fPq+m1WKUA4dS6bhWC9Yyb9Xz3pj8AZXwOxjdSAIQ9mu9dzP3q2DKDRTtpuGjVztZDDOz1unej/gBs4zEIj6QWBS5upTp2YsSqeq+LuPb3067yVwAgrW5oOh4g3mgmksVgegxNMSQe+5cB0AVwXejUKV77pFOMWwWA8aQ5lFgOeb3dBImLalLMnVK+J2eehWLdAX8IqUoBJz2bNEG+Y/IT5X41vcuQkyuBvshl69+2eaBPAKpSwG2Cdgy93oHg4xqXJH9TpTpfKREXgPA6GMuzU41Q/R+zCRL2SctxbRkBIGHRRx/fq/8Q+wREg/JXa/hSWgq056TmJTRhD3+i4CVJgej5UbpA7XujXMPD9Ob98fofHQCPQHiskA6VEUE5FSlp9A/UBInQzWUbTtXbBqAvJWqUx4TMGFkpYEDPN9AEBVpKLsEWJ6dRvk55fBnI690CzMDoTqwP3gTJmnp+ireRxC8RhogmunNpxTDKPNaBG2qC6KKZtDJeruk1NCXnYULbhxp62i92Q00QCKfNRGI6SJReACIkRO6+qXUqxjK0gNBI0CTLeI3QtZ7Bpl49+48DS+H1zhb7x+kXJo2QSesZngsNFkoX7phF+U7mjlzEG4N+Kcrx4Efyydw2iiDn5THO2sBLFIOkFNxAtKIARUw/5E2QzBjldNoZpVsoRk4qAGleVyGPAmBxa0I1So8FoCPsFmZzIOdJVYxNUiCc4xo1WDiI+6waBcDONoxH/l0mjhMng8r+xwHQhZ2ttx/NDVes4zLcUyumPQHGE3uqEfXk5Nv/9gBQMG2U024HgECBFmV0gKXjiA8u6w8h9RTDVNMrPwH3lfKciLdksyNTwzty/wATsrFPLbsvywAAAABJRU5ErkJggg==">
    <#--  <link rel="icon" href="${url.resourcesPath}/images/favicon.ico" />  -->
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
    <div class="signup-container">
      <div class="signup-container__header">
        <a href="#">
          <img src="${url.resourcesPath}/images/cx-text.svg" width="200" />
        </a>
        <div>
          <ul>
            <li>
              <a id="lnkHelp" href="${properties.helpUrl}">Help</a>
            </li>
            <#if realm.internationalizationEnabled>
            <li>|</li>
            <#--  <li>
                <#assign isEn = locale.currentLanguageTag == 'en'>
              <a id="lnkDE" onclick="changeLocale('de',${url})" class="${isEn?then('','active')}">DE</a>
            </li>
            <li>
              <a id="lnkEN" onclick="changeLocale('en',${url})" class="${isEn?then('active','')}">EN</a>
            </li>  -->
            
            <#list locale.supported as l>
                <li class="kc-dropdown-item">
                    <#assign isActive = locale.currentLanguageTag == l.languageTag>
                    <a href="${l.url}" class="${isActive?then('active','')}">${l.languageTag?upper_case}</a>
                </li>
            </#list>
            </#if>
          </ul>
        </div>
      </div>
      <#nested "form">
      <div class="signup-container__footer">
        <nav>
          <div>
            <a id="lnkHelp" href="${properties.helpUrl}">Help</a>
          </div>
          <div>
            <a id="lnkContact" href="${properties.contactUrl}">Contact</a>
          </div>
          <div>
            <a id="lnkImprint" href="${properties.imprintUrl}">Imprint</a>
          </div>
          <div>
            <a id="lnkPrivacy" href="${properties.privacyPolicyUrl}">Privacy</a>
          </div>
          <div>
            <a id="lnkTerms" href="${properties.termsUrl}">Terms of Service</a>
          </div>
          <div>
            <a id="lnkCookies" href="${properties.cookiePolicyUrl}">Cookie Policy</a>
          </div>
          <div>
            <a id="lnkLicenseNote" href="${properties.thirdPartyLicensesUrl}"
              >Third Party Licenses</a
            >
          </div>
        </nav>
        <span class="copyright">Copyright © Catena-X Automotive Network</span>
      </div>
    </div>
    <script>
</body>
</html>
</#macro>
