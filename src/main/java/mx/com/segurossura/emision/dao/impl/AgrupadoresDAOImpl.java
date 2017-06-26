package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
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

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.emision.dao.AgrupadoresDAO;
import mx.com.segurossura.emision.service.impl.AgrupadoresManagerImpl;

@Repository
public class AgrupadoresDAOImpl extends HelperJdbcDao implements AgrupadoresDAO {

    private static final Logger logger = LoggerFactory.getLogger(AgrupadoresManagerImpl.class);
    
	@Override
	public int obtenerAgrupadorMaximo(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception {
		 Map<String, Object> params = new LinkedHashMap<String, Object>();       
	     params.put("pv_cdunieco_i", cdunieco);
	     params.put("pv_cdramo_i", cdramo);
	     params.put("pv_estado_i", estado);
	     params.put("pv_nmpoliza_i", nmpoliza);
	     params.put("pv_nmsuplem_i", nmsuplem);
	     Map<String, Object> resultado = ejecutaSP(new ObtieneCDAgrupaSP(getDataSource()), params);
	     return Integer.valueOf((String) resultado.get("pv_cdagrupa_o"));
	}
    
	protected class ObtieneCDAgrupaSP extends StoredProcedure{
		protected ObtieneCDAgrupaSP(DataSource dataSource) {
            super(dataSource,"PKG_LOV_ALEA.P_MAX_CDAGRUPA"); 
            
            declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
		         
            declareParameter(new SqlOutParameter("pv_cdagrupa_o",  Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
    public List<Map<String, String>> obtenerMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplem, String cdagrupa) throws Exception {
		
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
	    params.put("pv_cdunieco_i", cdunieco);
	    params.put("pv_cdramo_i",   cdramo);
	    params.put("pv_estado_i",   estado);
	    params.put("pv_nmpoliza_i", nmpoliza);
	    params.put("pv_nmsuplem_i", nmsuplem);
	    params.put("pv_cdagrupa_i", cdagrupa);
	    logger.debug("-->"+params);
	    Map<String, Object> resultado = ejecutaSP(new ObtieneMpoliagrSP(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>) resultado.get("pv_registro_o");
        logger.debug(Utils.log("\nlistaDatos", listaDatos));
        if (listaDatos == null) {
            listaDatos = new ArrayList<Map<String, String>>();
        }
        return listaDatos;
	}
	
	protected class ObtieneMpoliagrSP extends StoredProcedure {
		protected ObtieneMpoliagrSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_MPOLIAGR");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagrupa_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            String[] cols = new String[] {
            		"cdunieco",
            		"cdramo",
            		"estado",
            		"nmpoliza",
            		"cdagrupa",
            		"nmsuplem",
            		"status",
            		"cdperson",
            		"nmorddom",
            		"cdforpag",
            		"cdbanco",
                    "cdsucurs",
                    "cdcuenta",
                    "cdrazon",
                    "swregula",
                    "cdperreg",
                    "feultreg",
                    "cdgestor",
                    "cdtipred",
                    "fevencim",
                    "cdtarcre",
                    "nmcuota",
                    "nmporcen"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
	 }
	}

	@Override
	public void realizarMovimientoMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagrupa, String nmsuplem_sesion, String nmsuplem_bloque, String cdperson, String nmorddom,
			String cdforpag, String cdbanco, String cdsucurs, String cdcuenta, String cdrazon, String swregula,
			String cdperreg, Date feultreg, String cdgestor, String cdtipred, Date fevencim, String cdtarcre,
			String nmcuota, String nmporcen, String accion) throws Exception {
			
		Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_cdagrupa_i", cdagrupa);
        params.put("pv_nmsuplem_sesion_i", nmsuplem_sesion);
        params.put("pv_nmsuplem_bloque_i", nmsuplem_bloque);
        params.put("pv_cdperson_i", cdperson);
        params.put("pv_nmorddom_i", nmorddom);
        params.put("pv_cdforpag_i", cdforpag);
        params.put("pv_cdbanco_i", cdbanco);
        params.put("pv_cdsucurs_i", cdsucurs);
        params.put("pv_cdcuenta_i", cdcuenta);
        params.put("pv_cdrazon_i", cdrazon);
        params.put("pv_swregula_i", swregula);
        params.put("pv_cdperreg_i", cdperreg);
        params.put("pv_feultreg_i", feultreg);
        params.put("pv_cdgestor_i", cdgestor);
        params.put("pv_cdtipred_i", cdtipred);
        params.put("pv_fevencim_i", fevencim);
        params.put("pv_cdtarcre_i", cdtarcre);
        params.put("pv_nmcuota_i", nmcuota);
        params.put("pv_nmporcen_i", nmporcen);
        params.put("pv_accion_i", accion);

        ejecutaSP(new MovimientoMpoliagrSP(getDataSource()), params);		
	}
	
	protected class MovimientoMpoliagrSP extends StoredProcedure {
        protected MovimientoMpoliagrSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_MOV_MPOLIAGR");            
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagrupa_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_sesion_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_bloque_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdperson_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmorddom_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdforpag_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbanco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsucurs_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdcuenta_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdrazon_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swregula_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdperreg_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feultreg_i", Types.DATE));
            declareParameter(new SqlParameter("pv_cdgestor_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipred_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fevencim_i", Types.DATE));
            declareParameter(new SqlParameter("pv_cdtarcre_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmcuota_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmporcen_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_rowid_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
	
	@Override
	public List<Map<String, String>> obtenerMpoliagrVista (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplemSes)
            throws Exception {
	    Map<String, String> params = new LinkedHashMap<String, String>();
	    params.put("pv_cdunieco_i", cdunieco);
	    params.put("pv_cdramo_i",   cdramo);
	    params.put("pv_estado_i",   estado);
	    params.put("pv_nmpoliza_i", nmpoliza);
	    params.put("pv_nmsuplem_i", nmsuplemSes);
	    Map<String, Object> procRes = ejecutaSP(new ObtenerMpoliagrVistaSP(getDataSource()), params);
	    List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
	    if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
	    }
	    return lista;
	}
    
    protected class ObtenerMpoliagrVistaSP extends StoredProcedure {
        protected ObtenerMpoliagrVistaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_MPOLIAGR_VISTA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdunieco",
                    "cdramo",
                    "estado",
                    "nmpoliza",
                    "cdagrupa",
                    "nmsuplem",
                    "status",
                    "dsnombre",
                    "nmporcen"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
}