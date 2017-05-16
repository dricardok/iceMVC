package mx.com.segurossura.emision.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.controller.PrincipalCoreAction;

import mx.com.segurossura.authentication.DelegSignOn;



@Controller
@Scope("prototype")
@ParentPackage(value="json-default")
@Namespace("/authentication")
public class AuthenticationAction extends PrincipalCoreAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7940674703957200888L;
	
	private String 			   user;
	private String 			   password;
	private Map<String,String> params;
	private boolean            success;
	private String             respuesta;
	
	@Action(
	        value = "testFunction", 
	        results = { 
	            @Result(name = "input", location = "/jsp-script/servicios/input.jsp"),
	            @Result(name = "success", type = "json") 
	        }
	    )
	public String login(){
		logger.debug(StringUtils.join(
				 "\n###########################################"
				,"\n###### pantallaExplotacionDocumentos ######"
				));
		
		String result = ERROR;
		
		try
		{
			
			
			result = SUCCESS;
		}
		catch(Exception ex)
		{
			respuesta = Utils.manejaExcepcion(ex);
		}
		
		logger.debug(StringUtils.join(
				 "\n###### pantallaExplotacionDocumentos ######"
				,"\n###########################################"
				));
		return result;
	}
	
	
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
		return respuesta;
	}
	public void setRespuesta(String respuesta) {
		this.respuesta = respuesta;
	}
	
	
	
	

	
}
