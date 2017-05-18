package mx.com.segurossura.emision.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.model.ParentNode;
import com.biosnettcs.portal.model.UsuarioVO;


import mx.com.segurossura.authentication.DelegSignOn;
import mx.com.segurossura.emision.dao.UsuarioDAO;
import mx.com.segurossura.emision.service.AuthenticationManager;

@Service
public class AuthenticationManagerImpl implements AuthenticationManager {
	
	private final static Logger logger = LoggerFactory.getLogger(AuthenticationManagerImpl.class);
	
	@Autowired
	private UsuarioDAO usuarioDAO ;
	
	@Value("${DATABASE.URL}")
	private  String urlDataBase;
	@Value("${DATABASE.DRIVER}")
	private  String driverDataBase;
	@Value("${rmi.service.authentication.url}")
	private  String urlAuth;
	@Value("${login.auth.ldap.activa}")
	private  boolean requierePass;
	
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
			boolean usuarioValido=true;
			if(requierePass)
				 usuarioValido = DelegSignOn.isValid(user, password,urlDataBase,driverDataBase,urlAuth);
			logger.debug("@@@@ Requiere Pass:"+requierePass);
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
	
	@Override
	public UsuarioVO menu(UsuarioVO usuario) throws Exception{
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ menu                         @@@@@@"
				,"\n@@@@@@ usuario="  , usuario
				,"\n@@@@@@ "
				));
		String paso="";
		
		try{
			
			paso="Leyendo menu";
			RestTemplate rt=new RestTemplate();
			ParentNode result=rt.getForObject("http://10.142.67.39:8080/userprofileServices/API/profile/menu/OPS$PRUEBCAL/3", ParentNode.class);
			
			logger.debug("----->"+result);
			
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ menu                         @@@@@@"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return usuario;
	}
}
