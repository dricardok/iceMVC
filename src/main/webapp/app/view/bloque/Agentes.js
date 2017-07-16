Ext.define('Ice.view.bloque.Agentes', {
    extend: 'Ice.view.componente.PanelPaddingIce',
    xtype: 'bloqueagentes',
    
    controller: 'bloqueagentes',

	// config ext
	title: 'Agentes',
	scrollable: true,
    
	// config no ext
    config: {
    	cdunieco: null,
    	cdramo: null,
    	estado: null,
    	nmpoliza: null,
    	nmsuplem: null,

		modulo: null,
		cdtipsit: null,
		auxkey: null,
		flujo: null,
    	
    	actionColumns: [],
    	agentesAgregados: []
    }, 
        
    constructor: function (config) {
        Ice.log('Ice.view.cotizacion.Agentes.constructor config:', config);
        var me = this,
            paso = 'Construyendo bloque de agentes';
        try {
        	if (!config.cdunieco || !config.cdramo || !config.estado || !config.nmpoliza || Ext.isEmpty(config.nmsuplem)) {
                throw 'Faltan parametros para bloque de agentes';
            }

			config.estado = config.estado.toUpperCase();
        	config.modulo = config.modulo || 'EMISION';
			config.flujo = config.flujo || {};
			config.cdtipsit = config.cdtipsit || '';
			config.auxkey = config.auxkey || '';

			// componentes
	        var formPol = Ice.generaComponentes({
	            pantalla: 'BLOQUE_AGENTES',
	            seccion: 'FORM_POLIZA',
	            modulo: config.modulo,
	            estatus: (config.flujo && config.flujo.estatus) || '',
	            cdramo: config.cdramo,
	            cdtipsit: config.cdtipsit,
	            auxkey: config.auxkey,
	            items: true,
	            fields: true,
	            validators: true
	        });
	        
	        var gridAgt = Ice.generaComponentes({
	            pantalla: 'BLOQUE_AGENTES',
	            seccion: 'GRID',
	            modulo: config.modulo,
	            estatus: (config.flujo && config.flujo.estatus) || '',
	            cdramo: config.cdramo,
	            cdtipsit: config.cdtipsit,
	            auxkey: config.auxkey,
	            columns: true,
	            fields: true
	        });
	        
	        var formAgt = Ice.generaComponentes({
	            pantalla: 'BLOQUE_AGENTES',
	            seccion: 'FORM_AGENTE',
	            modulo: config.modulo,
	            estatus: (config.flujo && config.flujo.estatus) || '',
	            cdramo: config.cdramo,
	            cdtipsit: config.cdtipsit,
	            auxkey: config.auxkey,
	            items: true,
	            fields: true
	        });

			config.items = [
				{
					xtype: 'formdoscolumnasice',
					title: 'Datos de Poliza',
					itemId: 'datpoliza',
					reference: 'datpoliza',
					items: formPol.BLOQUE_AGENTES.FORM_POLIZA.items,
					modelFields: formPol.BLOQUE_AGENTES.FORM_POLIZA.fields,
					modelValidators: formPol.BLOQUE_AGENTES.FORM_POLIZA.validataros
				}, {
					xtype: 'formtrescolumnasice',
					title: 'Agregar Agente',
					itemId: 'agregaragente',
					reference: 'agregaragente',
					items: formAgt.BLOQUE_AGENTES.FORM_AGENTE.items,
					buttons: [
						{
							text: 'Buscar Agente',
							iconCls: 'x-fa fa-search',
							handler: 'onBuscarClic'
						}, {
							text: 'Agregar',
							iconCls: 'x-fa fa-plus',
							handler: 'onAgregarClic'
						}
					]
				}, {
					xtype: 'gridice',
					title: 'Participaci\u00f3n de Agentes',
					itemId: 'gridagentes',
					reference: 'gridagentes',
					columns: gridAgt.BLOQUE_AGENTES.GRID.columns,
					store: {
						fields: gridAgt.BLOQUE_AGENTES.GRID.fields,
						autoLoad: true,
						proxy: {
							type: 'ajax',
							url: Ice.url.bloque.agentes.cargarAgentes,
							extraParams: {
								'params.cdunieco' : config.cdunieco,
								'params.cdramo'   : config.cdramo,
								'params.estado'   : config.estado,
								'params.nmpoliza' : config.nmpoliza,
								'params.nmsuplem' : config.nmsuplem
							},
							reader: {
								type: 'json',
								successProperty: 'success',
								messageProperty: 'message',
								rootProperty: 'list'
							}
						}
					},	                
					buttons: [{
						text: 'Guardar',
						iconCls: 'x-fa fa-save',
						handler: 'onGuardarClic'
					}],
					actionColumns: [
						{
							xtype: 'actioncolumn',
							width: 30,
							tooltip: 'Editar porcentaje',
							iconCls: 'x-fa fa-edit',
							handler : function (grid, row, col) {
								me.getController().editarPorcentaje(grid, row, col);
							}
						}, {
							xtype: 'actioncolumn',
							width: 30,
							tooltip: 'Eliminar',
							iconCls: 'x-fa fa-minus-circle',
							handler: function (grid, row, col) {
								me.getController().eliminar(grid, row, col);
							}
						}
					].concat(config.actionColumns || [])
				}
			].concat(config.items || []);
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
        me.callParent(arguments);
    }
});