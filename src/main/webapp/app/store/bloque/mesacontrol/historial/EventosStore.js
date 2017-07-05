Ext.define("Ice.store.bloque.mesacontrol.historial.EventosStore",{
        extend      :   'Ext.data.Store',
        alias       :   'store.eventosstore',
        config		:	{
        	ntramite		:	null
        },
        autoLoad	:	true,
        
        fields      :   ["cdusuari_fin"
                        ,"cdusuari_ini"
                        ,"dsusuari_ini"
                        ,"dsusuari_fin"
                        ,"status"
                        ,"cdusuari_dest"
                        ,"cdtiptra"
                        ,"cdsisrol_dest"
                        ,"cdclausu"
                        ,"cdsisrol_ini"
                        ,"usuario_fin"
                        ,"fechaini"
                        ,"dsstatus"
                        ,"usuario_ini"
                        ,"ntramite"
                        ,"fechafin"
                        ,"dsusuari_dest"
                        ,"dssisrol_fin"
                        ,"comments"
                        ,"dssisrol_ini"
                        ,"cdmotivo"
                        ,"swagente"
                        ,"cdsisrol_fin"
                        ,"nmordina"
                        ,"dssisrol_dest"],
                        
          constructor:function(config){
        	  config.proxy={
                      type        : 'ajax',
                      url         : Ice.url.bloque.mesacontrol.historial.obtenerTdmesacontrol,
                      extraParams : {
                          'params.cdperson'   : config.cdperson
                      },
                      reader      : {
                          type : 'json',
                          rootProperty : 'list',
                          successProperty : 'success',
                          messageProperty : 'message'
                      }
                  } 
        	  this.callParent([config]);
          },
          
          listeners		:	{
              load		:	function(store, data){
            	  
            	  data.forEach(function(it){
            		  Ice.log("load store",it)
                	  var d=it.get("fechaini");
                	  
                	  var f=d.split(" ")[0];
                	  var hora=d.split(" ")[1];
                	  var arr=f.split("/");
                	   f=new Date(Number(arr[2]),Number(arr[1]),Number(arr[0]),Number(hora.split(":")[0]),Number(hora.split(":")[1]));
                	  Ice.log("fecha ini",f);
                	   it.set("fechaini",f.getTime());
            	  });
            	  
              }
          }
                   
                        
});