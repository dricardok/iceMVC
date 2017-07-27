Ext.define("Ice.view.bloque.personas.domicilios.BuscarCPWindow",{
	
	extend		:	"Ice.view.componente.VentanaIce",
	controller	:	"buscarcpwindow",
	xtype		:	"buscarcpwindow",
	scrollable	:	true,
	//modal		:	true,
	width		:	"90%",
	height		:	"80%",
	title		:	"Buscar Domicilio",
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
					xtype		:	'formtrescolumnasice',
					scrollable	:	true,
					maxHeight	:	200,
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
					xtype		:	'panelice',
					scrollable	:	true,
					maxHeight	:	150,
					items		:	[
						{
							xtype		:	'gridice',
							title		:	"Resultados",
							scrollable	:	true,
							botones		:	[],
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
					]
				}
			];
			
		}catch(e){
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
	},
	buttons		:	[
			{
				xtype		:	'button',
				text		:	'Elegir',
				iconCls 	: 	'x-fa fa-check',
				handler		:	'onElegir' 
			}
	    	,
	    	{
		    	xtype	: 'button',
		    	text	: 'Cancelar',
		    	iconCls : 'x-fa fa-close',
		    	handler : 'onCancelar'
	    	}
	    ]
	
});