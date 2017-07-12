Ext.define('Ice.view.componente.FormIce', {
    extend: 'Ext.form.Panel',
    xtype: 'formice',
    
    // config ext
    bodyPadding: '20 0 0 20',
    maxHeight: Ice.constantes.componente.form.altura.classic,
    scrollable: true,
    cls: ['ice-container', 'ice-container-classic', 'ice-panel', 'ice-panel-classic', 'ice-form', 'ice-form-classic'],
    defaults: {
        cls: ['ice-form-item', 'ice-form-item-classic'],
        style: 'margin: 0px 20px 20px 0px;'
    },
    
    // config no ext
    config: {
        // para validar datos con un modelo
        modelFields: [],
        modelValidators: []
    },

    constructor: function (config) {
        Ice.log('Ice.view.componente.FormIce.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario';
        try {
            // botones de barra superior
            config.tbar = [
                '->',
                {
                    iconCls: 'x-fa fa-eye',
                    //style: 'margin: 0 82px 0 0;',
                    tooltip: 'Mostrar/ocultar',
                    hidden:Ice.sesion.cdsisrol==Ice.constantes.roles.AGENTE,
                    handler: function (me) {
                        Ice.toggleOcultos(me.up('form'));
                    }
                }
            ].concat(config.tbar || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});