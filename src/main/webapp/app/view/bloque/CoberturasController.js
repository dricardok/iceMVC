/**
 * Created by DCACORDE on 5/23/2017.
 */
Ext.define('Ice.view.bloque.CoberturasController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.bloquecoberturas', 
    
    custom: function () {
        Ice.log('Ice.view.bloque.CoberturasController.custom');
        
        
        try {
        	
        	var me = this,
            view = me.getView(),
            paso = 'Configurando comportamiento de bloque lista de situaciones';
        	
        } catch (e) {
            Ice.generaExcepcion(e, paso);
        }
    },
	
    
	
	agregarCobertura:function(me){
		var paso="";
		try{
			paso="Generando ventana para añadir cobertura";
			var me = this;
	        var view = me.getView();
			var gridCoberturas=view.down("[xtype=gridpanel]");
			Ice.log("gridCoberturas:",gridCoberturas);
			paso="Consultando datos"
			 var comps = Ice.generaComponentes({
	            pantalla: 'COBERTURAS',
	            seccion: 'COBERTURAS_AGREGABLES',
	            modulo: view.getModulo() || '',
	            estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
	            cdramo: view.getCdramo() || '',
	            cdtipsit: view.getCdtipsit() ||'',
	            auxKey: view.auxkey || '',	                
	            columns: true,
	            fields:true
	        });
	        Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);
	        
			paso='recuperando datos de situacion'
				var gridCoberturas=view.down('#gridCoberturas')
	    		var record=gridCoberturas.getStore().getAt(0);
            	//Ice.log("store- :",store)
			var win=Ext.create('Ext.window.Window', {
			    title: 'Añadir cobertura',
			    height: 250,
			    width: 450,
			    layout: 'fit',
			    scrollable:true,
			    items: [{ 
			        xtype: 'grid',
			        border: false,
			        itemId:"gridAgrega",
			        columns: [
			            { text: 'Clave', dataIndex: 'cdgarant'  },
			            { text: 'Cobertura', dataIndex: 'dsgarant',flex: 2 }
			          //  { xtype: 'checkcolumn', text: 'Amparar', dataIndex: 'amparada'}
			            ],          
			            selModel: Ext.create('Ext.selection.CheckboxModel'),   
			        store: {
						fields: ['opcional',
							'cdgarant',
							'dsgarant',
							'deducible',
							'cdcapita',
							'suma_asegurada',
							'amparada'],
						proxy:{
		                    type: 'ajax',
		                    autoLoad: true,
		                    extraParams:{
            	    			'params.pv_cdunieco_i':view.getCdunieco(),
            	    			'params.pv_cdramo_i':view.getCdramo(),
            	    			'params.pv_estado_i':view.getEstado(),
            	    			'params.pv_nmpoliza_i':view.getNmpoliza(),
            	    			'params.pv_nmsuplem_i':view.getNmsuplem(),
            	    			'params.pv_nmsituac_i':view.getNmsituac()
            	    			
            	    		},
            	    		
		                    url: Ice.url.bloque.coberturas.datosCoberturas,
		                    reader: {
		                        type: 'json',
		                        rootProperty: 'list',
		                        successProperty: 'success',
		                        messageProperty: 'message'
		                    }
		                },
		                listeners:{
		                	load:function(st){
		                		var remover=-1;
		            			while((remover=st.find('amparada','S'))!=-1){
		            				st.removeAt(remover)
		            			}
		            			
		                		st.data.items.forEach(function(it,idx){
		                			Ice.log("-->",it)
		                			it.data.amparada=false;
		                		});
		            			
		            			
		                	}
		                }
					}
			    }],
			    buttons:[{
			    	xtype	: 'button',
			    	text	: 'Agregar',
			    	handler : function(me){
			    		
			    		var list=[];
			    		me.up("window").down("#gridAgrega").getSelectionModel().getSelection().forEach(function(it,idx){
			    			
			    			Ice.log("Data: ",it.data)
			    			var obj={
	    							
	    							cdgarant:it.data.cdgarant,
	    							cdcapita:it.data.cdcapita
	    							
	    							//,
//	    							suma_asegurada: e.data.suma_asegurada,
//	    							amparada:e.data.amparada?"S":"N"
	    						}
	    					Ice.log("p-",obj)
	    					list.push(obj);
//	    					gridCoberturas.store.add(obj);
			    			
			    			//Ice.log("Data: ",it.store.getData())
			    			
//			    			it.store.data.items.forEach(function(e,i){
//			    				Ice.log("item..:",e)
//			    				if(e.data.amparada){
//			    					
//			    					
//			    				}
//			    			})
			    			
			    			
			    		})
			    		
			    		Ice.request({
			    	    		url:Ice.url.bloque.coberturas.agregarCobertura,
			    	    		jsonData:{
			    	    			list:list,
			    	    			params:{
			    	    				cdunieco	:		view.getCdunieco(),
			    	    				cdramo		:		view.getCdramo(),
			    	    				estado		:		view.getEstado(),
			    	    				nmpoliza	:		view.getNmpoliza(),
			    	    				nmsituac	:		view.getNmsituac(),
			    	    				nmsuplem	:		view.getNmsuplem()
			    	    				
			    	    			}
			    	    		},
			    	    		success:function(){
			    	    			var paso=""
			    	    			try{
			    	    				paso="cargando coberturas"
				    	    			gridCoberturas.store.load()
				    	    			Ice.mensajeCorrecto({
				    	    				titulo:'Correcto',
				    	    				mensaje:"Datos guardados correctamente"
				    	    			})
			    	    			}catch(e){
			    	    				Ice.generaExcepcion(e,paso)
			    	    			}
			    	    		}
			    	    	});
			    		me.up("[xtype=window]").close();
			    	}
			    }]
			}).show();
			
			win.down("grid").getStore().load();
			//Ext.ComponentQuery.query("#gridAgrega")[0].store.find('amparada','N');
			
		}catch(e){
			Ice.generaExcepcion(e, paso);
		}
	},
	
	coberturaObligatoria:function(v,ri,ci,it,record){
		var paso="";
		try{
			paso="valida deshabilitando cobertura"
				
			if(record.get('opcional')=='N'){
				return true;
			}
		}catch(e){
			Ice.generaExcepcion(e,paso);
		}
		return false;
	},
	
	
	  
	  borraCobertura:function(grid, rowIndex, colIndex) {
          var record=grid.store.getAt(rowIndex);
          
          try{
        	  
        	  Ext.MessageBox.confirm("Borrar Cobertura","\u00bfEstás seguro de borrar la cobertura?",function(opc){
        		  if(opc==='yes'){
        			  Ice.request({
                		  url:Ice.url.bloque.coberturas.borrarCobertura,
                		  params:{
                			  'params.cdunieco':record.get('cdunieco'),
                			  'params.cdramo':record.get('cdramo'),
                			  'params.estado':record.get('estado'),
                			  'params.nmpoliza':record.get('nmpoliza'),
                			  'params.nmsituac':record.get('nmsituac'),
                			  'params.nmsuplem':record.get('nmsuplem'),
                			  'params.cdgarant':record.get('cdgarant'),
                			  'params.cdcapita':record.get('cdcapita'),
                			  'params.fevencim':record.get('fevencim'),
                			  'params.accion':'D'
                		  },
                		  mascara:"Borrando Cobertura...",
                		  success:function(){
                			  Ice.mensajeCorrecto({
                				  titulo:"Correcto",
                				  mensaje:"Cobertura borrada"
                			  });
                			  grid.store.load()
                		  }
                	  });
        		  }
        	  })
        	 
          }catch(e){
        	  Ice.generaExcepcion(e,paso)
          }
      },
      
      editarCobertura:function(grid, rowIndex, colIndex) {
    	  var me = this, 
    	      view = me.getView(), 
    	      refs = view.getReferences(),
    	      form = refs.form;
    	  var paso="Evento selecciona cobertura "
    	  try{
      		
    		view.down("#btnGuardarCobertura").setHidden(false);  
      		form.removeAll();
    		var record = grid.getStore().getAt(rowIndex);
      		paso="estableciendo cdgarant";
      		view.setCdgarant(record.get('cdgarant'));
      		view.setCdcapita(record.get('cdcapita'));
      		

//      		view.cdgarant=record.get('cdgarant')
//      		view.cdcapita=record.get('cdcapita')
//      		
//      		view.config.cdgarant=record.get('cdgarant')
//      		view.config.cdcapita=record.get('cdcapita')
    		Ice.log("record:", record);	
    		 var comps = Ice.generaComponentes({
	                pantalla: 'TATRIGAR',
	                seccion: 'TATRIGAR',
	                modulo: view.getModulo() || '',
	                estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
	                cdramo: view.getCdramo() || '',
	                cdtipsit: view.getCdtipsit() ||'',
	                auxKey: view.getAuxkey() || '',
	                cdgarant:record.get('cdgarant') || '',
	                items: true,
	                fields:true,
	                validators:true
	            });
    		 
    		 
            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);	
            var mpolicap=Ice.generaComponentes({
                pantalla: 'BLOQUE_COBERTURAS',
                seccion: 'MPOLICAP',
                modulo: view.getModulo() || '',
                estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
                cdramo: view.getCdramo() || '',
                cdtipsit: view.getCdtipsit() ||'',
                auxKey: view.getAuxkey() || '',
                items: true,
                fields:true,
                validators:true
               
            });
            mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items.forEach(function(it,idx){
            	it.tabla="MPOLICAP"
            })
            
            form.setTitle("Cobertura: "+record.get('cdgarant')+" - "+record.get('dsgarant') +" Póliza: "+view.getCdunieco() +" - "
					 +view.getCdramo()+" - "+ view.getEstado()+ " - "	
						 +view.getNmpoliza())
            form.removeAll();
            
            form.add(mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items);
            form.add(comps.TATRIGAR.TATRIGAR.items);
            
            form.modelValidators = Ice.utils.mergeObjects({},comps.TATRIGAR.TATRIGAR.validators,mpolicap.BLOQUE_COBERTURAS.MPOLICAP.validators)
            form.modelFields = mpolicap.BLOQUE_COBERTURAS.MPOLICAP.fields.concat(comps.TATRIGAR.TATRIGAR.fields);
            
            Ice.log("-------->",form.modelValidators)
            this.cargarValores(form);   
    		
    	}catch(e){
    		Ice.manejaExcepcion(e, paso);
    	}
    },
    
    cargarValores: function(form){
    	//me.coberturasItems={}
    	var me=this;
    	var view =me.getView();
    	Ice.log("->" ,view)
    	Ice.request({
    		url:Ice.url.bloque.coberturas.obtieneTvalogar,
    		params:{
    			'params.cdunieco':view.getCdunieco(),
    			'params.cdramo':view.getCdramo(),
    			'params.estado':view.getEstado(),
    			'params.nmpoliza':view.getNmpoliza(),
    			'params.nmsuplem':view.getNmsuplem(),
    			'params.nmsituac':view.getNmsituac(),
    			'params.cdgarant':view.getCdgarant(),
    			'params.cdcapita':view.getCdcapita()
    		},
    		success:function(json){
    			
    			try{
    				Ice.request({
    					url:Ice.url.bloque.coberturas.obtieneMpolicap,
    					params:{
    						'params.cdunieco':view.getCdunieco(),
    		    			'params.cdramo':view.getCdramo(),
    		    			'params.estado':view.getEstado(),
    		    			'params.nmpoliza':view.getNmpoliza(),
    		    			'params.nmsuplem':view.getNmsuplem(),
    		    			'params.nmsituac':view.getNmsituac(),
    		    			'params.cdgarant':view.getCdgarant(),
    		    			'params.cdcapita':view.getCdcapita()
    					},
    					success:function(response){
    						var paso="";
    						try{
    							paso="llenando campos";
    							var valores=json.list?json.list[0] || {}:{};
    							var mcap=response.list?response.list[0] || {}:{};
    							
    							form.items.items.forEach(function(it,idx){
    					    		Ice.log("item:",it);
    					    		if(it.setValue){
    					    			var name=it.name || it.referenceKey
	    					    		it.setValue(valores[name]);
	    					    		it.valorOriginal=it.getValue();
    					    		}
    					    	})
    					    	//suma asegurada
    					    	var sa=form.items.items.find(function(e){
    					    		return e.name=='ptcapita' || e.referenceKey=='ptcapita';
    					    		
    					    	});
    							response
    					    	Ice.log("->",sa);
    							Ice.log("->",mcap);
    							var n=sa.name || sa.referenceKey
    					    	sa.setValue(mcap[n])
    					    	
    						}catch(e){
    							Ice.manejaExcepcion(e,paso);
    						}
    					}
    				});
    			}catch(e){
    				Ice.manejaExcepcion(e,paso);
    			}
    			
    		}
    		
    	});
    	
    	
    	
    },
    
    guardarCobertura:function(me){
    	
    	var paso=""
    	try{
    		alert()
	    	var view = this.getView();
	    	var form = me.up('form');
	    	var elementos=[]
	    	form.items.items.forEach(function(it,idx){
	    		elementos.push({
	    			valor:it.getValue(),
	    			valorOriginal:it.valorOriginal,
	    			name:it.name,
	    			tabla:it.tabla
	    		})
	    	});
	    	Ice.request({
	    		url:Ice.url.bloque.coberturas.guardarCoberturas,
	    		jsonData:{
	    			list:elementos,
	    			params:{
	    				'cdunieco':view.getCdunieco(),
		    			'cdramo':view.getCdramo(),
		    			'estado':view.getEstado(),
		    			'nmpoliza':view.getNmpoliza(),
		    			'nmsuplem':view.getNmsuplem(),
		    			'nmsituac':view.getNmsituac(),
		    			'cdgarant':view.getCdgarant(),
		    			'cdcapita':view.getCdcapita()
	    			}
	    		},
	    		success:function(json){
	    			
	    			
	    			var paso="";
	    			try{
	    				var list=json.list || [];
		    			
		    			if(list.length!=0){
		    				
		    				
		    				Ice.log("--",list)
		    				var win=view.windows.find(function(w){
		    					return w.windowName=='conflictos'
		    				})
		    				Ice.log("-Window->",win)
		    				win.down('[tipo=grid]').store.removeAll();
		    				win.down('[tipo=grid]').store.add(list);
		    				win.show();
		    			}else{
		    				Ice.mensajeCorrecto({
			    				titulo:'Correcto',
			    				mensaje:"Datos guardados correctamente"
			    			});
		    			}
		    			
		    			
		    			view.down("#gridCoberturas").store.load();
	    			}catch(e){
	    				Ice.generaExcepcion(e,paso);
	    			}
	    			
	    		}
	    	});
	    	
	    	
    	}catch(e){
    		Ice.generaExcepcion(e,paso)
    	}
    	
    },
    cargarSituaciones:function(me){
    	var paso="cargando situaciones";
    	try{
	    	var me = this,
	        view = me.getView();
			if(view.getCdunieco() && view.getCdramo() && view.getEstado() && view.getNmpoliza() && view.getCdtipsit() && view.getModulo() && !Ext.isEmpty(view.getNmsuplem()) ){
				view.down("[xtype=bloquelistasituaciones]").store.load();
			}
    	}catch(e){
    		Ice.generaExcepcion(e,paso);
    	}
		
	},
	
	guardar:function(params){
		var paso = 'Validando coberturas';
		try {
			var view=this.getView();
			
			
			Ice.request({
				url:Ice.url.bloque.ejecutarValidacion,
				params:{
					'params.cdunieco':view.getCdunieco(),
	    			'params.cdramo':view.getCdramo(),
	    			'params.estado':view.getEstado(),
	    			'params.nmpoliza':view.getNmpoliza(),
	    			'params.nmsituac':0,
					'params.nmsuplem':view.getNmsuplem(),
					 bloques:["B18","B19","B19B"]
				},
				success:function(json){
					Ice.log(json);
					var paso2 = 'Evaluando validaciones';
					try {
    					var list = json.list || [];
    					if (list.length>0) { 
    					   
    					   
    					   Ext.create('Ice.view.bloque.VentanaValidaciones', {
                               lista: list
                           }).mostrar();
    					   
    					   list.forEach(function(it){
    						   if((it.tipo+'').toLowerCase()=='error')
    							   throw "Favor de revisar las validaciones"
    					   })
    					}
    					
    					if (params && params.success) {
    						params.success();
					    }
				    } catch (e) {
				        Ice.manejaExcepcion(e, paso);
                        if (params && params.failure) {
                            params.failure();
                        }
				    }
				},
				failure: function () {
				    if (params && params.failure) {
				        params.failure();
				    }
				}
			});
		} catch (e) {
			Ice.manejaExcepcion(e, paso);
			if (params && params.failure) {
			    params.failure();
			}
		}
	},
	
  editarCoberturaMovil:function(grid,idx,tar,sel) {
   	try{
   		var view = this.getView();
   		view.down("#btnGuardarCobertura").setHidden(false);  
 		var me =grid.up("bloquecoberturas");
 		//var sel =Ext.ComponentQuery.query("#gridCoberturas")[0].getSelection();
 			view.setCdgarant(sel.get("cdgarant"));
 			view.setCdcapita(sel.get("cdcapita"));
 			var form=me.down('[xtype=formpanel]');
      		form.removeAll();
    			
    		 var comps = Ice.generaComponentes({
	                pantalla: 'TATRIGAR',
	                seccion: 'TATRIGAR',
	                modulo: view.getModulo() || '',
	                estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
	                cdramo: view.getCdramo() || '',
	                cdtipsit: view.getCdtipsit() ||'',
	                auxKey: view.getAuxkey() || '',
	                cdgarant:view.getCdgarant() || '',
	                items: true,
	                fields:true,
	                validators:true
	            });
    		 
    		 
            Ice.log('Ice.view.bloque.Coberturas.initComponent comps:', comps);	
            var mpolicap=Ice.generaComponentes({
                pantalla: 'BLOQUE_COBERTURAS',
                seccion: 'MPOLICAP',
                modulo: view.getModulo() || '',
                estatus: (view.getFlujo() && view.getFlujo().estatus) || '',
                cdramo: view.getCdramo() || '',
                cdtipsit: view.getCdtipsit() ||'',
                auxKey: view.getAuxkey() || '',
                items: true,
                fields:true,
                validators:true
               
            });
            mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items.forEach(function(it,idx){
            	it.tabla="MPOLICAP"
            })
            
            form.modelValidators = Ice.utils.mergeObjects({},comps.TATRIGAR.TATRIGAR.validators,mpolicap.BLOQUE_COBERTURAS.MPOLICAP.validators)
            form.modelFields = mpolicap.BLOQUE_COBERTURAS.MPOLICAP.fields.concat(comps.TATRIGAR.TATRIGAR.fields);
            
            Ice.log("-------->",form.modelValidators)
            
            form.setTitle(sel.get("cdgarant")+" - "+sel.get('dsgarant'))
            form.removeAll();
            form.add(mpolicap.BLOQUE_COBERTURAS.MPOLICAP.items);
            form.add(comps.TATRIGAR.TATRIGAR.items);
            this.cargarValores(form);
            
 	}catch(e){
 		Ice.generaExcepcion(e,paso)
 	}
   
 },
 
 borraCoberturaMovil:function(btn) {
     var paso="";
     try{
    	 var record=btn.up("bloquecoberturas").down("#gridCoberturas").getSelection();
         var grid=btn.up("bloquecoberturas").down("#gridCoberturas");
         
         var ventana=Ext.MessageBox.confirm?Ext.MessageBox : Ext.Msg
         ventana.confirm ("Borrar Cobertura","\u00bfEstás seguro de borrar la cobertura?",function(opc){
   		  if(opc==='yes'){
   			  Ice.request({
           		  url:Ice.url.bloque.coberturas.borrarCobertura,
           		  params:{
           			  'params.cdunieco':record.get('cdunieco'),
           			  'params.cdramo':record.get('cdramo'),
           			  'params.estado':record.get('estado'),
           			  'params.nmpoliza':record.get('nmpoliza'),
           			  'params.nmsituac':record.get('nmsituac'),
           			  'params.nmsuplem':record.get('nmsuplem'),
           			  'params.cdgarant':record.get('cdgarant'),
           			  'params.cdcapita':record.get('cdcapita'),
           			  'params.fevencim':record.get('fevencim'),
           			  'params.accion':'D'
           		  },
           		  mascara:"Borrando Cobertura...",
           		  success:function(){
           			  Ice.mensajeCorrecto({
           				  titulo:"Correcto",
           				  mensaje:"Cobertura borrada"
           			  });
           			  grid.getStore().load()
           		  }
           	  });
   		  }
   	  })
   	 
     }catch(e){
   	  Ice.generaExcepcion(e,paso)
     }
 },
 agregarCoberturaMovil:function(btn){
	 var paso="";
	 try{
		 var me=this;
		 var view=me.getView();
		 var list=[];
		 var gridCoberturas=view.down("#gridCoberturas");
		 var agre=btn.up("#panela").down("grid");
		 btn.up("#panela").down("grid").getStore().each(function(it){
 			
 			Ice.log("Data: ",it.data)
 			
 			if(it.get("amparada")===true){
 				var obj={
						
						cdgarant:it.get("cdgarant"),
						cdcapita:it.get("cdcapita")
						
					}
				Ice.log("p-",obj)
				list.push(obj);
 			}
 			
 			
 		})
 		
 		Ice.request({
 	    		url:Ice.url.bloque.coberturas.agregarCobertura,
 	    		jsonData:{
 	    			list:list,
 	    			params:{
 	    				
 	    				'cdunieco':view.getCdunieco(),
		    			'cdramo':view.getCdramo(),
		    			'estado':view.getEstado(),
		    			'nmpoliza':view.getNmpoliza(),
		    			'nmsuplem':view.getNmsuplem(),
		    			'nmsituac':view.getNmsituac()
 	    			}
 	    		},
 	    		success:function(){
 	    			var paso=""
 	    			try{
 	    				paso="cargando coberturas"
    	    			gridCoberturas.getStore().load()
    	    			agre.getStore().load()
    	    			Ice.mensajeCorrecto({
    	    				titulo:'Correcto',
    	    				mensaje:"Datos guardados correctamente"
    	    			})
    	    			
    	    			me.cerrarAgregar(btn)
 	    			}catch(e){
 	    				Ice.generaExcepcion(e,paso)
 	    			}
 	    		}
 	    	});
 	
	 }catch(e){
		 Ice.generaExcepcion(e,paso)
	 }
 },
 
 cerrarAgregar:function(btn){
	 
	 var paso="";
	 try{
		 
		var me=this;
		var view=me.getView();
  		view.getItems().items.forEach(function(it){
  			it.setHidden(false)
  		})
  		view.down("#panela").setHidden(true)
	 }catch(e){
		 Ice.generaExcepcion(e,paso)
	 }
 },
 
 guardarCobertura:function(me){ 
 	
 	var paso=""
 	try{
 		
	    	var view = this.getView();
	    	var form = view.down('form');
	    	var elementos=[]
	    	this.validarCampos(form)
	    	
	    	form.items.items.forEach(function(it,idx){
	    		elementos.push({
	    			valor:it.getValue(),
	    			valorOriginal:it.valorOriginal,
	    			name:it.name,
	    			tabla:it.tabla
	    		})
	    	});
	    	Ice.request({
	    		url:Ice.url.bloque.coberturas.guardarCoberturas,
	    		jsonData:{
	    			list:elementos,
	    			params:{
	    				'cdunieco':view.getCdunieco(),
		    			'cdramo':view.getCdramo(),
		    			'estado':view.getEstado(),
		    			'nmpoliza':view.getNmpoliza(),
		    			'nmsuplem':view.getNmsuplem(),
		    			'nmsituac':view.getNmsituac(),
		    			'cdgarant':view.getCdgarant(),
		    			'cdcapita':view.getCdcapita()
	    			}
	    		},
	    		success:function(json){
	    			
	    			Ice.log("-->_",json)
	    			var paso="";
	    			try{
	    				var list=json.list || [];
		    			
		    			if(list.length!=0){
		    				
		    				
		    				Ice.log("-list->",list)
		    				Ext.create('Ice.view.bloque.VentanaValidaciones', {
		                                lista: list
		                            }).mostrar();
		    				list.forEach(function(it){
	    						   if((it.tipo+'').toLowerCase()=='error')
	    							   throw "Favor de revisar las validaciones"
	    					   })
		    				
		    				
		    			}else{
		    				Ice.mensajeCorrecto({
			    				titulo:'Correcto',
			    				mensaje:"Datos guardados correctamente"
			    			});
		    			}
		    			
		    			
		    			view.down("#gridCoberturas").store.load();
	    			}catch(e){
	    				Ice.manejaExcepcion(e, paso);
	    			}
	    			
	    		}
	    	});
	    	
	    	this.guardar()
 	}catch(e){
 		Ice.manejaExcepcion(e,paso)
 	}
 	
 },
 guardarCoberturaMovil:function(me){
	 var paso=""
		 	try{
		 		
			    	var view = this.getView();
			    	var form = me.up('formpanel');
			    	paso = 'Validando campos'
			    	this.validarCampos(form);
			    	paso='enviando datos'
			    	Ice.log(":::::::",view,me,form)
			    	var elementos=[]
			    	form.items.items.forEach(function(it,idx){
			    		
			    		if(it.referenceKey){
				    		elementos.push({
				    			valor:it.getValue(),
				    			valorOriginal:it.valorOriginal,
				    			name:it.referenceKey,
				    			tabla:it.tabla
				    		})
			    		}
			    		
			    	});
			    	Ice.request({
			    		url:Ice.url.bloque.coberturas.guardarCoberturas,
			    		jsonData:{
			    			list:elementos,
			    			params:{
			    				
			    				'cdunieco':view.getCdunieco(),
				    			'cdramo':view.getCdramo(),
				    			'estado':view.getEstado(),
				    			'nmpoliza':view.getNmpoliza(),
				    			'nmsuplem':view.getNmsuplem(),
				    			'nmsituac':view.getNmsituac(),
				    			'cdgarant':view.getCdgarant(),
				    			'cdcapita':view.getCdcapita()

			    			}
			    			
			    			
			    		}
			    	,
			    		success:function(json){
			    			
			    			
			    			var paso="";
			    			try{
			    				var list=json.list || [];
				    			
				    			if(list.length!=0){
				    				Ext.create('Ice.view.bloque.VentanaValidaciones', {
		                                lista: list
		                            }).mostrar();
				    				list.forEach(function(it){
			    						   if((it.tipo+'').toLowerCase()=='error')
			    							   throw "Favor de revisar las validaciones"
			    					   })
				    			}else{
				    				Ice.mensajeCorrecto({
					    				titulo:'Correcto',
					    				mensaje:"Datos guardados correctamente"
					    			});
				    			}
				    			
				    			
				    			view.down("#gridCoberturas").getStore().load();
			    			}catch(e){
			    				Ice.generaExcepcion(e,paso);
			    			}
			    			
			    		}
			    	});
			    	
			    	//this.guardar()
		 	}catch(e){
		 		Ice.manejaExcepcion(e,paso)
		 	}
 },
 
 mostrarCoberturas:function(grid,rowIndex,colIndex) {
			try {
				var view=this.getView();
				var me = grid.up('bloquecoberturas')
				var paso = 'limpiando grids'
				var gridCoberturas = me
						.down('#gridCoberturas');
				gridCoberturas.store
						.removeAll();
				gridCoberturas.setHidden(false);
				
				me
						.down(
								'[xtype=form]')
						.removeAll();
				paso = 'consultando coberturas'
				var record = grid
						.getStore()
						.getAt(
								rowIndex);
				 paso = "Evento selecciona cobertura "
				
				gridCoberturas.store.proxy.extraParams = {
					'params.pv_cdunieco_i' : view.getCdunieco(),
					'params.pv_cdramo_i' : view.getCdramo(),
					'params.pv_estado_i' : view.getEstado(),
					'params.pv_nmpoliza_i' : view.getNmpoliza(),
					'params.pv_nmsuplem_i' : view.getNmsuplem(),
					'params.pv_nmsituac_i' : record.get('nmsituac')
				}
				 gridCoberturas.setTitle("Coberturas de la situación:  " +record.get('nmsituac')+" Póliza: "+view.getCdunieco() +" - "
						 												 +view.getCdramo()+" - "+ view.getEstado()+ " - "	
						 												 +view.getNmpoliza());
				paso = "estableciendo nmsituac";
				me.config.nmsituac = record.get('nmsituac');
				me.setNmsituac(record.get('nmsituac'));
				
				view.setNmsituac(record.get('nmsituac'));
				gridCoberturas.getStore()
						.load()
				gridCoberturas.getStore().filter('amparada','S')
				view.setNmsituac(record.get('nmsituac'));
						
			} catch (e) {
				Ice.generaExcepcion(e,	paso);
			}
		},
