Introduction and Goals
======================
The goal is to create a marketplace for employees of Akros AG. The marketplace should employees allow to create offers, create 
search requests and search for topics/ads in the marketplace.

We would like to give the marketplace together a general understanding and definition.
The targets are to be able to handle changes in the team quickly and to use strategic technologies and methodologies.

Why is an architecture important? 
Experiences?
How to start and on which way?


Requirements Overview
---------------------

This document describes the Akros Marketplace, short AMP, which is an application for companies internal advertising and is used for search and advertise an appartement, a room a roommate. The application should be expandable to include additional categories to search and advertise e.g. ride- or clothes-sharing, rent a car, et cetera.

The application should serve

 - to train and practice the Akros employee for current and future development processes, technologies and "best practices"
 - to assess the candidates in the hiring process.

![image](https://user-images.githubusercontent.com/96523998/151341560-63c6fb3c-dc8e-4613-8931-23542cec4a77.png)


Quality Goals
-------------

To be filled after MVP released.


Stakeholders
------------

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

Architecture Constraints
========================


System Scope and Context
========================

Business Context
----------------

The following diagram shows the most important AMP functions as a business flow. Colored boxes stand for the features in scope (going to be specify and develop next), white ones show the futureoriented functions.

![image](https://user-images.githubusercontent.com/96523998/151372519-99054f96-63d0-4bc6-843e-d1bc816ff4cb.png)


Technical Context and Structure
-----------------
![Architacture Diagram](images/am-architecture.PNG)

**client-ui**: allows the user to interact with the marketplace App. He can search , add ads and also do a login.

**admin-ui**: This modules configures all dynamic parameters of the marketplace.

**marketplace-service**: serves the Rest-Services for the UI. 

**auth-service**: serves the authentication of the users.

**postgres_user_db**: is used to store user and Accountdata.

**postgres_am_db**: is used to store marketplace ads and configuration data. 

Runtime View
============
To be filled in the future.


Deployment View
===============
All deployments are currently described in the infrastructure folder. 

Cross-cutting Concepts
======================
To be filled on demand.

Quality Requirements
====================
To be filled on demand.

Risks and Technical Debts
=========================
To be filled after MVP released.

Glossary
========
Definition in progress.

+-----------------------+-----------------------------------------------+
| Term                  | Definition                                    |
+=======================+===============================================+
| *\<Term-1\>*          | *\<definition-1\>*                            |
+-----------------------+-----------------------------------------------+
| *\<Term-2\>*          | *\<definition-2\>*                            |
+-----------------------+-----------------------------------------------+
