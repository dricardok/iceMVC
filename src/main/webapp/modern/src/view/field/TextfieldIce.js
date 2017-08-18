/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.TextfieldIce', {
    extend: 'Ext.field.Text',
    xtype: 'textfieldice',
    config:{
    	sinMayusculas:false,
    },

    initialize: function () {
        Ice.log('Ice.view.field.TextfieldIce.initialize');
        var me = this,
            paso = 'Configurando comportamiento de campo de texto';
        try {
            ///////////////////////////////////////////////////////
            me.callParent(arguments); /////////////////////////////
            ///////////////////////////////////////////////////////
            
            try {
                me.el.dom.getElementsByTagName('input')[0].style['text-transform'] = 'uppercase';
            } catch (e) {
                Ice.logWarn('Warning al intentar hacer uppercase de textfieldice modern');
            }
            
            if(!me.getSinMayusculas())
	            me.on({
	                blur: function (me) {
	                    me.setValue((me.getValue() || '').toUpperCase());
	                    Ice.eventManager.change(me, me.getValue());
	                }
	            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});
