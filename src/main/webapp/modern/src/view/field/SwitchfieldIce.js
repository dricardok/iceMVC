/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.SwitchfieldIce', {
    extend: 'Ext.field.Checkbox',
    xtype: 'switchice',
    
    initialize: function () {
        var me = this,
            configIce = me.config, // la configuracion recibida de TCONFSCR
            configTra = {};        // la transformacion en atributos ext (ejemplo: label se pasa a fieldLabel en toolkit classic)
        
        configTra.value = 'S';
        
        /*
        // label -> boxLabel
        if (configIce.label) {
            configTra.boxLabel = configIce.label;
        }
        */
        
        
        Ext.apply(me, configTra);
        this.callParent(arguments);
    }
});