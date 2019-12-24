create table users (
users_password varchar(250),
users_email varchar(100),
users_id serial primary key,
users_username varchar(50) [i think]
);

create table budget (
user_id int references users(user_id),
budget_name varchar(30),
budget_id serial primary key
);

create table category (
budget_id int references budget (budget_id),
category_name varchar(30),
category_type varchar(10),
category_value float,
category_spent float,
category_id serial primary key
);

create table expense (
category_id int references category (category_id),
expense_name varchar(30),
expense_amount float,
expense_date text
);