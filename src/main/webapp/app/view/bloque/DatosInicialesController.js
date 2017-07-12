Ext.define('Ext.view.bloque.DatosInicialesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.datosiniciales',

    init: function () {
        this.callParent(arguments);

        Ice.log('Ext.view.bloque.DatosInicialesController.init');
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de datos iniciales';
        Ext.defer(function () {
            try {
                if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza()) {
                    me.cargar();
                }
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        }, 600);
    },

    // se recibe el evento llaveGenerada del form de datos generales y se escala
    llaveGenerada: function (formDatosGenerales, cdunieco, cdramo, estado, nmpoliza, nmsuplem, status) {
        Ice.log('Ext.view.bloque.DatosInicialesController.llaveGenerada args:', arguments);
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Asignando llave de cotizaci\u00f3n a sub-bloques de datos iniciales';
        try {
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
        Ice.log('Ext.view.bloque.DatosInicialesController.cargar');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Cargando datos iniciales';
        try {
            refs.formdatosgenerales.getController().cargar();
            refs.formdatosauxiliares.getController().cargar();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    guardar: function (params) {
        Ice.log('Ext.view.bloque.DatosInicialesController.guardar params:', params);
        var me = this,
            refs = me.getReferences(),
            paso = 'Guardando datos iniciales';
        try {
            refs.formdatosgenerales.getController().guardar({
                success: function () {
                    try {
                        refs.formdatosauxiliares.getController().guardar({
                            success: (params && params.success) || null,
                            failure: (params && params.failure) || null
                        });
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso);
                    }
                },
                failure: (params && params.failure) || null
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});