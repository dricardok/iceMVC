Ext.define('Ice.view.bloque.personas.PolizaPersonaController', {
	extend: 'Ext.app.ViewController',
    alias : 'controller.polizapersona',
    onBuscar: function(){
        this.buscar();
    },
    buscar: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Buscando persona';
        try{
        	refs.domiciliosContainer.lookupReference('gridDomicilios').getStore().removeAll();
            if(this.validaBusqueda(refs) == true){
                Ice.log('refs validado',refs);
                Ice.log('refs cdunieco',refs.formBusquedaPersonas.getReferences().cdunieco.getValue());
                Ice.log('refs cdramo',refs.formBusquedaPersonas.getReferences().cdramo.getValue());
                Ice.log('refs nmpoliza',refs.formBusquedaPersonas.getReferences().nmpoliza.getValue());
                Ice.log('refs otvalor',refs.formBusquedaPersonas.getReferences().otvalor.getValue());
                var store = refs.gridPersonas.getStore();
                store.removeAll();
                var mask = Ice.mask('Cargando informacion de usuarios');
                store.load({
                    params: {
                        'params.cdunieco': refs.formBusquedaPersonas.getReferences().cdunieco.getValue(),
                        'params.cdramo': refs.formBusquedaPersonas.getReferences().cdramo.getValue(),
                        'params.estado': 'W',
                        'params.nmpoliza': refs.formBusquedaPersonas.getReferences().nmpoliza.getValue(),
                        'params.cdatribu': refs.formBusquedaPersonas.getReferences().dsatribu.getValue(),
                        'params.otvalor': refs.formBusquedaPersonas.getReferences().otvalor.getValue()
                    },
                    callback: function() {
                        mask.close();
                    }
                });
                refs.gridPersonas.show();
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.buscar');
    },
    validaBusqueda: function(refs){
        Ice.log('Ice.view.bloque.BuscarPersonaController.validaBusqueda',refs);
        var valid = true;
        if(refs.formBusquedaPersonas.getReferences().dsatribu){
            if(refs.formBusquedaPersonas.getReferences().dsatribu.getValue() === 'POLIZA'){
                if(!refs.formBusquedaPersonas.getReferences().cdunieco.getValue()
                    || !refs.formBusquedaPersonas.getReferences().cdramo.getValue()
                    || !refs.formBusquedaPersonas.getReferences().nmpoliza.getValue()){
                    valid = false;
                    Ice.mensajeWarning('Seleccione un oficina, producto y poliza');
                }
            } else {
                if(!refs.formBusquedaPersonas.getReferences().otvalor.getValue()){
                    valid = false;
                    Ice.mensajeWarning('Seleccione valor');
                }
            }
        } else {
            valid = false;
            Ice.mensajeWarning('Seleccione un criterio');
        }
        
        Ice.log('Ice.view.bloque.BuscarPersonaController.validaBusqueda');
        return valid;
    },
    verDomiciliosTab : function(grid, record, colIndex,r){
    	var me = this,
        view = me.getView(),
        refs = view.getReferences(),
        paso = 'Domicilios persona';
	    try{

	    	
	    	Ice.log("--->",arguments);
	    	
	    	var gridDomicilios = refs.domiciliosContainer.lookupReference('gridDomicilios');
	    	gridDomicilios.setCdperson(record.get("cdperson"));
	    	gridDomicilios.getStore().load({
	    		params	:	{
	    			'params.cdperson':record.get("cdperson")
	    		}
	    	});
	    	gridDomicilios.setHidden(false);
	    } catch(e){
	        Ice.generaExcepcion(e, paso);
	    }
    },
    
    editarPersona:function(grid, rowIndex, colIndex){
    	Ice.log('Ice.view.bloque.BuscarPersonaController.nuevo');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Editar persona';
        try{
        	Ice.log(grid,rowIndex,colIndex);
    		
    		if(Ext.manifest.toolkit === 'classic'){
    			var record=grid.getStore().getAt(rowIndex);            
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
            Ice.log('nuevo refs',refs);
            var persona = Ext.create('Ice.view.bloque.personas.Persona',{
                reference: 'persona',
                cdramo:view.getCdramo(),
               // cdrol:view.getCdrol(),
                cdperson:record.get("cdperson"),
                listeners: {
                    'personaGuardada': function(personaView, cdperson){
                        Ice.log('personaGuardado.view',view);
                        Ice.query('[name=dsatribu]', view.getReferences().formBusquedaPersonas).setValue('CDPERSON');
                        Ice.query('[name=otvalor]', view.getReferences().formBusquedaPersonas).setValue(cdperson);
                        Ice.pop();
                    }
                }
            });            
            Ice.push(persona);
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.nuevo');
    },
    cargar : function(){
    	var me = this,
        view = me.getView(),
        refs = view.getReferences(),
        paso = 'cargar persona';
	    try{

	    	
	    	Ice.log("--->",arguments);
	    	var gridpersonas = refs.gridPersonas;
	    	var gridDomicilios = refs.domiciliosContainer.lookupReference('gridDomicilios');
	    	var dataPer = view.getDataPer();
	    	gridDomicilios.setCdperson(dataPer.cdperson);
	    	gridDomicilios.getStore().load({
	    		params	:	{
	    			'params.cdperson':dataPer.cdperson
	    		},
	    		callback : function(){
	    			gridDomicilios.setDomiciliosSel(dataPer.nmorddom-1);
	    		}
	    	});
	    	gridDomicilios.setHidden(false);
	    	gridpersonas.getStore().load({
                params: {
                    'params.cdunieco': dataPer.cdunieco,
                    'params.cdramo': dataPer.cdramo,
                    'params.estado': dataPer.estado,
                    'params.nmpoliza': dataPer.nmpoliza,
                    'params.cdatribu': "CDPERSON",
                    'params.otvalor': dataPer.cdperson
                },
                callback : function(){
                	var idx=gridpersonas.getStore().find('cdperson',dataPer.cdperson);
                	if(idx != -1)
                		gridpersonas.setSingleSelection(idx);
	    		}
            });
	    } catch(e){
	        Ice.generaExcepcion(e, paso);
	    }
    },
    init: function (view) {
        Ice.log('Ice.view.bloque.personas.PolizaPersonasController.init view:', view);
        var me = this,
            view = me.getView(),
            paso = 'Iniciando controlador de poliza personas';
        try {
            me.callParent(arguments);
            
            // esperamos a que se cree el viewmodel antes de invocar custom
            Ext.defer(function () {
                var paso2;
                try {
                    paso2 = 'Definiendo  personas';
                    me.cargar();
                } catch (e) {
                    Ice.manejaExcepcion(e, paso2);
                }
            }, 600);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    onNuevo: function(){
        this.nuevo();
    },
    nuevo: function(){
        Ice.log('Ice.view.bloque.BuscarPersonaController.nuevo');
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Nueva persona';
        try{
            Ice.log('nuevo refs',refs);
            var persona = Ext.create('Ice.view.bloque.personas.Persona',{
                reference: 'persona',
                listeners: {
                    'personaGuardada': function(personaView, cdperson){
                        Ice.log('personaGuardado.view',view);
                        Ice.query('[name=dsatribu]', refs.formBusquedaPersonas).setValue('CDPERSON');
                        Ice.query('[name=otvalor]', refs.formBusquedaPersonas).setValue(cdperson);
                        me.onBuscar();
                        Ice.pop();
                    }
                }
            });            
            Ice.push(persona);
        } catch(e){
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.BuscarPersonaController.nuevo');
    },
    guardar: function(btn){
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.agregar btn ',btn);
        var me = this,
            view = me.getView(),
            refs = view.getReferences(),
            paso = 'Agregando persona a situacion de poliza',
            valid = false;
        try {
        	var gridpersonas = refs.gridPersonas;
	    	var gridDomicilios = refs.domiciliosContainer.lookupReference('gridDomicilios');
	    	var rol = refs.cdrol.getValue();
            if (!rol) {
                throw 'Seleccione un rol';
            }
            
            if (!gridDomicilios.getSingleSelection()) {
                throw 'Seleccione un domicilio';
            }

            var dom = gridDomicilios.getSingleSelection();
            var per = gridpersonas.getSingleSelection();
            var dataPer = view.getDataPer() || {};
            if (!per) {
                throw 'Seleccione una persona';
            }
            if(!dataPer.cdrol)
            	dataPer.cdrol = rol;
            if(!dataPer.cdperson )
            	dataPer.cdperson = per.cdperson;
            Ice.request({
                mascara: 'Agregando situacion de riesgo',
                url: Ice.url.bloque.personas.movimientoPolizaPersona,
                params: {
                    'params.cdunieco' : view.getCdunieco(),
                    'params.cdramo': view.getCdramo(),
                    'params.estado': view.getEstado(),
                    'params.nmpoliza': view.getNmpoliza(),
                    'params.nmsuplem': view.getNmsuplem(),
                    'params.nmsituac': view.getNmsituac(),
                    'params.cdrol': dataPer.cdrol,
                    'params.cdperson': dataPer.cdperson,
                    'params.nmsuplem': view.getNmsuplem(),
                    'params.status': 'V',
                    'params.nmorddom':  dom.nmorddom,
                    'params.swfallec': 'N',
                    'params.cdpersonNew': per.cdperson,
                    'params.cdrolNew': rol,
                    'params.accion':view.getAccion()
                },
                success: function (json) {
                    var paso2 = 'LLenando store';
                    try {
                        Ice.log("json ",json);
                        Ice.mensajeCorrecto('Guardado con exito');
                        view.fireEvent('guardar', view);
                        Ice.pop();
                    } catch (e) {
                        Ice.manejaExcepcion(e, paso2);
                    }
                }
            });
        } catch (e) {
            Ice.manejaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.personas.PersonasPolizaController.agregar');
    },
    onGuardar: function (btn) {
        this.guardar(btn);
    },
    editarDomicilio: function(grid,rowIndex,colIndex){
    	var paso='',
    		me=this,
    		view = me.getView();
    	
    	try{
    		Ice.log(grid,rowIndex,colIndex);
    		
    		
    		
    		if(Ext.manifest.toolkit === 'classic'){
    			var record=grid.getStore().getAt(rowIndex);            
            } else {
                var cell = grid.getParent(),
                    record = cell.getRecord(),
                    data = record.getData();
            }
    		
    		Ice.log("record",record,record.get("cdperson"),record.get("nmorddom"));
    		Ice.push(Ext.create("Ice.view.bloque.personas.domicilios.AgregarDomicilioWindow",{
    			
    			cdperson:record.get("cdperson"),
				nmorddom:record.get("nmorddom"),
	    		listeners:{
	    			guardarDomicilio:function(){
	    				view.down('[xtype=domicilios]').getStore().load();
	    				Ice.pop();
	    			}
	    		}
	    	}));
    		
    		
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    }
});