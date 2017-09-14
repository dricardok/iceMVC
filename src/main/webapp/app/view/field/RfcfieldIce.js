Ext.define('Ice.view.field.RfcfieldIce', {
    extend: 'Ice.view.field.TextfieldIce',
    xtype: 'rfcfieldice',
    config	:	{
    	tipoPer: null // F fisica 1 o M moral 2
    },
    constructor : function(config){
    	var me=this,
    		paso='creado rfcfield';
    	try{
    		config.tipoPer=config.padres;
    		config.listeners={
    				blur : function(it){
    					var paso = 'verificando RFC';
    					try{
    						var ref=it.getTipoPer()[0];
    						if(Ext.isNumeric(ref)){
    							ref='otvalor' + (('x000' + ref).slice(Number(ref) > 100 ? -3 : -2));
    						}
    						var pad = it.up().down('[reference='+ref+']')
    						var tipoPersona = pad.getValue() ;
    						var rfc = it.getValue() || '';
    						var res;
    						rfc = rfc.toUpperCase();
    						Ice.log("RFC:",tipoPersona," . ",rfc);
    						if(Number(tipoPersona) == 1) {// Persona fisica
    				        	Ice.log('fisica');
    				        	res=/[A-Z&Ñ]{4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]/.test(rfc);
    				        	
    				        } else if(Number(tipoPersona) == 2  || tipoPersona == 'S') { // Persona moral y regimen Simplificado
    				        	Ice.log('moral');
    				        	res=/[A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]/.test(rfc);
    				        	
    				        } else {
    				            throw 'Error en la validacion, tipo de persona invalido: "' + tipoPersona + '"';
    				        }
    						
    						if(!res){
    			    			throw 'RFC inválido';
    			    		}
    					}catch(e){
    						Ice.manejaExcepcion(e,paso);
    						it.setValue('');
    					}
    				}
    		}
    	}catch(e){
    		Ice.manejaExcepcion(e,paso);
    	}
    	me.callParent(arguments);
    }
    
});