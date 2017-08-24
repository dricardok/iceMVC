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
import com.biosnettcs.portal.model.RolSistemaVO;
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
	private List<RolSistemaVO>		   roles;
	private UsuarioVO		   user;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Action(
	        value = "validaUsuario", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String validaUsuario(){
		logger.debug(StringUtils.join(
				 "\n###########################"
				,"\n###### validaUsuario ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			Utils.validate(params, "No se recibieron datos");
            String user = params.get("user");
            String password  = params.get("password");
            Utils.validate(user, "No se recibio user");
            Utils.validate(password, "No se recibio password");
            
			UsuarioVO usuario=authenticationManager.validarUsuario(user, password);
			logger.debug("-->"+usuario);
			if(usuario==null){
				params.put("usuarioValido", "N");
				((SessionMap) session).invalidate();
				throw new ApplicationException("Usted no posee un rol asociado, por favor contacte al administrador");
				
			}else{
				session.put("USUARIO", usuario);
			}
			logger.debug(StringUtils.join("#### usuario logeado=",usuario));
			success=true;
			
		}
		catch(Exception ex)
		{
			success=false;
			setMessage(Utils.manejaExcepcion(ex));
		}
		
		logger.debug(StringUtils.join(
				 "\n###### validaUsuario ######"
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(
	        value = "obtenerRoles", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String obtenerRoles(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### obtenerRoles ######"
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
		}
		catch(Exception ex)
		{
			success=false;
			setMessage(Utils.manejaExcepcion(ex));
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtenerRoles ######"
				,"\n###################"
				));
		return result;
	}
	
	
	@Action(
	        value = "seleccionarRol", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String seleccionarRol(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### seleccionarRol ######"
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
			
			RolSistemaVO rol=(RolSistemaVO) CollectionUtils.find(usuario.getRoles(), new Predicate() {
				@Override
				public boolean evaluate(Object object) {
					RolSistemaVO r=(RolSistemaVO) object;
					return cdsisrol.equals(r.getCdsisrol());
				}
			});
			
			if(rol==null ){
				throw new ApplicationException(StringUtils.join("No Tienes el rol:",cdsisrol," asociado"));
			}
			logger.debug(StringUtils.join("#### Rol seleccionado=",rol));
			usuario.setRolActivo(rol);
			
			
			success=true;
		}
		catch(Exception ex)
		{
			success=false;
			setMessage(Utils.manejaExcepcion(ex));
		}
		
		logger.debug(StringUtils.join(
				 "\n###### seleccionarRol ######"
				,"\n#########################"
				));
		return result;
	}
	
	
	@Action(
	        value = "obtenerDatosSesion", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String obtenerDatosSesion(){
		logger.debug(StringUtils.join(
				 "\n#########################"
				,"\n###### obtenerDatosSesion ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			
			UsuarioVO usuario = (UsuarioVO) session.get("USUARIO");
			
			user=usuario;
			
			
			success=true;
		}
		catch(Exception ex)
		{
			success=false;
			setMessage(Utils.manejaExcepcion(ex));
		}
		
		logger.debug(StringUtils.join(
				 "\n###### obtenerDatosSesion ######"
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
			setMessage("Error al terminar la sesion");
			return SUCCESS;
		}
	}
	
	
	@Action(		
	        value = "obtenerMenu", 
	        results = { 
	            @Result(name = "success", type = "json") 
	        }
	    )	
	public String obtenerMenu(){
		logger.debug(StringUtils.join(
				 "\n###################"
				,"\n###### menu ######"
				));
		
		String result = SUCCESS;
		
		try
		{
			UsuarioVO usuario = (UsuarioVO) Utils.validateSession(session);
			message=authenticationManager.obtenerMenu(usuario);
			
			success=true;
			
			
		}
		catch(Exception ex)
		{
			success=false;
			setMessage(Utils.manejaExcepcion(ex));
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
	public List<RolSistemaVO> getRoles() {
		return roles;
	}
	public void setRoles(List<RolSistemaVO> roles) {
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


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
	
	

	
}
