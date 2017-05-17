package mx.com.segurossura.emision.service;

import java.util.Map;

import com.biosnettcs.portal.model.UsuarioVO;

public interface AuthenticationManager {

	UsuarioVO login(String user, String password) throws Exception;

	
}
