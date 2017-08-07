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
          },
          
          sorters: [
        	  {
        			direction: 'asc',
        			property:	"nmordina"

        	  }

          ],
        
                   
                        
});