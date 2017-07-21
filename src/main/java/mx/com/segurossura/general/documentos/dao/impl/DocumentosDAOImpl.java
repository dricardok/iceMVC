package mx.com.segurossura.general.documentos.dao.impl;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
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
            String ntramite, String cdsisrol, String dsdocume, String cdtipdoc, long start, long limit) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_ntramite_i", ntramite);
        params.put("pv_cdsisrol_i", cdsisrol);
        params.put("pv_dsdocume_i", dsdocume);
        params.put("pv_cdtipdoc_i", cdtipdoc);
        params.put("pv_start_i", start);
        params.put("pv_limit_i", limit);
        Map<String, Object> procResult = ejecutaSP(new ObtenerDocumentosDAO(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procResult.get("pv_registro_o");
        if (lista.size() == 0) {
            lista = new ArrayList<Map<String, String>>();
        } else {
            if(lista.get(0) != null){
                lista.get(0).put("total", procResult.get("pv_num_rec_o").toString());
            }
        }
        return lista;
    }

    protected class ObtenerDocumentosDAO extends StoredProcedure {
        protected ObtenerDocumentosDAO(DataSource dataSource) {
            super(dataSource, "P_Get_documentos_f");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_dsdocume_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipdoc_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_start_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_limit_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            String[] cols = new String[] { 
                    "ntramite",
                    "nmsolici",
                    "cddocume",
                    "dsdocume",
                    "fefecha",
                    "cdtipsup",
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
                    "url",
                    "ruta",
                    "cdtipdoc"
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
    
    @Override
    public void realizarMovimientoDocsPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsolici, String nmsuplem,
            String ntramite, Date fefecha, String cddocume, String dsdocume, String cdtipsup, String swvisible, String cdtiptra,
            String codidocu, String cdorddoc, String cdmoddoc, String nmcertif, String nmsituac, String url, String ruta, String cdtipodoc, String accion) 
    throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_ntramite_i", ntramite);
        params.put("pv_fefecha_i", fefecha);
        params.put("pv_cddocume_i", cddocume);
        params.put("pv_dsdocume_i", dsdocume);
        params.put("pv_cdtipsup_i", cdtipsup);
        params.put("pv_swvisible_i", swvisible);
        params.put("pv_cdtiptra_i", cdtiptra);
        params.put("pv_codidocu_i", codidocu);
        params.put("pv_cdorddoc_i", cdorddoc);
        params.put("pv_cdmoddoc_i", cdmoddoc);
        params.put("pv_nmcertif_i", nmcertif);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_url_i",      url);
        params.put("pv_ruta_i", ruta);
        params.put("pv_cdtipdoc_i", cdtipodoc);
        params.put("pv_accion_i", accion);
        
        ejecutaSP(new MovimientoTdocupolSP(getDataSource()), params);
    }

    
    protected class MovimientoTdocupolSP extends StoredProcedure {
        protected MovimientoTdocupolSP(DataSource dataSource) {
            super(dataSource, "PKG_REPORT_ALEA.P_MOV_TDOCUPOL");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",   Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i",   Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));            
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fefecha_i",  Types.DATE));
            declareParameter(new SqlParameter("pv_cddocume_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_dsdocume_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsup_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swvisible_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtiptra_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_codidocu_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdorddoc_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdmoddoc_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmcertif_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_url_i"     , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ruta_i"   ,  Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipdoc_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i",   Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o",Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
}
