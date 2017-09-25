Ext.define('Ice.view.bloque.duplicidad.FormularioDuplicidad',{
	extend:	'Ice.view.componente.PanelIce',
	xtype:	'formularioduplicidad',
	controller:	'formularioduplicidad',
	config:	{
        cdramo: null
	},
	
	constructor : function(config){
		var paso = 'Construyendo pantalla de duplicidad',
			me   = this;
		try{
			config.items = [
                {
                    xtype: 'formulariovigencia',
                    reference: 'formvigencia'
                },{
                    xtype: 'formulariofiltros',
                    reference: 'formfiltros'
                },{
                    xtype: 'formulariodomicilio',
                    reference: 'formdomicilio'
                }
            ];
            config.buttons = [
                {
                    text: 'Consultar',
                    iconCls: 'x-fa fa-search',
                    reference: 'btnConsultar',
                    handler: 'onConsultar'
                },{
                    text: 'Cerrar',
                    ui:'gray',
        			style:'margin-right: 45px;',
                    iconCls: 'x-fa fa-close',
                    handler: function(){
                        this.up('window').cerrar();
                    }
                }
            ];
		}catch(e){
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