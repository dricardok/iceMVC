Ext.define("Ice.view.bloque.documentos.historial.HistorialPanel",{
	extend		:	"Ext.Panel",
	xtype		:	"historialpanel",
	controller 	: 	"historialpanel",
	scrollable	:	true,
	requires: [
        
       // 'Ext.chart.CartesianChart'
    ],
	
	constructor: function (config) {
		
		var me = this,paso="";
		try{
			
			var graficaEve={
					xtype		:	'cartesian',
					scrollable	:	true,
					
					width		:	300,
					height		:	300,
					//theme		:	"sky",
//					innerPadding: 	20,
//			        insetPadding: 	'50 40 10 10',
			        store: {
			            type: 'eventosstore'
			        },
			        axes: [ {
                        type: 'time',
                        fromDate: new Date('Dec 31 2015'),
                        toDate: new Date('Jan 5 2016'),
                        position: 'bottom',
                        fields: ['fechaini'],
                        title: 'Eventos',
                        grid: true
//                        ,
//                        label: {
//                            render: function(v) {
//                                debug('detalles chart bottomAxis renderer v:', v);
//                                return Ext.Date.format(new Date(v), 'd M H:i');
//                            }
//                        }
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: ['cdusuari_ini'],
                        title: 'Usuario',
                        grid: true
//                        ,
//                        label: {
//                            renderer: function (v) {
//                                return alturas[v] || '';
//                            }
//                        }
                    }]
//			        ,
//                    tips: {
//                        trackMouse: true,
//                        width: 500,
//                        height: 250,
//                        items: [
//                            {
//                                xtype: 'form',
//                                itemId: 'ventanaHistorialChartDetallesTipsForm',
//                                border: 0,
//                                defaults: {
//                                    style: 'margin: 5px;'
//                                },
//                                items: [
//                                    {
//                                        xtype: 'displayfield',
//                                        fieldLabel: 'Fecha',
//                                        name: 'FECHAINI'
//                                    }, {
//                                        xtype: 'displayfield',
//                                        fieldLabel: 'Usuario',
//                                        name: 'DSUSUARI_INI'
//                                    }, {
//                                        xtype: 'displayfield',
//                                        fieldLabel: 'Rol',
//                                        name: 'DSSISROL_INI'
//                                    }, {
//                                        xtype: 'displayfield',
//                                        fieldLabel: 'Comentarios',
//                                        name: 'COMMENTS'
//                                    }
//                                ]
//                            }
//                        ]
////			        ,
////                        renderer: function (klass, item) {
////                            debug('ventanaHistorialChartDetallesTipsForm renderer args:', arguments);
////                            var recordRaw = item.storeItem.raw;
////                            if (me.cdsisrol === 'EJECUTIVOCUENTA' && recordRaw.SWAGENTE !== 'S') {
////                                recordRaw.COMMENTS = '';
////                            }
////                            _fieldById('ventanaHistorialChartDetallesTipsForm').getForm().loadRecord({
////                                getData : function () {
////                                    return recordRaw;
////                                }
////                            });
////                            this.setTitle('Tr\u00e1mite ' + me.ntramite + ' movimiento ' + recordRaw.NMORDINA);
////                        }
//                    }
					
			};
			config.items = [
				{
					xtype		:	"panel",
					layaut		:	"hbox",
					title		:	"Grafica",
					scrollable	:	true,
					items		:	[
						Ext.create({
							   xtype: 'cartesian',
							   renderTo: document.body,
							   width: 600,
							   scrollable:true,
							   height: 400,
							   store: {
							       fields: ['name', 'data1', 'data2', 'data3'],
							       data: [{
							           'name': 1,
							           'data1': 10,
							           'data2': 12,
							           'data3': 14
							       }, {
							           'name': 2,
							           'data1': 7,
							           'data2': 8,
							           'data3': 16
							       }, {
							           'name': 3,
							           'data1': 5,
							           'data2': 2,
							           'data3': 14
							       }, {
							           'name': 4,
							           'data1': 2,
							           'data2': 14,
							           'data3': 6
							       }, {
							           'name': 5,
							           'data1': 27,
							           'data2': 38,
							           'data3': 36
							       }]
							   },
							   axes: {
							       type: 'numeric',
							       position: 'left',
							       minimum: 0,
							       fields: ['data1', 'data2', 'data3'],
							       title: 'Sample Values',
							       grid: {
							           odd: {
							               opacity: 1,
							               fill: '#F2F2F2',
							               stroke: '#DDD',
							               'lineWidth': 1
							           }
							       }
							   },
							   series: {
							       type: 'area',
							       subStyle: {
							           fill: ['#0A3F50', '#30BDA7', '#96D4C6']
							       },
							       xField: 'name',
							       yField: ['data1', 'data2', 'data3']
							   }
							})
					]
				}
			];
		}catch(e){
			Ice.manejaExcepcion(e,paso);
		}
		 me.callParent(arguments);
	}
	
	
	
});