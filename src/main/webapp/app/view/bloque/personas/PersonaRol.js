Ext.define('Ice.view.bloque.personas.PersonaRol', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'cdpersoncdrol',

    // config ext
    title: 'Buscar personas',

    // config no ext
    config: {
        cdramo: null,
        cdrol: null,
        mostrarRol: true
    },

    constructor: function (config) {
        Ice.log('Ice.view.bloque.PersonaRol.constructor config:', config);
        var me = this,
            paso = 'Validando construcci\u00f3n de busqueda de persona';
        try {
            if (!config) {
                throw 'No hay datos para lista de personas';
            }
            
            if (!config.cdramo) {
                throw 'Falta ramo para persona por rol';
            }

            var comps = Ice.generaComponentes({
                pantalla: 'PERSONA_ROL',
                seccion: 'FORMULARIO',
                cdramo: config.cdramo,
                items: true
            });
            
            try{
            	var cdperson=comps.PERSONA_ROL.FORMULARIO.items.find(function(it){
            		return it.name=='cdperson';
            	});
            	cdperson.cdramo=config.cdramo;
            	
            	var cdrol=comps.PERSONA_ROL.FORMULARIO.items.find(function(it){
            		return it.name=='cdrol';
            	});
            	cdrol.listeners={
            			change:function(it){
            				Ice.query('[xtype=cdpersonpicker]',me).setCdrol(it.getValue());
            			}
            	}
            	cdrol
            }catch(e){
            	Ice.log(e);
            	
            }

            config.items = (comps.PERSONA_ROL.FORMULARIO.items || []).concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.PersonaRol.constructor');
        me.callParent(arguments);
    }
});