Ext.define('Ice.app.controller.FormIceController', {
    extend: 'Ext.app.ViewController',
    
    /**
     * Ver documentacion de Ice.obtenerErrores
     */
    obtenerErrores: function () {
        Ice.log('Ice.app.controller.FormIceController.obtenerErrores');
        var view = this.getView(),
            paso = 'Recuperando validaci\u00f3n de formulario',
            errores;
        try {
            errores = Ice.obtenerErrores(view);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.app.controller.FormIceController.obtenerErrores errores:', errores);
        return errores;
    },

    /**
     * Ver documentacion de Ice.validarFormulario
     */
    validarFormulario: function () {
        Ice.log('Ice.app.controller.FormIceController.validarFormulario');
        var view = this.getView(),
            paso = 'Validando formulario';
        try {
            Ice.validarFormulario(view);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    /**
     * Ver documentacion de Ice.cargarFormulario
     */
    cargarFormulario: function (datos, opciones) {
        Ice.log('Ice.app.controller.FormIceController.cargarFormulario datos:', datos, 'opciones:', opciones);
        var view = this.getView(),
            paso = 'Cargando formulario';
        try {
            Ice.cargarFormulario(view, datos, opciones);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});