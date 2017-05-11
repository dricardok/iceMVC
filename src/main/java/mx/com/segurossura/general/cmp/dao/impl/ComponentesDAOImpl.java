package mx.com.segurossura.general.cmp.dao.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.codehaus.plexus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jdbc.support.oracle.SqlArrayValue;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.AbstractManagerDAO;
import com.biosnettcs.core.GenericMapper;
import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import freemarker.template.utility.StringUtil;
import mx.com.segurossura.general.cmp.controller.ComponentesAction;
import mx.com.segurossura.general.cmp.dao.ComponentesDAO;
import oracle.jdbc.OracleTypes;

public class ComponentesDAOImpl extends AbstractManagerDAO implements ComponentesDAO {
    private static Logger logger = LoggerFactory.getLogger(ComponentesDAOImpl.class);

    @Override
    public List<Map<String, String>> obtenerListaComponentesSP(String pantalla, String seccion, String modulo,
            String estatus, String cdramo, String cdtipsit, String cdsisrol, String auxkey) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_pantalla_i", pantalla);
        params.put("pv_seccion_i", seccion);
        params.put("pv_modulo_i", modulo);
        params.put("pv_estatus_i", estatus);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdtipsit_i", cdtipsit);
        params.put("pv_cdsisrol_i", cdsisrol);
        params.put("pv_auxkey_i", auxkey);
        Map<String, Object> procResult = ejecutaSP(new ObtenerListaComponentes(getDataSource()), params);
        String error = (String) procResult.get("pv_msg_id_o");
        if(StringUtils.isNotBlank(error)){
            throw new ApplicationException(error);
        }
        List<Map<String, String>> lista = (List<Map<String, String>>) procResult.get("pv_registro_o");
        logger.debug(Utils.log("\n###### lista=", lista));
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }

    protected class ObtenerListaComponentes extends StoredProcedure {
        protected ObtenerListaComponentes(DataSource dataSource) {
            super(dataSource, "PACK_CONFIG_SCREEN.P_GET");
            declareParameter(new SqlParameter("pv_pantalla_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_seccion_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_modulo_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_estatus_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsit_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_auxkey_i", OracleTypes.VARCHAR));
            String[] cols = new String[] { "pantalla", "seccion", "modulos", "estatus", "ramos", "situaciones", "roles",
                    "auxkey", "orden", "label", "tipocampo", "catalogo", "minlength", "maxlength", "minvalue",
                    "maxvalue", "swobliga", "swcolumn", "renderer", "name_cdatribu", "swlectura", "queryparam", "value",
                    "swoculto", "param1", "value1", "param2", "value2", "param3", "value3", "param4", "value4",
                    "param5", "value5", "swfinal", "icono", "handler", "swnoload", "width" };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", OracleTypes.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", OracleTypes.VARCHAR));
            compile();
        }
    }

    @Override
    public void movimientoComponentesSP(String pantalla, String seccion, String modulo, String estatus, String cdramo,
            String cdtipsit, String cdsisrol, String auxkey, List<Map<String, String>> lista) throws Exception {
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_pantalla_i", pantalla);
        params.put("pv_seccion_i", seccion);
        params.put("pv_modulo_i", modulo);
        params.put("pv_estatus_i", estatus);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdtipsit_i", cdtipsit);
        params.put("pv_cdsisrol_i", cdsisrol);
        params.put("pv_auxkey_i", auxkey);
        String[][] array = new String[lista.size()][];
        int i = 0;
        for(Map<String, String> map:lista){
            array[i++] = new String[]{
                map.get("pantalla"),
                map.get("seccion"),
                map.get("modulo"),
                map.get("estatus"),
                map.get("cdramo"),
                map.get("cdtipsit"),
                map.get("cdsisrol"),
                map.get("auxkey")
            };
        }
        params.put("pv_lista_i", new SqlArrayValue(array));
        Map<String, Object> procResult = ejecutaSP(new MovimientoComponentesSP(getDataSource()), params);
        String error = (String) procResult.get("pv_msg_id_o");
        if(StringUtils.isNotBlank(error)){
            throw new ApplicationException(error);
        }
    }

    protected class MovimientoComponentesSP extends StoredProcedure {
        protected MovimientoComponentesSP(DataSource dataSource) {
            super(dataSource, "P_MOV_TCONFSCR");
            declareParameter(new SqlParameter("pv_pantalla_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_seccion_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_modulo_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_estatus_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsit_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_auxkey_i", OracleTypes.VARCHAR));
            declareParameter(new SqlParameter("pv_lista_i", OracleTypes.ARRAY, "LISTA_LISTAS_VARCHAR2"));
            declareParameter(new SqlOutParameter("pv_msg_id_o", OracleTypes.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", OracleTypes.VARCHAR));
            compile();
        }
    }
}
