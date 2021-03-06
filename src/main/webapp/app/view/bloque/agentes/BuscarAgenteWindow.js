Ext.define("Ice.view.bloque.agentes.BuscarAgenteWindow",{
	extend		:	"Ice.view.componente.VentanaIce",
	xtype		:	"buscaragentewindow",

	controller	:	"buscaragentewindow",

	// config ext
	title: 'Buscar Agente',
	scrollable: true,
	modal: true,
	bodyPadding: '20 0 0 20px',
	defaults: {
		
	},
	platformConfig: {
		desktop: {
			width: '60%',
			height: '90%'
		}
	},
	
	// config no ext
	config		:	{
		cdagente: null,
		cdgrupo:  null,
		cdptovta: null
	},
	
	constructor : 	function(config){
		Ice.log('Ice.view.bloque.agentes.BuscarAgenteWindow.constructor * config:', config);
		var me = this,
		    paso="Construyendo buscador de agentes";
		try{
			
			var items = [
				{
					xtype	:	"formice",
					items	:	[
						{
							xtype		:	"textfieldice",
							label		:	"Código de agente",
							platformConfig: {
								desktop: {
									labelAlign: 'left'
								}
							}
						}, {
							xtype: 'button',
//							text	:	"Buscar",
							iconCls: 'x-fa fa-search',
							style:'margin-top: -47px !important;margin-left: 275px;',
							handler	:	"onBuscar"
						}
					]
				},
				{
					xtype		:	"gridice",
					style: 'margin: 10px 20px 0px 0px;',
					columns		:	[
						{
							text		:	'Cod. Age.',
							dataIndex	:	'cdagente'
						},
						{
							text		:	'Nombre',
							dataIndex	:	'dsnombre',
							flex		:	2
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
					}
				}
			];
			
			config.items=items.concat(config.items || []);

			config.buttons = [
				{
					text	:	"Elegir",
					iconCls: 'x-fa fa-check',
					handler	:	"onElegir"
				},{
					text	:	"Cancelar",
					iconCls: 'x-fa fa-close',
					ui:'gray',
					handler	:	function(){
						me.cerrar();
					}
				}
			].concat(config.buttons || []);
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