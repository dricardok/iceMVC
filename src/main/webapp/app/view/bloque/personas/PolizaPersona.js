Ext.define('Ice.view.bloque.personas.PolizaPersona', {
	
	extend: 'Ice.view.componente.PanelPaddingIce',
	xtype		:	'polizapersona',
	scrollable	:	true,
	controller:'polizapersona',
	config		:	{
		cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsituac: null,
        nmsuplem: null,
        
		dataPer:{},
		accion:null
		
	},
	
	constructor: function(config){
		Ice.log('Ice.view.bloque.personas.PolizaPersona.constructor config:', config);
		var paso = 'poliza personas',me = this;
		try{
			
			var comps = Ice.generaComponentes({
	            pantalla: 'BUSQUEDA_PERSONA',
	            seccion: 'FORMULARIO',
	            modulo: me.modulo || '',
	            estatus: (me.flujo && me.flujo.estatus) || '',
	            cdramo: me.mostrarRol == true ? me.cdramo : '-1',
	            cdtipsit: me.cdtipsit ||'',
	            auxKey: me.auxkey || '',
	            items: true
	        });
	        
	        var compsGrid = Ice.generaComponentes({
	            pantalla: 'BUSQUEDA_PERSONA',
	            seccion: 'GRID',
	            columns: true,
	            fields: true
	        });
	        
	        comps.BUSQUEDA_PERSONA.FORMULARIO.items.forEach(function(it){
	        	if(it.name == "dsatribu"){
	        		it.value='CDPERSON';
	        	}else if(it.name == "otvalor"){
	        		it.value = config.dataPer.cdperson;
	        	}
	        });
	        config.items = [
                {
                    xtype: 'formdoscolumnasice',
                    title: 'Filtro',
                    reference: 'formBusquedaPersonas',
                    items: comps.BUSQUEDA_PERSONA.FORMULARIO.items,
                    buttons: [{
                        text: 'Buscar',
                        iconCls: 'x-fa fa-search',
                        handler: 'onBuscar'
                    }]
                },{
                    xtype: 'gridice',
                    title: 'Resultados',
                    reference: 'gridPersonas',
                    columns: compsGrid.BUSQUEDA_PERSONA.GRID.columns,
                    store: {
                        autoLoad: false,
                        fields: compsGrid.BUSQUEDA_PERSONA.GRID.fields,
                        proxy: {
                            type: 'ajax',
                            timeout: 45000,
                            url: Ice.url.bloque.personas.obtenerPersonaCriterio,
                            reader: {
                                type: 'json',
                                rootProperty: 'listas',
                                successProperty: 'success',
                                messageProperty: 'message'
                            }
                        }                               
                    },
                    actionColumns	:	[
        				{
								xtype : 'actioncolumn',
								items : [
											{
												iconCls : 'x-fa fa-edit',
												tooltip : 'Editar',
												handler : function(grid,row,col){
													me.getController().editarPersona(grid,row,col)
												}
											}
										]
							},
							{
								xtype : 'actioncolumn',
								items : [
											{
												iconCls : 'x-fa  fa-book',
												tooltip : 'Ver domicilios',
												handler : function(grid,row,col){
													me.getController().verDomicilios(grid,row,col)
												}
											}
										]
							}
							
        			],
        			listeners: {
    					itemaction: function(grid,row,col){
							me.getController().verDomiciliosTab(grid,row,col)
						},
						itemclick: function(grid,row,col){
							me.getController().verDomiciliosTab(grid,row,col)
						}
    				}
        			
                },
                {
                	xtype		:	'panelice',
                	reference	:	'domiciliosContainer',
                	items		:	[{
                        xtype: 'domicilios',
                        reference: 'gridDomicilios',
                        selector: true,
                        hidden	: true,
                        scrollable:true,
                        agregarDomicilio:true,
                        actionColumns	:	[
            				{
    								xtype : 'actioncolumn',
    								items : [
    											{
    												iconCls : 'x-fa fa-edit',
    												tooltip : 'Editar',
    												handler : function(grid,row,col){
    													me.getController().editarDomicilio(grid,row,col)
    												}
    											}
    										]
    							}
            			]
                    }]
                }
                
            ].concat(config.items || []);

	        var comps = Ice.generaComponentes({
                pantalla: 'PERSONA_ROL',
                seccion: 'FORMULARIO',
                cdramo: config.cdramo,
                items: true
            });
	        var cdrol = comps.PERSONA_ROL.FORMULARIO.items.find(function(it){
        		return it.name=='cdrol';
            });
	        cdrol['param2'] = 'params.cdnivel';
            if(config.nmsituac > 0){
                cdrol['value2'] = '1';
            } else {
                cdrol['value2'] = config.nmsituac;
            }
            cdrol.value = config.dataPer.cdrol; 
            cdrol.labelAlign = 'left';
            Ice.log('Ice.view.bloque.PersonaRol.constructor recargar ',cdrol);
            config.buttons = [
            	cdrol,
                {
                    text: 'Elegir',
                    iconCls: 'x-fa fa-check',
                    reference: 'btnGuardar',
                    handler: 'onGuardar'
                }, {
                    text: 'Nueva persona',
                    iconCls: 'x-fa fa-plus',
                    reference: 'btnNuevo',
                    handler: 'onNuevo'
                }, {
                    text: 'Cerrar',
                    iconCls: 'x-fa fa-close',
                    handler: function(){
                        Ice.pop();
                    }
                }
            ].concat(config.buttons || []); 
		} catch(e) {
			Ice.manejaExcepcion(e,paso);
		}
		me.callParent(arguments);
		try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	}
});