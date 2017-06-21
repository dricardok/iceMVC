/**
 * Created by DEORTIZT on 6/12/2017.
 */
Ext.define('Ice.view.bloque.personas.SituacionPersonasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.situacionpersonas',
    
    init: function (view) {
        Ice.log('Ice.view.bloque.personas.ListaPersonasController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de lista de personas';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de lista de personas';
                    me.custom();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.personas.ListaPersonas.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de lista de personas';
            Ice.log('view: ',view);
        try {
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.ListaPersonas refs:', refs);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onActualizar: function (grid, rowIndex, colIndex) {
        this.actualizar(grid, rowIndex, colIndex);
    },
    
    onAgregar: function (grid, rowIndex, colIndex) {
        this.agregar(grid, rowIndex, colIndex);
    },
    
    actualizar: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.situacionPersonas.actualizar grid ',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Actualizando valores de personas por situacion';
        try {
            var store = refs.gridSituaciones.getStore();
            Ice.log('Ice.view.bloque.situacionPersonas.actualizar store ',store);
            var nmsituac = store.getAt(rowIndex).getData().nmsituac;
            Ice.log('Ice.view.bloque.situacionPersonas.actualizar nmsituac ',nmsituac);
            paso = 'Antes de ejecutar funcion cargar personas';
            Ice.log('Ice.view.bloque.situacionPersonas.actualizar refs ',refs);
            refs.gridPersonas.getController().onCargar(nmsituac);
            Ice.log('refs.gridPersonas refs ',refs.gridPersonas);
            refs.gridPersonas.setNmsituac(nmsituac);
            refs.gridPersonas.show();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.situacionPersonas.actualizar');
    },
    
    agregar: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.situacionPersonas.agregar grid ',grid,' rowIndex ',rowIndex,' colIndex ',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Agregando persona a situacion de poliza';
        try {
            var store = refs.gridSituaciones.getStore();
            Ice.log('Ice.view.bloque.situacionPersonas.actualizar store ',store);
            var nmsituac = store.getAt(rowIndex).getData().nmsituac;
            refs.setNmsituac(nmsituac);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.situacionPersonas.agregar');
    }
    
});