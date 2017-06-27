Ext.define('Ice.view.bloque.personas.DomiciliosGrid', {
    
        extend  :       'Ext.grid.Grid',
        xtype   :       'domicilios',
        title   :       'Domicilios',
        config  :       {
            cdperson        :   null,
            selector        :   false,
            actionColumns   :   [],
            botones         :   [],
            
        },
//        controller : 'domicilios',
        scrollable: true,
        constructor: function (config) {
            Ice.log('Ice.view.bloque.personas.DomiciliosGrid.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de domicilios';
            
                try {
                    if (!config) {
                        throw 'No hay datos para lista de personas';
                    }
                    
                    config.modulo = config.modulo || 'COTIZACION';
                    
                    var comps = Ice.generaComponentes({
                        pantalla: 'DOMICILIO',
                        seccion: 'GRID',
                        fields: true,
                        columns: true
                    });
                    Ice.log('Ice.view.bloque.personas.DomiciliosGrid.initialize comps:', comps);
                    config.columns = comps.DOMICILIO.GRID.columns;
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
                    config.store = {
                        fields: comps.DOMICILIO.GRID.fields,
                        autoLoad: true, //me.getSelector() === 'true' ? false : true,
                        proxy: {
                            type        : 'ajax',
                            url         : Ice.url.bloque.personas.obtenerDomicilio,
                            extraParams : {
                                'params.cdperson'   : config.cdperson
                            },
                            reader      : {
                                type : 'json',
                                rootProperty : 'listas',
                                successProperty : 'success',
                                messageProperty : 'message'
                            }
                        }
                    };
//                    if(config.botones && config.botones.length > 0){                        
//                        config.tbar = config.botones;
//                    }
//                    if (config.selector == true){
//                        config.selModel = {
//                            type: 'checkboxmodel',
//                            mode: 'SINGLE',
//                            showHeaderCheckbox: false,
//                            allowDeselect: true
//                        };
//                    }
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
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            Ice.log('Ice.view.bloque.personas.DomiciliosGrid.constructor antes de callParent');    
            me.callParent(arguments);
        }
});