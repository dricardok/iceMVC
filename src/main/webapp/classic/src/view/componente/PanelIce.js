Ext.define('Ice.view.componente.PanelIce', {
    extend: 'Ext.panel.Panel',
    xtype: 'panelice',
    
    // config ext
    layout: 'auto',
    cls: ['ice-container', 'ice-container-classic', 'ice-panel', 'ice-panel-classic'],
    defaults: {
        cls: ['ice-panel-item', 'ice-panel-item-classic']
    },
    referenceHolder: true // para que se pueda hacer getReferences()
});