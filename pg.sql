
// avg stock price
insert  into public.test as t values (20,16,3)
ON CONFLICT (id) DO update set quantity = t.quantity + 20, price = (t.quantity*t.price + 20*16)/(t.quantity+ 20) where t.id = 1;

 
begin;

update public.test  set quantity = 200 where id = 2;
with cte as (update public.test  set quantity = 100 where id = 3 and quantity!=50 returning id) select 1/count(*) from cte;


commit;
