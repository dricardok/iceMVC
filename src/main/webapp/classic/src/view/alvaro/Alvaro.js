/**
 * Created by jtezva on 5/5/2017.
 */
Ext.define('Ice.view.alvaro.Alvaro', {
    extend: 'Ext.form.Panel',
    xtype: 'alvaroCmp',
    
    requires: [
        'Ext.form.field.Date'
    ],
    
    controller: 'alvaro',
    
    cls: 'eck-cls',
    
    items: [{
        xtype: 'datefield',
        fieldLabel: 'Fecha de nacimiento',
        allowBlank: false
    }],
    
    buttons: [{
        text: 'Guardar',
        iconCls: 'x-fa fa-save',
        handler: 'onGuardarClic'
    }]
});