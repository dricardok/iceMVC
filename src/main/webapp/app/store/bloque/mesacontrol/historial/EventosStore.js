Ext.define("Ice.store.bloque.mesacontrol.historial.EventosStore",{
        extend      :   'Ext.data.Store',
        alias       :   'store.eventosstore',

        autoLoad	:	true,
        
        fields      :  
//        				["cdusuari"
//                        ,"cdusuari_ini"
//                        ,"dsusuari_ini"
//                        ,"dsusuari_fin"
//                        ,"status"
//                        ,"cdusuari_dest"
//                        ,"cdtiptra"
//                        ,"cdsisrol_dest"
//                        ,"cdclausu"
//                        ,"cdsisrol_ini"
//                        ,"usuario_fin"
//                        ,"fecha"
//                        ,"dsstatus"
//                        ,"dsusuari"
//                        ,"ntramite"
//                        ,"fechafin"
//                        ,"dsusuari_dest"
//                        ,"dssisrol_fin"
//                        ,"comments"
//                        ,"dssisrol_ini"
//                        ,"cdmotivo"
//                        ,"swagente"
//                        ,"cdsisrol_fin"
//                        ,"nmordina"
//                        ,"dssisrol_dest"],
        	["ntramite"
                ,"nmordina"
                ,"cdtiptra"
                ,"cdclausu"
                ,"fecha"
                ,"comments"
                ,"cdusuari"
                ,"cdmotivo"
                ,"swagente"
                ,"dsestadomc"//"dsstatus"
                ,"cdsisrol"
                ,"cdmodulo"
                ,"cdevento"
                ,"dsusuari"
                ,"dssisrol"
               ],
                        
          constructor:function(config){
        	  var paso="creando eventosStore"
	          try{
	        	  if(Ext.isEmpty(config.ntramite)){
	        		  throw 'No se recibio ntramite en eventosstore';
	        	  }
	        	  config.proxy={
	                      type        : 'ajax',
	                      url         : Ice.url.bloque.mesacontrol.historial.obtenerTdmesacontrol,
	                      extraParams : {
	                          'params.ntramite'   : config.ntramite
	                      },
	                      reader      : {
	                          type : 'json',
	                          rootProperty : 'list',
	                          successProperty : 'success',
	                          messageProperty : 'message'
	                      }
	                  } 
	        	  this.callParent([config]);
	          }catch(e){
	        	  Ice.manejaExcepcion(e,paso);
	          }
          },
          
          listeners		:	{
              load		:	function(store, data){
            	  
            	  data.forEach(function(it){
            		  Ice.log("load store",it)
                	  var d=it.get("fecha");
                	  
                	  var f=d.split(" ")[0];
                	  var hora=d.split(" ")[1];
                	  var arr=f.split("/");
                	  f=new Date(Number(arr[2]),Number(arr[1])-1,Number(arr[0]),Number(hora.split(":")[0]),Number(hora.split(":")[1]));
                	  Ice.log("fecha ini",f.getTime());
                	  it.set("fecha",f.getTime());
                	  Ice.log("fecha ini",it.get("fecha"));
                	  it.set("usuarioY",it.get("cdusuari")+"-"+it.get("dssisrol"));
            	  });
            	  
              }
          },
          
          sorters: [
        	  {
        			direction: 'asc',
        			property:	"nmordina"
        	  }

          ],
        
                   
                        
});