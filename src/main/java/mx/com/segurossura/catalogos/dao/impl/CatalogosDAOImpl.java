package mx.com.segurossura.catalogos.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;

import mx.com.segurossura.catalogos.dao.CatalogosDAO;
import mx.com.segurossura.catalogos.model.GenericVO;


@Repository
public class CatalogosDAOImpl extends HelperJdbcDao implements CatalogosDAO {

	protected static final transient Logger logger = LoggerFactory.getLogger(CatalogosDAOImpl.class);
	
	@Override
    public List<GenericVO> obtieneAtributosSituacionDAO(String cdatribu, String cdtipsit, String otvalor, String cdsisrol) throws Exception{
        try{
            HashMap<String,Object> params = new LinkedHashMap<String,Object>();
            params.put("pv_cdtipsit_i", cdtipsit);
            params.put("pv_cdatribu_i", cdatribu);
            params.put("pv_otvalor_i", otvalor);
            params.put("pv_cdsisrol_i", cdsisrol);
            Map<String, Object> resultado = ejecutaSP(new ObtieneAtributosSitSP(getDataSource()), params);
            return (List<GenericVO>) resultado.get("pv_registro_o");
        }
        catch (Exception e){
            throw new Exception(e.getMessage(),e);
        }
    }
    
    protected class ObtieneAtributosSitSP extends StoredProcedure {
        protected ObtieneAtributosSitSP(DataSource dataSource) {
            super(dataSource, "P_COT_GET_ATRIBUTOS_SIT");
            declareParameter(new SqlParameter("pv_cdtipsit_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i", Types.VARCHAR));            
            declareParameter(new SqlOutParameter("pv_registro_o", Types.REF_CURSOR, new ObtieneAtributosSitMapper()));
            declareParameter(new SqlOutParameter("pv_messages_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    protected class ObtieneAtributosSitMapper implements RowMapper {
        public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new GenericVO(rs.getString("CODIGO"),rs.getString("DESCRIPCION"));
        }
    }
}