Ext.define('Ice.view.bloque.personas.BuscarPersona', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'buscarpersona',
    
    controller: 'buscarpersona',

    // config ext
    
    title: {
		text:'Buscar persona',
		style:'margin:0px 45px 16px 40px;',
	},
    //scrollable: true,

    // config no ext
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsituac: null,
        nmsuplem: null,
        cdrol: null,
        mostrarRol: false
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.personas.BuscarPersona.constructor config:', config);
        var me = this,
            paso = 'Construyendo busqueda persona';
        try {
            Ice.log('Ice.view.bloque.personas.BuscarPersona.refs:', me.cdramo);
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
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent comps:', comps);
            Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent compsGrid:', compsGrid);

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
                }, {
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
                        agregarDomicilio:true
                    }]
                }
                
            ].concat(config.items || []);

            config.buttons = [
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
                    ui:'gray',
                    style: 'margin-right:45px;',
                    handler: function(){
                        Ice.pop();
                    }
                }
            ].concat(config.buttons || []);
            
            me.callParent(arguments);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.personas.BuscarPersona.initComponent');
    }
});