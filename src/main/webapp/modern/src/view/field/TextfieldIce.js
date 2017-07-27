/**
 * Created by jtezva on 5/10/2017.
 */
Ext.define('Ice.view.field.TextfieldIce', {
    extend: 'Ext.field.Text',
    xtype: 'textfieldice',

    initialize: function () {
        Ice.log('Ice.view.field.TextfieldIce.initialize');
        var me = this,
            paso = 'Configurando comportamiento de campo de texto';
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
