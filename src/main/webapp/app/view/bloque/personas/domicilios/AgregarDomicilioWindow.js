Ext.define("Ice.view.bloque.personas.domicilios.AgregarDomicilioWindow",{
	
	extend		:	"Ice.view.componente.VentanaIce",
	controller	:	"agregardomiciliowindow",
	xtype		:	'agregardomiciliowindow',
	config		:	{
		cdperson	:	null,
		nmorddom	:	null,
		accion		:	"I",
		modelValidators:   {},
		modelFields	:	[]
	},
	autoShow		:	true,
	title			:	'Agregar Domicilio',
	constructor : 	function(config){
		
		var paso="",
			me=this;
		try{
			if(config.cdperson && config.nmorddom){
				config.accion="U";
			}
			
			Ice.log("Ice.view.bloque.personas.domicilios.AgregarDomicilioWindow.constructor: cdperson nmorddom",config.cdperson,config.nmorddom);
			var comps = Ice.generaComponentes({
                pantalla: 'AGREGAR_PERSONAS',
                seccion: 'MDOMICIL',
                items: true,
                fields: true,
                validators: true
            });
			paso="Marcando campos para buscar CP";
			comps.AGREGAR_PERSONAS.MDOMICIL.items.forEach(function(it){
    			
    			var b=it.name=="cdpostal" ||
    				it.name=="cdpais" ||
    				it.name=="otpoblac" ||
    				it.name=="cdprovin";
    			
    			if(b){
    				it.cmpBuscar=true;
					it.listeners={
						focus:"onFocusCP"
					};
					
					
					it.emptyText="Click para buscar";
					
    			}
    		});
			
			me.items=[
				{
					xtype		:	"formtrescolumnasice",
					reference	:	"formulario",
					scrollable	:	true,
					items		:	comps.AGREGAR_PERSONAS.MDOMICIL.items,
			    	modelValidators:comps.AGREGAR_PERSONAS.MDOMICIL.validators,
        			modelFields	:	comps.AGREGAR_PERSONAS.MDOMICIL.fields,	
        			buttons		:	[
		 			    	{
						    	xtype	: 'button',
						    	text	: 'Guardar',
						    	handler : 'guardarDomicilio'
		 			    	},
		 			    	{
						    	xtype	: 'button',
						    	text	: 'Cancelar',
						    	handler : 'cancelar'
		 			    	}
		 			    ],
				}
			]
			
			
    		Ice.log("##",comps.AGREGAR_PERSONAS.MDOMICIL.items);
		}catch(e){
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
		try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	},
	
	
	
	
});