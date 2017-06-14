Ext.define('Ice.view.bloque.personas.DomiciliosGrid', {
	
		extend  :       'Ext.grid.Panel',
		xtype	:		'domicilios',
		title	:		'Domicilios',
		config	:		{
			cdperson		:	null,
			actionColumns	:	[],
			botones			:	[],
			
		},
		controller : 'domicilios',
		
		constructor: function (config) {
	        Ice.log('Ice.view.bloque.personas.DomiciliosGrid.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque de datos generales';
	            try {
	                
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    initComponent: function () {
	    	Ice.log('Ice.view.bloque.personas.DomiciliosGrid.initComponent [this, args]:', this, arguments);
	    	 var me = this,
	            paso = 'Construyendo Domicilios';
	        
	        try {
	        	
	        	
	        	
	        	var comps = Ice.generaComponentes({
	                pantalla: 'AGREGAR_PERSONAS',
	                seccion: 'COLUMNAS_DOMICILIOS',
	                url: 'jsonLocal/obtieneDomiciliosCol.json',
	                fields: true,
	                columns: true
	            });
	        	 Ext.apply(me, {
	        		 columns		:	comps.AGREGAR_PERSONAS.COLUMNAS_DOMICILIOS.columns.concat(me.getActionColumns()),
	        		 store			:	{
							fields		:	comps.AGREGAR_PERSONAS.COLUMNAS_DOMICILIOS.fields,
							autoLoad 	: true,
							proxy		:	{
								type 		: 'ajax',
								url 		: Ice.url.bloque.personas.obtenerDomicilios,
								extraParams	: {
									'params.cdperson'	: me.getCdperson()
								},
								reader 		: {
									type : 'json',
									rootProperty : 'list',
									successProperty : 'success',
									messageProperty : 'message'
								}
							}
						},
					tbar		:	me.getBotones()
	             });
	        	 me.callParent(arguments);
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	    	
	    }
		
});