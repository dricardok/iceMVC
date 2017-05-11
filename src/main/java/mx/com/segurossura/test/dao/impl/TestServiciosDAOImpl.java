package mx.com.segurossura.test.dao.impl;

import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.biosnettcs.core.GenericMapper;
import com.biosnettcs.core.dao.AbstractManagerDAO;
import com.biosnettcs.core.dao.OracleTypes;

import mx.com.segurossura.test.dao.TestServiciosDAO;

public class TestServiciosDAOImpl extends AbstractManagerDAO implements TestServiciosDAO {

    private static Logger logger = LoggerFactory.getLogger(TestServiciosDAOImpl.class);
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, String>> obtieneSubmenus(String cdmenu, String cdnivelPadre) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("PV_CDMENU_I", cdmenu);
        params.put("PV_CDNIVEL_PADRE_I", cdnivelPadre);
        Map<String, Object> resultado = ejecutaSP(new ObtieneOpcionesSubMenu(getDataSource()), params);
        logger.debug("resultado={}", resultado);
        return (List<Map<String, String>>) resultado.get("pv_registro_o");
    }
    
    protected class ObtieneOpcionesSubMenu extends StoredProcedure {
        
        protected ObtieneOpcionesSubMenu(DataSource dataSource) {
            super(dataSource, "PKG_MENU.OBTIENE_MENU_HIJOS");
            declareParameter(new SqlParameter("PV_CDMENU_I", Types.VARCHAR));
            declareParameter(new SqlParameter("PV_CDNIVEL_PADRE_I", Types.VARCHAR));
            String[] cols = new String[]{"CDNIVEL", "CDNIVEL_PADRE", "DSMENU_EST", "CDTITULO", "DSTITULO"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_text_o", Types.VARCHAR));
            compile();
        }
    }
    
    
    @Override
    public String ejecutaStoredFunction(String paramEntrada) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pv_param1_i", paramEntrada);
        Map<String, Object> resultado = ejecutaSP(new FTest1(getDataSource()), params);
        logger.debug("resultado={}", resultado);
        return (String) resultado.get("v_return");
    }
    
    protected class FTest1 extends StoredProcedure {
        
        protected FTest1(DataSource dataSource) {
            super(dataSource, "F_TEST1");
            /** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return", Types.VARCHAR));  
            declareParameter(new SqlParameter("pv_param1_i", Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }
    
}