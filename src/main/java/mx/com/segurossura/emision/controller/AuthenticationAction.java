package mx.com.segurossura.emision.controller;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.dispatcher.SessionMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.controller.PrincipalCoreAction;
import com.biosnettcs.portal.model.RolVO;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.emision.service.AuthenticationManager;



@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/authentication")
public class AuthenticationAction extends PrincipalCoreAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7940674703957200888L;
	
	private Map<String,String> params;
	private boolean            success;
	private String             message;
	private List<RolVO>		   roles;
	private UsuarioVO		   user;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Action(
	        value = "login", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String login(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### login ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
            String user = params.get("user");
            String password  = params.get("password");
            Utils.validate(user, "No se recibio user");
            Utils.validate(password, "No se recibio password");
            
			UsuarioVO usuario=authenticationManager.login(user, password);
			logger.debug("-->"+usuario);
			if(usuario==null){
				params.put("usuarioValido", "N");
				session.clear();
				throw new ApplicationException("Usted no posee un rol asociado, por favor contacte al administrador");
				
			}else{
				session.put("USUARIO", usuario);
			}
			logger.debug(StringUtils.join("#### usuario logeado=",usuario));
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### login ######"
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(
	        value = "roles", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String roles(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### roles ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			UsuarioVO usuario = (UsuarioVO) session.get("USUARIO");
			
			
			if(usuario==null ){
				throw new ApplicationException("No Tienes roles asociados");
				
			}
			
			roles= usuario.getRoles();
			
			logger.debug(StringUtils.join("#### roles=",roles));
			
			success=true;
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### roles ######"
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(
	        value = "selectRol", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String selectRol(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### selectRol ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			UsuarioVO usuario = (UsuarioVO) session.get("USUARIO");
			Utils.validate(params, "No se recibieron datos");
            String cdsisrol = params.get("cdsisrol");
            Utils.validate(cdsisrol, "No se recibio cdsisrol");
			
            if(usuario==null ){
				throw new ApplicationException("No Tienes roles asociados");
				
			}
			
			// Java 8
			//RolVO rol= usuario.getRoles().stream().filter((r)->r.getClave().cdsisrol.equals(r.getClave()).findFirst().get();
			
			RolVO rol=(RolVO) CollectionUtils.find(usuario.getRoles(), new Predicate() {
				@Override
				public boolean evaluate(Object object) {
					RolVO r=(RolVO) object;
					return cdsisrol.equals(r.getCdsisrol());
				}
			});
			
			if(rol==null ){
				throw new ApplicationException(StringUtils.join("No Tienes el rol:",cdsisrol," asociado"));
			}
			logger.debug(StringUtils.join("#### Rol seleccionado=",rol));
			usuario.setRolActivo(rol);
			
			
			success=true;
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### selectRoles ######"
				,"\n#########################"
				));
		return result;
	}
	
	
	@Action(
	        value = "datosSesion", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String datosSesion(){
		logger.debug(StringUtils.join(
				 "\n#########################"
				,"\n###### datosSesion ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			UsuarioVO usuario = (UsuarioVO) session.get("USUARIO");
			
			user=usuario;
			
			
			success=true;
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### datosSesion ######"
				,"\n#########################"
				));
		return result;
	}
	
	@Action(
	        value = "logout", 
	        results = { 
	            @Result(name = "input", location = "/jsp-script/servicios/input.jsp"),
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String logout() throws Exception {
		try {
			
			((SessionMap) session).invalidate();
			success=true;
			return SUCCESS;
		} catch (Exception ex) {
			logger.error("Error al terminar la sesion", ex);
			message = "Error al terminar la sesion";
			return SUCCESS;
		}
	}
	
	
	@Action(		
	        value = "menu", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String menu(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### menu ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			

			
			
			 
            
            
			authenticationManager.menu((UsuarioVO) session.get("USUARIO"));
			
			success=true;
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			success=false;
			message = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### menu  ######"
				,"\n###################"
				));
		return result;
	}
	
	
	
	
	public UsuarioVO getUser() {
		return user;
	}
	public void setUser(UsuarioVO user) {
		this.user = user;
	}
	public List<RolVO> getRoles() {
		return roles;
	}
	public void setRoles(List<RolVO> roles) {
		this.roles = roles;
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
	public String getRespuesta() {
		return message;
	}
	public void setRespuesta(String respuesta) {
		this.message = respuesta;
	}
	
	
	
	

	
}
