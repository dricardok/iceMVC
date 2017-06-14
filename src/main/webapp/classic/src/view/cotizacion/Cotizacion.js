Ext.define('Ice.view.cotizacion.Cotizacion', {
    extend: 'Ext.container.Container',
    xtype: 'cotizacion',
    
    requires: [
        //'Ext.ux.layout.ResponsiveColumn'
        'Ext.toolbar.Toolbar',
        'Ext.tab.Panel'
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
    layout: 'auto',
    padding: 0,
    //defaultFocus: 'form',
    items: [
        {
            xtype: 'container',
            padding: '20px 0px 0px 20px',
            items: [{
                xtype: 'tabpanel',
                reference: 'tabpanel',
                style: 'margin: 0px 20px 20px 0px;',
                cls: 'shadow',
                listeners: {
                    tabchange: 'onTabchangeEvent'
                }
            }]
        }, {
            xtype: 'toolbar',
            ui: 'footer',
            items: [
                '->', {
                    text: 'Cargar',
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
        }, {
            xtype: 'panel',
            title: '.'
        }
    ],
    
    
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
            
            // aplicar componentes
            /*
            Ext.apply(me, {
                items: [
                    {
                        xtype: 'bloquedatosgenerales',
                        
                        title: 'Datos generales',
                        maxHeight: 400,
                        
                        b1_cdunieco: me.cdunieco,
                        b1_cdramo: me.cdramo,
                        b1_estado: me.estado,
                        b1_nmpoliza: me.nmpoliza,
                        b1_nmsuplem: me.nmsuplem,
                        
                        modulo: me.modulo,
                        flujo: me.flujo,
                        cdtipsit: me.cdtipsit
                    }, {
                        xtype: 'bloquesituacionesriesgo',
                        
                        title: 'Riesgo',
                        maxHeight: 400,
                        
                        cdunieco: me.cdunieco,
                        cdramo: me.cdramo,
                        estado: me.estado,
                        nmpoliza: me.nmpoliza,
                        nmsuplem: me.nmsuplem,
                        
                        modulo: me.modulo,
                        flujo: me.flujo,
                        cdtipsit: me.cdtipsit
                    }, {
                        xtype: 'bloquecoberturas',
                        
                        title: 'Coberturas',
                        maxHeight: 400,
                        
                        cdunieco: me.cdunieco,
                        cdramo: me.cdramo,
                        estado: me.estado,
                        nmpoliza: me.nmpoliza,
                        nmsuplem: me.nmsuplem,
                        
                        modulo: me.modulo,
                        flujo: me.flujo,
                        cdtipsit: me.cdtipsit
                    }, {
                        xtype: 'panel',
                        title: '.'
                    }
                ]
            });
            */
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});