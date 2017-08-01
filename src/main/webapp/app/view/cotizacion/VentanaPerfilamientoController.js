Ext.define('Ice.view.cotizacion.VentanaPerfilamientoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ventanaperfilamiento',

    onItemclick: function (view, record) {
        Ice.log('Ice.view.cotizacion.VentanaPerfilamientoController.onItemclick');
        var me = this,
            view = me.getView();
        view.fireEvent('seleccionarPerfil', view, record.get('cdptovta'), record.get('cdgrupo'), record.get('cdsubgrupo'),
            record.get('cdperfit'), record.get('cdunieco'));
    }

    // init: function () {
    //     Ice.log('Ice.view.cotizacion.VentanaPerfilamientoController.init');
    //     var me = this,
    //         view = me.getView(),
    //         refs = me.getReferences(),
    //         form = refs.form,
    //         formRefs = form.getReferences(),
    //         paso = 'Construyendo controlador de ventana de perfilamiento';
    //     Ice.log('Ice.view.cotizacion.VentanaPerfilamientoController.init refs:', refs);
    //     try {
    //         //////////////////////////////////////////////////////////////
    //         me.callParent(arguments); ////////////////////////////////////
    //         //////////////////////////////////////////////////////////////

    //         if (formRefs.cdunieco) {
    //             formRefs.cdunieco.getStore().padre = formRefs.cdunieco;
    //             formRefs.cdunieco.getStore().on({
    //                 load: function (me, records, success) {
    //                     if (success === true && records.length === 1) {
    //                         me.padre.setValue(records[0].get('key'));
    //                     }
    //                 }
    //             });
    //         }
    //     } catch (e) {
    //         Ice.generaExcepcion(e, paso);
    //     }
    // },

    // validar: function () {
    //     Ice.log('Ice.view.cotizacion.VentanaPerfilamientoController.validar');
    //     var me = this,
    //         view = me.getView(),
    //         refs = me.getReferences(),
    //         paso = 'Validando datos de perfilamiento';
    //     try {
    //         var form = refs.form;
    //         Ice.validarFormulario(form);
    //     } catch (e) {
    //         Ice.generaExcepcion(e, paso);
    //     }
    // },

    // getValues: function () {
    //     Ice.log('Ice.view.cotizacion.VentanaPerfilamientoController.getValues');
    //     var me = this,
    //         refs = me.getReferences(),
    //         paso = 'Recuperando valores de ventana de perfilamiento';
    //     try {
    //         return refs.form.getValues();
    //     } catch (e) {
    //         Ice.generaExcepcion(e, paso);
    //     }
    // }
});