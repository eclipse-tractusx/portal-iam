# Portal IAM Documentation

This documentation provides a comprehensive overview of the **Portal IAM** system, covering various aspects such as architecture, user management, security, and deployment instructions.

## 1. Introduction

This repository contains the documentation for the **Portal IAM** platform, an Identity and Access Management (IAM) solution. The documentation is organized into the following sections to help users, administrators, and developers understand and work with the system effectively.

## 2. Documentation Structure

### [Admin Documentation](./admin/)

The `admin` folder includes documentation for system administrators:

### 1. [Technical Documentation](./admin/technical-documentation/)

The `technical-documentation` folder includes the following guides and manuals:

- [External Identity Provider](./admin/technical-documentation/00.%20External%20Identity%20Provider.md): Guide on integrating external identity providers.
- [Introduction](./admin/technical-documentation/01.%20Introduction.md): Overview of Portal IAM.
- [Generic Setup](./admin/technical-documentation/02.%20Generic%20Setup.md): Instructions on the basic setup.
- [User Management](./admin/technical-documentation/04.%20User%20Management.md): How to manage users within the Portal IAM.
- [Roles & Rights Concept](./admin/technical-documentation/06.%20Roles%20&%20Rights%20Concept.md): Overview of role-based access control.
- [Password Policy](./admin/technical-documentation/07.%20Password%20Policy.md): Password requirements and guidelines.
- [Email Configuration](./admin/technical-documentation/08.%20Email%20Configuration.md): Email server and notification configuration.
- [Event Logging](./admin/technical-documentation/09.%20Event%20Logging.md): How events and logs are managed.
- [Generic Security](./admin/technical-documentation/10.%20Generic%20Security.md): General security guidelines.
- [FAQ](./admin/technical-documentation/11.%20FAQ.md): Frequently asked questions.
- [Upgrade Details](./admin/technical-documentation/12.%20Upgrade%20Details.md): Information on system upgrades.
- [Operational Notes](./admin/technical-documentation/13.%20Operational%20Notes.md): Additional operational considerations.

### 2. [Developer Process](./admin/dev-process/)

- [Dev Flow](./admin/dev-process/Dev%20Flow.md): This document outlines the development flow, using a git-based diagram to show the process of feature development, bug fixes, and release candidates. 
- [How to Contribute](./admin/dev-process/How%20to%20contribute.md): Steps for contributing to the project.

### 3. [Release Process](./admin/release-process/)

- [Release Process](./admin/release-process/Release%20Process.md) :  This document explains the release process, detailing steps from creating a release branch, updating versions, and generating changelogs to merging release candidates into the main branch. It follows semantic versioning practices and provides links to automated workflows used in the release cycle.

### 4. [Known-Knowns](./admin/known-knowns/)

The `known-knowns` folder highlights known limitations, issues, or considerations regarding the Portal IAM:

- [Known-Knowns](./admin/known-knowns/Known-Knowns.md): A list of known issues and solutions.

### [Consultation Documentation](./consultation/)

### 1. [Charts](./consultation/charts/)

The `charts` folder contains Helm charts for deploying the Portal IAM system. Refer to the following for detailed usage:

- [Portal IAM Helm Chart](./consultation/portal-iam-helm-chart.md): Instructions on using the Helm chart for deploying Portal IAM on Kubernetes.

### 2. [Workshops](./consultation/workshops/)

The `workshops` folder includes minutes and topics for two workshops:

- [Workshop 20230927](./consultation/workshops/workshop-20230927.md): topics covered during the session of September 27, 2023 workshop.
- [Workshop 20231005](./consultation/workshops/workshop-20231005.md): topics covered during the session of October 5, 2023 workshop.


### 3. [Consultation Document](./consultation/consultation.md)
- Key architectural consultation notes and decisions.
  

### [Assets](./static/)

The `static` folder contains assets used in the documentation.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-iam
