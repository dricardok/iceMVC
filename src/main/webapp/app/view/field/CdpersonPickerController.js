/**
 * 
 */
Ext.define('Ice.view.field.CdpersonPickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdpersonpickercontroller', 
    
    custom: function () {
        Ice.log('Ice.view.field.CdpersonPickerController.custom');
        try {
            
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.field.CdpersonPickerController.custom');
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
    },
    
    setValue: function(param){
        Ice.log('Ice.view.field.CdpersonPickerController.setValue',param);
        var paso = 'Modificando valor de cdperson',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            Ice.log(refs);
            try{
                var mask = Ice.mask('Recuperando datos de persona');
                Ice.request({
                    mascara: 'Agregando situacion de riesgo',
                    url: Ice.url.bloque.personas.obtenerPersonaCriterio,
                    params: {
                        'params.cdatribu': 'CDPERSON',
                        'params.otvalor': param
                    },
                    success: function (json) {
                        var paso2 = 'LLenando store';
                        try {
                            Ice.log("json",json.listas);
                            if(json.listas){
                                if(json.listas[0]){
                                    var data = json.listas[0];
                                    refs.cdperson.setValue(data.cdperson);
                                    refs.dsnombre.setValue(data.dsnombre);
                                    mask.close();
                                } else {
                                    mensajeWarning('No se recibieron datos');
                                    mask.close();
                                }
                            }
                        } catch (e) {
                            mask.close();
                            Ice.manejaExcepcion(e, paso2);
                        }
                    }
                });
            } catch (e) {
                Ice.manejaExcepcion(e, paso);
            }
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.field.CdpersonPickerController.setValue');
    },
    
    getValue: function(){
        Ice.log('Ice.view.field.CdpersonPickerController.getValue');
        var paso = 'Obteniendo valor de cdperson',
            cdperson = '',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            cdperson = refs.cdperson.getValue();
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.field.CdpersonPickerController.getValue');
        return cdperson;
    },
    
    buscar: function(){
        Ice.log('Ice.view.field.CdpersonPickerController.buscar');
        var paso = 'Obteniendo valor de cdperson',
            cdperson = '',
            me = this,
            view = me.getView(),
            refs = view.getReferences();
        try{
            var windowBuscar = Ext.create('Ice.view.bloque.personas.BuscarPersona',{
                width: 400,
                listeners: {
                    'obtenerCdperson': function(view, cdperson){
                        me.setValue(cdperson);
                        Ice.pop();
                    }
                }
            });            
//            windowBuscar.width = 400;
//            windowBuscar.closable = false;
//            windowBuscar.floating = false;
            Ice.push(windowBuscar);
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
        Ice.log('Ice.view.field.CdpersonPickerController.buscar');
    }
});