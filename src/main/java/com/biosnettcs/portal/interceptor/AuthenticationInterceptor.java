package com.biosnettcs.portal.interceptor;

import java.lang.management.ManagementFactory;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

import com.biosnettcs.core.Constantes;
import com.biosnettcs.portal.model.UsuarioVO;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

/**
 * <p>Verifica la autenticaci&oacute;n para acciones seguras de la aplicaci&oacute;n.<p/>
 * 
 * <p>Si existe la sesion web del usuario, el interceptor permite el procesamiento de la petici&oacute;n.<br/>
 * Si no existe, el interceptor altera el flujo de la petici&oacute;n regresando un result que redirije al login<p/>
 */
public class AuthenticationInterceptor implements Interceptor {

	private static final long serialVersionUID = 4074812194873811352L;

	protected final transient Logger logger = LoggerFactory.getLogger(AuthenticationInterceptor.class);
	
	
	public void init() {
	}

	public String intercept(ActionInvocation actionInvocation) throws Exception {
		
		logger.info("Intercepted[Namespace={} ActionName={}]", actionInvocation.getProxy().getNamespace(), actionInvocation.getProxy().getActionName());
		
		String nextAction;
		
		//Obtenemos la sesion por medio del ActionInvocation:
		@SuppressWarnings("rawtypes")
		Map session = actionInvocation.getInvocationContext().getSession();
		
		UsuarioVO user = (UsuarioVO) session.get(Constantes.USER);
		// Si el usuario completo existe en sesion:
        if (user != null && user.getRolActivo() != null && StringUtils.isNotBlank(user.getRolActivo().getCdsisrol())) {
			
            String pid = ManagementFactory.getRuntimeMXBean().getName();
            logger.info("Usuario en sesion: {} - {} \nRol Activo: {} - {}\npid: {}", 
                    user.getCdusuari(), user.getDsusuari(), 
                    user.getRolActivo().getCdsisrol(), user.getRolActivo().getDssisrol(), pid);
			
			MDC.put("USERID", new StringBuilder(user.getCdusuari()).append(" ").append(System.currentTimeMillis()).toString());
			
			nextAction = actionInvocation.invoke();
			
		} else {
			logger.info("No hay usuario en sesion");
			
			nextAction = Action.LOGIN;
		}
		
		return nextAction;
	}
	
	
	public void destroy() {
	    
	}
	
}