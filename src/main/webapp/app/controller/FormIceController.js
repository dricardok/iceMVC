Ext.define('Ice.app.controller.FormIceController', {
    extend: 'Ext.app.ViewController',
    
    /**
     * Devuelve un objeto con los errores, ejemplo:
     * {
     *     cdunieco: 'Favor de introducir la sucursal',
     *     nmpoliza: 'La cotizaci\u00f3n es obligatoria',
     *     edad: 'Debe ser mayor de edad'
     * }
     * Si no hay errores devuelve null
     */
    obtenerErrores: function () {
        Ice.log('Ice.app.controller.FormIceController.obtenerErrores');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Recuperando validaci\u00f3n de formulario',
            errores;
        try {
            if (!view.getModelFields || !view.getModelValidators) {
                throw 'No se puede validar el formulario';
            }

            var valores = view.getValues() || {},
                fields = view.getModelFields() || [],
                validators = view.getModelValidators() || {},
                modelName = Ext.id(),
                validatorsAplican = {};
            
            Ice.log('Ice.app.controller.FormIceController.obtenerErrores valores:', valores, 'fields:', fields,
                'validators:', validators);
            
            // solo aplican validators para campos que no esten ocultos
            for (var att in refs) {
                ref = refs[att];
                if (ref.isHidden() !== true && validators[ref.getName()]) {
                    validatorsAplican[ref.getName()] = validators[ref.getName()];
                }
            }

            Ice.log('Ice.app.controller.FormIceController.obtenerErrores validatorsAplican: ', validatorsAplican);
            
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: fields,
                validators: validatorsAplican
            });

            var validaciones = Ext.create(modelName, valores).getValidation().getData();
            
            Ice.log('Ice.app.controller.FormIceController.obtenerErrores validaciones:', validaciones);
            
            for (var att in validaciones) {
                if (validaciones[att] !== true) {
                    errores = errores || {};
                    errores[att] = validaciones[att];
                }
            }
            
            Ice.log('Ice.app.controller.FormIceController.obtenerErrores errores:', errores);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return errores;
    },

    /**
     * Valida los campos de formulario, si hay errores:
     * en classic marca los campos invalidos y arroja excepcion "Favor de validar los datos",
     * en modern arroja la excepcion formateada con la descripcion de campos invalidos
     */
    validarDatos: function () {
        Ice.log('Ice.app.controller.FormIceController.validarDatos');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Validando formulario';
        try {
            var errores = me.obtenerErrores();
            if (errores) {
                if (Ext.manifest.toolkit === 'classic') {
                    for (var name in errores) {
                        refs[name].setActiveError(errores[name]);
                    }
                    throw 'Favor de validar los datos';
                } else {
                    var errorString = '';
                    for (var name in errores) {
                        var ref = refs[name];
                        errorString = errorString + ref.getLabel() + ': ' + errores[name] + '<br/>';
                    }
                    throw errorString;
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});