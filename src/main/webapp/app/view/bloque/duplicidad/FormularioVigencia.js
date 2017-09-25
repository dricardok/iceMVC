Ext.define('Ice.view.bloque.duplicidad.FormularioVigencia',{
	style:'margin:5px 20px 0px 0px;',
	extend:	'Ice.view.componente.FormTresColumnasIce',
	xtype:	'formulariovigencia',
	controller:	'formulariovigencia',
	/*config		:	{
	},*/
	title: {
		text:'Vigencia',
		style:'margin:0px 45px 16px 40px;'
	},
	
	constructor : function(config){
		var paso = 'Construyendo formulario de fechas de vigencia de duplicidad',
			me   = this;
		try{
			Ice.log('Ice.view.bloque.duplicidad.FormularioVigencia.constructor');
			var comps = Ice.generaComponentes({
                pantalla: 'DUPLICIDAD',
                seccion: 'VIGENCIA',
                items: true,
                fields: true,
                validators: true
            });
			config.items           = comps.DUPLICIDAD.VIGENCIA.items;
			config.modelValidators = comps.DUPLICIDAD.VIGENCIA.validators;
			config.modelFields	   = comps.DUPLICIDAD.VIGENCIA.fields;
		} catch(e) {
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
		try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}
	}
});