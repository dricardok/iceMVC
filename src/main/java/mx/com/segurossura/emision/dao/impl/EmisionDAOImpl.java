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
import com.biosnettcs.core.dao.mapper.DinamicMapper;
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
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem, String pv_cdtipsit_i, String perfil) throws Exception{
	    
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		params.put("pv_cdunieco_i",	    cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",      nmpoliza);
		params.put("pv_nmsituac_i",      nmsituac);
		params.put("pv_cdgarant_i",      cdgarant);
		params.put("pv_nmsuplem_i",      nmsuplem);
		params.put("pv_cdtipsit_i",      pv_cdtipsit_i);
		params.put("pv_perfil_i",      perfil);
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
			declareParameter(new SqlParameter("pv_cdtipsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_perfil_i",Types.VARCHAR));
			      
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsituac",
                    "cdgarant", "nmsuplem", "cdcapita", "status", "swmanual",
                    "fevencim", "ptcapita", "deducible", "dsgarant", "amparada" ,"swobliga" };
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
            String nmsituac, String nmsuplem, String cdbloque, String cdgarant, String cdptovta, String cdgrupo, String cdsubgpo,
            String cdperfil, String cdusuari, String cdsisrol) throws Exception {
        
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
        params.put("pv_cdptovta_i" , cdptovta);
        params.put("pv_cdgrupo_i"  , cdgrupo);
        params.put("pv_cdsubgpo_i" , cdsubgpo);
        params.put("pv_cdperfit_i" , cdperfil);
        params.put("pv_cdusuari_i" , cdusuari);
        params.put("pv_cdsisrol_i" , cdsisrol);
        Map<String, Object> procRes = ejecutaSP(new EjecutarValoresDefectoSP(getDataSource()), params);
        String valores = (String) procRes.get("pv_string_val_o");
        if (StringUtils.isBlank(valores)) {
            valores = "";
        } else {
            valores = valores.trim();
        }
        
        logger.info("****** ejecutarValoresDefecto {} {}-{}-{}-{}-{} sit {} valores = {}", 
        		cdbloque, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsituac, valores);
        
        Map<String, String> valoresMap = new LinkedHashMap<String, String>();
        
        if (StringUtils.isNotBlank(valores)) {
        	
            String[] valoresArray = valores.split(" ");
            if(valores.startsWith("|") && valores.endsWith("|")){
            	logger.warn("Los valores por defecto estan regresando validaciones: "+valores);
        	}else{
	            try{
		            for (int i = 0; i < valoresArray.length ; i = i + 2) {
		                valoresMap.put(valoresArray[i].replaceAll(Utils.join(cdbloque, "."), "").toLowerCase(), valoresArray[i + 1]);
		            }
	            }catch(ArrayIndexOutOfBoundsException e){
	            	logger.warn("Los valores por defecto estan regresando validaciones: "+valores);
	            }
        	}
        }
        
        logger.info("****** ejecutarValoresDefecto {} {}-{}-{}-{}-{} sit {} valoresMap = {}", 
        		cdbloque, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsituac, valoresMap);
        
        return valoresMap;
    }

    protected class EjecutarValoresDefectoSP extends StoredProcedure {
        protected EjecutarValoresDefectoSP (DataSource dataSource) {
            super(dataSource, "PKG_STRUCT_ALEA.P_GET_VALDEF_BLQ");
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbloque_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgarant_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdptovta_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgrupo_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsubgpo_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdperfit_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdusuari_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i" , Types.VARCHAR));
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
    
    
	@Override
	public String obtenerCuadroComisionAgente (String cdagente, String cdramo) throws Exception {
	    Map<String, Object> params = new LinkedHashMap<String, Object>();
	    params.put("pv_cdagente_i", cdagente);
	    params.put("pv_cdramo_i",   cdramo);
        Map<String, Object> resultado = ejecutaSP(new ObtenerCuadroComisionAgenteSP(getDataSource()), params);
        String nmcuadro = (String) resultado.get("pv_nmcuadro_o");
        if (StringUtils.isBlank(nmcuadro)) {
            throw new ApplicationException("No hay cuadro de comisiones default para el ramo");
        }
        return nmcuadro;
    }
    
    protected class ObtenerCuadroComisionAgenteSP extends StoredProcedure{
        protected ObtenerCuadroComisionAgenteSP(DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_GET_CUADRO_AGENTE");
            declareParameter(new SqlParameter("pv_cdramo_i",      Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagente_i",    Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_nmcuadro_o", Types.VARCHAR)); 
            declareParameter(new SqlOutParameter("pv_msg_id_o",   Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",    Types.VARCHAR));
            compile();
        }
    }
    
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, String>> ejecutarValidaciones (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, String cdperson, String cdbloque, String cdptovta, String cdsubgpo, String cdperfit, String cdusuari, String cdsisrol) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i" , cdunieco);
        params.put("pv_cdramo_i"   , cdramo);
        params.put("pv_estado_i"   , estado);
        params.put("pv_nmpoliza_i" , nmpoliza);
        params.put("pv_nmsituac_i" , nmsituac);
        params.put("pv_nmsuplem_i" , nmsuplem);
        params.put("pv_cdperson_i" , cdperson);
        params.put("pv_cdbloque_i" , cdbloque);
        
        params.put("pv_cdptovta_i" , cdptovta);
        params.put("pv_cdsubgpo_i" , cdsubgpo);
        params.put("pv_cdperfit_i" , cdperfit);
        
        params.put("pv_cdusuari_i" , cdusuari);
        params.put("pv_cdsisrol_i" , cdsisrol);
        Map<String, Object> procRes = ejecutaSP(new EjecutarValidacionesSP(getDataSource()), params);
        List<Map<String, String>> validaciones = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (validaciones == null) {
            validaciones = new ArrayList<Map<String, String>>();
        }
        logger.info("****** PKG_STRUCT_ALEA.P_GET_VALIDA_BLQ {} {}-{}-{}-{}-{} sit {} validaciones = {}", 
        		cdbloque, cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsituac, validaciones);
        
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
            declareParameter(new SqlParameter("pv_cdperson_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbloque_i" , Types.VARCHAR));
            
            declareParameter(new SqlParameter("pv_cdptovta_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsubgpo_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdperfit_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdusuari_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i" , Types.VARCHAR));
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
    public Map<String, Object> generarTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdusuari)
            throws Exception {
        
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i",   cdramo);
        params.put("pv_estado_i",   estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_cduser_i",   cdusuari);
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
            declareParameter(new SqlParameter("pv_cduser_i" ,   Types.VARCHAR));
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
	public List<Map<String, String>> obtenerDetalleTarificacion(String cdunieco, String cdramo, String estado,
			String nmpoliza) throws Exception {
    	Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        Map<String, Object> res = ejecutaSP(new DetalleTarificion(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>)res.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
            throw new ApplicationException("No hay resultados de cotizacion");
        }
        return listaDatos;
	}
    
    protected class DetalleTarificion extends StoredProcedure {
        protected DetalleTarificion (DataSource dataSource) {
        	super(dataSource, "PKG_DATA_ALEA.P_GET_PRI_DET_ZWORK");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza",
            							   "cdgarant", "dsgarant", "cdcontar", "dscontar",
            							   "cdtipcon", "primer_recibo", "subsecuentes", "total"};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
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

	@Override
	public void movimientoZworkcts(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i", cdunieco);
		params.put("pv_cdramo_i", cdramo);
		params.put("pv_estado_i", estado);
		params.put("pv_nmpoliza_i", nmpoliza);
		params.put("pv_nmsuplem_i", nmsuplem);
		
		ejecutaSP(new MovimientoZworkcts(getDataSource()), params);
	}
    
	protected class MovimientoZworkcts extends StoredProcedure {
		protected MovimientoZworkcts(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.p_mov_zworkcts"); 
			declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}


	@Override
	public void movimientoZworkctsCopiado(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i", cdunieco);
		params.put("pv_cdramo_i", cdramo);
		params.put("pv_estado_i", estado);
		params.put("pv_nmpoliza_i", nmpoliza);
		params.put("pv_nmsuplem_i", nmsuplem);
		
		ejecutaSP(new MovimientoZworkctsCopiado(getDataSource()), params);	
	}
	
	protected class MovimientoZworkctsCopiado extends StoredProcedure {
		protected MovimientoZworkctsCopiado(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.p_mov_zworkcts_copiado"); 
			declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerFormasPago(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        logger.debug("-->"+params);
		Map<String, Object> resultado = ejecutaSP(new GetFormaPago(getDataSource()), params);
        List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
    
	protected class GetFormaPago extends StoredProcedure {
        protected GetFormaPago (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_FORMA_PAGO");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            String[] cols = new String[] { "codigo", "descripl"};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
        }
    }


	@Override
	public List<Map<String, String>> obtenerTarifaMultipleTemp(String cdunieco, String cdramo, String estado,
			String nmpoliza) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        logger.debug("-->"+params);
		Map<String, Object> resultado = ejecutaSP(new GetPrimaTotal(getDataSource()), params);
        List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
	protected class GetPrimaTotal extends StoredProcedure {
        protected GetPrimaTotal (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_PRIMA_TOTAL");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdperpag", "cdunieco", "cdramo", "estado", "nmpoliza", "primer_recibo",
            							   "subsecuentes", "total", "cdmoneda", "dsmoneda"};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
        }
    }


	@Override
	public List<Map<String, String>> obtenerDetalleTarifaTemp(String cdunieco, String cdramo, String estado,
			String nmpoliza, String cdperpag) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_cdperpag_i", cdperpag);
        logger.debug("-->"+params);
		Map<String, Object> resultado = ejecutaSP(new GetPrimaDetalle(getDataSource()), params);
        List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
	protected class GetPrimaDetalle extends StoredProcedure {
        protected GetPrimaDetalle (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_PRIMA_DETALLE");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdperpag_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdperpag", "cdunieco", "cdramo", "estado", "nmpoliza",
            							   "cdgarant", "dsgarant", "cdcontar", "dscontar",
            							   "cdtipcon", "primer_recibo", "subsecuentes", "total"};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
        }
    }

	public List<Map<String, String>> obtenerTvaloaux (String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdbloque, String nmsituac, String cdgarant, String nmsuplem, String status) throws Exception {
	    Map<String, String> params = new LinkedHashMap<String, String>();
	    params.put("pv_cdunieco_i" , cdunieco);
	    params.put("pv_cdramo_i"   , cdramo);
	    params.put("pv_estado_i"   , estado);
	    params.put("pv_nmpoliza_i" , nmpoliza);
	    params.put("pv_nmsituac_i" , nmsituac);
	    params.put("pv_nmsuplem_i" , nmsuplem);
	    params.put("pv_status_i"   , status);
	    params.put("pv_cdbloque_i" , cdbloque);
	    params.put("pv_cdgarant_i" , cdgarant);
	    List<Map<String, String>> lista = (List<Map<String, String>>) (ejecutaSP(new ObtenerTvaloauxSP(getDataSource()), params))
	            .get("pv_registro_o");
	    if (lista == null) {
	        lista = new ArrayList<Map<String, String>>();
	    }
	    logger.debug(Utils.log("****** obtenerTvaloaux lista = ", lista));
	    return lista;
	}
    
    protected class ObtenerTvaloauxSP extends StoredProcedure {
        protected ObtenerTvaloauxSP (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_TVALOAUX");
            declareParameter(new SqlParameter("pv_cdunieco_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_status_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbloque_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgarant_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsituac", "nmsuplem", "status",
                    "cdbloque", "cdgarant", "otvalor01", "otvalor02", "otvalor03", "otvalor04", "otvalor05",
                    "otvalor06", "otvalor07", "otvalor08", "otvalor09", "otvalor10", "otvalor11", "otvalor12",
                    "otvalor13", "otvalor14", "otvalor15"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  ,  Types.VARCHAR));
            compile();
        }
    }
    
    @Override
	public void ejecutarMovimientoTvaloaux (String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdbloque, String nmsituac, String cdgarant, String nmsuplem, String status, String otvalor01, String otvalor02,
            String otvalor03, String otvalor04, String otvalor05, String otvalor06, String otvalor07, String otvalor08,
            String otvalor09, String otvalor10, String otvalor11, String otvalor12, String otvalor13, String otvalor14,
            String otvalor15, String accion) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i"  , cdunieco);
        params.put("pv_cdramo_i"    , cdramo);
        params.put("pv_estado_i"    , estado);
        params.put("pv_nmpoliza_i"  , nmpoliza);
        params.put("pv_nmsituac_i"  , nmsituac);
        params.put("pv_nmsuplem_i"  , nmsuplem);
        params.put("pv_status_i"    , status);
        params.put("pv_cdbloque_i"  , cdbloque);
        params.put("pv_cdgarant_i"  , cdgarant);
        params.put("pv_otvalor01_i" , otvalor01);
        params.put("pv_otvalor02_i" , otvalor02);
        params.put("pv_otvalor03_i" , otvalor03);
        params.put("pv_otvalor04_i" , otvalor04);
        params.put("pv_otvalor05_i" , otvalor05);
        params.put("pv_otvalor06_i" , otvalor06);
        params.put("pv_otvalor07_i" , otvalor07);
        params.put("pv_otvalor08_i" , otvalor08);
        params.put("pv_otvalor09_i" , otvalor09);
        params.put("pv_otvalor10_i" , otvalor10);
        params.put("pv_otvalor11_i" , otvalor11);
        params.put("pv_otvalor12_i" , otvalor12);
        params.put("pv_otvalor13_i" , otvalor13);
        params.put("pv_otvalor14_i" , otvalor14);
        params.put("pv_otvalor15_i" , otvalor15);
        params.put("pv_accion_i"    , accion);
        ejecutaSP(new EjecutarMovimientoTvaloauxSP(getDataSource()), params);
    }
    
    protected class EjecutarMovimientoTvaloauxSP extends StoredProcedure {
        protected EjecutarMovimientoTvaloauxSP (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_MOV_TVALOAUX");
            declareParameter(new SqlParameter("pv_cdunieco_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_status_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdbloque_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgarant_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor01_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor02_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor03_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor04_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor05_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor06_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor07_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor08_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor09_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor10_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor11_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor12_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor13_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor14_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor15_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i"    , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  ,  Types.VARCHAR));
            compile();
        }
    }


	@Override
	public List<Map<String, String>> obtenerDatosPago(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem)
			throws Exception {
		
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        logger.debug("-->"+params);
		Map<String, Object> resultado = ejecutaSP(new GetDatosPago(getDataSource()), params);
        List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
    

	protected class GetDatosPago extends StoredProcedure {
        protected GetDatosPago (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.p_get_datospago");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsuplem",
            							   "ptimport", "cdmoneda", "descripl"};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
        }
    }

	
    @Override
    public List<Map<String, String>> obtenerPorcPartCoa (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i" , cdunieco);
        params.put("pv_cdramo_i"   , cdramo);
        params.put("pv_estado_i"   , estado);
        params.put("pv_nmpoliza_i" , nmpoliza);
        params.put("pv_nmsuplem_i" , nmsuplem);
        List<Map<String, String>> lista = (List<Map<String, String>>) (ejecutaSP(new ObtenerPorcPartCoa(getDataSource()), params)).get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        logger.debug(Utils.log("****** ObtenerPorcPartCoa lista = ", lista));
        return lista;
    }
    
    protected class ObtenerPorcPartCoa extends StoredProcedure {
        protected ObtenerPorcPartCoa (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_PORCPARTCOA");
            declareParameter(new SqlParameter("pv_cdunieco_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
//            String[] cols = new String[] { 
//                    "cdunieco",
//                    "cdramo",
//                    "estado",
//                    "nmpoliza",
//                    "nmsuplem", 
//                    "cdcia",
//                    "cdtipcoa",
//                    "status",
//                    "swabrido",
//                    "porcpart", 
//                    "cdmodelo",
//                    "swpagcom",
//                    "dscia",
//                    "cdesqcoa"
//            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  ,  Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerModeloCoaseguro(String cdmodelo) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdmodelo_i" , cdmodelo);
        List<Map<String, String>> lista = (List<Map<String, String>>) (ejecutaSP(new ObtenerModeloCoaseguro(getDataSource()), params)).get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        logger.debug(Utils.log("****** obtenerModeloCoaseguro lista = ", lista));
        return lista;
    }
    
    protected class ObtenerModeloCoaseguro extends StoredProcedure {
        protected ObtenerModeloCoaseguro(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_TMODECOA");
            declareParameter(new SqlParameter("pv_cdmodelo_i"  , Types.VARCHAR));
            String[] cols = new String[] { 
                    "cdcia",
                    "dscia",
                    "porcpart",
                    "swabrido"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  ,  Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void movimientoMpolicoa(String cdunieco, String cdramo, String estado, String nmpoliza, 
            String nmsuplem_bloque, String nmsuplem_session, String cdcia, String cdtipcoa, 
            String status,String swabrido, String porcpart, String cdmodelo, String swpagcom,
            String accion) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplembloque_i", nmsuplem_bloque);
        params.put("pv_nmsuplemsesion_i", nmsuplem_session);
        params.put("pv_cdcia_i", cdcia);
        params.put("pv_cdtipcoa_i", cdtipcoa);
        params.put("pv_status_i", status);
        params.put("pv_swabrido_i", swabrido);
        params.put("pv_porpart_i", porcpart);
        params.put("pv_cdmodelo_i", cdmodelo);
        params.put("pv_swpagcom_i", swpagcom);
        params.put("pv_accion_i", accion);
        ejecutaSP(new MovimientoMpolicoaSP(getDataSource()), params);
    }
 
    protected class MovimientoMpolicoaSP extends StoredProcedure {
        protected MovimientoMpolicoaSP (DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLICOA");
            declareParameter(new SqlParameter("pv_cdunieco_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",            Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i",            Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplembloque_i",    Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplemsesion_i",    Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdcia_i",             Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipcoa_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_status_i",            Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swabrido_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_porpart_i",           Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdmodelo_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swpagcom_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i",            Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_rowid_o",          Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o",         Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",          Types.VARCHAR));
            compile();
        }
    }

    @Override
    public void movimientoMsupcoa(String cdcialider, String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmpolizal, String nmsuplem_bloque, String nmsuplem_session, String tipodocu, String ndoclider, 
            String status, String accion) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdcialider_i", cdcialider);
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmpolizal_i", nmpolizal);
        params.put("pv_nmsuplembloque_i", nmsuplem_bloque);
        params.put("pv_nmsuplemsesion_i", nmsuplem_session);
        params.put("pv_tipodocu_i", tipodocu);
        params.put("pv_ndoclider_i", ndoclider);
        params.put("pv_status_i", status);        
        params.put("pv_accion_i", accion);
        ejecutaSP(new MovimientoMsupcoaSP(getDataSource()), params);
    }
    
    protected class MovimientoMsupcoaSP extends StoredProcedure {
        protected MovimientoMsupcoaSP (DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_MOV_MSUPCOA");
            declareParameter(new SqlParameter("pv_cdcialider_i",        Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdunieco_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i",            Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i",            Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpolizal_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplembloque_i",    Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplemsesion_i",    Types.VARCHAR));
            declareParameter(new SqlParameter("pv_tipodocu_i",          Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ndoclider_i",         Types.VARCHAR));
            declareParameter(new SqlParameter("pv_status_i",            Types.VARCHAR));            
            declareParameter(new SqlParameter("pv_accion_i",            Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_rowid_o",          Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o",         Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",          Types.VARCHAR));
            compile();
        }
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public String obtieneCdciaSURA() throws Exception{
        Map<String, Object> resultado = ejecutaSP(new ObtieneCdciaSURASP(getDataSource()), new LinkedHashMap<String, String>());
        String cdcia = (String) resultado.get("pv_cdcia_o");
        if(cdcia == null|| cdcia.length() == 0) {
            throw new ApplicationException("Sin resultados");
        }
        logger.debug(Utils.log("****** obtenerCdciaSURA = ", cdcia));
        return cdcia;
    }
    
    protected class ObtieneCdciaSURASP extends StoredProcedure {
        protected ObtieneCdciaSURASP(DataSource dataSource) {
            super(dataSource,"PKG_DATA_ALEA.P_GET_CDCIA_SURA");
            declareParameter(new SqlOutParameter("pv_cdcia_o",  Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",  Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerCoaseguroAceptado(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i" , cdunieco);
        params.put("pv_cdramo_i"   , cdramo);
        params.put("pv_estado_i"   , estado);
        params.put("pv_nmpoliza_i" , nmpoliza);
        params.put("pv_nmsuplem_i" , nmsuplem);
        List<Map<String, String>> lista = (List<Map<String, String>>) (ejecutaSP(new ObtenerCoaseguroAceptadoDAO(getDataSource()), params)).get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        logger.debug(Utils.log("****** obtenerCoaseguroAceptado lista = ", lista));
        return lista;
    }
    
    protected class ObtenerCoaseguroAceptadoDAO extends StoredProcedure {
        protected ObtenerCoaseguroAceptadoDAO (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_MSUPCOA");
            declareParameter(new SqlParameter("pv_cdunieco_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"    , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i"  , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            String[] cols = new String[] { 
                    "cdcialider",
                    "cdunieco",
                    "cdramo",
                    "estado",
                    "nmpoliza",
                    "nmpolizal",
                    "nmsuplem", 
                    "tipodocu",
                    "ndoclider",
                    "status"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  ,  Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> recuperarCotizadoresDisponibles (String cdusuari) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdusuari_i", cdusuari);
        Map<String, Object> procRes = ejecutaSP(new RecuperarCotizadoresDisponiblesSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        logger.debug(Utils.log("\n****** recuperarCotizadoresDisponibles lista = ", lista));
        return lista;
    }
    
    protected class RecuperarCotizadoresDisponiblesSP extends StoredProcedure {
        protected RecuperarCotizadoresDisponiblesSP (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_COTIZADORES_DISP");
            declareParameter(new SqlParameter("pv_cdusuari_i"  , Types.VARCHAR));
            String[] cols = new String[] { 
                    "cdramo",
                    "dsramo",
                    "cdtipsit",
                    "dstipsit"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  ,  Types.VARCHAR));
            compile();
        }
    }


	@Override
	public List<Map<String, String>> obtenerDatosConfirmacion(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        logger.debug("-->"+params);
		Map<String, Object> resultado = ejecutaSP(new GetDatosConfirmacion(getDataSource()), params);
        List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
	
	protected class GetDatosConfirmacion extends StoredProcedure {
        protected GetDatosConfirmacion (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_DATOSCONFIRMACION");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdunieco", "cdramo", "estado", "nmpoliza", "nmsuplem",
            							   "nmrecibo", "cdtipsup"};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
        }
    }
	
	@Override
	public void insertarAgenteDeSesion (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String cdusuari) throws Exception {
	    Map<String, String> params = new LinkedHashMap<String, String>();
	    params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_cdusuari_i", cdusuari);
        ejecutaSP(new InsertarAgenteDeSesionSP(getDataSource()), params);
	}
    
    protected class InsertarAgenteDeSesionSP extends StoredProcedure {
        protected InsertarAgenteDeSesionSP (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_INSERTA_SESION_AGENTE");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdusuari_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public Map<String, String> validarCargaCotizacion (String cdunieco, String cdramo, String nmpoliza, String cdusuari,
            String cdsisrol) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_cdusuari_i", cdusuari);
        params.put("pv_cdsisrol_i", cdsisrol);
        Map<String, Object> bdRes = ejecutaSP(new ValidarCargaCotizacionSP(getDataSource()), params);
        Map<String, String> result = new LinkedHashMap<String, String>();
        result.put("swexiste", (String) bdRes.get("pv_swexiste_o"));
        result.put("swconfir", (String) bdRes.get("pv_swconfir_o"));
        logger.debug(Utils.log("\n****** validarCargaCotizacion result: ", result));
        return result;
    }
    
    protected class ValidarCargaCotizacionSP extends StoredProcedure {
        protected ValidarCargaCotizacionSP (DataSource dataSource) {
            super(dataSource, "PKG_VALIDA_ALEA.P_VALIDA_CARGAR_COTI");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdusuari_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_swexiste_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_swconfir_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public boolean tieneCoaseguro (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> bdRes = ejecutaSP(new TieneCoaseguroSP(getDataSource()), params);
        boolean coaseguro = false;
        if(!bdRes.isEmpty()){
            if(bdRes.get("pv_coaseguro_o") != null){
                String resp = (String) bdRes.get("pv_coaseguro_o");
                if(resp.equals("S")){
                    coaseguro = true;
                }
            }
        }
        return coaseguro;
    }
    
    protected class TieneCoaseguroSP extends StoredProcedure {
        protected TieneCoaseguroSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_COASEGURO");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_coaseguro_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    public Map<String, String> obtenerPerfilamientoPoliza (String cdunieco, String  cdramo, String estado, String  nmpoliza,
            String nmsuplem) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i" , cdunieco);
        params.put("pv_cdramo_i"   , cdramo);
        params.put("pv_estado_i"   , estado);
        params.put("pv_nmpoliza_i" , nmpoliza);
        params.put("pv_nmsuplem_i" , nmsuplem);
        Map<String, Object> bdRes = ejecutaSP(new ObtenerPerfilamientoPolizaSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) bdRes.get("pv_registro_o");
        Map<String, String> perf = null;
        if (lista != null && lista.size() == 1) {
            perf = lista.get(0);
        } else if (lista != null && lista.size() > 1) {
            throw new ApplicationException("Perfilamiento duplicado");
        }
        logger.debug(Utils.log("\n****** obtenerPerfilamientoPoliza result: ", perf));
        return perf;
    }
    
    protected class ObtenerPerfilamientoPolizaSP extends StoredProcedure {
        protected ObtenerPerfilamientoPolizaSP (DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_PERFIL_POLIZA");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            String[] cols = new String[] { "cdptovta", "cdgrupo", "cdsubgpo", "cdperfil" };
            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void eliminaCoaseguro (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        ejecutaSP(new EliminaCoaseguroSP(getDataSource()), params);
    }
    
    protected class EliminaCoaseguroSP extends StoredProcedure {
        protected EliminaCoaseguroSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_ELIMINA_COASEGURO");           
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void actualizaSwitchCoaseguroCedido (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, String cdesqcoa) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_esqu_coaseg_i", cdesqcoa);
        ejecutaSP(new ActualizaSwitchCoaseguroCedidoSP(getDataSource()), params);
    }
    
    protected class ActualizaSwitchCoaseguroCedidoSP extends StoredProcedure {
        protected ActualizaSwitchCoaseguroCedidoSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_ACTU_COMI_COAS");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_esqu_coaseg_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void actualizaGestorCobro (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        ejecutaSP(new actualizaGestorCobroSP(getDataSource()), params);
    }
    
    protected class actualizaGestorCobroSP extends StoredProcedure {
        protected actualizaGestorCobroSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.p_upt_gestor");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerTsiexcoa(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new ObtenerTsiexcoaSP(getDataSource()), params);
        List<Map<String, String>> lista =(List<Map<String,String>>)resultado.get("pv_registro_o");
        if(lista == null||lista.size() == 0) {
            throw new ApplicationException("Sin resultados");
        }
        return lista;
    }
    
    protected class ObtenerTsiexcoaSP extends StoredProcedure {
        protected ObtenerTsiexcoaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_TSIEXCOA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerTgrexcoa(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_cdgarant_i", cdgarant);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new ObtenerTgrexcoaSP(getDataSource()), params);
        List<Map<String, String>> lista =(List<Map<String,String>>)resultado.get("pv_registro_o");
        if(lista == null||lista.size() == 0) {
            throw new ApplicationException("Sin resultados");
        }
        return lista;
    }
    
    protected class ObtenerTgrexcoaSP extends StoredProcedure {
        protected ObtenerTgrexcoaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_TGREXCOA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgarant_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public String obtenerCdtipcoaPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
        Map<String, Object> resultado = ejecutaSP(new ObtenerCdtipcoaPolizaSP(getDataSource()), params);
        String cdtipcoa =(String)resultado.get("pv_cdtipcoa_o");
        return cdtipcoa;
    }
    
    protected class ObtenerCdtipcoaPolizaSP extends StoredProcedure {
        protected ObtenerCdtipcoaPolizaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_CDTIPCOA_POLIZA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_cdtipcoa_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void movimientoTsiexcoa(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem, String accion) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_accion_i", accion);
        ejecutaSP(new MovimientoTsiexcoaSP(getDataSource()), params);
    }
    
    protected class MovimientoTsiexcoaSP extends StoredProcedure {
        protected MovimientoTsiexcoaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_MOV_TSIEXCOA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public void movimientoTgrexcoa (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdcapita, String nmsuplem, String accion) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_cdcapita_i", cdcapita);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_accion_i", accion);
        ejecutaSP(new movimientoTgrexcoaSP(getDataSource()), params);
    }
    
    protected class movimientoTgrexcoaSP extends StoredProcedure {
        protected movimientoTgrexcoaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_MOV_TGREXCOA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsituac_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdcapita_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerRegistrosPerfilamiento (String cdusuari, String cdramo) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdusuari_i", cdusuari);
        params.put("pv_cdramo_i", cdramo);
        Map<String, Object> procRes = ejecutaSP(new ObtenerRegistrosPerfilamientoSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String,String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerRegistrosPerfilamientoSP extends StoredProcedure {
        protected ObtenerRegistrosPerfilamientoSP (DataSource dataSource) {
            super(dataSource, "PKG_LOV_ALEA.P_GET_DATOS_PV");           
            declareParameter(new SqlParameter("pv_cdusuari_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            String[] cols = new String[] {"cdptovta", "dsobserv", "cdgrupo", "dsgrupo", "cdsubgrupo", "dssubgrp", "cdperfit", "dsperfit",
                    "cdunieco", "dsunieco"};
            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public String obtenerAgenteUsuario(String cdusuari) throws Exception{
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdusuari_i", cdusuari);
        Map<String, Object> procRes = ejecutaSP(new ObtenerAgenteUsuarioSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        String cdagente = "";
        if(lista.size() > 0){
            cdagente = lista.get(0).get("cdagente");
        }
        return cdagente;
    }
    
    protected class ObtenerAgenteUsuarioSP extends StoredProcedure {
        protected ObtenerAgenteUsuarioSP (DataSource dataSource) {
            super(dataSource, "PKG_ACCESO_ALEA.P_GET_AGENTE");           
            declareParameter(new SqlParameter("pv_cdusuari_i", Types.VARCHAR));
            String[] cols = new String[] {"cdagente"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    public List<Map<String, String>> puedeEmitir(String cdunieco, String cdramo, String estado, String nmpoliza, 
            String nmsuplem) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        List<Map<String, String>> errores =new ArrayList<>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsuplem_i", nmsuplem);
      //  if(true){ return false;}
        Map<String, Object> procRes  = ejecutaSP(new puedeEmitirSP(getDataSource()), params);
        String res = (String) procRes.get("v_return");
        errores = (List<Map<String, String>>) procRes.get("pv_registro_o");
        
        return errores;
    }
    
	protected class puedeEmitirSP extends StoredProcedure {
		protected puedeEmitirSP(DataSource dataSource) {
			super(dataSource,"PKG_VALIDA_ALEA.F_VAL_EMISION");
			/** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));    
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			String[] cols = new String[] {"tipo","otvalor"};
            declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			
            /** use function instead of stored procedure */
            setFunction(true);
			
			compile();
		}
	}


	@Override
	public List<Map<String, String>> obtenerNsublogi(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsuplem) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
	    params.put("pv_cdunieco_i", cdunieco);
	    params.put("pv_cdramo_i", cdramo);
	    params.put("pv_estado_i", estado);
	    params.put("pv_nmpoliza_i", nmpoliza);
	    params.put("pv_nmsuplem_i", nmsuplem);
	    Map<String, Object> resultado = ejecutaSP(new ObtenerNsublogi(getDataSource()), params);
	    List<Map<String, String>> lista =(List<Map<String,String>>)resultado.get("pv_registro_o");
	    
	    logger.debug("Resultado ", lista);
	    
	    if(lista == null||lista.size() == 0) {
	    	throw new ApplicationException("Sin resultados");
	    }
	    return lista;
	}

	protected class ObtenerNsublogi extends StoredProcedure {
        protected ObtenerNsublogi(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_NSUPLOGI");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
	
	@Override
	public List<Map<String, String>> consultaDuplicidad(String cdunieco, String cdramo, String feini, String fefin, String nmsolici, String cdtipide, 
            String cdideper, String dsnombre, String cdgrupo, String cdsubgpo, String cdagente, String cdpostal, 
            String dsdomici, String nmnumero, String otpiso) throws Exception{
	    Map<String, String> params = new LinkedHashMap<String, String>();
	    params.put("pv_cdunieco_i"   ,cdunieco);        
	    params.put("pv_cdramo_i"     ,cdramo); 
	    params.put("pv_fe_ini_i"     ,feini); 
	    params.put("pv_fe_fin_i"     ,fefin); 
	    params.put("pv_nmsolici_i"   ,nmsolici); 
	    params.put("pv_cdtipide_i"   ,cdtipide); 
	    params.put("pv_cdideper_i"   ,cdideper);
	    params.put("pv_dsnombre_i"   ,dsnombre);
	    params.put("pv_cdgrupo_i"    ,cdgrupo);
	    params.put("pv_cdsubgrupo_i" ,cdsubgpo);
	    params.put("pv_cdagente_i"   ,cdagente);
	    params.put("pv_cdpostal_i"   ,cdpostal);
	    params.put("pv_dsdomici_i"   ,dsdomici);
	    params.put("pv_nmnumero_i"   ,nmnumero);
	    params.put("pv_otpiso_i"     ,otpiso);
        Map<String, Object> resultado = ejecutaSP(new ConsultaDuplicidadSP(getDataSource()), params);
        List<Map<String, String>> lista =(List<Map<String,String>>)resultado.get("pv_registro_o");        
        logger.debug("Resultado ", lista);
        return lista;
	}
	
	protected class ConsultaDuplicidadSP extends StoredProcedure {
        protected ConsultaDuplicidadSP(DataSource dataSource) {
            super(dataSource, "PKG_VALIDA_ALEA.F_VAL_DUPLICADO");
            declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fe_ini_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fe_fin_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsolici_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipide_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdideper_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_dsnombre_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgrupo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsubgrupo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagente_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdpostal_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_dsdomici_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmnumero_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otpiso_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }
	
	@Override
	public List<Map<String, String>> consutaDuplicidadPoliza(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception{
	    Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i"   ,cdunieco);        
        params.put("pv_cdramo_i"     ,cdramo); 
        params.put("pv_estado_i"     ,estado); 
        params.put("pv_nmpoliza_i"   ,nmpoliza);
        Map<String, Object> resultado = ejecutaSP(new ConsultaDuplicidadPolizaSP(getDataSource()), params);
        List<Map<String, String>> lista =(List<Map<String,String>>)resultado.get("pv_registro_o");        
        logger.debug("Resultado ", lista);
        return lista;
	}
	
	protected class ConsultaDuplicidadPolizaSP extends StoredProcedure {
        protected ConsultaDuplicidadPolizaSP(DataSource dataSource) {
            super(dataSource, "PKG_DATA_ALEA.P_GET_EXP_POLIZA");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new DinamicMapper()));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
}