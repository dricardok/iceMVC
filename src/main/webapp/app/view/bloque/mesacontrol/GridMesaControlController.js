Ext.define('Ice.view.bloque.mesacontrol.GridMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.gridmesacontrol',
	
	
	onItemClic : function () {
		//Ext.Msg.alert('Recordset seleccionado');
		
		var ventana = Ext.create('Ice.view.bloque.mesacontrol.VentanaMesaControl', {
			
			modal: true,
			
			buttons: [{
				text: 'Documentos',
				handler: function () {
					Ext.Msg.alert('Aviso', 'Ver documentos');
				}
			}, {
				text: 'Historial',
				handler: function () {
					Ext.Msg.alert('Aviso', 'Ver historial');
				}
			}]
		});
		
		ventana.mostrar();
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
					xtype: 'formnuevotramite'
				}
			],
			
			buttons: [
				{
					text: 'Continuar',
					handler: function(){
						
					}
				}, {
					text: 'Cancelar',
					handler:  function() {
						ventana.cerrar();
					}
				}
			]
		});
		
		ventana.mostrar();
	}
	
});