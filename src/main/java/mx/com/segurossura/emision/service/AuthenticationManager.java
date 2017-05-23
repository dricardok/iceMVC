package mx.com.segurossura.emision.service;



import com.biosnettcs.portal.model.UsuarioVO;

public interface AuthenticationManager {

	/**
	 * Valida las credenciales proporcionadas, si son válidas regresa un objeto UsuarioVO con sus roles
	 * @param user
	 * @param password
	 * @return Objeto UsuarioVO con los datos de la persona logeada 
	 * @throws Exception
	 */
	UsuarioVO validarUsuario(String user, String password) throws Exception;

	/**
	 * Obtiene los menus del usuario
	 * @param usuario Objeto con datos del usuario
	 * @return Menus del usuario en formato JSON
	 * @throws Exception
	 */
	String obtenerMenu(UsuarioVO usuario) throws Exception;

	
}
