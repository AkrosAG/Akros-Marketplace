# Data Model

The data model is designed to fulfill any demands of a marketplace. 
So top categories and all field for offers and search requests are configurable.

## Tables

### Table : CATEGORY

This table defines a main category.

| Column              | Description |
| -----------         | ----------- |
| category_id         | Primary Key |
| description         | Long description |
| short_description   | Short description |


### Table : FIELD_TYPE_DEFINITION

This table defines fixed values to field types.

| Column              | Description |
| -----------         | ----------- |
| field_type_definition_id | Primary Key |
| description         | description |

1.  Number
2.	Text (single line)
3.	Text (multi line)
4.	Address
5.	Select (single option)
6.	Select (multi option)
7.	Boolean
8.	Email
9.	Phone Number
10.	Picture
11.	Date
12.	Price


### Table : FIELD_TYPE

This table defines a field type to a category.

| Column              | Description |
| -----------         | ----------- |
| field_type_id | Primary Key |
| field_type_definition_id         | FK to FIELD_TYPE_DEFINITION |
| category_id         | FK to CATEGORY |
| description         | Long description |
| short_description         | Short description |
| min_value         | Minimum range to number field values.  |
| max_value         | Maximum range to number field values. |
| sort_number         | Position order of field type in any lists or orders.  |
| required         | Field is required to be none null / not nullable.  |
| searchable         | Field is displayed in the search dialog.  |
| search         | Field is used as a topic for search requests. |
| offer         | Field is used as a topic for offers.  |


### Table : FIELD_TYPE_CHOOSE

This table defines the values of FIELD_TYPE when FIELD_TYPE_DEFINITION_ID has value 5 (Select (single option)) or 6 (Select (multi option)).

| Column              | Description |
| -----------         | ----------- |
| field_type_choose_id | Primary Key |
| field_type_id         | FK to FIELD_TYPE |
| description         | Long description |
| short_description         | Short description |
| sort_number         | Position order of field type choose in any lists or orders.  |


### Table : ADVERTISER

This table defines the person of an offer or a search request. The current table is temporary until the user login functionality is completed.


### Table : TOPIC

This table defines the search request or the offer of an advertiser.

| Column              | Description |
| -----------         | ----------- |
| topic_id | Primary Key |
| advertiser_id         | FK to ADVERTISER |
| category_id         | FK to CATEGORY |
| valid_from         | Topic is valid from. |
| valid_to         | Topic is valid until. |
| search_or_offer         | 'SEARCH': search request topic, 'OFFER': offer topic. |


### Table : TOPIC_VALUE

This table defines one value of a topic. Each topic has as many values defined as field types are defined to a category.

| Column              | Description |
| -----------         | ----------- |
| topic_value_id | Primary Key |
| topic_id | FK to TOPIC |
| category_id         | FK to CATEGORY |
| field_type_id         | FK to FIELD_TYPE |
| value_num         | If field type value is of kind number. |
| value_varchar         | If field type value is of kind string. |
| value_date         | If field type value is of kind date. |
| value_boolean         | If field type value is of kind boolean. |


### Table : KANTON

Store of all Swiss Kantons.

| Column              | Description |
| -----------         | ----------- |
| kanton_id | Primary Key |
| name | Name of Kanton |
| short_name        | Short name of Kanton |


### Table : ADDRESS

Store of Swiss addresses.

| Column              | Description |
| -----------         | ----------- |
| address_id | Primary Key |
| kanton_id | FK to Kanton |
| street_name        | Street name. |
| street_number        | Street number. |
| postal_code        | Postal Code |
| city        | City |


### View : VW_CATEGORY

A view of categories summarizing the number of offers and search requests.

| Column              | Description |
| -----------         | ----------- |
| category_id | Primary Key |
| short_description | Short description of category. |
| description        | Long description of category. |
| search_count        | Number of search requests of this category. |
| offer_count        | Number of offers of this category. |


## Graphical Database Model 

![Data Model](akros_ma_dyn.svg)
