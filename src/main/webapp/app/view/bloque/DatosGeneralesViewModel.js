/**
 * Created by jtezva on 5/22/2017.
 */
Ext.define('Ice.view.bloque.DatosGeneralesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bloquedatosgenerales',
    
    data: {
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        status: null
    }
    
    /* se comenta la parte de validaciones por modelo con viewmodel, porque usaba incluso campos ocultos
    requires: [
        'Ext.data.validator.*'
    ],
    
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosGeneralesViewModel.constructor config:', config);
        var me = this,
            view = config.view,
            paso = 'Construyendo modelo de bloque de datos generales';
        try {
            me.callParent(arguments);
            
            me.setLinks({
                datos: {
                    type: view.modelo, // en el initComponente del view se crea
                    create: true
                }
            });
            
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    }
    */
});