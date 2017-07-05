Ext.define('Ice.view.bloque.personas.Persona', {
	
		extend  	:       'Ext.Panel',
		xtype		:		'persona',
		controller 	: 		'persona',
		scrollable	:		 true,
		config	:		{
			cdperson		:	null,
			modelFields		:	[],
			modelValidators	:	{},
			cdramo			:	null,
			cdrol			:	null,
			accion			:	'I'
		},
		
		constructor: function (config) {
			
	        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque de datos generales';
	            try {
	            	 if(!config.cdramo || !config.cdrol){
		                	//throw 'No se recibio ramo o rol en el bloque de personas';
		                }
	            	 if(config.cdperson){
		                	config.accion="U";
		                }
	            	 
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
		
		initialize	:		function(){
			var paso='',
				me=this;
			
			try{
				
				var compsTatriper = Ice.generaComponentes({
	                pantalla: 'TATRIPER',
	                seccion: 'TATRIPER',
	                cdramo:	me.getCdramo(),
	                cdrol:	me.getCdrol(),
	                items: true,
	                fields: true,
	                validators: true
	            });
	        	
	        	var compsMpersona = Ice.generaComponentes({
	                pantalla: 'AGREGAR_PERSONAS',
	                seccion: 'MPERSONA',
	                items: true,
	                fields: true,
	                validators: true
	            });
	        	
	        	var fenacimi=compsMpersona.AGREGAR_PERSONAS.MPERSONA.items.find(function(it){
	        		return it.name=="fenacimi";
	        	});
	        	
	        	fenacimi.dateFormat="d-m-Y";
	        	
	        	var gridDomicilios={
	        			xtype		:	'domicilios',
	        			cdperson	:	me.getCdperson(),
	        			width		:	'100%',
	        			height		: 	300,
	        			buttons		:	[{
	        				xtype		:	'button',
	                        iconCls		:	'x-fa fa-plus-circle',
	        				text		:	'Agregar Domicilio',
	        				handler		:	'agregarDomicilio'
	        			}],
	        			actionColumns	:	[
                            {
                                xtype: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-edit',
                                handler : function(grid,row,col){
									me.getController().editarDomicilio(grid,row,col)
								}
                            } , {
                                xtype: 'button',
                                ui: 'action',
                                iconCls: 'x-fa fa-minus-circle',
                                handler: function(grid,row,col){
									me.getController().borrarDomicilio(grid,row,col)
								}
                            }
                            
                        ]
	        			
	        	};
	        
	        	var frmPersonas={
	        			xtype		:	'formice',
	        			itemId		:	"frmPersona",
	        			modelValidators:Object.assign({},compsMpersona.AGREGAR_PERSONAS.MPERSONA.validators,compsTatriper.TATRIPER.TATRIPER.validators),
	        			modelFields:compsMpersona.AGREGAR_PERSONAS.MPERSONA.fields.concat(compsTatriper.TATRIPER.TATRIPER.fields),
	        			items		:	[
	        				{
	        					xtype: 'fieldset',
	        		            title: '',
	        		            items: compsMpersona.AGREGAR_PERSONAS.MPERSONA.items
	        				},
	        				{
	        					xtype: 'fieldset',
	        		            title: '',
	        		            items: compsTatriper.TATRIPER.TATRIPER.items
	        				},
	        				gridDomicilios
	        				
	        			],
	        			buttons		:	[
	        				{
	        					text:"Cancelar",
	        					handler:function(){
	        						Ice.pop()
	        					}
	        				},
	        				{
	        					text		:	'Guardar',
	        					handler		:	'guardarPersona'
	        				}
	        			]	
	        	}
	        	
	        	me.add(frmPersonas);
	        	//me.add(gridDomicilios);
			}catch(e){
				Ice.manejaExcepcion(e,paso);
			}
			 me.callParent(arguments);
			paso = 'custom';
			try {
				me.getController().custom();
			} catch (e) {
				Ice.generaExcepcion(e, paso);
			}
			
		}
});