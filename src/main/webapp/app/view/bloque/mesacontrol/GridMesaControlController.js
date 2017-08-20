Ext.define('Ice.view.bloque.mesacontrol.GridMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.gridmesacontrol',
	
	
	onItemClic : function (rec, record) {		
		var me = this,
			view = me.getView(),
			paso = 'Creando ventana detalle de mesa de control';
		
		try {
			
			var ventana = Ext.create('Ice.view.bloque.mesacontrol.VentanaMesaControl', {
				items: [
					{
						xtype: 'formdetalletramite',
						reference: 'formdetalletramite',
						
						ntramite: record.data.NTRAMITE,
						dstipflu: record.data.DSTIPFLU,
						dsflujomc: record.data.DSFLUJOMC,
						cdramo: record.data.CDRAMO,
						dsramo: record.data.DSRAMO,
						cdunieco: record.data.CDUNIECO,
						dsunieco: record.data.DSUNIECO,
						estado: record.data.ESTADO,
						descripl: record.data.DESCRIPL,
						nmpoliza: record.data.NMPOLIZA,
						nmsuplem: record.data.NMSUPLEM,
						nmsolici: record.data.NMSOLICI,
						cdsucadm: record.data.CDSUCADM,
						cdsucdoc: record.data.CDSUCDOC,
						cdtiptra: record.data.CDTIPTRA,
						ferecepc: record.data.FERECEPC,
						cdagente: record.data.CDAGENTE,
						referencia: record.data.REFERENCIA,
						nombre: record.data.NOMBRE,
						fecstatu: record.data.FECSTATU,
						estatus: record.data.DSESTADOMC
					}, {
						xtype: 'botoneraflujo',
						docked: 'bottom',
						flujo: {
							ntramite  : record.get('NTRAMITE'),
							status    : record.get('ESTATUS'),
							cdtipflu  : record.get('CDTIPFLU'),
							cdflujomc : record.get('CDFLUJOMC'),
							tipoent   : 'E',
							claveent  : record.get('ESTATUS'),
							webid     : '',
							cdunieco  : record.get('CDUNIECO'),
							cdramo    : record.get('CDRAMO'),
							estado    : record.get('ESTADO'),
							nmpoliza  : record.get('NMPOLIZA'),
							nmsituac  : record.get('NMSITUAC'),
							nmsuplem  : record.get('NMSUPLEM'),
							aux       : ''
						}
					}
				]
			});
			ventana.mostrar();
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		}
	},
	
	onNuevoTramiteClic: function () {
		
		var me = this,
			view = me.getView(),
			paso = 'Manejando el evento onNuevoTramiteClic';
		
		try {
			var ventana = Ext.create({
				xtype: 'ventanaice',
				title: 'Registrar nuevo tramite',

				platformConfig: {
					desktop: {
						width: Ice.constantes.componente.ventana.width,
						modal: true
					}
				},
			
				items: [
					{
						xtype: 'formnuevotramite',
						reference: 'formnuevotramite'
					}
				],
				
				buttons: [
					{
						text: 'Continuar',
						iconCls: 'x-fa fa-arrow-right',
						handler: function() {
													
							var formulario = Ext.create('Ice.view.bloque.RegistroTramiteWindow', {
								
								modal: true,
								
								cdtipflu: Ice.query('formnuevotramite').getValues().cdtipflu,
								cdflujomc: Ice.query('formnuevotramite').getValues().cdflujomc, 
								
								listeners: {
									'guardartramite' : function (form, ntramite) {
										
										/*
										var boton = view.up().getReferences().formmesacontrol.getReferences().formMesaControlBtnLimpiar;
										
										Ice.log('Boton de limpiar', boton);
										
										Ice.log(boton.fireEvent('click', boton));
										*/
										
										view.up().getReferences().formmesacontrol.getController().onLimpiarClic();
										view.up().getReferences().formmesacontrol.getReferences().ntramite.setValue(ntramite);
										view.up().getReferences().formmesacontrol.getReferences().cdestadomc.setValue(0);
										view.up().getReferences().formmesacontrol.getController().onBuscarClic();
									}
								}
							});
							ventana.cerrar();
							formulario.mostrar();
							
						}
					}, {
						text: 'Cancelar',
						iconCls: 'x-fa fa-close',
						handler:  function() {
							ventana.cerrar();
						}
					}
				]
			});
			
			if(Ice.classic()){
				ventana.mostrar();
			} else {
				Ice.push(ventana);
			}
			
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}		
	},
	
	onDocumentosClic: function (boton) {
		
		var me = this,
			view = me.getView(),
			paso = 'onMostrarDocumentos de formDetalleTramite';
		try {
			var formDetalle = boton.up().up();			
			
			var ventanaDocs = Ext.create('Ice.view.bloque.documentos.VentanaDocumentos', {
                cdunieco: formDetalle.getCdunieco(),
                cdramo: formDetalle.getCdramo(),
                estado: formDetalle.getEstado(),
                nmpoliza: formDetalle.getNmpoliza()
            });
        	ventanaDocs.mostrar();
			
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		}
	},
	
	onHistorialClic: function (boton) {
		var me = this,
		view = me.getView(),
		paso = 'onMostrarDocumentos de formDetalleTramite';
		try {
			
			var formDetalle = boton.up().up();
			
			var ventanaHistorial = Ext.create('Ice.view.bloque.documentos.historial.HistorialPanel', {
				ntramite: formDetalle.getNtramite()
			});
			ventanaHistorial.mostrar();
			
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
	}
});