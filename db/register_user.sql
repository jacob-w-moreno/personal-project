insert into users (
    users_email,
    users_password
) values (
    ${email},
    ${hash}
)
returning users_id;