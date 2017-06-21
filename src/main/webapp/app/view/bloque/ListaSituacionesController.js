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
            Ice.log('store: ',store);
            store.on({
                load: function(){
                    Ice.log('Ice.view.bloque.ListaSituacionesController.custom load situacionCero ',view.getSituacionCero());
                    if(view.getSituacionCero() == true){
                        if(store.getAt(0)){
                            Ice.log('Ice.view.bloque.ListaSituacionesController.custom load store[0] ',store.getAt(0));
                            if(store.getAt(0).getData()){
                                Ice.log('load ',store.getAt(0).getData());
                                var data = store.getAt(0).getData();
                                data.nmsituac = '0';
                                data.id = '';
                                store.insert(0, data);
                            }
                        }
                    }
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },    
    onCargarClic: function () {
        this.cargar();
    },
    cargar: function () {
        Ice.log('Ice.view.bloque.ListaSituacionesController.cargar');
        var me = this,
            view = me.getView(),
            paso = 'Cargando bloque de datos generales';
        try {
            view.getStore().reload();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});