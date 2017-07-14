/**
 * Created by DEORTIZT on 03/07/2017.
 */
Ext.define('Ice.view.field.FileFieldIce', {
    extend: 'Ext.form.field.File',
    xtype: 'filefieldice',
    
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