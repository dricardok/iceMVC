Ext.define("Ice.view.bloque.documentos.historial.HistorialAgregarDetalleWindow",{
	extend		:	"Ice.view.componente.VentanaIce",
	xtype		:	"historialagregardetallewindow",
	controller 	: 	"historialagregardetallewindow",
	title		:	"Agregar Detalle",
	scrollable	:	true,
	bodyPadding: '30',
	config		:{
		record	:	null
	},

	platformConfig: {
		desktop: {
			width: Ice.constantes.componente.ventana.width,
			modal: true
		}
	},
	
	constructor	:	function(config){
		Ice.log('formagrupador.constructor config:', config);
        var me = this,
            paso = 'Construyendo agregar detalle window';
        try {
        	
        	
        	if(!config.record){
        		throw 'No hay datos de tdmesacontrol';
        	}
        	
        	
        	
        	config.items		= [
        		{
        			xtype		:	'textareaice',
        			readOnly	:	true,
        			scrollable	: 	true,
        			reference	:	'comentarios',
        			fieldLabel	:	'Se recibe con los siguientes comentarios',
        			width		:	'100%',
        			maxRows		:   7,
        			hidden		:	config.record.get('swagente')!='S',
        			value		:	config.record.get('comments')
        		},
        		{
        			xtype		:	'textareaice',
        			readOnly	:	false,
        			reference	:	'ncommentario',
        			fieldLabel	:	'Nuevo comentario:',
        			maxRows		:    7,
        			width		:	'100%'
        		}
        	];
        	
        	
        }catch(e){
        	Ice.manejaExcepcion(e,paso);
        }
        me.callParent(arguments);
	},
	
	buttons		:		[
		{
			text		:	'Agregar Detalle',
			iconCls 	: 'x-fa fa-plus-circle',
			handler		:	'agregarDetalle'
		}, {
			text		:	'Cancelar',
			iconCls 	: 'x-fa fa-close',
			ui:'gray',
	 		style:'margin-right: 30px;',
			handler		:	'cancelar'
			
		}
	]
});
	
	