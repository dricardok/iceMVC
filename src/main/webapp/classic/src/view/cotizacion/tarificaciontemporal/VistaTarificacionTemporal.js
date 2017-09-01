Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporal', {
	extend: 'Ice.view.componente.DataViewIce',
	xtype: 'vistatarificaciontemporal',
	ui:'ice-catalogo',
	controller: 'tarificaciontemporal',
	

	// config ext
	scrollable: true,
	cls: 'titulo_plan align_plans',
	height: '100%',
	style: 'margin:0 auto;',
	tpl: [
        '<tpl for=".">',
             //'<div class="btn_rol_suscriptor thumb" style="width:200px; float:left;">',
        	    '<div class="plan_pago">',
                '<table class="plan_pago_base shadow_card" style="width:220px; height:300px;">',
                    '<tr>',
                        '<tpl>',
                        '<td class="plan_pago_monto"><p class="total">Prima Total</p>{total}<p class="moneda">{cdmoneda}</p>',
                        '</tpl>',
                        '<tpl if="cdperpag!=12">',	
                          '<p class="monto02">{primer_recibo}</p><p class="total">Primer Recibo</p>',
                        '</tpl>',
                        '</td>',						
                    '</tr>',
                    '<tr style="background-color:#fff;">',
                        '<td style="text-align:center;">',
                        '<tpl if="cdperpag==1"><p class="periocidad">Mensual</p>',
                        '<tpl elseif="cdperpag==3"><p class="periocidad">Trimestral</p>',
                        '<tpl elseif="cdperpag==6"><p class="periocidad">Semestral</p>',
                        '<tpl elseif="cdperpag==12"><p class="periocidad">Anual</p><p class="total02">Único Recibo</p>',
                        '</tpl>',  
                        '<tpl if="cdperpag!=12">',
                        '<p class="monto03">{subsecuentes}</p><p class="total02">Recibo Subsecuente</p>',
				        '</tpl>',	
                        '</td>',
                    '</tr>',
                '</table>',
             '</div>',
        '</tpl>'
    ],
    
    multiSelect: false,
     itemSelector: 'table.shadow_card',
    
    listeners: { 
    	itemclick: 'onItemClic'
    },

	padding: '40 0 0 20',
    
	// config no ext
    config: {
    	cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		cdtipsit: null,

		// perfilamiento
		cdptovta: null,
		cdgrupo: null,
		cdsubgpo: null,
		cdperfil: null,

		flujo: null
	},
	
	constructor: function (config) {
		Ice.log('Ice.view.bloque.emsion.vistaprevia.DataViewVistaPrevia.constructor config', config);
		var me = this,
			paso = 'Construyendo dataview de vista previa';
		try {
			if (!config
				|| !config.cdunieco
				|| !config.cdramo
				|| !config.estado
				|| !config.nmpoliza) {
				throw 'Faltan datos para construir dataview de vista previa';
			}
			
			config.store = {
				autoLoad: true,
				fields: [ 'estado', 'subsecuentes', 'total', 'cdramo', 'nmpoliza', 'cdunieco', { name: 'cdperpag', type: 'int' }, 'primer_recibo', 'cdmoneda', 'dsmoneda' ],
				sorters: [{
					direction: 'DESC',
				    property:	"cdperpag"
				}],
				sortRoot: 'cdperpag',
				sortOnLoad: true,
				remoteSort: false,
				proxy: {					
					type: 'ajax',
					timeout: 1000*60*5,
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
				},
				listeners: {
					load: function () {
						Ext.suspendLayouts();
						this.each(function (rec) {
							rec.set('total'         , Ext.util.Format.usMoney(rec.get('total')));
							rec.set('primer_recibo' , Ext.util.Format.usMoney(rec.get('primer_recibo')));
							rec.set('subsecuentes'  , Ext.util.Format.usMoney(rec.get('subsecuentes')));
						});
						Ext.resumeLayouts();
					}
				}
			};
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	}
});