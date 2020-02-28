insert into transactions (
    transaction_name,
    transaction_amount,
    transaction_category,
    transaction_type
) values (
    ${name},
    ${amount},
    ${category},
    ${type}
);

