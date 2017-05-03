package mx.com.segurossura.test.dao.impl;

import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.biosnettcs.core.AbstractManagerDAO;
import com.biosnettcs.core.GenericMapper;

import mx.com.segurossura.test.dao.TestServiciosDAO;
import oracle.jdbc.OracleTypes;

public class TestServiciosDAOImpl extends AbstractManagerDAO implements TestServiciosDAO {

    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, String>> obtieneSubmenus(String cdmenu, String cdnivelPadre) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("PV_CDMENU_I", cdmenu);
        params.put("PV_CDNIVEL_PADRE_I", cdnivelPadre);
        Map<String, Object> resultado = ejecutaSP(new ObtieneOpcionesSubMenu(getDataSource()), params);
        return (List<Map<String, String>>) resultado.get("pv_registro_o");
    }
    
    protected class ObtieneOpcionesSubMenu extends StoredProcedure {
        
        protected ObtieneOpcionesSubMenu(DataSource dataSource) {
            super(dataSource, "PKG_MENU.OBTIENE_MENU_HIJOS");
            declareParameter(new SqlParameter("PV_CDMENU_I", Types.VARCHAR));
            declareParameter(new SqlParameter("PV_CDNIVEL_PADRE_I", Types.VARCHAR));
            String[] cols = new String[]{"CDNIVEL" , "CDNIVEL_PADRE" , "DSMENU_EST" , "CDTITULO" , "DSTITULO"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_text_o", Types.VARCHAR));
            compile();
        }
    }
    
}
