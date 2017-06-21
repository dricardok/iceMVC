Ext.define('Ice.view.bloque.personas.DomiciliosGrid', {
	
		extend  :       'Ext.grid.Grid',
		xtype	:		'domicilios',
		title	:		'Domicilios',
		config	:		{
			cdperson		:	null,
			actionColumns	:	[],
			buttons			:	[],
			nmorddom		:	null
			
		},
		//controller : 'domicilios',
		
		
//		initialize	:	function(){
//			var paso='';
//			try{
//				
//				
//			}catch(e){
//				Ice.manejaExcepcion(e,paso);
//			}
//		},
		
		constructor : function(config) {
			Ice.log('Ice.view.bloque.Coberturas.constructor config:',config);
			
			var me = this, paso = '';
			try {
				var comps = Ice.generaComponentes({
	                pantalla: 'DOMICILIO',
	                seccion: 'GRID',
	                fields: true,
	                columns: true
	            });
				Ice.log("****",         comps.DOMICILIO.GRID.columns);
				config.columns		=	comps.DOMICILIO.GRID.columns;
				
				
				config.items   = config.items || [];
				config.buttons = config.buttons || [];
				Ice.log("buttons",config.buttons);
				if (config.buttons.length > 0) {
				    config.items.push({
			            xtype : 'toolbar',
			            docked: 'bottom',
			            items: config.buttons
			        });
				}
				
				config.actionColumns = config.actionColumns || [];						
				if (config.actionColumns.length > 0) {
					var c = [];
					config.actionColumns.forEach(function(it){
						c.push({
				            width: '60',
				            ignoreExport: true,
				            cell: {
				                xtype: 'widgetcell',
				                widget: it
				            }
				        });
					});
					config.columns = config.columns.concat(c);
					Ice.log("##d",config.columns);
				}
				
			}catch(e){
				Ice.manejaExcepcion(e,paso);
			}
			
			me.callParent(arguments);
		},
		
//		iniciar:function(config){
//			var paso='',
//				me=this;
//			try{
//				
//			}catch(e){
//				Ice.generaExcepcion(e,paso);
//			}
//		},
		
		initialize:function(){
			
			var me=this;
			me.callParent(arguments);
			
			
			var comps = Ice.generaComponentes({
                pantalla: 'DOMICILIO',
                seccion: 'GRID',
                fields: true,
                columns: true
            });
			this.setStore({
				fields		:	comps.DOMICILIO.GRID.fields,
				autoLoad	:	true,
				proxy		:	{
					type 		: 'ajax',
					url 		: Ice.url.bloque.personas.obtenerDomicilio,
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
			});
		}
		
});