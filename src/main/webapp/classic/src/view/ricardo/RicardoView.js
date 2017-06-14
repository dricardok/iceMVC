/**
 * 
 */
Ext.define('Ice.view.ricardo.RicardoView', {
	
	extend: 'Ext.form.Panel',
	xtype: 'ricardoCmp',
	
	requires: [
	   'Ext.form.field.Text',
	   'Ext.form.field.Date',
	   'Ext.button.Button'
	],
	
	controller: 'ricardocontroller',
	//viewModel: 'ricardocontroller',
	
	itemId : 'ricardoForm',
	
	items: [{
		xtype: 'textfield',
		name: 'nombre'
	},{
		xtype: 'datefield',
		name: 'fechaNac'
	}],
	
	buttons: [{
		text: 'Enviar',
		handler: 'enviarDatos'
	}]
 	
});