Ext.define('Ice.view.componente.Ventana', {
    extend: 'Ext.window.Window',
    xtype: 'ventana',
    
    
    mostrar: function () {
        this.show();
    },
    
    cerrar:	function(){
    	this.close();
    }
	
});