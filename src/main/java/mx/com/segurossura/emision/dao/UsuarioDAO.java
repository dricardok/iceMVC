package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

import com.biosnettcs.portal.model.UsuarioVO;

public interface UsuarioDAO {

	UsuarioVO obtieneRolesCliente(String user) throws Exception;

	/**
	 * Obtiene el catalogo de roles del sistema
	 * @return
	 * @throws Exceptions
	 */
	List<Map<String,String>> obtenerRolesSistema() throws Exception;
	
}
