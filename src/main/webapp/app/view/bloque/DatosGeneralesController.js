/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGeneralesController', {
    extend: 'Ice.app.controller.FormIceController',
    alias: 'controller.bloquedatosgenerales',
    
    init: function (view) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.init view:', view);
        var me = this,
            view = me.getView(),
            refs = me.getReferences() || {},
            paso = 'Iniciando controlador de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            Ext.defer(function () {
                var paso2 = 'Definiendo comportamiento de bloque de datos generales';
                try {
                    me.custom();
                    
                    if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza()
                        && !Ext.isEmpty(view.getNmsuplem()) && view.getModulo()) {
                        paso2 = 'Cargando bloque de datos generales';
                        me.cargar();
                    } else {
                        var setearValoresPerfilamiento = function () {
                            var paso3 = 'Asignando valores de perfilamiento';
                            try {
                                if (view.getCdptovta() && view.getCdgrupo() && view.getCdsubgpo() && view.getCdperfil()) {
                                    Ice.cargarFormulario(view, {
                                        punto_venta: view.getCdptovta(),
                                        grupo: view.getCdgrupo(),
                                        subgrupo: view.getCdsubgpo(),
                                        perfil_tarifa: view.getCdperfil()
                                    }, {
                                        sinReset: true,
                                        sinUsarNames: true
                                    });
                                }
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso3);
                            }
                        };

                        if (view.getCdunieco()) { // se recibe la sucursal, por lo que se setea
                            if (refs.cdunieco) {
                                Ice.cargarFormulario(view, {cdunieco: view.getCdunieco()}, {
                                    sinReset: true,
                                    callback: function () {
                                        view.on('valoresdefectovariables', function anon (me) {
                                            me.removeListener('valoresdefectovariables', anon);
                                            setearValoresPerfilamiento();
                                        });
                                        refs.cdunieco.fireEvent('change', refs.cdunieco);
                                        refs.cdunieco.fireEvent('blur', refs.cdunieco);
                                    }
                                });
                            }
                        } else {
                            setearValoresPerfilamiento();
                        }
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 600);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.custom');
        var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque de datos generales';
        try {
            var refs = view.getReferences() || {};
            Ice.log('Ice.view.bloque.DatosGeneralesController refs:', refs);
            
            
            // al seleccionar fecha de inicio poner fecha de fin
            if (refs.b1_feefecto && refs.b1_feproren) {
                refs.b1_feefecto.on({
                    change: function (me, value) {
                        var paso = 'Calculando fin de vigencia';
                        try {
                            alert('Antes de cambiar fecha');
                            if(refs.b1_ottempot.getValue()){
                                me.cambiarFechasTemporalidad(refs);
                            } else {
                                refs.b1_feproren.setValue(Ext.Date.add(value, Ext.Date.YEAR, 1));
                            }
                            alert('Despues de cambiar fecha');
                        } catch (e) {
                            Ice.logWarn(paso, e);
                        }
                    }
                });
            }
            //if (refs.b1_feefecto) {
            //    refs.b1_feefecto.setValue(new Date());
            //}
            
            if(refs.b1_ottempot){
                Ice.log('Cambiando store ottempot',refs.b1_ottempot);
                if(refs.b1_ottempot){
                    refs.b1_ottempot.on({
                        change: function(){
                            Ice.log('Cambiando store ottempot cambiando',refs.b1_ottempot);                            
                            me.cambiarFechasTemporalidad(refs);
                        }
                    });
                }
            }
            
            // agregar disparadores valores defecto fijos
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (refs[name]) {
                    // if (Ext.manifest.toolkit === 'classic') {
                    //     refs[name].setFieldStyle('border-left: 1px solid yellow;');
                    // } else {
                    //     refs[name].setStyle('border-left: 1px solid yellow;');
                    // }
                    
                    
                    if (Ext.manifest.toolkit !== 'classic' && refs[name].isXType('selectfield')) { // para los select
                        refs[name].on({
                            change: function () {
                                me.cargarValoresDefectoFijos();
                            }
                        });
                    } else {
                        refs[name].on({
                            blur: function () {
                                me.cargarValoresDefectoFijos();
                            }
                        });
                    }
                }
            }
            
            
            // agregar disparadores valores defecto variables
            for (var i = 0; i < view.getCamposDisparanValoresDefectoVariables().length; i++) {
                var name = view.getCamposDisparanValoresDefectoVariables()[i];
                if (refs[name]) {
                    // if (Ext.manifest.toolkit === 'classic') {
                    //     refs[name].setFieldStyle('border-right: 1px solid blue;');
                    // } else {
                    //     refs[name].setStyle('border-right: 1px solid blue;');
                    // }
                    
                    
                    if (Ext.manifest.toolkit !== 'classic' && refs[name].isXType('selectfield')) { // para los select
                        refs[name].on({
                            change: function (ref) {
                                me.cargarValoresDefectoVariables(ref);
                            }
                        });
                    } else {
                        refs[name].on({
                            blur: function (ref) {
                                me.cargarValoresDefectoVariables(ref);
                            }
                        });
                    }
                }
            }
            paso='Validando Retroactividad para ejecutivo de negocio';
            if(Ice.sesion.cdsisrol == Ice.constantes.roles.EJECUTIVO_NEGOCIO_SR || Ice.sesion.cdsisrol == Ice.constantes.roles.EJECUTIVO_NEGOCIO_JR){
            	if(Ice.classic()){
            		refs.feca_inicio_vigencia.setMinValue(new Date());
            	}else{
            		refs.feca_inicio_vigencia.on({
            			change:function(dp,value){
            				var paso='validando feini';
            				try{
            					var date = new Date();
            					date.setHours(0,0,0,0);
            					if(value < date){
            						throw 'Fecha inválida debe ser igual o mayor que hoy';
            					}
            				}catch(e){
            					Ice.manejaExcepcion(e,paso);
            					dp.setValue(Ext.Date.format(new Date(),Ext.util.Format.dateFormat));
            				}
            			}
            		});
            	}
            	
            }
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    /*
     * Agrega los valores por defecto de MPOLIZAS al formulario, tambien estado y nmpoliza
     * Solo lo hace si todos los campos de view.camposDisparanValoresDefectoFijos son validos
     * y si view.datosFijosNuevos es true
     */
    cargarValoresDefectoFijos: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos');
        var me = this,
            view = me.getView(),
            refs = view.getReferences() || {},
            nameRefs = Ice.refsToNames(view.getReferences() || {}),
            accedeProcesar = false;
        var paso = 'Cargando valores por defecto fijos de datos generales';
        try {
            if (view.getDatosFijosNuevos() !== true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos los datos fijos no son nuevos');
                return;
            }
            
            if (view.getProcesandoValoresDefecto() === true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos valores defecto ya en proceso');
                return;
            }
            
            var errores = me.obtenerErrores() || {},
                viewValues = view.getValues(),
                valores = {};
            
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (nameRefs[name] && errores[name]) {
                    Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoFijos invalido <', name, ':', errores[name], '>');
                    return;
                }
                valores['params.' + name] = viewValues[name];
            }
            
            valores['params.cdunieco'] = viewValues.cdunieco || view.getCdunieco();
            valores['params.cdramo']   = view.getCdramo();
            valores['params.estado']   = view.getEstado();
            valores['params.nmpoliza'] = viewValues.nmpoliza || view.getNmpoliza();
            valores['params.nmsuplem'] = view.getNmsuplem();
            valores['params.status']   = view.getStatus();

            valores['params.cdptovta'] = (refs.punto_venta   && refs.punto_venta.getValue())   || view.getCdptovta();
            valores['params.cdgrupo']  = (refs.grupo         && refs.grupo.getValue())         || view.getCdgrupo();
            valores['params.cdsubgpo'] = (refs.subgrupo      && refs.subgrupo.getValue())      || view.getCdsubgpo();
            valores['params.cdperfil'] = (refs.perfil_tarifa && refs.perfil_tarifa.getValue()) || view.getCdperfil();
            
            view.setProcesandoValoresDefecto(true);
            accedeProcesar = true;
            
            Ice.request({
                mascara: 'Cargando valores por defecto',
                url: Ice.url.bloque.datosGenerales.valoresDefectoFijos,
                params: valores,
                success: function (action) {
                    var paso2 = 'Seteando valores por defecto';
                    try {                        
                        if (!action.params) {
                            throw 'No se cargaron datos';
                        }
                        
                        if (!action.params.nmpoliza) {
                            throw 'No se gener\u00f3 el n\u00famero cotizaci\u00f3n';
                        }
                        
                        view.setCdunieco(viewValues.cdunieco);
                        view.setNmpoliza(action.params.nmpoliza);
                        
                        if (!view.getCdunieco() || !view.getNmpoliza()) {
                            throw 'No se gener\u00f3 la llave de p\u00f3liza';
                        }
                        
                        view.fireEvent('llaveGenerada', view, view.getCdunieco(), view.getCdramo(), view.getEstado(), view.getNmpoliza(),
                            view.getNmsuplem(), view.getStatus());
                        
                        me.cargarFormulario(action.params, {
                            sinReset: true
                        });
                        
                        //me.cargarValoresDefectoVariables();
                        // no permitir modificar la llave
                        for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                            var name = view.getCamposDisparanValoresDefectoFijos()[i];
                            if (nameRefs[name]) {
                                nameRefs[name].setReadOnly(true);
                            }
                        }

                        view.setDatosFijosNuevos(false);
                        view.setProcesandoValoresDefecto(false);

                        Ext.defer(me.cargarValoresDefectoVariables, 300, me);
                    } catch (e) {
                        view.setProcesandoValoresDefecto(false);
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    view.setProcesandoValoresDefecto(false);
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (accedeProcesar === true) {
                view.setProcesandoValoresDefecto(false);
            }
        }
    },
    
    cargarValoresDefectoVariables: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            nameRefs = Ice.refsToNames(view.getReferences()),
            accedeProcesar = false;
        var paso = 'Cargando valores por defecto variables de datos generales';
        try {
            if (view.getDatosFijosNuevos() === true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables faltan los datos fijos');
                return;
            }

            if (view.getDatosVariablesNuevos() !== true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables los datos variables no son nuevos');
                return;
            }
            
            if (!view.getCdunieco()) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables view no tiene view.cdunieco');
                return;
            }
            
            if (!view.getNmpoliza()) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables view no tiene view.nmpoliza');
                return;
            }
            
            if (view.getProcesandoValoresDefecto() === true) {
                Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables valores defecto ya en proceso');
                return;
            }
            
            var errores = me.obtenerErrores() || {};
            for (var i = 0; i < view.getCamposDisparanValoresDefectoVariables().length; i++) {
                var name = view.getCamposDisparanValoresDefectoVariables()[i];
                if (nameRefs[name] && errores[name]) {
                    Ice.logWarn('Ice.view.bloque.DatosGeneralesController.cargarValoresDefectoVariables invalido <', name, ':', errores[name], '>');
                    return;
                }
            }
            
            var valores = Ice.convertirAParams(view.getValues());
            valores['params.cdunieco'] = view.getCdunieco();
            valores['params.cdramo']   = view.getCdramo();
            valores['params.estado']   = view.getEstado();
            valores['params.nmpoliza'] = view.getNmpoliza();
            valores['params.nmsuplem'] = view.getNmsuplem();
            valores['params.status']   = view.getStatus();

            valores['params.cdptovta'] = (refs.punto_venta   && refs.punto_venta.getValue())   || view.getCdptovta();
            valores['params.cdgrupo']  = (refs.grupo         && refs.grupo.getValue())         || view.getCdgrupo();
            valores['params.cdsubgpo'] = (refs.subgrupo      && refs.subgrupo.getValue())      || view.getCdsubgpo();
            valores['params.cdperfil'] = (refs.perfil_tarifa && refs.perfil_tarifa.getValue()) || view.getCdperfil();
            
            view.setProcesandoValoresDefecto(true);
            accedeProcesar = true;
            
            Ice.request({
                mascara: 'Cargando valores por defecto',
                url: Ice.url.bloque.datosGenerales.valoresDefectoVariables,
                params: valores,
                success: function (action) {
                    var paso2 = 'Seteando valores por defecto';
                    try {
                        if (!action.params) {
                            return;
                        }
                        
                        me.cargarFormulario(action.params, {
                            sinReset: true,
                            callback: function () {
                                view.fireEvent('valoresdefectovariables', view);
                            }
                        });
                        
                        view.setDatosVariablesNuevos(false);
                        view.setProcesandoValoresDefecto(false);
                    } catch (e) {
                        view.setProcesandoValoresDefecto(false);
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    view.setProcesandoValoresDefecto(false);
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (accedeProcesar === true) {
                view.setProcesandoValoresDefecto(false);
            }
        }
    },
    
    onCargarClic: function (button) {
        this.cargar();
    },
    
    
    /*
     * Carga los datos generales
     * @param config (object, opcional): {
     *     callback: (function, opcional)
     * }
     */
    cargar: function (config) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.cargar config:', config);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando bloque de datos generales';
        try {
            Ice.request({
                mascara: 'Recuperando datos generales',
                url: Ice.url.bloque.datosGenerales.cargar,
                params: {
                    'params.cdunieco': view.getCdunieco() || '',
                    'params.cdramo': view.getCdramo() || '',
                    'params.estado': view.getEstado() || '',
                    'params.nmpoliza': view.getNmpoliza() || '',
                    'params.nmsuplem': view.getNmsuplem() || 0,
                    'params.swcolind': view.getSwcolind() || 'I'
                },
                success: function (json) {
                    var paso2 = 'Seteando valores';
                    try {
                        view.setDatosFijosNuevos(false);
                        view.setDatosVariablesNuevos(false);
                        
                        var refs = view.getReferences();
                        Ice.log('Ice.view.bloque.DatosGeneralesController.cargar refs',refs);
                        me.cargarFormulario(json.params);
                        Ice.suspendEvents(view);
                        if (refs.cdunieco) {
                            refs.cdunieco.setValue(view.getCdunieco());
                        }
                        if (refs.nmpoliza) {
                            refs.nmpoliza.setValue(view.getNmpoliza());
                        }
                        Ice.resumeEvents(view);
                        
                        // no permitir modificar la llave
                        for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                            var name = view.getCamposDisparanValoresDefectoFijos()[i];
                            if (refs[name]) {
                                refs[name].setReadOnly(true);
                            }
                        }

                        if(config){
                            config.success();
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    Ice.resumeEvents(view);
                }
            });
        } catch (e) {
            Ice.resumeEvents(view);
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onGuardarClic: function () {
        this.guardar();
    },
    
    
    /**
     * Guarda el formulario.
     * Primero valida contra un modelo, construido con view.modelFields y view.modelValidators.
     * Solo valida campos visibles.
     *
     * @param params (object, opcional):
     * {
     *     success (function, opcional) funcion a ejecutar si se guardan bien los datos ,
     *     failure (function, opcional) funcion a ejecutar si hay algun error
     * }
     */
    guardar: function (params) {
        Ice.log('Ice.view.bloque.DatosGeneralesController.guardar args:', arguments);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Validando datos generales';
        try {
            me.validarFormulario();
            
            var valores = Ice.convertirAParams(view.getValues());
            valores['params.cdunieco'] = view.getValues().cdunieco || view.getCdunieco();
            valores['params.cdramo']   = view.getCdramo();
            valores['params.estado']   = view.getEstado();
            valores['params.nmpoliza'] = view.getValues().nmpoliza || view.getNmpoliza();
            valores['params.nmsuplem'] = view.getNmsuplem();
            valores['params.status']   = view.getStatus();
            valores['params.cdptovta']   = view.getCdptovta();
            valores['params.cdsubgpo']   = view.getCdsubgpo();
            valores['params.cdperfit']   = view.getCdperfil();
            
            paso = 'Guardando datos generales';
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.datosGenerales.guardar,
                params: valores,
                success: function (action) {
                    var paso2 = 'Ejecutando acci\u00f3n posterior al guardado';
                    try {
                        if (action.list && action.list.length > 0) {
                            Ext.create('Ice.view.bloque.VentanaValidaciones', {
                                lista: action.list
                            }).mostrar();
                            
                            var error = false;
                            for (var i = 0; i < action.list.length; i++) {
                                if ((action.list[i].tipo || '').toLowerCase() === 'error') {
                                    error = true; // para que no avance si hay validaciones tipo "error"
                                    break;
                                }
                            }
                            if (error === true) {
                                throw 'Favor de revisar las validaciones';
                            }
                        }
                        
                        if (params && params.success) {
                            paso2 = 'Ejecutando proceso posterior al guardado de datos generales';
                            params.success();
                        } else {
                            Ice.mensajeCorrecto('Datos guardados');
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                        if (params && params.failure) {
                            var paso2 = 'Invocando callback failure al guardar datos generales';
                            try {
                                params.failure();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso2);
                            }
                        }
                    }
                },
                failure: (params && params.failure) || null
            });
            
            /*
            var mask = Ice.mask(paso);
            view.submit({
                url: ,
                success: function (form, action) {
                    Ice.log('datosGenerales.guardar success action:', action);
                    mask.close();
                },
                failure: function (form, action) {
                    Ice.log('datosGenerales.guardar failure action:', action);
                    mask.close();
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ice.mensajeWarning('Favor de revisar los datos');
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ice.mensajeError('Error de red al guardar datos generales');
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            if (action.result.message) {
                                Ice.mensajeError(action.result.message);
                            }
                            break;
                        //case Ext.form.Action.LOAD_FAILURE: solo para cargar, no para guardar
                        //    break;
                        
                    }
                }
            });
            */
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
            if (params && params.failure) {
                var paso2 = 'Invocando callback failure al guardar datos generales';
                try {
                    params.failure();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }
        }
    },
    
    
    onLimpiarClic: function () {
        this.limpiar();
    },
    
    
    limpiar: function () {
        Ice.log('Ice.view.bloque.DatosGeneralesController.limpiar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = "Limpiando bloque de datos generales";
        try {
            Ice.suspendEvents(view);
            view.reset();
            view.setDatosFijosNuevos(true);
            view.setDatosVariablesNuevos(true);
            view.setCdunieco(null);
            view.setNmpoliza(null);
            view.setNmsuplem(0);
            Ice.resumeEvents(view);
            
            // permitir modificar la llave
            for (var i = 0; i < view.getCamposDisparanValoresDefectoFijos().length; i++) {
                var name = view.getCamposDisparanValoresDefectoFijos()[i];
                if (refs[name]) {
                    refs[name].setReadOnly(false);
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    cambiarFechasTemporalidad: function(refs){
        Ice.log('Ice.view.bloque.DatosGeneralesController.cambiarFechasTemporalidad refs',refs);
        if(refs){
            if(refs.b1_ottempot.getValue() == 'R'){
                refs.b1_fevencim.hide();
                refs.b1_feproren.show();
                refs.b1_fevencim.setValue(null);
                refs.b1_feproren.setValue(Ext.Date.add(new Date(refs.b1_feefecto.getValue()), Ext.Date.YEAR, 1));
            } else {
                refs.b1_fevencim.show();
                refs.b1_feproren.hide();
                refs.b1_feproren.setValue(null);
                refs.b1_fevencim.setValue(Ext.Date.add(new Date(refs.b1_feefecto.getValue()), Ext.Date.YEAR, 1));
            }
        }
    }
});