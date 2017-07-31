Ext.define('Ice.view.bloque.agrupadores.FormAgrupadorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formagrupador',
    
    init: function () {
        Ice.log('controller.formagrupador.init');
        var me = this,
            paso = 'Invocando carga de subagrupador';
        try {
            me.cargar();
           
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    cdperson:null,
    nmorddom:null,
    cargar: function () {
        Ice.log('controller.formagrupador.cargar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            gridDomicilios = refs.gridDomicilios,
            paso = 'Cargando subagrupador';
        try {
        	 var refs = view.getReferences() || {};
             me.cdperson = Ice.query('[xtype=numberfieldice]', refs.form.getReferences().cdperson);
             Ice.log('cdperson',me.cdperson);
             me.cdperson.on({
                 change: function(){
                     Ice.log('Ice.view.bloque.PersonasPolizaController.custom.cdperson.change ',me.cdperson.getValue());
                     if(me.cdperson.getValue()){
                    	 if(me.nmorddom && me.cdperson)
	                         refs.gridDomicilios.getStore().load({
	                             params: {
	                                 'params.cdperson': me.cdperson.getValue()
	                             },
	                             callback:function(){
	                             	
	                             	gridDomicilios.getSelectionModel().select(Number(me.nmorddom)-1);
	                             }
	                         });
                         refs.gridDomicilios.show();
                         
                         
                     }
                 }
             });
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agrupadores.obtenerAgrupador,
                params: Ice.convertirAParams({
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    cdagrupa: view.getCdagrupa(),
                    nmsuplem: view.getNmsuplem(),
                    status: view.getStatus(),
                    nmsuplemEnd: view.getNmsuplemEnd()
                }),
                success: function (action) {
                    if (action.params) {
                        Ice.cargarFormulario(view.down('[reference=form]'), action.params);
                        me.nmorddom=action.params.nmorddom;
                        if(Ice.classic()){
                        	if(me.nmorddom && me.cdperson)
	                        	gridDomicilios.getStore().load({
	                                params: {
	                                    'params.cdperson': me.cdperson.getValue()
	                                },
	                                callback:function(){
	                                	
	                                	gridDomicilios.getSelectionModel().select(Number(action.params.nmorddom)-1);
	                                }
	                            });
                        	
                        }
                    }
                }
            });
        } catch (e) {
        	console.error(e)
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onGuardarClic: function () {
        Ice.log('controller.formagrupador.onGuardarClic');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            gridDomicilios = refs.gridDomicilios,
            paso = 'Guardando subagrupador';
        try {
            Ice.validarFormulario(view.down('[reference=form]'));
            
            var valores = view.down('[reference=form]').getValues();
            
            var selected = gridDomicilios.getSelection(),
            data;
	        if (!selected || (Ext.manifest.toolkit === 'classic' && selected.length === 0)) {
	            throw 'Seleccione un domicilio';
	        }
	
	        if (Ext.manifest.toolkit === 'classic') {
	            data = selected[0].data;
	        } else {
	            data = selected.getData();
	        }
            
            valores = Ice.utils.mergeObjects(valores, {
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                cdagrupa: view.getCdagrupa(),
                nmsuplem: view.getNmsuplem(),
                status: view.getStatus(),
                nmsuplemEnd: view.getNmsuplemEnd(),
                nmorddom:data.nmorddom,
                accion: 'I'
            });
            
           
            
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agrupadores.movimientoAgrupador,
                params: Ice.convertirAParams(valores),
                success: function (action) {
                    view.fireEvent('guardar', view);
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onCancelarClic: function () {
        Ice.log('controller.formagrupador.onCancelarClic');
        this.getView().fireEvent('cancelar', this.getView());
    }
});