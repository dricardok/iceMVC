Ext.define('Ice.view.bloque.duplicidad.FormularioFiltros',{
	extend:	'Ice.view.componente.FormTresColumnasIce',
	xtype:	'formulariofiltros',
	/*config		:	{
	},*/
	title: {
		text:'',
		style:'margin:0px 45px 16px 40px;'
	},
	
	constructor : function(config){
		var paso = 'Construyendo formulario de duplicidad',
			me   = this;
		try{
			Ice.log('Ice.view.bloque.duplicidad.FormularioFiltros.constructor');
			var comps = Ice.generaComponentes({
                pantalla: 'DUPLICIDAD',
                seccion: 'FILTRO',
                items: true,
                fields: true,
                validators: true
            });
			config.items           = comps.DUPLICIDAD.FILTRO.items;
			config.modelValidators = comps.DUPLICIDAD.FILTRO.validators;
			config.modelFields	   = comps.DUPLICIDAD.FILTRO.fields;
		} catch(e) {
			Ice.generaExcepcion(e,paso);
		}
		me.callParent(arguments);
		/*try {
			me.getController().custom();
		} catch (e) {
			Ice.generaExcepcion(e, paso);
		}*/
	}
});