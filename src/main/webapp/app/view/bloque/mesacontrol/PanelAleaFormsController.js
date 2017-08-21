Ext.define('Ice.view.bloque.mesacontrol.FormAleaFormsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelaleaforms',

    init: function () {
        Ice.log('Ice.view.bloque.mesacontrol.FormAleaFormsController.init');
        var me = this,
            view = me.getView(),
            paso = 'Contruyendo controlador de pantalla de alea forms';
        try {
            me.callParent(arguments);
            me.cargar();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    cargar: function () {
        Ice.log('Ice.view.bloque.mesacontrol.FormAleaFormsController.cargar');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Cargando form alea';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.mesacontrol.obtenerTramiteCompleto,
                params: {
                    'params.ntramite': view.getFlujo().ntramite
                },
                success: function (json) {
                    Ice.cargarFormulario(refs.form, json.params);
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});