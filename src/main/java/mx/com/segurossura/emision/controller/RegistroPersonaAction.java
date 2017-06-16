package mx.com.segurossura.emision.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.service.BloqueCoberturasManager;
import mx.com.segurossura.emision.service.RegistroPersonaManager;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/registroPersona")
public class RegistroPersonaAction extends PrincipalCoreAction{
	
	    private static final Logger logger = LoggerFactory.getLogger(RegistroPersonaAction.class);
		private Map<String,String> params;
		private Map<String,String> tvaloper;
		private Map<String,String> mpersona;
		private boolean            success;
		private String             message;
		private String 			   accion;
		private List<Map<String, String>> list;
		private Map<String, List<Map<String, String>>> componentes;
		
		@Autowired
		private BloqueCoberturasManager bloqueCoberturasManager;
		
		@Autowired
		private RegistroPersonaManager registroPersonaManager;
		
		 @Action(        
		            value = "obtieneTatriper",
		            results = { 
		                @Result(name = "success", type = "json") 
		            },
	        		interceptorRefs = {
	        	            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) }
	    
		        )   
		    public String obtieneTatriper() {
		        
		    	logger.debug(StringUtils.join(
						 "\n###################"
						,"\n###### obtieneTatriper ######"
						));
		        try {
		            
		        	
		        	componentes= new HashMap<String, List<Map<String,String>>>();
		            componentes.put(
		            		"TATRIPER", 
		            		bloqueCoberturasManager.obtieneTatrigar("501", "51", "5106", null));
		            
		            logger.debug("Datos de Tarificacion: {}", list);
		            
		            success = true;
		        } catch (Exception ex) {
		            success=false;
		            message = Utils.manejaExcepcion(ex);
		        }
		        logger.debug(StringUtils.join(
						 "\n###### obtieneTatriper ######"
						,"\n###################"
						));
		        return SUCCESS;
		    }
		 
		 @Action(        
		            value = "guardarPersona",
		            results = { 
		                @Result(name = "success", type = "json") 
		            },
	        		interceptorRefs = {
	        	            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) }
	    
		        )   
		    public String guardarPersona() {
		        
		    	logger.debug(StringUtils.join(
						 "\n###################"
						,"\n###### guardarPersona ######"
						));
		        try {
		            
		        	
		        	
		            
		            logger.debug("Datos de Enviados: {} {}", tvaloper,mpersona);
		            
		            success = true;
		        } catch (Exception ex) {
		            success=false;
		            message = Utils.manejaExcepcion(ex);
		        }
		        logger.debug(StringUtils.join(
						 "\n###### guardarPersona ######"
						,"\n###################"
						));
		        return SUCCESS;
		    }
		    
		    @Action(        
		            value = "movimientoDomicilio",
		            results = { 
		                @Result(name = "success", type = "json") 
		            },
	        		interceptorRefs = {
	        	            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) }
	    
		        )   
		    public String movimientoDomicilio() {
		        
		    	logger.debug(StringUtils.join(
						 "\n###################"
						,"\n###### movimientoDomicilio ######"
						));
		        try {
		            
		        	
		        	
		            
		            logger.debug("Datos de Enviados: {} ", params);
		            
		            success = true;
		        } catch (Exception ex) {
		            success=false;
		            message = Utils.manejaExcepcion(ex);
		        }
		        logger.debug(StringUtils.join(
						 "\n###### movimientoDomicilio ######"
						,"\n###################"
						));
		        return SUCCESS;
		    }
		
		    
		    @Action(        
		            value = "obtieneCdpost",
		            results = { 
		                @Result(name = "success", type = "json") 
		            }
		           
		            )   
		    public String obtieneCdpost() {
		        
		    	logger.debug(StringUtils.join(
						 "\n###########################"
						,"\n###### obtieneCdpost ######"
						));
		        try {
		            
		        	
		            logger.debug("Datos de Enviados: {} ", params);
		            
		            String pv_cdcodpos_i=params.get("cdcodpos");
		            String pv_cdprovin_i=params.get("cdprovin");
		            String pv_cdmunici_i=params.get("dsmunici");
		            String pv_cdciudad_i=params.get("cdciudad");
		            boolean b=StringUtils.isBlank(pv_cdcodpos_i) && StringUtils.isBlank(pv_cdprovin_i) && StringUtils.isBlank(pv_cdmunici_i) && StringUtils.isBlank(pv_cdciudad_i); 
		            if (b) throw new ApplicationException("No hay datos para busqueda");
		            
		            list=registroPersonaManager.lovCdpost(pv_cdcodpos_i, pv_cdprovin_i, pv_cdmunici_i, pv_cdciudad_i);
		            success = true;
		        } catch (Exception ex) {
		            success=false;
		            message = Utils.manejaExcepcion(ex);
		        }
		        logger.debug(StringUtils.join(
						 "\n###### obtieneCdpost ######"
						,"\n###########################"
						));
		        return SUCCESS;
		    }
		
		public Map<String, String> getParams() {
			return params;
		}
		public void setParams(Map<String, String> params) {
			this.params = params;
		}
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public List<Map<String, String>> getList() {
			return list;
		}
		public void setList(List<Map<String, String>> list) {
			this.list = list;
		}
		public Map<String, List<Map<String, String>>> getComponentes() {
			return componentes;
		}
		public void setComponentes(Map<String, List<Map<String, String>>> componentes) {
			this.componentes = componentes;
		}
		public static Logger getLogger() {
			return logger;
		}

		public Map<String, String> getTvaloper() {
			return tvaloper;
		}

		public void setTvaloper(Map<String, String> tvaloper) {
			this.tvaloper = tvaloper;
		}

		public Map<String, String> getMpersona() {
			return mpersona;
		}

		public void setMpersona(Map<String, String> mpersona) {
			this.mpersona = mpersona;
		}
		

		
}
