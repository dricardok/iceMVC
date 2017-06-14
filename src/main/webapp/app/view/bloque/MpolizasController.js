/**
 * Created by jtezva on 5/9/2017.
 */
Ext.define('Ice.view.bloques.MpolizasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloqueMpolizasController',
    
    
    // recuperar componentes dinamicos
    /*
    construir: function () {
        Ice.log('Ice.view.bloque.MpolizasController.construir');
        var me = this,
            view = me.getView(),
            paso = 'Construyendo bloque de datos generales';
        Ice.log('me,view', me, view);
        try {
            Ice.generaComponentes({
                pantalla: 'BLOQUE_MPOLIZAS',
                seccion: 'FORMULARIO',
                modulo: me.config.modulo || 'COTIZACION',
                estatus: me.config.flujo
                    ? (me.config.flujo.estatus || '')
                    : '',
                cdramo: me.config.cdramo || '',
                cdtipsit: me.config.cdtipsit || '',
                auxkey: '',
                
                items: true
            }, function (comps) {
                Ice.log('Ice.view.bloques.Mpolizas componentes construidos:', comps);
                var paso2 = 'Agregando componentes de datos generales';
                try {
                    if (Ext.manifest.toolkit === 'modern') {
                        for (var i = 0; i < comps.BLOQUE_MPOLIZAS.FORMULARIO.items.length; i++) {
                            comps.BLOQUE_MPOLIZAS.FORMULARIO.items[i].style = 'float: left; margin: 0px 10px 10px 0px;';
                            comps.BLOQUE_MPOLIZAS.FORMULARIO.items[i].userCls = 'big-50 small-100';
                        }
                    }
                    view.add(comps.BLOQUE_MPOLIZAS.FORMULARIO.items);
                    me.custom(); // Para agregar los eventos entre componentes
                } catch (e) {
                    view.disable();
                    Ice.manejaExcepcion(e, paso2);
                }
            });
        } catch (e) {
            view.disable();
            Ice.manejaExcepcion(e, paso);
        }
    },
    */
    
    
    // agregar eventos y comportamiento a los componentes
    custom: function () {
        Ice.log('Ice.view.bloques.MpolizasController.custom');
        var paso = 'Definiendo comportamiento de bloque de datos generales';
        try {
            // recuperando hijos por referencia
            var me = this,
                refs = me.getReferences();
            Ice.log('Ice.view.bloques.MpolizasController.custom refs:', refs);
            
            refs.feefecto.on({
                change: function () {
                    refs.feproren.setValue(Ext.Date.add(refs.feefecto.getValue(), Ext.Date.YEAR, 1));
                }
            });
            
            refs.feefecto.setValue(new Date());
            
            paso = 'Invocando carga de datos generales';
            me.cargar();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    cargar: function (data) {
        Ice.log('Ice.view.bloques.MpolizasController.cargar data:', data);
        var paso = 'Cargando datos generales';
        try {
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    guardar: function (data, callback) {},
    
    
    logValues: function () {
        Ice.log('Ice.view.bloques.MpolizasController.logValues');
        var me = this,
            view = me.getView();
        
        Ice.log('Ice.view.bloques.MpolizasController.logValues getValues:', view.getValues());
    }
});
