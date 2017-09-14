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
                                        actionColumns: [
                                            {
                                                xtype: 'actioncolumn',
                                                items: [
                                                    {
                                                        tooltip: 'Editar',
                                                        iconCls: 'x-fa fa-edit',
                                                        handler: function (grid, rowIndex, colIndex) {
                                                            try{
                                                                var data = {};
                                                                if(Ext.manifest.toolkit === 'classic'){
                                                                    var store = grid.getStore();
                                                                    data = store.getAt(rowIndex).getData();              
                                                                } else {
                                                                    Ice.log('grid parent',grid.getParent());
                                                                    var cell = grid.getParent(),
                                                                        record = cell.getRecord();
                                                                    data = record.getData();
                                                                }
                                                                data = Ice.convertirAParams(data);
                                                                me.cargarDuplicidadPoliza(data);
                                                            } catch(e) {
                                                                Ice.generaExcepcion(e);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
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
    },

    cargarDuplicidadPoliza: function(params){
        Ice.log('Ice.view.bloque.duplicidad.FormularioDuplicidadController.cargarDuplicidadPoliza');
        var paso = 'Consultando duplicidad de poliza',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            if(params){
                Ice.request({
                    mascara: paso,
                    url: Ice.url.emision.obtenerDuplicidadPoliza,
                    params: params,
                    success: function (json) {
                        var paso2 = 'Datos duplicidad de poliza';
                        try {
                            Ice.log('cargarDuplicidadPoliza json ',json);
                            var ventana = Ext.create('Ice.view.componente.VentanaIce', {
                                title: 'Datos de duplicidad de poliza',
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
                                        reference: 'formduplicidad'
                                    }
                                }
                            });
                            
                            ventana.down('formularioduplicidad').getController().setValues(json.params);
                            ventana.mostrar();
                        } catch(e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    },
                    failure: function () {
                        Ice.resumeEvents(view);
                    }
                });
            }
        } catch(e) {
            Ice.manejaExcepcion(e, paso);
        }
    },

    setValues: function(values){
        var me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            refs.btnConsultar.hide();

            Ice.suspendEvents(refs.formvigencia);
            Ice.cargarFormulario(refs.formvigencia, values);
            me.setFieldsFormReadOnly(refs.formvigencia);

            Ice.suspendEvents(refs.formfiltros);
            Ice.cargarFormulario(refs.formfiltros, values);
            me.setFieldsFormReadOnly(refs.formfiltros);
            
            Ice.suspendEvents(refs.formdomicilio);
            me.setFieldsValues(refs.formdomicilio);
            Ice.cargarFormulario(refs.formdomicilio, values);
            me.setFieldsFormReadOnly(refs.formdomicilio);
        } catch(e) {
            Ice.manejaExcepcion(e);
        }
    },

    setFieldsFormReadOnly: function(form){
        try{
            var refs = form.getReferences();
            for(var ref in refs){
                refs[ref].setReadOnly(true);
            }
        } catch(e) {
            Ice.logWarn('No se pudo modificar campos a readOnly ',e);
        }
    },

    setFieldsValues: function(form, value){
        try{
            var refs = form.getReferences();
            for(var ref in refs){
                refs[ref].setValue(value||'');
            }
        } catch(e) {
            Ice.logWarn('No se pudo modificar campos ',e);
        }
    }
});