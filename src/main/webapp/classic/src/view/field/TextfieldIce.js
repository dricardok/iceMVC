/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.TextfieldIce', {
    extend: 'Ext.form.field.Text',
    xtype: 'textfieldice',
    
    labelAlign: 'top',
    msgTarget: 'under',
    fieldStyle: 'text-transform: uppercase;',
    config:{
    	sinMayusculas:false,
    },
    
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
        if(!me.getSinMayusculas())
	        me.on({
	            blur: function (me) {
	                me.setValue((me.getValue() || '').toUpperCase())
	                Ice.eventManager.change(me, me.getValue());
	            }
	        });
    }
});
