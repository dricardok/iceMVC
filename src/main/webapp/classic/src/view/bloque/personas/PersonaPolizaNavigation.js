Ext.define('Ice.view.bloque.personas.PersonaPolizaNavigation',{
    extend: 'Ext.panel.Panel',
    xtype: 'personapolizanavigation',
    
    controller: 'personapolizanavigation',
    layout: 'card',
    title: 'Personas poliza',
    bodyStyle: 'padding:15px',
    scrollable: true,
    // configuracion del componente (no EXT)
    config: {
        modulo: null,
        flujo: null,
        cdunieco: null, //1,
        cdramo: null, //501,
        estado: null, //'W',
        nmpoliza: null, //17196,
        nmsuplem: null, //0,
        nmsituac: null,
        cdbloque: null,
        cdtipsit: null
    },
    
 // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.personas.ListaPersonas.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de lista de personas';
            try {
                if (!config) {
                    throw 'No hay datos para lista de personas';
                }
                
                if (!config.cdramo || !config.cdtipsit) {
                    throw 'Falta ramo y tipo de situaci\u00f3n para lista de personas';
                }
                
                if (!config.cdunieco || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                    throw 'Falta llave de p\u00f3liza';
                }
                
                config.modulo = config.modulo || 'COTIZACION';
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    
    
    initComponent: function () {
        Ice.log('Ice.view.bloque.personas.PersonaPolizaNavigation initComponent');
        var me = this,
            paso = 'Construyendo navegacion de personas de poliza';
        try{
            var modelName = Ext.id();
            
            Ext.apply(me, {
                items: [
                    {
                        xtype: 'bloquelistasituaciones',
                        itemId: 'gridSituaciones',
                        reference: 'gridSituaciones',
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
                        itemId: 'gridPersonas',
                        reference: 'gridPersonas',
                        title: 'Personas por situacion',
                        cdunieco: me.getCdunieco(),
                        cdramo: me.getCdramo(),
                        estado: me.getEstado(),
                        nmpoliza: me.getNmpoliza(),
                        nmsuplem: me.getNmsuplem(),
                        cdtipsit: me.getCdtipsit(),
                        hidden: true,
                        tbar: [
                            {
                                text: 'Agregar',
                                iconCls: 'x-fa fa-plus-circle',
                                scope: me,
                                handler: function(btn){
                                    this.getController().agregarPersona(me);
                                }
                            }
                        ]
                    }
                ],
                layout: 'responsivecolumn',
                renderTo: Ext.getBody()
            });
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        
       // construir componente
        me.callParent(arguments);
        
        
        // comportamiento
        paso = '';
    }
});