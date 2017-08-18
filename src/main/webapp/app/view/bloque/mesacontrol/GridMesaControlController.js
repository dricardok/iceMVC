Ext.define('Ice.view.bloque.mesacontrol.GridMesaControlController', {
	extend: 'Ice.app.controller.FormIceController',
	alias: 'controller.gridmesacontrol',
	
	
	onItemClic : function (rec, record) {		
		var me = this,
			view = me.getView(),
			paso = 'Creando ventana detalle de mesa de control';
		
		try {
			
			var ventana = Ext.create('Ice.view.bloque.mesacontrol.VentanaMesaControl', {
				
				modal: true,				
				
				platformConfig: {
			        '!desktop': {
			            
			        	scrollable: true
			        	
			        },
			        "desktop" : {
			        	width: 800
			        }
			    },
				
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
						estatus: record.data.DSESTADOMC,
								
						
						buttons: [{
							text: 'Documentos',
							reference: 'formDetalleBtnDocumentos',
							handler: function (boton) {
								
								me.onDocumentosClic(boton);
							
							}
						}, {
							text: 'Historial',
							references: 'formDetalleBtnHistorial',
							handler: function (boton) {
								
								me.onHistorialClic(boton);
							
							}
						}, {
							text: 'Regresar',
							handler: function () {
								
								ventana.cerrar();
							}
						}]
					}
				]
			});
			
			if(Ice.classic()){
				ventana.mostrar();
			} else {
				Ice.push(ventana);
			}
			
		}catch(e) {
			Ice.generaExcepcion(e, paso);
		}
	},
	
	onNuevoTramiteClic: function () {
		
		var me = this,
			view = me.getView(),
			paso = 'Manejando el evento onNuevoTramiteClic';
		
		try {
			var ventana = Ext.create('Ice.view.componente.VentanaIce',  {
				
				title: 'Registrar nuevo tramite',
				width: 500,
				modal: true,
				//height: 300,			
				//layout: 'fit',
			
				items: [
					{
						xtype: 'formnuevotramite',
						reference: 'formnuevotramite'
					}
				],
				
				buttons: [
					{
						text: 'Continuar',
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
			
		}
	}
});