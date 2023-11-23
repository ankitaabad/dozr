
// avg stock price
insert  into public.test as t values (20,16,3)
ON CONFLICT (id) DO update set quantity = t.quantity + 20, price = (t.quantity*t.price + 20*16)/(t.quantity+ 20) where t.id = 1;

 
begin;

update public.test  set quantity = 200 where id = 2;
with cte as (update public.test  set quantity = 100 where id = 3 and quantity!=50 returning id) select 1/count(*) from cte;


commit;


select mfid, price,(select price from mfdailyprice m2 where m2.date = '2022-11-23' and m2.mfid = m.mfid) - price as p2 from mfdailyprice m where date = '2022-11-22' order  by m.mfid



with r as (
with t as (
with p as (
with n as ( select 
        s.id, 
        sum(s.rem_quan) over(partition by s.stockid order by s.dop) sum_qoh,s.rem_quan oldrem, case  when s.quantity > 20 then 's' else 'l' end tp
    from stocksbuy s where s.rem_quan != 0)    
update stocksbuy s1
set rem_quan = greatest(n.sum_qoh - 50, 0)from n where s1.stockid = 'tata' 
    and  n.id = s1.id 
    and n.sum_qoh - s1.rem_quan < 50 returning n.oldrem - s1.rem_quan as quantity, n.tp, s1.bp 
    )
  select sum(quantity * (50 - bp)) total, tp from p group by tp
) (select total from t where tp= 's'), (select total  from t where tp = 'l') )
update taxliability set stcg = stcg + r.stcg , ltcg = ltcg + r.ltcg where id = '123'