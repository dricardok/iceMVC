Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporal', {
	extend: 'Ext.view.View',
	xtype: 'vistatarificaciontemporal',
	
	controller: 'tarificaciontemporal',
	
	//height: '100%',
	tpl: [
        '<tpl for=".">',
             //'<div class="btn_rol_suscriptor thumb" style="width:200px; float:left; margin: 0px 40px 40px 0px;">',
             '<div class="" style="display:inline-block;">',
                '<table class="plan_pago_base thumb" style="">',
                    '<tr>',
                        '<td class="plan_pago_monto" style=" ">{total}</td>',
                    '</tr>',
                    '<tr style="background-color:#fff; padding: 0 25px; min-height: 100px;">',
                        '<td style="text-align:center;">',
                        '<tpl if="cdperpag==1"><p>Mensual</p><p>Primer Recibo</p><p>{primer_recibo}</p>',
                        '<tpl elseif="cdperpag==3"><p>Trimestral</p><p>Primer Recibo</p><p>{primer_recibo}</p',
                        '<tpl elseif="cdperpag==6"><p>Semestral</p><p>Primer Recibo</p><p>{primer_recibo}<p></p>',
                        '<tpl elseif="cdperpag==12"><p>Anual</p><p>Unico Recibo</p>',
                        '</tpl>',
                        '</td>',
                    '</tr>',
                '</table>',
             '</div>',
        '</tpl>'
    ],
    
    multiSelect: false,
    style: 'background:red',
    itemSelector: 'div.thumb',
    
    listeners: {
    	itemclick: 'onItemClic'
    },

	padding: '40 0 0 40',
    
    config: {
    	cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		cdtipsit: null
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.emsion.vistaprevia.DataViewVistaPrevia.constructor config', config);
		var me = this,
			paso = 'Construyendo dataview de vista previa';
		
		try{
			/*
			config.cdunieco = 1;
			config.cdramo = 201;
			config.estado = 'W';
			config.nmpoliza = 613805;*/
			
			if(!config
				|| !config.cdunieco
				|| !config.cdramo
				|| !config.estado
				|| !config.nmpoliza) {
				throw 'Faltan datos para construir dataview de vista previa';
			}
			
			config.store = {
				autoLoad: true,
				fields: [ 'estado', 'subsecuentes', 'total', 'cdramo', 'nmpoliza', 'cdunieco', { name: 'cdperpag', type: 'int' }, 'primer_recibo' ],
				sorters: [{
					direction: 'DESC',
				    property:	"cdperpag"
				}],
				sortRoot: 'cdperpag',
				sortOnLoad: true,
				remoteSort: false,
				proxy: {					
					type: 'ajax',
					url: Ice.url.emision.obtenerTarifaPlanes,
					extraParams: Ice.convertirAParams({
						cdunieco: config.cdunieco,
                        cdramo: config.cdramo,
                        estado: config.estado,
                        nmpoliza: config.nmpoliza
					}),
					reader: {
						type: 'json',
						rootProperty: 'list'
					}
				}
			};
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
});