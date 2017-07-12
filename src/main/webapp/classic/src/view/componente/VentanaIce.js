Ext.define('Ice.view.componente.VentanaIce', {
    extend: 'Ext.window.Window',
    xtype: 'ventanaice',
    
    mostrar: function () {
        this.show();
    },
    
    cerrar:	function(){
    	this.close();
    }
});