Ext.define('Ice.view.componente.PanelPaddingIce', {
    extend: 'Ice.view.componente.PanelIce',
    xtype: 'panelpaddingice',
    
    // config ext
    bodyPadding: '40 0 0 40',
    defaults: {
        style: 'margin: 0px 40px 40px 0px;',
        cls: ['ice-panel-item', 'ice-panel-item-classic', 'shadow']
    }
});