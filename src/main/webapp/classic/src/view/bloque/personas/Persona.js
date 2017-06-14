Ext.define('Ice.view.bloque.personas.Persona', {
	
		extend  :       'Ext.Panel',
		xtype	:		'persona',
		config	:		{
			cdperson		:	null,
			modelFields		:	[],
			modelValidators	:	{}
		},
		controller : 'persona',
		layout	   : 'responsivecolumn',
		bodyPadding: '10px 0px 0px 10px',
	    defaults: {
	        margin: '0px 10px 10px 0px',
	        cls: 'big-50 small-100'
	    },
		constructor: function (config) {
	        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
	        var me = this,
	            paso = 'Validando construcci\u00f3n de bloque de datos generales';
	            try {
	                
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
	                url: 'jsonLocal/obtieneTatriper.json',
	                items: true,
	                fields: true,
	                validators: true,
	                mapperAttr:function(obj){
	                	obj.label=obj.dsatribu;
	                	obj.tipocampo=obj.swformat
	                	obj.name_cdatribu=obj.cdatribu
	                	obj.maxlength=obj.nmlmax
	                	obj.minlength=obj.nmlmin
	                	obj.catalogo=Ext.isEmpty((""+obj.ottabval).trim())?false:obj.ottabval
	                			
	                	
	                }
	            });
	        	
	        	var compsMpersona = Ice.generaComponentes({
	                pantalla: 'AGREGAR_PERSONAS',
	                seccion: 'MPERSONA',
	                url: 'jsonLocal/obtieneMpersona.json',
	                items: true,
	                fields: true,
	                validators: true
	            });
	        	
	        	var gridDomicilios={
	        			xtype		:	'domicilios',
	        			botones		:	{
	        				xtype		:	'button',
	                        iconCls		:	'x-fa fa-plus-circle',
	        				text		:	'Agregar Domicilio',
	        				handler		:	'agregarDomicilio'
	        			},
	        			actionColumns	:	[
	        				{
									xtype : 'actioncolumn',
									width : 50,
									items : [
												{
													iconCls : 'x-fa fa-edit',
													tooltip : 'Editar',
													handler : 'editarDomicilio'
												},
												{
													iconCls : 'x-fa fa-remove',
													tooltip : 'Borrar',
													handler : 'borrarDomicilio'
												} 
											]
								}
	        			]
	        			
	        	}
	        	var frmPersonas={
	        			xtype		:	'form',
	        			
	        			items		:	[
	        				{
	        					xtype: 'fieldset',
	        		            title: 'MPERSONA',
	        		            items: compsMpersona.AGREGAR_PERSONAS.MPERSONA.items,
	        		            layout	    :   'column'
	        				},
	        				{
	        					xtype: 'fieldset',
	        		            title: 'TATRIPER',
	        		            items: compsTatriper.TATRIPER.TATRIPER.items,
	        		            layout	    :   'column'
	        				},
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
	        					text		:	'Guardar'
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
	    }
		
});