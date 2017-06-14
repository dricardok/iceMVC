Ext.define('Ice.view.ricardo.RicardoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ricardocontroller',
    
    enviarDatos : function(params) {
    	alert('Datos enviados!');
    	if(params && params.callback && typeof params.callback === 'function') {
    		params.callback();
    	}
    }
    
});