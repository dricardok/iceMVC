Ext.define('Ice.view.bloque.mesacontrol.FormDetalleTramite', {
	extend: 'Ice.view.componente.FormDosColumnasIce',
	
	xtype: 'formdetalletramite',
	style: 'padding: 30px 0px 0px 0px;',
	config: {
		ntramite: null,
		dstipflu: null,
		dsflujomc: null,
		cdunieco: null,
		dsunieco: null,
		estado: null,
		descripl: null,
		nmpoliza: null,
		nmsuplem: null,
		nmsolici: null,
		cdsucadm: null,
		cdsucdoc: null,
		cdtiptra: null,
		ferecepc: null,
		cdagente: null,
		referencia: null,
		nombre: null,
		cdramo: null,
		dsramo: null,
		fecstatu: null,
		estatus: null
	},
	
	items: [
		{
			xtype: 'displayfield',
	        fieldLabel: 'No. Trámite',
	        name: 'ntramite'
		}, {
			xtype: 'displayfield',
	        fieldLabel: 'Tramite',
	        name: 'dstipflu'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'Proceso',
	        name: 'dsflujomc'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'Estatus',
	        name: 'estatus'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'Sucursal',
	        name: 'cdunieco'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'Ramo',
	        name: 'cdramo'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'Póliza',
	        name: 'nmpoliza'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'Cotización',
	        name: 'nmsolici'
		}
	],
		
	constructor: function (config) {
		var me = this,
		paso = 'Construyendo formulario de solo lectura para el detalle del tramite';
		
		try{
			var comps;
			if(!Ice.classic()){
				comps = Ice.generaComponentes({
					pantalla: 'MESA_CONTROL',
					seccion: 'FORMULARIO_DETALLE_TRAMITE',
					//modulo: 'NUEVO_TRAMITE',
					
					items: true,
					fields: true,
					validator: true
				});
				
				Ice.log(paso, 'campos generados', comps);
				
				config.items = (comps.MESA_CONTROL.FORMULARIO_DETALLE_TRAMITE.items || []);
				config.modelFields = comps.MESA_CONTROL.FORMULARIO_DETALLE_TRAMITE.fields || [];
				config.modelValidators = comps.MESA_CONTROL.FORMULARIO_DETALLE_TRAMITE.validators || [];
			}
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
		me.callParent(arguments);
	},
	
	initComponent: function (config) {
		Ice.log('Ice.view.bloque.mesacontrol.FormDetalleTramite initComponent');
		var me = this,
			paso = 'initComponent';
		try {
			me.callParent(arguments);
			
			
			me.getForm().findField('ntramite').setValue(me.getNtramite());
			me.getForm().findField('dstipflu').setValue(me.getDstipflu());
			me.getForm().findField('dsflujomc').setValue(me.getDsflujomc());
			me.getForm().findField('estatus').setValue(me.getEstatus());
			me.getForm().findField('cdunieco').setValue(me.getDsunieco());
			me.getForm().findField('cdramo').setValue(me.getDsramo());
			me.getForm().findField('nmpoliza').setValue(me.getNmpoliza());
			me.getForm().findField('nmsolici').setValue(me.getNmsolici());
			
			
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
		
	},
	
	initialize: function () {
		Ice.log('Ice.view.bloque.mesacontrol.FormDetalleTramite initialize');
		var me = this,
			paso = 'Init component';		
		try{ 
			
			me.callParent(arguments);
			
			Ice.log('me.getReferences()  ', me.getReferences(), me.config.ntramite);
			
			me.getReferences().ntramite.setValue(me.getNtramite());
			me.getReferences().dstipflu.setValue(me.getDstipflu());
			me.getReferences().dsflujomc.setValue(me.getDsflujomc());
			me.getReferences().estatus.setValue(me.getEstatus());
			me.getReferences().cdunieco.setValue(me.getDsunieco());
			me.getReferences().cdramo.setValue(me.getDsramo());
			me.getReferences().nmpoliza.setValue(me.getNmpoliza());
			me.getReferences().nmsolici.setValue(me.getNmsolici());
			
			
		}catch(e) {			
			Ice.generaExcepcion(e, paso);
		}		
	}
});