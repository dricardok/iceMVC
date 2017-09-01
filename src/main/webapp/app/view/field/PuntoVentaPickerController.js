Ext.define('Ice.view.field.PuntoVentaPickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.puntoventapicker',
    
    setValue: function (cdptovta) {
        Ice.log('Ice.view.field.PuntoVentaPickerController.setValue cdptovta:', cdptovta);
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
        Ice.log('Ice.view.field.PuntoVentaPickerController.getValue');
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
        Ice.log('Ice.view.field.PuntoVentaPickerController.buscar');
        var me = this,
        	view = me.getView(),
            paso = 'Obteniendo valor de cdperson';
        try {
            var formRefs = view.up('[getValues]').getReferences(),
                windowBuscar = Ext.create('Ice.view.cotizacion.VentanaPerfilamiento', {
                listeners: {
                    seleccionarPerfil: function (view, cdptovta, cdgrupo, cdsubgpo, cdperfil, cdunieco) {
                        me.setValue(cdptovta);
                        try{
                            formRefs.grupo.setValue(cdgrupo);
                            formRefs.subgrupo.setValue(cdsubgpo);
                            formRefs.perfiltarifa.setValue(cdperfil);
                        } catch (e) {
                            Ice.log('No se pudo devolver los campos de punto de venta ',e);
                        }
                        if(Ice.classic()){
                            windowBuscar.cerrar();
                        } else {
                            Ice.pop();
                        }
                    }
                },
                cdtipsit: formRefs.cdtipsit.getValue(),
                cdramo: formRefs.cdramo.getValue()
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
        
/*    onGetName: function(){
        return 'cdperson';
    },*/
    
    onSetActiveError: function(param){
        Ice.mensajeWarning(param);
    },
    
    onBuscar: function(){
        this.buscar();
    }
});