Ext.define('Ice.view.bloque.personas.PersonaRol', {
    extend: 'Ice.view.componente.FormDosColumnasIce',
    xtype: 'cdpersoncdrol',

    // config ext
    title: 'Buscar personas',

    // config no ext
    config: {
        cdramo: null,
        cdrol: null,
        mostrarRol: true,
        nmsituac: null
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

            if (!config.nmsituac) {
                throw 'Falta situacion para persona por rol';
            }

            var comps = Ice.generaComponentes({
                pantalla: 'PERSONA_ROL',
                seccion: 'FORMULARIO',
                cdramo: config.cdramo,
                items: true
            });
            
            Ice.log('Ice.view.bloque.PersonaRol.constructor antes de entrar a try');
            try{
            	var cdperson = comps.PERSONA_ROL.FORMULARIO.items.find(function(it){
            		return it.name=='cdperson';
            	});
            	cdperson.cdramo = config.cdramo;
            	
            	var cdrol = comps.PERSONA_ROL.FORMULARIO.items.find(function(it){
            		return it.name=='cdrol';
                });
                
                cdrol['param2'] = 'params.cdnivel';
                if(config.nmsituac > 0){
                    cdrol['value2'] = '1';
                } else {
                    cdrol['value2'] = config.nmsituac;
                }
                Ice.log('Ice.view.bloque.PersonaRol.constructor recargar ',cdrol);
                /*cdrol.getStore().load({
                    params: {
                        'params.cdramo': config.cdramo,
                        'params.cdnivel': config.nmsituac == 0 ? 0:1
                    }
                });*/

            	cdrol.listeners = {
                    change: function(it) {
                        Ice.query('[xtype=cdpersonpicker]',me).setCdrol(it.getValue());
                    }
            	}
            } catch(e) {
            	Ice.log('Ice.view.bloque.PersonaRol.constructor error',e);
            }

            config.items = (comps.PERSONA_ROL.FORMULARIO.items || []).concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        Ice.log('Ice.view.bloque.PersonaRol.constructor');
        me.callParent(arguments);
    }
});