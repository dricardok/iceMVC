package mx.com.segurossura.general.documentos.dao.impl;

import java.math.BigDecimal;
import java.sql.Types;
import java.util.ArrayList;
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
import mx.com.segurossura.general.documentos.dao.DocumentosDAO;

@Repository
public class DocumentosDAOImpl extends HelperJdbcDao implements DocumentosDAO {

    @Override
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, long start, long limit) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_ntramite_i", ntramite);
        params.put("pv_cdsisrol_i", cdsisrol);
        params.put("pv_dsdocume_i", dsdocume);
        params.put("pv_start_i", start);
        params.put("pv_limit_i", limit);
        Map<String, Object> procResult = ejecutaSP(new ObtenerDocumentos(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procResult.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        } else {
            lista.get(0).put("total", procResult.get("pv_num_rec_o").toString());
        }
        return lista;
    }

    protected class ObtenerDocumentos extends StoredProcedure {
        protected ObtenerDocumentos(DataSource dataSource) {
            super(dataSource, "P_Get_documentos_f");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_dsdocume_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_start_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_limit_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
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
                    "cdmoddoc",
                    "total",
                    "rnum",
                    "tramite_endoso",
                    "url"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_num_rec_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void movimientoTdocupol() throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();

    }
    
    protected class MovimientoTdocupol extends StoredProcedure {
        protected MovimientoTdocupol(DataSource dataSource) {
            super(dataSource, "PACK_CONFIG_SCREEN.P_MOV");
            declareParameter(new SqlParameter("pv_pantalla_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }

    @Override
    public Map<String, String> obtenerDocumento() throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        return lista.get(0);
    }

    protected class ObtenerDocumento extends StoredProcedure {
        protected ObtenerDocumento(DataSource dataSource) {
            super(dataSource, "PACK_CONFIG_SCREEN.P_GET");
            declareParameter(new SqlParameter("pv_pantalla_i", Types.VARCHAR));
            String[] cols = new String[] { 
                    "pantalla", 
                    "seccion"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
}
