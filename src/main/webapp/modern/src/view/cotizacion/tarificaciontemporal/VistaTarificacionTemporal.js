Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporal', {
	extend: 'Ice.view.componente.DataViewIce',
	xtype: 'vistatarificaciontemporal',
	controller: 'tarificaciontemporal',
	ui:'ice-cat',

	//height: '100%',

	// config ext
	// height: '100%',
	
	scrollable: false,

    center: true,
    
    multiSelect: false,
    
    itemSelector: 'td.thumb',
    //layout: 'fit',
    itemTpl: new Ext.XTemplate( 
    		'<tpl for=".">',
            '<div class="plan_pago thumb">',
               '<table class="plan_pago_base shadow_card" style="width:250px;"',
                   '<tr>',
				       '<td class="plan_pago_monto thumb">{total}<span class="moneda">   Pesos</span>',
					       '<tpl if="cdperpag!=12">',
						       '<p class="rec_subsecuente">Recibo Subsecuente</p>',
								'<p class="plan_pago_subsecuente">{subsecuentes}</p>',
							'</tpl>',
					   '</td>',
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
    ),   
    
    listeners: {
    	select: 'onItemClic'
    },
    
    // config no ext
	config: {
    	cdunieco: null,
		cdramo: null,
		estado: null,
		nmpoliza: null,
		nmsuplem: null,
		cdtipsit: null
	},
	
	 // validacion y modificacion de config
    constructor: function (config) {
    	Ice.log('Ice.view.tarificaciontemporal.VistaTarificacionTemporal.constructor');
    	var me = this,
         	paso = 'Contruyendo selector de planes';
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
			}
    	} catch (e) {
    		Ice.generaExcepcion(e, paso);
    	}
        this.callParent(arguments);
    }
});