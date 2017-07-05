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

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.mesacontrol.dao.MesaControlDAO;

@Repository
public class MesaControlDAOImpl extends HelperJdbcDao implements MesaControlDAO {
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlDAOImpl.class);

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza, 
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		//params.put("pv_cdunieco_i", cdunieco);
	    //params.put("pv_cdramo_i",   cdramo);
	    //params.put("pv_estado_i",   estado);
	    //params.put("pv_nmpoliza_i", nmpoliza);
	    //params.put("pv_cdagente_i", cdagente);
	    params.put("pv_ntramite_i", ntramite);
	    //params.put("pv_estatus_i", estatus);
	    //params.put("pv_fectatusini_i", desde);
	    //params.put("pv_fecstatusfin_i", hasta);
	    //params.put("pv_nombre_i", nombre);
	    //params.put("pv_nmsolici_i", nmsolici);
	    logger.debug("-->"+params);
	    Map<String, Object> resultado = ejecutaSP(new ObtieneMesaControl(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>) resultado.get("pv_registro_o");
        logger.debug(Utils.log("\nlistaDatos", listaDatos));
        if (listaDatos == null) {
            listaDatos = new ArrayList<Map<String, String>>();
        }
        return listaDatos;
	}
	
	protected class ObtieneMesaControl extends StoredProcedure {
		protected ObtieneMesaControl(DataSource dataSource) {
            super(dataSource, "OPS$DHPERNIA.PKG_MESACONTROL.P_GET_TMESACONTROL");
            //declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_cdagente_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_estatus_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_fectatusini_i", Types.DATE));
            //declareParameter(new SqlParameter("pv_fecstatusfin_i", Types.DATE));
            //declareParameter(new SqlParameter("pv_nombre_i", Types.VARCHAR));
            //declareParameter(new SqlParameter("pv_nmsolici_i", Types.VARCHAR));            
           
            String[] cols = new String[] {
            		"NTRAMITE",     
                    "CDUNIECO",   
                    "CDRAMO",    
                    "ESTADO",     
                    "NMPOLIZA",     
                    "NMSUPLEM",   
                    "NMSOLICI",   
                    "CDSUCADM",   
                    "CDSUCDOC",        
                    "CDTIPTRA",   
                    "FERECEPC",   
                    "CDAGENTE",   
                    "REFERENCIA",   
                    "NOMBRE", 
                    "FECSTATU",    
                    "ESTATUS",
                    "COMMENTS",    
                    "CDTIPSIT",   
                    "OTVALOR01",   
                    "OTVALOR02",  
                    "OTVALOR03",  
                    "OTVALOR04",  
                    "OTVALOR05",  
                    "OTVALOR06",  
                    "OTVALOR07",  
                    "OTVALOR08",  
                    "OTVALOR09",  
                    "OTVALOR10",  
                    "OTVALOR11",  
                    "OTVALOR12",  
                    "OTVALOR13",  
                    "OTVALOR14",  
                    "OTVALOR15",  
                    "OTVALOR16",  
                    "OTVALOR17",  
                    "OTVALOR18",  
                    "OTVALOR19",  
                    "OTVALOR20",  
                    "OTVALOR21",  
                    "OTVALOR22",  
                    "OTVALOR23",  
                    "OTVALOR24",  
                    "OTVALOR25",  
                    "OTVALOR26",  
                    "OTVALOR27",  
                    "OTVALOR28",  
                    "OTVALOR29",  
                    "OTVALOR30",  
                    "OTVALOR31",  
                    "OTVALOR32",  
                    "OTVALOR33",  
                    "OTVALOR34",  
                    "OTVALOR35",  
                    "OTVALOR36",  
                    "OTVALOR37",  
                    "OTVALOR38",  
                    "OTVALOR39",  
                    "OTVALOR40",  
                    "OTVALOR41",  
                    "OTVALOR42",  
                    "OTVALOR43",  
                    "OTVALOR44",  
                    "OTVALOR45",  
                    "OTVALOR46",  
                    "OTVALOR47",  
                    "OTVALOR48",  
                    "OTVALOR49",  
                    "OTVALOR50",  
                    "SWIMPRES",  
                    "CDTIPFLU",   
                    "CDFLUJOMC",   
                    "CDUSUARI",  
                    "CDTIPSUP",   
                    "SWVISPRE",   
                    "CDPERCLI",   
                    "RENUNIEXT",   
                    "RENRAMO",  
                    "RENPOLIEX",    
                    "SWORIGENMESA", 
                    "CDRAZRECHA",
                    "CDUNIDSPCH", 
                    "NTRASUST"
            		};            
            
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
		}
	}
}
