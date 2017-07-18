/**
 * Created by DEORTIZT on 6/12/2017.
 */
Ext.define('Ice.view.bloque.personas.ListaPersonasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.listapersonas',
    
    onCargar: function (nmsituac) {
        this.cargar(nmsituac);
    },
    
    cargar: function (nmsituac) {
        Ice.log('Ice.view.bloque.ListaPersonas.cargar nmsituac ',nmsituac);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Obteniendo personas de situacion ' + nmsituac;
        try {
            view.setNmsituac(nmsituac);
            var store = view.getStore();
            store.removeAll();
            store.load({
                params: {
                    'params.cdunieco': view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsuplem': view.getNmsuplem(),
                    'params.nmsituac': view.getNmsituac()
                }
            });
            Ice.log('Ice.view.bloque.ListaPersonas.cargar refs ',view.getReferences());
//            view.setNmsituac(nmsituac);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.ListaPersonas.cargar');
    }
});