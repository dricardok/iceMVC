Ext.define('Ice.view.componente.VentanaIce', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'ventanaice',

    constructor: function (config) {
        Ice.log('Ice.view.componente.VentanaIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana';
        try {
            Ice.agregarClases(config, ['ice-ventana', 'ice-ventana-classic']);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    mostrar: function () {
        Ice.push(this);
        return this;
    },
    
    cerrar:	function(){
    	Ice.pop();
    }
});