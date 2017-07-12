Ext.define('Ice.view.componente.FormDosColumnasIce', {
    extend: 'Ice.view.componente.FormIce',
    xtype: 'formdoscolumnasice',
    
    // plugin para poder usar el layout responsivo
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    
    // config ext
    layout: 'responsivecolumn',
    bodyPadding: '0 0 0 80',
    defaults: {
        cls: ['big-50', 'small-100', 'ice-form-item', 'ice-form-item-classic']
    }
});