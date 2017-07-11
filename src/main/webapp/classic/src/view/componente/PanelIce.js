Ext.define('Ice.view.componente.PanelIce', {
    extend: 'Ext.panel.Panel',
    xtype: 'panelice',
    
    // config ext
    layout: 'auto',
    cls: ['ice-panel', 'ice-panel-classic'],
    defaults: {
        cls: ['ice-panel-item', 'ice-panel-item-classic']
    }
});