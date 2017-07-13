Ext.define('Ice.view.componente.VentanaIce', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'ventanaice',
    
    mostrar: function () {
        Ice.push(this);
    },
    
    cerrar:	function(){
    	Ice.pop();
    }
});