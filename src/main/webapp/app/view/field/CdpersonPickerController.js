Ext.define('Ice.view.field.CdpersonPickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdpersonpickercontroller',
    
    setValue: function (param) {
        Ice.log('Ice.view.field.CdpersonPickerController.setValue param:', param);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Modificando valor de cdperson';
        try {
            Ice.request({
                mascara: 'Recuperando datos de persona',
                url: Ice.url.bloque.personas.obtenerPersonaCriterio,
                params: {
                    'params.cdatribu': 'CDPERSON',
                    'params.otvalor': param
                },
                success: function (json) {
                    var paso2 = 'Asignando nombre de persona';
                    try {
                        Ice.log("json", json.listas);
                        if(json.listas && json.listas[0]) {
                            var data = json.listas[0];
                            refs.cdperson.setValue(data.cdperson);
                            refs.dsnombre.setValue(data.dsnombre);
                        } else {
                            mensajeWarning('No se pudo recuperar la persona');
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.field.CdpersonPickerController.setValue');
    },
    
    getValue: function(){
        Ice.log('Ice.view.field.CdpersonPickerController.getValue');
        var me = this,
            refs = me.getReferences(),
            paso = 'Obteniendo valor de cdperson',
            cdperson;
        try {
            cdperson = refs.cdperson.getValue();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return cdperson;
    },
    
    buscar: function () {
        Ice.log('Ice.view.field.CdpersonPickerController.buscar');
        var me = this,
            paso = 'Obteniendo valor de cdperson';
        try {
            var windowBuscar = Ext.create('Ice.view.bloque.personas.BuscarPersona', {
                listeners: {
                    obtenerCdperson: function (view, cdperson) {
                        me.setValue(cdperson);
                    }
                }
            });
            Ice.push(windowBuscar);
//            windowBuscar.width = 400;
//            windowBuscar.closable = false;
//            windowBuscar.floating = false;
//            if(Ext.manifest.toolkit === 'classic'){
//                windowBuscar.height = 500;
//                windowBuscar.closeAction = 'destroy';
//                windowBuscar.modal = true;
//                windowBuscar.show();
//            } else {
//                windowBuscar.mostrar();
//            }
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    onSetValue: function(param){
        this.setValue(param)
    },
    
    onGetValue: function(){
        return this.getValue();
    },
        
    onGetName: function(){
        return 'cdperson';
    },
    
    onSetActiveError: function(param){
        Ice.mensajeWarning(param);
    },
    
    onBuscar: function(){
        this.buscar();
    }
});