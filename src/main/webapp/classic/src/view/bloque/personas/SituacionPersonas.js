Ext.define('Ice.view.bloque.personas.SituacionPersonas', {
	
		extend  :       'Ext.panel.Panel',
		xtype	:		'situacionpersonas',
		
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
		
		controller : 'situacionpersonas',
		layout	   : 'responsivecolumn',
		bodyPadding: '10px 0px 0px 10px',
	    defaults: {
	        margin: '0px 10px 10px 0px',
	        cls: 'big-50 small-100'
	    },
	    
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
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    
	    initComponent: function () {
	    	Ice.log('Ice.view.bloque.personas.PersonaPoliza.initComponent [this, args]:', this, arguments);
	        var me = this,
	            paso = 'Construyendo busqueda persona';	        
	        try {
	            
	        	Ext.apply(me, {
	        	    items: [
	        	        {
	        	            xtype: 'bloquelistasituaciones',
	        	            reference: 'gridSituaciones',
	        	            width: '100%',
	        	            cdunieco: me.getCdunieco(),
	        	            cdramo: me.getCdramo(),
	        	            estado: me.getEstado(),
	        	            nmpoliza: me.getNmpoliza(),
	        	            nmsuplem: me.getNmsuplem(),
	        	            cdtipsit: me.getCdtipsit(),
	        	            situacionCero: true,
	        	            actionColumns: [
                                {
                                    xtype:'actioncolumn',
                                    items: [
                                        {
                                            iconCls: 'x-fa fa-edit',
                                            tooltip: 'Editar',
                                            handler: function(grid, rowIndex, colIndex) {
                                                me.getController().onActualizar(grid, rowIndex, colIndex);
                                            }
                                        }
                                    ]
                                }
                            ]
	        	        },{
	        	            xtype: 'listapersonas',
	        	            reference: 'gridPersonas',
	        	            title: 'Personas por situacion',
	        	            
	        	            width: '100%',
	        	            cdunieco: me.getCdunieco(),
                            cdramo: me.getCdramo(),
                            estado: me.getEstado(),
                            nmpoliza: me.getNmpoliza(),
                            nmsuplem: me.getNmsuplem(),
                            cdtipsit: me.getCdtipsit(),
                            hidden: true,
                            tbar: me.getButtonPersonas()
	        	        }
	        	    ],
	        	    layout: 'responsivecolumn'
	            });
	        	 // construir componente
	            me.callParent(arguments);
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	    }
		
});