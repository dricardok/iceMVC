Ext.define("Ice.view.bloque.personas.domicilios.BuscarCPWindow",{
	
	extend		:	"Ice.view.componente.VentanaIce",
	controller	:	"buscarcpwindow",
	xtype		:	"buscarcpwindow",
	scrollable	:	'y',
	//modal		:	true,
	width		:	"90%",
	height		:	"80%",
	title		:	"Buscar Domicilio",
	style:'padding:20px 0px 0px 0px;',
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
					    	style:'margin-right: 40px;',
					    	iconCls : 'x-fa fa-search',
					    	handler : 'onBuscar'
				    	}
					]
				},
				{
					xtype		:	'panelpaddingice',
					maxHeight	:	300,
					items		:	[
						{
							xtype		:	'gridice',
							title		:	"Resultados",
							scrollable	:	'y',
							botones		:	[],
							columns		:	[
								{
									text		:	'CP',
									dataIndex	:	'cdcodpos',
									flex		:	2
								},
								{
									text		:	'Provincia',
									dataIndex	:	'dsprovin',
									flex		:	2
								},
								{
									text		:	'Ciudad',
									dataIndex	:	'dsciudad',
									flex		:	2
								},
								{
									text		:	'Municipio',
									dataIndex	:	'dsmunici',
									flex		:	2
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
		    	ui:'gray',
		    	style:'margin-right: 40px;',
		    	iconCls : 'x-fa fa-close',
		    	handler : 'onCancelar'
	    	}
	    ]
	
});