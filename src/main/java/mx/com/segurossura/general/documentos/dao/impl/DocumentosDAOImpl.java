package mx.com.segurossura.general.documentos.dao.impl;

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

import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.general.documentos.dao.DocumentosDAO;

@Repository
public class DocumentosDAOImpl implements DocumentosDAO {

    @Override
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, long start, long limit) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        return lista;
    }

    protected class ObtenerDocumentos extends StoredProcedure {
        protected ObtenerDocumentos(DataSource dataSource) {
            super(dataSource, "P_Get_documentos_f");
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
