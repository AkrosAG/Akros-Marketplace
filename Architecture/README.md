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

Functional Requirements (EPICS)
---------------------
| N | Title | Description | Prio |
|---|---|---|---|
| 1 | Expandability | The software should be enhanced by features that are suitable to meet future needs of companies | 1 |
| 2 | Search Accomodation | The user can easily search for an appartement, a room or a roommate.  | 1 |
| 3 | Advertise accommodation | The user can easily advertise an appartement, a room or a roommate. | 1 |
| 4 | Language Selection | The user can switch between at least two languages (DE and EN). The application is multilanguage. | 2 |
| 5 | User Management | Business transaction can be only executed by authenticated user. | 2 |
| 6 | Profile administration | The user has an overview of ads he has posted.  | 3 |
| 7 | Search Accomodation | The user can communicate through the application. | 3 |

Non-Functional Requirements (acc. BABOK, 2020, 9.17)
---------------------
|Prio |  Category (based on ISO 9126) | Measurement  | Description  |  Usage considerations +/- |
|---|---|---|---|---|
| 1  |  **Reliability** requirements include the ability of the application to recover from errors, uptime, or failures in the interfaces. | <ul><li>percentage of the probability of failure</li><li>number of critical failures</li><li>time between critical failures </li></ul>|   |   |
|  2 | **Performace** Efficency requirements include the time taken to perform activities and the resource utilization levels.  |   |   |   |
|  3 | **Operability** requirements include the extent to which users can recognize whether an application will actually fulfill their needs, the ease of learning the application, and the usability of the application.  |   | 3.1 Internationalization: The application support i18N (dates, currency, numbers, text) which allows users to see data in their default .  |   |
|  4 | **Security** requirements include the ability to ensure appropriate confidentiality of information, the integrity of information stored in the application, the ability to verify whether actions were taken and by whom, and the ability to authenticate users.  | <ul><li>4.1 Acccount Creation:</li><li>4.2 Password generation:</li><li>4.3 Security questions:</li><li>4.4 Account locking:</li></ul>  |   |   |
|  5 | **Compatibility** requirements include requirements for properly replacing another application, the ability to co-exist with other applications, and the ability to interact with other applications.  |   |   |   |
| 6 | **Maintainability** requirements include the ability to change one component without affecting others, the ability to re-use components, whether the application can be effectively tested and problems can be properly diagnosed, the ease of making changes, and the ability to implement changes without causing unexpected failures.| |||
| 7 | **Transferability** requirements include the ease of installing and uninstalling the application, the kinds of different environments it can run in, and the ease of migrating it to a new environment.||||


Quality Goals
-------------

To be filled after MVP released.


