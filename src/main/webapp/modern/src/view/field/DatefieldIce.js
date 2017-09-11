/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.DatefieldIce', {
    extend: 'Ext.field.DatePicker',
    xtype: 'datefieldice',
    
    picker :{
	            yearFrom:Ext.Date.add(new Date(),Ext.Date.YEAR,-5).getFullYear(),
	            yearTo:Ext.Date.add(new Date(),Ext.Date.YEAR,20).getFullYear()
	        },
    getValue: function () {
        var fecha = '',
            value = this.callParent();
        if (!Ext.isEmpty(value)) {
            fecha = Ext.Date.format(value, Ext.util.Format.dateFormat);
        }
        return fecha;
    },
    
    
    setValue: function (val) {
        if (val && typeof val === 'string') {
            try {
                val = Ext.Date.parse(val, Ext.util.Format.dateFormat);
            } catch (e) {
                Ice.logWarn('no se pudo convertir a fecha:', val);
            }
        }
        this.callParent([val]);
    },

    initialize: function () {
        Ice.log('Ice.view.field.DatefieldIce.initialize');
        var me = this,
            paso = 'Configurando comportamiento de campo de fecha';
        try {
            ///////////////////////////////////////////////////////
            me.callParent(arguments); /////////////////////////////
            ///////////////////////////////////////////////////////

            me.on({
                change: function (me, newDate) { // aqui no sirve usar blur por el picker
                    Ice.eventManager.change(me, me.getValue());
                }
            });
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
    constructor:function(config){
    	config.dateFormat = Ext.util.Format.dateFormat;
    	this.callParent(arguments);
    }
});