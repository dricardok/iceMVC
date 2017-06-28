package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jdbc.support.oracle.SqlStructValue;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.jdbc.support.nativejdbc.OracleJdbc4NativeJdbcExtractor;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.model.TvalopolVO;

@Repository
public class EmisionDAOImpl extends HelperJdbcDao implements EmisionDAO {
    
    private static final Logger logger = LoggerFactory.getLogger(EmisionDAOImpl.class);
    
	@Override
	public void movimientoMpolizas (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status, String swestado,
            String nmsolici, Date feautori, String cdmotanu, Date feanulac, String swautori,
            String cdmoneda, Date feinisus, Date fefinsus, String ottempot, Date feefecto,
            String hhefecto, Date feproren, Date fevencim, String nmrenova, Date ferecibo,
            Date feultsin, String nmnumsin, String cdtipcoa, String swtarifi, String swabrido,
            Date feemisio, String cdperpag, String nmpoliex, String nmcuadro, String porredau,
            String swconsol, String nmpolcoi, String adparben, String nmcercoi, String cdtipren,
            String accion) throws Exception{
		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		  
		 params.put("pv_cdunieco_i",   cdunieco);
		 params.put("pv_cdramo_i",   cdramo);
		 params.put("pv_estado_i",   estado);
		 params.put("pv_nmpoliza_i",   nmpoliza);
		 params.put("pv_nmsuplembloque_i",   nmsuplembloque);
		 params.put("pv_nmsuplemsesion_i",   nmsuplemsesion);
		 params.put("pv_status_i",   status);
		 params.put("pv_swestado_i",   swestado);
		 params.put("pv_nmsolici_i",   nmsolici);
		 params.put("pv_feautori_i",   feautori);
		 params.put("pv_cdmotanu_i",   cdmotanu);
		 params.put("pv_feanulac_i",   feanulac);
		 params.put("pv_swautori_i",   swautori);
		 params.put("pv_cdmoneda_i",   cdmoneda);
		 params.put("pv_feinisus_i",   feinisus);
		 params.put("pv_fefinsus_i",   fefinsus);
		 params.put("pv_ottempot_i",   ottempot);
		 params.put("pv_feefecto_i",   feefecto);
		 params.put("pv_hhefecto_i",   hhefecto);
		 params.put("pv_feproren_i",   feproren);
		 params.put("pv_fevencim_i",   fevencim);
		 params.put("pv_nmrenova_i",   nmrenova);
		 params.put("pv_ferecibo_i",   ferecibo);
		 params.put("pv_feultsin_i",   feultsin);
		 params.put("pv_nmnumsin_i",   nmnumsin);
		 params.put("pv_cdtipcoa_i",   cdtipcoa);
		 params.put("pv_swtarifi_i",   swtarifi);
		 params.put("pv_swabrido_i",   swabrido);
		 params.put("pv_feemisio_i",   feemisio);
		 params.put("pv_cdperpag_i",   cdperpag);
		 params.put("pv_nmpoliex_i",   nmpoliex);
		 params.put("pv_nmcuadro_i",   nmcuadro);
		 params.put("pv_porredau_i",   porredau);
		 params.put("pv_swconsol_i",   swconsol);
		 params.put("pv_nmpolcoi_i",   nmpolcoi);
		 params.put("pv_adparben_i",   adparben);
		 params.put("pv_nmcercoi_i",   nmcercoi);
		 params.put("pv_cdtipren_i",   cdtipren);
		 params.put("pv_accion_i",        accion);	
		 
		 ejecutaSP(new MovimientoMpolizasSP(getDataSource()), params);
	}
	
