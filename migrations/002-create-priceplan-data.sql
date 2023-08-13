insert into price_plan (plan_name, sms_price, call_price)
values ('sms 101', 2.35, 0.37);
insert into price_plan (plan_name, sms_price, call_price)
values ('call 101', 1.75, 0.65);
insert into price_plan (plan_name, sms_price, call_price)
values ('call 201', 1.85, 0.85);
INSERT INTO price_plan (plan_name, sms_price, call_price)
VALUES ('Basic Plan', 0.50, 0.70);
INSERT INTO price_plan (plan_name, sms_price, call_price)
VALUES ('Value Plan', 0.30, 0.60);
INSERT INTO price_plan (plan_name, sms_price, call_price)
VALUES ('Premium Plan', 0.20, 0.50);
INSERT INTO price_plan (plan_name, sms_price, call_price)
VALUES ('Unlimited Plan', 0.10, 0.40);
INSERT INTO price_plan (plan_name, sms_price, call_price)
VALUES ('Business Plan', 0.60, 0.80);

update price_plan
set plan_name = Basic Plan,
    sms_price = 0.55,
    call_price = 0.75
where id = 5

delete from price_plan
where id = 6;