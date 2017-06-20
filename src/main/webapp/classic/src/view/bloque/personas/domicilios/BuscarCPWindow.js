Ext.define("Ice.view.bloque.personas.domicilios.BuscarCPWindow",{
	
	extend		:	"Ice.view.componente.Ventana",
	controller	:	"buscarcpwindow",
	autoScroll	:	true,
	layout		:   "anchor",
	title		:	"Buscar Domicilio",
	width		:	"60%",
	height		:	"80%",
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
			
			me.items=[
				{
					xtype		:	'formulario',
					scrollable	:	true,
					layout		:	{
						type		:	'table',
						columns		:	2
					},
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
				handler		:	'onElegir'
			}
	    	,
	    	{
		    	xtype	: 'button',
		    	text	: 'Cancelar',
		    	handler : 'onCancelar'
	    	}
	    ]
	
});