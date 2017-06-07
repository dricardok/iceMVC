package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jdbc.support.oracle.SqlStructValue;
import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.jdbc.support.nativejdbc.OracleJdbc4NativeJdbcExtractor;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.DinamicMapper;
import com.biosnettcs.core.dao.mapper.GenericMapper;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.SituacionDAO;
import mx.com.segurossura.emision.model.TvalositVO;

@Repository
public class SituacionDAOImpl extends HelperJdbcDao implements SituacionDAO {

    private static final Logger logger = LoggerFactory.getLogger(SituacionDAOImpl.class);

    @Override
    public void movimientoMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String nmsuplem_sesion, String nmsuplem_bean, String status, String cdtipsit, String swreduci,
            String cdagrupa, String cdestado, Date fefecsit, Date fecharef, String indparbe, Date feinipbs,
            String porparbe, String intfinan, String cdmotanu, Date feinisus, Date fefinsus, String accion)
            throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_sesion_i", nmsuplem_sesion);
        params.put("pv_nmsuplem_bean_i", nmsuplem_bean);
        params.put("pv_status_i", status);
        params.put("pv_cdtipsit_i", cdtipsit);
        params.put("pv_swreduci_i", swreduci);
        params.put("pv_cdagrupa_i", cdagrupa);
        params.put("pv_cdestado_i", cdestado);
        params.put("pv_fefecsit_i", fefecsit);
        params.put("pv_fecharef_i", fecharef);
        params.put("pv_indparbe_i", indparbe);
        params.put("pv_feinipbs_i", feinipbs);
        params.put("pv_porparbe_i", porparbe);
        params.put("pv_intfinan_i", intfinan);
        params.put("pv_cdmotanu_i", cdmotanu);
        params.put("pv_feinisus_i", feinisus);
        params.put("pv_fefinsus_i", fefinsus);
        params.put("pv_accion_i", accion);
        ejecutaSP(new MovimientoMpolisitSP(getDataSource()), params);
    }

    // Clase
    protected class MovimientoMpolisitSP extends StoredProcedure {
        protected MovimientoMpolisitSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_Mov_Mpolisit");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_sesion_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_bean_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_status_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsit_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swreduci_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagrupa_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdestado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fefecsit_i", Types.DATE));
            declareParameter(new SqlParameter("pv_fecharef_i", Types.DATE));
            declareParameter(new SqlParameter("pv_indparbe_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feinipbs_i", Types.DATE));
            declareParameter(new SqlParameter("pv_porparbe_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_intfinan_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdmotanu_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feinisus_i", Types.DATE));
            declareParameter(new SqlParameter("pv_fefinsus_i", Types.DATE));
            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_rowid_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }

    @Override // nombre
    public void movimientoTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String cdtipsit, String status, String nmsuplem, Map<String, String> otvalores, String accion) throws Exception {
        TvalositVO tvalosit = new TvalositVO(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, status, cdtipsit);
        String key;
        for (int i = 1; i <= 120; i++) {
            if (i < 10) {
                key = Utils.join("otvalor0", i);
            } else {
                key = Utils.join("otvalor", i);
            }
            tvalosit.put(key, otvalores.get(key));
        }
        logger.debug(Utils.join("\n otvalor1", " ", tvalosit.getOtvalor01()));
        logger.debug(Utils.join("\n otvalor2", " ", tvalosit.getOtvalor02()));
        logger.debug(Utils.join("\n otvalor3", " ", tvalosit.getOtvalor03()));
        logger.debug(Utils.join("\n otvalor4", " ", tvalosit.getOtvalor04()));
        logger.debug(Utils.join("\n otvalor5", " ", tvalosit.getOtvalor05()));
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_status_registro_i", accion);
        params.put("pv_tvalo_record_i", new SqlStructValue<TvalositVO>(tvalosit));
        ejecutaSP(new MovimientoTvalositSP(getDataSource()), params);
    }

    protected class MovimientoTvalositSP extends StoredProcedure {
        protected MovimientoTvalositSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_MOV_TVALOSIT");
            this.getJdbcTemplate().setNativeJdbcExtractor(new OracleJdbc4NativeJdbcExtractor());// unwrapping the connection
            declareParameter(new SqlParameter("pv_status_registro_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_tvalo_record_i", Types.STRUCT, "TVALOSIT_OBJECT"));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }

    @Override
    public List<Map<String, String>> obtieneMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new ObtieneMpolisitSP(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>) resultado.get("pv_registro_o");
        logger.debug(Utils.join("\nlistaDatos", listaDatos));
        if (listaDatos == null || listaDatos.size() == 0) {
            throw new ApplicationException("Sin resultados");
        }
        return listaDatos;
    }

    // Clase
    protected class ObtieneMpolisitSP extends StoredProcedure {
        protected ObtieneMpolisitSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_MPOLISIT");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdunieco", 
                    "cdramo",   
                    "estado",   
                    "nmpoliza", 
                    "nmsituac", 
                    "nmsuplem", 
                    "status",   
                    "cdtipsit", 
                    "swreduci", 
                    "cdagrupa", 
                    "cdestado",   
                    "fefecsit", 
                    "fecharef", 
                    "indparbe", 
                    "feinipbs", 
                    "porparbe", 
                    "intfinan", 
                    "cdmotanu", 
                    "feinisus", 
                    "fefinsus"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }

    @Override // nombre
    public List<Map<String, String>> obtieneTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String cdtipsit, String nmsuplem) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_cdtipsit_i", cdtipsit);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new ObtieneTvalositSP(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>) resultado.get("pv_registro_o");
        return listaDatos;
    }

    // Clase
    protected class ObtieneTvalositSP extends StoredProcedure {
        protected ObtieneTvalositSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_TVALOSIT");// Nombre
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsit_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            String[] cols = new String[] { 
                    "cdunieco", "cdramo", "estado", "nmpoliza", "nmsituac", "nmsuplem", "status",
                    "cdtipsit", "otvalor01", "otvalor02", "otvalor03", "otvalor04", "otvalor05", "otvalor06",
                    "otvalor07", "otvalor08", "otvalor09", "otvalor10", "otvalor11", "otvalor12", "otvalor13",
                    "otvalor14", "otvalor15", "otvalor16", "otvalor17", "otvalor18", "otvalor19", "otvalor20",
                    "otvalor21", "otvalor22", "otvalor23", "otvalor24", "otvalor25", "otvalor26", "otvalor27",
                    "otvalor28", "otvalor29", "otvalor30", "otvalor31", "otvalor32", "otvalor33", "otvalor34",
                    "otvalor35", "otvalor36", "otvalor37", "otvalor38", "otvalor39", "otvalor40", "otvalor41",
                    "otvalor42", "otvalor43", "otvalor44", "otvalor45", "otvalor46", "otvalor47", "otvalor48",
                    "otvalor49", "otvalor50", "otvalor51", "otvalor52", "otvalor53", "otvalor54", "otvalor55",
                    "otvalor56", "otvalor57", "otvalor58", "otvalor59", "otvalor60", "otvalor61", "otvalor62",
                    "otvalor63", "otvalor64", "otvalor65", "otvalor66", "otvalor67", "otvalor68", "otvalor69",
                    "otvalor70", "otvalor71", "otvalor72", "otvalor73", "otvalor74", "otvalor75", "otvalor76",
                    "otvalor77", "otvalor78", "otvalor79", "otvalor80", "otvalor81", "otvalor82", "otvalor83",
                    "otvalor84", "otvalor85", "otvalor86", "otvalor87", "otvalor88", "otvalor89", "otvalor90",
                    "otvalor91", "otvalor92", "otvalor93", "otvalor94", "otvalor95", "otvalor96", "otvalor97",
                    "otvalor98", "otvalor99", "otvalor100", "otvalor101", "otvalor102", "otvalor103", "otvalor104",
                    "otvalor105", "otvalor106", "otvalor107", "otvalor108", "otvalor109", "otvalor110", "otvalor111",
                    "otvalor112", "otvalor113", "otvalor114", "otvalor115", "otvalor116", "otvalor117", "otvalor118",
                    "otvalor119", "otvalor120" };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }

    @Override
    public String obtieneNmsituac(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        String nmsituac = null;
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_o", nmsituac);
        Map<String, Object> resultado = ejecutaSP(new ObtieneNmsituacSP(getDataSource()), params);
        nmsituac = (String) resultado.get("pv_nmsituac_o");
        return nmsituac;
    }

    protected class ObtieneNmsituacSP extends StoredProcedure {
        protected ObtieneNmsituacSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GENERA_NMSITUAC");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlInOutParameter("pv_nmsituac_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }

    @Override
    public void borraEstructuraSituacion(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        ejecutaSP(new BorraEstructuraSituacionSP(getDataSource()), params);
    }

    protected class BorraEstructuraSituacionSP extends StoredProcedure {
        protected BorraEstructuraSituacionSP(DataSource dataSource) {
            super(dataSource, "PKG_DML_ALEA.P_DEL_DAT_SIT");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerListaSituaciones(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception{
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new ObtenerListaSituacionesSP(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>) resultado.get("pv_registro_o");
//        if (listaDatos == null || listaDatos.size() == 0) {
//            throw new ApplicationException("Sin resultados");
//        }
        return listaDatos;
    }
    
    protected class ObtenerListaSituacionesSP extends StoredProcedure {
        protected ObtenerListaSituacionesSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_DET_SIT");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
}