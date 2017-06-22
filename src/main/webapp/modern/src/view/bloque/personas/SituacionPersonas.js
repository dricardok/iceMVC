Ext.define('Ice.view.bloque.personas.SituacionPersonas', {
		extend : 'Ext.Panel',
		xtype : 'situacionpersonas',
		
		config	:		{
		    cdunieco: null,
		    cdramo: null,
		    estado: null,
		    nmpoliza: null,
		    nmsuplem: null,
		    nmsituac: null,
		    cdtipsit: null,
		    buttonPersonas: []
		},
		
		layout: 'vbox',
		scrollable: true,
		
		controller : 'situacionpersonas',
//		layout	   : 'vbox',
		//bodyPadding: '10px 0px 0px 10px',
//	    defaults: {
//	        margin: '0px 10px 10px 0px',
//	        cls: 'big-50 small-100'
//	    },
	    
		constructor: function (config) {
	        Ice.log('Ice.view.bloque.PersonaPoliza.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de busqueda de persona';
	            try {
	                if (!config) {
                        throw 'No hay datos para lista de personas';
                    }
                    
                    if (!config.cdramo || !config.cdtipsit) {
                        throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
                    }
                    
                    if (!config.cdunieco || !config.estado || !config.nmpoliza || !config.nmsuplem) {
                        throw 'Falta llave de p\u00f3liza y situacion';
                    }
                    
                    config.cdunieco = config.cdunieco || '';
                    config.cdramo = config.cdramo || '';
                    config.estado = config.estado || '';
                    config.nmpoliza = config.nmpoliza || '';
                    config.nmsuplem = config.nmsuplem || '';
                    config.nmsituac = config.nmsituac || '';
                    config.flujo = config.flujo || {};
                    
                    config.modulo = config.modulo || 'COTIZACION';
                    
                    if (config.estado === 'w') {
                        config.estado = 'W';
                    }
                    
                    Ice.log('config:', config);
                    
                    config.items = [
                        {
                            xtype: 'bloquelistasituaciones',
                            reference: 'gridSituaciones',
                            
                            cdunieco: config.cdunieco,
                            cdramo: config.cdramo,
                            estado: config.estado,
                            nmpoliza: config.nmpoliza,
                            nmsuplem: config.nmsuplem,
                            
                            cdtipsit: config.cdtipsit,
                            modulo: config.modulo,
                            flujo: config.flujo,
                            
                            height: 300,
                            scrollable: true,
                            
                            situacionCero: true,
//                            height: 400,
                            actionColumns: [
                                {
                                    xtype:'button',
                                    ui: 'action',
                                    itemId: 'erick',
                                    iconCls: 'x-fa fa-edit',
                                    handler: function(button, rowIndex, colIndex) {
                                        button.up('situacionpersonas').getController().onActualizar(button, rowIndex, colIndex);
                                    }
                                     
                                }
                            ]
                        },{
                            xtype: 'listapersonas',
                            reference: 'gridPersonas',
                            title: 'Personas por situacion',
                            
                            cdunieco: config.cdunieco,
                            cdramo: config.cdramo,
                            estado: config.estado,
                            nmpoliza: config.nmpoliza,
                            nmsituac: config.nmsituac,
                            nmsuplem: config.nmsuplem,
                            cdtipsit: config.cdtipsit,
                            items: {
                                xtype: 'toolbar',
                                docked: 'top',
                                items: config.buttonPersonas
                            },
                            height: 300,
                            scrollable: true,
                            
                            hidden: true
                        }
                    ];
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    }
});