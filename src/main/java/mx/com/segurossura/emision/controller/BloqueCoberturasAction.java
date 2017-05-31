package mx.com.segurossura.emision.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.controller.PrincipalCoreAction;

import mx.com.segurossura.emision.service.BloqueCoberturasManager;
import mx.com.segurossura.emision.service.EmisionManager;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/coberturas")
public class BloqueCoberturasAction extends PrincipalCoreAction{

	private Map<String,String> params;
	private boolean            success;
	private String             message;
	private List<Map<String, String>> list;
	private Map<String, List<Map<String, String>>> componentes;
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
	private BloqueCoberturasManager bloqueCoberturasManager;
	
	

	@Action(		
	        value = "obtieneMpoligar", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMpoligar(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneMpoligar ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			String pv_cdunieco_i= params.get("pv_cdunieco_i");
			 String pv_cdramo_i= params.get("pv_cdramo_i");
			 String pv_estado_i= params.get("pv_estado_i");
			String pv_nmpoliza_i= params.get("pv_nmpoliza_i");
			 String pv_nmsituac_i= params.get("pv_nmsituac_i");
			 String pv_cdgarant_i= params.get("pv_cdgarant_i");
			 String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
			 
            
            
			list=bloqueCoberturasManager.obtieneMpoligar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdgarant_i, pv_nmsuplem_i);
			logger.debug("-->"+list);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneMpoligar ######"
				,"\n###################"
				));
		return result;
	}
	

	@Action(		
	        value = "movimientoMpoligar", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String movimientoMpoligar(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoMpoligar ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			 String  Gn_Cdunieco= params.get("cdunieco");
			 String  Gn_Cdramo= params.get("cdramo"); 
			 String  Gv_Estado= params.get("estado"); 
			 String  Gn_Nmpoliza= params.get("nmpoliza");
						                                            
			 String  Gn_Nmsituac= params.get("nmsituac");
			 String  Gn_Nmsuplem_Session= params.get("nmsuplem");
			 String  Gv_Cdgarant= params.get("cdgarant"); 
			 String  Gn_Cdcapita= params.get("cdcapita"); 
			 String  Gd_Fevencim= params.get("fevencim");
						                                            
			 String  Gv_Accion= params.get("accion");
			
			 
			 logger.debug(Utils.join("### Gn_Cdunieco=", 				Gn_Cdunieco));
			 logger.debug(Utils.join("### Gn_Cdramo=",                Gn_Cdramo)); 
			 logger.debug(Utils.join("### Gv_Estado=",                Gv_Estado)); 
			 logger.debug(Utils.join("### Gn_Nmpoliza=",              Gn_Nmpoliza));
						                                            
			 logger.debug(Utils.join("### Gn_Nmsituac=",              Gn_Nmsituac));
			 logger.debug(Utils.join("### Gn_Nmsuplem_Session=",      Gn_Nmsuplem_Session));
			 logger.debug(Utils.join("### Gv_Cdgarant=",              Gv_Cdgarant)); 
			 logger.debug(Utils.join("### Gn_Cdcapita=",              Gn_Cdcapita)); 
			 logger.debug(Utils.join("### Gd_Fevencim=",              Gd_Fevencim));
						                                            
			 logger.debug(Utils.join("#### Gv_Accion=",                 Gv_Accion));
            
			bloqueCoberturasManager.movimientoMpoligar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Session, Gv_Cdgarant, Gn_Cdcapita, "null".equals(Gd_Fevencim)?null:renderFechas.parse(Gd_Fevencim), Gv_Accion);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoMpoligar ######"
				,"\n################################"
				));
		return result;
	}
	

	@Action(		
	        value = "obtieneTatrigar", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        },
	        		interceptorRefs = {
	        	            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) }
	    )	
	public String obtieneTatrigar(){
		logger.debug(StringUtils.join(
				 "\n#############################"
				,"\n###### obtieneTatrigar ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(list, "No se recibieron datos");
			
			Map<String,String> datos=list.get(0);
			
			String pv_cdramo_i= datos.get("cdramo");
			String pv_cdtipsit_i= datos.get("cdtipsit");
			String pv_cdgarant_i= datos.get("cdgarant");
			String pv_cdatribu_i= datos.get("cdatribu");
			String pantalla=datos.get("pantalla");
			Utils.validate(pv_cdramo_i,"No hay ramo");
			Utils.validate(pv_cdtipsit_i,"No hay cdtipsit");
			Utils.validate(pv_cdgarant_i,"No hay cdgarant");
			Utils.validate(pantalla,"No hay pantalla");
			
			componentes= new HashMap<String, List<Map<String,String>>>();
            componentes.put(
            		pantalla, 
            		bloqueCoberturasManager.obtieneTatrigar(pv_cdramo_i, pv_cdtipsit_i, pv_cdgarant_i, pv_cdatribu_i));
			//slist1=emisionManager.obtieneTatrigar(pv_cdramo_i, pv_cdtipsit_i, pv_cdgarant_i, pv_cdatribu_i);
			
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneTatrigar ######"
				,"\n#############################"
				));
		return result;
	}
	

	@Action(		
	        value = "guardarCoberturas", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        },
	        		interceptorRefs = {
	        	            @InterceptorRef(value = "json", params = { "enableSMD", "true", "ignoreSMDMethodInterfaces", "false" }) }
	    )	
	public String guardarCoberturas(){
		logger.debug(StringUtils.join(
				 "\n#############################"
				,"\n###### guardarCoberturas ######"
				));
		
		
		try
		{
			
			logger.debug("### "+list);
			logger.debug("### "+params);
			
			Utils.validate(params,"No hay parametros de entrada");
			Utils.validate(list,"No hay parametros de entrada");
			String  pv_cdunieco_i = params.get("cdunieco"), 
					pv_cdramo_i   = params.get("cdramo"), 
					pv_estado_i   = params.get("estado"), 
					pv_nmpoliza_i = params.get("nmpoliza"), 
					pv_nmsituac_i = params.get("nmsituac"), 
					pv_cdtipsit_i = params.get("cdtipsit"), 
					pv_nmsuplem_i = params.get("nmsuplem"), 
					pv_cdgarant_i = params.get("cdgarant"), 
					pv_cdcapita_i = params.get("cdcapita");
			
			bloqueCoberturasManager.guardarCobertura(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i, pv_cdgarant_i, pv_cdcapita_i, list);
			success=true;
			
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### guardarCoberturas ######"
				,"\n###############################"
				));
		return SUCCESS;
	}
	

	@Action(		
	        value = "obtieneTvalogar", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneTvalogar(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneTvalogar ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			String pv_cdunieco_i= params.get("cdunieco");
			 String pv_cdramo_i= params.get("cdramo");
			 String pv_estado_i= params.get("estado");
			String pv_nmpoliza_i= params.get("nmpoliza");
			 String pv_nmsituac_i= params.get("nmsituac");
			 String pv_cdgarant_i= params.get("cdgarant");
			 String pv_nmsuplem_i= params.get("nmsuplem");
			 
            
            
			list=bloqueCoberturasManager.obtieneTvalogar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdgarant_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneTvalogar ######"
				,"\n###################"
				));
		return result;
	}
	
	
	

	@Action(		
	        value = "obtieneMpolicap", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMpolicap(){
		logger.debug(StringUtils.join(
				 "\n#############################"
				,"\n###### obtieneMpolicap ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			
			String pv_cdunieco_i= params.get("cdunieco");
			 String pv_cdramo_i= params.get("cdramo");
			 String pv_estado_i= params.get("estado");
			String pv_nmpoliza_i= params.get("nmpoliza");
			 String pv_nmsituac_i= params.get("nmsituac");
			 String pv_cdcapita_i= params.get("cdcapita");
			 String pv_nmsuplem_i= params.get("nmsuplem");
            
            
			list=bloqueCoberturasManager.obtieneMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdcapita_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneMpolicap ######"
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(		
	        value = "agregarCobertura", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String agregarCobertura(){
		logger.debug(StringUtils.join(
				 "\n#############################"
				,"\n###### agregarCobertura ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			
			logger.debug(list);
			

			 
            
            
			//list=emisionManager.obtieneMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdcapita_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### agregarCobertura ######"
				,"\n###################"
				));
		return result;
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
	

	
	
	
}
