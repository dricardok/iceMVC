Ext.define('Ice.view.bloque.personas.DomiciliosGrid', {
    extend  :       'Ice.view.componente.GridIce',
    xtype   :       'domicilios',

    controller : 'domicilios',
    
    // config ext
    title   :       'Domicilios',

    // config no ext
    config  :       {
        cdperson        :   null,
        selector        :   false,
        agregarDomicilio:	false
        
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.personas.DomiciliosGrid.constructor config:', config);
        var me = this,
            paso = 'Construyendo grid de domicilios';
        try {
            config = config || {};

            if (config.selector === true) {
                config.selModel = {
                    type: 'checkboxmodel',
                    mode: 'SINGLE',
                    showHeaderCheckbox: false,
                    allowDeselect: true
                };
            }

            var comps = Ice.generaComponentes({
                pantalla: 'DOMICILIO',
                seccion: 'GRID',
                fields: true,
                columns: true
            });

            config.columns = (comps.DOMICILIO.GRID.columns || []).concat(config.columns || []);

            config.store = {
                fields: comps.DOMICILIO.GRID.fields || [],
                autoLoad: true, //me.getSelector() === 'true' ? false : true,
                proxy: {
                    type        : 'ajax',
                    url         : Ice.url.bloque.personas.obtenerDomicilio,
                    extraParams : {
                        'params.cdperson'   : config.cdperson
                    },
                    reader      : {
                        type : 'json',
                        rootProperty : 'listas',
                        successProperty : 'success',
                        messageProperty : 'message'
                    }
                }
            };
            if(config.agregarDomicilio){
            	config.buttons = [{
    				xtype		:	'button',
                    iconCls		:	'x-fa fa-plus-circle',
    				text		:	'Agregar Domicilio',
    				handler		:	'agregarDomicilio'
    			}];
            }
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    },
    
    getDomicilioSel : function(){
    	this.getController().getDomicilioSel();
    }
});