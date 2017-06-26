Ext.define('Ice.view.componente.VentanaPanel', {
    extend: 'Ext.Panel',
    xtype: 'ventanapanel',
    
    mostrar: function () {
        Ice.query('#mainView').getReferences().mainCard.push(this);
    },
    
    cerrar:	function(){
    	Ice.query('#mainView').getReferences().mainCard.pop();
    }
});