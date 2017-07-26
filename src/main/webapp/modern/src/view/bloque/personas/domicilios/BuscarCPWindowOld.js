Ext.define("Ice.view.bloque.personas.domicilios.BuscarCPWindow_",{
	
	extend		:	"Ice.view.componente.VentanaIce",
	controller	:	"buscarcpwindow",
	xtype		:	"buscarcpwindow_",
	scrollable	:	true,
	title		:	"Buscar Domicilio",
//	width		:	"60%",
//	height		:	"80%",
	defaults	:	{
		bodyPadding: 20
	},
	config		:	{
		record		:	{} 
	},
	
	constructor		:	function(config){
		var paso="",
			me=this;
		
		try{
			
			var comps = Ice.generaComponentes({
	               pantalla: 'AGREGAR_PERSONAS',
	               seccion: 'BUSCARCDPOS',
	               items: true
	           });
			
			config.items=[
				{
					xtype		:	'formice',
					scrollable	:	true,
					
//					defaults	:	{
//						bodyPadding: 10
//					},
					items		:	comps.AGREGAR_PERSONAS.BUSCARCDPOS.items,
					buttons		:	[
						{
					    	xtype	: 'button',
					    	text	: 'Buscar',
					    	handler : 'onBuscar'
				    	}
					]
				},
				{
					xtype		:	'gridice',
					title		:	"Resultados",
					width		:	'100%',
        			height		: 	300,
					columns		:	[
						{
							text		:	'CP',
							dataIndex	:	'cdcodpos'
						},
						{
							text		:	'Provincia',
							dataIndex	:	'dsprovin'
						},
						{
							text		:	'Ciudad',
							dataIndex	:	'dsciudad'
						},
						{
							text		:	'Municipio',
							dataIndex	:	'dsmunici'
						}
					],
					store		:	{
						
						fields	:["cdpostal",'otpoblac',"cdpais","descripl",'cdmunici','cdcodpos','cdprovin','dscodpos','dsprovin','dsciudad','cdciudad','dsmunici','tipoiva'],
						proxy	:{
							type 		:	'ajax',
							url			:	Ice.url.bloque.personas.buscaCP,
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
			
			config.buttons = [
				{
					xtype		:	'button',
					text		:	'Elegir',
					handler		:	'onElegir'
				}
		    	,
		    	{
			    	xtype	: 'button',
			    	text	: 'Cancelar',
			    	handler : 'onCancelar'
		    	}
		    ];
			Ice.log("buttons",config.buttons);
			if (config.buttons.length > 0) {
			    config.items.push({
		            xtype : 'toolbar',
		            docked: 'bottom',
		            items: config.buttons
		        });
			}
			
		}catch(e){
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
	}
	
});