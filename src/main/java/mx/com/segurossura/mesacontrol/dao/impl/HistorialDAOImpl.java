package mx.com.segurossura.mesacontrol.dao.impl;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.mesacontrol.dao.HistorialDAO;

@Repository
public class HistorialDAOImpl extends HelperJdbcDao implements HistorialDAO {
		private static final Logger logger = LoggerFactory.getLogger(HistorialDAOImpl.class);
	
	
		@Override
	    public List<Map<String, String>> obtieneTdmesacontrol (String ntramite) throws Exception {
	        Map<String, String> params = new LinkedHashMap<String, String>();
	        params.put("pv_ntramite_i", ntramite);
	        Map<String, Object> procRes = ejecutaSP(new obtieneTdmesacontrolSP(getDataSource()), params);
	        List<Map<String, String>> lista = (List<Map<String,String>>) procRes.get("pv_registro_o");
	        if (lista == null) {
	            lista = new ArrayList<Map<String, String>>();
	        }
	        return lista;
	    }
	    
	    protected class obtieneTdmesacontrolSP extends StoredProcedure {
	        protected obtieneTdmesacontrolSP (DataSource dataSource) {
	            super(dataSource, "PKG_MESACONTROL.P_GET_TDMESACONTROL");           
	            declareParameter(new SqlParameter("pv_ntramite_i" , Types.VARCHAR));
	            String[] cols = new String[] {
	            		"ntramite"
	                    ,"nmordina"
	                    ,"cdtiptra"
	                    ,"cdclausu"
	                    ,"fecha"
	                    ,"comments"
	                    ,"cdusuari"
	                    ,"cdmotivo"
	                    ,"swagente"
	                    ,"dsestadomc"
	                    ,"cdsisrol"
	                    ,"cdmodulo"
	                    ,"cdevento"
	                    ,"dsusuari"
	                    ,"dssisrol"
	            };
	            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
	            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
	            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
	            compile();
	        }
	    }
	    @Override
	    public List<Map<String, String>> obtieneThmesacontrol (String ntramite) throws Exception {
	        Map<String, String> params = new LinkedHashMap<String, String>();
	        params.put("pv_ntramite_i", ntramite);
	        Map<String, Object> procRes = ejecutaSP(new obtieneThmesacontrolSP(getDataSource()), params);
	        List<Map<String, String>> lista = (List<Map<String,String>>) procRes.get("pv_registro_o");
	        if (lista == null) {
	            lista = new ArrayList<Map<String, String>>();
	        }
	        return lista;
	    }
	    
	    protected class obtieneThmesacontrolSP extends StoredProcedure {
	        protected obtieneThmesacontrolSP (DataSource dataSource) {
	            super(dataSource, "PKG_MESACONTROL.P_GET_THMESACONTROL");           
	            declareParameter(new SqlParameter("pv_ntramite_i" , Types.VARCHAR));
	            String[] cols = new String[] {
	            		"fefecha"
	                    ,"ntramite"
	                    ,"cdusuari"
	                    ,"dsusuari"
	                    ,"cdsisrol"
	                    ,"dssisrol"
	                    ,"estatus_ini"
	                    ,"cdunidspch"
	                    ,"cdtipasig"
	                    ,"cdusuari_fin"
	                    ,"dsusuari_fin"
	                    ,"cdsisrol_fin"
	                    ,"cdsisrol_fin"
	                    ,"estatus_fin"
	                    ,"fefecha_fin"
	            };
	            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
	            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
	            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
	            compile();
	        }
	    }
	    
	    @Override
	    public void movimientoTdmesacontrol (String ntramite 
                ,String nmordina 
                ,String cdtiptra 
                ,String cdclausu 
                ,Date fecha 
                ,String commets 
                ,String cdusuari 
                ,String cdmotivo 
                ,String cdsisrol 
                ,String swagente 
                ,String estatus 
                ,String cdmodulo 
                ,String cdevento 
                ,String accion ) throws Exception {
	    	
	        Map<String, Object> params = new LinkedHashMap<String, Object>();
	        params.put("pv_ntramite_i",	ntramite);
	        params.put("pv_nmordina_i",	nmordina);
	        params.put("pv_cdtiptra_i",	cdtiptra);
	        params.put("pv_cdclausu_i",	cdclausu);
	        params.put("pv_fecha_i",	fecha);
	        params.put("pv_commets_i",	commets);
	        params.put("pv_cdusuari_i",	cdusuari);
	        params.put("pv_cdmotivo_i",	cdmotivo);
	        params.put("pv_cdsisrol_i",	cdsisrol);
	        params.put("pv_swagente_i",	swagente);
	        params.put("pv_estatus_i",	estatus);
	        params.put("pv_cdmodulo_i",	cdmodulo);
	        params.put("pv_cdevento_i",	cdevento);
	        params.put("pv_accion_i",	accion);
	        Map<String, Object> procRes = ejecutaSP(new movimientoTdmesacontrolSP(getDataSource()), params);
	       
	    }
	    
	    protected class movimientoTdmesacontrolSP extends StoredProcedure {
	        protected movimientoTdmesacontrolSP (DataSource dataSource) {
	            super(dataSource, "PKG_MESACONTROL.P_MOV_TDMESACONTROL");           
	            
	            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_nmordina_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdtiptra_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdclausu_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_fecha_i", Types.DATE));	
	            declareParameter(new SqlParameter("pv_commets_i", Types.VARCHAR));	
	            declareParameter(new SqlParameter("pv_cdusuari_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdmotivo_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdsisrol_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_swagente_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_estatus_i", Types.VARCHAR));	
	            declareParameter(new SqlParameter("pv_cdmodulo_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_cdevento_i", Types.VARCHAR));
	            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));	
	            
	            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
	            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
	            compile();
	        }
	    }
	    
	    
}