	protected class MovimientoMpolizasSP extends StoredProcedure {
    	protected MovimientoMpolizasSP (DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLIZAS");
            declareParameter(new SqlParameter("pv_cdunieco_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"         , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"         , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplembloque_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplemsesion_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_status_i"         , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swestado_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsolici_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feautori_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_cdmotanu_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feanulac_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_swautori_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdmoneda_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feinisus_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_fefinsus_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_ottempot_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feefecto_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_hhefecto_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feproren_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_fevencim_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_nmrenova_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ferecibo_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_feultsin_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_nmnumsin_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipcoa_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swtarifi_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swabrido_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feemisio_i"       , Types.DATE));
            declareParameter(new SqlParameter("pv_cdperpag_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliex_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmcuadro_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_porredau_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swconsol_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpolcoi_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_adparben_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmcercoi_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipren_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i"         , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_rowid_o"  , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  , Types.VARCHAR));
            compile();
    	}
	}
	
	
    @Override
    public void movimientoMpoligar(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String nmsuplem_session, String cdgarant, String cdcapita, Date fevencim, String accion) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_session_i", nmsuplem_session);
        params.put("pv_cdgarant_i", cdgarant);
        params.put("pv_cdcapita_i", cdcapita);
        params.put("pv_fevencim_i", fevencim);
        params.put("pv_accion_i", accion);

        ejecutaSP(new MovimientoMpoligarSP(getDataSource()), params);
    }
    
	protected class MovimientoMpoligarSP extends StoredProcedure {
		protected MovimientoMpoligarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLIGAR");
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_session_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_fevencim_i",Types.DATE));
			declareParameter(new SqlParameter("pv_accion_i",Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_rowid_o"    , Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
    @Override
    public void movimientoTvalogar(String cdunieco, String cdramo, String estado, String nmpoliza, String cdatribu,
            String nmsuplem, String nmsituac, String cdgarant, String otvalor, String accion) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_cdatribu_i", cdatribu);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_cdgarant_i", cdgarant);
        params.put("pv_otvalor_i", otvalor);
        params.put("pv_accion_i", accion);

        ejecutaSP(new MovimientoTvalogarSP(getDataSource()), params);
    }
    
	protected class MovimientoTvalogarSP extends StoredProcedure {
		protected MovimientoTvalogarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_TVALOGAR");
			declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",   Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",   Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otvalor_i",  Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i",   Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o",Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o" ,Types.VARCHAR));
			compile();
		}
	}
	
    @Override
    public void movimientoMpolicap(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String nmsuplem_sesion, String swrevalo, String cdcapita, String ptcapita, String nmsuplem_bloque,
            String modoacceso) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();

        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_sesion_i", nmsuplem_sesion);
        params.put("pv_swrevalo_i", swrevalo);
        params.put("pv_cdcapita_i", cdcapita);
        params.put("pv_ptcapita_i", ptcapita);
        params.put("pv_nmsuplem_bloque_i", nmsuplem_bloque);
        params.put("pv_modoacceso_i", modoacceso);

        ejecutaSP(new MovimientoMpolicapSP(getDataSource()), params);
    }

    protected class MovimientoMpolicapSP extends StoredProcedure {
		protected MovimientoMpolicapSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLICAP"); 
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_sesion_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_swrevalo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_ptcapita_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_bloque_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_modoacceso_i",Types.VARCHAR));			
			declareParameter(new SqlOutParameter("pv_rowid_i",Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
    
	@SuppressWarnings("unchecked")
    @Override
	public List<Map<String,String>> obtieneMpoligar(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception{
	    
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		params.put("pv_cdunieco_i",	    cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",      nmpoliza);
		params.put("pv_nmsituac_i",      nmsituac);
		params.put("pv_cdgarant_i",      cdgarant);
		params.put("pv_nmsuplem_i",      nmsuplem);
		logger.debug("-->"+params);
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpoligarSP(getDataSource()), params);
        List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
	protected class ObtieneMpoligarSP extends StoredProcedure {
		protected ObtieneMpoligarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIGAR_DISPONIBLES"); 
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			      
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsituac",
                    "cdgarant", "nmsuplem", "cdcapita", "status", "swmanual",
                    "fevencim", "ptcapita", "deducible", "dsgarant", "amparada" };
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,String>> obtieneMpolicap(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdcapita, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i",	cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",    nmpoliza);
		params.put("pv_nmsituac_i",    nmsituac);
		params.put("pv_cdcapita_i",    cdcapita);
		params.put("pv_nmsuplem_i",    nmsuplem);
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolicapSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			logger.warn("Sin resultados en mpolicap: {}", params);
		}
		return listaDatos;
	}
	
    protected class ObtieneMpolicapSP extends StoredProcedure {
		protected ObtieneMpolicapSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLICAP");
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsituac", "cdcapita",
                    "nmsuplem", "status", "ptcapita", "ptreduci", "fereduci", "swrevalo" };
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
    @SuppressWarnings("unchecked")
	@Override
	public List<Map<String,String>> obtieneTvalogar(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i",	cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",    nmpoliza);
		params.put("pv_nmsituac_i",    nmsituac);
		params.put("pv_cdgarant_i",    cdgarant);
		params.put("pv_nmsuplem_i",    nmsuplem);
		
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalogarSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			logger.warn("Sin resultados en Tvalogar: {}", params);
			
			
		}
        
		return listaDatos;
	}
	
