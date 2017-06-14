Ext.define('Ice.view.componente.Ventana', {
    extend: 'Ext.Container',
    xtype: 'ventana',
    
    mostrar: function () {
        Ice.query('#mainView').getReferences().mainCard.push(this);
    }
});