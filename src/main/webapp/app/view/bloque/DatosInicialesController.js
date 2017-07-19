Ext.define('Ice.view.bloque.DatosInicialesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.datosiniciales',

    init: function () {
        this.callParent(arguments);

        Ice.log('Ice.view.bloque.DatosInicialesController.init');
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de datos iniciales';
        Ext.defer(function () {
            try {
                me.custom();
                if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza()) {
                    me.cargar();
                }
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        }, 600);
    },


    custom: function () {
        Ice.log('Ice.view.bloque.DatosInicialesController.custom');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Configurando comportamiento bloque de datos iniciales';
        Ice.log('view: ',view);            
        try {
            Ice.log('refs formadatosgenerales',refs.formdatosgenerales);
            if(refs.formdatosgenerales){
                if(refs.formdatosgenerales.getReferences()){
                    var cdtipcoa = refs.formdatosgenerales.getReferences().cdtipcoa;
                    if(cdtipcoa){
                        cdtipcoa.on({
                            change: function(me, value){
                                Ice.log('cdtipcoa change');
                                var paso2 = 'Cambiando valor';
                                try{
                                    if(value == 'N'){
                                        refs.panelcoaseguro.hide();
                                    } else {
                                        refs.panelcoaseguro.show();
                                    }
                                } catch(e){
                                    Ice.logWarn(paso, e);
                                }
                            }
                        });
                    }
                }
            }
            Ice.log('datosinicialescontroller cdtipcoa',cdtipcoa);
        } catch (e) {
        	alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },

    // se recibe el evento llaveGenerada del form de datos generales y se escala
    llaveGenerada: function (formDatosGenerales, cdunieco, cdramo, estado, nmpoliza, nmsuplem, status) {
        Ice.log('Ice.view.bloque.DatosInicialesController.llaveGenerada args:', arguments);
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Asignando llave de cotizaci\u00f3n a sub-bloques de datos iniciales';
        try {
            view.setCdunieco(cdunieco);
            view.setCdramo(cdramo);
            view.setEstado(estado);
            view.setNmpoliza(nmpoliza);
            view.setNmsuplem(nmsuplem);

            if (refs.formdatosauxiliares) {
                refs.formdatosauxiliares.setCdunieco(cdunieco);
                refs.formdatosauxiliares.setCdramo(cdramo);
                refs.formdatosauxiliares.setEstado(estado);
                refs.formdatosauxiliares.setNmpoliza(nmpoliza);
                refs.formdatosauxiliares.setNmsuplem(nmsuplem);
            } else {
                Ice.logWarn('No existe formulario de datos auxiliares para datos iniciales');
            }
            
            view.fireEvent('llaveGenerada', formDatosGenerales, cdunieco, cdramo, estado, nmpoliza, nmsuplem, status);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    cargar: function () {
        Ice.log('Ice.view.bloque.DatosInicialesController.cargar');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Cargando datos iniciales';
        try {
            refs.formdatosgenerales.getController().cargar();
            if(refs.formdatosgenerales){
                var values = refs.formdatosgenerales.getValues();
                if(values){
                    if(values.cdtipcoa){
                        refs.panelcoaseguro.cdunieco = values.cdunieco;
                        refs.panelcoaseguro.nmpoliza = values.nmpoliza;
                        refs.panelcoaseguro.cdtipcoa = values.cdtipcoa;
                        refs.getController().cargar();
                    }
                }
            }
            refs.formdatosauxiliares.getController().cargar();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    guardar: function (params) {
        Ice.log('Ice.view.bloque.DatosInicialesController.guardar params:', params);
        var me = this,
            refs = me.getReferences(),
            paso = 'Guardando datos generales';
        try {
            refs.formdatosgenerales.getController().guardar({
                success: function () {
                    var paso2 = 'Guardando datos auxiliares';
                    try {
                        if(refs.formdatosgenerales){
                            var values = refs.formdatosgenerales.getValues();
                            if(values){
                                if(values.cdtipcoa){
                                    refs.getController().guardar();
                                }
                            }
                        }
                        refs.formdatosauxiliares.getController().guardar({
                            success: (params && params.success) || null,
                            failure: (params && params.failure) || null
                        });
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                        if (params && params.failure) {
                            var paso4 = 'Ejecutando failure posterior a datos iniciales';
                            try {
                                params.failure();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso4);
                            }
                        }
                    }
                },
                failure: (params && params.failure) || null
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (params && params.failure) {
                var paso3 = 'Ejecutando failure posterior a datos iniciales';
                try {
                    params.failure();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso3);
                }
            }
        }
    }
});