Stakeholders {#_stakeholders}
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
- André Hirter: Maintainer
- Heinz Lätsch: Maintainer
- Thomas Kneubühl: Sponsor

Architecture Constraints
========================


System Scope and Context
========================

Business Context
----------------

The following diagram shows the most important AMP functions as a business flow. Colored boxes stand for the features in scope (going to be specify and develop next), white ones show the futureoriented functions.

![image](https://user-images.githubusercontent.com/96523998/151372519-99054f96-63d0-4bc6-843e-d1bc816ff4cb.png)

**\<optionally: Explanation of external domain interfaces\>**

Technical Context
-----------------




Solution Strategy
=================

Building Block View
===================

Whitebox Overall System
-----------------------

***\<Overview Diagram\>***

Motivation

:   *\<text explanation\>*

Contained Building Blocks

![Architacture Diagram](images/am-architecture.PNG)

:   *\<Description of contained building block (black boxes)\>*

1. client-ui : allows the user to interact with the marketplace App. He can search , add ads and also do a login.
2. admin-ui: This modules configures all dynamic parameters of the marketplace.
3. marketplace-service : serves the Rest-Services for the UI. 
4. auth-service: serves the authentication of the users.
5. postgres_user_db: is used to store user and Accountdata.
6. postgres_am_db: is used to store marketplace ads and configdata. 

Important Interfaces

:   *\<Description of important interfaces\>*

### \<Name black box 1\> {#__name_black_box_1}

*\<Purpose/Responsibility\>*

*\<Interface(s)\>*

*\<(Optional) Quality/Performance Characteristics\>*

*\<(Optional) Directory/File Location\>*

*\<(Optional) Fulfilled Requirements\>*

*\<(optional) Open Issues/Problems/Risks\>*

### \<Name black box 2\> {#__name_black_box_2}

*\<black box template\>*

### \<Name black box n\> {#__name_black_box_n}

*\<black box template\>*

### \<Name interface 1\> {#__name_interface_1}

...

### \<Name interface m\> {#__name_interface_m}

Level 2 {#_level_2}
-------

### White Box *\<building block 1\>* {#_white_box_emphasis_building_block_1_emphasis}

*\<white box template\>*

### White Box *\<building block 2\>* {#_white_box_emphasis_building_block_2_emphasis}

*\<white box template\>*

...

### White Box *\<building block m\>* {#_white_box_emphasis_building_block_m_emphasis}

*\<white box template\>*

Level 3 {#_level_3}
-------

### White Box \<\_building block x.1\_\> {#_white_box_building_block_x_1}

*\<white box template\>*

### White Box \<\_building block x.2\_\> {#_white_box_building_block_x_2}

*\<white box template\>*

### White Box \<\_building block y.1\_\> {#_white_box_building_block_y_1}

*\<white box template\>*

Runtime View {#section-runtime-view}
============

\<Runtime Scenario 1\> {#__runtime_scenario_1}
----------------------

-   Create an accommodation ad

-   *\<insert description of the notable aspects of the interactions
    between the building block instances depicted in this diagram.\>*

\<Runtime Scenario 2\> {#__runtime_scenario_2}
----------------------

- Delete an accommodation ad

... {#_}
---

\<Runtime Scenario 3\> {#__runtime_scenario_3}
----------------------

USC 3: Search for accommodation

Precondition:
---------------------
- user has Akros AD
- user start APM ad and is on the Home page

Basic flow: default search
---------------------

1. On the Home page the user see the possibility to search for category accommodation incl. search criteria for this category. Search criteria have no default.
2. The user select search, without providing the search criteria.
3. The system search for all ads, created in this category, and show the results as a gallery of a pictures with minimal additional information to each ad (e.g. address)
4. The user selects an ad.
5. The system shows detail view of the ad. The user have the possibility to go back to the search results.

````
```
import static com.qmetry.qaf.automation.step.client.RuntimeScenarioFactory.scenario;
@Test(description="")
        public void testWithGivenWhenThen() {
                scenario().
                given("a precondition",()->{
                        //write appropriate code...
                }).
                when("some action performed",()->{
                        //write appropriate code...
                }).
                then("it should have expected outcome",()->{
                        //write appropriate code...
                }).
                execute();
        }
```
````

Alternative flow 1: search for appartement

Alternative flow 2: search for a room

Alternative flow 3: search for roommate

Postcondition:

- no

\<Runtime Scenario n\> {#__runtime_scenario_n}
----------------------


Deployment View {#section-deployment-view}
===============

Infrastructure Level 1 {#_infrastructure_level_1}
----------------------

***\<Overview Diagram\>***

Motivation

:   *\<explanation in text form\>*

Quality and/or Performance Features

:   *\<explanation in text form\>*

Mapping of Building Blocks to Infrastructure

:   *\<description of the mapping\>*

Infrastructure Level 2 {#_infrastructure_level_2}
----------------------

### *\<Infrastructure Element 1\>* {#__emphasis_infrastructure_element_1_emphasis}

*\<diagram + explanation\>*

### *\<Infrastructure Element 2\>* {#__emphasis_infrastructure_element_2_emphasis}

*\<diagram + explanation\>*

...

### *\<Infrastructure Element n\>* {#__emphasis_infrastructure_element_n_emphasis}

*\<diagram + explanation\>*

Cross-cutting Concepts {#section-concepts}
======================

*\<Concept 1\>* {#__emphasis_concept_1_emphasis}
---------------

*\<explanation\>*

*\<Concept 2\>* {#__emphasis_concept_2_emphasis}
---------------

*\<explanation\>*

...

*\<Concept n\>* {#__emphasis_concept_n_emphasis}
---------------

*\<explanation\>*

Design Decisions {#section-design-decisions}
================

Quality Requirements {#section-quality-scenarios}
====================

Quality Tree {#_quality_tree}
------------

Quality Scenarios {#_quality_scenarios}
-----------------

Risks and Technical Debts
=========================

To be filled after MVP released.

Glossary {#section-glossary}
========

+-----------------------+-----------------------------------------------+
| Term                  | Definition                                    |
+=======================+===============================================+
| *\<Term-1\>*          | *\<definition-1\>*                            |
+-----------------------+-----------------------------------------------+
| *\<Term-2\>*          | *\<definition-2\>*                            |
+-----------------------+-----------------------------------------------+
