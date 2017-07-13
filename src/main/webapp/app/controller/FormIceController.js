Ext.define('Ice.app.controller.FormIceController', {
    extend: 'Ext.app.ViewController',
    
    /**
     * Recupera los errores del formulario, el formulario debe tener getModelFields y getModelValidators.
     * Regresa un objeto de errores o null.
     * {
     *     cdunieco: 'Favor de introducir la sucursal',
     *     nmpoliza: 'La cotizaci\u00f3n es obligatoria',
     *     edad: 'Debe ser mayor de edad'
     * }
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
     * Valida los campos del formulario, el formulario debe tener getModelFields y getModelValidators.
     * Lanza excepcion si hay datos invalidos (en classic marca los campos en rojo, en modern la excepcion
     * contiene la descripcion de errores)
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
     * Carga el formulario. Recibe los datos y carga los campos que existan y
     * dispara la herencia de anidados
     */
    cargarFormulario: function (datos) {
        Ice.log('Ice.app.controller.FormIceController.cargarFormulario datos:', datos);
        var view = this.getView(),
            paso = 'Cargando formulario';
        try {
            Ice.cargarFormulario(view, datos);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});