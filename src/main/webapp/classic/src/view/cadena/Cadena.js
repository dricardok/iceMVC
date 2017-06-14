/**
 * Created by jtezva on 5/5/2017.
 */
Ext.define('Ice.view.cadena.Cadena', {
    extend: 'Ext.panel.Panel',
    xtype: 'cadenaCmp',
    
    controller: 'cadena',
    
    title: 'Cadena',
    
    items: [
        {
            xtype: 'erickCmp',
            reference: 'erick',
            title: 'Componente de Erick'
        }, {
            xtype: 'cesarCmp',
            reference: 'cesar',
            title: 'Componente de Cesar'
        }, {
            xtype: 'ricardoCmp',
            reference: 'ricardo',
            title: 'Componente de Ricardo'
        }, {
            xtype: 'alvaroCmp',
            reference: 'alvaro',
            title: 'Componente de Alvaro'
        }
    ],
    
    buttons: [{
        text: 'Encadenar',
        iconCls: 'x-fa fa-save',
        handler: 'onEncadenarClic'
    }]
});