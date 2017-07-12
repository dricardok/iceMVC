Ext.define('Ice.view.componente.FormTresColumnasIce', {
    extend: 'Ice.view.componente.FormIce',
    xtype: 'formtrescolumnasice',
    
    // plugin para poder usar el layout responsivo
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    
    // config ext
    layout: 'responsivecolumn',
    bodyPadding: '0 0 0 80',
    defaults: {
        cls: ['big-33', 'small-100', 'ice-form-item', 'ice-form-item-classic']
    }
});