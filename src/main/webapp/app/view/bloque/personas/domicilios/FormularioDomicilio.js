Ext.define('Ice.view.bloque.personas.domicilios.FormularioDomicilio',{
	extend:	'Ice.view.componente.FormTresColumnasIce',
	xtype:	'formulariodomicilio',
	controller:	'formulariodomicilio',
	/*config		:	{
	},*/
	title: {
		text:'Domicilio',
		style:'margin:0px 45px 16px 40px;',
	},
	
	constructor : function(config){
		var paso = '',
			me   = this;
		try{
			Ice.log('Ice.view.bloque.personas.domicilios.FormularioDomicilio.constructor');
			var comps = Ice.generaComponentes({
                pantalla: 'AGREGAR_PERSONAS',
                seccion: 'MDOMICIL',
                items: true,
                fields: true,
                validators: true
            });
			paso="Marcando campos para buscar CP";
			comps.AGREGAR_PERSONAS.MDOMICIL.items.forEach(function(it){
    			var b = it.name == "cdpostal" ||
						it.name == "cdpais"   ||
						it.name == "otpoblac" ||
						it.name == "cdprovin";
    			if(b){
    				it.cmpBuscar = true;
					it.listeners = {
						render: function(el) {
							el.getEl().on('click',function(){
						        me.getController().onFocusCP();
						    });
						}
					};
					
					if(Ice.classic()){
						it.emptyText = "Click para buscar";
						it.listeners = {
								render:function(el){
									el.getEl().on('click',function(){
								        me.getController().onFocusCP();
								    });
								}
							};
					} else {
						it.value = "Click para buscar";
						it.listeners = {
							focus:'onFocusCP'
						};
					}
					
					
    			}
    		});
			
			
			
			config.reference= "formulario";
			config.items = comps.AGREGAR_PERSONAS.MDOMICIL.items;
			config.modelValidators= comps.AGREGAR_PERSONAS.MDOMICIL.validators;
			config.modelFields	=	comps.AGREGAR_PERSONAS.MDOMICIL.fields;
			
			
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
	}
});