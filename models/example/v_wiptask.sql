{{ config(materialized='view') }}

select  wip.TASKID,
        wip.TASKNAME,
        wip.TICKETNAME,
        wip.ORDERID,
        wip.AELOCATIONNAME
From "SGSEDWD"."STG"."WIPTASKS" wip
Left outer join "PERFORM"."STG"."TASKMSGS" tak
on wip.TASKID = tak.TASKID
Where wip.TICKETNAME = 'TRP_AutoTrap'
