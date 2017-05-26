package mx.com.segurossura.emision.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.emision.service.AuthenticationManager;
import mx.com.segurossura.emision.service.EmisionManager;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
public class EmisionAction extends PrincipalCoreAction {

	private Map<String,String> params;
	private boolean            success;
	private String             message;
	private List<Map<String, String>> slist1;
	private Map<String, List<Map<String, String>>> componentes;
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
	private EmisionManager emisionManager;
	
	
	@Action(
	        value = "movimientoMpolisit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String movimientoMpolisit(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoMpolisit ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			String Gn_Cdunieco			= params.get("Cdunieco");
			String Gn_Cdramo			= params.get("Cdramo");
			String Gv_Estado			= params.get("Estado");
			String Gn_Nmpoliza			= params.get("Nmpoliza");
			String Gn_Nmsituac			= params.get("Nmsituac");
			String Gn_Nmsuplem_Sesion	= params.get("Nmsuplem_Sesion");
			String Gn_Nmsuplem_Bean		= params.get("Nmsuplem_Bean");
			String Gv_Status			= params.get("Status");
			String Gv_Cdtipsit			= params.get("Cdtipsit");
			String Gv_Swreduci			= params.get("Swreduci");
			String Gn_Cdagrupa			= params.get("Cdagrupa");
			String Gn_Cdestado			= params.get("Cdestado");
			String Gf_Fefecsit			= params.get("Fefecsit");
			String Gf_Fecharef			= params.get("Fecharef");
			String Gv_Indparbe			= params.get("Indparbe");
			String Gf_Feinipbs			= params.get("Feinipbs");
			String Gn_Porparbe			= params.get("Porparbe");
			String Gn_Intfinan			= params.get("Intfinan");
			String Gn_Cdmotanu			= params.get("Cdmotanu");
			String Gf_Feinisus			= params.get("Feinisus");
			String Gf_Fefinsus			= params.get("Fefinsus");
			String Gv_Accion            = params.get("Accion");
			
			 logger.debug(Utils.join("### Gn_Cdunieco=",Gn_Cdunieco		));
			 logger.debug(Utils.join("### Gn_Cdramo=",Gn_Cdramo			));
			 logger.debug(Utils.join("### Gv_Estado=",Gv_Estado			));
			 logger.debug(Utils.join("### Gn_Nmpoliza=",Gn_Nmpoliza		));
			 logger.debug(Utils.join("### Gn_Nmsituac=",Gn_Nmsituac		));
			 logger.debug(Utils.join("### Gn_Nmsuplem_Sesion=",Gn_Nmsuplem_Sesion));
			 logger.debug(Utils.join("### Gn_Nmsuplem_Bean=",Gn_Nmsuplem_Bean	));
			 logger.debug(Utils.join("### Gv_Status=",Gv_Status			));
			 logger.debug(Utils.join("### Gv_Cdtipsit=",Gv_Cdtipsit		));
			 logger.debug(Utils.join("### Gv_Swreduci=",Gv_Swreduci		));
			 logger.debug(Utils.join("### Gn_Cdagrupa=",Gn_Cdagrupa		));
			 logger.debug(Utils.join("### Gn_Cdestado=",Gn_Cdestado		));
			 logger.debug(Utils.join("### Gf_Fefecsit=",Gf_Fefecsit		));
			 logger.debug(Utils.join("### Gf_Fecharef=",Gf_Fecharef		));
			 logger.debug(Utils.join("### Gv_Indparbe=",Gv_Indparbe		));
			 logger.debug(Utils.join("### Gf_Feinipbs=",Gf_Feinipbs		));
			 logger.debug(Utils.join("### Gn_Porparbe=",Gn_Porparbe		));
			 logger.debug(Utils.join("### Gn_Intfinan=",Gn_Intfinan		));
			 logger.debug(Utils.join("### Gn_Cdmotanu=",Gn_Cdmotanu		));
			 logger.debug(Utils.join("### Gf_Feinisus=",Gf_Feinisus		));
			 logger.debug(Utils.join("### Gf_Fefinsus=",Gf_Fefinsus		));
			 logger.debug(Utils.join("### Gv_Accion=",Gv_Accion			));
            
            
			emisionManager.movimientoMpolisit(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Sesion, Gn_Nmsuplem_Bean, Gv_Status, Gv_Cdtipsit, Gv_Swreduci, Gn_Cdagrupa, Gn_Cdestado, Gf_Fefecsit, Gf_Fecharef, Gv_Indparbe, Gf_Feinipbs, Gn_Porparbe, Gn_Intfinan, Gn_Cdmotanu, Gf_Feinisus, Gf_Fefinsus, Gv_Accion);
            
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoMpolisit ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(
	        value = "movimientoTvalosit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String movimientoTvalosit(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoTvalosit ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			 String  Gn_Cdunieco= params.get("Cdunieco");
			 String  Gn_Cdramo= params.get("Cdramo");
			 String  Gv_Estado= params.get("Estado");
			 String  Gn_Nmpoliza= params.get("Nmpoliza");
			 String  Gn_Nmsituac= params.get("Nmsituac");
			 String  Gv_Cdtipsit= params.get("Cdtipsit");
			 String  Gn_Cdatribu= params.get("Cdatribu");
			 String  Gn_Nmsuplem= params.get("Nmsuplem");
			 String  Gv_Otvalor= params.get("Otvalor");
			 String  Gv_Accion= params.get("Accion");
			 
			 logger.debug(Utils.join("### Gn_Cdunieco= ",Gn_Cdunieco));
			 logger.debug(Utils.join("### Gn_Cdramo= ",  Gn_Cdramo));
			 logger.debug(Utils.join("### Gv_Estado= ",  Gv_Estado));
			 logger.debug(Utils.join("### Gn_Nmpoliza= ",Gn_Nmpoliza));
			 logger.debug(Utils.join("### Gn_Nmsituac= ",Gn_Nmsituac));
			 logger.debug(Utils.join("### Gv_Cdtipsit= ",Gv_Cdtipsit));
			 logger.debug(Utils.join("### Gn_Cdatribu= ",Gn_Cdatribu));
			 logger.debug(Utils.join("### Gn_Nmsuplem= ",Gn_Nmsuplem));
			 logger.debug(Utils.join("### Gv_Otvalor= ", Gv_Otvalor));
			 logger.debug(Utils.join("### Gv_Accion= ",  Gv_Accion));
            
			emisionManager.movimientoTvalosit(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gv_Cdtipsit, Gn_Cdatribu, Gn_Nmsuplem, Gv_Otvalor, Gv_Accion);
			
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoMpolisit ######"
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
            
			emisionManager.movimientoMpoligar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Session, Gv_Cdgarant, Gn_Cdcapita, "null".equals(Gd_Fevencim)?null:renderFechas.parse(Gd_Fevencim), Gv_Accion);
			
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
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(		
	        value = "movimientoTvalogar", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String movimientoTvalogar(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoTvalogar ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			 String  Gn_Cdunieco= params.get("Gn_Cdunieco");
			 String  Gn_Cdramo= params.get("Gn_Cdramo");
			 String  Gv_Estado= params.get("Gv_Estado");
			 String  Gn_Nmpoliza= params.get("Gn_Nmpoliza");
			 String  Gn_Cdatribu= params.get("Gn_Cdatribu");
			 String  Gn_Nmsuplem= params.get("Gn_Nmsuplem");
			 String  Gn_Nmsituac= params.get("Gn_Nmsituac");
			 String  Gv_Cdgarant= params.get("Gv_Cdgarant");
			 String  Gv_Otvalor= params.get("Gv_Otvalor");
			 String  Gv_Accion= params.get("Gv_Accion");
			
			 logger.debug(Utils.join("### Gn_Cdunieco=", Gn_Cdunieco));
			 logger.debug(Utils.join("### Gn_Cdramo=",   Gn_Cdramo));
			 logger.debug(Utils.join("### Gv_Estado=",   Gv_Estado));
			 logger.debug(Utils.join("### Gn_Nmpoliza=", Gn_Nmpoliza));
			 logger.debug(Utils.join("### Gn_Cdatribu=", Gn_Cdatribu));
			 logger.debug(Utils.join("### Gn_Nmsuplem=", Gn_Nmsuplem));
			 logger.debug(Utils.join("### Gn_Nmsituac=", Gn_Nmsituac));
			 logger.debug(Utils.join("### Gv_Cdgarant=", Gv_Cdgarant));
			 logger.debug(Utils.join("### Gv_Otvalor=",  Gv_Otvalor));
			 logger.debug(Utils.join("### Gv_Accion=",   Gv_Accion));
			 
            
            
			emisionManager.movimientoTvalogar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Cdatribu, Gn_Nmsuplem, Gn_Nmsituac, Gv_Cdgarant, Gv_Otvalor, Gv_Accion);
			
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoTvalogar ######"
				,"\n###################"
				));
		return result;
	}
	
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
			 
            
            
			slist1=emisionManager.obtieneMpoligar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdgarant_i, pv_nmsuplem_i);
			
			
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
	        value = "obtieneMpolicap", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMpolicap(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneMpolicap ######"
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
			 String pv_cdcapita_i= params.get("pv_cdcapita_i");
			 String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
            
            
			slist1=emisionManager.obtieneMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdcapita_i, pv_nmsuplem_i);
			
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
			
			String pv_cdunieco_i= params.get("pv_cdunieco_i");
			 String pv_cdramo_i= params.get("pv_cdramo_i");
			 String pv_estado_i= params.get("pv_estado_i");
			String pv_nmpoliza_i= params.get("pv_nmpoliza_i");
			 String pv_nmsituac_i= params.get("pv_nmsituac_i");
			 String pv_cdtipsit_i= params.get("pv_cdtipsit_i");
			 String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
			 
            
            
			slist1=emisionManager.obtieneTvalogar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i);
			
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
	        value = "obtieneMcapital", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMcapital(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneMcapital ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			String pv_cdramo_i= params.get("pv_cdramo_i");
			 String pv_cdcapita_i= params.get("pv_cdcapita_i");
			 
            
            
			slist1=emisionManager.obtieneMcapital(pv_cdramo_i, pv_cdcapita_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneMcapital ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "obtieneTgaranti", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneTgaranti(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneTgaranti ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			
			 
			String pv_cdgarant_i= params.get("pv_cdgarant_i");
            
			slist1=emisionManager.obtieneTgaranti(pv_cdgarant_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneTgaranti ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "movimientoMpolicap", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String movimientoMpolicap(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoMpolicap ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			String Gn_Cdunieco= params.get("Cdunieco");
			String Gn_Cdramo= params.get("Cdramo");
			String Gv_Estado= params.get("Estado");
			String Gn_Nmpoliza= params.get("Nmpoliza");
			String Gn_Nmsituac= params.get("Nmsituac");
			String Gn_Nmsuplem_Sesion= params.get("Nmsuplem_Sesion");
			String Gv_Swrevalo= params.get("Swrevalo");
			String Gv_Cdcapita= params.get("Cdcapita");
			String Gn_Ptcapita= params.get("Ptcapita");
			String Gn_Nmsuplem_Bloque= params.get("Nmsuplem_Bloque");
			String Gv_ModoAcceso= params.get("ModoAcceso");
			 
			emisionManager.movimientoMpolicap(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Sesion, Gv_Swrevalo, Gv_Cdcapita, Gn_Ptcapita, Gn_Nmsuplem_Bloque, Gv_ModoAcceso);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoMpolicap ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "obtieneTvalosit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneTvalosit(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneTvalosit ######"
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
			String pv_cdtipsit_i= params.get("pv_cdtipsit_i");
			String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
            
			slist1=emisionManager.obtieneTvalosit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneTvalosit ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "obtieneMpolizas", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMpolizas(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneMpolizas ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			
			String pv_cdunieco_i= params.get("pv_cdunieco_i");
			String pv_cdramo_i= params.get("pv_cdramo_i");
			String pv_estado_i= params.get("pv_estado_i");
			String pv_nmpoliza_i= params.get("pv_nmpoliza_i");
			
			String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
            
            
			slist1=emisionManager.obtieneMpolizas(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneMpolizas ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "obtieneTvalopol", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneTvalopol(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneTvalopol ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			
			String pv_cdunieco_i= params.get("pv_cdunieco_i");
			String pv_cdramo_i= params.get("pv_cdramo_i");
			String pv_estado_i= params.get("pv_estado_i");
			String pv_nmpoliza_i= params.get("pv_nmpoliza_i");
			String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
            
            
			slist1=emisionManager.obtieneTvalopol(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneTvalopol ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "movimientoMpolizas", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String movimientoMpolizas(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoMpolizas ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			
			String	Gn_Cdunieco= params.get("Cdunieco");
			String	Gn_Cdramo= params.get("Cdramo");
			String	Gv_Estado= params.get("Estado");
			String	Gn_Nmpoliza= params.get("Nmpoliza");
			String	Gn_NmsuplemBloque= params.get("NmsuplemBloque");
			String	Gn_NmsuplemSesion= params.get("NmsuplemSesion");
			String	Gv_Status= params.get("Status");
			String	Gv_Swestado= params.get("Swestado");
			String	Gn_Nmsolici= params.get("Nmsolici");
			Date	Gd_Feautori= renderFechas.parse(params.get("Feautori"));
			String	Gn_Cdmotanu= params.get("Cdmotanu");
			Date	Gd_Feanulac= renderFechas.parse(params.get("Feanulac"));
			String	Gv_Swautori= params.get("Swautori");
			String	Gv_Cdmoneda= params.get("Cdmoneda");
			Date	Gd_Feinisus= renderFechas.parse(params.get("Feinisus"));
			Date	Gd_Fefinsus= renderFechas.parse(params.get("Fefinsus"));
			String	Gv_Ottempot= params.get("Ottempot");
			Date	Gd_Feefecto= renderFechas.parse(params.get("Feefecto"));
			String	Gv_Hhefecto= params.get("Hhefecto");
			Date	Gd_Feproren= renderFechas.parse(params.get("Feproren"));
			Date	Gd_Fevencim= renderFechas.parse(params.get("Fevencim"));
			String	Gn_Nmrenova= params.get("Nmrenova");
			Date	Gd_Ferecibo= renderFechas.parse(params.get("Ferecibo"));
			Date	Gd_Feultsin= renderFechas.parse(params.get("Feultsin"));
			String	Gn_Nmnumsin= params.get("Nmnumsin");
			String	Gv_Cdtipcoa= params.get("Cdtipcoa");
			String	Gv_Swtarifi= params.get("Swtarifi");
			String	Gv_Swabrido= params.get("Swabrido");
			Date	Gd_Feemisio= renderFechas.parse(params.get("Feemisio"));
			String	Gn_Cdperpag= params.get("Cdperpag");
			String	Gn_Nmpoliex= params.get("Nmpoliex");
			String	Gv_Nmcuadro= params.get("Nmcuadro");
			String	Gn_Porredau= params.get("Porredau");
			String	Gv_Swconsol= params.get("Swconsol");
			String	Gn_Nmpolcoi= params.get("Nmpolcoi");
			String	Gv_Adparben= params.get("Adparben");
			String	Gn_Nmcercoi= params.get("Nmcercoi");
			String	Gn_Cdtipren= params.get("Cdtipren");
			String	Gv_Accion= params.get("Accion");
            
			emisionManager.movimientoMpolizas(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_NmsuplemBloque, Gn_NmsuplemSesion, Gv_Status, Gv_Swestado, Gn_Nmsolici, Gd_Feautori, Gn_Cdmotanu, Gd_Feanulac, Gv_Swautori, Gv_Cdmoneda, Gd_Feinisus, Gd_Fefinsus, Gv_Ottempot, Gd_Feefecto, Gv_Hhefecto, Gd_Feproren, Gd_Fevencim, Gn_Nmrenova, Gd_Ferecibo, Gd_Feultsin, Gn_Nmnumsin, Gv_Cdtipcoa, Gv_Swtarifi, Gv_Swabrido, Gd_Feemisio, Gn_Cdperpag, Gn_Nmpoliex, Gv_Nmcuadro, Gn_Porredau, Gv_Swconsol, Gn_Nmpolcoi, Gv_Adparben, Gn_Nmcercoi, Gn_Cdtipren, Gv_Accion);
			
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoMpolizas ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "movimientoTvalopol", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String movimientoTvalopol(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### movimientoTvalopol ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			String Gn_Cdunieco= params.get("Cdunieco");
			String Gn_Cdramo= params.get("Cdramo");
			String Gv_Estado= params.get("Estado");
			String Gn_Nmpoliza= params.get("Nmpoliza");
			String Gn_Cdatribu= params.get("Cdatribu");
			String Gn_Nmsuplem= params.get("Nmsuplem");
			String Gv_Otvalor_New= params.get("Otvalor_New");
			String Gv_Otvalor_Old= params.get("Otvalor_Old");
			 
			emisionManager.movimientoTvalopol(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Cdatribu, Gn_Nmsuplem, Gv_Otvalor_New, Gv_Otvalor_Old);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### movimientoTvalopol ######"
				,"\n###################"
				));
		return result;
	}
	
	@Action(		
	        value = "generaNmpoliza", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String generaNmpoliza(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### generaNmpoliza ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
			
			String Gn_Nmpoliza= params.get("Nmpoliza");//opcional, puede ser nulo
			String Gn_Cdunieco= params.get("Cdunieco");
			String Gn_Cdramo= params.get("Cdramo");
			String Gv_Estado= params.get("Estado");
			String Gv_Swcolind= params.get("Swcolind");
			String Gn_Nmpolcoi= params.get("Nmpolcoi");
            
			String nmpoliza=emisionManager.generaNmpoliza(Gn_Nmpoliza, Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gv_Swcolind, Gn_Nmpolcoi);
			params.put("nmpoliza_nuevo", nmpoliza);
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### generaNmpoliza ######"
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(		
	        value = "obtieneMpolisit", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtieneMpolisit(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtieneMpolisit ######"
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
			String pv_nmsuplem_i= params.get("pv_nmsuplem_i");
            
            
			slist1=emisionManager.obtieneMpolisit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i);
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtieneMpolisit ######"
				,"\n#############################"
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
			
			Utils.validate(slist1, "No se recibieron datos");
			
			Map<String,String> datos=slist1.get(0);
			
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
            		emisionManager.obtieneTatrigar(pv_cdramo_i, pv_cdtipsit_i, pv_cdgarant_i, pv_cdatribu_i));
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

	public List<Map<String, String>> getSlist1() {
		return slist1;
	}

	public void setSlist1(List<Map<String, String>> slist1) {
		this.slist1 = slist1;
	}

	public Map<String, List<Map<String, String>>> getComponentes() {
		return componentes;
	}

	public void setComponentes(Map<String, List<Map<String, String>>> componentes) {
		this.componentes = componentes;
	}
	
	
	
	
	
}
