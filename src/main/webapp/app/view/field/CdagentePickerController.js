Ext.define('Ice.view.field.CdagentePickerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagentepickercontroller',
    
    setValue: function (param) {
        Ice.log('Ice.view.field.CdagentePickerController.setValue param:', param);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Modificando valor de cdagente';
	        refs.cdagente.setValue(data.cdagente);
	        refs.dsnombre.setValue(data.dsnombre);
        try {
        	/*
            Ice.request({
                mascara: 'Recuperando datos de agente',
                url: Ice.url.bloque.agentes.obtenerAgenteCriterio,
                params: {
                    'params.cdatribu': 'CDAGENTE',
                    'params.otvalor': param
                },
                success: function (json) {
                    var paso2 = 'Asignando nombre de agente';
                    try {
                        Ice.log("json", json.listas);
                        if(json.listas && json.listas[0]) {
                            var data = json.listas[0];
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
            */
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
        	/*
            var windowBuscar = Ext.create('Ice.view.bloque.personas.BuscarPersona', {
                listeners: {
                    obtenerCdperson: function (view, cdperson) {
                        me.setValue(cdperson);
                    }
                }
            });
            */
			Ext.create("Ice.view.bloque.agentes.BuscarAgenteWindow", {
				listeners: {
					elegiragente: function (bus, record) {
						Ice.log('elegiragente record:', record);
						refs.cdagente.setValue(record.get("cdagente"));
						refs.dsnombre.setValue(record.get("dsnombre"));
	    			}
					//elegiragente: function (bus, record) {
					/*
					elegiragente: function (view, recordAgente) {
						Ice.log('evento elegiragente', view, recordAgente);
			            var refs = view.getReferences(),
			            paso = 'Modificando valor de cdagente';
			            Ice.log('refs... ', refs);
				        //refs.cdagente.setValue(data.cdagente);
				        //refs.dsnombre.setValue(data.dsnombre);
				        
						refs.cdagente.setValue(record.get("cdagente"));
				        refs.dsnombre.setValue(record.get("dsnombre"));
						Ice.log('cdagente asignado:', refs.cdagente.getValue());
						Ice.log('dsnombre asignado:', refs.dsnombre.getValue());
						//refs.agregaragente.getReferences().cdagente.setValue(record.get("cdagente"));
						//me.setValue(cdagente);
	    			}
	    			*/
	    		}
	    	}).mostrar();
            
            //Ice.push(windowBuscar);
            
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
        return 'cdagente';
    },
    
    onSetActiveError: function(param){
        Ice.mensajeWarning(param);
    },
    
    onBuscar: function(){
        this.buscar();
    }
});