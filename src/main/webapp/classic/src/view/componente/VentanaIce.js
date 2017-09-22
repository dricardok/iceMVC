Ext.define('Ice.view.componente.VentanaIce', {
    extend: 'Ext.window.Window',
    xtype: 'ventanaice',

    // config ext
    buttonAlign: 'right',

    constructor: function (config) {
        Ice.log('Ice.view.componente.VentanaIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo ventana';
        try {
            Ice.agregarClases(config, ['ice-ventana', 'ice-ventana-classic']);
            Ice.convertirBotones(config.buttons);

            if (Ext.isEmpty(config.resizable)) {
                config.resizable = false;
            }

            if (Ext.isEmpty(config.maximizable)) {
                config.maximizable = true;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    mostrar: function () {
        this.show();
        return this;
    },
    
    cerrar:	function(){
    	this.close();
    }
});