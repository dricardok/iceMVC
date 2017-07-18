Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporal', {
	extend: 'Ext.dataview.DataView',
	xtype: 'vistatarificaciontemporal',
	
	controller: 'tarificaciontemporal',
	
	//height: '100%',
		
    center: true,
    
    multiSelect: false,
    style: '',
    itemSelector: 'td.thumb',
	
    itemTpl: new Ext.XTemplate(
    		'<tpl for=".">',
            '<div class="plan_pago thumb">',
               '<table class="plan_pago_base shadow_card" style="width:250px;"',
                   '<tr>',
                       '<td class="plan_pago_monto thumb">{total}<span class="moneda">  Pesos</span><p class="rec_subsecuente">Recibo Subsecuente</p></td>',
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
    	try{
    		/*
    		config.cdunieco = 1;
			config.cdramo = 201;
			config.estado = 'W';
			config.nmpoliza = 613805;
			*/
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
			}
    		
    		
    	}catch(e) {
    		Ice.generaExcepcion(e, paso);
    	}
    	
        this.callParent(arguments);
    },
    
    initialize: function (config) {
    	Ice.log('Ice.view.tarificaciontemporal.VistaTarificacionTemporal.initialize');
    	var me = this;
        me.callParent(arguments); 
    }
    
});