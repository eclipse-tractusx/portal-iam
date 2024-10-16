# Contribution details

To contribute to the (CX) Identity & Access Management as part of the open source community, please read the details defined below.
Besides a generic "how to", some commit and pull request (PR) guidelines are defined to ensure readability and make newly created PRs easier to review. Additionally, changelogs can get validated as well as written with more ease. Moreover, similar patterns are in use across the contributor community.

**Content**:

- [Commit How To](#how-to-contribute)
- [Commit and PR guidelines](#commit-and-pr-guidelines)

## How To Contribute

### 1 Create a fork

Open github - "eclipse-tractusx" project and select the respective repository to which you want to contribute.
[Create a fork of the respective repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### 2 Fork setup

Setup your fork by entering a name.

Click "Create fork"

### 3 Commit

With the newly created fork, you can now start to contribute. Create a new branch in your own fork and start to implement the planned changes or new features.
When the implementation is ready, create a PR against the original repository.

The PR will get reviewed by the repository owners/official committers.
As part of the pr review, sonarcloud will run automatically, and unit tests (if configured) will get executed. The PR owner is responsible to check the results and fix possible findings.

## Commit and PR guidelines

### Commits

The suggestion is to use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Here are some examples

Feature branch:

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
gitGraph
    commit id: "release(1.0.0): merge in main"
    checkout main
    branch feature/feature1 order: 2
    commit id:"feat(function): add feature1"
    commit id:"feat(function): enable feature1"
```

Bugfix branch:

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
gitGraph
    commit id: "release(1.0.0): merge in main"
    checkout main
    branch bug/bug1
    commit id: "fix(function): change bug1"
    checkout bug/bug1
    commit id:"fix(function): refactor bug1"
```

Release branch:

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
gitGraph
    commit id: "release: v1.0.0"
    checkout main
    branch release/1.1.0
    commit id: "release(1.1.0): update version, changelog..." tag: "1.1.0"
```

Hotfix branch:

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
gitGraph
    commit id: "release: v1.0.0"
    checkout main
    branch release/1.1.0 order: 1
    commit id: "release(1.1.0): update version, changelog..." tag: "1.1.0"
    checkout release/1.1.0
    branch hotfix/1.1.1 order: 2
    commit id: "hotfix(1.1.1): update version, changelog..." tag: "1.1.1"
```

### PR title

The suggested naming convention is '{type}{(function)}: {short summary}'

### PR description

Add details to the change, fix or feature in the PR description.
What was changed, why was it changed (e.g. which issue was fixed or which requirement was implemented), and how was it changed.

### Additional information

Please refer to the [Development Flow](./Dev%20Flow.md).

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-iam
