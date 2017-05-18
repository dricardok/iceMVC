package mx.com.segurossura.emision.service;



import com.biosnettcs.portal.model.UsuarioVO;

public interface AuthenticationManager {

	UsuarioVO login(String user, String password) throws Exception;

	String menu(UsuarioVO usuario) throws Exception;

	
}
