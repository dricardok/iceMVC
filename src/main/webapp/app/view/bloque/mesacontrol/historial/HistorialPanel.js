Ext.define("Ice.view.bloque.documentos.historial.HistorialPanel",{
	extend		:	"Ice.view.componente.PanelPaddingIce",
	xtype		:	"historialpanel",
	controller 	: 	"historialpanel",
	scrollable	:	true,
	requires: [
        
       // 'Ext.chart.CartesianChart'
    ],
    
    config		:	{
    	ntramite		:	null
    },
	
	constructor: function (config) {
		
		var me = this,paso="";
		try{
			if(!config.ntramite){
				throw 'No se recibio en ntramite para el bloque historial MC.';
			}
			var graficaEve={
					xtype		:	'cartesian',
					title		:	"Eventos",
					width		:	"100%",
					height		:	250,
					innerPadding: 	20,
			        store: {
			            type: 'eventosstore',
			            ntramite: config.ntramite
			        },
			        axes: [ {
                        type: 'time',
                        position: 'bottom',
                        fields: ['fecha'],
                        title: 'Eventos',
                        grid: true
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: ['cdusuari','dssisrol'],
                        title: 'Usuario',
                        grid: true,
                        renderer		:	function(ax,label,lay,last){
                        	return label;
                        }
                    }],
                    
                    series: {
                        type: 'line',
                        
                        xField: 'fecha',
                        yField: 'cdusuari',
                        marker: {
                            type: 'cross',
                            fx: {
                                duration: 200,
                                easing: 'backOut'
                            }
                        },
                        highlightCfg: {
                            scaling: 2
                        },
                        tooltip		:	{
                        	trackMouse		:	true,
                        	border: 0,
                            defaults: {
                                style: 'margin: 5px;'
                            },
//                            layout			:	{
//                            	type		:	'table',
//                            	columns		:	2
//                            },
                            renderer		:	'onRendererToolTip'
                        }
                    },
                    platformConfig: {
		        		desktop: {
		        			flex		:	1	
		        		}
		        	}
                    

					
			};
			
			config.items = [
				{
					xtype		:	"panelice",
					width		:	"100%",
					
					title		:	"Historial",
					
					platformConfig: {
						desktop: {
							layout		:	"hbox",
							width: '90%',
							height: '40%'
						}
					},
					items		:	[
						graficaEve,
						
					    {
							xtype		:	"turnadoschart",
							ntramite	:	config.ntramite,
							platformConfig: {
				        		desktop: {
				        			flex		:	1	
				        		},
				        		'!desktop'	:	{
				        			
				        		}
				        	}
							
					    }
					]
				},
				{
					xtype		:	'gridice',
					title		:	"Eventos",
					reference	:	'gridEventos',
					columns		:	[
						{
							text		:	"No.",	
							dataIndex	:	"nmordina"
						}
						,
						{
							text		:	"Usuario",	
							dataIndex	:	"dsusuari",
							flex		:	2
						}
						,
						{
							text		:	"Fecha inicio",	
							dataIndex	:	"fecha",
							flex		:	1.3,
							renderer	:	function(dat){
								return Ext.Date.format(new Date(dat),"d-m-Y H:i"); 
							}
						}
						,
						{
							text		:	"Estado",	
							dataIndex	:	"dsestadomc"
						},
						
					],
					actionColumns		:	[
						{
							xtype : 'actioncolumn',
							items : [
										{
											iconCls : 'x-fa fa-edit',
											tooltip : 'Modificar detalle',
											handler : function(grid,row,col){
												me.getController().modificarDetalle(grid,row,col)
											}
										}
									]
						}
					],
					store		:		 {
			            type: 'eventosstore',
			            ntramite: config.ntramite
			        }
				},
				{
					xtype		:	'gridice',
					title		:	"Turnados",
					columns		:	[
						{
							text		:	"Usuario",	
							dataIndex	:	"dsusuari",
							flex		:	3,
							renderer	:	function(a,rm,rc){
								var record ;
								if(Ice.classic()){
									record = rc;
									Ice.log("record: ",record)
									return record.get("cdusuari") + " - " + record.get("dsusuari");
								}else {
									return rm.data.cdusuari + ' - ' + rm.data.dsusuari;
								}
								
							}
						}
						,
						{
							text		:	"Inicio",	
							flex		:	1.5,
							dataIndex	:	"fefecha"
						}
						,
						{
							text		:	"Fin",	
							flex		:	1.5,
							dataIndex	:	"fefecha_fin",
							
						}
						,
						{
							text		:	"Tiempo",	
							dataIndex	:	"dsestatus",
							flex		:	2.5,
							renderer	:	function(dat,rm,record){
								var paso='Render tiempo grid turnados',
									fefin,feini ;
								try{
									if(Ice.classic()){
										fefin = record.get("fefecha_fin");
										feini = record.get("fefecha");
									}else{
										fefin = rm.get("fefecha_fin");
										feini = rm.get("fefecha");
									}
									var nfecha=(Number(
											Ext.Date.parse(fefin, "d/m/Y H:i").getTime()
									)-Number(
											Ext.Date.parse(feini, "d/m/Y H:i").getTime()
											));
							        var tSeg = Math.floor(Number(nfecha) / 1000),
								        tMin = Math.floor(tSeg / 60),
								        tHor = Math.floor(tMin / 60),
								        tDia = Math.floor(tHor / 24);
							        
							        return tDia+ ' día(s), ' + tHor%24 + ' hora(s), ' + tMin%60 +
							             ' minuto(s).';
								}catch(e){
									Ice.manejaExcepcion(e,paso);
								}
								
							}
						}
					],
					store		:		 {
			            type: 'turnadosstore',
			            ntramite: config.ntramite
			        }
				}
				
			];
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		 me.callParent(arguments);
	}
	
	
	
});