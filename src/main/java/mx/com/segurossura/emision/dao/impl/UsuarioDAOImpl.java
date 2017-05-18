package mx.com.segurossura.emision.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.biosnettcs.core.dao.AbstractManagerDAO;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.portal.model.RolVO;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.emision.dao.UsuarioDAO;



public class UsuarioDAOImpl extends AbstractManagerDAO implements UsuarioDAO{

	
	@Override
	public UsuarioVO obtieneRolesCliente(String user) throws Exception {
		
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("PV_CDUSUARIO_I", user);
		
		Map<String, Object> resultado = ejecutaSP(new CargaRolesClientes(getDataSource()), params);
		return (UsuarioVO) resultado.get("PV_REGISTRO_O");
	}
	
	protected class CargaRolesClientes extends StoredProcedure {

		protected CargaRolesClientes(DataSource dataSource) {
			super(dataSource, "P_OBTIENE_ROLES_CLIENTE");
			declareParameter(new SqlParameter("PV_CDUSUARIO_I", Types.VARCHAR));
			declareParameter(new SqlOutParameter("PV_REGISTRO_O", OracleTypes.CURSOR, new UsuarioMapper()));
			declareParameter(new SqlOutParameter("PV_MSG_ID_O", Types.NUMERIC));
			declareParameter(new SqlOutParameter("PV_TITLE_O", Types.VARCHAR));
			compile();
		}
	}

    protected class UsuarioMapper implements ResultSetExtractor<UsuarioVO> {
    	
    	
    	
    	@Override  
		public UsuarioVO extractData(ResultSet rs) throws SQLException, DataAccessException {  
    		UsuarioVO usuario = new UsuarioVO();
    		int rowNum=0;
			while(rs.next()){  
				
				if(rowNum==0){
					usuario.setCdusuari(rs.getString("CDUSUARIO"));
					usuario.setCdperson(rs.getString("CDPERSON"));
					usuario.setDsusuari(rs.getString("DSUSUARI"));
					usuario.setRoles(new ArrayList());
					
				}
				RolVO rol=new RolVO();
				
				rol.setCdsisrol(rs.getString("CDSISROL"));
				rol.setDssisrol(rs.getString("DSSISROL"));
				usuario.getRoles().add(rol);
				rowNum++;
			}  
			
			
			return usuario;  
		}
		
    }
    

	
}
