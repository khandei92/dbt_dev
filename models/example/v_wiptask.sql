{{ config(materialized='view') }}

select  wip."TaskID",
        wip."TaskName",
        wip."TicketName",
        wip."OrderID",
        wip."AELocationName"
From "SGSEDWD"."DBO"."DimWIPTASKS" wip
Left outer join "PERFORM"."STG"."TASKMSGS" tak
on wip."TaskID" = tak.TASKID
Where wip."TicketName" = 'TRP_AutoTrap'
