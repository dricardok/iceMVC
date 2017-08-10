Ext.define('Ice.view.bloque.mesacontrol.FormMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.formmesacontrol',
	
	
	onBuscarClic: function () {
		Ice.log('Ice.view.bloque.mesacontrol.FormMesaControlController.onBuscarClic');
		var view = this.getView(),
			grid = view.up().getReferences().gridmesacontrol,
			formRefs = view.getReferences(),
			storegrid = grid.store,
			paso = 'Buscando tramites';
		try{
			Ice.log('referencias', view.getReferences());
			
			storegrid.removeAll();
			storegrid.load({
				params: {
					'params.cdramo':formRefs.cdramo.getValue(),
					'params.estado':formRefs.estado.getValue(),
					'params.nmpoliza':formRefs.nmpoliza.getValue(),
					'params.cdagente':formRefs.cdagente.getValue(),
					'params.ntramite':formRefs.ntramite.getValue(),
					'params.estatus':formRefs.estatus.getValue(),
					'params.fstatusi':formRefs.fstatusi.getValue(),
					'params.fstatusf':formRefs.fstatusf.getValue(),
					'params.nombre':formRefs.nombre.getValue(),
					'params.nmsolici':formRefs.nmsolici.getValue()
					
				}
			});
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		} 
	},
	
	onLimpiarClic: function () {
		Ice.log('Ice.view.bloque.mesacontrol.FormMesaControlController.onLimpiarClic');
		var view = this.getView(),
			formRefs = view.getReferences(),
			paso = 'Limpiando filtros de tramites';
		try{
			view.form.reset();
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}		 
	}
	
});