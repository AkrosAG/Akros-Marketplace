# Introduction and Goals

The goal is to create a marketplace for employees of Akros AG. The marketplace should employees allow to create offers, create
search requests and search for topics/ads in the marketplace.

We would like to give the marketplace together a general understanding and definition.
The targets are to be able to handle changes in the team quickly and to use strategic technologies and methodologies.

Why is an architecture important?
Experiences?
How to start and on which way?

## Requirements Overview

This document describes the Akros Marketplace, short AMP, which is an application for companies internal advertising and is used for search and advertise an appartement, a room a roommate. The application should be expandable to include additional categories to search and advertise e.g. ride- or clothes-sharing, rent a car, et cetera.

The application should serve

- to train and practice the Akros employee for current and future development processes, technologies and "best practices"
- to assess the candidates in the hiring process.

![image](https://user-images.githubusercontent.com/96523998/151341560-63c6fb3c-dc8e-4613-8931-23542cec4a77.png)

## Quality Goals

To be filled after MVP released.

## Stakeholders

- Jan Richter: Developer
- Berthold Talla: Developer
- Cristian Ayerbe: Developer
- Stefan Le-Mingh: Developer
- Martin Dobrev: Developer
- Hermann Kamdoum: Developer
- Irina Finger: Product Owner
- Timmy Aeberli: Business Analyst
- Iliyan Kostev: Designer
- Andrè Hirter: Maintainer
- Heinz Lätsch: Maintainer

# Architecture Constraints

# System Scope and Context

## Business Context

The following diagram shows the most important AMP functions as a business flow. Colored boxes stand for the features in scope (going to be specify and develop next), white ones show the futureoriented functions.

![image](https://user-images.githubusercontent.com/96523998/151372519-99054f96-63d0-4bc6-843e-d1bc816ff4cb.png)

## Technical Context and Structure

![Architacture Diagram](images/am-architecture.PNG)

**client-ui**: allows the user to interact with the marketplace App. He can search , add ads and also do a login.

**admin-ui**: This modules configures all dynamic parameters of the marketplace.

**marketplace-service**: serves the Rest-Services for the UI.

**auth-service**: serves the authentication of the users.

**postgres_user_db**: is used to store user and Accountdata.

**postgres_am_db**: is used to store marketplace ads and configuration data.

# Solution strategy

## Frontend

- Set the basic layout (Grid, structure etc.) with CSS-Grid and Flexbox to not be bound to a CSS-Frameworks opinionated guideline
- Implement Components using Webcomponent API that get imported and uses in the main application. This has the following advantages:
  - Components are mostly isolated from each and can have their own tech-stack without influencing any other component
  - As any technology can be used, it can serve as a great way to learn new technologies
- Configure a CI/CD-Pipeline to automate the building and packaging of the webcomponents for the deployment of the main application
- Use JestJS as the unit-test framework and set a threshold for minimum code-coverage to achieve a high test coverage and lower execution time

# Runtime View

To be filled in the future.

# Deployment View

All deployments are currently described in the infrastructure folder.

# Cross-cutting Concepts

To be filled on demand.

# Quality Requirements

To be filled on demand.

# Risks and Technical Debts

To be filled after MVP released.

# Glossary

Definition in progress.

+-----------------------+-----------------------------------------------+
| Term | Definition |
+=======================+===============================================+
| _\<Term-1\>_ | _\<definition-1\>_ |
+-----------------------+-----------------------------------------------+
| _\<Term-2\>_ | _\<definition-2\>_ |
+-----------------------+-----------------------------------------------+
