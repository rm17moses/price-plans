CREATE TABLE if NOT EXISTS totals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    price_plan_id INTEGER,
    total_amount REAL,
    FOREIGN KEY (price_plan_id) REFERENCES price_plan(id)
);

-- DROP TABLE totals;