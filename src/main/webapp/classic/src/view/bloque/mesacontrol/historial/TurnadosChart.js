Ext.define("Ice.view.bloque.documentos.historial.TurnadosChart",{
	extend		:	"Ext.chart.CartesianChart",
	xtype		:	"turnadoschart",
	//controller 	: 	"turnadoschart",
	
	config		:	{
		store	:	null
	},
	
	constructor	:	function(config){
		var paso="Turnados chart",me=this;
		try{
			
			//var store = Ext.create("Ice.store.bloque.mesacontrol.historial.TurnadosStore",{ntramite:config.ntramite,});
			
			var store =me.getStore();
			var data = store.getData() || [];
			var fus={},i=0;
			Ice.log("data",data.items)
			data.items.forEach(function(it){
				fus["data"+i]=it.data;
				alert();
				Ice.log("data..",it)
				
				i++;
			});
			var objStore={
					ntramite	:	config.ntramite
			};
			
			for(var key in fus){
				objStore[key] = Number(Ext.Date.parse(fus[key].fecha_fin, "d/m/Y H:i").getTime())-Number(Ext.Date.parse(fus[key].fecha_fin, "d/m/Y H:i").getTime());
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
			
			config.axes = [{
	            type: 'numeric',
	            fields: dataFeldX[0],
	            position: 'bottom',
	            grid: true,
	            minimum: 0,
	            maximum: 100,
	            majorTickSteps: 10,
	           // renderer: 'onAxisLabelRender'
	        }, {
	            type: 'category',
	            fields: 'ntramite',
	            position: 'left',
	            grid: true
	        }];
			
			config.series =  [{
	            type: 'bar',
	            fullStack: true,
	            title: dataTitle,
	            xField: dataFeldX,
	            yField: 'ntramite',
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
	        }];
			
			config.store={
					fields		:	dataFeldX.push("ntramite")	,
					data		:	dataStore
			};
			
			
			
				
				
			
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		me.callParent(config);
	},
	
	width: '40%',
    height: 250,
    legend: {
        docked: 'right'
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
});