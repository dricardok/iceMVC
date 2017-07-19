Ext.define('Ice.view.componente.FormIce', {
    extend: 'Ext.form.Panel',
    xtype: 'formice',
    
    // config ext
    // bodyPadding: '20 0 0 20',
    maxHeight: Ice.constantes.componente.form.altura.classic,
    scrollable: true,
    referenceHolder: true, // para que se pueda hacer getReferences()
    
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
            Ice.agregarClases(config, ['ice-container', 'ice-container-classic',
                'ice-panel', 'ice-panel-classic', 'ice-form', 'ice-form-classic']);

            if ((config.items || []).length > 0) {
                Ice.agregarClases(config.items, ['ice-form-item', 'ice-form-item-classic']);
                // Ice.agregarEstilo(config.items, 'margin: 0px 20px 20px 0px;');
            }

            // botones de barra superior
            config.tbar = [
                '->',
                {
                    iconCls: 'x-fa fa-eye',
                    //style: 'margin: 0 82px 0 0;',
                    tooltip: 'Mostrar/ocultar',
                    hidden: Ice.sesion.cdsisrol === Ice.constantes.roles.AGENTE || config.sinToggle === true,
                    handler: function (me) {
                        Ice.toggleOcultos(me.up('form'));
                    }
                }
            ].concat(config.tbar || []);

            // cuando solo tenemos las opciones tbar default y somos agente, mejor las quitamos
            if (config.tbar.length === 2 && (Ice.sesion.cdsisrol === Ice.constantes.roles.AGENTE
                || config.sinToggle === true)) {
                config.tbar = null;
                delete config.tbar;
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },

    add: function () {
        Ice.log('Ice.view.componente.FormIce.add args:', arguments);
        var me = this,
            paso = 'Agregando componentes al formulario';
        try {
            if (arguments.length > 0) {
                Ice.agregarClases(arguments, ['ice-form-item', 'ice-form-item-classic']);
                // Ice.agregarEstilo(arguments, 'margin: 0px 20px 20px 0px;');
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});