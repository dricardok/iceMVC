Ext.define('Ice.view.bloque.Agentes', {
    extend: 'Ext.form.Panel',
    xtype: 'bloqueagentes',
   // layout: 'responsivecolumn',
    controller: 'bloqueagentes',
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
        	
        	config.modulo = config.modulo || 'EMISION';
        	
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
	        
	        
	        
	       config.items= [{
            	xtype: 'formulario',
            	title: 'Datos de Poliza',

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
            	width		:	'100%',
    			height		: 	300,
            	columns: gridAgt.BLOQUE_AGENTES.GRID.columns.concat(me.config.actionColumns),
            	store  : {
                	fields: gridAgt.BLOQUE_AGENTES.GRID.fields,
                	autoLoad : true,
                	proxy: {
                        type: 'ajax',
                        url: Ice.url.bloque.agentes.cargarAgentes,
                        extraParams: {
                            'params.cdunieco' 	: config.cdunieco,
                            'params.cdramo'		: config.cdramo,
                            'params.estado'		: config.estado.toUpperCase(),
                            'params.nmpoliza'	: config.nmpoliza,
                            'params.nmsuplem'	: config.nmsuplem
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
                          text: 'Guardar',
                          iconCls: 'x-fa fa-save',
                          handler: 'onGuardarClic'
                      }
    	        ],
    	        actionColumns	:	[
                    {
                        xtype: 'button',
                        ui: 'action',
                        iconCls: 'x-fa fa-edit',
                        handler : function(grid,row,col){
							me.getController().editarPorcentaje(grid,row,col)
						}
                    } , {
                        xtype: 'button',
                        ui: 'action',
                        iconCls: 'x-fa fa-minus-circle',
                        handler: function(grid,row,col){
							me.getController().eliminar(grid,row,col)
						}
                    }
                    
                ]
                
        	}]     ;      	

            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
        

    },
    
    initialize:function(){
    	
    	
    	var me=this,
    		paso = 'custom';
        me.callParent(arguments);
		
		try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
		
		
    },
    
    title: 'Agentes',    
    
    scrollable: true,
    
});