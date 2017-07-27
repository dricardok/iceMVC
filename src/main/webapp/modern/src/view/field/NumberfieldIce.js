/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.NumberfieldIce', {
    extend: 'Ext.field.Number',
    xtype: 'numberfieldice',

    initialize: function () {
        Ice.log('Ice.view.field.NumberfieldIce.initialize');
        var me = this,
            paso = 'Configurando comportamiento de campo numerico';
        try {
            ///////////////////////////////////////////////////////
            me.callParent(arguments); /////////////////////////////
            ///////////////////////////////////////////////////////
            me.on({
                blur: function (me) {
                    Ice.eventManager.change(me, me.getValue());
                }
            });
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
});