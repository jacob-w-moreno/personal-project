insert into category (
    category_name,
    category_type,
    category_allocated,
    category_balance,
    users_id
) values (
    ${name},
    ${type},
    ${amount},
    50,
    ${users_id}
    -- ^^^^^ change this to 0 at some point
)