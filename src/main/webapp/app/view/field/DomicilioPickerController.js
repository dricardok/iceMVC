Ext.define('Ice.view.field.DomicilioPickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.domiciliopicker',
    
    setValue: function (cdptovta) {
        Ice.log('Ice.view.field.DomicilioPickerController.setValue cdptovta:', cdptovta);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Modificando valor de punto de venta';
        try {
            refs.cdptovta.setValue(cdptovta);
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    getValue: function(){
        Ice.log('Ice.view.field.DomicilioPickerController.getValue');
        var me = this,
            refs = me.getReferences(),
            paso = 'Obteniendo valor de punto de venta',
            value;
        try {
            value = refs.cdptovta.getValue();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return value;
    },
    
    buscar: function () {
        Ice.log('Ice.view.field.DomicilioPickerController.buscar');
        var me = this,
        	view = me.getView(),
            paso = 'Obteniendo valor de cdperson';
        try {
            var formRefs = view.up('[getValues]').getReferences(),
                windowBuscar = Ext.create('Ice.view.bloque.personas.domicilios.FormularioDomicilio', {
                listeners: {
                    seleccionarDomicilio: function (dsdomici) {
                        me.setValue(dsdomici);
                        if(Ice.classic()){
                            windowBuscar.cerrar();
                        } else {
                            Ice.pop();
                        }
                    }
                }
            });
            if(Ice.classic()){
                windowBuscar.mostrar();
            } else {
                Ice.push(windowBuscar);
            }
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
        return 'dsdomici';
    },
    
    onSetActiveError: function(param){
        Ice.mensajeWarning(param);
    },
    
    onBuscar: function(){
        this.buscar();
    }
});