/**
 * Created by jtezva on 5/5/2017.
 */
Ext.define('Ice.view.alvaro.Alvaro', {
    extend: 'Ext.form.Panel',
    xtype: 'alvaroCmp',
    
    requires: [
        'Ext.field.DatePicker'
    ],
    
    controller: 'alvaro',
    
    cls: 'eck-md',
    
    items: [
        {
            xtype: 'datepickerfield',
            label: 'Fecha de nacimiento',
            allowBlank: false
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                text: 'Guardar',
                iconCls: 'x-fa fa-save',
                handler: 'onGuardarClic'
            }]
        }
    ]
});