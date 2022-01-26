# Marketplace-Service

This module serves the Rest-Services for the UI.

## Implemented Technologies
- Spring-Boot 2.6.2
- Swagger UI and Restservices 3.0.3
- Maven (build on 3.8.3)
- JUnit 5


## Requirements


### Run-Only

- This module requires a running Postgres database for JUnit tests and normal operation. Look at infrastructure how to start the preconfigured database.


### Development

- Java 11 or higher
- Maven 3.3 or higher
- Docker (required to run preconfigured database)


## Build and Test

- **build-only**: mvn clean package
- **run**: mvn


## Rest Services

| Rest Service End Point        | Rest Service Controller     | Description     |
| -----------                   | -----------                 | -----------     |
| listFieldTypeDefinition       |  list-field-type-definitions-controller | This Rest Service is for documentation purposes only. It lists all static id's to field types for input/search/display UI-Controls. |
|  listCategories    | list-categories-controller         | Lists all categories. Used in first page. |
|  listCategorySearchFieldTypes  | list-category-search-field-types-controller         | Lists search fields to a category. Used in first search page to begin search of topics in offers and search requests in the selected category. |
|  searchTopic  | search-topic-controller         | Lists topics of search result from previous results. |
|  loadTopic  | load-topic-controller         | Loads topic details. |
|  saveTopic  | save-topic-controller         | Save topic details. |
|  deleteTopic  | delete-topic-controller         | Delete a topic. |
|  listTopicFieldTypes  | list-topic-field-types-controller         | Load a list of field types to add a new topic. |


