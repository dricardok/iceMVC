// var Ice = Object.assign(Ice || {}, { // (Object.assign da error en explorer)
var Ice = (
        // funcion anonima para mezclar (reemplaza a Object.assign)
        function () {
            var resObj = {};
            for(var i = 0; i < arguments.length; i++) {
                var obj = arguments[i],
                    keys = Object.keys(obj);
                for (var j = 0; j < keys.length; j++) {
                    resObj[keys[j]] = obj[keys[j]];
                }
            }
            return resObj;
        }
    )(Ice || {}, {

    logActivo: true,

    constantes: {
        componente: {
            form: {
                altura: {
                    classic: 400,
                    modern: 400
                }
            },
            grid: {
                altura: {
                    classic: 400,
                    modern: 300
                }
            },
            boton: {
                fontSize: '0.7em'
            },
            ventana: {
                width: 800
            }
        },
    
	    roles: {
            AGENTE: 'AGENTE',
            EJECUTIVO_NEGOCIO_SR: 'COTIZADOR',
            EJECUTIVO_NEGOCIO_JR: 'COTIZAJR',
            MESACONTROL			: 'MESADECONTROL'
		}
    },
    
    /**
     * Urls del sistema por modulos 
     */
    url: {
        // coreLocal
        coreLocal: {
            recuperarComponentes: 'jsonLocal/recuperarComponentes.json',
            login:                'jsonLocal/login.json',
            recuperarRoles:       'jsonLocal/getRoles.json',
            seleccionaRol:        'jsonLocal/seleccionaRol.json',
            logout:               'jsonLocal/logout.json',
            recuperarDatosSesion: 'jsonLocal/recuperarDatosSesion.json',
            recuperarMenus:       'jsonLocal/getMenus.json'
        },
        
        // URLs del core
        core: {
            recuperarComponentes: 'componentes/recuperarComponentes.action',
            login:                'authentication/validaUsuario.action',
            recuperarRoles:       'authentication/obtenerRoles.action',
            seleccionaRol:        'authentication/seleccionarRol.action',
            logout:               'authentication/logout.action',
            recuperarDatosSesion: 'authentication/obtenerDatosSesion.action',
            recuperarMenus:       'authentication/obtenerMenu.action',
            obtenerCatalogo:      'catalogos/obtenerCatalogo.action',
            obtenerPropiedades:   'propiedades/obtenerPropiedades.action', 
            recuperarTatrigar:    'coberturas/obtieneTatrigar.action',
            recuperarTatrisit:    'emision/obtieneTatrisit.action',
            recuperarTatripol:    'emision/obtieneTatripol.action',
            recuperarTatriper:    'registroPersona/obtieneTatriper.action',
            recuperacionSimple:   'recuperacion/recuperar.action'
        },
        
        // URLs de emision
        emision: {
            tarificar:                  'emision/generarTarificacion.action',
            obtenerTarifa:              'emision/obtenerDatosTarificacion.action',
            emitir:                     'emision/confirmarPoliza.action',
            tarificarPlanes:            'emision/generarTarificacionPlanes.action',
            tarificarPlan:              'emision/generarTarificacionPlan.action',
        	obtenerTarifaPlanes:        'emision/obtenerTarifaMultipleTemp.action',
        	obtenerTarifaPlan:          'emision/obtenerDetalleTarifaTemp.action',
        	obtieneTvalopol:            'emision/obtieneTvalopol.action',
        	realizarPago:               'emision/realizarPago.action',
            validarCargaCotizacion:     'emision/validarCargaCotizacion.action',
            obtenerPerfilamientoPoliza: 'emision/obtenerPerfilamientoPoliza.action',
            generarDocumentos: 			'emision/generarDocumentos.action',
            puedeEmitir:				'emision/puedeEmitir.action',
            validaCedulaAgente: 		'emision/datosGenerales/validaCedulaAgente.action',
            obtenerDuplicidad:          'emision/obtenerDuplicidad.action',
            obtenerDuplicidadPoliza:    'emision/obtenerDuplicidadPoliza.action',
            vistaprevia: 				'emision/vistaprevia.action'
         },
         
        bloque: {
        	 
            datosGenerales: {
                cargar: 'emision/datosGenerales/cargar.action',
                guardar: 'emision/datosGenerales/guardar.action',
                valoresDefectoFijos: 'emision/datosGenerales/valoresDefectoFijos.action',
                valoresDefectoVariables: 'emision/datosGenerales/valoresDefectoVariables.action',
                obtenerCoaseguroCedido: 'emision/datosGenerales/obtenerCoaseguroCedido.action',
                obtenerCoaseguroAceptado: 'emision/datosGenerales/obtenerCoaseguroAceptado.action',
                obtenerModeloCoaseguro: 'emision/datosGenerales/obtenerModeloCoaseguro.action',
                movimientoCoaseguroCedido: 'emision/datosGenerales/movimientoCoaseguroCedido.action',
                movimientoMsupcoa: 'emision/datosGenerales/movimientoMsupcoa.action',
                movimientoMpolicoa: 'emision/datosGenerales/movimientoMpolicoa.action',
                eliminaCoaseguro: 'emision/datosGenerales/eliminaCoaseguro.action',
                obtenerExclusionesSituacCoaCedParc: 'emision/datosGenerales/obtenerExclusionesSituacCoaCedParc.action',
                obtenerExclusionesCoberCoaCedParc: 'emision/datosGenerales/obtenerExclusionesCoberCoaCedParc.action',
                obtenerCoaseguroPoliza: 'emision/datosGenerales/obtenerCoaseguroPoliza.action',
                movimientoExclusionesSituacCoaCedParc: 'emision/datosGenerales/movimientoExclusionesSituacCoaCedParc.action',
                movimientoExclusionesCoberCoaCedParc: 'emision/datosGenerales/movimientoExclusionesCoberCoaCedParc.action'
            },
            listaSituaciones: {
                cargar: 'emision/obteneListaSituaciones.action'//'jsonLocal/bloqueDatosSituacionCargar.json'
            },
            situacionesRiesgo: {
                obtener: 'emision/obtenerSituacion.action',                
                editar: 'jsonLocal/bloqueSituacionCargar.json',
                borrar: 'emision/eliminarSituacion.action',                
                cargar: 'emision/obteneListaSituaciones.action',
                actualizar: 'emision/actualizaSituacion.action',
                movimientoMpolisit: 'emision/movimientoMpolisit.action',
                valoresDefectoFijos: 'emision/valoresDefectoFijos.action',
                valoresDefectoVariables: 'emision/valoresDefectoVariables.action',
                validaciones: 'emision/validaBloqueSituacion.action',
                copiaSituacion: 'emision/copiaSituacion.action'
            },
            coberturas:{
                datosCoberturas:            'coberturas/obtieneMpoligar.action',
                borrarCobertura :           'coberturas/movimientoMpoligar.action',//
                recuperarTatrigar:          'coberturas/obtieneTatrigar.action',
                guardarCoberturas:          'coberturas/guardarCoberturas.action',
                obtieneTvalogar:            'coberturas/obtieneTvalogar.action',
                obtieneMpolicap:            'coberturas/obtieneMpolicap.action',
                agregarCobertura:           'coberturas/agregarCobertura.action'
            },
            ejecutarValidacion:         'emision/validaciones.action',
            personas:{
                cargarPersonas:             'emision/obtenerPersonasPoliza.action',
                cargarPersona:              'emision/obtenerPersonaPoliza.action',
                obtenerDomicilios:          'emision/obtenerDomicilios.action',
                movimientoPolizaPersona:    'emision/movimientoPolizaPersona.action',
                obtenerPersonaCriterio:     'emision/obtenerPersonaCriterio.action',
                guardarPersona:				'registroPersona/guardarPersona.action',
            	movimientoDomicilio:		'registroPersona/movimientoDomicilio.action',
            	obtenerPersona:				'registroPersona/obtienePersona.action',
            	buscaCP:					'registroPersona/obtieneCdpost.action',
            	obtenerDomicilio:			'registroPersona/obtieneDomicilio.action'
            },
            agentes:{
            	cargar: 			    'emision/agentes/cargar.action',
            	cargarAgentes: 		    'emision/agentes/cargarAgentes.action',
            	guardar:			    'emision/agentes/guardarAgentes.action',
            	buscar:				    'emision/agentes/buscarAgentes.action',
                validarAgente:		    'emision/agentes/validarAgente.action'
            },
            agrupadores: {
                obtenerAgrupador:        'emision/obtenerMpoliagr.action',
                movimientoAgrupador:     'emision/realizarMovimientoMpoliagr.action',
                obtenerAgrupadoresVista: 'emision/obtenerMpoliagrVista.action'
            },
            documentos: {
                obtenerDocumentos: 'documentos/obtenerDocumentos.action',
                movimientoTdocupol: 'documentos/movimientoTdocupol.action',
                obtenerDocumento: 'documentos/obtenerDocumento.action',
                verArchivo: 'documentos/verArchivo.action',
                descargarArchivo: 'documentos/descargarArchivo.action',
                subirArchivo: 'documentos/subirArchivo.action'
            },
            mesacontrol:{
            	
            	obtenerTramites:		'mesacontrol/obtenerTramites.action',
            	movimientoMesacontrol:	'mesacontrol/movimientoMesacontrol.action',
            	documentos: {
                    obtenerDocumentos: 'documentos/obtenerDocumentos.action',
                    movimientoTdocupol: 'documentos/movimientoTdocupol.action',
                    obtenerDocumento: 'documentos/obtenerDocumento.action'
                },
            	
            	historial:{
            		obtenerTdmesacontrol:"mesacontrol/historial/obtenerTdmesacontrol.action",
            		obtenerThmesacontrol:"mesacontrol/historial/obtenerThmesacontrol.action",
            		movimientoThmesacontrol:'mesacontrol/historial/movimientoTdmesacontrol.action'
            	},
            	
            	turnar                             : 'despachador/turnarTramite.action',
            	pantallaExterna                    : 'flujomesacontrol/pantallaExterna.action',
                cargarAccionesEntidad              : 'flujomesacontrol/cargarAccionesEntidad.action',
                ejecutarValidacion                 : 'flujomesacontrol/ejecutaValidacion.action',
                obtenerDatosValidacionCliente      : 'flujomesacontrol/recuperarDatosTramiteValidacionCliente.action',
                ejecutarRevision                   : 'flujomesacontrol/ejecutaRevision.action',
                marcarRevisionConfirmada           : 'flujomesacontrol/marcarRevisionConfirmada.action',
                marcarRequisitoRevision            : 'flujomesacontrol/marcarRequisitoRevision.action',
                subirArchivoRequisito              : 'documentos/subirArchivoRequisito.action',
                enviaCorreoFlujo                   : 'flujomesacontrol/enviaCorreoFlujo.action',
                obtenerTramiteCompleto             : 'flujomesacontrol/obtenerTramiteCompleto.action',
                ejecutarValidacionPorReferencia    : 'mesacontrol/ejecutarValidacionPorReferencia.action',
                ejecutarValidacionesEventoPantalla : 'mesacontrol/ejecutarValidacionesEventoPantalla.action',
                registrarNuevoTramite              : 'mesacontrol/registrarNuevoTramite.action',
                obtenerAgenteXUsuario              : 'mesacontrol/cargarCdagentePorCdusuari.action',
                actualizarCotizacionTramite        : 'flujomesacontrol/actualizarCotizacionTramite.action'
            },
            datosAuxiliares: {
                cargar: 'emision/datosAuxiliares/cargarDatosAuxiliares.action',
                guardar: 'emision/datosAuxiliares/guardarDatosAuxiliares.action'
            }
        }
    },

    /**
     * Rutas para los archivos, no son url, son rutas locales relativas al contexto
     */
    ruta: {
        iconos: 'res/images/fam3icons/icons/'
    },

    /**
     * Datos del usuario en sesion
     */
    sesion: {
        cdusuari: null,
        cdsisrol: null
    },

    /**
     * Invoca console.log si Ice.logActivo === true
     */
    log: function () {
        if (Ice.logActivo === true && arguments.length > 0) {
            switch (arguments.length) {
                case 1:
                    console.log(arguments[0]);
                    break;
                case 2:
                    console.log(arguments[0], arguments[1]);
                    break;
                case 3:
                    console.log(arguments[0], arguments[1], arguments[2]);
                    break;
                case 4:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
                    break;
                case 5:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    break;
                case 6:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                    break;
                case 7:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6]);
                    break;
                case 8:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7]);
                    break;
                case 9:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8]);
                    break;
                case 10:
                    console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                    break;
                default:
                    console.log(arguments);
                    break;
            }
        }
    },
    
    /**
     * Invoca console.warn si Ice.logActivo === true
     */
    logWarn: function () {
        if (Ice.logActivo === true && arguments.length > 0) {
            switch (arguments.length) {
                case 1:
                    console.warn('Warning!:', arguments[0]);
                    break;
                case 2:
                    console.warn('Warning!:', arguments[0], arguments[1]);
                    break;
                case 3:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2]);
                    break;
                case 4:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3]);
                    break;
                case 5:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    break;
                case 6:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                    break;
                case 7:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6]);
                    break;
                case 8:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7]);
                    break;
                case 9:
                    console.warn('Warning!:', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8]);
                    break;
                default:
                    console.warn('Warning!:', arguments);
                    break;
            }
        }
    },
    
    /**
     * Invoca console.error si Ice.logActivo === true
     */
    logError: function () {
        if (Ice.logActivo === true && arguments.length > 0) {
            switch (arguments.length) {
                case 1:
                    console.error('Error!: ', arguments[0]);
                    break;
                case 2:
                    console.error('Error!: ', arguments[0], arguments[1]);
                    break;
                case 3:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2]);
                    break;
                case 4:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3]);
                    break;
                case 5:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                    break;
                case 6:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5]);
                    break;
                case 7:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6]);
                    break;
                case 8:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7]);
                    break;
                case 9:
                    console.error('Error!: ', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4],
                        arguments[5], arguments[6], arguments[7], arguments[8]);
                    break;
                default:
                    console.error('Error!: ', arguments);
                    break;
            }
        }
    },
    
    /**
     * Recibe una excepcion, y la vuelve a lanzar. Si es string ya fue tratada y no hace nada,
     * en otro caso la loguea y formatea antes de lanzarla
     */
    generaExcepcion: function (e, paso, mask) {
        if (typeof e === 'string') {
            throw e;
        } else {
            Ice.logError(e);
            try {
                if (mask.maskLocal === true) {
                    mask.close();
                }
            } catch (e) {}
            throw 'Error ' + ((paso || 'del sistema').toLowerCase());
        }
    },
    
    /**
     * Recibe una excepcion y muestra mensaje de error. Si es string ya fue tratada y se muestra,
     * en otro caso la loguea y formatea antes de mostrarla
     */
    manejaExcepcion: function (e, paso, mask) {
        if (typeof e === 'string') {
            if (e.indexOf('break') === -1) { // cuando viene la palabra BREAK no muestro el error 
                Ice.mensajeWarning(e);
            } else {
                Ice.logWarn('BREAK:', e);
            }
        } else {
            Ice.logError(e);
            try {
                if (mask.maskLocal === true) {
                    mask.close();
                }
            } catch (e) {}
            Ice.mensajeError('Error ' + ((paso || 'del sistema').toLowerCase()));
        }
    },
    
    /**
     * Atajo para Ext.ComponentQuery.query.
     * Si el arreglo de resultados es de longitud 1, se regresa el objeto en lugar del arreglo
     */
    query: function (selector, root) {
        var comps = Ext.ComponentQuery.query(selector, root);
        if (comps && comps.length === 1) { // Cuando encuentro array con 1 elemento, regreso el elemento
            return comps[0];
        }
        return comps;
    },
    
    /**
     * Crea y muestra una mascara en pantalla con el texto recibido o la palabra "Cargando".
     * Retorna la mascara a la cual se debe hacer .close()
     */
    mask: function (texto) {
        Ice.log('Ice.mask() args:', arguments);
        var paso = 'Creando m\u00e1scara',
            mask;
        try {
            var mainView = Ice.query('#mainView');
            if (Ext.manifest.toolkit === 'classic') {
                mask = new Ext.LoadMask({
                    msg: texto || 'Cargando...',
                    maskLocal: true,
                    target: mainView,
                    style: "z-index:999999;",
                    close: function () {
                    this.hide();
                    }
                });
                mask.show();
            } else {
                mask = new Ext.LoadMask({
                    message: texto || 'Cargando...',
                    maskLocal: true,
                    close: function () {
                     this.hide();
                    }
                });
                mainView.add(mask);
            }
            return mask;
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    /**
     * Presenta aviso en pantalla, recibe objeto params:
     * params: {
     *  titulo: 'Datos guardados',
     *  mensaje: 'Poliza emitida correctamente'
     * }
     */
    toast: function (params) {
    	var paso = 'Mostrando Aviso';
    	try {
    		var titulo = (params && params.titulo) || 'Aviso',
            	mensaje = (params && params.mensaje) || (params && typeof params === 'string' && params) || '(sin mensaje)';
    			
    		if (Ext.manifest.toolkit === 'classic') {
    			Ext.toast({
    				  title: titulo,
    				  timeout: 1000,
    				  html: mensaje,
    				  width: 300,
    				  align: 't'
    				});
    		} else {
    			Ext.toast(mensaje, 1000);
    		}
    		
    	} catch (e) {
    		Ice.manejaExcepcion(e, paso);
    	}
    },
    
    /**
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensaje: function (params) {
    	params.ui='ice-window';
        var paso = 'Mostrando mensaje';
        try {
            var titulo = (params && params.titulo) || 'Aviso',
                mensaje = (params && params.mensaje) || (params && typeof params === 'string' && params) || '(sin mensaje)',
                callback = (params && params.callback) || null,
                ui = (params && params.ui) || null;
            	
            if (Ext.manifest.toolkit === 'classic') {
                Ext.create('Ext.window.Window', {
                    width: 400,
//                    ui:	'ice-window',
                    frame:true,
                    minHeight: 150,
                    maxHeight: 600,
                    closeAction: 'destroy',
                    title: titulo,

                    modal: true,
                    animateTarget: Ext.getBody(),
                    layout: 'fit',
                    bodyStyle: 'border:none; padding: 10px;',
                    buttonAlign: 'center',

                    items: [{
                        xtype: 'container',
                        html: mensaje
                    }],
                    buttons: [{
                        text: 'Aceptar',
                        listeners: {
                            click: {
                                fn: function (item, e) {
                                    this.up('window').close();
                                }
                            }
                        }
                    }],
                    listeners: {
                        close: function () {
                            if (callback) {
                                var paso2 = 'Ejecutando callback despues de mensaje';
                                try {
                                    callback();
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso2);
                                }
                            }
                        }
                    }
                }).show();
            } else {
                Ext.create('Ext.Container', {
                    floated: true,
                    centered: true,

                    modal: true,
                    showAnimation: 'pop',
                    hideAnimation: 'popOut',
                    hideOnMaskTap: true,
                    ui:ui,
                    closable: false,
                    closeAction: 'destroy',
                    
                    layout: 'default',
                    
                    mensajeIce: true,
                    
                    items: [
                        {
                            xtype: 'toolbar',
                            docked: 'top',
                            ui: 'header',
                            items: [
                                {
                                    xtype: 'label',
                                    html: titulo
                                }, '->', {
                                    iconCls: 'x-fa fa-close',
                                    handler: function (me) {
                                        me.up('[mensajeIce=true]').hide();
                                    }
                                }
                            ]
                        }, {
                            xtype: 'container',
                            padding: '10px',
                            html: mensaje
                        }, {
                            xtype: 'toolbar',
                            docked: 'bottom',
                            ui: 'footer',
                            items: [
                                '->', {
                                    text: 'Aceptar',
                                    iconCls: 'x-fa fa-check',
                                    handler: function (me) {
                                        me.up('[mensajeIce=true]').hide();
                                    }
                                }, '->'
                            ]
                        }
                    ],

                    listeners: {
                        hide: function () {
                            if (callback) {
                                var paso2 = 'Ejecutando callback despues de mensaje';
                                try {
                                    callback();
                                } catch (e) {
                                    Ice.manejaExcepcion(e, paso2);
                                }
                            }
                        }
                    }
                }).show();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    /**
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensajeCorrecto: function (params) {
        Ice.mensaje(params);
    },
    
    /**
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensajeError: function (params) {
        Ice.mensaje(params);
    },
    
    
    /**
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensajeWarning: function (params) {
        Ice.mensaje(params);
    },
    
    
    /**
     * Ejecuta una peticion AJAX, recibe objeto params:
     * params: {
     *     url: 'someUrl',                          <<< URL a ejecutar
     *     params: {                                <<< parametros a enviar (opcional) (se envia este o se envia jsonData)
     *         param1: value1, ...
     *     },
     *     jsonData: jsonObject,                    <<< parametros json (opcional) (se envia este o se envia params)
     *     success: function (responseJsonData) {}, <<< callback en caso de exito (opcional)
     *     failure: function () {},                 <<< callback en caso de error (opcional)
     *     mascara: 'Guardando datos',              <<< Texto a mostrar mientras se espera respuesta (opcional)
     *     background: true,                        <<< Para que no robe el focus en pantalla (opcional)
     *     timeout: 1000*60*2                       <<< timeout para la peticion en milliseconds
     *     async: true								<<< Tipo de peticion 
     * }
     * throws exception
     */
    request: function (params) {
        Ice.log('Ice.request:', params);
        var paso = params.mascara || 'Enviando petici\u00f3n...',
            mask = params.background === true
                ? {close: function (){}}
                : Ice.mask(paso);
        try {
            var requestParams = {
            	async:params.async===false?false:true,
                url: params.url,
                success: function (response) {
                    Ice.log('Ice.request.response: ', response);
                    mask.close();
                    var paso2 = 'Decodificando respuesta del proceso: ' + ((params.mascara || 'enviando petici\00f3n').toLowerCase());

                    try {
                        var json = Ext.JSON.decode(response.responseText);
                        Ice.log('### ' + params.url.slice(-50) + ' json:', json);
                        if (json.success !== true) {
                            throw json.message || (params.mascara
                                ? 'Error ' + params.mascara.toLowerCase()
                                : 'La petici\u00f3n no fue exitosa');
                        }
                        if (params.success && typeof params.success === 'function') {
                            paso2 = 'Ejecutando callback posterior al request';
                            params.success(json);
                        }
                    } catch (e) {
                        if (params.failure && typeof params.failure === 'function') {

                            try {
                                params.failure();
                            } catch (e) {
                                Ice.logWarn('Error al ejecutar callback failure despues de request:', e);
                            }
                        }
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    mask.close();
                    if (params.failure && typeof params.failure === 'function') {

                        try {
                            params.failure();
                        } catch (e) {
                            Ice.logWarn('Error al ejecutar callback failure despues de error de red de request:', e);
                        }
                    }
                    Ice.mensajeError('Error de red ' + (params.mascara || '').toLowerCase());
                }
            };
            if (params.params) {
                requestParams.params = params.params;
            } else if (params.jsonData) {
                requestParams.jsonData = params.jsonData;
            }
            if(params.timeout){
           	 requestParams.timeout = params.timeout;
            }
            Ext.Ajax.request(requestParams);
        } catch (e) {
            Ice.generaExcepcion(e, paso, mask);
        }
    },
    
    
    /**
     * Funcion que recibe la lista (o un solo mapa) de componentes deseados y retorna los elementos generados
     * @param secciones: [
     *     {
     *         pantalla: 'MESA_CONTROL',
     *         seccion: 'FILTRO',
     *         modulo: 'COTIZACION',
     *         estatus: 2,
     *         cdramo: '5',
     *         cdtipsit: '51',
     *         auxkey: '',
     *         
     *         items: true,
     *         columns: false,
     *         buttons: false,
     *         listeners: true,
     *         fields: true,
     *         validators: true
     *     }, {
     *         pantalla: 'MESA_CONTROL',
     *         seccion: 'FORMULARIO',
     *         ...
     *     }
     * ]
     * @return: {
     *     MESA_CONTROL: {
     *         FILTRO: {
     *             items: [...],
     *             columns: [...],
     *             buttons: [...],
     *             listeners: [...],
     *             fields: [...],
     *             validators: [...]
     *         },
     *         FORMULARIO: {
     *             items: [...],
     *             columns: [...],
     *             buttons: [...],
     *             listeners: [...],
     *             fields: [...],
     *             validators: [...]
     *         }
     *     }
     * }
     */
    generaComponentes: function (secciones) {
        Ice.log('Ice.generaComponentes args:', arguments);
        var paso = 'Recuperando componentes',
            comps = {};
        try { 
            if(secciones){
                Ice.log("sec ",secciones)
                if ("TATRIGAR" == secciones.pantalla && "TATRIGAR" == secciones.seccion) {
                     secciones.mapperAttr=function(obj){
                            //obj.label=obj.dsatribu;
                            obj.tipocampo=obj.swformat
                            obj.name_cdatribu=obj.cdatribu
                            obj.maxlength=obj.nmlmax
                            obj.minlength=obj.nmlmin
                            obj.catalogo=Ext.isEmpty((""+obj.ottabval).trim())?false:obj.ottabval
                            Ice.log("******",obj.catalogo)
                            if(obj.catalogo){
                                obj.catalogo='TATRIGAR';
                            }
                            
                            obj.param1 = 'params.cdramo';
                            obj.value1 = secciones.cdramo;
                            
                            obj.param2 = 'params.cdgarant';
                            obj.value2 = secciones.cdgarant;
                            
                            obj.param3 = 'params.cdatribu';
                            obj.value3 = obj.cdatribu;
                        };
                      secciones.url=Ice.url.core.recuperarTatrigar;
                      secciones.rootRequestData="list"
                } else if ("TATRIPER" == secciones.pantalla && "TATRIPER" == secciones.seccion) {
                    secciones.url= Ice.url.core.recuperarTatriper;
                    secciones.rootRequestData="list";
                    secciones.mapperAttr=function(obj){
                        obj.label=obj.dsatribu;
                        obj.tipocampo=obj.swformat;
                        obj.name_cdatribu=obj.cdatribu;
                        obj.maxlength=obj.nmlmax;
                        obj.minlength=obj.nmlmin;
                        obj.catalogo=Ext.isEmpty((""+obj.ottabval).trim())?false:obj.ottabval;
                        
                        if(obj.catalogo){
                            obj.catalogo='TATRIPER';
                        }
                                
                        obj.param1 = 'params.cdramo';
                        obj.value1 = secciones.cdramo;
                        
                        obj.param2 = 'params.cdrol';
                        obj.value2 = secciones.cdrol.toUpperCase();
                        
                        obj.param3 = 'params.cdatribu';
                        obj.value3 = obj.cdatribu;
                    }     
                } else if ("TATRISIT" == secciones.pantalla && "TATRISIT" == secciones.seccion) {
                    secciones.mapperAttr=function(obj){
                        
                        obj.label=obj.dsatribu;
                        obj.tipocampo=obj.swformat
                        obj.name_cdatribu=obj.cdatribu
                        obj.maxlengthe=obj.nmlmax
                        obj.minlength=obj.nmlmin
                        obj.catalogo=obj.ottabval
                    };
                  secciones.url=Ice.url.core.recuperarTatrisit;
                  secciones.rootRequestData="list";
                    
                } else if ("TATRIPOL" == secciones.pantalla && "TATRIPOL" == secciones.seccion) {
                    secciones.mapperAttr=function(obj){
                        
                        obj.label=obj.dsatribu;
                        obj.tipocampo=obj.swformat
                        obj.name_cdatribu=obj.cdatribu
                        obj.maxlengthe=obj.nmlmax
                        obj.minlength=obj.nmlmin
                        obj.catalogo=obj.ottabval
                    };
                  secciones.url=Ice.url.core.recuperarTatripol;
                  secciones.rootRequestData="list"
                }
            }
            var lista,
                secciones = secciones || [];
            if (secciones.pantalla) { // cuando se recibe un solo elemento
                lista = [];
                lista.push(secciones);
            } else {
                lista = secciones;
            }
            var data = {
                secciones: lista
            };
            if (secciones.rootRequestData) {
                data[secciones.rootRequestData]=lista;
            }

            Ext.Ajax.request({
                async: false,
                url: secciones.url ? secciones.url :Ice.url.core.recuperarComponentes,
                jsonData: data,
                success: function (response) {
                	
                    paso = 'Decodificando respuesta al recuperar componentes';
                    var json = Ext.JSON.decode(response.responseText);
                    Ice.log('Ice.generaComponentes json response:', json);
                    if (json.success !== true) {
                        throw json.message;
                    }
                    
                    try{
                		Ice.sesion.cdusuari=json.params.cdusuari;
                		Ice.sesion.cdsisrol=json.params.cdsisrol;
                	}catch(e){
                		console.warn(e)
                	}
                    if (json.params && json.params.redirect) {
                        paso = 'Redirigiendo componente';
                        var mainView = Ice.query('#mainView'),
                            mainReferences = mainView.getReferences(),
                            mainController = mainView.getController(),
                            navigationTreeList;
                        if (Ext.manifest.toolkit === 'classic') {
                            navigationTreeList = mainReferences.navigationTreeList;
                        } else {
                            navigationTreeList = mainReferences.navigation.down('treelist');
                        }
                        navigationTreeList.getStore().getRoot().removeAll();
                        navigationTreeList.getStore().reload();
                        mainController.cargarDatosSesion();
                        mainController.redirectTo(json.params.redirect + '.action');
                        throw 'break -se va a redireccionar la pantalla: ' + json.params.redirect;
                    }
                    
                    if (lista.length > 0 && lista[0].pantalla !== 'LOGIN' && lista[0].pantalla !== 'ROLTREE') {
                        paso = 'Construyendo componentes';
                        for (var i = 0; i < lista.length; i++) {
                            comps[lista[i].pantalla] = comps[lista[i].pantalla] || {};
                          //mapper
                            if(secciones.mapperAttr){
                                paso="Mapeando campos"
                                
                                if(Ext.isArray(json.componentes[lista[i].seccion])){
                                    json.componentes[lista[i].seccion].forEach(function(it,idx){
                                        secciones.mapperAttr(it);
                                    })
                                }
                            }
                            comps[lista[i].pantalla][lista[i].seccion] = Ice.generaSeccion(json.componentes[lista[i].seccion],
                                {
                                    items: lista[i].items === true,
                                    columns: lista[i].columns === true,
                                    buttons: lista[i].buttons === true,
                                    listeners: lista[i].listeners === true,
                                    fields: lista[i].fields === true,
                                    validators: lista[i].validators === true,
                                    eventos: lista[i].eventos === true
                                }
                            );
                        }
                    } else {
                        Ice.log('No se construye porque no hay secciones o es login o es roltree lista:', lista);
                    }
                },
                failure: function () {
                    throw 'Error de red al recuperar componentes';
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.generaComponentes comps:', comps);
        return comps;
    },
    
    
    /**
     * Se genera una seccion con sus items, columns y/o buttons
     * @param configComps: [
     *     {
     *         tipocampo: 'A',
     *         name_cdatribu: 'cdunieco',
     *         label: 'SUCURSAL'
     *     },
     *     ...
     * ]
     * @param banderas: {
     *     items: (boolean),
     *     columns: (boolean),
     *     buttons: (boolean),
     *     listeners: (boolean),
     *     fields: (boolean),
     *     validators: (boolean),
     *     eventos: (boolean)
     * }
     * @return seccion: {
     *     items: [
     *         {
     *             xtype: 'numberfield',
     *             fieldLabel: 'SUCURSAL',
     *             name: 'cdunieco'
     *         },
     *         ...
     *     ],
     *     columns: [ ... ],
     *     buttons: [ ... ],
     *     listeners: [ ... ],
     *     fields: [ ... ],
     *     validators: [ ... ],
     *     eventos: {}
     * }
     */
    generaSeccion: function (configComps, banderas) {
        Ice.log('Ice.generaSeccion args:', arguments);
        var paso = 'Generando secci\u00f3n',
            seccion = {};
        try {
            if (!banderas) {
                throw 'Sin par\u00e1metros para generar secci\u00f3n';
            }
            var configComps = configComps || [];
            if (banderas.items === true) {
                seccion.items = Ice.generaItems(configComps);
            }
            if (banderas.columns === true) {
                seccion.columns = Ice.generaColumns(configComps);
            }
            if (banderas.buttons === true) {
                seccion.buttons = Ice.generaButtons(configComps);
            }
            if (banderas.listeners === true) {
                seccion.listeners = Ice.generaListeners(configComps);
            }
            if (banderas.fields === true) {
                seccion.fields = Ice.generaFields(configComps);
            }
            if (banderas.validators === true) {
                seccion.validators = Ice.generaValidators(configComps);
            }
            if (banderas.eventos === true) {
                seccion.eventos = Ice.generaEventos(configComps);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return seccion;
    },
    
    
    /**
     * Genera un arreglo de items para formulario
     */
    generaItems: function (configComps, modoExt4, contexto) {
        Ice.log('Ice.generaItems args:', arguments);
        var paso = 'Generando items',
            items = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                items.push(Ice.generaItem(configComps[i], modoExt4, contexto));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return items;
    },
    
    
    /**
     * Genera un arreglo de columnas para grid.
     * Solo considera swcolumn = S
     */
    generaColumns: function (configComps) {
        Ice.log('Ice.generaColumns args:', arguments);
        var paso = 'Generando columnas',
            columns = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                if(configComps[i].swcolumn === 'S'){                    
                    columns.push(Ice.generaColumn(configComps[i]));
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return columns;
    },
    
    
    /**
     * Genera un arreglo de botones
     */
    generaButtons: function (configComps) {
        Ice.log('Ice.generaButtons args:', arguments);
        var paso = 'Generando botones',
            buttons = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                buttons.push(Ice.generaButton(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return buttons;
    },
    
    
    /**
     * Genera un arreglo de listeners
     */
    generaListeners: function (configComps) {
        Ice.log('Ice.generaListeners args:', arguments);
        var paso = 'Generando listeners',
            listeners = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                listeners.push(Ice.generaListener(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return listeners;
    },
    
    
    /**
     * Genera un arreglo de fields para model.fields o store.fields
     */
    generaFields: function (configComps) {
        Ice.log('Ice.generaFields args:', arguments);
        var paso = 'Generando fields',
            fields = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                fields.push(Ice.generaField(configComps[i]));
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return fields;
    },
    
    
    /**
     * Genera un objeto de validadores para model.validators
     */
    generaValidators: function (configComps) {
        Ice.log('Ice.generaValidators args:', arguments);
        var paso = 'Generando validators',
            validators = {};
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                var validator = Ice.generaValidator(configComps[i]);
                if (validator) {
                    validators[validator.nombre] = validator.arreglo;
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return validators;
    },

    generaEventos: function (configComps) {
        Ice.log('Ice.generaEventos configComps:', configComps);
        var paso = 'Construyendo eventos',
            eventos = {};
        try {
            configComps = configComps || [];
            if (configComps.length === 0) {
                Ice.logWarn('No se recuperaron eventos de la bd');
            } else if (configComps.length > 1) {
                throw 'Eventos duplicados';
            } else {
                var eventosString = configComps[0];
                Ice.log('Evento se intenta hacer decode:', eventosString.handler);
                eventos = Ext.JSON.decode(eventosString.handler);
                Ice.log('eventos:', eventos);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return eventos;
    },
    
    
    /**
     * Genera un item para formulario
     */
    generaItem: function (config, modoExt4, contexto) {
        //Ice.log('Ice.generaItem args:', arguments);
        var paso = 'Construyendo item',
            item = {};
        try {
            if (!config) {
                throw 'No se recibi\u00f3 configuraci\u00f3n de item';
            }
            
            if (modoExt4 !== true) {
                // xtype
                item.xtype = {
                    A: 'textfieldice',
                    N: 'numberfieldice', // int
                    P: 'numberfieldice', // float
                    M: 'numberfieldice', // money
                    F: 'datefieldice',
                    T: 'textareaice',
                    S: 'switchice',
                    FF: 'filefieldice',
                    CDPERSONPICKER: 'cdpersonpicker',
                    CDAGENTEPICKER: 'cdagentepicker',
                    PASSWORD: 'textfieldice',
                    PUNTOVENTAPICKER: 'puntoventapicker',
                    DOMICILIOPICKER: 'domiciliopicker',
                    RFCFIELD: 'rfcfieldice'
                }[config.tipocampo];
                if (!item.xtype) {
                    throw 'Tipocampo incorrecto para item';
                }
                if (config.catalogo) {
                    item.xtype = 'comboice';
                    item.catalogo = config.catalogo;
                    if(!Ext.isEmpty(config.queryparam)){
                        item.queryParam = config.queryparam;
                        item.queryCaching = false;
                        item.queryMode = "remote";
                        item.autoLoad = false;
                        item.hideTrigger = true;
                        item.minChars = 3;
                        item.fieldStyle = 'text-transform:uppercase';
                    }
                }
            } else {
                // xtype
                item.xtype = {
                    A: 'textfield',
                    N: 'numberfield', // int
                    P: 'numberfield', // float
                    M: 'numberfield', // money
                    F: 'datefield',
                    T: 'textarea',
                    // S: 'switchice',
                    FF: 'filefield'
                    // CDPERSONPICKER: 'cdpersonpicker',
                    // CDAGENTEPICKER: 'cdagentepicker',
                    // PASSWORD: 'textfieldice'
                }[config.tipocampo];
                if (!item.xtype) {
                    throw 'Tipocampo incorrecto para item';
                }
                if (config.catalogo) {
                    item.xtype = 'comboice';
                    
                    item.modoExt4 = true;
                    item.contexto = contexto;

                    item.catalogo = config.catalogo;
                    if(!Ext.isEmpty(config.queryparam)){
                        item.queryParam = config.queryparam;
                        item.queryCaching = false;
                        item.queryMode = "remote";
                        item.autoLoad = false;
                        item.hideTrigger = true;
                        item.minChars = 3;
                        item.fieldStyle = 'text-transform:uppercase';
                    }
                }
            }
            
            
            // padres
            if (item.xtype === 'comboice' && config.padres) {
                item.padres = config.padres.split(',');
            }
            
            // padres rfc field
            if (item.xtype === 'rfcfieldice' && config.padres) {
                item.padres = config.padres.split(',');
            }
            
            
            // format
            if (item.xtype === 'datefieldice') {
                item.format = Ext.util.Format.dateFormat;
            }
            
            
            // name_cdatribu
            if (!config.name_cdatribu) {
                throw 'Falta name_cdatribu para item';
            }
            
            if (/^\d+$/.test(config.name_cdatribu)) {
                item.name = 'otvalor' + (('x000' + config.name_cdatribu).slice(Number(config.name_cdatribu) > 100 ? -3 : -2));
            } else {
                item.name = config.name_cdatribu;
            }
            
            
            // reference
            item.reference = config.referencia || item.name;
            
            
            // label
            if (config.label) {
                if (modoExt4 !== true) {
                    item.label = config.label
                } else {
                    item.fieldLabel = config.label;
                }
            }
            
            
            // readOnly
            if (config.swlectura === 'S') {
                item.readOnly = true;
            }
            
            // value default
            if (config.value ) {
                item.value = config.value;
            }
            
            
            // hidden
            if (config.swoculto === 'S') {
                item.oculto = 'S'; // para mostrar / ocultar con boton
                if (false && Ice.logActivo === true) {
                    item.style = 'border-bottom: 1px solid red;';
                } else {
                    item.hidden = true;
                }
            }
            
            
            // param1...5 / value1...5
            if (config.param1) { item.param1 = config.param1 }
            if (config.param2) { item.param2 = config.param2 }
            if (config.param3) { item.param3 = config.param3 }
            if (config.param4) { item.param4 = config.param4 }
            if (config.param5) { item.param5 = config.param5 }
            if (config.value1) { item.value1 = config.value1 }
            if (config.value2) { item.value2 = config.value2 }
            if (config.value3) { item.value3 = config.value3 }
            if (config.value4) { item.value4 = config.value4 }
            if (config.value5) { item.value5 = config.value5 }

            
            // validaciones
            if (modoExt4 === true || Ext.manifest.toolkit === 'classic') {
                if (config.swobliga === 'S') {
                    item.allowBlank = false;
                }
                if (config.minlength && !config.catalogo) {
                    item.minLength = config.minlength;
                }
                if (config.maxlength && !config.catalogo) {
                    item.maxLength = config.maxlength;
                }
                if (config.minvalue && !config.catalogo) {
                    item.minValue = config.minvalue;
                }
                if (config.maxvalue && !config.catalogo) {
                    item.maxValue = config.maxvalue;
                }
            }
            if (item.xtype === 'numberfieldice') {
                item.minValue = item.minValue || 0; // para todos los campos numericos si no hay definifo es 0
                item.decimalPrecision = 10; // se permiten 10 decimales
            }
            
            
            // password
            if (config.tipocampo === 'PASSWORD') {
                item.inputType = 'password';
            }


            // para el tipo int
            if (config.tipocampo === 'N') {
                item.allowDecimals = false;
            }

            // para el tipo money
            if (config.tipocampo === 'M') {
                item.useThousandSeparator = true;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return item;
    },
    
    
    /**
     * Genera una columna para grid
     */
    generaColumn: function (config) {
        Ice.log('Ice.generaColumn args:', arguments);
        var paso = 'Construyendo column',
            column = {};
        try {
            if (!config) {
                throw 'No se recibi\u00f3 configuraci\u00f3n de column';
            }
            
            // width // flex
            if (config.width && Number(config.width) < 10) { // config.width < 10 es flex, se pasa a flex y se borra
                if (!config.flex) {
                    config.flex = config.width;
                }
                config.width = null;
                delete config.width;
            }

            if(!config.flex){
                if(!config.width){
                    column.flex = 1;
                    column.minWidth = 100;
                } else {
                    column.width = Number(config.width);
                }
            } else {
                if(!config.width){
                    column.flex = Number(config.flex);
                    column.minWidth = 100;
                } else {
                    column.minWidth = Number(config.width);
                    column.flex =Number( config.flex);
                }
            }
            
            if(config.swoculto === 'S'){
                column.hidden = true;
            }
            
            
            // dataIndex
            if (!config.name_cdatribu) {
                throw 'Falta name_cdatribu para column';

            }
            
            if (/^\d+$/.test(config.name_cdatribu)) {
                column.dataIndex = 'otvalor' + (('x000' + config.name_cdatribu).slice(Number(config.name_cdatribu) > 100 ? -3 : -2));
            } else {
                column.dataIndex = config.name_cdatribu;
            }
            
            
            // text
            if (config.label) {
                column.text = config.label
            }

            // renderer para money
            if (config.tipocampo === 'M') {
                column.renderer = config.renderer || Ext.util.Format.usMoney;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return column;
    },
    
    
    /**
     * Genera un boton
     */
    generaButton: function (config) {
        Ice.log('Ice.generaButton args:', arguments);
        alert('Ice.generaButton TODO');
    },
    
    
    /**
     * Genera un listener
     */
    generaListener: function (config) {
        Ice.log('Ice.generaListener args:', arguments);
        alert('Ice.generaListener TODO');
    },
    
    
    /**
     * Genera un field para model.fields o store.fields
     */
    generaField: function (config) {
        //Ice.log('Ice.generaField args:', arguments);
        var paso = 'Construyendo field',
            field = {};
        try {
            if (!config) {
                throw 'No se recibi\u00f3 configuraci\u00f3n de field';
            }
            
            
            // type
            field.type = {
                    A: 'string',
                    N: 'float',
                    P: 'float',
                    M: 'float',
                    F: 'date',
                    T: 'string',
                    S: 'string',
                    FF: 'string',
                    CDPERSONPICKER: 'string',
                    CDAGENTEPICKER: 'string',
                    PASSWORD: 'string',
                    PUNTOVENTAPICKER: 'string',
                    DOMICILIOPICKER: 'string',
                    RFCFIELD:'string'
                }[config.tipocampo];
            if (!field.type) {
                throw 'Tipocampo incorrecto para field';
            }
            
            if (config.catalogo) {
                field.type = 'string';
            }
            
            
            // dateFormat
            if (field.type === 'date') {
                field.dateFormat = Ext.util.Format.dateFormat; // viene de ext/locale/overrides/ext-locale-[idioma]
            }
            
            
            // name
            if (!config.name_cdatribu) {
                throw 'Falta name_cdatribu para field';
            }
            
            if (/^\d+$/.test(config.name_cdatribu)) {
                field.name = 'otvalor' + (('x000' + config.name_cdatribu).slice(Number(config.name_cdatribu) > 100 ? -3 : -2));
            } else {
                field.name = config.name_cdatribu;
            }
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        return field;
    },
    
    
    /**
     * Genera un objeto de validacion {name: 'fieldname', arreglo: [validaciones...]}
     */
    generaValidator: function (config) {
        //Ice.log('Ice.generaValidator args:', arguments);
        var paso = 'Construyendo validator',
            validator;
        try {
            if (!config || !config.name_cdatribu) {
                throw 'Falta name para validator';
            }
            
            var name;
            if (/^\d+$/.test(config.name_cdatribu)) {
                name = 'otvalor' + (('x000' + config.name_cdatribu).slice(Number(config.name_cdatribu) < 100 ? -2 : -3));
            } else {
                name = config.name_cdatribu;
            }
            
            
            // obligatorio
            if (config.swobliga === 'S') {
                validator = validator || {
                    nombre: name,
                    arreglo: []
                };
                
                validator.arreglo.push({
                    type: 'presence',
                    message: 'Este campo es obligatorio'
                });
            }
            
            
            // longitud minima
            if (config.minlength && /^\d+$/.test(config.minlength) && !config.catalogo) {
                validator = validator || {
                    nombre: name,
                    arreglo: []
                };
                
                validator.arreglo.push(function (val) {
                    var result = 'El tama\u00f1o m\u00ednimo para este campo es de ' + config.minlength;
                    if (Ext.isEmpty(val) || String(val).length >= Number(config.minlength)) {
                        result = true;
                    }
                    return result;
                });
            }
            
            
            // longitud maxima
            if (config.maxlength && /^\d+$/.test(config.maxlength) && !config.catalogo) {
                validator = validator || {
                    nombre: name,
                    arreglo: []
                };
                
                validator.arreglo.push(function (val) {
                    var result = 'El tama\u00f1o m\u00e1ximo para este campo es de ' + config.maxlength;
                    if (Ext.isEmpty(val) || String(val).length <= Number(config.maxlength)) {
                        result = true;
                    }
                    return result;
                });
            }
            
            
            // valor minimo
            if (config.minvalue && /^\d+$/.test(config.minvalue) && !config.catalogo) {
                validator = validator || {
                    nombre: name,
                    arreglo: []
                };
                
                validator.arreglo.push(function (val) {
                    var result = 'El valor m\u00ednimo para este campo es de ' + config.minvalue;
                    if (Ext.isEmpty(val) || Number(val) >= Number(config.minvalue)) {
                        result = true;
                    }
                    return result;
                });
            }
            
            
            // valor maximo
            if (config.maxvalue && /^\d+$/.test(config.maxvalue) && !config.catalogo) {
                validator = validator || {
                    nombre: name,
                    arreglo: []
                };
                
                validator.arreglo.push(function (val) {
                    var result = 'El valor m\u00e1ximo para este campo es de ' + config.maxvalue;
                    if (Ext.isEmpty(val) || Number(val) <= Number(config.maxvalue)) {
                        result = true;
                    }
                    return result;
                });
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return validator;
    },
    
    
    /**
     * logout
     */
    logout: function () {
        Ice.log('Ice.logout');
        var paso = 'Cerrando sesi\u00f3n';

        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.core.logout,
                success: function (action) {
                    var paso2 = 'Redireccionando...';
                    try {
                        if (Ext.manifest.toolkit === 'classic') {
                            Ice.query('#mainView').getController().onToggleUserMenuSize();
                        }
                        Ice.query('#mainView').getController().redirectTo('mesacontrol.action', true);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    /**
     * Suspende todos los eventos de los items de una vista (contenedor, panel, form, grid, etc.)
     */
    suspendEvents: function (view) {
        Ice.log('Ice.suspendEvents view:', view);
        var paso = 'Suspendiendo eventos';
        try {
            if (!view) {
                throw 'Falta vista para suspender eventos';
            }
            if (view.suspendEvents && typeof view.suspendEvents === 'function') {
                view.suspendEvents();
            }
            var comps = Ice.query('[suspendEvents]', view);
            for (var i = 0; i < comps.length; i++) {
                var comp = comps[i];
                if (comp.suspendEvents && typeof comp.suspendEvents === 'function') {
                    comp.suspendEvents();
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    /**
     * Reanuda todos los eventos de los items de una vista (contenedor, panel, form, grid, etc.)
     */
    resumeEvents: function (view) {
        Ice.log('Ice.resumeEvents view:', view);
        var paso = 'Reanudando eventos';
        try {
            if (!view) {
                throw 'Falta vista para reaundar eventos';
            }
            if (view.resumeEvents && typeof view.resumeEvents === 'function') {
                view.resumeEvents();
            }
            var comps = Ice.query('[resumeEvents]', view);
            for (var i = 0; i < comps.length; i++) {
                var comp = comps[i];
                if (comp.resumeEvents && typeof comp.resumeEvents === 'function') {
                    comp.resumeEvents();
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    /**
     * Muestra todos los elementos de una vista que tengan la propiedad 'oculto' u
     * Oculta todos los elementos de una vista que tengan la propiedad 'oculto'.
     * Lo hace en forma toggle (si estan ocultos los muestra, si estan visibles los oculta)
     */
    toggleOcultos: function (view) {
        Ice.log('Ice.toggleOcultos view:', view);
        var paso = 'Mostrando/ocultando componentes',
            estadoOcultos;
        try {
            if (view.estadoOcultos === 'show') { // ocultar
                estadoOcultos = 'hide';
            } else { // mostrar
                estadoOcultos = 'show';
            }
            view.estadoOcultos = estadoOcultos;
            var comps = Ice.query('[oculto]', view);
            Ext.suspendLayouts();
            for (var i = 0; i < comps.length; i++) {
                comps[i][estadoOcultos]();
            }
            Ext.resumeLayouts();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    /**
     * Recibe un objeto y a todos sus atributos les pone el prefijo 'params.'
     */
    convertirAParams: function (values) {
        Ice.log('convertirAParams values:', values);
        var paso = 'Transformando datos',
            params = {};
        try {
            if (values) {
                for (var att in values) {
                    params['params.' + att] = values[att];
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return params;
    },
    
    /**
     * Recupera los errores de un formulario, el formulario debe tener getModelFields y getModelValidators.
     * Regresa un objeto de errores o null.
     * {
     *     cdunieco: 'Favor de introducir la sucursal',
     *     nmpoliza: 'La cotizaci\u00f3n es obligatoria',
     *     edad: 'Debe ser mayor de edad'
     * }
     */
    obtenerErrores: function (form) {
        Ice.log('Ice.obtenerErrores form:', form);
        var paso = 'Recuperando validaci\u00f3n de formulario',
            errores;
        try {
            if (!form || !form.getModelFields || !form.getModelValidators) {
                throw 'No se puede validar el formulario';
            }

            var refs = form.getReferences()||{},
                valores = form.getValues() || {},
                valores2 = form.getValues() || {},
                fields = form.getModelFields() || [],
                validators = form.getModelValidators() || {},
                modelName = Ext.id(),
                validatorsAplican = {};
            
            /*if (!refs) {
                throw 'No hay referencias para validar errores';
            }*/
            
            // transformo los refs a mapa de names, ya que el ref puede ser punto_venta pero el name otvalor12
            refs = Ice.refsToNames(refs);

            Ice.log('Ice.obtenerErrores refs:', refs, 'valores:', valores, 'fields:', fields,
                'validators:', validators);
            
            // solo aplican validators para campos que no esten ocultos
            for (var name in refs) {
                var ref = refs[name];
                if (ref.isHidden() !== true && validators[name]) {
                    validatorsAplican[name] = validators[name];
                }
            }

            Ice.log('Ice.obtenerErrores validatorsAplican: ', validatorsAplican);
            
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: fields,
                validators: validatorsAplican
            });

            var validaciones = Ext.create(modelName, valores).getValidation().getData();

            // los campos tipo float no validan correctamente si el campo es obligatorio porque lo transforma a 0
            // en el modelo. Con este bloque verificamos que si el campo es validado, el getValues()[name] no sea empty
            var fieldsTypeMap = {};
            for (var i = 0; i < fields.length; i++) {
                fieldsTypeMap[fields[i].name] = fields[i].type;
            }

            for (var name in validatorsAplican) {
                // si es float/int y la validacion dio resultado = true
                if ((fieldsTypeMap[name] === 'float' || fieldsTypeMap[name] === 'int')
                    && validaciones[name] === true && Ext.isEmpty(valores2[name])) {
                    var arrValidators = validatorsAplican[name];
                    for (var i = 0; i < arrValidators.length; i++) {
                        if (arrValidators[i].type === 'presence') {
                            validaciones[name] = 'Este campo es obligatorio';
                            break;
                        }
                    }
                }
            }
            // fin de validacion de obligatorio para float

            // para validar combos
            for (var name in validatorsAplican) { // para los que no son ocultos
                if (validaciones[name] === true && refs[name].getStore && valores2[name]) { // si no tuvo error y es combo y tiene valor
                    if (refs[name].getStore().find('key', valores2[name]) === -1) {
                        validaciones[name] = 'Favor de seleccionar una opci\u00f3n';
                        break;
                    }
                }
            }
            // fin validacion combos
            
            Ice.log('Ice.obtenerErrores validaciones:', validaciones);
            
            for (var name in validaciones) {
                if (validaciones[name] !== true) {
                    errores = errores || {};
                    errores[name] = validaciones[name];
                }
            }
            
            Ice.log('Ice.obtenerErrores errores:', errores);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return errores;
    },
    
    /**
     * Valida los campos de un formulario, el formulario debe tener getModelFields y getModelValidators.
     * Lanza excepcion si hay datos invalidos (en classic marca los campos en rojo, en modern la excepcion
     * contiene la descripcion de errores)
     */
    validarFormulario: function (form) {
        Ice.log('Ice.validarFormulario form:', form);
        var paso = 'Validando formulario';
        try {
            if (!form) {
                throw 'No se puede validar el formulario';
            }

            var refs = Ice.refsToNames(form.getReferences()),
                errores = Ice.obtenerErrores(form);
            if (errores) {
                if (Ext.manifest.toolkit === 'classic') {
                    Ext.suspendLayouts();
                    for (var name in errores) {
                        refs[name].setActiveError(errores[name]);
                    }
                    Ext.resumeLayouts();
                    throw 'Favor de validar los datos';
                } else {
                    var errorString = '';
                    for (var name in errores) {
                        var ref = refs[name];
                        errorString = errorString +
                            ((ref.getLabel && ref.getLabel()) || ref.label || name)
                            + ': ' + errores[name] + '<br/>';
                    }
                    throw errorString;
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    /**
     * Carga un formulario. Recibe el form, los datos y opciones. Carga los campos que existan y
     * dispara la herencia de anidados.
     * opciones: {
     *     sinReset (boolean),
     *     callback (function),
     *     sinUsarNames (boolean)
     * }
     */
    cargarFormulario: function (form, datos, opciones) {
        Ice.log('Ice.cargarFormulario form:', form, 'datos:', datos, 'opciones:', opciones);
        var paso = 'Asignando valores de formulario';
        try {
            if (!form) {
                throw 'Falta el formulario';
            }
            var setValuePendientes = 0, // numero de setValue pendientes por store.load
                callbackInterno = function () {
                    Ice.log('callbackInterno setValuePendientes:', setValuePendientes, 'opciones:', opciones);
                    if (setValuePendientes === 0 && opciones && typeof opciones.callback === 'function') {
                        var paso2 = 'Ejecutando callback posterior a cargar formulario';
                        try {
                            opciones.callback(form);
                        } catch (e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                };
            Ice.suspendEvents(form);
            if (!(opciones && opciones.sinReset === true)) {
                form.reset();
            }
            if (datos) {
                var refs = form.getReferences() || {};
                if (!(opciones && opciones.sinUsarNames === true)) {
                    refs = Ice.refsToNames(refs);
                }
                Ice.log('Ice.cargarFormulario refs:', refs);
                for (var name in datos) {
                    var ref = refs[name];
                    if (ref) {
                        if (ref.isXType('selectfield') && ref.getStore().getCount() === 0) { // aun no hay registros
                            ref.getStore().padre = ref;
                            ref.getStore().valorOnLoad = '' + datos[name];
                            setValuePendientes = setValuePendientes + 1; // se agrega un pendiente
                            ref.getStore().on('load', function handleLoad (me) {
                                me.removeListener('load', handleLoad);
                                Ice.suspendEvents(me.padre);
                                me.padre.setValue(me.valorOnLoad);
                                Ice.eventManager.change(me.padre, me.valorOnLoad, true);
                                Ice.resumeEvents(me.padre);
                                setValuePendientes = setValuePendientes - 1; // se resta un pendiente
                                callbackInterno(); // se intenta callback si ya no hay pendientes
                            });
                        } else {
                            ref.setValue(datos[name]);
                            Ice.eventManager.change(ref, datos[name], true);
                        }
                    }
                }
                for (var name in refs) {
                    if (refs[name].heredar) {
                        refs[name].heredar();
                    }
                }
            }
            Ice.resumeEvents(form);
            callbackInterno(); // si no se dejo ningun setValue pendiente, se ejecutara de inmediato
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    /**
     * Agrega un componente a pantalla
     * @param config la configuracion del comp o la instancia del componente
     */
    push: function (config) {
        var paso = 'Agregando vista a pantalla';
        try {
            if (Ext.manifest.toolkit === 'classic') {
                var comp,
                    mainCard = Ice.query('#mainView').getReferences().mainCardPanel,
                    mainLayout = mainCard.getLayout(),
                    actualItem = mainLayout.getActiveItem();
                if (typeof config.isXType === 'function') {
                    comp = config;
                } else {
                    comp = Ext.create(config);
                }
                mainCard.add(comp);
                mainLayout.setActiveItem(comp);
                // pila
                mainCard.elementos = mainCard.elementos || [];
                if (mainCard.elementos.length === 0) {
                    mainCard.elementos.push(actualItem);
                }
                mainCard.elementos.push(comp);
            } else {
                Ice.query('#mainView').getReferences().mainCard.push(config);
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    /**
     * Quita un componente a pantalla
     */
    pop: function () {
        var paso = 'Regresando a vista anterior';
        try {
            if (Ext.manifest.toolkit === 'classic') {
                var mainCard = Ice.query('#mainView').getReferences().mainCardPanel,
                    mainLayout = mainCard.getLayout();
                mainCard.elementos = mainCard.elementos || [];
                if (mainCard.elementos.length < 2) {
                    return;
                    //throw 'No se puede regresar a la vista anterior';
                }
                //mainCard.remove(mainCard.elementos[mainCard.elementos.length - 1]);
                mainCard.elementos.pop();
                mainLayout.setActiveItem(mainCard.elementos[mainCard.elementos.length - 1]);
            } else {
                Ice.query('#mainView').getReferences().mainCard.pop();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    cerrarVentanas: function () {
    	var paso = 'Cerrar ventanas';
    	try{
    		
    		//if (Ext.manifest.toolkit === 'classic') {
    			
    			var ventanas = Ext.ComponentQuery.query('ventanaice');
    			
    			//console.log(ventanas);
    			if(ventanas) {
    				Ext.each(ventanas, function(ventana) { ventana.cerrar(); });
    			}
    		/*	
    		} else {
    			
    		} */   		
    	} catch (e) {
    		Ice.generaExcepcion(e, paso);
    	}
    	
    },
    
    /**
     * Esta funcion hace submit al index de la aplicacion
     */
    index: function () {
        Ice.redirect('login.action');
    },

    redirect: function (url) {
        Ice.query('#mainView').getController().redirectTo(url);
    },
    
    utils: {
        /**
         * Funcion que recibe n objetos y te regresa uno solo mezclado (Object.assign da error en explorer)
         * (se usa de manera anonima al inicio de este archivo)
         * https://stackoverflow.com/questions/30498318/object-assign-equivalent-function-in-javascript
         */
        mergeObjects: function () {
            var resObj = {};
            for(var i = 0; i < arguments.length; i++) {
                var obj = arguments[i],
                    keys = Object.keys(obj);
                for (var j = 0; j < keys.length; j++) {
                    resObj[keys[j]] = obj[keys[j]];
                }
            }
            return resObj;
        }
    },

    agregarClases: function (items, clases) {
        Ice.log('Ice.agregarClase items:', items, 'clases:', clases);
        var paso = 'Agregando clases';
        try {
            // convertir items a arreglo
            items = items || [];
            if (typeof items.length !== 'number') { // es objeto
                items = [items];
            }
            if (items.length === 0) {
                throw 'No hay items para agregar clases';
            }

            // convertir clases a arreglo
            clases = clases || [];
            if (typeof clases === 'string') {
                clases = [clases]
            }
            if (clases.length === 0) {
                throw 'No hay clases para agregar';
            }

            var agregar = function (item, clases) {
                if (item.isXType) { // es componente ext
                    if (Ext.manifest.toolkit === 'classic') {
                        item.addCls(clases);
                    } else {
                        if (item.isXType('toolbar') !== true) { // no aplica a toolbars
                            var userCls = item.getUserCls() || [];
                            if (typeof userCls === 'string') {
                                userCls = [userCls];
                            }
                            item.setUserCls(userCls.concat(clases));
                        }
                    }
                } else { // es objeto de configuracion
                    if (Ext.manifest.toolkit === 'classic') {
                        var cls = item.cls || [];
                        if (typeof cls === 'string') {
                            cls = [cls];
                        }
                        item.cls = cls.concat(clases);
                    } else {
                        if (item.xtype !== 'toolbar') { // no aplica a toolbars
                            var userCls = item.userCls || [];
                            if (typeof userCls === 'string') {
                                userCls = [userCls];
                            }
                            item.userCls = userCls.concat(clases);
                        }
                    }
                }
            };

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item) {
                    if (typeof item.length === 'number') { // es arreglo
                        for (var j = 0; j < item.length; j++) {
                            agregar(item[j], clases);
                        }
                    } else { // es objeto
                        agregar(item, clases);
                    }
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    agregarEstilo: function (items, estilo) {
        Ice.log('Ice.agregarEstilo items:', items, 'estilo:', estilo);
        var paso = 'Agregando estilo';
        try {
            // convertir items a arreglo
            items = items || [];
            if (typeof items.length !== 'number') { // es objeto
                items = [items];
            }
            if (items.length === 0) {
                throw 'No hay items para agregar estilo';
            }

            if (!estilo || typeof estilo !== 'string') {
                throw 'No hay estilo para agregar';
            }

            var agregar = function (item, estilo) {
                if (item.isXType) { // es componente ext
                    if (Ext.manifest.toolkit === 'classic') {
                        // if (item.setFieldStyle) { // para form items
                        //     item.setFieldStyle(estilo + ' ' + (item.fieldStyle || ''))
                        // } else {
                            item.setStyle(estilo + ' ' + (item.style || ''));
                        // }
                    } else {
                        if (item.isXType('toolbar') !== true) { // no aplica a toolbars
                            item.setStyle(estilo + ' ' + (item.getStyle() || ''));
                        }
                    }
                } else { // es objeto de configuracion
                    if (Ext.manifest.toolkit === 'classic') {
                        // item.fieldStyle = estilo + ' ' + (item.fieldStyle || '');
                        item.style = estilo + ' ' + (item.style || '');
                    } else {
                        if (item.xtype !== 'toolbar') { // no aplica a toolbars
                            item.style = estilo + ' ' + (item.style || '');
                        }
                    }
                }
            };

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item) {
                    if (typeof item.length === 'number') { // es arreglo
                        for (var j = 0; j < item.length; j++) {
                            agregar(item[j], estilo);
                        }
                    } else { // es objeto
                        agregar(item, estilo);
                    }
                }
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },

    classic: function () {
        return Ext.manifest.toolkit === 'classic';
    },

    modern: function () {
        return Ext.manifest.toolkit !== 'classic';
    },

    convertirBotones: function (botones) {
        Ice.log('Ice.convertirBotones botones:', botones);
        var paso = 'Convirtiendo botones';
        try {
            if ((botones || []).length === 0){
                return;
            }
            for (var i = 0; i < botones.length; i++) {
                var boton = botones[i];
                
                // ignora: null, undefined, '->' y []
                if (!boton || typeof boton !== 'object' || typeof boton.length === 'number') {
                    continue;
                }
                /*
                if (!(boton.iconCls || (boton.getIconCls && boton.getIconCls()))) { // si no hay icono pongo bug
                    boton.iconCls = 'x-fa fa-bug';
                    boton.setIconCls && boton.setIconCls('x-fa fa-bug');
                }
				*/
                if (Ice.modern()) {
                    if (boton.text || (boton.getText && boton.getText())) { // si tengo texto paso el icono arriba
                        boton.iconAlign = 'top';
                        boton.setIconAlign && boton.setIconAlign('top');
                        var text = '<span style="font-size: ' + Ice.constantes.componente.boton.fontSize + ';">'
                            + (boton.text || (boton.getText && boton.getText())) + '</span>';
                        boton.text = text;
                        boton.setText && boton.setText(text);
                    }
                }
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    /**
     * Convierte las referencias a un objeto donde el key es el name en lugar del reference.
     * @param refs -> las referencias de un formulario
     * @return convierte cada referencia a su name
     * entrada:
     * {
     *     cdunieco: comp,
     *     cdramo: comp,
     *     punto_venta: comp << esta referencia tiene getName() == otvalor12
     * }
     * salida:
     * {
     *     cdunieco: comp,
     *     cdramo: comp,
     *     otvalor12: comp << este campo tenia reference = punto_venta
     * }
     */
    refsToNames: function (refs) {
        Ice.log('Ice.refsToNames refs:', refs);
        var paso = 'Convirtiendo referencias a names';
        try {
            if (!refs) {
                return refs;
            }
            var namesMap = {};
            for (refKey in refs) {
                if (refs[refKey] && typeof refs[refKey].getName === 'function') {
                    namesMap = namesMap || {};
                    namesMap[refs[refKey].getName()] = refs[refKey];
                }
            }
            Ice.log('Ice.refsToNames namesMap:', namesMap);
            return namesMap;
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    /**
     * Evalua, si el valor origen esta vacio, regresa el segundo parametro, caso contrario
     * regresa el primero
     * 
     * Entrada: 
     * {
     *      origen: comp,
     *      valor: comp
     * }
     * Salida: {
     *      valor: comp
     * }
     * 
     */
    nvl: function(origen, valor){
        if (Ext.isEmpty(origen) || '_null' === '_' + origen) {
            return !Ext.isEmpty(valor) ? valor : '';
        }
        return origen;
    },

    /**
     * Se crea el objeto flujo desde un mapa de parametros
     * puede venir directo flujo: {}
     * puede venir en llaves flujo.cdtipflu=1, flujo.cd...
     * puede no venir
     */
    validarParamFlujo: function (params) {
        Ice.log('Ice.validarParamFlujo params:', params);
        var paso = 'Validando flujo en par\u00e1metros',
            flujo = {};
        try {
            params = params || {};
            params.flujo = params.flujo || {};
            flujo = {
                ntramite  : params.flujo.ntramite  || params['flujo.ntramite'],
                status    : params.flujo.status    || params['flujo.status'],
                cdtipflu  : params.flujo.cdtipflu  || params['flujo.cdtipflu'],
                cdflujomc : params.flujo.cdflujomc || params['flujo.cdflujomc'],
                webid     : params.flujo.webid     || params['flujo.webid'],
                tipoent   : (params.flujo.tipoent  || params['flujo.tipoent'] || '').toUpperCase(),
                claveent  : params.flujo.claveent  || params['flujo.claveent'],
                cdunieco  : params.flujo.cdunieco  || params['flujo.cdunieco'],
                cdramo    : params.flujo.cdramo    || params['flujo.cdramo'],
                estado    : (params.flujo.estado   || params['flujo.estado'] || '').toUpperCase(),
                nmpoliza  : params.flujo.nmpoliza  || params['flujo.nmpoliza'],
                nmsituac  : !Ext.isEmpty(params.flujo.nmsituac)
                    ? params.flujo.nmsituac
                    : params['flujo.nmsituac'],
                nmsuplem  : !Ext.isEmpty(params.flujo.nmsuplem)
                    ? params.flujo.nmsuplem
                    : params['flujo.nmsuplem'],
                aux       : params.flujo.aux       || params['flujo.aux']
            };
            try {
                if (flujo.aux && typeof flujo.aux === 'string') {
                    flujo.aux = Ext.JSON.decode(flujo.aux);
                }
            } catch (e) {
                Ice.logWarn('no se pudo decodificar el json config.flujo.aux', e);
            }
        } catch (e) {
            Utils.generaExcepcion(e, paso);
        }
        return flujo;
    },

    flujoToParams: function (flujo, paramsEntrada) {
        Ice.log('Ice.flujoToParams args:', arguments);
        var params = {};
        if (!Ext.isEmpty(paramsEntrada)) {
            params = paramsEntrada;
        }
        params['flujo.ntramite']  = flujo.ntramite;
        params['flujo.status']    = flujo.status;
        params['flujo.cdtipflu']  = flujo.cdtipflu;
        params['flujo.cdflujomc'] = flujo.cdflujomc;
        params['flujo.webid']     = flujo.webid;
        params['flujo.tipoent']   = flujo.tipoent;
        params['flujo.claveent']  = flujo.claveent;
        params['flujo.cdunieco']  = flujo.cdunieco;
        params['flujo.cdramo']    = flujo.cdramo;
        params['flujo.estado']    = flujo.estado;
        params['flujo.nmpoliza']  = flujo.nmpoliza;
        params['flujo.nmsituac']  = flujo.nmsituac;
        params['flujo.nmsuplem']  = flujo.nmsuplem;
        params['flujo.aux']       = flujo.aux;
        return params;
    },

    /**
     * Recibe n parametros,
     * vienen en pares, el i es un objeto, el i+1 es el error para cuando el objeto este vacio
     */
    validate: function () {
        for (var i = 0; i < arguments.length; i = i + 2) {
            if (Ext.isEmpty(arguments[i])) {
                throw arguments[i + 1];
            }
        }
    },

    /**
     * Parsea fechas
     */
    parse: function(value, format){
        return Ext.Date.parse(value, format||Ext.util.Format.dateFormat);
    },

    recuperaTramiteCompleto: function(ntramite, callback) {
        Ice.log('Ice.recuperarTramiteCompleto ntramite',ntramite);
        var me = this,
            tramite = {},
            paso = 'Recuperando datos de tramite';
        try {
            Ice.request({
                mascara: paso,
                url: me.url.bloque.mesacontrol.obtenerTramiteCompleto,
                params: {
                    'params.ntramite': ntramite
                },
                success: function (json) {
                    var paso2 = 'Datos del tramite obtenidos';
                    try {
                        Ice.log('Resultados de tramite ',json);
                        tramite = json.params;
                        if(callback){
                            callback(tramite);
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    Ice.resumeEvents(view);
                }
            });
        } catch(e) {
            Ice.log('No se pudo obtener los datos del tramite ',e);
        }
    },
    
    /**
     * 2017/09/05 - jtezva - nuevo, para no llamar el de Ext
     * 2017/09/25 - jtezva - se agrega el callback por si eligen no o cancelar
     */
    confirm: function (titulo, mensaje, callback, callbackCancel) {
        Ext.Msg.confirm(titulo, mensaje, function (boton) {
            if (boton === 'yes') {
                callback();
            } else if (callbackCancel) {
                callbackCancel();
            }
        });
    }

});