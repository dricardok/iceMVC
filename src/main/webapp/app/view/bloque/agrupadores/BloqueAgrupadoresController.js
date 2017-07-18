Ext.define('Ice.view.bloque.agrupadores.BloqueAgrupadoresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bloqueagrupadores',

    cargar: function () {
        Ice.log('Ice.view.bloque.agrupadores.BloqueAgrupadoresController.cargar');
    },
    
    onAgrupadorModificado: function () {
        Ice.log('controller.bloqueagrupadores.onAgrupadorModificado');
        var me = this,
            refs = me.getReferences(),
            paso = 'Actualizando selector de agrupadores';
        try {
            refs.panelsituacionesagrupador.getController().cargarCombo();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    guardar: function (params) {
        Ice.log('Ice.view.bloque.agrupadores.BloqueAgrupadoresController.guardar');
        var me = this,
            view = me.getView(),
            paso = 'Validando agrupadores';
        try {
            var reqParams = Ice.convertirAParams({
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                nmsituac: 0,
                nmsuplem: view.getNmsuplem()
            });
            reqParams.bloques = 'B16';
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.ejecutarValidacion,
                params: reqParams,
                failure: (params && params.failure) || null,
                success: function (action) {
                    var paso2 = 'Revisando validaciones';
                    try {
                        if (action.list && action.list.length > 0) {
                            Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                lista: action.list
                            }).mostrar();
                            
                            var error = false;
                            for (var i = 0; i < action.list.length; i++) {
                                if (action.list[i].tipo.toLowerCase() === 'error') {
                                    error = true; // para que no avance si hay validaciones tipo "error"
                                    break;
                                }
                            }
                            if (error === true) {
                                throw 'Favor de revisar las validaciones';
                            }
                        }
                        
                        if (params && params.success) {
                            paso2 = 'Ejecutando proceso posterior a agrupadores';
                            params.success();
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                        if (params && params.failure) {
                            var paso3 = 'Ejecutando failure posterior a agrupadores';
                            try {
                                params.failure();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso3);
                            }
                        }
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (params && params.failure) {
                var paso2 = 'Ejecutando failure posterior a agrupadores';
                try {
                    params.failure();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }
        }
    }
});