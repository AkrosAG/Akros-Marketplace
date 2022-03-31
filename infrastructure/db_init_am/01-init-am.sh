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
  key                   varchar(50) not null,
  constraint category_pk primary key (category_id)
);

create table field
(
  field_id                  serial,
  field_type_definition_id  integer not null,
  category_id               integer not null,
  key                       varchar(50) not null,
  min_value                 integer,
  max_value                 integer,
  sort_number               integer not null,
  required                  boolean default false not null,
  searchable                boolean default false not null,
  request                   boolean default false not null,
  offer                     boolean default false not null,
  creation                  boolean default false not null,
  constraint field_pk primary key (field_id),
  constraint field_category_fk foreign key (category_id) references category(category_id)
);


create table field_option
(
  field_option_id       serial,
  field_id              integer not null,
  key                   varchar(50) not null,
  sort_number           integer not null,
  constraint field_option_pk primary key (field_option_id),
  constraint field_option_field_fk foreign key (field_id) references field(field_id)
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
  request_or_offer      varchar(6) check(request_or_offer in ('REQUEST', 'OFFER')) not null,
  constraint topic_pk primary key (topic_id),
  constraint topic_category_fk foreign key (category_id) references category(category_id),
  constraint topic_advertiser_fk foreign key (advertiser_id) references advertiser(advertiser_id)
);


create table topic_value
(
  topic_value_id        serial,
  topic_id              integer not null,
  category_id           integer not null,
  field_id              integer not null,
  value                 varchar(4000),
  constraint topic_value_pk primary key (topic_value_id),
  constraint topic_value_topic_fk foreign key (topic_id) references topic(topic_id),
  constraint topic_value_category_fk foreign key (category_id) references category(category_id),
  constraint topic_value_field_fk foreign key (field_id) references field(field_id)
);

create table address
(
  address_id     serial,
  region         varchar(100),
  street_name    varchar(100) not null,
  street_number  varchar(20) not null,
  postal_code    varchar(20) not null,
  city           varchar(100) not null,
  constraint address_pk primary key (address_id)
);

-- categories
insert into category (key) values ('accomodation');
insert into category (key) values ('carShare');

-- Field
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (1, 1, 'title', 1, 100, 2, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (4, 1, 'description', 1, 1000, 13, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (4, 1, 'expectations', 1, 1000, 14, false, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (4, 1, 'about', 1, 1000, 15, false, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (15, 1, 'rooms', 1, 10, 6, true, false, false, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'price', 1, 1000, 9, true, false, false, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (6, 1, 'frequency', 1, 1000, 10, true, false, false, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (3, 1, 'size', 1, 1000, 7, true, false, false, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (3, 1, 'floor', 1, 1000, 8, false, false, false, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (5, 1, 'type', null, null, 1, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'postalCode', 4, 5, 4, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'region', 1, 100, 3, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (1, 1, 'address', 1, 150, 5, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (16, 1, 'furnished', null, null, 11, false, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (12, 1, 'date', null, null, 12, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (9, 1, 'email', 1, 100, 18, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (10, 1, 'phone', 1, 100, 17, true, false, true, true, true);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (11, 1, 'attachments', null, null, 16, false, false, true, true, true);

insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (12, 1, 'fromDate', null, null, 3, true, true, true, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (12, 1, 'toDate', null, null, 4, false, true, true, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (14, 1, 'fromRooms', 1, 10, 5, true, true, false, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (14, 1, 'toRooms', 1, 10, 6, true, true, false, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'fromPrice', 1, 1000, 7, true, true, false, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'toPrice', 1, 1000, 8, true, true, false, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'fromSize', 1, 1000, 9, true, true, false, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'toSize', 1, 1000, 10, true, true, false, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (2, 1, 'region', 1, 100, 1, true, true, true, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (6, 1, 'type', null, null, 2, true, true, true, true, false);

insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (5, 2, 'fromRegion', 1, 100, 1, true, true, true, true, false);
insert into field (field_type_definition_id, category_id, key, min_value, max_value, sort_number, required, searchable, request, offer, creation) values (5, 2, 'toRegion', 2, 100, 1, true, true, true, true, false);

-- Field Option
insert into field_option (field_id, key, sort_number) values (10, 'room', 1);
insert into field_option (field_id, key, sort_number) values (10, 'apartment', 2);
insert into field_option (field_id, key, sort_number) values (10, 'house', 3);
insert into field_option (field_id, key, sort_number) values (10, 'parking', 4);
insert into field_option (field_id, key, sort_number) values (28, 'room', 1);
insert into field_option (field_id, key, sort_number) values (28, 'apartment', 2);
insert into field_option (field_id, key, sort_number) values (28, 'house', 3);
insert into field_option (field_id, key, sort_number) values (28, 'parking', 4);

-- Advertiser
insert into advertiser (first_name, last_name, email, phone_number) values ('J', 'R', 'j.r@world.com', '0123456789' );
  
  COMMIT;
EOSQL