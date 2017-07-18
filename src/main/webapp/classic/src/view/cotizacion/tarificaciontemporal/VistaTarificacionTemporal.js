Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporal', {
	extend: 'Ext.view.View',
	xtype: 'vistatarificaciontemporal',
	
	controller: 'tarificaciontemporal',
	cls: 'titulo_plan',
	height: '100%',
	tpl: [
        '<tpl for=".">',
             //'<div class="btn_rol_suscriptor thumb" style="width:200px; float:left;">',
        	    '<div class="plan_pago thumb">',
                '<table class="plan_pago_base shadow_card" style="width:250px; min-height:300px;">',
                    '<tr>',
                        '<td class="plan_pago_monto thumb">{total}<p class="moneda">Pesos</p><p class="rec_subsecuente">Recibo Subsecuente</p></td>',
                    '</tr>',
                    '<tr style="background-color:#fff;">',
                        '<td style="text-align:center;">',
                        '<tpl if="cdperpag==1"><p class="periocidad">Mensual</p><p>Primer Recibo</p><p class="monto_02">{primer_recibo}</p>',
                        '<tpl elseif="cdperpag==3"><p class="periocidad">Trimestral</p><p>Primer Recibo</p><p class="monto_02">{primer_recibo}</p',
                        '<tpl elseif="cdperpag==6"><p class="periocidad">Semestral</p><p>Primer Recibo</p><p class="monto_02">{primer_recibo}<p></p>',
                        '<tpl elseif="cdperpag==12"><p class="periocidad">Anual</p><p>Unico Recibo</p>',
                        '</tpl>',
                        '</td>',
                    '</tr>',
                '</table>',
             '</div>',
        '</tpl>'
    ],
    
    multiSelect: false,
     itemSelector: 'td.thumb',
    
    listeners: {
    	itemclick: 'onItemClic'
    },
    
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
			
			/*config.cdunieco = 1;
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