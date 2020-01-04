select sum(expense_amount) from expense
where category_id = $1

returning sum;