Ext.define('Ice.view.bloque.mesacontrol.GridMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.gridmesacontrol',
	
	
	onItemClic : function () {
		Ext.Msg.alert('Recordset seleccionado');
	}
	
});