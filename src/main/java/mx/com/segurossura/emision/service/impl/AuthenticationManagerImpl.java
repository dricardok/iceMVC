package mx.com.segurossura.emision.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.model.UsuarioVO;


import mx.com.segurossura.authentication.DelegSignOn;
import mx.com.segurossura.emision.dao.UsuarioDAO;
import mx.com.segurossura.emision.service.AuthenticationManager;

@Service
public class AuthenticationManagerImpl implements AuthenticationManager {
	
	private final static Logger logger = LoggerFactory.getLogger(AuthenticationManagerImpl.class);
	
	@Autowired
	private UsuarioDAO usuarioDAO ;
	
	@Override
	public UsuarioVO login(String user,String password) throws Exception{
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ login                         @@@@@@"
				,"\n@@@@@@ usr="  , user
				,"\n@@@@@@ password=" , password 
				));
		String paso="";
		UsuarioVO usuario=null;
		try{
			
			paso="Validando usuario Autenticación Sura";
			boolean usuarioValido = DelegSignOn.isValid(user, password);
			
			paso="Creando  usuario";
			if(usuarioValido){
				usuario= usuarioDAO.obtieneRolesCliente(user);
			}
			if(usuario==null || usuario.getRoles()==null){
				throw new ApplicationException("Usted no posee un rol asociado, por favor contacte al administrador");
			}
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				"\n@@@@@@ usuario=",usuario
				, "\n@@@@@@ login                         @@@@@@"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return usuario;
	}
}
