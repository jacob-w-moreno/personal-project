update category set
category_balance = ${balance},
category_allocated = ${allocated},
category_name = ${name}
where category_id = ${categoryID};