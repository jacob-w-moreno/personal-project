insert into passwords (
    passwords_password,
    users_id
) values (
    ${hash},
    ${userId}
)