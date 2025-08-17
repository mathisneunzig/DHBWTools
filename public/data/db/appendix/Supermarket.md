<div style="page-break-after: always;"></div>

### brand

|   id | name                                       | legal_form   | country   | city              | address             |   zip_code |
|-----:|:-------------------------------------------|:-------------|:----------|:------------------|:--------------------|-----------:|

### department

|   id | name          |
|-----:|:--------------|

### deposit

|   id | name         |   price |
|-----:|:-------------|--------:|

### employee

|   id | first_name   | last_name   |   telefon_nr |   department_id |
|-----:|:-------------|:------------|-------------:|----------------:|

### product

|   id | name                              |       barcode |   brand_id |   department_id |   price |
|-----:|:----------------------------------|--------------:|-----------:|----------------:|--------:|

|   deposit_id |   purchase_price |   amount | unit_id   | alcohol   |
|-------------:|-----------------:|---------:|:----------|:----------|

### stock

| id       |   product_id |   amount | storage_id   | best_before_date   |
|:---------|-------------:|---------:|:-------------|:-------------------|

### storage

| id    | name                                       | type      |
|:------|:-------------------------------------------|:----------|

### unit

| id   | name       |
|:-----|:-----------|