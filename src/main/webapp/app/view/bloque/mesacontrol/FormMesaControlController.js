Ext.define('Ice.view.bloque.mesacontrol.FormMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.formmesacontrol',
	
	
	onBuscarClic: function () {
		
		Ice.log('Ice.view.bloque.mesacontrol.FormMesaControlController.onBuscarClic');
		var view = this.getView(),
			grid = view.up().getReferences().gridmesacontrol,
			formRefs = view.getReferences(),
			storegrid = grid.getStore(),
			paso = 'Buscando tramites';
		
		Ice.log('Referencias', view, grid, formRefs, storegrid, paso);
		
		try{
			Ice.log('referencias', view.getReferences());
			
			if(Ice.classic()) {
				storegrid.removeAll();
			}
			
			storegrid.getProxy().extraParams['params.cdunieco'] = formRefs.cdunieco.getValue();
			storegrid.getProxy().extraParams['params.cdramo'] = formRefs.cdramo.getValue();
			storegrid.getProxy().extraParams['params.estado'] = formRefs.estado.getValue();
			storegrid.getProxy().extraParams['params.nmpoliza'] = formRefs.nmpoliza.getValue();
			storegrid.getProxy().extraParams['params.cdagente'] = formRefs.cdagente.getValue();
			storegrid.getProxy().extraParams['params.ntramite'] = formRefs.ntramite.getValue();
			storegrid.getProxy().extraParams['params.estatus'] = formRefs.cdestadomc.getValue();
			storegrid.getProxy().extraParams['params.fstatusi'] = formRefs.fstatusi.getValue();
			storegrid.getProxy().extraParams['params.fstatusf'] = formRefs.fstatusf.getValue();
			storegrid.getProxy().extraParams['params.nombre'] = formRefs.nombre.getValue();
			storegrid.getProxy().extraParams['params.nmsolici'] = formRefs.nmsolici.getValue();
			
			
			storegrid.loadPage(1,{
				params: {
					'params.cdunieco':formRefs.cdunieco.getValue(),
					'params.cdramo':formRefs.cdramo.getValue(),
					'params.estado':formRefs.estado.getValue(),
					'params.nmpoliza':formRefs.nmpoliza.getValue(),
					'params.cdagente':formRefs.cdagente.getValue(),
					'params.ntramite':formRefs.ntramite.getValue(),
					'params.estatus':formRefs.cdestadomc.getValue(),
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
			if(Ice.classic()){
				view.getForm().reset();
			}else{
				view.reset();
			}			
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}		 
	}
	
});