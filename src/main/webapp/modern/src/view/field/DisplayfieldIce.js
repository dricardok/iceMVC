Ext.define('Ice.view.field.DisplayfieldIce', {
	
	extend: 'Ext.field.Field',
    xtype: 'displayfieldice',
    config: {
        component: {
            xtype: 'displayfieldcomponent'
        }
    },
    setValue: function(value) {
        this.getComponent().displayElement.setHtml(value);
        return this;
    },
    
    constructor : function(config) {
    	if (config.label) {
            config.fieldLabel = config.label;
        }
    	this.callParent(arguments);
    }
});