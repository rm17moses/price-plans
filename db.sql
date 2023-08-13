CREATE TABLE if NOT EXISTS price_plan (
    id integer primary key AUTOINCREMENT,
    plan_name text,
    sms_price real,
    call_price real
);

delete from price_plan where id = 6;


SELECT *
FROM price_plan;
SELECT count(*)
FROM price_plan;

-- UPDATE price_plan SET total = sms_price + call_price;

ALTER TABLE price_plan 
DROP COLUMN total;

insert into price_plan (plan_name, sms_price, call_price)
values ('sms 101', 2.35, 0.37);
insert into price_plan (plan_name, sms_price, call_price)
values ('call 101', 1.75, 0.65);
insert into price_plan (plan_name, sms_price, call_price)
values ('call 201', 1.85, 0.85);