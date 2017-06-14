/**
 * 
 */
Ext.define('Ice.view.ricardo.RicardoView', {
	
	extend: 'Ext.form.Panel',
	xtype: 'ricardoCmp',
	
	requires: [
	   'Ext.field.Text',
	   'Ext.field.DatePicker',
	   'Ext.Toolbar',
	   'Ext.Button'
	],
	
	controller: 'ricardocontroller',
	//viewModel: 'ricardocontroller',
	
	itemId : 'ricardoForm',
	
	items: [{
		xtype: 'textfield',
		name: 'nombre'
	},{
		xtype: 'datepickerfield',
		name: 'fechaNac'
	},{
		xtype: 'toolbar',
		docked: 'bottom',
		items: [{
			text: 'Cotizar',
			handler: 'enviarDatos'
		}]
	}]
	
	
 	
});