**3rd largest salary**
it will return the all the rows which have the 3rd laregst salary

`SELECT order_id,customer_id , amount
FROM Orders
WHERE amount = (
    SELECT DISTINCT amount
FROM Orders
ORDER BY amount DESC
LIMIT 1 OFFSET N-1
);`

