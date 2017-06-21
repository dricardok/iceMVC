Ext.define('Ice.view.bloque.personas.Persona', {
	
		extend  :       'Ext.Panel',
		xtype	:		'persona',
		config	:		{
			cdperson		:	null,
			modelFields		:	[],
			modelValidators	:	{},
			cdramo			:	null,
			cdrol			:	null,
			accion			:	'I'
		},
		controller : 'persona',
		layout	   : 'responsivecolumn',
		bodyPadding: '10px 0px 0px 10px',
	    defaults: {
	        margin: '0px 10px 10px 0px',
	        cls: 'big-100 small-100'
	    },
		constructor: function (config) {
	        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque de datos generales';
	            try {
	                if(!config.cdramo || !config.cdrol){
	                	throw 'No se recibio ramo o rol en el bloque de personas';
	                }
	                if(config.cdperson){
	                	config.accion="U";
	                }
	            } catch (e) {
	                Ice.generaExcepcion(e, paso);
	            }
	        me.callParent(arguments);
	    },
	    initComponent: function () {
	    	Ice.log('Ice.view.bloque.personas.RegistroPersona.initComponent [this, args]:', this, arguments);
	        var me = this,
	            paso = 'Construyendo RegistroPersona';
	        
	        try {
	        	
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
	        	
	        	var gridDomicilios={
	        			xtype		:	'domicilios',
	        			cdperson	:	me.getCdperson(),
	        			botones		:	{
	        				xtype		:	'button',
	                        iconCls		:	'x-fa fa-plus-circle',
	        				text		:	'Agregar Domicilio',
	        				handler		:	function(grid,row,col){
								me.getController().agregarDomicilio(grid,row,col)
							}
	        			},
	        			actionColumns	:	[
	        				{
									xtype : 'actioncolumn',
									width : 50,
									items : [
												{
													iconCls : 'x-fa fa-edit',
													tooltip : 'Editar',
													handler : function(grid,row,col){
														me.getController().editarDomicilio(grid,row,col)
													}
												},
												{
													iconCls : 'x-fa fa-remove',
													tooltip : 'Borrar',
													handler : function(grid,row,col){
														me.getController().borrarDomicilio(grid,row,col)
													}
												} 
											]
								}
	        			]
	        			
	        	};
	        
	        	var frmPersonas={
	        			xtype		:	'form',
	        			itemId		:	"frmPersona",
	        			modelValidators:Object.assign({},compsMpersona.AGREGAR_PERSONAS.MPERSONA.validators,compsTatriper.TATRIPER.TATRIPER.validators),
	        			modelFields:compsMpersona.AGREGAR_PERSONAS.MPERSONA.fields.concat(compsTatriper.TATRIPER.TATRIPER.fields),
	        			items		:	[
	        				{
	        					xtype: 'fieldset',
	        		            title: 'Datos',
	        		            items: compsMpersona.AGREGAR_PERSONAS.MPERSONA.items.concat(compsTatriper.TATRIPER.TATRIPER.items),
	        		            layout	    :   'column'
	        				},
//	        				{
//	        					xtype: 'fieldset',
//	        		            title: 'TATRIPER',
//	        		            items: compsTatriper.TATRIPER.TATRIPER.items,
//	        		            layout	    :   'column'
//	        				},
	        				{
	        					xtype: 'fieldset',
	        		            title: 'DOMICILOS',
	        		            items: [
	        		            	gridDomicilios
	        		            ]
	        				}
	        			],
	        			buttons		:	[
	        				{
	        					text		:	'Guardar',
	        					handler		:	'guardarPersona'
	        				}
	        			]	
	        	}
	        	 Ext.apply(me, {
	                 items: [
	                	 frmPersonas
	                 ],
	                 modelFields		:	compsTatriper.TATRIPER.TATRIPER.fields.concat(compsMpersona.AGREGAR_PERSONAS.MPERSONA.fields),
	                 modelValidators	:	Object.assign({},compsTatriper.TATRIPER.TATRIPER.validators,compsMpersona.AGREGAR_PERSONAS.MPERSONA.validators)
	             });
	        	 // construir componente
	            me.callParent(arguments);
	        } catch (e) {
	            Ice.generaExcepcion(e, paso);
	        }
	        
	        paso = 'custom';
				try {
					me.getController().custom();
				} catch (e) {
					Ice.generaExcepcion(e, paso);
				}
	    }
		
});