Ext.define("Ice.store.bloque.mesacontrol.historial.TurnadosStore",{
        extend      :   'Ext.data.Store',
        alias       :   'store.turnadosstore',

        autoLoad	:	true,
        
        config		:	{
        	ntramite	:	null
        },
        
        fields      :   ["fefecha",
            "ntramite",
            "cdusuari",
            "cdsisrol",
            "status",
            "cdunidspch",
            "cdtipasig",
            "cdusuari_fin",
            "cdsisrol_fin",
            "status_fin",
            "fefecha_fin"],
                        
          constructor:function(config){
        	  config = config || {};
        	  
        	  config.proxy={
                      type        : 'ajax',
                      url         : Ice.url.bloque.mesacontrol.historial.obtenerThmesacontrol,
                      extraParams : {
                          'params.ntramite'   : this.getNtramite()
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
//            	  store.removeAll()
//            	  store.setData([ { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4, other: 3 }])
            	  
//            	  data.forEach(function(it){
//            		  Ice.log("load store",it)
//                	  var d=it.get("fefecha");
//                	  
//                	  var f=d.split(" ")[0];
//                	  var hora=d.split(" ")[1];
//                	  var arr=f.split("/");
//                	   f=new Date(Number(arr[2]),Number(arr[1])-1,Number(arr[0]),Number(hora.split(":")[0]),Number(hora.split(":")[1]));
//                	  Ice.log("fecha ini",f.getTime());
//                	   it.set("fefecha",f.getTime());
//                	   Ice.log("fecha ini",it.get("fefecha"));
//                	   
//                	   //it.set("usuarioY",it.get("cdusuari")+"-"+it.get("dssisrol_fin"))
//            	  });
//            	  
              }
          },
          
          sorters: [
        	  {
        			direction: 'asc',
        			property:	"nmordina"

        	  }

          ],
        
                   
                        
});