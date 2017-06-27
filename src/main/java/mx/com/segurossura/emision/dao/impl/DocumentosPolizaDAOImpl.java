package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.emision.dao.DocumentosPolizaDAO;

@Repository
public class DocumentosPolizaDAOImpl extends HelperJdbcDao implements DocumentosPolizaDAO {
	
	private final static Logger logger = LoggerFactory.getLogger(DocumentosPolizaDAOImpl.class);
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerDocumentosPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i",   cdunieco);
		params.put("pv_cdramo_i",   cdramo);
		params.put("pv_estado_i",   estado);
		params.put("pv_nmpoliza_i",   nmpoliza);
		params.put("pv_nmsuplem_i",   nmsuplem);
		
		Map<String, Object> resultado = ejecutaSP(new ObtieneTdocupolSP(getDataSource()), params);
		List<Map<String,String>> listaDatos = (List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			logger.warn("Sin resultados en mpolicap: {}", params);
		}
		return listaDatos;
	}
	
	protected class ObtieneTdocupolSP extends StoredProcedure {
		protected ObtieneTdocupolSP(DataSource dataSource) {
			super(dataSource,"PKG_REPORT_ALEA.P_GET_TDOCUPOL");
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
            String[] cols = new String[] { 
            		"ntramite", 
            		"nmsolici", 
            		"cddocume", 
            		"dsdocume", 
            		"feinici", 
            		"tipmov",
                    "nmsuplem", 
                    "nsuplogi", 
                    "editable", 
                    "feinicio", 
                    "fefinal", 
                    "nmsituac",
                    "nmcertif",
                    "cdmoddoc"
            };
			declareParameter(new SqlOutParameter("pv_registro_o",	OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , 	Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , 	Types.VARCHAR));
			compile();
		}
	}

	@Override
	public void realizarMovimientoDocsPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsolici, String nmsuplem,
			String ntramite, Date feinici, String cddocume, String dsdocume, String tipmov, String swvisible, String cdtiptra,
			String codidocu, Date fefecha, String cdorddoc, String cdmoddoc, String nmcertif, String nmsituac, String accion) 
	throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsolici_i", nmsolici);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_ntramite_i", ntramite);
        params.put("pv_feinici_i", feinici);
        params.put("pv_cddocume_i", cddocume);
        params.put("pv_dsdocume_i", dsdocume);
        params.put("pv_tipmov_i", tipmov);
        params.put("pv_swvisible_i", swvisible);
        params.put("pv_cdtiptra_i", cdtiptra);
        params.put("pv_codidocu_i", codidocu);
        params.put("pv_fefecha_i", fefecha);
        params.put("pv_cdorddoc_i", cdorddoc);
        params.put("pv_cdmoddoc_i", cdmoddoc);
        params.put("pv_nmcertif_i", nmcertif);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_accion_i", accion);
        
        ejecutaSP(new MovimientoTdocupolSP(getDataSource()), params);
	}

	
	protected class MovimientoTdocupolSP extends StoredProcedure {
        protected MovimientoTdocupolSP(DataSource dataSource) {
            super(dataSource, "PKG_REPORT_ALEA.P_MOV_TDOCUPOL");
            
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsolici_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feinici_i", Types.DATE));
            declareParameter(new SqlParameter("pv_cddocume_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_dsdocume_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_tipmov_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swvisible_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtiptra_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_codidocu_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fefecha_i", Types.DATE));
            declareParameter(new SqlParameter("pv_cdorddoc_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdmoddoc_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmcertif_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_rowid_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
	}
}
