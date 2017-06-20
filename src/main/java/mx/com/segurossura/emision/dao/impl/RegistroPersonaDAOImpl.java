package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.RegistoPersonaDAO;

@Repository
public class RegistroPersonaDAOImpl extends HelperJdbcDao implements RegistoPersonaDAO{

	
	@Override
    public List<Map<String,String>> lovCdpost(String pv_cdcodpos_i,
    		String pv_cdprovin_i,
    		String pv_cdmunici_i,
    		String pv_cdciudad_i) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdcodpos_i", pv_cdcodpos_i);
        params.put("pv_cdprovin_i", pv_cdprovin_i);
        params.put("pv_cdmunici_i", pv_cdmunici_i);
        params.put("pv_cdciudad_i", pv_cdciudad_i);
        

        Map<String, Object> resultado = ejecutaSP(new LovCdpostSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
    }
    
	protected class LovCdpostSP extends StoredProcedure {
		protected LovCdpostSP(DataSource dataSource) {
			super(dataSource,"PKG_LOV_ALEA.P_LOV_CODPOST");
			declareParameter(new SqlParameter("pv_cdcodpos_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdprovin_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdmunici_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdciudad_i",Types.VARCHAR));
			String[] cols=new String[]{
					 
					"cdcodpos",
					"dscodpos",
                    "cdprovin",
                    "dsprovin",
                    "cdmunici",
                    "dsmunici",
                    "cdciudad",
                    "dsciudad",
                    "tipoiva",
                    "cdpais",
                    "descripl",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
}
