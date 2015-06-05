select udc_default,substring(udc_default,4,4),* from cadetudc where con_udc = '010'


select '001'+con_detudc,cast(con_detudc as integer),dsc_desc1,dsc_desc2,0,0 from cadetudc where con_udc = '009'

-- estados
select 'insert into catalogos_detalle_catalogodetalle values ('+'''001'+''+con_detudc+''','+cast(cast(con_detudc as integer) as char(4))+','''+dsc_desc1+''','''+dsc_desc2+''','+cast(0 as char(1))+','+cast(0 as char(1))+','''',1);' from cadetudc where con_udc = '009'

-- municipios
select 'insert into catalogos_detalle_catalogodetalle values ('+'''002'+''+con_detudc+''','+cast(cast(con_detudc as integer) as char(4))+','''+dsc_desc1+''','''+dsc_desc2+''','+cast(0 as char(1))+','+cast(0 as char(1))+',''001'+substring(udc_default,4,4)+''',2);' from cadetudc where con_udc = '010'