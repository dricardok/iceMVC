Ext.define("Ice.view.bloque.documentos.historial.HistorialAgregarDetalleWindow",{
	extend		:	"Ice.view.componente.VentanaIce",
	xtype		:	"historialagregardetallewindow",
	controller 	: 	"historialagregardetallewindow",
	title		:	"Agregar Detalle",
	scrollable	:	true,
	bodyPadding: '40 0 0 40',
	config		:{
		record	:	null
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
			text		:	'Cancelar',
			iconCls 	: 'x-fa fa-close',
			handler		:	'cancelar'
			
		},
		{
			text		:	'Agregar Detalle',
			iconCls 	: 'x-fa fa-plus-circle',
			handler		:	'agregarDetalle'
		}
	]
});
	
	