onItemTabSituaciones:function(grid,idx,target,record){
	try{
		var me = grid.up("bloquecoberturas");
		me.down("[xtype=formpanel]").removeAll();
		me.setNmsituac(record.get("nmsituac"));
		me.down("bloquelistasituaciones").getStore().on({
			load:function(store){
				var paso='cargando coberturas';
				try{
					if(store.count()>0){
						Ice.log("deshabilitando")
						Ice.query("[xtype=button]",me.down("#gridCoberturas")).forEach(function(it){
							it.setDisabled(false);
						});
					}else{
						Ice.log("habilitando")
						Ice.query("[xtype=button]",me.down("#gridCoberturas")).forEach(function(it){
							it.setDisabled(true);
						});
					}
				}catch(e){
					Ice.manejaExcepcion(e,paso)
				}
			}
		})
	    me.down("#gridCoberturas").getStore().proxy.extraParams['params.pv_nmsituac_i']=me.getNmsituac();
	    me.down("#gridCoberturas").getStore().load()
	    me.down("#gridCoberturas").getStore().filter('amparada','S')
		
	    Ice.log(me.config.nmsituac)
	}
	catch(e){
		Ice.generaExcepcion(e,	paso);
	}
},

mostrarPanelCoberturas:function(btn) {
 	try{
 		var view=this.getView();
 		btn.up("[xtype=bloquecoberturas]").getItems().items.forEach(function(it){
 			it.setHidden(true)
 		})
 		view.down("#agregables").getStore().load();
 		view.down("#panela").setHidden(false);
 	}catch(e){
 		Ice.generaExcepcion(e,paso)
 	}
   
 },
 
