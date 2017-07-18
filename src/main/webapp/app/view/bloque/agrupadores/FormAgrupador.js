Ext.define('Ice.view.bloque.agrupadores.FormAgrupador', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'formagrupador',
    
    controller: 'formagrupador',
    
    // config ext
    title: 'Subagrupador',
    
    // configuracion no ext
    config: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        cdagrupa: null,
        nmsuplem: null,
        status: null,
        nmsuplemEnd: null,
        
        modulo: null,
        flujo: null,
        auxkey: null,
        
        modelFields: [],
        modelValidators: []
    },
    
    guardar: function () {
        this.fireEvent('guardar', this);
    },
    
    constructor: function (config) {
        Ice.log('formagrupador.constructor config:', config);
        var me = this,
            paso = 'Construyendo formulario de agrupador';
        try {
            if (!config ||
                !config.cdunieco ||
                !config.cdramo ||
                !config.estado ||
                !config.nmpoliza ||
                !config.cdagrupa) {
                throw 'Faltan datos para construir formulario de agrupadores';
            }
            
            config.nmsuplem    = config.nmsuplem || 0;
            config.status      = config.status || 'V';
            config.nmsuplemEnd = config.nmsuplemEnd || 0;
            config.modulo      = config.modulo || 'EMISION';
            config.flujo       = config.flujo || {},
            config.auxkey      = config.auxkey || '';
            
            var comps = Ice.generaComponentes({
                pantalla: 'FORM_AGRUPADOR',
                seccion: 'FORM',
                modulo: config.modulo,
                estatus: config.flujo.estatus || '',
                cdramo: config.cdramo,
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });
            
            config.items = (comps.FORM_AGRUPADOR.FORM.items || []).concat(config.items || []);
            config.modelFields = comps.FORM_AGRUPADOR.FORM.fields || [];
            config.modelValidators = comps.FORM_AGRUPADOR.FORM.validators || [];

            config.buttons = [
                {
                    text: 'Guardar',
                    iconCls: 'x-fa fa-save',
                    handler: 'onGuardarClic'
                }, {
                    text: 'Cancelar',
                    iconCls: 'x-fa fa-remove',
                    handler: 'onCancelarClic'
                }
            ].concat(config.buttons || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});