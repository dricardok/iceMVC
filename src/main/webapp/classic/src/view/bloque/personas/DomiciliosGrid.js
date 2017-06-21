Ext.define('Ice.view.bloque.personas.DomiciliosGrid', {
    
        extend  :       'Ext.grid.Panel',
        xtype   :       'domicilios',
        title   :       'Domicilios',
        config  :       {
            cdperson        :   null,
            selector        :   false,
            actionColumns   :   [],
            botones         :   [],
            
        },
        controller : 'domicilios',
        scrollable: true,
        constructor: function (config) {
            Ice.log('Ice.view.bloque.personas.DomiciliosGrid.constructor config:', config);
            var me = this,
                paso = 'Validando construcci\u00f3n de bloque de datos generales';
                try {
                    
                } catch (e) {
                    Ice.generaExcepcion(e, paso);
                }
            me.callParent(arguments);
        },
        initComponent: function () {
            Ice.log('Ice.view.bloque.personas.DomiciliosGrid.initComponent [this, args]:', this, arguments);
            var me = this,
                paso = 'Construyendo Domicilios';
            try {           
                var comps = Ice.generaComponentes({
                    pantalla: 'DOMICILIO',
                    seccion: 'GRID',
                    fields: true,
                    columns: true
                });
                Ice.log('Ice.view.bloque.personas.DomiciliosGrid.initComponent comps:', comps);
                var config = {
                    columns:    comps.DOMICILIO.GRID.columns.concat(me.getActionColumns()),
                    store:  {
                        fields: comps.DOMICILIO.GRID.fields,
                        autoLoad: true, //me.getSelector() === 'true' ? false : true,
                        proxy: {
                            type        : 'ajax',
                            url         : Ice.url.bloque.personas.obtenerDomicilios,
                            extraParams : {
                                'params.cdperson'   : me.getCdperson()
                                },
                            reader      : {
                                type : 'json',
                                rootProperty : 'listas',
                                successProperty : 'success',
                                messageProperty : 'message'
                            }
                        }
                    },
                    tbar:   me.getBotones()
                };
                if (me.getSelector() == true){
                    config.selModel = {
                        type: 'checkboxmodel',
                        mode: 'SINGLE',
                        showHeaderCheckbox: false,
                        allowDeselect: true
                    };
                }
                Ext.apply(me, config);
            } catch (e) {
                Ice.generaExcepcion(e, paso);
            }
            me.callParent(arguments);           
        }
        
});