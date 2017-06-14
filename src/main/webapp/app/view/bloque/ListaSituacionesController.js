/**
 * Created by DEORTIZT on 5/22/2017.
 */
Ext.define('Ice.view.bloque.ListaSituacionesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloquelistasituaciones',    
    custom: function () {
        Ice.log('Ice.view.bloque.ListaSituacionesController.custom');
        var me = this,
            view = me.getView(),            paso = 'Configurando comportamiento de bloque lista de situaciones';
            Ice.log('view: ',view);
        try {
            var store = view.getStore();
            Ice.log('store: ',store)
//            store.on({
//                load: function(){//                    Ice.log('recargando store');
//                }
//            });
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },    
    onCargarClic: function () {
        this.cargar();
    },   //    onAgregarClic: function () {
//        this.agregar();
//    },    //
//    onBorrarClic: function (grid, rowIndex, colIndex) {
//        this.borrar(grid, rowIndex, colIndex);
//    },    
    cargar: function () {
        Ice.log('Ice.view.bloque.ListaSituacionesController.cargar');
        var me = this,
            view = me.getView(),
            paso = 'Cargando bloque de datos generales';
        try {
            view.getStore().reload();
//            Ice.request({
//                mascara: 'Recuperando datos generales',
//                url: Ice.url.bloque.listaSituaciones.cargar,
//                params: {
//                    'params.cdunieco' : view.cdunieco,
//                    'params.cdramo': view.cdramo,
//                    'params.estado': view.estado,
//                    'params.nmpoliza': view.nmpoliza,
//                    'params.nmsuplem': view.nmsuplem
//                },
//                success: function (json) {
//                    var paso2 = 'LLenando store';
//                    try {
//                        var store = view.store;
//                        Ice.log("lista",json.situaciones);
//                        Ice.log("vista",view);
//                        if(json.situaciones){
//                            store.loadData(json.situaciones);
//                        }
//                    } catch (e) {
//                        Ice.manejaExcepcion(e, paso2);
//                    }
//                }
//            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }    
//    agregar: function(){
//        Ice.log('Ice.view.bloque.ListaSituacionesController.agregar');
//        var me = this,
//            view = me.getView(),
//            paso = "";
//        try{
//            paso = "Antes de agregar situacion de riesgo";
//            Ice.suspendEvents(view);
//            var store = view.getStore();
//            Ice.request({
//                mascara: 'Agregando situacion de riesgo',
//                url: Ice.url.bloque.listaSituaciones.agregar,
//                params: {
//                    nmsituac: store.data.length
//                },
//                success: function (json) {
//                    var paso2 = 'LLenando store';
//                    try {
//                        Ice.log("situacion",json.situacion);
//                        if(json.situacion){
//                            store.add(json.situacion);
//                        }
//                        Ice.resumeEvents(view);
//                    } catch (e) {
//                        Ice.manejaExcepcion(e, paso2);
//                    }
//                }
//            });
//        } catch (e) {
//            Ice.manejaExcepcion(e, paso);
//        }
//    },    //
//    borrar: function(grid, rowIndex, colIndex){
//        Ice.log('Ice.view.bloque.ListaSituacionesController.borrar  grid: ', grid, ' rowindex: ', rowIndex, ' colindex: ', colIndex);
//        var me = this,
//            view = me.getView(),
//            paso = "",
//            store = view.getStore();
//        try{
//            paso = "Antes de borrar situacion de riesgo";
//            Ice.suspendEvents(view);
//            var situacion = store.getData().getAt(rowIndex).getData();
//            Ice.log('situacion: ',situacion);
//            Ice.request({
//                mascara: 'Borrando situacion de riesgo',
//                url: Ice.url.bloque.listaSituaciones.borrar,
//                params: {
//                    nmsituac: situacion.nmsituac
//                },
//                success: function (json) {
//                    var paso2 = 'Antes de recargar store';
//                    try {
//                        store.reload();
//                        Ice.resumeEvents(view);
//                    } catch (e) {
//                        Ice.manejaExcepcion(e, paso2);
//                    }
//                }
//            });
//        } catch (e) {
//            Ice.manejaExcepcion(e, paso);
//        }//    }
});