package mx.com.segurossura.emision.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
		private List<Map<String, String>> listas;
		private Map<String, List<Map<String, String>>> componentes;
		private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
		
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
					 "\n#############################"
					,"\n###### obtieneTatriper ######"
					));
	        try {
	            
	        	logger.debug("secciones: "+list);
	        	
	        	Map<String,String> datos=list.get(0);
				
				String pv_cdramo_i= datos.get("cdramo");
				String pv_cdrol_i= datos.get("cdrol");
				
				String pantalla=datos.get("pantalla");
				Utils.validate(pv_cdramo_i,"No hay ramo");
				Utils.validate(pv_cdrol_i,"No hay cdtipsit");
				
	        	componentes= new HashMap<String, List<Map<String,String>>>();
	            componentes.put(
	            		pantalla, 
	            		registroPersonaManager.obtieneAttrXRol(pv_cdramo_i, pv_cdrol_i.toUpperCase())
	            		);
	            
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
					 "\n############################"
					,"\n###### guardarPersona ######"
					));
	        try {
	            
	            logger.debug("Datos de Enviados: {} {} \n {} \n {} ", tvaloper,mpersona,params,accion);
	            String  cdperson = params!=null?params.get("cdperson"):null;
	            String  cdtipide = mpersona.get("cdtipide");
	            String  cdideper = mpersona.get("cdideper");
	            
	            String  dsnombr1 = mpersona.get("dsnombr1");
	            String  dsnombr2 = mpersona.get("dsnombr2");
	            String  dsapell1 = mpersona.get("dsapell1");
	            String  dsapell2 = mpersona.get("dsapell2");
	            
	            String  dsnombre = Utils.join(dsnombr1," ",
	            							  dsnombr2," ",
	            							  dsapell1," ",
	            							  dsapell2);
	            
	            String  cdtipper = mpersona.get("cdtipper");
	            String  otfisjur = mpersona.get("otfisjur");
	            String  otsexo = mpersona.get("otsexo");
	            String  fenacimi = mpersona.get("fenacimi");
	            String  cdprovin = mpersona.get("cdprovin");
	            
	            Utils.validate(cdtipide,"No se recibió tipo de identificador");
	            Utils.validate(cdideper,"No se recibió  identificador");
	            Utils.validate(dsnombre,"No se recibió nombre");
	            Utils.validate(accion,"No se recibió acción");
	            if("I".equals(accion)){
	            	cdperson=registroPersonaManager.generaCdperson();
	            }
	            if(fenacimi!=null){
	            	fenacimi=fenacimi.split("T")[0];
	            }
	            
	            renderFechas= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
	            registroPersonaManager.movimientoMpersona(cdperson, cdtipide, cdideper, dsnombre, dsnombr1, dsnombr2, dsapell1, dsapell2, cdtipper, otfisjur, otsexo,
	            		"null".equals(fenacimi)?null:
	            			new SimpleDateFormat("dd/MM/yyyy").parse(fenacimi), 
	            				cdprovin, accion);
	            
	            registroPersonaManager.movimientoTvaloper(cdperson, tvaloper, accion);
	            
	            params=params==null?new HashMap():params;
	            params.put("cdperson", cdperson);
	            
	            
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
	            
	        	String  cdperson		 =  params.get("cdperson");
	        	String  nmorddom =  params.get("nmorddom");
	        	String  cdtipdom =  params.get("cdtipdom");
	        	String  dsdomici =  params.get("dsdomici");
	        	String  cdsiglas =  params.get("cdsiglas");
	        	String  cdidioma =  params.get("cdidioma");
	        	String  nmtelex =  params.get("nmtelex");
	        	String  nmfax =  params.get("nmfax");
	        	String  nmtelefo =  params.get("nmtelefo");
	        	String  cdpostal =  params.get("cdpostal");
	        	String  otpoblac =  params.get("otpoblac");
	        	String  cdpais =  params.get("cdpais");
	        	String  otpiso =  params.get("otpiso");
	        	String  nmnumero =  params.get("nmnumero");
	        	String  cdprovin =  params.get("cdprovin");
	        	String  dszona =  params.get("dszona");
	        	String  cdcoloni =  params.get("cdcoloni");
	        	
	        	Utils.validate(cdperson,"No se recibió cdperson");
	        	Utils.validate(cdtipdom,"No se recibió cdtipdom");
	        	Utils.validate(accion,"No se recibió accion");
	        	
	        	
	            
	            logger.debug("Datos de Enviados: {} ", params);
	            if(accion=="I") nmorddom=String.valueOf(registroPersonaManager.obtieneMdomicil(cdperson, null).size()+1);
	            logger.debug("Nmorddom generado: {}",nmorddom);
	            
	            registroPersonaManager.movimientoMdomicil(cdperson, nmorddom, cdtipdom, dsdomici, cdsiglas, cdidioma, nmtelex, nmfax, nmtelefo, cdpostal, otpoblac, cdpais, otpiso, nmnumero, cdprovin, dszona, cdcoloni, accion);
	            
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
	
	    
	    @Action(        
	            value = "obtienePersona",
	            results = { 
	                @Result(name = "success", type = "json") 
	            }
    
	        )   
	    public String obtienePersona() {
	        
	    	logger.debug(StringUtils.join(
					 "\n############################"
					,"\n###### obtienePersona ######"
					));
	        try {
	            
	        	logger.debug("Datos de Enviados: {} ", params);
	        	String cdperson=params.get("cdperson");
	        	Utils.validate(cdperson,"No se recibió cdperson");
	        	params= registroPersonaManager.obtieneTvaloper(cdperson).get(0);
	        	params.putAll(registroPersonaManager.obtieneMpersona(cdperson).get(0));
	        	logger.debug("..>",registroPersonaManager.obtieneMpersona(cdperson).get(0));
	            success = true;
	        } catch (Exception ex) {
	            success=false;
	            message = Utils.manejaExcepcion(ex);
	        }
	        logger.debug(StringUtils.join(
					 "\n###### obtienePersona ######"
					,"\n############################"
					));
	        return SUCCESS;
	    }
	    
	    @Action(        
	            value = "obtieneDomicilio",
	            results = { 
	                @Result(name = "success", type = "json") 
	            }
	        )   
	    public String obtieneDomicilio() {
	        
	    	logger.debug(StringUtils.join(
					 "\n############################"
					,"\n###### obtieneDomicilio ######"
					));
	        try {
	            
	        	logger.debug("Datos de Enviados: {} ", params);
	        	String cdperson=params.get("cdperson");
	        	String nmorddom=params.get("nmorddom");
	        	
	        	if(StringUtils.isBlank(cdperson)){
	        		listas=new ArrayList();
	        	}else{
	        		listas=registroPersonaManager.obtieneMdomicil(cdperson, nmorddom);
	        		list=listas;
	        	}
	        	
	        	if(nmorddom!=null && null!=listas.get(0)){
	        		params=listas.get(0);
	        	}
	        	
	        	
	            success = true;
	        } catch (Exception ex) {
	            success=false;
	            message = Utils.manejaExcepcion(ex);
	        }
	        logger.debug(StringUtils.join(
					 "\n###### obtieneDomicilio ######"
					,"\n############################"
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

		public List<Map<String, String>> getListas() {
			return listas;
		}

		public void setListas(List<Map<String, String>> listas) {
			this.listas = listas;
		}

		public String getAccion() {
			return accion;
		}

		public void setAccion(String accion) {
			this.accion = accion;
		}
		
		
		
		
		
		

		
}
