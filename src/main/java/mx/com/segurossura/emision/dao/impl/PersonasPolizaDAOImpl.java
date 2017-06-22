package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.PersonasPolizaDAO;

@Repository
public class PersonasPolizaDAOImpl extends HelperJdbcDao implements PersonasPolizaDAO {
	
	private static final Logger logger = LoggerFactory.getLogger(PersonasPolizaDAOImpl.class);
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerMpoliper(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception {
		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		params.put("pv_cdunieco_i",	 pv_cdunieco_i);
		params.put("pv_cdramo_i",    pv_cdramo_i);
		params.put("pv_estado_i",    pv_estado_i);
		params.put("pv_nmpoliza_i",  pv_nmpoliza_i);
		params.put("pv_nmsituac_i",  pv_nmsituac_i);
		params.put("pv_nmsuplem_i",  pv_nmsuplem_i);
		
		logger.debug("-->"+params);
		
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpoliperSP(getDataSource()), params);
        List<Map<String,String>>listaDatos = (List<Map<String,String>>)resultado.get("pv_registro_o");
        
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
	protected class ObtieneMpoliperSP extends StoredProcedure {
		protected ObtieneMpoliperSP(DataSource dataSource) {
			
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIPER");
			
			declareParameter(new SqlParameter("pv_cdunieco_i",	Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",	Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",	Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",	Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",	Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",	Types.VARCHAR));
			      
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsituac",
                    					   "cdrol", "cdperson", "nmsuplem", "status", "nmorddom", "swfallec" };
            
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	   @Override
	    public void movimientoMpoliper(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i, String pv_nmpoliza_i,
	                                   String pv_nmsituac_i, String pv_cdrol_i, String pv_cdperson_i, String pv_nmsuplem_sesion_i,
	                                   String pv_nmsuplem_bloque_i, String pv_nmorddom_i, String pv_swfallec_i, String pv_accion_i)
	                                   throws Exception {

	        Map<String, Object> params = new LinkedHashMap<String, Object>();
	        
	        params.put("pv_cdunieco_i", pv_cdunieco_i);
	        params.put("pv_cdramo_i", pv_cdramo_i);
	        params.put("pv_estado_i", pv_estado_i);
	        params.put("pv_nmpoliza_i", pv_nmpoliza_i);
	        params.put("pv_nmsituac_i", pv_nmsituac_i);
	        params.put("pv_cdrol_i", pv_cdrol_i);
	        params.put("pv_cdperson_i", pv_cdperson_i);
	        params.put("pv_nmsuplem_sesion_i", pv_nmsuplem_sesion_i);
	        params.put("pv_nmsuplem_bloque_i", pv_nmsuplem_bloque_i);
	        params.put("pv_nmorddom_i", pv_nmorddom_i);
	        params.put("pv_swfallec_i", pv_swfallec_i);
	        params.put("pv_accion_i", pv_accion_i);
	        
	        ejecutaSP(new MovimientoMpoliperSP(getDataSource()), params);
	    }
	    
	    protected class MovimientoMpoliperSP extends StoredProcedure {
	        protected MovimientoMpoliperSP (DataSource dataSource) {
	            
	            super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLIPER");
	            declareParameter(new SqlParameter("pv_cdunieco_i"           , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdramo_i"             , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_estado_i"             , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_nmpoliza_i"           , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_nmsituac_i"           , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdrol_i"              , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdperson_i"           , Types.VARCHAR));            
	            declareParameter(new SqlParameter("pv_nmsuplem_sesion_i"    , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_nmsuplem_bloque_i"    , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_nmorddom_i"           , Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_swfallec_i"           , Types.VARCHAR));        
	            declareParameter(new SqlParameter("pv_accion_i"             , Types.VARCHAR));
	            
	            declareParameter(new SqlOutParameter("pv_rowid_o"           , Types.VARCHAR));
	            declareParameter(new SqlOutParameter("pv_msg_id_o"          , Types.NUMERIC));
	            declareParameter(new SqlOutParameter("pv_title_o"           , Types.VARCHAR));
	            compile();
	        }
	    }
}
