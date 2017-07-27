/**
 * Created by jtezva on 6/5/2017.
 */
Ext.define('Ice.view.bloque.DatosGenerales', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'bloquedatosgenerales',
    
    controller: 'bloquedatosgenerales',

    // configuracion del componente (no EXT)
    config: {
        // datos para ubicar uso del componente
        modulo: null,
        flujo: null,
        cdtipsit: null,
        auxkey: null,
        
        // llave de BD
        cdunieco: null,
        cdramo: null,
        estado: null,
        nmpoliza: null,
        nmsuplem: null,
        status: null,
        
        // variables para valores por defecto (fijos y variables)
        procesandoValoresDefecto: false,
        datosFijosNuevos: true,
        datosVariablesNuevos: true,
        camposDisparanValoresDefectoFijos: [
            'cdunieco'
        ],
        camposDisparanValoresDefectoVariables: [
            'nmpoliza', 'b1_feefecto', 'b1_feproren'
        ],
        
        // otro
        swcolind: 'I',

        // perfilamiento
        cdptovta: null,
        cdgrupo: null,
        cdsubgpo: null,
        cdperfil: null
    },
    
    // validacion de parametros de entrada
    constructor: function (config) {
        Ice.log('Ice.view.bloque.DatosGenerales.constructor config:', config);
        var me = this,
            paso = 'Construyendo bloque de datos generales';
        try {
            if (!config || !config.cdramo || !config.cdtipsit || !config.modulo) {
                throw 'Faltan par\u00e1metros para construir bloque de datos generales';
            }
            
            config.estado = config.estado || 'W';
            config.nmsuplem = config.nmsuplem || 0;
            config.status = config.status || 'V';
            
            config.flujo = config.flujo || {};

            // generar componentes
            var comps = Ice.generaComponentes({
                pantalla: 'BLOQUE_DATOS_GENERALES',
                seccion: 'FORMULARIO',
                modulo: config.modulo || '',
                estatus: (config.flujo && config.flujo.estatus) || '',
                cdramo: config.cdramo || '',
                cdtipsit: config.cdtipsit ||'',
                auxkey: config.auxkey || '',
                
                items: true,
                fields: true,
                validators: true
            });
            
            // agregar items, y agregar modelo para el modelValidation
            config.items = comps.BLOQUE_DATOS_GENERALES.FORMULARIO.items.concat(config.items || []);
            config.modelFields = comps.BLOQUE_DATOS_GENERALES.FORMULARIO.fields;
            config.modelValidators = comps.BLOQUE_DATOS_GENERALES.FORMULARIO.validators;
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});