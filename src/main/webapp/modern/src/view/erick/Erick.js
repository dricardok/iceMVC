/**
 * Created by DEORTIZT on 5/5/2017.
 */
Ext.define('Ice.view.erick.Erick', {
    extend:     'Ext.form.Panel',
    xtype:      'erickCmp',
    requires: [
//        'Ext.data.Store',
//        'Ext.grid.Panel',
        'Ext.Button'
    ],
    controller: 'erickCntlr',
    cls:        'eck-md',
    items:      [
//        {
//            xtype:   'Ext.data.Store',
//            storeId: 'gridStoreId',
//            fields:  ['name','email','phone']
//        },
//        {
//            xtype:   'Ext.grid.Panel',
//            title:   'Personas',
//            store:   Ext.data.StoreManager.lookup('gridStoreId'),
//            columns: [
//                {text: 'Nombre',   dataIndex: 'name'},
//                {text: 'Email',    dataIndex: 'email'},
//                {text: 'Telefono', dataIndex: 'phone'}
//            ],
//            height:   200,
//            witdh:    400
//        },
        {
            xtype:   'button',
            text:    'Guardar',
            handler: 'imprimeNombre'
        }
    ]
});