validarCampos:function(form){
	form
	var paso='';
	try{
		if(!form.modelValidators || !form.modelFields){
			throw 'No se puede validar el formulario'+form.getTitle();
		}
		
		paso = 'Construyendo modelo de validaci\u00f3n';
		
		var validators={};
		var refs=form.getReferences();
		var ref=null;
		var view=this.getView();
		Ice.log("-]",form);
		form.items.items.filter(function(it){
			return it.isHidden()!==true && typeof it.getName =='function' && form.modelValidators[it.getName()] ;
		})
		.forEach(function(it){
			validators[it.getName()] = form.modelValidators[it.getName()];
		});
		
		Ice.log("refs , validators",refs, validators)
		
		var modelName = Ext.id();
        var  modelo = Ext.define(modelName, {
            extend: 'Ext.data.Model',
            fields: form.modelFields,
            validators: validators
        });
        
       Ice.log( "Modelo",modelo)
        
        paso = 'Validando datos';
        errores = Ext.create(modelName, form.getValues()).getValidation().getData();
        Ice.log("Errores",errores)
        var sinErrores = true,
        erroresString = '';
	    Ext.suspendLayouts();
	    for (var name in errores) {
	        if (errores[name] !== true) {
	            sinErrores = false;
	            var ref = view.down('[name=' + name + ']');
	            if (Ext.manifest.toolkit === 'classic') {
	                ref.setActiveError(errores[name]);
	            } else {
	                erroresString = erroresString + ref.getLabel() + ': ' + errores[name] + '<br/>';
	            }
	        }
	    }
	    Ext.resumeLayouts();
	    
	    if (sinErrores !== true) {
	        if (Ext.manifest.toolkit === 'classic') {
	            throw 'Favor de revisar los datos';
	        } else {
	            throw erroresString;
	        }
	    }
		
	}catch(e){
		Ice.generaExcepcion(e,paso);
	}
},

obtenerErrores:function(){},

cargar: function(){
    Ice.log('Ice.view.bloque.CoberturasController.cargarValoresDefectoVariables');
    var me = this,
        view = me.getView(),
        refs = view.getReferences(),
        paso = 'Cargando bloque de coberturas';
    try{
        refs.grid.getController().cargar();
    } catch(e) {
        Ice.generaExcepcion(e, paso);
    }
}
    
    
});