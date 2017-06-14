/**
 * Created by jtezva on 6/1/2017.
 */
Ext.define('Ice.view.cotizacion.CotizacionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cotizacion',
    
    init: function (view) {
        Ice.log('Ice.view.cotizacion.CotizacionController');
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de cotizaci\u00f3n';
        try {
            me.callParent(arguments);
            
            Ext.defer(function () {
                var paso2;
                try {
                    if (view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza()
                        && !Ext.isEmpty(view.getNmsuplem())) {
                        me.cargar();
                    } else {
                        me.irBloqueSiguiente();
                    }
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
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
            
            
            if (!bloqueExistente) { // no existe, se crea
                bloqueExistente = Ext.create({
                    xtype: bloque.name,
                    title: bloque.label,
                    reference: 'ref' + index,
                    indice: index,
                    
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    nmsuplem: view.getNmsuplem(),
                    
                    modulo: view.getModulo(),
                    flujo: view.getFlujo(),
                    cdtipsit: view.getCdtipsit()
                });
                
                if (view.getNuevaCotizacion() === true && index === 0 && bloqueExistente.xtype === 'bloquedatosgenerales') {
                    bloqueExistente.on({
                        llaveGenerada: function (bloqueDatosGen, cdunieco, cdramo, estado, nmpoliza, nmsuplem) {
                            Ice.log('Ice.view.cotizacion.CotizacionController bloquedatosgenerales.llaveGenerada args:', arguments);
                            if (!cdunieco || !cdramo || !estado || !nmpoliza || Ext.isEmpty(nmsuplem)) {
                                throw 'No se pudo recuperar la llave de datos generales';
                            }
                            
                            view.setCdunieco(cdunieco);
                            view.setCdramo(cdramo);
                            view.setEstado(estado);
                            view.setNmpoliza(nmpoliza);
                            view.setNmsuplem(nmsuplem);
                            Ice.log('Ice.view.cotizacion.CotizacionController bloquedatosgenerales.llaveGenerada viewCotizacion:', view);
                        }
                    });
                }
                
                tabpanel.add(bloqueExistente);
            }
            
            if (Ext.manifest.toolkit === 'classic') {
                tabpanel.setActiveTab(bloqueExistente);
            } else {
                tabpanel.setActiveItem(bloqueExistente);
            }
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    
    /**
     *
     */
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
                bloqueExistente = refs && refs['ref' + index];
            
            if (!bloque || !bloqueExistente) {
                throw 'No existe el bloque';
            }
            
            if (Ext.manifest.toolkit === 'classic') {
                tabpanel.setActiveTab(bloqueExistente);
            } else {
                tabpanel.setActiveItem(bloqueExistente);
            }
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
                refs.cotizarbutton[refs['ref' + (view.getBloques().length - 1)]
                    ? 'show'
                    : 'hide']();
            }
            if (refs.siguientebutton) {
                refs.siguientebutton[view.getBloqueActual() < view.getBloques().length - 1
                    ? 'show'
                    : 'hide']();
            }
            
            
            if (view.getGuardadoAutomaticoSuspendido() !== true && oldCard && oldCard.getController && oldCard.getController()
                && oldCard.getController().guardar) {
                paso = 'Guardando datos';
                var callbackSuccess = function () {
                    var pasoCargar = "";
                    try{
                        pasoCargar = "Cargando atributos de bloque";
                        newCard.getController().cargar();
                    } catch (e){
                        Ice.manejaExcepcion(e, pasoCargar);
                    }
                };
                
                var callbackFailure = function () {
                    var paso2 = 'Regresando a paso anterior';
                    try {
                        view.setGuardadoAutomaticoSuspendido(true);
                        if (Ext.manifest.toolkit === 'classic') {
                            tabpanel.setActiveTab(oldCard);
                        } else {
                            tabpanel.setActiveItem(oldCard);
                        }
                        view.setGuardadoAutomaticoSuspendido(false);
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
                    cdtipsit: view.getCdtipsit()
                }));
            }
            
            refs.tabpanel.add(comps);
            
            if (Ext.manifest.toolkit === 'classic') {
                refs.tabpanel.setActiveTab(comps[0]);
            } else {
                refs.tabpanel.setActiveItem(comps[0]);
            }
            
            me.mostrarPrimas();
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
            var callbackSuccess = function() {
                var paso2 = 'Tarificando';
                try {
                    Ice.request({
                        mascara: paso2,
                        url: Ice.url.emision.tarificar,
                        params: {
                            'params.cdunieco': view.getCdunieco(),
                            'params.cdramo': view.getCdramo(),
                            'params.estado': view.getEstado(),
                            'params.nmpoliza': view.getNmpoliza(),
                            'params.nmsuplem': view.getNmsuplem(),
                            'params.nmsituac': '0'
                        },
                        success: function (action) {
                            var paso3 = 'Mostrando tarifa';
                            try {
                                me.mostrarPrimas();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso3);
                            }
                        }
                    });
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            };
            
            var activeTab;
            
            if (Ext.manifest.toolkit === 'classic') {
                activeTab = refs.tabpanel.getActiveTab();
            } else {
                activeTab = refs.tabpanel.getActiveItem();
            }
             
            if (activeTab && activeTab.getController && activeTab.getController().guardar) {
                activeTab.getController().guardar({
                    success: callbackSuccess
                });
            } else {
                callbackSuccess();
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
                
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                
                botones: [{
                    text: 'Aceptar',
                    iconCls: 'x-fa fa-check',
                    handler: function (me) {
                        me.up('ventanaprimas').cerrar();
                    }
                }]
            }).mostrar();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});