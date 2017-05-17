package mx.com.segurossura.emision.dao;

import com.biosnettcs.portal.model.UsuarioVO;

public interface UsuarioDAO {

	UsuarioVO obtieneRolesCliente(String user) throws Exception;

}
