Ext.define('Ice.view.bloque.agrupadores.FormAgrupadorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formagrupador',
    
    init: function () {
        Ice.log('controller.formagrupador.init');
        var me = this,
            paso = 'Invocando carga de subagrupador';
        try {
            me.cargar();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    cargar: function () {
        Ice.log('controller.formagrupador.cargar');
        var me = this,
            view = me.getView(),
            paso = 'Cargando subagrupador';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agrupadores.obtenerAgrupador,
                params: Ice.convertirAParams({
                        cdunieco: view.getCdunieco(),
                        cdramo: view.getCdramo(),
                        estado: view.getEstado(),
                        nmpoliza: view.getNmpoliza(),
                        cdagrupa: view.getCdagrupa(),
                        nmsuplem: view.getNmsuplem(),
                        status: view.getStatus(),
                        nmsuplemEnd: view.getNmsuplemEnd()
                    }),
                success: function (action) {
                    if (action.params) {
                        Ice.cargarFormulario(view, action.params);
                    }
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onGuardarClic: function () {
        Ice.log('controller.formagrupador.onGuardarClic');
        var me = this,
            view = me.getView(),
            paso = 'Guardando subagrupador';
        try {
            Ice.validaFormulario(view);
            
            var valores = view.getValues();
            
            valores = Ice.utils.mergeObjects(valores, {
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                cdagrupa: view.getCdagrupa(),
                nmsuplem: view.getNmsuplem(),
                status: view.getStatus(),
                nmsuplemEnd: view.getNmsuplemEnd(),
                accion: 'I'
            });
            
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agrupadores.movimientoAgrupador,
                params: Ice.convertirAParams(valores),
                success: function (action) {
                    view.fireEvent('guardar', view);
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onCancelarClic: function () {
        Ice.log('controller.formagrupador.onCancelarClic');
        this.getView().fireEvent('cancelar', this.getView());
    }
});