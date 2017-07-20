Ext.define('Ice.view.bloque.coaseguro.PanelCoaseguroController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panelcoaseguro',
    
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.PanelCoaseguroController.constructor config:', config);
        this.callParent(arguments);
    },
    
    init: function (view) {
        Ice.log('Ice.view.bloque.PanelCoaseguroController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de bloque coaseguro';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo comportamiento de bloque coaseguro';
                    me.custom();                    
                } catch (e) {
                	//alert(e);
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 200);
        } catch (e) {
        	//alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },
    
    custom: function () {
        Ice.log('Ice.view.bloque.PanelCoaseguroController.custom');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Configurando comportamiento bloque de coaseguro';
        Ice.log('view: ',view);
            
        try {
            Ice.log('Ice.view.bloque.PanelCoaseguroController refs:', refs);
            var form = refs.form,
                formCia = refs.formCia;
                //dscia = Ice.query('[name=dscia]',refs.formCia);
            if(form){
                if(form.getReferences()){
                    var cdmodelo = form.getReferences().cdmodelo;
                    Ice.log('refs cdmodelo',cdmodelo);
                    if(cdmodelo){
                        Ice.log('cdmodelo',cdmodelo);
                        var store = cdmodelo.getStore();
                        if (store.getRange().length > 0) {
                            store.add({
                                key: '0',
                                value: '0 - Sin grupo',
                                aux: '',
                                aux2: '',
                                aux3: '',
                                aux4: '',
                                aux5: '',
                                id: ''
                            });
                        } else {
                            store.on({
                                load: {
                                    fn: function () {
                                        store.add({
                                            key: '0',
                                            value: '0 - Sin grupo',
                                            aux: '',
                                            aux2: '',
                                            aux3: '',
                                            aux4: '',
                                            aux5: '',
                                            id: ''
                                        });
                                    },
                                    single: true
                                }
                            });
                        }
                        cdmodelo.on({
                            change: function(me, value){
                                var paso = 'Cambio cdmodelo';
                                try {
                                    refs.grid.getStore().getProxy().extraParams['params.cdmodelo'] = cdmodelo.getValue(); 
                                    refs.grid.getStore().load();
                                    refs.grid.show();
                                } catch (e) {
                                    Ice.logWarn(paso, e);
                                }
                            }
                        });
                    }
                }
            }
            if(formCia){
                if(formCia.getReferences()){
                    var dscia = formCia.getReferences().dscia;
                    if(dscia){
                        dscia.on({
                            change: function(me, value){
                                var paso = 'Cambio dscia';
                                try{
                                    if(dscia){
                                        Ice.log('cdcia',refs.formCia.getReferences().cdcia);
                                        refs.formCia.getReferences().cdcia.setValue(value);
                                    }
                                } catch(e){
                                    Ice.logWarn(paso, e);
                                }
                            }
                        });    
                    }
                }
            }
        } catch (e) {
        	alert(e);
            Ice.generaExcepcion(e, paso);
        }
    },

    onMostrarFormCia: function(){
        this.mostrarFormCia();
    },

    onCargarCia: function(){
        this.cargarCia();
    },

    onEditarCompania: function(grid, rowIndex, colIndex){
        this.editarCompania(grid, rowIndex, colIndex);
    },

    onEliminarCompania: function(grid, rowIndex, colIndex){
        this.eliminarCompania(grid, rowIndex, colIndex);
    },

    onRecuperaCiaEditada: function(){
        this.recuperaCiaEditada();
    },

    onGuardarAceptado: function(){
        this.guardarAceptado();
    },

    onGuardarCedido: function(){
        this.guardarCedido();
    },

    mostrarFormCia: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.mostrarFormCia');
        var paso = 'Iniciando funcion agregar compañia',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            refs.formCia.show();
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    cargarCia: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.cargarCia');
        var paso = 'Iniciando funcion cargar compañia',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var values = {},
                dscia = Ice.query('[name=dscia]', refs.formCia);
            values = refs.formCia.getValues();
            Ice.log('dscia rawValue', dscia.getRawValue());
            Ice.log('refs.formCia.dataEdit',refs.formCia.dataEdit);
            if(refs.formCia.dataEdit === null){
                values['dscia'] = dscia.getRawValue();
            }
            if(me.validaCompania(values)){
                var rec = values;
                refs.grid.getStore().add(rec);
                refs.formCia.reset();
                refs.formCia.hide();
                refs.formCia.dataEdit = null;
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    recuperaCiaEditada: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.recuperaCiaEditada');
        var paso = 'Iniciando funcion recuperar compañia',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var rec = refs.formCia.dataEdit;
            Ice.log('recuperaCiaEditada rec',rec);
            refs.grid.getStore().add(rec);
            refs.formCia.reset();
            refs.formCia.hide();
            refs.formCia.dataEdit = null;
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    validaCompania: function(valuesForm){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.validaCompania valuesForm',valuesForm);
        var paso = 'Iniciando funcion guardar compañia',
            me = this,
            view = me.getView(),
            refs = view.getReferences()
            porcentaje = 0,
            dscia = "",
            swsura = false,
            mensaje = '',
            valido = true;
        try{
            if(valuesForm){
                if(valuesForm.porcpart){
                    porcentaje = Number(valuesForm.porcpart);
                    if(porcentaje > 100 || porcentaje == 0){
                        mensaje = mensaje + 'Porcentaje no valido<br>';
                    }
                }
                if(refs.grid.getStore()){
                    refs.grid.getStore().getData().items.forEach(function(element) {
                        cdcia = element.getData().cdcia;
                        dscia = element.getData().dscia;
                        if(cdcia == valuesForm.cdcia){
                            mensaje = mensaje + 'No puede agregar esta compa\u00f1ia otra vez<br>';
                        }
                    }, this);
                }
                if(mensaje.length > 0){
                    Ice.mensajeWarning(mensaje);
                    valido = false;
                }
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
        return valido;
    },

    validaCompanias: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.validaCompanias');
        var paso = 'Iniciando funcion guardar compañias',
            me = this,
            view = me.getView(),
            refs = view.getReferences()
            porcentaje = 0,
            dscia = "",
            swsura = false,
            mensaje = '',
            valido = true;
        try{          
            if(refs.grid.getStore()){
                refs.grid.getStore().getData().items.forEach(function(element) {
                    porcentaje = porcentaje + Number(element.getData().porcpart);
                    cdcia = element.getData().cdcia;
                    dscia = element.getData().dscia;
                    if(dscia.toUpperCase().indexOf('SURA') !== -1){
                        swsura = true;
                    }
                }, this);
            } else {
                mensaje = 'Debe incluir alguna compa\u00f1ia al coaseguro';
            }
            if(porcentaje != 100){
                mensaje = mensaje + 'El porcentaje de partipacion debe sumar 100<br>';
            }
            if(swsura == false){
                mensaje = mensaje + 'Debe incluir a SURA en los porcentajes de cesi\u00f3n<br>';
            }
            if(mensaje.length > 0){
                Ice.mensajeWarning(mensaje);
                valido = false;
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
        return valido;
    },

    editarCompania: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.editarCompania grid',grid,'rowIndex',rowIndex,'colIndex',colIndex);
        var paso = 'Iniciando funcion guardar compañia',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var data = me.getRowDataActionColumn(grid, rowIndex, colIndex);
            Ice.cargarFormulario(refs.formCia, data);
            refs.formCia.dataEdit = data;
            refs.grid.getStore().removeAt(rowIndex);
            refs.formCia.show();
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    eliminarCompania: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.eliminarCompania grid', grid, 'rowIndex', rowIndex, 'colIndex', colIndex);
        var paso = 'Iniciando funcion guardar coaseguro cedido',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            if(Ext.manifest.toolkit === 'classic'){
                Ice.log('removeAt', rowIndex);
                refs.grid.getStore().removeAt(rowIndex);
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord();
                refs.grid.getStore().remove(record);
            }
        } catch(e) {
            Ice.generaExcepcion(e);
        }
    },

    getRowDataActionColumn: function(grid, rowIndex, colIndex){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.getDataRowActionColumn grid',grid,'rowIndex',rowIndex,'colIndex',colIndex);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            data;
        try{
            if(Ext.manifest.toolkit === 'classic'){
                var store = grid.getStore();
                data = store.getAt(rowIndex).getData();              
            } else {
                Ice.log('grid parent',grid.getParent());
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
        return data;
    },

    guardarAceptado: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.guardarAceptado');
        var paso = 'Iniciando funcion guardar coaseguro aceptado',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            Ice.validarFormulario(refs.formAceptado);
            var data = refs.formAceptado.getValues();
            Ice.request({
                mascara: 'guardando coaseguro aceptado',
                url: Ice.url.bloque.datosGenerales.movimientoMsupcoa,
                params: {
                    'params.cdcialider': data.cdcialider,
                    'params.cdunieco': view.cdunieco,
                    'params.cdramo': view.cdramo,
                    'params.estado': view.estado,
                    'params.nmpoliza': view.nmpoliza,
                    'params.nmpolizal': data.nmpolizal,
                    'params.nmsuplem': view.nmsuplem,
                    'params.tipodocu': data.tipodocu,
                    'params.ndoclider': data.ndoclider,
                    'params.status': data.status,
                    'params.accion': 'I'
                },
                success: function (json) {
                    var paso2 = 'LLenando store';
                    try {
                        refs.formAceptado.hide();
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    guardarCedido: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.guardarCedido');
        var paso = 'Iniciando funcion guardar coaseguro cedido',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            Ice.validarFormulario(refs.formAceptado);
            var data = refs.form.getValues(),
                dataGrid = refs.grid.getStore().getData(),
                list = [];
            for(var i = 0; i < dataGrid.items.length; i++){
                list[i] = dataGrid.items[i].data;
            }
            if(data){
                if(me.validaCompanias() == true){
                    Ice.request({
                        mascara: 'guardando coaseguro aceptado',
                        url: Ice.url.bloque.datosGenerales.movimientoCoaseguroCedido,
                        jsonData: {
                            params: {
                                'cdunieco': view.cdunieco,
                                'cdramo': view.cdramo,
                                'estado': view.estado,
                                'nmpoliza': view.nmpoliza,
                                'nmsuplem': view.nmsuplem,
                                'cdtipcoa': view.cdtipcoa,
                                'swabrido': data.swabrido,
                                'cdmodelo': data.cdmodelo,
                                'swpagcom': data.swpagcom,
                                'status': data.status,
                                'accion': 'I'
                            },
                            list: list
                        },
                        success: function (json) {
                            var paso2 = 'LLenando store';
                            try {
                                refs.formAceptado.hide();
                                refs.grid.hide();
                            } catch (e) {
                                Ice.manejaExcepcion(e, paso2);
                            }
                        }
                    });
                } 
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    guardar: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.guardar');
        var paso = 'Iniciando funcion guardar coaseguro',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            if(view.cdtipcoa != 'N'){
                if(view.cdtipcoa == 'A'){
                    this.guardarAceptado();
                } else {
                    this.guardarCedido();
                }
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
    },

    cargar: function(){
        Ice.log('Ice.view.bloque.coaseguro.PanelCoaseguroController.cargar');
        var paso = 'Iniciando funcion guardar coaseguro',
            me = this,
            view = me.getView(),
            refs = view.getReferences(),
            url = '';
        try{
            if(view.cdtipcoa != 'N'){
                if(view.cdtipcoa == 'A'){
                    url = Ice.url.bloque.datosGenerales.obtenerCoaseguroAceptado;
                } else {
                    url = Ice.url.bloque.datosGenerales.obtenerCoaseguroCedido;
                }
                Ice.request({
                    mascara: 'guardando coaseguro',
                    url: url,
                    params: {
                        'params.cdunieco': view.cdunieco,
                        'params.cdramo': view.cdramo,
                        'params.estado': view.estado,
                        'params.nmpoliza': view.nmpoliza,
                        'params.nmsuplem': view.nmsuplem
                    },
                    success: function (json) {
                        var paso2 = 'LLenando store';
                        try {
                            Ice.log('json list',json.list,'params',json.params);
                            if(view.cdtipcoa == 'A'){
                                Ice.cargarFormulario(refs.formAceptado, json.params);
                            } else {
                                Ice.cargarFormulario(refs.form, json.params);
                                for(var i = 0; i < json.list.length; i++){
                                    refs.grid.getStore().add(json.list[i]);
                                }
                                refs.form.show();
                                refs.grid.show();
                            }
                        } catch (e) {
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            }
        } catch (e){
            Ice.generaExcepcion(e);
        }
    }

});