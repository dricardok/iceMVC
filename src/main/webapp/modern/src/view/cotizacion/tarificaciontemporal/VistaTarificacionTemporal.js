Ext.define('Ice.view.cotizacion.tarificaciontemporal.VistaTarificacionTemporal', {
	extend: 'Ext.dataview.DataView',
	xtype: 'vistatarificaciontemporal',
	
	controller: 'tarificaciontemporal',
	
	//height: '100%',
	padding: '20 0 0 20',
	
    center: true,
    
    multiSelect: false,
    style: 'background:#DEEAF4',
    itemSelector: 'div.thumb',
	
    itemTpl: new Ext.XTemplate(
    		'<tpl for=".">',
            '<div class="btn_rol_suscriptor thumb" style="width:200px; float: left; margin: 0px 20px 20px 0px;">',
               '<table style="width:100%">',
                   '<tr>',
                       '<td style="text-align:center;width:100% ">{total}</td>',
                   '</tr>',
                   '<tr>',
                       '<td style="text-align:center;width:100% ">',
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