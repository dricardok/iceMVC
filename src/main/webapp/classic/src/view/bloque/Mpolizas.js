/**
 * Created by jtezva on 5/9/2017.
 */
Ext.define('Ice.view.bloque.Mpolizas', {
    extend: 'Ext.form.Panel',
    xtype: 'mpolizas',
    
    requires: [],
    
    // validacion y modificacion de parametros (config)
    constructor: function (config) {
        Ice.log('Ice.view.bloque.Mpolizas.constructor config:', config);
        var me = this,
            paso = 'Validando bloque de datos generales';
        try {
            if (!config.cdramo || !config.cdtipsit) {
                throw 'Falta cdramo o cdtipsit para bloque de datos generales';
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    
    // configuracion que no usa parametros
    controller: 'bloqueMpolizasController',
    
    layout: 'responsivecolumn',
    
    title: 'Datos generales',
    
    defaults: {
        cls: 'big-50 small-100',
        labelAlign: 'top'
    },
    
    
    // propiedades no ext (se generan getters y setters)
    config: {
        cdramo: null,
        cdtipsit: null
    },
    
    
    // configuracion que usa parametros (config ya se encuentra copiada en this)
    initComponent: function () {
        Ice.log('Ice.view.bloque.Mpolizas.initComponent');
        var me = this,
            paso = 'Construyendo bloque de datos generales';
        try {
            // recuperar componentes
            var componentes = Ice.generaComponentes({
                pantalla: 'BLOQUE_MPOLIZAS',
                seccion: 'FORMULARIO',
                modulo: me.modulo || 'COTIZACION',
                estatus: (me.flujo && me.flujo.estatus) || '',
                cdramo: me.cdramo || '',
                cdtipsit: me.cdtipsit || '',
                auxkey: me.auxkey || '',
                
                items: true
            });
            
            
            // aplicar componentes
            Ext.apply(me, {
                items: componentes.BLOQUE_MPOLIZAS.FORMULARIO.items
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        
        
        // construir componente
        me.callParent(arguments); // siempre debe existir esta linea
        
        
        // definir comportamiento
        paso = 'Invocando definici\u00f3n de comportamiento de bloque de datos generales';
        try {
            me.getController().custom();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
