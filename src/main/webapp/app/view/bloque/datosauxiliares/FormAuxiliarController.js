Ext.define('Ice.view.bloque.datosauxiliares.FormAuxiliarController', {
    extend: 'Ice.app.controller.FormIceController',
    alias: 'controller.formauxiliar',

    cargar: function () {
        Ice.log('Ice.view.bloque.datosauxiliares.FormAuxiliarController.cargar');
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Cargando datos auxiliares';
        try {
            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.datosAuxiliares.cargar,
                params: Ice.convertirAParams({
                    cdunieco: view.getCdunieco(),
                    cdramo: view.getCdramo(),
                    estado: view.getEstado(),
                    nmpoliza: view.getNmpoliza(),
                    cdbloque: view.getBloque(),
                    nmsituac: view.getNmsituac(),
                    cdgarant: view.getCdgarant(),
                    nmsuplem: view.getNmsuplem(),
                    status: view.getStatus()
                }),
                success: function (action) {
                    var paso2 = 'Cargando formulario de datos auxiliares';
                    try {
                        me.cargarFormulario(action.params);
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    guardar: function (params) {
        Ice.log('Ice.view.bloque.datosauxiliares.FormAuxiliarController.guardar params:', params);
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            paso = 'Guardando datos adicionales';
        try {
            me.validarFormulario();

            var valores = view.getValues();
            valores.cdunieco = view.getCdunieco();
            valores.cdramo   = view.getCdramo();
            valores.estado   = view.getEstado();
            valores.nmpoliza = view.getNmpoliza();
            valores.cdbloque = view.getBloque();
            valores.nmsituac = view.getNmsituac();
            valores.cdgarant = view.getCdgarant();
            valores.nmsuplem = view.getNmsuplem();
            valores.status   = view.getStatus();

            Ice.request({
                mascara: paso,
                url: Ice.url.bloque.datosAuxiliares.guardar,
                params: Ice.convertirAParams(valores),
                success: (params && params.success) || null,
                failure: (params && params.failure) || null
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    onDuplicidad: function(){
        this.duplicidad();
    },

    duplicidad: function(){
        var me = this,
            view = me.getView();
        try{
            var ventana = Ext.create('Ice.view.componente.VentanaIce', {
                //layout: 'fit',
                platformConfig: {
                    desktop: {
                        scrollable: true,
                        height: 500,
                        width: Ice.constantes.componente.ventana.width,
                        modal: true
                    },
                    '!desktop': {
                        scrollable: true
                    }
                },
                items: {
                    xtype: 'panelice',
                    items: {
                        xtype: 'formularioduplicidad',
                        cdramo: view.getCdramo()
                    }
                }
            });
            ventana.mostrar();
        } catch(e) {
            Ice.manejaExcepcion(e);
        }
    }
});