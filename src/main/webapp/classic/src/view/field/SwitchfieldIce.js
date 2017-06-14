/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.SwitchfieldIce', {
    extend: 'Ext.form.field.Checkbox',
    xtype: 'switchice',
    
    labelAlign: 'top',
    msgTarget: 'under',
    
    initComponent: function () {
        var me = this,
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        
        configTra.inputValue = 'S';
        configTra.uncheckedValue = 'N';
        
        // label -> boxLabel
        if (configIce.label) {
            configTra.boxLabel = configIce.label;
        }
        
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
    }
});