Ext.define('Ice.view.alvaro.AlvaroController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.alvaro',
    
    guardar: function (params) {
        var me = this;
        alert('alvaro.guardar()');
        if (params && params.callback && typeof params.callback === 'function') {
            params.callback();
        }
    },
    
    onGuardarClic: function () {
        this.guardar();
    }
});