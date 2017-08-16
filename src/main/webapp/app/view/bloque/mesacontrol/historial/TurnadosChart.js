Ext.define("Ice.view.bloque.documentos.historial.TurnadosChart",{
	xtype		:	"turnadoschart",
	extend		: 'Ice.view.componente.PanelIce',

    controller: 'turnadoschart',


    
    
    config	:	{
    	
    	inicio	:	null,
		fin		:	null
    },
    
    constructor:function(config){
    	
    	var paso="Turnados chart",me=this;
		try{
			if(!config.ntramite){
				throw 'No se recibio ntramite 2';
			}
			var data=[];
			Ice.request({
				url		:	Ice.url.bloque.mesacontrol.historial.obtenerThmesacontrol,
				params	:	{
					'params.ntramite'		:	config.ntramite
				},
				async	:	false,
				success:function(datos){
					data = datos.list;
				}
			});
			var fus={},i=0;
			Ice.log("data",data);
			if(data && data.length<=0){
				throw 'No hay datos de turnados.';
			}
			data.forEach(function(it){
				fus["data"+i]=it;
				i++;
			});
			
			config.inicio = Ext.Date.parse(fus["data0"].fefecha, "d/m/Y H:i").getTime();
			if(Ext.isEmpty(fus["data"+(i-1)].fefecha_fin)){
				fus["data"+(i-1)].fefecha_fin=Ext.Date.format(new Date(),"d/m/Y H:i")
				config.fin    = (new Date()).getTime();
			}else{
				config.fin    = Ext.Date.parse(fus["data"+(i-1)].fefecha_fin, "d/m/Y H:i").getTime();
			}
			var objStore={
					ntramite	:	config.ntramite
			};
			Ice.log("fus :",fus)
			
			for(var key in fus){
				objStore[key] = (
									Number(
											Ext.Date.parse(fus[key].fefecha_fin, "d/m/Y H:i").getTime()
									)-Number(
											Ext.Date.parse(fus[key].fefecha, "d/m/Y H:i").getTime()
									)
								);
			}
			
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
			
			config.items=[{
		        xtype: 'cartesian',
		        reference: 'chart',
		        title		:	"Turnados",
		        width: '100%',
		        height:	300,
		        
		        legend: {
		        	platformConfig: {
		        		desktop: {
		        			docked: 'right'
		        		},
		        		'!desktop'	:	{
		        			docked: 'top',
				            width: '80%',
				            heigth:'80%'
		        		}
		        	}
		        },
		        store: {
					fields		:	["ntramite"].concat(dataFeldX)	,
					data		:	dataStore
		        },
		        insetPadding: 40,
		        flipXY: true,
		        axes: [{
		            type: 'numeric',
		            fields: dataFeldX[0],
		            position: 'bottom',
		            grid: true,
		            label: {
		                rotate: {
		                    degrees: -45
		                }
		            },
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
		                renderer: 'onSeriesTooltipRender'
		            }
		        }]
		    }];
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		me.callParent([config]);
    }

    

    
});