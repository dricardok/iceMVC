Ext.define('Ice.view.field.DisplayfieldComponent', {
    extend: 'Ext.Component',
    xtype: 'displayfieldcomponent',
    config: {
        cls: 'x-field-input'
    },
    getTemplate: function() {
        return [
            {
                reference: 'displayElement',
                tag: 'div',
                style: 'padding:10px'}
        ];
    }
});