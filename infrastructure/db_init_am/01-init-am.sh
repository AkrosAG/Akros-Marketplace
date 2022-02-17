#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
  \connect $POSTGRES_DB $POSTGRES_USER
  BEGIN;

create table category
(
  category_id           serial,
  key           varchar(50) not null,
  constraint category_pk primary key (category_id)
);


create table field_type_definition
(
  field_type_definition_id  integer not null,
  description               varchar(1000) not null,
  constraint field_type_definition_pk primary key (field_type_definition_id)
);


create table field_type
(
  field_type_id             serial,
  field_type_definition_id  integer not null,
  category_id               integer not null,
  key                       varchar(50) not null,
  min_value                 integer,
  max_value                 integer,
  sort_number               integer not null,
  required                  boolean default false not null,
  searchable                boolean default false not null,
  search                    boolean default false not null,
  offer                     boolean default false not null,
  constraint field_type_pk primary key (field_type_id),
  constraint field_type_category_fk foreign key (category_id) references category(category_id),
  constraint field_type_field_type_definition_fk foreign key (field_type_definition_id) references field_type_definition(field_type_definition_id)
);


create table field_type_choose
(
  field_type_choose_id  serial,
  field_type_id         integer not null,
  key                   varchar(50) not null,
  sort_number           integer not null,
  constraint field_type_choose_pk primary key (field_type_choose_id),
  constraint field_type_choose_field_type_fk foreign key (field_type_id) references field_type(field_type_id)
);


create table advertiser
(
  advertiser_id  serial,
  first_name     varchar(100) not null,
  last_name       varchar(100) not null,
  email          varchar(100) not null,
  phone_number   varchar(50) not null,
  constraint advertiser_pk primary key (advertiser_id)
);


create table topic
(
  topic_id              serial,
  advertiser_id         integer not null,
  category_id           integer not null,
  valid_from            date not null,
  valid_to              date not null,
  search_or_offer       varchar(6) check(search_or_offer in ('SEARCH', 'OFFER')) not null,
  constraint topic_pk primary key (topic_id),
  constraint topic_category_fk foreign key (category_id) references category(category_id),
  constraint topic_advertiser_fk foreign key (advertiser_id) references advertiser(advertiser_id)
);


create table topic_value
(
  topic_value_id        serial,
  topic_id              integer not null,
  category_id           integer not null,
  field_type_id         integer not null,
  value                 varchar(4000),
  constraint topic_value_pk primary key (topic_value_id),
  constraint topic_value_topic_fk foreign key (topic_id) references topic(topic_id),
  constraint topic_value_category_fk foreign key (category_id) references category(category_id),
  constraint topic_value_field_type_fk foreign key (field_type_id) references field_type(field_type_id)
);

create table address
(
  address_id     serial,
  region_id      varchar(100),
  street_name    varchar(100) not null,
  street_number  varchar(20) not null,
  postal_code    varchar(20) not null,
  city           varchar(100) not null,
  constraint address_pk primary key (address_id)
);


create or replace view vw_category
as
select category_id,
       short_description,
       description,
       (select count(1) from topic t where search_or_offer='SEARCH' and t.category_id=c.category_id) search_count, 
       (select count(1) from topic t where search_or_offer='OFFER' and t.category_id=c.category_id) offer_count
  from category c;

  
-- Field Type Definition

insert into field_type_definition values (1, 'Number');
insert into field_type_definition values (2, 'Text (single line)');
insert into field_type_definition values (3, 'Text (multi line)');
insert into field_type_definition values (4, 'Address');
insert into field_type_definition values (5, 'Select (single option)');
insert into field_type_definition values (6, 'Select (multi option)');
insert into field_type_definition values (7, 'Boolean');
insert into field_type_definition values (8, 'Email');
insert into field_type_definition values (9, 'Phone Number');
insert into field_type_definition values (10, 'Picture');
insert into field_type_definition values (11, 'Date');
insert into field_type_definition values (12, 'Price');

-- categories
insert into category (key) values ('accommodation');
insert into category (description, short_description) values ('carShare');

-- Field Type
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (2, 1, 'title', 1, 100, 1, true, false, true, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (3, 1, 'description', 1, 1000, 2, true, false, true, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (11, 1, 'fromDate', null, null, 3, true, true, true, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (11, 1, 'toDate', null, null, 4, false, false, true, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (1, 1, 'rooms', 1, 10, 5, true, true, false, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (12, 1, 'price', 1, 1000, 6, true, true, false, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (1, 1, 'size', 1, 1000, 7, true, true, false, true);
insert into field_type (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, search, offer) values (5, 1, 'type', null, null, 8, true, true, true, true);

-- Field Type Choose
insert into field_type_choose (field_type_id, description, sort_number) values (8, 'Zimmer', 1);
insert into field_type_choose (field_type_id, description, sort_number) values (8, 'Wohnung', 2);
insert into field_type_choose (field_type_id, description, sort_number) values (8, 'Haus', 3);
insert into field_type_choose (field_type_id, description, sort_number) values (8, 'Parkplatz', 4);

-- Advertiser
insert into advertiser (first_name, surename, email, phone_number) values ('J', 'R', 'j.r@world.com', '0123456789' );
  
  COMMIT;
EOSQL