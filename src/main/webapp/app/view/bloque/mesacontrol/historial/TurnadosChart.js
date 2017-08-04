Ext.define("Ice.view.bloque.documentos.historial.TurnadosChart",{
	xtype		:	"turnadoschart",
	extend		: 'Ice.view.componente.PanelIce',

    controller: 'turnadoschart',


    width: 650,
    
    constructor:function(config){
    	
    	var paso="Turnados chart",me=this;
		try{
			Ice.log("Entrada _:" ,config);
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
			Ice.log("fus :",fus)
			
			for(var key in fus){
				Ice.log(" key  val",key , fus[key].fefecha,"--------",fus[key].fefecha_fin)
				objStore[key] =1472768580000+ (Number(
						Ext.Date.parse(fus[key].fefecha_fin, "d/m/Y H:i").getTime()
						)-Number(
								Ext.Date.parse(fus[key].fefecha, "d/m/Y H:i").getTime()
								));
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
			
			config.items=[{
		        xtype: 'cartesian',
		        reference: 'chart',
		        width: '100%',
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
//		            minimum: objStore .data0,
//		            maximum: objStore .data1,
		           // majorTickSteps: ,
		            renderer: 'onAxisLabelXRender'
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
		    }];
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		Ice.log("Medio _:" ,config);
		me.callParent([config]);
		Ice.log("Sal _:" ,config);
    }

    

    
});