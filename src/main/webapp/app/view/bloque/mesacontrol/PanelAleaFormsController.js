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
        alert('Ice.view.bloque.mesacontrol.FormAleaFormsController.cargar')
    }
});