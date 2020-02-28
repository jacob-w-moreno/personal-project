select * from users
join passwords on users.users_id = passwords.users_id
where users_email = $1;