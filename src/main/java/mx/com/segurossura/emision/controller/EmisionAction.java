

package mx.com.segurossura.emision.controller;

import java.io.InputStream;
import java.lang.management.ManagementFactory;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Constantes;
import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.RolSistema;
import com.biosnettcs.portal.model.UsuarioVO;
import com.opensymphony.xwork2.ActionContext;

import mx.com.segurossura.emision.service.EmisionManager;
import mx.com.segurossura.general.documentos.model.Archivo;
import mx.com.segurossura.general.documentos.service.DocumentosManager;
import mx.com.segurossura.workflow.mesacontrol.model.FlujoVO;
import mx.com.segurossura.workflow.mesacontrol.model.TipoEndoso;
import mx.com.segurossura.workflow.mesacontrol.service.FlujoMesaControlManager;

@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/emision")
public class EmisionAction extends PrincipalCoreAction {
    
    private static final long serialVersionUID = 2454964992688068482L;

    private static final Logger logger = LoggerFactory.getLogger(EmisionAction.class);

	private Map<String,String> params;
	private boolean            success;
	private String             message;
	private List<String>	   bloques;
	private List<Map<String, String>> list;
	private List<String>	   errores;
	private String			   emitir;
	private FlujoVO            flujo;
	
	private InputStream fileInputStream;
    private String filename;
    protected String contentType;
	
	private Map<String, List<Map<String, String>>> componentes;
	private static SimpleDateFormat renderFechas = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
	private EmisionManager emisionManager;
	
	@Autowired
	private FlujoMesaControlManager flujoMesaControlManager;
	
	@Autowired
	private DocumentosManager documentosManager;
	
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
			 
            
            

			list=emisionManager.obtieneMcapital(pv_cdramo_i, pv_cdcapita_i);

			
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
            

			list=emisionManager.obtieneTgaranti(pv_cdgarant_i);

			
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
            
            

			list=emisionManager.obtieneMpolizas(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i);

			
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
			
			
			String cdunieco= params.get("cdunieco");
			String cdramo= params.get("cdramo");
			String estado= params.get("estado");
			String nmpoliza= params.get("nmpoliza");
			String nmsuplem= params.get("nmsuplem");
			
