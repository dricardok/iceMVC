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
            }
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
             recuperarTatrigar:    'coberturas/obtieneTatrigar.action',
             recuperarTatrisit:    'emision/obtieneTatrisit.action',
             recuperarTatripol:    'emision/obtieneTatripol.action',
             recuperarTatriper:    'registroPersona/obtieneTatriper.action',
             recuperacionSimple:   'recuperacion/recuperar.action'
         },
         
         // URLs de emision
         emision: {
            tarificar:     'emision/generarTarificacion.action',
            obtenerTarifa: 'emision/obtenerDatosTarificacion.action',
            emitir:        'emision/confirmarPoliza.action'
         },
         
         bloque: {
            datosGenerales: {
                cargar: 'emision/datosGenerales/cargar.action',
                guardar: 'emision/datosGenerales/guardar.action',
                valoresDefectoFijos: 'emision/datosGenerales/valoresDefectoFijos.action',
                valoresDefectoVariables: 'emision/datosGenerales/valoresDefectoVariables.action'
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
                validaciones: 'emision/validaBloqueSituacion.action'
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
            	cargar: 			'emision/agentes/cargar.action',
            	cargarAgentes: 		'emision/agentes/cargarAgentes.action',
            	guardar:			'emision/agentes/guardarAgentes.action',
            	buscar:				'emision/agentes/buscarAgentes.action',
            	validarAgente:		'emision/agentes/validarAgente.action'
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
                descargarArchivo: 'documentos/descargarArchivo.action'
            },
            mesacontrol:{
            	
            	obtenerTramites:		'mesacontrol/obtenerTramites.action',
            	
            	documentos: {
                    obtenerDocumentos: 'documentos/obtenerDocumentos.action',
                    movimientoTdocupol: 'documentos/movimientoTdocupol.action',
                    obtenerDocumento: 'documentos/obtenerDocumento.action'
                },
            	
            	historial:{
            		obtenerTdmesacontrol:"jsonLocal/obtieneTdmesacontrol.json",
            		obtenerThmesacontrol:"jsonLocal/obtieneThmesacontrol.json"
            	}
            },
            datosAuxiliares: {
                cargar: 'emision/datosAuxiliares/cargarDatosAuxiliares.action',
                guardar: 'emision/datosAuxiliares/guardarDatosAuxiliares.action'
            }
        }
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
     * Presenta mensaje en pantalla, recibe objeto params:
     * params: {
     *     titulo: 'Datos guardados',               <<< titulo de la ventana (opcional)
     *     mensaje: 'Poliza emitida correctamente', <<< mensaje
     *     callback: function () {}                 <<< callback (opcional)
     * }
     */
    mensaje: function (params) {
        var paso = 'Mostrando mensaje';
        try {
            var titulo = (params && params.titulo) || 'Aviso',
                mensaje = (params && params.mensaje) || (params && typeof params === 'string' && params) || '(sin mensaje)',
                callback = (params && params.callback) || null,
                ui = (params && params.ui) || null;
            	
            if (Ext.manifest.toolkit === 'classic') {
                Ext.create('Ext.window.Window', {
                    width: 300,
                    ui:	ui,
                    height: 150,
                    closeAction: 'destroy',
                    title: titulo,

                    modal: true,
                    animateTarget: Ext.getBody(),
                    layout: 'fit',
                    bodyStyle: 'border:none; background-color: transparent; padding: 10px;',
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
     *     background: true                         <<< Para que no robe el focus en pantalla (opcional)
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
                            obj.label=obj.dsatribu;
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
                                    validators: lista[i].validators === true
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
     *     validators: (boolean)
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
     *     validators: [ ... ]
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
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return seccion;
    },
    
    
    /**
     * Genera un arreglo de items para formulario
     */
    generaItems: function (configComps) {
        Ice.log('Ice.generaItems args:', arguments);
        var paso = 'Generando items',
            items = [];
        try {
            configComps = configComps || [];
            for (var i = 0; i < configComps.length; i++) {
                items.push(Ice.generaItem(configComps[i]));
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
    
    
    /**
     * Genera un item para formulario
     */
    generaItem: function (config) {
        //Ice.log('Ice.generaItem args:', arguments);
        var paso = 'Construyendo item',
            item = {};
        try {
            if (!config) {
                throw 'No se recibi\u00f3 configuraci\u00f3n de item';
            }
            
            // xtype
            item.xtype = {
                A: 'textfieldice',
                N: 'numberfieldice',
                P: 'numberfieldice',
                F: 'datefieldice',
                T: 'textareaice',
                S: 'switchice',
                FF: 'filefieldice',
                CDPERSONPICKER: 'cdpersonpicker',
                PASSWORD: 'textfieldice'
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
            
            
            // padres
            if (item.xtype === 'comboice' && config.padres) {
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
                item.label = config.label
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
            if (Ext.manifest.toolkit === 'classic') {
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
            
            
            // password
            if (config.tipocampo === 'PASSWORD') {
                item.inputType = 'password';
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
            if(!config.flex){
                if(!config.width){
                    column.flex = 1;
                    column.minWidth = 80;
                } else {
                    column.width = Number(config.width);
                }
            } else {
                if(!config.width){
                    column.flex = Number(config.flex);
                    column.minWidth = 80;
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
                    F: 'date',
                    T: 'string',
                    S: 'string',
                    FF: 'string',
                    CDPERSONPICKER: 'string',
                    PASSWORD: 'string'
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

            var refs = form.getReferences(),
                valores = form.getValues() || {},
                fields = form.getModelFields() || [],
                validators = form.getModelValidators() || {},
                modelName = Ext.id(),
                validatorsAplican = {};
            
            Ice.log('Ice.obtenerErrores valores:', valores, 'fields:', fields,
                'validators:', validators);
            
            // solo aplican validators para campos que no esten ocultos
            for (var att in refs) {
                ref = refs[att];
                if (ref.isHidden() !== true && validators[ref.getName()]) {
                    validatorsAplican[ref.getName()] = validators[ref.getName()];
                }
            }

            Ice.log('Ice.obtenerErrores validatorsAplican: ', validatorsAplican);
            
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                fields: fields,
                validators: validatorsAplican
            });

            var validaciones = Ext.create(modelName, valores).getValidation().getData();
            
            Ice.log('Ice.obtenerErrores validaciones:', validaciones);
            
            for (var att in validaciones) {
                if (validaciones[att] !== true) {
                    errores = errores || {};
                    errores[att] = validaciones[att];
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
            var errores = Ice.obtenerErrores(form);
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
    },
    
    /**
     * Carga un formulario. Recibe el form, los datos y carga los campos que existan y
     * dispara la herencia de anidados
     */
    cargarFormulario: function (form, datos) {
        Ice.log('Ice.cargarFormulario form:', form, 'datos:', datos);
        var paso = 'Asignando valores de formulario';
        try {
            if (!form) {
                throw 'Falta el formulario';
            }
            Ice.suspendEvents(form);
            form.reset();
            if (datos) {
                var refs = form.getReferences() || {};
                for (var att in datos) {
                    var ref = refs[att];
                    if (ref) {
                        if (ref.isXType('selectfield') && ref.getStore().getCount() === 0) { // aun no hay registros
                            ref.getStore().padre = ref;
                            ref.getStore().valorOnLoad = '' + datos[att];
                            ref.getStore().on('load', function handleLoad (me) {
                                me.removeListener('load', handleLoad);
                                me.padre.setValue(me.valorOnLoad);
                            });
                        } else {
                            ref.setValue(datos[att]);
                        }
                    }
                }
            }
            Ice.resumeEvents(form);
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
    
    /**
     * Esta funcion hace submit al index de la aplicacion
     */
    index: function () {
        Ice.query('#mainView').getController().redirectTo('mesacontrol.action');
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
    }
});