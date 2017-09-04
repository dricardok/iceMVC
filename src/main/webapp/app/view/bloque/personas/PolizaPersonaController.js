Ext.define('Ice.view.bloque.personas.PolizaPersonaController', {
	extend: 'Ext.app.ViewController',
    alias : 'controller.polizapersona',
    onBuscar: function(){
        this.buscar();
    },
    buscar: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Buscando persona';
        try{
            if(this.validaBusqueda(refs) == true){
                Ice.log('refs validado',refs);
                Ice.log('refs cdunieco',refs.formBusquedaPersonas.getReferences().cdunieco.getValue());
                Ice.log('refs cdramo',refs.formBusquedaPersonas.getReferences().cdramo.getValue());
                Ice.log('refs nmpoliza',refs.formBusquedaPersonas.getReferences().nmpoliza.getValue());
                Ice.log('refs otvalor',refs.formBusquedaPersonas.getReferences().otvalor.getValue());
                var store = refs.gridPersonas.getStore();
                store.removeAll();
                var mask = Ice.mask('Cargando informacion de usuarios');
                store.load({
                    params: {
                        'params.cdunieco': refs.formBusquedaPersonas.getReferences().cdunieco.getValue(),
                        'params.cdramo': refs.formBusquedaPersonas.getReferences().cdramo.getValue(),
                        'params.estado': 'W',
                        'params.nmpoliza': refs.formBusquedaPersonas.getReferences().nmpoliza.getValue(),
                        'params.cdatribu': refs.formBusquedaPersonas.getReferences().dsatribu.getValue(),
                        'params.otvalor': refs.formBusquedaPersonas.getReferences().otvalor.getValue()
                    },
                    callback: function() {
                        mask.close();
                    }
                });
                refs.gridPersonas.show();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
    }
});