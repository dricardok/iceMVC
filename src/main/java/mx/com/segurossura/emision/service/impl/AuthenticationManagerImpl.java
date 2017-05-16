package mx.com.segurossura.emision.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.authentication.DelegSignOn;
import mx.com.segurossura.emision.service.AuthenticationManager;

@Service
public class AuthenticationManagerImpl implements AuthenticationManager {
	
	private final static Logger logger = LoggerFactory.getLogger(AuthenticationManagerImpl.class);
	
	@Override
	public boolean login(String user,String password,Map<String,String> respuesta) throws Exception{
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ login                         @@@@@@"
				,"\n@@@@@@ usr="  , user
				,"\n@@@@@@ password=" , password 
				));
		String paso="";
		
		try{
			
			paso="Validando usuario Autenticación Sura";
			boolean usuarioValido = DelegSignOn.isValid(user, password);
			
			paso="Creando session de usuario";
			
			
			
			
			
		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ login                         @@@@@@"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return false;
	}
}
