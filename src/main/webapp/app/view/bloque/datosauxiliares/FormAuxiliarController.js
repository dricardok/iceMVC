Ext.define('Ice.view.bloque.datosauxiliares.FormAuxiliarController', {
    extend: 'Ice.app.controller.FormIceController',
    alias: 'controller.formauxiliar',

    guardar: function (params) {
        Ice.log('Ice.view.bloque.datosauxiliares.FormAuxiliarController.guardar params:', params);
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Guardando datos adicionales';
        try {
            me.validarDatos();

            var valores = view.getValues();
            valores.cdunieco = view.getCdunieco();
            valores.cdramo   = view.getCdramo();
            valores.estado   = view.getEstado();
            valores.nmpoliza = view.getNmpoliza();
            valores.cdbloque = view.getBloque();
            valores.nmsituac = view.getNmsituac();
            valores.cdgarant = view.getCdgarant();
            valores.nmsuplem = view.getNmsuplem();
            valores.status   = view.getStatus();

            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.datosAuxiliares.guardar,
                params: Ice.convertirAParams(valores),
                success: (params && params.success) || null,
                failure: (params && params.failure) || null
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});