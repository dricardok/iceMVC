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

import mx.com.segurossura.emision.dao.AgentesDAO;


@Repository
public class AgentesDAOImpl extends HelperJdbcDao implements AgentesDAO {

    private static final Logger logger = LoggerFactory.getLogger(AgentesDAOImpl.class);
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String,String>> obtieneMpoliage(String cdunieco, String cdramo, String estado,
            String nmpoliza, String cdagente, String nmsuplem) throws Exception{         
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_cdagente_i", cdagente);
        params.put("pv_nmsuplem_i", nmsuplem);
        logger.debug("-->"+params);
        Map<String, Object> resultado = ejecutaSP(new ObtieneMpoliageSP(getDataSource()), params);
        List<Map<String,String>> listaDatos = (List<Map<String,String>>)resultado.get("pv_registro_o");
        return listaDatos;
    }
                 
    protected class ObtieneMpoliageSP extends StoredProcedure{
        protected ObtieneMpoliageSP(DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIAGE"); 
             
            declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagente_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));                  
            String[] cols=new String[]{
                     "cdunieco",
                     "cdramo",
                     "estado",
                     "nmpoliza",
                     "cdagente",
                     "nmsuplem",
                     "status",
                     "cdtipoag",
                     "porredau"
            };
            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }

    @Override
    public void movimientoMpoliage(String cdunieco, String cdramo, String estado, String nmpoliza, String cdagente,
            String nmsuplem_session, String nmsuplem_bloque, String cdtipoag, String porredau, String accion) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_cdagente_i", cdagente);
        params.put("pv_nmsuplem_sesion_i", nmsuplem_session);
        params.put("pv_nmsuplem_bloque_i", nmsuplem_bloque);
        params.put("pv_cdtipoag_i", cdtipoag);
        params.put("pv_porredau_i", porredau);
        params.put("pv_accion_i", accion);

        ejecutaSP(new MovimientoMpoliageSP(getDataSource()), params);
    }
    
	protected class MovimientoMpoliageSP extends StoredProcedure {
		protected MovimientoMpoliageSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLIAGE");
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdagente_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_sesion_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_bloque_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipoag_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_porredau_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i",Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_rowid_o"    , Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@SuppressWarnings("unchecked")
    @Override
    public List<Map<String,String>> buscarAgentes(String clave, String atributo) throws Exception{         
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdatribu_i", atributo);
        params.put("pv_clave_i", clave);
        logger.debug("-->"+params);
        Map<String, Object> resultado = ejecutaSP(new BuscaAgentesSP(getDataSource()), params);
        List<Map<String,String>> listaDatos = (List<Map<String,String>>)resultado.get("pv_registro_o");
        return listaDatos;
    }
                 
    protected class BuscaAgentesSP extends StoredProcedure{
        protected BuscaAgentesSP(DataSource dataSource) {
            super(dataSource,"PKG_LOV_ALEA.P_LOV_AGENTES"); 
            
            declareParameter(new SqlParameter("pv_cdatribu_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_clave_i",Types.VARCHAR));
            String[] cols=new String[]{
                     "cdagente",
                     "dsnombre"
            };
            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    
	@SuppressWarnings("unchecked")
    @Override
	public List<Map<String, String>> buscarAgentesEnGrupo(String cdagente, String cdgrupo) throws Exception {
		
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdagente_i", cdagente);
        params.put("pv_cdgrupo_i",  cdgrupo);
        Map<String, Object> resultado = ejecutaSP(new BuscarAgentesEnGrupoSP(getDataSource()), params);
        List<Map<String,String>> listaDatos = (List<Map<String,String>>)resultado.get("pv_registro_o");
        return listaDatos;
    }
	
	
    protected class BuscarAgentesEnGrupoSP extends StoredProcedure{
        protected BuscarAgentesEnGrupoSP(DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_GET_AGENTES_X_GRUPO");
			declareParameter(new SqlParameter("pv_cdgrupo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdagente_i", Types.VARCHAR));
			String[] cols = new String[] {
                     "cdagente",
                     "dsnombre"
            };
            declareParameter(new SqlOutParameter("pv_registro_o",  OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
	
    @SuppressWarnings("unchecked")
    @Override
    public boolean validaAgente(String cdagente, String cdramo,String cdproceso) throws Exception{         
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdagente_i", cdagente);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdproceso_i", cdproceso);
        logger.debug("-->"+params);
        Map<String, Object> resultado = ejecutaSP(new ValidaAgenteSP(getDataSource()), params);
        logger.debug("pp"+resultado.toString());
        Boolean dat = ((String)resultado.get("v_return")).equals("S");
        return dat;
    }
                 
    protected class ValidaAgenteSP extends StoredProcedure{
        protected ValidaAgenteSP(DataSource dataSource) {
            super(dataSource,"PKG_VALIDA_ALEA.F_VAL_CED_AGE"); 
            
            /** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));  
            declareParameter(new SqlParameter("pv_cdagente_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdproceso_i",Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }
	
}