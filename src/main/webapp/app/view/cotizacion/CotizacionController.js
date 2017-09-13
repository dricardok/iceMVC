/**
 * Created by jtezva on 6/1/2017.
 */
Ext.define('Ice.view.cotizacion.CotizacionController', {
    extend: 'Ext.app.ViewController',
    cls:'footer_taf',
    alias: 'controller.cotizacion',
    init: function () {
        this.callParent(arguments);

        Ice.log('Ice.view.cotizacion.CotizacionController.init');
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de cotizaci\u00f3n';
        Ext.defer(function () {
            try {
                if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza()
                    && !Ext.isEmpty(view.getNmsuplem())) {
                    me.cargar();
                } else {
                    me.irBloqueSiguiente();
                    try{
                        var paso2 = 'Cambiando valor de agente en datos generales',
                            agente = Ice.query('[xtype=bloquedatosgenerales]').getReferences().cdagente;
                        if(view.getFlujo() && view.getFlujo().ntramite){
                            Ice.log('datos generales ',Ice.query('[xtype=bloquedatosgenerales]').getReferences());
                            var cambiaAgente = function(tramite) {
                                agente.setValue(tramite.cdagente);
                            };
                            Ice.recuperaTramiteCompleto(view.getFlujo().ntramite, cambiaAgente);
                        } else {
                            if(Ice.sesion.cdsisrol === Ice.constantes.roles.AGENTE){
                                var cdusuari = Ice.sesion.cdusuari;
                                Ice.log('Obteniendo agente de usuario cdusuari ',cdusuari);
                                try {
                                    Ice.request({
                                        mascara: paso2,
                                        url: Ice.url.bloque.mesacontrol.obtenerAgenteXUsuario,
                                        params: {
                                            'params.cdusuari': cdusuari
                                        },
                                        success: function (json) {
                                            var paso3 = 'Obteniendo agente de usuario en sesion';
                                            try {
                                                agente.setValue(json.params.cdagente);
                                            } catch (e) {
                                                Ice.logWarn(paso3, e);
                                            }
                                        },
                                        failure: function () {
                                            Ice.resumeEvents(view);
                                        }
                                    });
                                } catch(e) {
                                    Ice.log('No se pudo cambiar el valor del agente en datos generales ',e);
                                }
                            }
                        }
                    } catch(e) {
                        Ice.log('No se recupero referencia de agente ',e);
                    }
                }
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        }, 600);
    },

    irBloqueSiguiente: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.irBloqueSiguiente');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrando siguiente bloque';
        try {
            var index = view.getBloqueActual() + 1,
                bloque = view.getBloques()[index],
                tabpanel = view.getReferences().tabpanel,
                bloqueExistente = refs && refs['ref' + index];
            
            if (!bloque) {
                throw 'No existe el bloque';
            }

            var agregarYEnfocarBloque = function (cargar) {
                var paso2 = 'Construyendo siguiente bloque';
                try {
                    if (!bloqueExistente) { // no existe, se crea
                        bloqueExistente = Ext.create({
                            xtype: bloque.name,
                            title: bloque.label,
                            reference: 'ref' + index,
                            indice: index,
                            
                            //scrollable: true,
                            //height: view.getHeight() - (Ice.constantes.toolbarHeight[Ext.manifest.toolkit] * 2), // se restan las barras
                            
                            cdunieco: view.getCdunieco(),
                            cdramo: view.getCdramo(),
                            estado: view.getEstado(),
                            nmpoliza: view.getNmpoliza(),
                            
                            nmsuplem: view.getNmsuplem(),
                            status: view.getStatus(),
                            
                            modulo: view.getModulo(),
                            flujo: view.getFlujo(),
                            cdtipsit: view.getCdtipsit(),

                            // perfilamiento
                            cdptovta: view.getCdptovta(),
                            cdgrupo: view.getCdgrupo(),
                            cdsubgpo: view.getCdsubgpo(),
                            cdperfil: view.getCdperfil(),

                            nuevaCotizacion: view.getNuevaCotizacion()
                        });
                        if (view.getNuevaCotizacion() === true && index === 0 &&
                            bloqueExistente.xtype === 'datosiniciales') {
                            bloqueExistente.on({
                                llaveGenerada: function (bloqueDatosIni, cdunieco, cdramo, estado, nmpoliza, nmsuplem, status) {
                                    Ice.log('Ice.view.cotizacion.CotizacionController datosiniciales.llaveGenerada args:', arguments);
                                    if (!cdunieco || !cdramo || !estado || !nmpoliza || Ext.isEmpty(nmsuplem)) {
                                        throw 'No se pudo recuperar la llave de datos generales';
                                    }

                                    view.setCdunieco(cdunieco);
                                    view.setCdramo(cdramo);
                                    view.setEstado(estado);
                                    view.setNmpoliza(nmpoliza);
                                    view.setNmsuplem(nmsuplem);
                                    view.setStatus(status);

                                    if (view.getFlujo() && view.getFlujo().ntramite) {
                                        view.getFlujo().cdunieco = view.getCdunieco();
                                        view.getFlujo().cdramo   = view.getCdramo();
                                        view.getFlujo().estado   = view.getEstado();
                                        view.getFlujo().nmpoliza = view.getNmpoliza();
                                        view.getFlujo().nmsuplem = view.getNmsuplem();
                                    }

                                    Ice.log('Ice.view.cotizacion.CotizacionController datosiniciales.llaveGenerada viewCotizacion:', view);
                                }
                            });
                        }
                        
                        tabpanel.add(bloqueExistente);
                    }
                    
                    view.setGuardadoAutomaticoSuspendido(true); // para que no valide el guardado
                    tabpanel.setActiveTab(bloqueExistente);
                    view.setGuardadoAutomaticoSuspendido(false);

                    if (cargar === true) {
                        // ('cargar posterior a irBloqueSiguiente');
                        bloqueExistente.getController().cargar();
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            };

            if (index > 0) { // si es el segundo bloque (1) o mayor, guardar primero
                var bloqueActual = refs['ref' + (index - 1)];
                bloqueActual.getController().guardar({
                    success: function () {
                    	if(bloqueActual.xtype == 'datosiniciales'){
                    		
                    		var flu = view.getFlujo(); 
                    		
                    		Ice.ejecutarValidacionesEventoPantalla (view.getCdunieco(), 
                    											   view.getCdramo(),
                    											   view.getEstado(),
                    											   view.getNmpoliza(), 
                    											   view.getNmsuplem(), 
                    											   'COTIZACION', 'GUARDAR_DATOS_INICIALES', 
                    											   flu, 
                    											   function(){
										            					agregarYEnfocarBloque(true);
										            				});
                    	}else{
                    		agregarYEnfocarBloque(true);
                    	}
                        
                    }
                });
            } else {
                agregarYEnfocarBloque();
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    irBloqueAnterior: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.irBloqueAnterior');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Mostrando bloque anterior';
        try {
            var index = view.getBloqueActual() - 1,
                bloque = view.getBloques()[index],
                tabpanel = view.getReferences().tabpanel,
                bloqueExistente = refs && refs['ref' + index],
                bloqueActual = refs['ref' + view.getBloqueActual()];
            
            if (!bloque || !bloqueExistente) {
                throw 'No existe el bloque';
            }

            bloqueActual.getController().guardar({
                success: function () {
                    view.setGuardadoAutomaticoSuspendido(true); // para que no valide el guardado
                    tabpanel.setActiveTab(bloqueExistente);
                    view.setGuardadoAutomaticoSuspendido(false);
                    // ('cargar posterior a irBloqueAnterior');
                    bloqueExistente.getController().cargar();
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onTabchangeEvent: function (tabpanel, newCard, oldCard) {
        Ice.log('Ice.view.cotizacion.CotizacionController.onTabchangeEvent args:', arguments);
        var me = this,
            view = me.getView(),
            refs = view.getReferences() || {},
            paso = 'Actualizando indice';
        try {
            if (Ext.isEmpty(newCard.indice)) {
                throw 'No se puede actualizar el indice';
            }
            view.setBloqueActual(newCard.indice);
            
            paso = 'Actualizando botones';
            if (refs.anteriorbutton) {
                refs.anteriorbutton[view.getBloqueActual() > 0
                    ? 'show'
                    : 'hide']();
            }
            if (refs.cotizarbutton) {
                refs.cotizarbutton[refs['ref' + (view.getBloques().length - 1)] || view.getNuevaCotizacion() !== true
                    ? 'show'
                    : 'hide']();
            }
            if (refs.siguientebutton) {
                refs.siguientebutton[view.getBloqueActual() < view.getBloques().length - 1
                    ? 'show'
                    : 'hide']();
            }
            
            if (view.getGuardadoAutomaticoSuspendido() !== true && oldCard) {
                paso = 'Guardando datos';
                var callbackSuccess = function () {
                    var pasoCargar = 'Cargando bloque';
                    try {
                        // ('cargar nuevo card posterior a salvar anterior card');
                        newCard.getController().cargar();
                    } catch (e) {
                        Ice.manejaExcepcion(e, pasoCargar);
                    }
                };
                
                var callbackFailure = function () {
                    var paso2 = 'Regresando a paso anterior';
                    try {
                        Ext.defer(function () {
                            view.setGuardadoAutomaticoSuspendido(true);
                            tabpanel.setActiveTab(oldCard);
                            view.setGuardadoAutomaticoSuspendido(false);
                        }, 600); // se da un tiempo de espera para que el tab de modern haga la animacion del original antes del regreso
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                };
                
                oldCard.getController().guardar({
                    success: callbackSuccess,
                    failure: callbackFailure
                });
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    cargar: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController cargar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cargando cotizaci\u00f3n';
        try {
            if (!view.getCdunieco() || !view.getCdramo() || !view.getEstado() || !view.getNmpoliza() || Ext.isEmpty(view.getNmpoliza())) {
                throw 'Faltan datos para cargar cotizaci\u00f3n';
            }
            
            view.setNuevaCotizacion(false);
            var comps = [];
            
            for (var i = 0; i < view.getBloques().length; i++) {
                var bloque = view.getBloques()[i];
                
                comps.push(Ext.create({
                    xtype: bloque.name,
                    title: bloque.label,
                    reference: 'ref' + i,
                    indice: i,
                    
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    nmsuplem: view.getNmsuplem(),
                    
                    modulo: view.getModulo(),
                    flujo: view.getFlujo(),
                    cdtipsit: view.getCdtipsit(),

                    // perfilamiento
                    cdptovta: view.getCdptovta(),
                    cdgrupo: view.getCdgrupo(),
                    cdsubgpo: view.getCdsubgpo(),
                    cdperfil: view.getCdperfil(),

                    nuevaCotizacion: view.getNuevaCotizacion()
                }));
            }
            
            refs.tabpanel.add(comps);

            view.setGuardadoAutomaticoSuspendido(true);
            refs.tabpanel.setActiveTab(comps[0]);
            view.setGuardadoAutomaticoSuspendido(false);

            // ('cargar despues de setActiveTab (0)');
            comps[0].getController().cargar();

            me.mostrarTarifasPlan();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onAnteriorclic: function () {
        this.irBloqueAnterior();
    },
    
    onSiguienteClic: function () {
        this.irBloqueSiguiente();
    },
    
    onCargarClic: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.onCargarClic');
        var me = this,
            view = me.getView(),
            paso = 'Cargando cotizaci\u00f3n';
        try {
            var funcion = function (buttonId, value) {
                if (buttonId === 'ok' && value) {
                    Ice.query('#mainView').getController().redirectTo(
                        'cotizacion.action?cdramo='+view.getCdramo()+'&cdtipsit='+view.getCdtipsit()+'&cdunieco=1&estado=W&nmsuplem=0&nmpoliza=' + value,
                        true);
                }
            };
            if (Ext.manifest.toolkit === 'classic') {
                Ext.MessageBox.prompt('Cargar cotizaci\u00f3n', 'Introduzca el n\u00famero de cotizaci\u00f3n', funcion);
            } else {
                Ext.Msg.prompt('Cargar cotizaci\u00f3n', 'Introduzca el n\u00famero de cotizaci\u00f3n', funcion, this);
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onCotizarClic: function () {
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Guardando datos';
        try {
        	me.revisarCoaseguro();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    mostrarTarifasPlan: function () {
    	Ice.log('Ice.view.cotizacion.CotizacionController.mostrarTarifasPlan');
    	var me = this,
    		paso = 'Recuperando tarifas por plan';
    	try {
            var view = me.getView();
            
            if (view.getFlujo() && view.getFlujo().aux && view.getFlujo().aux.antesMostrarPrimaReferencia) {
                Ice.ejecutarValidacionPorReferencia(view.getFlujo(), view.getFlujo().aux.antesMostrarPrimaReferencia);
            } else {
                Ice.ejecutarValidacionesEventoPantalla(
                    view.getCdunieco(), 
                    view.getCdramo(),
                    view.getEstado(),
                    view.getNmpoliza(), 
                    view.getNmsuplem(), 
                    'COTIZACION', 'ANTES_MOSTRAR_PRIMA', 
                    view.getFlujo(), 
                    function () {
                        var planes = Ext.create('Ice.view.cotizacion.tarificaciontemporal.TarificacionTemporal', { 
                            cdunieco: view.getCdunieco(),
                            cdramo: view.getCdramo(),
                            estado: view.getEstado(),
                            nmpoliza: view.getNmpoliza(),
                            nmsuplem: view.getNmsuplem(),
                            cdtipsit: view.getCdtipsit(),

                            // perfilamiento
                            cdptovta: view.getCdptovta(),
                            cdgrupo: view.getCdgrupo(),
                            cdsubgpo: view.getCdsubgpo(),
                            cdperfil: view.getCdperfil(),

                            flujo: view.getFlujo(),

                            listeners: {
                                'tramiteGenerado': function (tarificacionTemporal, flujo) {
                                    view.setFlujo(flujo);
                                }
                            },
                            
                            buttons : [
                                {
                                    cls: '',
                                    text: 'Modificar',
                                    style:'margin-right: 42px;',       			
                                    iconCls: 'x-fa fa-pencil',
                                    handler: function(me){
                                        Ice.pop();
                                    }
                                }, {
                                    text: 'Enviar a...',
                                    iconCls: 'x-fa fa-send',
                                    hidden: !(view.getFlujo() && view.getFlujo().aux && view.getFlujo().aux.onBotoneraReferencia),
                                    controlador: me,
                                    handler: function (me) {
                                        me.controlador.onBotoneraReferencia(me.controlador);
                                    }
                                }, {
                                    text: 'Enviar a SURA',
                                    iconCls: 'x-fa fa-send',
                                    // si no soy agente o si ya tengo tramite no puedo enviar a SURA
                                    hidden: Ice.sesion.cdsisrol !== 'AGENTE' || (view.getFlujo() && view.getFlujo().ntramite),
                                    controlador: me,
                                    handler: function (me) {
                                        me.controlador.onAgenteEnviarSuraClic(me.controlador);
                                    }
                                }
                            ]
                        });
                        
                        Ice.push(planes);
                    }
                );
            }
    	} catch (e) {
    		Ice.manejaExcepcion(e, paso);
    	}
    },
    
    mostrarPrimas: function () {
        Ice.log('Ice.view.cotizacion.CotizacionController.mostrarPrimas');
        var me = this,
            paso = 'Recuperando tarifa';
        try {
//            return;
            var view = me.getView();
            
            Ext.create({
                xtype: 'ventanaprimas',
                style:'background-color: transparent !important;',
                
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                
                buttons: [
                    {
                        text: 'Modificar Cotización',
                        iconCls: 'x-fa fa-check',
                        style:'margin-right: 45px;',
                        handler: function (me) {
                            me.up('ventanaprimas').cerrar();
                        }
                    }, {
                        text: 'Emitir',
                        iconCls: 'x-fa fa-dollar',
                        handler: function (me) {
                            me.up('ventanaprimas').cerrar();
                            Ice.query('#mainView').getController().redirectTo('emision.action?cdunieco=' + view.getCdunieco() +
                                '&cdramo=' + view.getCdramo() + '&estado=' + view.getEstado() + '&nmpoliza=' + view.getNmpoliza() +
                                '&cdtipsit=' + view.getCdtipsit(),
                            true);
                        }
                    }
                ]
            }).mostrar();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    revisarCoaseguro: function(){
        var paso = 'Revisando coaseguro',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        Ice.request({
            mascara: paso,
            url: Ice.url.bloque.datosGenerales.obtenerCoaseguroPoliza,
            params: {
                'params.cdunieco': view.getCdunieco(),
                'params.cdramo': view.getCdramo(),
                'params.estado': view.getEstado(),
                'params.nmpoliza': view.getNmpoliza(),
                'params.nmsuplem': view.getNmsuplem()
            },
            success: function (action) {
                var paso2 = 'Obteniendo coaseguro';
                try {
                    if(action.params.cdtipcoa == 'P'){
                        var pantallaExclusionesCoaseguro = Ext.create('Ice.view.bloque.coaseguro.VentanaExclusionesCoaseguro',{
                            modal: true,
                            cdunieco: view.getCdunieco(),
                            cdramo: view.getCdramo(),
                            estado: view.getEstado(),
                            nmpoliza: view.getNmpoliza(),
                            nmsuplem: view.getNmsuplem(),
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    iconCls: 'x-fa fa-save',
                                    handler: function(){
                                        pantallaExclusionesCoaseguro.cerrar();
                                        me.cotizar();
                                    }
                                }
                            ]
                        });
                        pantallaExclusionesCoaseguro.mostrar();
                    } else {
                        me.cotizar();
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }
        });
    },

    cotizar: function(){
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Cotizando datos';
        try {
            var callbackSuccess = function() {
                var paso2 = 'Tarificando';
                try {
                    Ice.request({
                        mascara: paso2,
                        timeout: 1000*60*5,
                        url: Ice.url.emision.tarificarPlanes,
                        params: {
                            'params.cdunieco': view.getCdunieco(),
                            'params.cdramo': view.getCdramo(),
                            'params.estado': view.getEstado(),
                            'params.nmpoliza': view.getNmpoliza(),
                            'params.nmsuplem': view.getNmsuplem(),
                            'params.nmsituac': '0',
                            'params.ntramite': view.getFlujo() && view.getFlujo().ntramite || ''
                        },
                        success: function (action) {
                            var paso3 = 'Mostrando tarifa';
                            try {
                                 me.mostrarTarifasPlan();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso3);
                            }
                        }
                    });
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            };
            
            refs.tabpanel.getActiveTab().getController().guardar({
                success: callbackSuccess
            });
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    /**
     * 2017/09/06 - jtezva - para ligar a una validacion del flujo al momento de mostrar la botonera
     */
    onBotoneraReferencia: function (me) {
        Ice.log('Ice.view.cotizacion.CotizacionController.onBotoneraReferencia args:', arguments);
        var paso = 'Mostrando envios posibles para la botonera de tarifa';
        try {
            var view = me.getView();
            Ice.ejecutarValidacionPorReferencia(view.getFlujo(), view.getFlujo().aux.onBotoneraReferencia);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    /**
     * 2017/09/12 - jtezva - el agente envia cotizacion a SURA, se registra tramite y se busca referencia
     */
    onAgenteEnviarSuraClic: function (me) {
        var paso = 'Registrando tr\u00e1mite y enviando a SURA';
        try {
            var view = me.getView();
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.mesacontrol.registrarNuevoTramite,
                params: {
                    'params.cdunieco'  : view.getCdunieco(),
                    'params.cdramo'    : view.getCdramo(),
                    'params.estado'    : view.getEstado(),
                    'params.nmpoliza'  : view.getNmpoliza(),
                    'params.nmsuplem'  : view.getNmsuplem(),
                    'params.nmsolici'  : view.getNmpoliza(),
                    'params.cdsucadm'  : view.getCdunieco(),
                    'params.cdsucdoc'  : view.getCdunieco(),
                    'params.cdtiptra'  : 1,
                    'params.cdtipflu'  : 1,
                    'params.cdflujomc' : 1,
                    'params.estatus'   : 100,
                    'params.comments'  : 'Se registra un tr\u00e1mite para solicitar cotizaci\u00f3n a SURA'
                },
                success: function (action) {
                    var paso2 = 'Ejecutando validacion por referencia';
                    try {
                        var flujo = {
                            ntramite: action.ntramite
                        };

                        Ice.mensajeCorrecto({
                            mensaje: 'Se registr\u00f3 el tr\u00e1mite ' + action.ntramite,
                            callback: function () {
                                Ice.ejecutarValidacionPorReferencia(flujo, 'AGENTE_ENVIA_SURA');
                            }
                        });
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});