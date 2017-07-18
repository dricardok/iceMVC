Ext.define('Ice.view.componente.ContainerIce', {
    extend: 'Ext.panel.Panel', // extiende de panel para poder tener buttons
    xtype: 'containerice',
    
    // config ext
    referenceHolder: true, // para que se pueda hacer getReferences()

    constructor: function (config) {
        Ice.log('Ice.view.componente.ContainerIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo contenedor';
        try {
            Ice.agregarClases(config, ['ice-container', 'ice-container-classic']);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});