			Utils.validate(cdunieco,"Falta cdunieco",
					cdramo, "Falta cdramo",
					estado, "Falta estado",
					nmpoliza, "Falta nmpoliza",
					nmsuplem, "nmsuplem");
            
            
			params = emisionManager.obtenerTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
			
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
	        value = "validaciones", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String validaciones(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### validaciones ######"
				));
		
		String result = SUCCESS;
		
		try {
		    UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
			
			Utils.validate(params, "No se recibieron datos");
			
			String nmpoliza= params.get("nmpoliza");//opcional, puede ser nulo
			String cdunieco= params.get("cdunieco");
			String cdramo= params.get("cdramo");
			String estado= params.get("estado");
			String nmsituac= params.get("nmsituac");
			String nmsuplem= params.get("nmsuplem");
			
			
			Utils.validate(nmpoliza,"Falta nmpoliza");
			Utils.validate(cdunieco,"Falta cdunieco");
			Utils.validate(cdramo,"Falta cdramo");
			Utils.validate(estado,"Falta estado");
			Utils.validate(nmsituac,"Falta nmsituac");
			Utils.validate(nmsuplem,"Falta nmsuplem");
			
			

			//Utils.validate(nmsuplem,"Falta nmsuplem");
			Utils.validate(bloques,"Faltan bloques");
			list=emisionManager.ejecutarValidaciones(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, bloques, usuario.getCdusuari(),
			        usuario.getRolActivo().getCdsisrol());

			
			
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### validaciones ######"
				,"\n###################"
				));
		return result;
	}
	
	
    @Action(        
            value = "generarTarificacion", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String generarTarificacion() {
        
        logger.debug("Inicio generarTarificacion...");
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco");
            String cdramo =   params.get("cdramo");
            String estado =   params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            String nmsituac = "0".equals(params.get("nmsituac")) ? null : params.get("nmsituac");
            Utils.validate(cdunieco, "Falta cdunieco");
            Utils.validate(cdramo,   "Falta cdramo");
            Utils.validate(estado,   "Falta estado");
            Utils.validate(nmpoliza, "Falta nmpoliza");
            
            Map<String, Object> resultado = emisionManager.generarTarificacion(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                    usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol());
            logger.debug("resultado Tarificacion: {}", resultado);
            
            success=true;
        } catch (Exception ex) {
            success=false;
            message = Utils.manejaExcepcion(ex);
        }
        
        logger.debug("Fin generarTarificacion.");
        return SUCCESS;
    }
	
    
    @Action(        
            value = "generarTarificacionPlanes", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String generarTarificacionPlanes() {
    	logger.debug("Inicio generarTarificacion...");
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   ntramite = params.get("ntramite"),
                   nmsituac = "0".equals(params.get("nmsituac")) ? null : params.get("nmsituac");
            
            Utils.validate(cdunieco, "Falta cdunieco");
            Utils.validate(cdramo,   "Falta cdramo");
            Utils.validate(estado,   "Falta estado");
            Utils.validate(nmpoliza, "Falta nmpoliza");
            
            List<Map<String, Object>> resultados = emisionManager.generarTarificacionPlanes(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                    usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol());
            logger.debug("resultado Tarificacion: {}", resultados);
            
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        
        logger.debug("Fin generarTarificacion.");
        return SUCCESS;
    }
    
    @Action
    (
        value   = "vistaprevia",
        results = 
        {
                @Result(name="success", 
                        type="stream", 
                        params = {
                            "contentType"       ,"${contentType}",
                            "inputName"         ,"fileInputStream",
                            "bufferSize"        ,"4096",
                            "contentDisposition","inline; filename=\"${filename}\""
                        }
                )
        }
    ) 
    public String generarVistaPrevia() {
    	
    	logger.debug("#######################################"
    			   + "\n##### Inicio generarVistaPrevia...");
        try {
        	UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsituac = "0".equals(params.get("nmsituac")) ? null : params.get("nmsituac"),
                   cdperpag = params.get("cdperpag");
            
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza",
                           cdperpag , "Falta cdperpag");
            
            
            String url = emisionManager.generarVistaPrevia(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdperpag, usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol());
            
            Archivo archivo = documentosManager.obtenerDocumento(url, "CARATULA_COTI.pdf");
            fileInputStream = archivo.getFileInputStream();
            filename = archivo.getFilename();
            success = true;
            
        } catch(Exception ex){
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        
        logger.debug(StringUtils.join(                
               "\n###### Fin de generarVistaPrevia ######"
               ,"\n###### filename", filename
               ,"\n###### contentType", contentType,
               "\n#########################################"
               ));
        return SUCCESS;
    }
    
    
    @Action(        
            value = "generarTarificacionPlan", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String generarTarificacionPlan() {
    	logger.debug("Inicio generarTarificacion...");
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsituac = "0".equals(params.get("nmsituac")) ? null : params.get("nmsituac"),
                   cdperpag = params.get("cdperpag"),
                   ntramite = params.get("ntramite");
            
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza",
                           cdperpag , "Falta cdperpag");
            
            Map<String, Object> resultados = emisionManager.generarTarificacionPlan(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                    cdperpag, usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol());
            logger.debug("resultado Tarificacion: {}", resultados);
            
            // si no es agente, el tramite es obligatorio porque solo el agente puede confirmar cotizacion sin tramite
            if (StringUtils.isBlank(ntramite) && !RolSistema.AGENTE.getCdsisrol().equals(usuario.getRolActivo().getCdsisrol())) {
                throw new ApplicationException("No se soporta la generaci\u00f3n de tr\u00e1mite desde cotizaci\u00f3n para rol distinto a agente");
            }
            
            // se manda a actualizar el tramite o generar uno nuevo (para agente)
            String ntramiteNuevo = flujoMesaControlManager.confirmarTramiteDesdeCotizacion(ntramite, cdunieco, cdramo, estado, nmpoliza,
                    usuario.getCdusuari(), usuario.getRolActivo().getCdsisrol());
            
            // Si se genero un tramite nuevo (agente) recupero la referencia a pantalla cotizacion
            if (StringUtils.isNotBlank(ntramiteNuevo)) {
                flujo = flujoMesaControlManager.recuperarReferenciaFlujoCotizacionAgente(ntramiteNuevo, usuario.getRolActivo().getCdsisrol());
            }
            
            success = true;
        } catch (Exception ex) {
            success = false;
            message = Utils.manejaExcepcion(ex);
        }
        
        logger.debug("Fin generarTarificacion.");
        return SUCCESS;
    }
    
    
    @Action(        
            value = "obtenerDatosTarificacion", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String obtenerDatosTarificacion() {
        
        logger.debug("Inicio obtenerDatosTarificacion...");
        try {
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco");
            String cdramo =   params.get("cdramo");
            String estado =   params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            Utils.validate(cdunieco, "Falta cdunieco");
            Utils.validate(cdramo,   "Falta cdramo");
            Utils.validate(estado,   "Falta estado");
            Utils.validate(nmpoliza, "Falta nmpoliza");
            
            list = emisionManager.obtenerDatosTarificacion(cdunieco, cdramo, estado, nmpoliza);
            logger.debug("Datos de Tarificacion: {}", list);
            
            success = true;
        } catch (Exception ex) {
            success=false;
            message = Utils.manejaExcepcion(ex);
        }
        logger.debug("Fin obtenerDatosTarificacion.");
        return SUCCESS;
    }
    
    @Action(        
            value = "distribuirAgrupadores", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String distribuirAgrupadores() {
    	logger.debug("Inicio distribuirAgrupadores...");
    	try{
    		 Utils.validate(params, "No se recibieron datos");
             String cdunieco = params.get("cdunieco");
             String cdramo =   params.get("cdramo");
             String estado =   params.get("estado");
             String nmpoliza = params.get("nmpoliza");
             String nmsuplem = Utils.NVL(params.get("nmsuplem"), "0");
             
             Utils.validate(cdunieco, "Falta cdunieco");
             Utils.validate(cdramo,   "Falta cdramo");
             Utils.validate(estado,   "Falta estado");
             Utils.validate(nmpoliza, "Falta nmpoliza");
             
             emisionManager.distribuirAgrupadores(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
    		
    	}catch(Exception ex){
    		 success=false;
             message = Utils.manejaExcepcion(ex);
    	}
    	
    	return SUCCESS;
    }
        
    @Action(        
            value = "confirmarPoliza", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String confirmarPoliza() {
    	logger.debug(Utils.log("###### confirmarPoliza params = ", params));    	
    	
    	try {
    	    UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
    	    Utils.validate(params, "No se recibieron datos");
    	    String cdunieco  = params.get("cdunieco"),
    	           cdramo    = params.get("cdramo"),
    	           estado    = params.get("estado"),
    	           nmpoliza  = params.get("nmpoliza"),
    	           nmsuplem  = Utils.NVL(params.get("nmsuplem"), "0"),
    	           newestad  = params.get("newestad"),
    	           newpoliza = params.get("newpoliza"),
    	           pnmrecibo = params.get("pnmrecibo"),
    	           			   
    	        		       
    	           email 	 = StringUtils.isNotBlank( params.get("email") ) ? params.get("email"): null,
    	           nmtarjeta = StringUtils.isNotBlank( params.get("nmtarjeta") ) ? params.get("nmtarjeta") : null,
    	           orderId	 = StringUtils.isNotBlank( params.get("orderId") ) ? params.get("orderId") : null,
    	           authCode   = StringUtils.isNotBlank( params.get("authCode") ) ? params.get("authCode") : null,
    	           nmcotizacion = StringUtils.isNotBlank( params.get("nmcotizacion") ) ? params.get("nmcotizacion") : null,
    	           ntramite = params.get("ntramite");
    	           
    	    Utils.validate(cdunieco, "Falta cdunieco",
    	                   cdramo,   "Falta cdramo",
    	                   estado,   "Falta estado",
    	                   nmpoliza, "Falta nmpoliza",
    	                   ntramite, "Falta tr\u00e1mite");
    	    
    	    Map<String, String> resultado =  emisionManager.confirmarPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem, newestad,
    	            newpoliza, pnmrecibo, nmcotizacion, nmtarjeta, authCode, orderId, email, ntramite, usuario.getCdusuari(),
    	            usuario.getRolActivo().getCdsisrol());
    	    
    	    params = new HashMap<String, String>();
            params.put("nmpoliza", resultado.get("polizaemitida"));            
            params.put("cdunieco", resultado.get("cdunieco"));
            params.put("cdramo", resultado.get("cdramo"));
            params.put("estado", resultado.get("estado"));
            params.put("nmpoliza", resultado.get("nmpoliza"));
            params.put("nmsuplem", resultado.get("nmsuplem"));
            
    		success = true;
    	} catch (Exception ex) {
    	    message = Utils.manejaExcepcion(ex);
    	}
    	return SUCCESS;
    }
    
    @Action(        
            value = "realizarPago", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String realizarPago() {
    	logger.debug(Utils.log("###### confirmarPoliza params = ", params));
    	@SuppressWarnings("rawtypes")
		Map session = ActionContext.getContext().getSession();

		UsuarioVO user = (UsuarioVO) session.get(Constantes.USER);
		// Si el usuario completo existe en sesion:
        if (user != null && user.getRolActivo() != null && StringUtils.isNotBlank(user.getRolActivo().getCdsisrol())) {
			
            String pid = ManagementFactory.getRuntimeMXBean().getName();
            logger.info("Usuario en sesion: {} - {} \nRol Activo: {} - {}\npid: {}", 
                    user.getCdusuari(), user.getDsusuari(), 
                    user.getRolActivo().getCdsisrol(), user.getRolActivo().getDssisrol(), pid);
        }
    	
    	try {
    	    Utils.validate(params, "No se recibieron datos");
    	    
    	    String cdunieco  = params.get("cdunieco"),
    	           cdramo    = params.get("cdramo"),
    	           estado    = params.get("estado"),
    	           nmpoliza  = params.get("nmpoliza"),
    	           nmsuplem  = Utils.NVL(params.get("nmsuplem"), "0"),
    	           cdbanco   = params.get("cdbanco"),
    	           dsbanco   = params.get("dsbanco"),
    	           nmtarjeta = params.get("nmtarjeta"),
    	           codseg    = params.get("codseg"),
    	           fevencm    = params.get("fevencm"),
    	           fevenca    = params.get("fevenca"),
    	           nombre	 = params.get("nombre"),
    	           email 	 = params.get("email"),
    	           usuario = user.getCdusuari();
    	    
    	    Utils.validate(cdunieco, "Falta cdunieco",
    	                   cdramo,   "Falta cdramo",
    	                   estado,   "Falta estado",
    	                   nmpoliza, "Falta nmpoliza",
    	                   cdbanco,  "Falta cdbanco",
    	                   dsbanco,	 "Falta dsbanco",
    	                   nmtarjeta,"Falta nmtarjeta",
    	                   codseg,	 "Fata codseg",
    	                   fevencm,   "Falta fevencm,",
    	                   fevenca,	 "Falta fevenca",
    	                   nombre,   "Falta nombre",
    	                   email, 	 "Falta email");
    	    
    	    
    	    
    	    list = emisionManager.realizarPagoTarjeta(cdunieco, cdramo, estado, nmpoliza, nmsuplem, 
    	    															cdbanco, dsbanco, nmtarjeta, codseg, fevencm, 
    	    															fevenca, nombre, email, usuario);
    	    emisionManager.guardarDatosPagoTarjeta(cdunieco, cdramo, estado, nmpoliza, nmsuplem, cdbanco, nmtarjeta, fevencm, fevenca, email);
    	    //params.put("codaut", codigoautorizacion);
    	    
    	    
    		success = true;
    	} catch (Exception ex) {
    	    message = Utils.manejaExcepcion(ex);
    	}
    	return SUCCESS;
    }
    
    
    @Action(        
            value = "obtenerTarifaMultipleTemp", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        ) 
    public String obtenerTarifaMultipleTemp() {
    	logger.debug(Utils.log("###### obtenerTarifaMultipleTemp params = ", params));
    	try {
    	    Utils.validate(params, "No se recibieron datos");
    	    String cdunieco  = params.get("cdunieco"),
    	           cdramo    = params.get("cdramo"),
    	           estado    = params.get("estado"),
    	           nmpoliza  = params.get("nmpoliza");
    	           
    	    Utils.validate(cdunieco, "Falta cdunieco",
    	                   cdramo,   "Falta cdramo",
    	                   estado,   "Falta estado",
    	                   nmpoliza, "Falta nmpoliza");
    	    
    	    list = emisionManager.obtenerTarifaMultipleTemp(cdunieco, cdramo, estado, nmpoliza);
    	    logger.debug("Resultado tarificacion {}-{}-{}-{}: {}", cdunieco, cdramo, estado, nmpoliza, list);
    	    success = true;
    	} catch (Exception ex) {
    		success = false;
    	    message = Utils.manejaExcepcion(ex);
    	}
    	return SUCCESS;
    }
    
    @Action(        
            value = "obtenerDetalleTarifaTemp", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String obtenerDetalleTarifaTemp() {
    	logger.debug(Utils.log("###### obtenerDetalleTarifaTemp params = ", params));
    	try {
    	    Utils.validate(params, "No se recibieron datos");
    	    String cdunieco  = params.get("cdunieco"),
    	           cdramo    = params.get("cdramo"),
    	           estado    = params.get("estado"),
    	           nmpoliza  = params.get("nmpoliza"),
    	           cdperpag  = params.get("cdperpag");
    	           
    	    Utils.validate(cdunieco, "Falta cdunieco",
    	                   cdramo,   "Falta cdramo",
    	                   estado,   "Falta estado",
    	                   nmpoliza, "Falta nmpoliza",
    	                   cdperpag, "Falta cdperpag");
    	    
    	    list = emisionManager.obtenerDetalleTarifaTemp(cdunieco, cdramo, estado, nmpoliza, cdperpag);
    	    success = true;
    	} catch (Exception ex) {
    		success = false;
    	    message = Utils.manejaExcepcion(ex);
    	}
    	return SUCCESS;
    }
    
    @Action(        
            value = "validarCargaCotizacion", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String validarCargaCotizacion () {
        logger.debug(Utils.log("\n###### validarCargaCotizacion params: ", params));
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No hay datos para validar carga de cotizaci\u00f3n");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   nmpoliza = params.get("nmpoliza"),
                   cdusuari = usuario.getCdusuari(),
                   cdsisrol = usuario.getRolActivo().getCdsisrol();
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           nmpoliza , "Falta nmpoliza");
            params.putAll(emisionManager.validarCargaCotizacion(cdunieco, cdramo, nmpoliza, cdusuari, cdsisrol));
            success = true;
        } catch (Exception e) {
            message = Utils.manejaExcepcion(e);
        }
        return SUCCESS;
    }
    
    @Action(        
            value = "obtenerPerfilamientoPoliza", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        )   
    public String obtenerPerfilamientoPoliza () {
        logger.debug(Utils.log("\n###### obtenerDatosPerfilamiento params: ", params));
        try {
            UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
            Utils.validate(params, "No hay datos para obtener perfilamiento de p\u00f3liza");
            String cdunieco = params.get("cdunieco"),
                   cdramo   = params.get("cdramo"),
                   estado   = params.get("estado"),
                   nmpoliza = params.get("nmpoliza"),
                   nmsuplem = params.get("nmsuplem");
            nmsuplem = Utils.NVL(nmsuplem, "0");
            Utils.validate(cdunieco , "Falta cdunieco",
                           cdramo   , "Falta cdramo",
                           estado   , "Falta estado",
                           nmpoliza , "Falta nmpoliza",
                           nmsuplem , "Falta nmsuplem");
            params.putAll(emisionManager.obtenerPerfilamientoPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem));
            success = true;
        } catch (Exception e) {
            message = Utils.manejaExcepcion(e);
        }
        return SUCCESS;
    }
	
    @SuppressWarnings("unchecked")
	@Action(        
            value = "generarDocumentos", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        ) 
    public String generarDocumentos() {
    	logger.debug(Utils.log("\n###### generarDocumentos params: ", params));
    	try {
    		
    		UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
    		   	    
    	    
    	    Map<String, Object> resultado = new HashMap<String, Object>();
    	    
    	    if(flujo != null) {
        	    	logger.debug("FlujoVO  Tramite", ""+flujo.getNtramite(), ""+flujo.getAux());
        	    	//resultado = emisionManager.generarDocumentos(flujo.getCdunieco(), flujo.getCdramo(), flujo.getEstado(), flujo.getNmpoliza(), flujo.getNmsuplem(), null, flujo.getAux(), usuario.getCdusuari());
        	    	resultado = emisionManager.generarDocumentos(flujo.getNtramite(), TipoEndoso.EMISION_POLIZA.getCdTipSup().toString(), flujo.getAux(), usuario.getCdusuari());
    	    
    	    } 
    		else {   
    				Utils.validate(params, "No se recibieron datos");
        	    
    				String cdunieco  = params.get("cdunieco"),
    					   cdramo    = params.get("cdramo"),
    					   estado    = params.get("estado"),
    					   nmpoliza  = params.get("nmpoliza"),
    					   nmsuplem  = Utils.NVL(params.get("nmsuplem"), "0"),
    					   iscotizacion = params.get("iscotizacion"),
    					   ntramite	 = params.get("ntramite"),
    					   cdtipsup  = params.get("cdtipsup");
    				
    				Utils.validate(cdunieco, "Falta cdunieco",
     	                   //cdramo,   "Falta cdramo",
     	                   //estado,   "Falta estado",
     	                   //nmpoliza, "Falta nmpoliza",
     	                   iscotizacion, "Falta iscotizacion",
     	                   //cdtipsup, "Falta cdtipsup",
     	                   ntramite, "Falta ntramite"
     	                   );
    					
    			
        	    	resultado = emisionManager.generarDocumentos(ntramite, cdtipsup, iscotizacion, usuario.getCdusuari());
        
        	    	//resultado =  emisionManager.generarDocumentos(cdunieco, cdramo, estado, nmpoliza, nmsuplem, null, iscotizacion, usuario.getCdusuari());    	    	
    	    }
    	    
    	    errores = (List<String>) resultado.get("errores");
    	    
    	    success = true;
    	    message = "Documentos generados";
    	    
    	}catch(Exception ex){
    		message = Utils.manejaExcepcion(ex);
    		success = false;
    	}
    	
    	return SUCCESS;
    }
    
    @SuppressWarnings("unchecked")
	@Action(        
            value = "puedeEmitir", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        ) 
    public String puedeEmitir(){
    	logger.debug(Utils.log("\n###### puedeEmitir params: ", params));
    	try {
    		UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
    		Utils.validate(params, "No se recibieron datos");
    	    String cdunieco  = params.get("cdunieco"),
    	           cdramo    = params.get("cdramo"),
    	           estado    = params.get("estado"),
    	           nmpoliza  = params.get("nmpoliza"),
    	           nmsuplem  = Utils.NVL(params.get("nmsuplem"), "0");
    	           //iscotizacion = params.get("iscotizacion");
    	    
    	    Utils.validate(cdunieco, "Falta cdunieco",
    	                   cdramo,   "Falta cdramo",
    	                   estado,   "Falta estado",
    	                   nmpoliza, "Falta nmpoliza");
    	    list = emisionManager.puedeEmitir(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
    	    emitir = list.size()>0?"N":"S";
    	    logger.debug("Puede emitir: "+emitir);
    	    success = true;
    	    
    	}catch(Exception ex){
    		message = Utils.manejaExcepcion(ex);
    		success = false;
    	}
    	
    	return SUCCESS;
    }
    
    @Action(        
            value = "obtenerDuplicidad", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        ) 
    public String obtenerDuplicidad(){
        logger.debug(Utils.log("\n###### obtenerDuplicidad",
                "\n#### params: ", params));
        try {
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco");
            String cdramo   = params.get("cdramo");
            String feini    = params.get("fecini");
            String fefin    = params.get("fecfin");
            String nmsolici = params.get("nmsolici");
            String cdtipide = params.get("cdtipide");
            String cdideper = params.get("cdideper");
            String dsnombre = params.get("nombre");
            String cdgrupo  = params.get("cdgrupo");
            String cdsubgpo = params.get("cdsubgpo");
            String cdagente = params.get("cdagente");
            String cdpostal = params.get("cdpostal");
            String dsdomici = params.get("dsdomici");
            String nmnumero = params.get("nmnumero");
            String otpiso   = params.get("otpiso");
            list = emisionManager.obtenerDuplicidad(cdunieco, cdramo, feini, fefin, nmsolici, cdtipide, cdideper, dsnombre, cdgrupo, cdsubgpo, cdagente, cdpostal, dsdomici, nmnumero, otpiso);
            success = true;
        } catch(Exception ex) {
            message = Utils.manejaExcepcion(ex);
            success = false;
        }
        return SUCCESS;
    }
    
    @Action(        
            value = "obtenerDuplicidadPoliza", 
            results = { 
                @Result(name = "success", type = "json") 
            }
        ) 
    public String obtenerDuplicidadPoliza(){
        logger.debug(
                Utils.log("\n###### obtenerDuplicidadPoliza",
                          "\n###### params: ", params));
        try {
            Utils.validate(params, "No se recibieron datos");
            String cdunieco = params.get("cdunieco");
            String cdramo   = params.get("cdramo");
            String estado   = params.get("estado");
            String nmpoliza = params.get("nmpoliza");
            params.putAll(emisionManager.obtenerDuplicidadPoliza(cdunieco, cdramo, estado, nmpoliza));
            success = true;
        } catch(Exception ex) {
            message = Utils.manejaExcepcion(ex);
            success = false;
        }
        return SUCCESS;
    }
    
	public List<String> getErrores() {
		return errores;
	}

	public void setErrores(List<String> errores) {
		this.errores = errores;
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

	public void setList(List<Map<String, String>> slist1) {
		this.list = slist1;

	}

	public Map<String, List<Map<String, String>>> getComponentes() {
		return componentes;
	}

	public void setComponentes(Map<String, List<Map<String, String>>> componentes) {
		this.componentes = componentes;
	}

	public List<String> getBloques() {
		return bloques;
	}

	public void setBloques(List<String> bloques) {
		this.bloques = bloques;
	}

	public String getEmitir() {
		return emitir;
	}

	public void setEmitir(String emitir) {
		this.emitir = emitir;
	}

    public FlujoVO getFlujo() {
        return flujo;
    }

    public void setFlujo(FlujoVO flujo) {
        this.flujo = flujo;
    }

	public InputStream getFileInputStream() {
		return fileInputStream;
	}

	public void setFileInputStream(InputStream fileInputStream) {
		this.fileInputStream = fileInputStream;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
}