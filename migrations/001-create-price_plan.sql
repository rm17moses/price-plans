CREATE TABLE if not EXISTS price_plan (
    id integer primary key AUTOINCREMENT,
    plan_name text,
    sms_price real,
    call_price real
);

-- DROP TABLE price_plan;

