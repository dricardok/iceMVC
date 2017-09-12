Ext.define('Ice.view.field.DomicilioPickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.domiciliopicker',
    
    setValue: function (dsdomici) {
        Ice.log('Ice.view.field.DomicilioPickerController.setValue dsdomici:', dsdomici);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Modificando valor de punto de venta';
        try {
            refs.otvalor15.setValue(dsdomici);
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
    },
    
    getValue: function(){
        Ice.log('Ice.view.field.DomicilioPickerController.getValue');
        var me = this,
            refs = me.getReferences(),
            paso = 'Obteniendo valor de domicilio',
            value;
        try {
            value = refs.otvalor15.getValue();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return value;
    },
    
    buscar: function () {
        Ice.log('Ice.view.field.DomicilioPickerController.buscar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Obteniendo valor de cdperson';
        try {
            var formRefs = view.up('[getValues]').getReferences(),
                windowBuscar = Ext.create('Ice.view.componente.VentanaIce',{
                modal:true,
                items: [
                    {
                        xtype: 'formulariodomicilio',
                        buttons: [
                            {
                                text: 'Aceptar',
                                iconCls: 'x-fa fa-accept',
                                handler: function (btn) {
                                    try{
                                        var values = btn.up('formulariodomicilio').getValues();
                                        for (name in values){
                                            try {
                                                var val = values[name],
                                                    formVal = formRefs[name];
                                                Ice.log('val ',val,'formVal',formVal);
                                                formVal.setValue(val);
                                            } catch(e) {
                                                Ice.log('error setean valor name ',name, ' error ', e);
                                            }
                                        }
                                        me.setValue(values.dsdomici);
                                        if(Ice.classic()){
                                            windowBuscar.cerrar();
                                        } else {
                                            Ice.pop();
                                        }
                                    } catch(e) {
                                        Ice.log('No se pudo modificar dsdomici ',e);
                                    }
                                }
                            }
                        ]
                    }
                ]
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

    manejaSetValue: function(campo, value){
        try{
            campo.setValue(value);
        } catch(e) {
            Ice.log('No se pudo setear campo', campo);
        }
    },
    
    onSetValue: function(param){
        this.setValue(param)
    },
    
    onGetValue: function(){
        return this.getValue();
    },
        
    onGetName: function(){
        return 'otvalor15';
    },
    
    
    
    onBuscar: function(){
        this.buscar();
    },
    onSetActiveError: function(param){
        //Ice.mensajeWarning(param);
    	var me  = this,
    		view = me.getView()
    		paso = 'Is valid on cdagentepicker';
    	
    	try {
    		
    		view.getReferences().otvalor15.isValid();
    	}catch(e){
    		Ice.generaExcepcion(e, paso);
    	}
    }
});