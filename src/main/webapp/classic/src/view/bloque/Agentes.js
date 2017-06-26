Ext.define('Ice.view.bloque.Agentes', {
    extend: 'Ext.form.Panel',
    xtype: 'bloqueagentes',
    
    controller: 'bloqueagentes',
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.form.Panel',
        'Ext.form.field.*',
        'Ext.grid.Panel'
    ],
    
    layout: 'responsivecolumn',
    
    config: {
    	actionColumns: [],
    	
    	cdunieco	: null,
    	cdramo		: null,
    	estado		: null,
    	nmpoliza	: null,
    	nmsuplem	: null,
    	
    	agentesAgregados:[]
    }, 
        
    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Agentes.constructor config:', config);
        var me = this,
            paso = 'Validando bloque de agentes';
        try {
            
        	if (!config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                throw 'Faltan parametros para bloque de agentes';
            }
        	
        	config.modulo = config.modulo || '';
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    // configuracion que usa datos de entrada
    initComponent: function () {
        Ice.log('Ice.view.bloque.Agentes.initComponent [this, args]:', this, arguments);
        var me = this,
        paso = 'Construyendo bloque de agentes';
	    try {
	    	
	    	// generar componentes
	        var formPol = Ice.generaComponentes({
	            pantalla: 'BLOQUE_AGENTES',
	            seccion: 'FORM_POLIZA',
	            modulo: me.modulo || '',
	            estatus: (me.flujo && me.flujo.estatus) || '',
	            cdramo: me.cdramo || '',
	            cdtipsit: me.cdtipsit ||'',
	            auxkey: me.auxkey || '',	            
	            items: true,
	            fields: true,
	            validators: true
	        });
	        
	        var gridAgt = Ice.generaComponentes({
	            pantalla: 'BLOQUE_AGENTES',
	            seccion: 'GRID',
	            modulo: me.modulo || '',
	            estatus: (me.flujo && me.flujo.estatus) || '',
	            cdramo: me.cdramo || '',
	            cdtipsit: me.cdtipsit ||'',
	            auxkey: me.auxkey || '',	            
	            columns: true,
	            fields: true
	            
	        });
	        
	        var formAgt = Ice.generaComponentes({
	            pantalla: 'BLOQUE_AGENTES',
	            seccion: 'FORM_AGENTE',
	            modulo: me.modulo || '',
	            estatus: (me.flujo && me.flujo.estatus) || '',
	            cdramo: me.cdramo || '',
	            cdtipsit: me.cdtipsit ||'',
	            auxkey: me.auxkey || '',	            
	            items: true,
	            fields: true,
	            validators: true
	        });
	        
	        
	        // agregar items, y agregar modelo para el modelValidation
            Ext.apply(me, {
            	
            	items: [{
	            	xtype: 'formulario',
	            	title: 'Datos de Poliza',
	            	layout: 'responsivecolumn',
	            	itemId:"datpoliza",
	            	defaults: {
	                    labelWidth: 90,
	                    labelAlign: 'top',
	                    labelSeparator: '',
	                    submitEmptyText: false,
	                    anchor: '100%',
	                    userCls: 'big-50 small-100'
	                },
	                items: formPol.BLOQUE_AGENTES.FORM_POLIZA.items
	                
            	},{
	            	xtype: 'formulario',
	            	title: 'Agregar Agente',

	            	itemId:"agregaragente",
	            	layout: 'responsivecolumn',
	            	defaults: {
	                    labelWidth: 90,
	                    labelAlign: 'top',
	                    labelSeparator: '',
	                    submitEmptyText: false,
	                    anchor: '100%',
	                    userCls: 'big-33 small-100'
	                },
	                items: formAgt.BLOQUE_AGENTES.FORM_AGENTE.items,
	                buttons: [
						  {
							  text: 'Buscar Agente',
							  handler: 'onBuscarClic'
						  },
                          {
                              text: 'Agregar',
                              handler: 'onAgregarClic'
                          }
	                ]
	                
            	},{
	            	xtype: 'gridice',
	            	title: 'Participacion de Agentes',
	            	layout: 'responsivecolumn',
	            	columns: gridAgt.BLOQUE_AGENTES.GRID.columns.concat(me.config.actionColumns),
	            	store  : {
	                	fields: gridAgt.BLOQUE_AGENTES.GRID.fields,
	                	autoLoad : true,
	                	proxy: {
	                        type: 'ajax',
	                        url: Ice.url.bloque.agentes.cargarAgentes,
	                        extraParams: {
	                            'params.cdunieco' 	: me.cdunieco,
	                            'params.cdramo'		: me.cdramo,
	                            'params.estado'		: me.estado,
	                            'params.nmpoliza'	: me.nmpoliza,
	                            'params.nmsuplem'	: me.nmsuplem
	                        },
	                        reader: {
	                            type: 'json',
	                            successProperty: 'success',
	                            messageProperty: 'message',
	                            rootProperty: 'list'
	                        }
	                     }
	                },	                
	                buttons: [
                          {
                              text: 'Eliminar',
                              handler: ''
                          },
                          {
                              text: 'Guardar',
                              iconCls: 'x-fa fa-save',
                              handler: 'onGuardarClic'
                          }
	    	        ],
	    	        actionColumns:[
        				{
								xtype : 'actioncolumn',
								width : 50,
								items : [
											{
												iconCls : 'x-fa fa-edit',
												tooltip : 'Editar Porcentaje',
												handler : function(grid,row,col){
													me.getController().editarPorcentaje(grid,row,col)
												}
											},
											{
												iconCls : 'x-fa fa-remove',
												tooltip : 'Borrar',
												handler : function(grid,row,col){
													me.getController().eliminar(grid,row,col)
												}
											} 
										]
							}
        			]
	                
            	}/*,{
            		buttons: [
                          {
                              text: 'Guardar',
                              iconCls: 'x-fa fa-save',
                              handler: ''
                          }
        	        ]
            	}*/]           	
            	
            });
            
            // construir componente
            me.callParent(arguments);
            
        } catch (e) {
        	//alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },
    
    title: 'Agentes',    
    
    scrollable: true,
    
    tbar: [
           '->',
           {
               iconCls: 'x-fa fa-eye',
               tooltip: 'Mostrar/ocultar',
               handler: function (me) {
                   Ice.toggleOcultos(me.up('form'));
               }
    }]    
	
});