	protected class ObtieneTvalogarSP extends StoredProcedure {
		protected ObtieneTvalogarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TVALOGAR"); 
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
					"cdunieco",   "cdramo",     "estado",     "nmpoliza",   "nmsituac", 
			           "cdgarant",   "nmsuplem",   "status",
			           "otvalor01",  "otvalor02",  "otvalor03",  "otvalor04",  "otvalor05", 
			           "otvalor06",  "otvalor07",  "otvalor08",  "otvalor09",  "otvalor10", 
			           "otvalor11",  "otvalor12",  "otvalor13",  "otvalor14",  "otvalor15", 
			           "otvalor16",  "otvalor17",  "otvalor18",  "otvalor19",  "otvalor20", 
			           "otvalor21",  "otvalor22",  "otvalor23",  "otvalor24",  "otvalor25", 
			           "otvalor26",  "otvalor27",  "otvalor28",  "otvalor29",  "otvalor30", 
			           "otvalor31",  "otvalor32",  "otvalor33",  "otvalor34",  "otvalor35", 
			           "otvalor36",  "otvalor37",  "otvalor38",  "otvalor39",  "otvalor40", 
			           "otvalor41",  "otvalor42",  "otvalor43",  "otvalor44",  "otvalor45", 
			           "otvalor46",  "otvalor47",  "otvalor48",  "otvalor49",  "otvalor50", 
			           "otvalor51",  "otvalor52",  "otvalor53",  "otvalor54",  "otvalor55", 
			           "otvalor56",  "otvalor57",  "otvalor58",  "otvalor59",  "otvalor60", 
			           "otvalor61",  "otvalor62",  "otvalor63",  "otvalor64",  "otvalor65", 
			           "otvalor66",  "otvalor67",  "otvalor68",  "otvalor69",  "otvalor70", 
			           "otvalor71",  "otvalor72",  "otvalor73",  "otvalor74",  "otvalor75", 
			           "otvalor76",  "otvalor77",  "otvalor78",  "otvalor79",  "otvalor80", 
			           "otvalor81",  "otvalor82",  "otvalor83",  "otvalor84",  "otvalor85", 
			           "otvalor86",  "otvalor87",  "otvalor88",  "otvalor89",  "otvalor90", 
			           "otvalor91",  "otvalor92",  "otvalor93",  "otvalor94",  "otvalor95", 
			           "otvalor96",  "otvalor97",  "otvalor98",  "otvalor99",  "otvalor100", 
			           "otvalor101", "otvalor102", "otvalor103", "otvalor104", "otvalor105", 
			           "otvalor106", "otvalor107", "otvalor108", "otvalor109", "otvalor110", 
			           "otvalor111", "otvalor112", "otvalor113", "otvalor114", "otvalor115", 
			           "otvalor116", "otvalor117", "otvalor118", "otvalor119", "otvalor120",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,String>> obtieneMcapital(String cdramo, String cdcapita) throws Exception{
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdramo_i",    cdramo);
		params.put("pv_cdcapita_i",    cdcapita);
		Map<String, Object> resultado = ejecutaSP(new ObtieneMcapitaSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
    protected class ObtieneMcapitaSP extends StoredProcedure {
		protected ObtieneMcapitaSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MCAPITAL"); 
			 
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
            String[] cols = new String[] { "cdramo", "cdcapita", "cdtipcap", "dscapita" };
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
    @SuppressWarnings("unchecked")
	@Override
	public List<Map<String,String>> obtieneTgaranti(String cdgarant) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdgarant_i", cdgarant);
		Map<String, Object> resultado = ejecutaSP(new ObtieneTgarantiSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
	protected class ObtieneTgarantiSP extends StoredProcedure {
		protected ObtieneTgarantiSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TGARANTI"); 
			
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			String[] cols=new String[]{
				 
					"cdgarant",
					"dsgarant",
					"cdtipoga",
					"cdtipgar",
					"cdtipora",
					"swbonos",
					"cdramo",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,String>> obtieneMpolizas(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsuplem) throws Exception {
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i",	    cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",      nmpoliza);
		params.put("pv_nmsuplem_i",      nmsuplem);
													 
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolizasSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				 
    protected class ObtieneMpolizasSP extends StoredProcedure {
		protected ObtieneMpolizasSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIZAS"); 
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
            String[] cols = new String[] {
					"cdunieco", "cdramo",   "estado",   "nmpoliza", "nmsuplem", 
			           "status",   "swestado", "nmsolici", "feautori", "cdmotanu", 
			           "feanulac", "swautori", "cdmoneda", "feinisus", "fefinsus", 
			           "ottempot", "feefecto", "hhefecto", "feproren", "fevencim", 
			           "nmrenova", "ferecibo", "feultsin", "nmnumsin", "cdtipcoa", 
			           "swtarifi", "swabrido", "feemisio", "cdperpag", "nmpoliex", 
			           "nmcuadro", "porredau", "swconsol", "nmpolcoi", "adparben", 
			           "nmcercoi", "cdtipren"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
    @SuppressWarnings("unchecked")
	@Override
	public Map<String,String> obtenerTvalopol (String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsuplem) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i" , cdunieco);
		params.put("pv_cdramo_i"   , cdramo);
		params.put("pv_estado_i"   , estado);
		params.put("pv_nmpoliza_i" , nmpoliza);
		params.put("pv_nmsuplem_i" , nmsuplem);
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalopolSP(getDataSource()), params);
		List<Map<String,String>> listaDatos = (List<Map<String,String>>) resultado.get("pv_registro_o");
		if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos.get(0);
	}
				 
	protected class ObtieneTvalopolSP extends StoredProcedure
	{
		protected ObtieneTvalopolSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TVALOPOL"); 
			 
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			String[] cols=new String[]{
				 
					"cdunieco",   "cdramo",     "estado",     "nmpoliza",   "nmsuplem",  "status", 
			           "otvalor01",  "otvalor02",  "otvalor03",  "otvalor04",  "otvalor05", 
			           "otvalor06",  "otvalor07",  "otvalor08",  "otvalor09",  "otvalor10", 
			           "otvalor11",  "otvalor12",  "otvalor13",  "otvalor14",  "otvalor15", 
			           "otvalor16",  "otvalor17",  "otvalor18",  "otvalor19",  "otvalor20", 
			           "otvalor21",  "otvalor22",  "otvalor23",  "otvalor24",  "otvalor25", 
			           "otvalor26",  "otvalor27",  "otvalor28",  "otvalor29",  "otvalor30", 
			           "otvalor31",  "otvalor32",  "otvalor33",  "otvalor34",  "otvalor35", 
			           "otvalor36",  "otvalor37",  "otvalor38",  "otvalor39",  "otvalor40", 
			           "otvalor41",  "otvalor42",  "otvalor43",  "otvalor44",  "otvalor45", 
			           "otvalor46",  "otvalor47",  "otvalor48",  "otvalor49",  "otvalor50", 
			           "otvalor51",  "otvalor52",  "otvalor53",  "otvalor54",  "otvalor55", 
			           "otvalor56",  "otvalor57",  "otvalor58",  "otvalor59",  "otvalor60", 
			           "otvalor61",  "otvalor62",  "otvalor63",  "otvalor64",  "otvalor65", 
			           "otvalor66",  "otvalor67",  "otvalor68",  "otvalor69",  "otvalor70", 
			           "otvalor71",  "otvalor72",  "otvalor73",  "otvalor74",  "otvalor75", 
			           "otvalor76",  "otvalor77",  "otvalor78",  "otvalor79",  "otvalor80", 
			           "otvalor81",  "otvalor82",  "otvalor83",  "otvalor84",  "otvalor85", 
			           "otvalor86",  "otvalor87",  "otvalor88",  "otvalor89",  "otvalor90", 
			           "otvalor91",  "otvalor92",  "otvalor93",  "otvalor94",  "otvalor95", 
			           "otvalor96",  "otvalor97",  "otvalor98",  "otvalor99",  "otvalor100", 
			           "otvalor101", "otvalor102", "otvalor103", "otvalor104", "otvalor105", 
			           "otvalor106", "otvalor107", "otvalor108", "otvalor109", "otvalor110", 
			           "otvalor111", "otvalor112", "otvalor113", "otvalor114", "otvalor115", 
			           "otvalor116", "otvalor117", "otvalor118", "otvalor119", "otvalor120"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
	public String generaNmpoliza (String cdunieco, String cdramo, String estado, String swcolind, String nmpolcoi) throws Exception {
	    Map<String, String> params = new LinkedHashMap<String, String>();
	    params.put("pv_cdunieco_i", cdunieco);
	    params.put("pv_cdramo_i", cdramo);
	    params.put("pv_estado_i", estado);
	    params.put("pv_swcolind_i", swcolind);
	    params.put("pv_nmpolcoi_i", nmpolcoi);
	    String nmpoliza = (String) ejecutaSP(new GeneraNmpolizaSP(getDataSource()), params).get("pv_nmpoliza_o");
	    if (StringUtils.isBlank(nmpoliza)) {
	        throw new ApplicationException("No hay nmpoliza generado");
	    }
	    return nmpoliza;
	}
	
	protected class GeneraNmpolizaSP extends StoredProcedure {
	    protected GeneraNmpolizaSP (DataSource dataSource) {
	        super(dataSource, "PKG_DATA_ALEA.P_GENERA_NMPOLIZA");
	        declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
	        declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swcolind_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpolcoi_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_nmpoliza_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
	    }
	}
	
	@Override
	public void movimientoTvalopol (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplemBloque,
	        String nmsuplemSesion, String status, Map<String, String> otvalores, String accion) throws Exception {
	    TvalopolVO tvalopol = new TvalopolVO(cdunieco, cdramo, estado, nmpoliza, nmsuplemBloque, status);
	    String key;
	    for (int i = 1; i <= 120; i++) {
	        if (i < 10) {
	            key = Utils.join("otvalor0", i);
	        } else {
	            key = Utils.join("otvalor", i);
	        }
	        tvalopol.put(key, otvalores.get(key));
	    }
	    Map<String, Object> params = new LinkedHashMap<String, Object>();
	    params.put("pv_status_i", accion);
	    params.put("pv_tvalo_record_i", new SqlStructValue<TvalopolVO>(tvalopol));
	    ejecutaSP(new MovimientoTvalopolSP(getDataSource()), params);
	}
    
    protected class MovimientoTvalopolSP extends StoredProcedure {
        protected MovimientoTvalopolSP (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_MOV_TVALOPOL");
            this.getJdbcTemplate().setNativeJdbcExtractor(new OracleJdbc4NativeJdbcExtractor()); 
            declareParameter(new SqlParameter("pv_status_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_tvalo_record_i" , Types.STRUCT, "TVALOPOL_OBJECT"));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public Map<String, String> ejecutarValoresDefecto (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, String cdbloque, String cdgarant) throws Exception {
        
        if (StringUtils.isBlank(cdgarant)) {
            cdgarant = "NULO";
        }
        
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i" , cdunieco);
        params.put("pv_cdramo_i"   , cdramo);
        params.put("pv_estado_i"   , estado);
        params.put("pv_nmpoliza_i" , nmpoliza);
        params.put("pv_nmsituac_i" , nmsituac);
        params.put("pv_nmsuplem_i" , nmsuplem);
        params.put("pv_cdbloque_i" , cdbloque);
        params.put("pv_cdgarant_i" , cdgarant);
        Map<String, Object> procRes = ejecutaSP(new EjecutarValoresDefectoSP(getDataSource()), params);
        String valores = (String) procRes.get("pv_string_val_o");
        if (StringUtils.isBlank(valores)) {
            valores = "";
        } else {
            valores = valores.trim();
        }
        
        logger.debug(Utils.log("****** ejecutarValoresDefecto valores = ", valores));
        
        Map<String, String> valoresMap = new LinkedHashMap<String, String>();
        
        if (StringUtils.isNotBlank(valores)) {
            String[] valoresArray = valores.split(" ");
            for (int i = 0; i < valoresArray.length ; i = i + 2) {
                valoresMap.put(valoresArray[i].replaceAll(Utils.join(cdbloque, "."), "").toLowerCase(), valoresArray[i + 1]);
            }
        }
        
        logger.debug(Utils.log("****** ejecutarValoresDefecto valoresMap = ", valoresMap));
        return valoresMap;
    }

    protected class EjecutarValoresDefectoSP extends StoredProcedure {
        protected EjecutarValoresDefectoSP (DataSource dataSource) {
            super(dataSource, "PKG_STRUCT_ALEA.P_GET_VALDEF_BLQ");
            declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbloque_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_string_val_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"     , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"      , Types.VARCHAR));
            compile();
        }
    }
    
    @SuppressWarnings("unchecked")
	@Override
    public List<Map<String, String>> obtieneTatrigar(String pv_cdramo_i, String pv_cdtipsit_i, String pv_cdgarant_i,
            String pv_cdatribu_i) throws Exception {
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdramo_i",	    pv_cdramo_i);
		params.put("pv_cdtipsit_i",      pv_cdtipsit_i);
		params.put("pv_cdgarant_i",      pv_cdgarant_i);
		params.put("pv_cdatribu_i",      pv_cdatribu_i);
		Map<String, Object> resultado = ejecutaSP(new ObtieneTatrigarSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
    protected class ObtieneTatrigarSP extends StoredProcedure {
		protected ObtieneTatrigarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TATRIGAR"); 
			 
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i",Types.VARCHAR));
			String[] cols=new String[]{
				 
					 "cdramo",   "cdtipsit",   "cdgarant", "cdatribu", 
			           "swformat",   "nmlmax", "nmlmin", "swobliga", "dsatribu", 
			           "ottabval", "swproduc", "swsuplem"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
    
	
	@Override
	public String obtenerCuadroComisionesDefault (String cdramo) throws Exception {
	    Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdramo_i", cdramo);
        Map<String, Object> resultado = ejecutaSP(new ObtenerCuadroComisionesDefaultSP(getDataSource()), params);
        String nmcuadro = (String) resultado.get("pv_nmcuadro_o");
        if (StringUtils.isBlank(nmcuadro)) {
            throw new ApplicationException("No hay cuadro de comisiones default para el ramo");
        }
        return nmcuadro;
    }
    
    protected class ObtenerCuadroComisionesDefaultSP extends StoredProcedure{
        protected ObtenerCuadroComisionesDefaultSP(DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_GET_DAT_COMIS");
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_nmcuadro_o", Types.VARCHAR)); 
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, String>> ejecutarValidaciones (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, String cdbloque) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i" , cdunieco);
        params.put("pv_cdramo_i"   , cdramo);
        params.put("pv_estado_i"   , estado);
        params.put("pv_nmpoliza_i" , nmpoliza);
        params.put("pv_nmsituac_i" , nmsituac);
        params.put("pv_nmsuplem_i" , nmsuplem);
        params.put("pv_cdbloque_i" , cdbloque);
        Map<String, Object> procRes = ejecutaSP(new EjecutarValidacionesSP(getDataSource()), params);
        List<Map<String, String>> validaciones = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (validaciones == null) {
            validaciones = new ArrayList<Map<String, String>>();
        }
        logger.debug(Utils.log("****** PKG_STRUCT_ALEA.P_GET_VALIDA_BLQ validaciones = ", validaciones));
        return validaciones;
    }

    protected class EjecutarValidacionesSP extends StoredProcedure {
        protected EjecutarValidacionesSP (DataSource dataSource) {
            super(dataSource, "PKG_STRUCT_ALEA.P_GET_VALIDA_BLQ");
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbloque_i" , Types.VARCHAR));
            String[] cols=new String[]{ "tipo", "otvalor" };
            declareParameter(new SqlOutParameter("pv_registro_o" , OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String,String>> obtieneMpoligarTabla(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception{         
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_cdgarant_i", cdgarant);
        params.put("pv_nmsuplem_i", nmsuplem);
        logger.debug("-->"+params);
        Map<String, Object> resultado = ejecutaSP(new ObtieneMpoligarTablaSP(getDataSource()), params);
        List<Map<String,String>> listaDatos = (List<Map<String,String>>)resultado.get("pv_registro_o");
        return listaDatos;
    }
                 
    protected class ObtieneMpoligarTablaSP extends StoredProcedure{
        protected ObtieneMpoligarTablaSP(DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIGAR"); 
             
            declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));                  
            String[] cols=new String[]{
                    "cdunieco",
                     "cdramo",
                     "estado",
                     "nmpoliza",
                     "nmsituac",
                     "cdgarant",
                     "nmsuplem",
                     "cdcapita",
                     "status",
                     "swmanual",
                     "fevencim"
            };
            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    
    @Override
    public Map<String, Object> generarTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac)
            throws Exception {
        
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        Map<String, Object> resultado = ejecutaSP(new BbvtarxincF(getDataSource()), params);
        return resultado;
    }
    
    protected class BbvtarxincF extends StoredProcedure {
        protected BbvtarxincF (DataSource dataSource) {
            super(dataSource, "PKG_PROCESS_ALEA.F_BBVTARXINC_HOST_CMD");
            /** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));  
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_comando_o",Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_error_o",  Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",  Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, String>> obtenerDatosTarificacion(String cdunieco, String cdramo, String estado,
            String nmpoliza) throws Exception {
        
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        Map<String, Object> res = ejecutaSP(new DatTarificaF(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>)res.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
            throw new ApplicationException("No hay resultados de cotizacion");
        }
        return listaDatos;
    }
    
    protected class DatTarificaF extends StoredProcedure {
        protected DatTarificaF (DataSource dataSource) {
            super(dataSource, "PKG_PROCESS_ALEA.P_DAT_TARIFICA");
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            
            String[] cols = new String[] { "nmsituac", "cdgarant", "dsgarant", "cdcontar", "dscontar", "nmimport" };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",  Types.VARCHAR));
            compile();
        }
    }


	@Override
	public Map<String, Object> distribuirAgrupadores(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new BbvlcotiF(getDataSource()), params);
        return resultado;
	}
    
	protected class BbvlcotiF extends StoredProcedure {
        protected BbvlcotiF (DataSource dataSource) {
            super(dataSource, "PKG_PROCESS_ALEA.F_BBVLCOTI");
            /** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));             
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_comando_o",Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_error_o",  Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",  Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }
	
	@Override
	public String confirmarPoliza(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem, String pnmrecibo) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        
        // params.put("pv_newestad_i", newestad);
        // params.put("pv_newpoliza_i", newpoliza);
        params.put("pv_nmrecibo_i", pnmrecibo);
        
        Map<String, Object> resultado = ejecutaSP(new ActualizaPolizaSP(getDataSource()), params);
        String nuevoNmpoliza = (String) resultado.get("pv_nmpoliza_o");
        if (StringUtils.isBlank(nuevoNmpoliza)) {
            throw new ApplicationException("No se gener\u00f3 p\u00f3liza");
        }
        return nuevoNmpoliza;
	}
	
	protected class ActualizaPolizaSP extends StoredProcedure {
        protected ActualizaPolizaSP (DataSource dataSource) {
            super(dataSource, "PKG_PROCESS_ALEA.P_ALEAACTP");
            /** important that the out parameter is defined before the in parameter. */
            //declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));
            
            declareParameter(new SqlParameter("pv_cdunieco_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i"  , Types.VARCHAR));
            
            // declareParameter(new SqlParameter("pv_newestad_i"  , Types.VARCHAR));
            // declareParameter(new SqlParameter("pv_newpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmrecibo_i"  , Types.VARCHAR));
            		
            declareParameter(new SqlOutParameter("pv_nmpoliza_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_comando_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_error_o"   , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"  , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"   , Types.VARCHAR));

            /** use function instead of stored procedure */
            //setFunction(true);
            compile();
        }
    }
    
}