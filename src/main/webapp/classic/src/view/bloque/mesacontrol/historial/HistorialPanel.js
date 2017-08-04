Ext.define("Ice.view.bloque.documentos.historial.HistorialPanel",{
	extend		:	"Ext.Panel",
	xtype		:	"historialpanel",
	controller 	: 	"historialpanel",
	//scrollable	:	true,
	requires: [
        
       // 'Ext.chart.CartesianChart'
    ],
	
	constructor: function (config) {
		
		var me = this,paso="";
		try{
			
			var graficaEve={
					xtype		:	'cartesian',
					scrollable	:	true,
					
					width		:	"40%",
					height		:	250,
					innerPadding: 	20,
			        insetPadding: 	'50 40 10 10',
			        store: {
			            type: 'eventosstore'
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
                        fields: ['cdusuari','dssisrol_fin'],
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
                            layout			:	{
                            	type		:	'table',
                            	columns		:	2
                            },
                            renderer		:	'onRendererToolTip'
                        }
                    },
                    flex		:	1	

					
			};
			
			
			var graficaTur={
			        xtype: 'cartesian',
			        reference: 'chart',
			        width: '40%',
			        height: 250,
			        legend: {
			            docked: 'right'
			        },
			        store: {
			            type: 'turnadosstore'
			        },
			        insetPadding: 40,
			        flipXY: true,
			        sprites: [{
			            type: 'text',
			            text: 'Bar Charts - 100% Stacked Bars',
			            fontSize: 22,
			            width: 100,
			            height: 30,
			            x: 40, // the sprite x position
			            y: 20  // the sprite y position
			        }, {
			            type: 'text',
			            text: 'Data: Browser Stats 2012',
			            fontSize: 10,
			            x: 12,
			            y: 480
			        }, {
			            type: 'text',
			            text: 'Source: http://www.w3schools.com/',
			            fontSize: 10,
			            x: 12,
			            y: 495
			        }],
			        axes: [{
			            type: 'numeric',
			            fields: 'data1',
			            position: 'bottom',
			            grid: true,
			            minimum: 0,
			            maximum: 100,
			            majorTickSteps: 10,
			           // renderer: 'onAxisLabelRender'
			        }, {
			            type: 'category',
			            fields: 'month',
			            position: 'left',
			            grid: true
			        }],
			        series: [{
			            type: 'bar',
			            fullStack: true,
			            title: [ 'IE', 'Firefox', 'Chromeee', 'Safari', 'Others' ],
			            xField: 'month',
			            yField: [ 'data1', 'data2', 'data3', 'data4', 'other' ],
			            axis: 'bottom',
			            stacked: true,
			            style: {
			                opacity: 0.80
			            },
			            highlight: {
			                fillStyle: 'yellow'
			            },
			            tooltip: {
			                trackMouse: true,
			                //renderer: 'onSeriesTooltipRender'
			            }
			        }],
			        flex	:1
			    };
			///////////////////////////////////////////////////////////////////////
			
		
				
				//var store = Ext.create("Ice.store.bloque.mesacontrol.historial.TurnadosStore",{ntramite:config.ntramite,});
				var data=[];
				Ice.request({
					url		:	Ice.url.bloque.mesacontrol.historial.obtenerThmesacontrol,
					params	:	{
						'params.ntramite'		:	config.ntramite
					},
					async	:	false,
					success:function(datos){
						Ice.log("Data :",datos);
						data = datos.list;
					}
				});
				var fus={},i=0;
				Ice.log("data",data);
				data.forEach(function(it){
					fus["data"+i]=it;
					Ice.log("data..",it)
					
					i++;
				});
				var objStore={
						ntramite	:	config.ntramite
				};
				alert(config.ntramite)
				Ice.log("fus :",fus)
				
				for(var key in fus){
					Ice.log(" key  val",key , fus[key].fefecha,"--------",fus[key].fefecha_fin)
					objStore[key] = Number(
							Ext.Date.parse(fus[key].fefecha_fin, "d/m/Y H:i").getTime()
							)-Number(
									Ext.Date.parse(fus[key].fefecha, "d/m/Y H:i").getTime()
									);
				}
				Ice.log("objStore",objStore);
				
				var dataStore=[
					objStore
				];
				
				var dataTitle=[];
				
				for(var key in fus){
					dataTitle.push(fus[key].dsusuari);
				}
				
				var dataFeldX=[];
				
				for(var key in fus){
					dataFeldX.push(key);
				}
				Ice.log("dataFieldX : ",dataFeldX,"\n dataTitle : ",dataTitle);
			
			config.items = [
				{
					xtype		:	"panel",
					width		:	"100%",
					layout		:	"hbox",
					title		:	"Grafica",
					//scrollable	:	true,
					items		:	[
						graficaEve,
						{
					        xtype: 'cartesian',
					        reference: 'chart',
					        width: '40%',
					        height: 500,
					        legend: {
					            docked: 'right'
					        },
					        store: {
								fields		:	["ntramite"].concat(dataFeldX)	,
								data		:	dataStore
					        },
					        insetPadding: 40,
					        flipXY: true,
					        sprites: [{
					            type: 'text',
					            text: 'Bar Charts - 100% Stacked Bars',
					            fontSize: 22,
					            width: 100,
					            height: 30,
					            x: 40, // the sprite x position
					            y: 20  // the sprite y position
					        }, {
					            type: 'text',
					            text: 'Data: Browser Stats 2012',
					            fontSize: 10,
					            x: 12,
					            y: 480
					        }, {
					            type: 'text',
					            text: 'Source: http://www.w3schools.com/',
					            fontSize: 10,
					            x: 12,
					            y: 495
					        }],
					        axes: [{
					            type: 'numeric',
					            fields: dataFeldX[0],
					            position: 'bottom',
					            grid: true,
//					            minimum: 0,
//					            maximum: 100000000000,
//					            majorTickSteps: 10,
					           // renderer: 'onAxisLabelRender'
					        }, {
					            type: 'category',
					            fields: 'ntramite',
					            position: 'left',
					            grid: true
					        }],
					        series: [{
					            type: 'bar',
					            fullStack: true,
					            title: dataTitle,
					            xField: 'ntramite',
					            yField: dataFeldX,
					            axis: 'bottom',
					            stacked: true,
					            style: {
					                opacity: 0.80
					            },
					            highlight: {
					                fillStyle: 'yellow'
					            },
					            tooltip: {
					                trackMouse: true,
					                //renderer: 'onSeriesTooltipRender'
					            }
					        }]
					    }
					]
				},
				{
					xtype		:	'gridice',
					title		:	"Eventos",
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
							dataIndex	:	"dsestatus"
						}
					],
					store		:		 {
			            type: 'eventosstore'
			        }
				}
			];
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		 me.callParent(arguments);
	}
	
	
	
});