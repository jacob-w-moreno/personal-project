insert into users (
    users_email,
    users_first_name,
    users_last_name
) values (
    ${email},
    ${firstName},
    ${lastName}
)
returning users_id, users_first_name, users_last_name;