Ext.define('Ice.view.bloque.agrupadores.GridAgrupadoresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridagrupadores',
    
    
    onAgregarAgrupadorClic: function () {
        Ice.log('controller.gridagrupadores.onAgregarAgrupadorClic');
        var me = this,
            paso = 'Generando nuevo agrupador';
        try {
            var max = 0,
                view = me.getView();
            view.getStore().each(function (rec) {
                if (Number(rec.get('cdagrupa') || 0) > max) {
                    max = Number(rec.get('cdagrupa'));
                }
            });
            if (max === 0) {
                max = 1;
            }
            me.mostrarFormulario({
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                cdagrupa: (Math.round(Math.ceil(max) * 100) + 1) / 100,
                nmsuplem: view.getNmsuplem(),
                status: view.getStatus(),
                nmsuplemEnd: view.getNmsuplemEnd(),
                modulo: view.getModulo(),
                flujo: view.getFlujo(),
                auxkey: view.getAuxkey()
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onAgregarSubagrupadorClic: function () {
        Ice.log('controller.gridagrupadores.onAgregarSubagrupadorClic');
        var me = this,
            paso = 'Generando nuevo subagrupador';
        try {
            var max = 0,
                view = me.getView(),
                cdagrupa;
            if (Ext.manifest.toolkit === 'classic') {
                cdagrupa = view.getSelection()[0].get('cdagrupa');
            } else {
                cdagrupa = view.getSelection().get('cdagrupa');
            }
            view.getStore().each(function (rec) {
                if (Math.floor(cdagrupa || 0) === Math.floor(rec.get('cdagrupa') || 0) && Number(rec.get('cdagrupa') || 0) > max) {
                    max = Number(rec.get('cdagrupa'));
                }
            });
            me.mostrarFormulario({
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                cdagrupa: (Math.round(max * 100) + 1) / 100,
                nmsuplem: view.getNmsuplem(),
                status: view.getStatus(),
                nmsuplemEnd: view.getNmsuplemEnd(),
                modulo: view.getModulo(),
                flujo: view.getFlujo(),
                auxkey: view.getAuxkey()
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onEditarClic: function () {
        Ice.log('controller.gridagrupadores.onEditarClic');
        var me = this,
            paso = 'Editando subagrupador';
        try {
            var max = 0,
                view = me.getView(),
                cdagrupa;
            if(Ice.sesion.cdsisrol==Ice.constantes.roles.AGENTE){
            	cdagrupa = view.getStore().getAt(0).get('cdagrupa');
            }
            else if (Ext.manifest.toolkit === 'classic') {
                cdagrupa = view.getSelection()[0].get('cdagrupa');
            } else {
                cdagrupa = view.getSelection().get('cdagrupa');
            }
            me.mostrarFormulario({
                cdunieco: view.getCdunieco(),
                cdramo: view.getCdramo(),
                estado: view.getEstado(),
                nmpoliza: view.getNmpoliza(),
                cdagrupa: cdagrupa,
                nmsuplem: view.getNmsuplem(),
                status: view.getStatus(),
                nmsuplemEnd: view.getNmsuplemEnd(),
                modulo: view.getModulo(),
                flujo: view.getFlujo(),
                auxkey: view.getAuxkey()
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onEliminarClic: function () {
        Ice.log('controller.gridagrupadores.onEliminarClic');
        var me = this,
            paso = 'Eliminando subagrupador';
        try {
            var max = 0,
                view = me.getView(),
                refs = me.getReferences(),
                cdagrupa;
                if (Ext.manifest.toolkit === 'classic') {
                    cdagrupa = view.getSelection()[0].get('cdagrupa');
                } else {
                    cdagrupa = view.getSelection().get('cdagrupa');
                }
                params = {
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    cdagrupa: cdagrupa,
                    nmsuplem: view.getNmsuplem(),
                    status: view.getStatus(),
                    nmsuplemEnd: view.getNmsuplemEnd(),
                    accion: 'D'
                };
            Ice.log('agrupador a eliminar:', params);
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.agrupadores.movimientoAgrupador,
                params: Ice.convertirAParams(params),
                success: function () {
                    view.getStore().reload();
                    refs.agregarbutton.disable();
                    refs.editarbutton.disable();
                    refs.eliminarbutton.disable();
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onItemTap: function () {
        this.onItemClic();
    },
    
    onItemClic: function () {
        Ice.log('controller.gridagrupadores.onItemClic');
        var me = this,
            paso = 'Seleccionando registro';
        try {
            var refs = me.getReferences();
            refs.agregarbutton.enable();
            refs.editarbutton.enable();
            refs.eliminarbutton.enable();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    mostrarFormulario: function (config) {
        Ice.log('controller.gridagrupadores.mostrarFormulario config:', config);
        var me = this,
            paso = 'Creando formulario de agrupador';
        try {
            Ice.push(Ice.utils.mergeObjects(config, {
                xtype: 'formagrupador',
                padreCtr: me, // le paso este controlador
                listeners: {
                    guardar: me.onGuardarForm,
                    cancelar: me.onCancelarForm
                }
            }));
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onGuardarForm: function () {
        Ice.log('controller.gridagrupadores.onGuardarForm');
        var paso = 'Recargando agrupadores';
        try {
            Ice.pop();
            var me = this.padreCtr,
                view = me.getView(),
                refs = me.getReferences();
            me.getView().getStore().reload();
            refs.agregarbutton.disable();
            refs.editarbutton.disable();
            refs.eliminarbutton.disable();
            view.fireEvent('agrupadorModificado', view);
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onCancelarForm: function () {
        Ice.log('controller.gridagrupadores.onCancelarForm');
        var paso = 'Cerrando formulario de agrupador';
        try {
            Ice.pop();
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },
    
    onVistaAgente:function(){
    	 Ice.log('controller.gridagrupadores.onVistaAgente');
         var paso = 'Cerrando vista agente';
         
         var me = this,
             view = me.getView(),
             refs = me.getReferences();
         try {
             if(Ice.sesion.cdsisrol==Ice.constantes.roles.AGENTE){
            	 view.getStore().load(function(r){
            		 if(r.length>0){
            			 me.onEditarClic();
            		 }
            	 });
            	 
             }
         } catch (e) {
             Ice.manejaExcepcion(e, paso);
         }
    }
});