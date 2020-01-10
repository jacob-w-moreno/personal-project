insert into transactions (
    category_id,
    transaction_name,
    transaction_amount,
    transaction_category,
    transaction_type
) values (
    ${catId},
    ${name},
    ${amount},
    ${category},
    ${type}
);

