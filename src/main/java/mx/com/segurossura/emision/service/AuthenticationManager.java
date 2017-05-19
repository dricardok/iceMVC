package mx.com.segurossura.emision.service;



import com.biosnettcs.portal.model.UsuarioVO;

public interface AuthenticationManager {

	UsuarioVO login(String user, String password) throws Exception;

	/**
	 * Obtiene los menus del usuario
	 * @param usuario Objeto con datos del usuario
	 * @return Menus del usuario en formato JSON
	 * @throws Exception
	 */
	String menu(UsuarioVO usuario) throws Exception;

	
}
