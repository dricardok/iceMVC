Ext.define('Ice.view.bloque.duplicidad.FormularioDuplicidadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formularioduplicidad',

    init: function(view){
        Ice.log('Ice.view.bloque.duplicidad.FormularioDuplicidadController.init',view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de formulario de duplicidad';
        try {
            me.callParent(arguments);
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de formulario de duplicidad';
                    me.custom();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 600);
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
    },

    custom: function() {
        var me = this,
            paso = '',
            view = me.getView(),
            refs = view.getReferences();
    	try{
            Ice.log('Ice.view.bloque.duplicidad.FormularioDuplicidadController.custom.refs',refs);
            refs.formfiltros.getReferences().cdramo.on({
                render: function(){
                    try{
                        if(view.getCdramo()){
                            refs.formfiltros.getReferences().cdramo.setValue(view.getCdramo());
                            refs.formfiltros.getReferences().cdramo.setReadOnly(true);
                        }
                    } catch(e) {
                        Ice.logWarn('No se pudo modificar el valor del producto/ramo ',e);
                    }
                }
            });
    	} catch(e) {
    		Ice.manejaExcepcion(e,paso);
    	}
    },

    onConsultar: function(){
        this.consultar();
    },

    onCancelar: function(){
        this.cancelar();
    },

    consultar: function(){
        Ice.log('Ice.view.bloque.duplicidad.FormularioDuplicidadController.consultar');
        var paso = 'Consultando duplicidad',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var params = Object.assign({},
                Ice.convertirAParams(refs.formvigencia.getValues()),
                Ice.convertirAParams(refs.formfiltros.getValues()),
                Ice.convertirAParams(refs.formdomicilio.getValues())
            );
            Ice.log('params',params);
            Ice.request({
                mascara: paso,
                url: Ice.url.emision.obtenerDuplicidad,
                params: params,
                success: function (json) {
                    var paso2 = 'Datos duplicidad obtenidos';
                    try {
                        if(json.list){
                            var comps = Ice.generaComponentes({
                                pantalla: 'DUPLICIDAD',
                                seccion: 'GRID',
                                items: true,
                                columns: true,
                                fields: true
                            });
                            var ventana = Ext.create('Ice.view.componente.VentanaIce', {
                                title: 'Datos de duplicidad',
                                layout: 'fit',
                                platformConfig: {
                                    desktop: {
                                        scrollable: false,
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
                                        xtype: 'gridice',
                                        columns: comps.DUPLICIDAD.GRID.columns,
                                        store: {
                                            fields: comps.DUPLICIDAD.GRID.fields,
                                            data: json.list
                                        }
                                    }
                                }
                            });
                            ventana.mostrar();
                        } else {
                            Ice.mensajeCorrecto('No se encuentran coincidencias');
                        }
                    } catch(e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                },
                failure: function () {
                    Ice.resumeEvents(view);
                }
            });
        } catch(e) {
            Ice.manejaExcepcion(e);
        }
    },

    cancelar: function(){
        Ice.log('Ice.view.bloque.duplicidad.FormularioDuplicidadController.cancelar');
        var paso = 'Saliendo de pantalla de duplicidad',
            me = this,
            view = me.getView();
        try{
            view.cerrar();
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    }
});