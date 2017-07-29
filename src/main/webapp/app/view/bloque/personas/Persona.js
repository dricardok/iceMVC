Ext.define('Ice.view.bloque.personas.Persona', {
	extend  :       'Ice.view.componente.PanelPaddingIce',
	xtype	:		'persona',
	platformConfig		:	{
		'!desktop'		:	{
			scrollable		:	true
		}
	},
	config	:		{
		cdperson		:	null,
		modelFields		:	[],
		modelValidators	:	{},
		cdramo			:	null,
		cdrol			:	null,
		accion			:	'I'
	},
	controller : 'persona',
	title		: "Agregar / Editar Persona",
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
                
                var compsTatriper = Ice.generaComponentes({
                    pantalla: 'TATRIPER',
                    seccion: 'TATRIPER',
                    cdramo:	config.cdramo,
                    cdrol:	config.cdrol,
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
            	
            	var eventsForm = Ice.generaComponentes({
    				pantalla: 'AGREGAR_PERSONAS',
    				seccion: 'EVENTOS',
    				modulo: me.modulo || '',
    				estatus: (me.flujo && me.flujo.estatus) || '',
    				cdramo: me.cdramo || '',
    				cdtipsit: me.cdtipsit ||'',
    				auxKey: me.auxkey || '',
    				eventos: true
    			});
            	
            	Ice.log("44444$$ $ ",eventsForm);
            	
            	var fenacimi=compsMpersona.AGREGAR_PERSONAS.MPERSONA.items.find(function(it){
            		return it.name=="fenacimi";
            	});
            	
            	//fenacimi.format="d-m-Y";
            	
            	var gridDomicilios={
            			xtype		:	'domicilios',
            			cdperson	:	config.cdperson,
            			buttons		:	[{
            				xtype		:	'button',
                            iconCls		:	'x-fa fa-plus-circle',
            				text		:	'Agregar Domicilio',
            				handler		:	function(grid,row,col){
            					
    							me.getController().agregarDomicilio(grid,row,col)
    						}
            			}],
            			actionColumns	:	[
            				{
    								xtype : 'actioncolumn',
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
            			xtype		:	'formtrescolumnasice',
            			itemId		:	"frmPersona",
            			config		:{
            				modelValidators:Ice.utils.mergeObjects({},compsMpersona.AGREGAR_PERSONAS.MPERSONA.validators,compsTatriper.TATRIPER.TATRIPER.validators),
                			modelFields:compsMpersona.AGREGAR_PERSONAS.MPERSONA.fields.concat(compsTatriper.TATRIPER.TATRIPER.fields)
            			},
            			items		:	compsMpersona.AGREGAR_PERSONAS.MPERSONA.items.concat(compsTatriper.TATRIPER.TATRIPER.items),
            			buttons		:	[
            				{
            					text:"Cancelar",
            					iconCls: 'x-fa fa-close',
            					handler:function(){
            						Ice.pop()
            					}
            				},
            				{
            					text		:	'Guardar',
            					iconCls		: 	'x-fa fa-save',
            					handler		:	'guardarPersona'
            				}
            			],
            			iceEvents: eventsForm.AGREGAR_PERSONAS.EVENTOS.eventos
            			
            	}
            	 Ext.apply(config, {
                     items: [
                    	 frmPersonas,
                    	 gridDomicilios
                     ],
                     modelFields		:	compsTatriper.TATRIPER.TATRIPER.fields.concat(compsMpersona.AGREGAR_PERSONAS.MPERSONA.fields),
                     modelValidators	:	Ice.utils.mergeObjects({},compsTatriper.TATRIPER.TATRIPER.validators,compsMpersona.AGREGAR_PERSONAS.MPERSONA.validators)
                 });
        
                
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
        me.callParent(arguments);
    },
    initComponent: function () {
    	Ice.log('Ice.view.bloque.personas.Persona.initComponent [this, args]:', this, arguments);
        var me = this,
            paso = 'Construyendo RegistroPersona';
        
        try {
        	
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
    },
    
    initialize: function(){
    	var me = this,
        paso = 'Construyendo RegistroPersona'
    	try {
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