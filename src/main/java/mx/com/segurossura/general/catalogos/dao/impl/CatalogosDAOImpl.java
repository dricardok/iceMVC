package mx.com.segurossura.general.catalogos.dao.impl;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
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

import mx.com.segurossura.general.catalogos.dao.CatalogosDAO;

@Repository
public class CatalogosDAOImpl extends HelperJdbcDao implements CatalogosDAO {
    
    @Override
    public List<Map<String, String>> obtenerSucursales () throws Exception {
         return (List<Map<String, String>>) ((Map<String, Object>) ejecutaSP(new ObtenerSucursalesSP(getDataSource()),
                 new HashMap<String, String>())).get("pv_registro_o");
    }
    
    protected class ObtenerSucursalesSP extends StoredProcedure {
        protected ObtenerSucursalesSP (DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_LOV_SUCURSAL");
            String[] cols = new String[]{
                    "cdunieco", "dsunieco"
                    };
            declareParameter(new SqlOutParameter("pv_registro_o" , OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerCatalogoTatripol (String cdramo, String cdatribu) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdatribu_i", cdatribu);
        Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTatripolSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerCatalogoTatripolSP extends StoredProcedure {
        protected ObtenerCatalogoTatripolSP (DataSource dataSource) {
            super(dataSource,"PKG_LOV_ALEA.P_GET_CAT_TATRIPOL");
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
            String[] cols = new String[]{
                    "otclave1", "otvalor26"
                    };
            declareParameter(new SqlOutParameter("pv_registro_o" , OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerCatalogoTatrisit (String cdtipsit, String cdatribu) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdtipsit_i", cdtipsit);
        params.put("pv_cdatribu_i", cdatribu);
        Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTatrisitSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerCatalogoTatrisitSP extends StoredProcedure {
        protected ObtenerCatalogoTatrisitSP (DataSource dataSource) {
            super(dataSource,"PKG_LOV_ALEA.P_GET_CAT_TATRISIT");
            declareParameter(new SqlParameter("pv_cdtipsit_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
            String[] cols = new String[]{
                    "otclave1", "otvalor26"
                    };
            declareParameter(new SqlOutParameter("pv_registro_o" , OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  , Types.VARCHAR));
            compile();
        }
    }
}