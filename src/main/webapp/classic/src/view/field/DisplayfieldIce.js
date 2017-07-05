Ext.define('Ice.view.field.DisplayfieldIce', {
    extend: 'Ext.form.field.Display',
    xtype: 'displayfieldice',
    
    constructor	:	function(config){
    	if (config.label) {
            config.fieldLabel = config.label;
        }
    	this.callParent(arguments);
    }
});