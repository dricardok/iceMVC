Ext.define('Ice.view.componente.VentanaIce', {
    extend: 'Ext.Panel',
    xtype: 'ventanaice',
    
    mostrar: function () {
        Ice.push(this);
    },
    
    cerrar:	function(){
    	Ice.pop();
    }
});