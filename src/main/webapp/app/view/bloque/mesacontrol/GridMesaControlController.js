Ext.define('Ice.view.bloque.mesacontrol.GridMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.gridmesacontrol',
	
	
	onItemClic : function (rec, record) {
		//Ext.Msg.alert('Recordset seleccionado');
		Ice.log(rec);
		Ice.log('Record ', record.data.NTRAMITE);
		
		var ventana = Ext.create('Ice.view.bloque.mesacontrol.VentanaMesaControl', {
			
			modal: true,
			
			
			platformConfig: {
		        '!desktop': {
		            
		        	scrollable: true
		        	
		        },
		        "desktop" : {
		        	width: 700
		        }
		    },
			
			items: [
				{
					xtype: 'formdetalletramite',
					reference: 'formdetalletramite',
					
					ntramite: record.data.NTRAMITE,
					dstipflu: record.data.DSTIPFLU,
					dsflujomc: record.data.DSFLUJOMC,
					cdramo: record.data.DSRAMO,
					cdunieco: record.data.DSUNIECO,
					estado: record.data.DESCRIPL,
					nmpoliza: record.data.NMPOLIZA,
					nmsuplem: record.data.NMSUPLEM,
					nmsolici: record.data.NMSOLICI,
					cdsucadm: record.data.CDSUCADM,
					cdsucdoc: record.data.CDSUCDOC,
					cdtiptra: record.data.CDTIPTRA,
					ferecepc: record.data.FERECEPC,
					cdagente: record.data.CDAGENTE,
					referencia: record.data.REFERENCIA,
					nombre: record.data.NOMBRE,
					fecstatu: record.data.FECSTATU,
					estatus: record.data.DSESTADOMC
				}
			],			
			
			buttons: [{
				text: 'Documentos',
				handler: function () {
					
					// TODO:
					Ext.Msg.alert('Aviso', 'Ver documentos');
				}
			}, {
				text: 'Historial',
				handler: function () {
					
					// TODO:
					
					Ext.Msg.alert('Aviso', 'Ver historial');
				}
			}]
		});
		
		if(Ice.classic()){
			ventana.mostrar();
		} else {
			Ice.push(ventana);
		}
		
	},
	
	onNuevoTramiteClic: function () {
		
		var ventana = Ext.create('Ice.view.componente.VentanaIce',  {
			
			title: 'Registrar nuevo tramite',
			width: 500,
			modal: true,
			//height: 300,			
			//layout: 'fit',
		
			items: [
				{
					xtype: 'formnuevotramite',
					reference: 'formnuevotramite'
				}
			],
			
			buttons: [
				{
					text: 'Continuar',
					handler: function(){
												
						var formulario = Ext.create('Ice.view.bloque.RegistroTramiteWindow', {
							
							modal: true,
							
							cdtipflu: Ice.query('formnuevotramite').getValues().cdtipflu,
							cdflujomc: Ice.query('formnuevotramite').getValues().cdflujomc 
						});
						ventana.cerrar();
						formulario.mostrar();
						
					}
				}, {
					text: 'Cancelar',
					handler:  function() {
						ventana.cerrar();
					}
				}
			]
		});
		
		if(Ice.classic()){
			ventana.mostrar();
		} else {
			Ice.push(ventana);
		}
	}
	
});