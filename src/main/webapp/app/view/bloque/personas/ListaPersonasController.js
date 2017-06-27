/**
 * Created by DEORTIZT on 6/12/2017.
 */
Ext.define('Ice.view.bloque.personas.ListaPersonasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.listapersonas',
    
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
            Ice.log('Ice.view.bloque.ListaPersonas.custom refs:', refs);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onCargar: function (nmsituac) {
        this.cargar(nmsituac);
    },
    
    cargar: function(nmsituac){
        Ice.log('Ice.view.bloque.ListaPersonas.cargar nmsituac ',nmsituac);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Obteniendo personas de situacion '+nmsituac;
        try {
            Ice.log('Ice.view.bloque.ListaPersonas.cargar me ', me);
            Ice.log('Ice.view.bloque.ListaPersonas.cargar view ', view);
            Ice.log('Ice.view.bloque.ListaPersonas.cargar refs ', refs);
            var store = view.getStore();
            store.removeAll();
            store.load({
                params: {
                    'params.cdunieco': view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsuplem': view.getNmsuplem(),
                    'params.nmsituac': nmsituac
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