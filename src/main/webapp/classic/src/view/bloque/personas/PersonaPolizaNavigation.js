Ext.define('Ice.view.bloque.personas.PersonaPolizaNavigation',{
    extend: 'Ext.panel.Panel',
    xtype: 'personapolizanavigation',
    
    controller: 'personapolizanavigation',
    layout: 'card',
    title: 'Personas poliza',
    height: '100%',
    bodyStyle: 'padding:15px',
    scrollable: true,
    
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
                
                if (!config.cdunieco || !config.estado || !config.nmpoliza || !config.nmsuplem) {
                    throw 'Falta llave de p\u00f3liza';
                }
                
                config.modulo = config.modulo || 'COTIZACION';
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    
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
    
    initComponent: function () {
        Ice.log('Ice.view.bloque.personas.PersonaPolizaNavigation initComponent');
        var me = this,
            paso = 'Construyendo navegacion de personas de poliza';
        try{
            var modelName = Ext.id();
            
            Ext.apply(me, {
                items: [{
                    xtype: 'situacionpersonas',
                    id: 'card-0',
                    reference: 'situacionpersonas',
                    cdunieco: me.getCdunieco(),
                    cdramo: me.getCdramo(),
                    estado: me.getEstado(),
                    nmpoliza: me.getNmpoliza(),
                    nmsuplem: me.getNmsuplem(),
                    cdtipsit: me.getCdtipsit(),
                    buttonPersonas: [
                        {
                            text: 'Agregar',
                            iconCls: 'x-fa fa-plus-circle',
                            scope: me,
                            handler: function(btn){
                                this.getController().agregarPersona(me);
                            }
                        }
                    ]
                }],
                tbar: [
                    {
                        id: 'move-prev',
                        text: 'Back',
                        handler: function(btn) {
                            me.getController().navigate(btn.up("panel"), "prev");
                        },
                        disabled: true
                    },'->',{
                        id: 'move-next',
                        text: 'Next',
                        handler: function(btn) {
                            me.getController().navigate(btn.up("panel"), "next");
                        }
                    }
                ],                
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