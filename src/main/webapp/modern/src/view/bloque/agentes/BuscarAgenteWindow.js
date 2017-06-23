Ext.define("Ice.view.bloque.agentes.BuscarAgenteWindow",{
	
	extend		:	"Ice.view.componente.Ventana",
	controller	:	"buscaragentewindow",
	width		:	"60%",
	height		:	400,
	
	
	xtype		:	"buscaragentewindow",
	
	config		:	{
		cdagente	:	null
	},
	
	constructor : 	function(config){
		
		var paso="",
			me=this;
		try{
			
			var items = [
				{
					xtype	:	"formulario",
					items	:	[
						{
							xtype		:	"textfieldice",
							label		:	"Código de agente"
						}
					],
					buttons	:	[
						{
							text	:	"Buscar",
							handler	:	"onBuscar"
						}
					]
				},
				{
					xtype		:	"gridice",
					scrollable	:	true,
					width		:	'100%',
        			height		: 	300,
					columns		:	[
						{
							text		:	'Cod. Age.',
							dataIndex	:	'cdagente'
						},
						{
							text		:	'Nombre',
							dataIndex	:	'dsnombre'
						},
					],
					store		:	{
						
						fields	:["cdagente",'dsnombre'],
						proxy	:{
							type 		:	'ajax',
							url			:	Ice.url.bloque.agentes.buscar,
							reader 		: {
								type 			: 'json',
								rootProperty 	: 'list',
								successProperty : 'success',
								messageProperty : 'message'
							}
						}
					},
					buttons		:	[
						{
							text	:	"Elegir",
							handler	:	"onElegir"
						}
					]
				}
			];
			
			config.items=items;
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