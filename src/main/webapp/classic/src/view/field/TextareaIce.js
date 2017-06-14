/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.TextareaIce', {
    extend: 'Ext.form.field.TextArea',
    xtype: 'textareaice',
    
    labelAlign: 'top',
    msgTarget: 'under',
    
    initComponent: function () {
        var me = this,
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        
        
        // label -> fieldLabel
        if (configIce.label) {
            configTra.fieldLabel = configIce.label;
        }
        
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
    }
});