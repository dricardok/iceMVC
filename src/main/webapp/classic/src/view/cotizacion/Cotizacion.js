Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ext.panel.Panel',
    xtype: 'cotizacion',
    
    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.tab.Panel',
        'Ext.ux.statusbar.StatusBar'
    ],
    
    
    controller: 'cotizacion',
    
    
    // validacion y modificacion de parametros (config)
    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Cotizacion.constructor config:', config);
        var me = this,
            paso = 'Validando componente de cotizaci\u00f3n';
        try {
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta cdramo o cdtipsit para componente de cotizaci\u00f3n';
            }
            
            config.modulo = config.modulo || 'COTIZACION';
            config.flujo = config.flujo || {};
            
            if (config.estado === 'w') {
                config.estado = 'W';
            }
            
            // parche para prueba de carga
            // config.cdunieco = 1;
            // config.estado = 'W';
            // config.nmpoliza = 17196;
            // config.nmsuplem = 0;
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    
    // configuracion que no usa parametros
    layout: 'fit',
    header: false,
    items: [{
        xtype: 'container',
        items: [{
            xtype: 'tabpanel',
            reference: 'tabpanel',
            listeners: {
                tabchange: 'onTabchangeEvent'
            }
        }]
    }],
    bbar: {
        xtype: 'statusbar',
        ui: 'footer',
        text: 'Listo',
        items: [
            '->', {
                text: 'Cargar cotizaci\u00f3n',
                reference: 'cargarbutton',
                iconCls: 'x-fa fa-cloud-download',
                handler: 'onCargarClic'
            }, {
                text: 'Anterior',
                reference: 'anteriorbutton',
                iconCls: 'x-fa fa-backward',
                handler: 'onAnteriorclic'
            }, {
                text: 'Cotizar',
                reference: 'cotizarbutton',
                iconCls: 'x-fa fa-dollar',
                handler: 'onCotizarClic'
            }, {
                text: 'Siguiente',
                reference: 'siguientebutton',
                iconCls: 'x-fa fa-forward',
                handler: 'onSiguienteClic'
            }
        ]
    },
    
    
    // propiedades no ext (se generan getters y setters)
    config: {
        // uso o funcionamiento
        modulo: null,
        flujo: null,
        cdtipsit: null,
        auxkey: null,
    
        // llave
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        status: null,
        
        // etapas
        nuevaCotizacion: true,
        
        // contenidos
        bloques: [],
        bloqueActual: -1,
        
        // comportamiento
        guardadoAutomaticoSuspendido: false
    },
    
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initComponent: function () {
        Ice.log('Ice.view.cotizacion.Cotizacion.initComponent');
        var me = this,
            paso = 'Construyendo componente de cotizaci\u00f3n';
        try {
            // recuperar componentes
            var bloques = Ice.generaComponentes({
                pantalla: 'COTIZACION',
                seccion: 'BLOQUES',
                modulo: me.modulo || '',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit ||'',
                auxkey: me.auxkey || '',
                
                items: true
            });
            
            me.bloques = bloques.COTIZACION.BLOQUES.items;
            if (!me.bloques || me.bloques.length < 1) {
                throw 'No hay bloques configurados';
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});