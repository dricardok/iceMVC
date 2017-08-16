Ext.define('Ice.view.field.CdagentePickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagentepickercontroller',
    
    setValue: function (param) {
        Ice.log('Ice.view.field.CdagentePickerController.setValue param:', param)
        var me = this,
        view = me.getView(),
        refs = view.getReferences(),
        paso = 'Modificando valor de cdagente';
        try {
            Ice.request({
                mascara: 'Recuperando datos de agente',
                url: Ice.url.bloque.agentes.buscar,
                params: {
                    'params.cdagente': param
                },
                success: function (json) {
                    var paso2 = 'Asignando nombre de agente';
                    try {
                        Ice.log("json", json.listas);
                        if(json.list && json.list[0]) {
                            var data = json.list[0];
                            refs.cdagente.setValue(data.cdagente);
                            refs.dsnombre.setValue(data.dsnombre);
                        } else {
                            mensajeWarning('No se pudo recuperar el agente');
                        }
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.field.CdagentePickerController.setValue');
    },
    
    getValue: function(){
        Ice.log('Ice.view.field.CdagentePickerController.getValue');
        var me = this,
            refs = me.getReferences(),
            paso = 'Obteniendo valor de cdagente',
            cdagente;
        try {
        	cdagente = refs.cdagente.getValue();
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        return cdagente;
    },
    
    buscar: function () {
        Ice.log('Ice.view.field.CdagentePickerController.buscar');
    	var me = this,
	    view = me.getView(),
		refs = view.getReferences(),
		paso = 'Obteniendo valor de cdagente';
        try {
        	try{
	        	var cdgrupo  = me.getView().up('bloquedatosgenerales').getCdgrupo();
	        	var cdptovta = me.getView().up('bloquedatosgenerales').getCdptovta();
        	}catch(e){
        		Ice.log("Error en cdagentepicker");
        	}
        	
			Ext.create("Ice.view.bloque.agentes.BuscarAgenteWindow", {
				listeners: {
					elegiragente: function (bus, record) {
						refs.cdagente.setValue(record.get("cdagente"));
						refs.dsnombre.setValue(record.get("dsnombre"));
	    			}
	    		}
	    	}).mostrar();
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
        return 'cdagente';
    },
    
    onSetActiveError: function(param){
        Ice.mensajeWarning(param);
    },
    
    onBuscar: function(){
        this.buscar();
    }
});