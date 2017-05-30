package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jdbc.support.oracle.SqlStructValue;
import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
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
		
		 //params.put("Identificador_Error",   Identificador_Error);
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
		// params.put("pv_rowid_i",   rowid);
		 params.put("pv_accion_i",        accion);	
		 
		 Map<String, Object> resultado = ejecutaSP(new MovimientoMpolizasSP(getDataSource()), params);
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
            declareParameter(new SqlParameter("pv_feanulac_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swautori_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdmoneda_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feinisus_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fefinsus_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ottempot_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feefecto_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_hhefecto_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feproren_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fevencim_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmrenova_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ferecibo_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feultsin_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmnumsin_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipcoa_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swtarifi_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swabrido_i"       , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_feemisio_i"       , Types.VARCHAR));
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
	
	
	@Override			//nombre
	public void movimientoTvalopol(String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdatribu, String nmsuplem, String otvalor_new, String otvalor_old) throws Exception{

		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",		 cdunieco);
		params.put("pv_cdramo_i",       cdramo);
		params.put("pv_estado_i",       estado);
		params.put("pv_nmpoliza_i",       nmpoliza);
		params.put("pv_cdatribu_i",     cdatribu);
		params.put("pv_nmsuplem_i",     nmsuplem);
		params.put("pv_otvalor_new_i",     otvalor_new);
		params.put("pv_otvalor_old_i",     otvalor_old);
		//params.put("Status_Registro",     Status_Registro);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new MovimientoTvalopolCdatribuSP(getDataSource()), params);
}
					//Clase
	protected class MovimientoTvalopolCdatribuSP extends StoredProcedure
	{
		protected MovimientoTvalopolCdatribuSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_TVALOPOL");// Nombre
			//SqlParameters
			//declareParameter(new SqlInOutParameter("Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otvalor_new_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otvalor_old_i",Types.VARCHAR));
			//declareParameter(new SqlParameter("Status_Registro",Types.VARCHAR));
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem_sesion, String nmsuplem_bean, String status,
            String cdtipsit, String swreduci, String cdagrupa, String cdestado, String fefecsit,
            String fecharef, String indparbe, String feinipbs, String porparbe, String intfinan,
            String cdmotanu, String feinisus, String fefinsus, String accion) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	params.put("pv_cdunieco_i",	 cdunieco);
	params.put("pv_cdramo_i",         cdramo);
	params.put("pv_estado_i",         estado);
	params.put("pv_nmpoliza_i",         nmpoliza);
	params.put("pv_nmsituac_i",         nmsituac);
	params.put("pv_nmsuplem_sesion_i",            nmsuplem_sesion);
	params.put("pv_nmsuplem_bean_i",            nmsuplem_bean);
	params.put("pv_status_i",         status);
	params.put("pv_cdtipsit_i",     cdtipsit);
	params.put("pv_swreduci_i",     swreduci);
	params.put("pv_cdagrupa_i",     cdagrupa);
	params.put("pv_cdestado_i",     cdestado);
	params.put("pv_fefecsit_i",     fefecsit);
	params.put("pv_fecharef_i",     fecharef);
	params.put("pv_indparbe_i",     indparbe);
	params.put("pv_feinipbs_i",     feinipbs);
	params.put("pv_porparbe_i",     porparbe);
	params.put("pv_intfinan_i",     intfinan);
	params.put("pv_cdmotanu_i",     cdmotanu);
	params.put("pv_feinisus_i",     feinisus);
	params.put("pv_fefinsus_i",     fefinsus);
	params.put("pv_accion_i",            accion);
//	params.put("Rowid",     null);
//	params.put("Error",            null);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoMpolisitSP(getDataSource()), params);
	}
				//Clase
	protected class MovimientoMpolisitSP extends StoredProcedure
	{
		protected MovimientoMpolisitSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_Mov_Mpolisit");// Nombre
			//SqlParameters
			
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_sesion_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_bean_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_status_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_swreduci_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdagrupa_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdestado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_fefecsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_fecharef_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_indparbe_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_feinipbs_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_porparbe_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_intfinan_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdmotanu_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_feinisus_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_fefinsus_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i",Types.VARCHAR));
			
 			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String cdtipsit, String cdatribu, String nmsuplem, String otvalor,
            String accion) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Identificador_Error",Identificador_Error);
	params.put("pv_cdunieco_i",	  cdunieco);
	params.put("pv_cdramo_i",        cdramo);
	params.put("pv_estado_i",        estado);
	params.put("pv_nmpoliza_i",       nmpoliza);
	params.put("pv_nmsituac_i",       nmsituac);
	params.put("pv_cdtipsit_i",       cdtipsit);
	params.put("pv_cdatribu_i",       cdatribu);
	params.put("pv_nmsuplem_i",       nmsuplem);
	params.put("pv_otvalor_i",        otvalor);
	params.put("pv_accion_i",               accion); 
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoTvalositSP(getDataSource()), params);
	}
				//Clase
	protected class MovimientoTvalositSP extends StoredProcedure
	{
		protected MovimientoTvalositSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_TVALOSIT");// Nombre
			//SqlParameters
			//declareParameter(new SqlParameter("Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otvalor_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i",Types.VARCHAR));
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	
	@Override //nombre
	public void movimientoMpoligar(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem_session, String cdgarant, String cdcapita, Date fevencim,
            String accion) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Identificador_Error",				Identificador_Error);
	params.put("pv_cdunieco_i",               cdunieco);
	params.put("pv_cdramo_i",               cdramo);
	params.put("pv_estado_i",               estado);
	params.put("pv_nmpoliza_i",               nmpoliza);
	params.put("pv_nmsituac_i",               nmsituac);
	params.put("pv_nmsuplem_session_i",       nmsuplem_session);
	params.put("pv_cdgarant_i",               cdgarant);
	params.put("pv_cdcapita_i",               cdcapita);
	params.put("pv_fevencim_i",               fevencim);
	params.put("pv_accion_i",	            accion);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoMpoligarSP(getDataSource()), params);
	}
				//Clase
	protected class MovimientoMpoligarSP extends StoredProcedure
	{
		protected MovimientoMpoligarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLIGAR");// Nombre
			//SqlParameters
			//declareParameter(new SqlInOutParameter("Identificador_Error",Types.VARCHAR));
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
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoTvalogar(String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdatribu, String nmsuplem, String nmsituac, String cdgarant, String otvalor,
            String accion) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Identificador_Error",	   Identificador_Error);
	params.put("pv_cdunieco_i",      cdunieco);
	params.put("pv_cdramo_i",      cdramo);
	params.put("pv_estado_i",      estado);
	params.put("pv_nmpoliza_i",      nmpoliza);
	params.put("pv_cdatribu_i",      cdatribu);
	params.put("pv_nmsuplem_i",      nmsuplem);
	params.put("pv_nmsituac_i",      nmsituac);
	params.put("pv_cdgarant_i",      cdgarant);
	params.put("pv_otvalor_i",      otvalor);
	params.put("pv_accion_i",      accion);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoTvalogarSP(getDataSource()), params);
	}
				//Clase
	protected class MovimientoTvalogarSP extends StoredProcedure
	{
		protected MovimientoTvalogarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_TVALOGAR");// Nombre
			//SqlParameters
			//declareParameter(new SqlParameter("Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otvalor_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i",Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoMpolicap(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem_sesion, String swrevalo, String cdcapita, String ptcapita,
            String nmsuplem_bloque, String modoacceso) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Identificador_Error",Identificador_Error);
	params.put("pv_cdunieco_i",cdunieco);
	params.put("pv_cdramo_i",cdramo);
	params.put("pv_estado_i",estado);
	params.put("pv_nmpoliza_i",nmpoliza);
	params.put("pv_nmsituac_i",nmsituac);
	params.put("pv_nmsuplem_sesion_i",nmsuplem_sesion);
	params.put("pv_swrevalo_i",swrevalo);
	params.put("pv_cdcapita_i",cdcapita);
	params.put("pv_ptcapita_i",ptcapita);
	params.put("pv_nmsuplem_bloque_i",nmsuplem_bloque);
	//params.put("pv_rowid_i",rowid);
	params.put("pv_modoacceso_i",modoacceso);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoMpolicapSP(getDataSource()), params);
	}
				//Clase
	protected class MovimientoMpolicapSP extends StoredProcedure
	{
		protected MovimientoMpolicapSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MPOLICAP");// Nombre
			//SqlParameters
			//declareParameter(new SqlParameter("Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlInOutParameter("pv_identificador_error_i",Types.VARCHAR));
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
			//declareParameter(new sqlinoutparameter("pv_rowid_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_modoacceso_i",Types.VARCHAR));			
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpoligar(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		
		params.put("pv_cdunieco_i",	    cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",      nmpoliza);
		params.put("pv_nmsituac_i",      nmsituac);
		params.put("pv_cdgarant_i",      cdgarant);
		params.put("pv_nmsuplem_i",      nmsuplem);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpoligarSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpoligarSP extends StoredProcedure
	{
		protected ObtieneMpoligarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIGAR");// Nombre
			//SqlParameters
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
	
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpolicap(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdcapita, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",    nmpoliza);
		params.put("pv_nmsituac_i",    nmsituac);
		params.put("pv_cdcapita_i",    cdcapita);
		params.put("pv_nmsuplem_i",    nmsuplem);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolicapSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpolicapSP extends StoredProcedure
	{
		protected ObtieneMpolicapSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLICAP");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco",
					 "cdramo",
					   "estado",
					 "nmpoliza",
					 "nmsituac",
					 
					           "cdcapita",
					 "nmsuplem",
					 "status",
					 "ptcapita",
					 "ptreduci",
					 
					           "fereduci",
					 "swrevalo"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTvalogar(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",    nmpoliza);
		params.put("pv_nmsituac_i",    nmsituac);
		params.put("pv_cdgarant_i",    cdgarant);
		params.put("pv_nmsuplem_i",    nmsuplem);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalogarSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTvalogarSP extends StoredProcedure
	{
		protected ObtieneTvalogarSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TVALOGAR");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
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
	
	@Override //nombre
	public List<Map<String,String>> obtieneMcapital(String cdramo, String cdcapita) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdramo_i",    cdramo);
		params.put("pv_cdcapita_i",    cdcapita);
		
		
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMcapitaSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMcapitaSP extends StoredProcedure
	{
		protected ObtieneMcapitaSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MCAPITAL");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
					"cdramo",
					"cdcapita",
					"cdtipcap",
					"dscapita"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTgaranti(String cdgarant) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdgarant_i", cdgarant);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTgarantiSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTgarantiSP extends StoredProcedure
	{
		protected ObtieneTgarantiSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TGARANTI");// Nombre
			
			//SqlParameters

			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
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
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpolisit(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	   cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",      nmpoliza);
		params.put("pv_nmsituac_i",      nmsituac);
		params.put("pv_nmsuplem_i",      nmsuplem);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolisitSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpolisitSP extends StoredProcedure
	{
		protected ObtieneMpolisitSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLISIT");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco", "cdramo",   "estado",   "nmpoliza", "nmsituac", 
			           "nmsuplem", "status",   "cdtipsit", "swreduci", "cdagrupa", 
			           "cdestado", "fefecsit", "fecharef", "indparbe", "feinipbs", 
			           "porparbe", "intfinan", "cdmotanu", "feinisus", "fefinsus",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTvalosit(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdtipsit, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	 cdunieco);
		params.put("pv_cdramo_i",   cdramo);
		params.put("pv_estado_i",   estado);
		params.put("pv_nmpoliza_i",   nmpoliza);
		params.put("pv_nmsituac_i",   nmsituac);
		params.put("pv_cdtipsit_i",   cdtipsit);
		params.put("pv_nmsuplem_i",   nmsuplem);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalositSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTvalositSP extends StoredProcedure
	{
		protected ObtieneTvalositSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TVALOSIT");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco",   "cdramo",     "estado",     "nmpoliza",   "nmsituac", 
			           "nmsuplem",   "status",     "cdtipsit", 
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
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpolizas(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsuplem) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	    cdunieco);
		params.put("pv_cdramo_i",      cdramo);
		params.put("pv_estado_i",      estado);
		params.put("pv_nmpoliza_i",      nmpoliza);
		params.put("pv_nmsuplem_i",      nmsuplem);
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolizasSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpolizasSP extends StoredProcedure
	{
		protected ObtieneMpolizasSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPOLIZAS");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
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
	
	@Override //nombre
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
				//Clase
	protected class ObtieneTvalopolSP extends StoredProcedure
	{
		protected ObtieneTvalopolSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TVALOPOL");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
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
	    params.put("pv_tvalo_record_i", new SqlStructValue<TvalopolVO>(tvalopol));
	    params.put("pv_nmsuplemsesion_i", nmsuplemSesion);
	    params.put("pv_accion_i", accion);
	    ejecutaSP(new MovimientoTvalopolSP(getDataSource()), params);
	}
    
    protected class MovimientoTvalopolSP extends StoredProcedure {
        protected MovimientoTvalopolSP (DataSource dataSource) {
            super(dataSource, "P_SAT_MOV_TVALOPOL");
            declareParameter(new SqlParameter("pv_tvalo_record_i"   , Types.STRUCT, "TVALOPOL_OBJECT"));
            declareParameter(new SqlParameter("pv_nmsuplemsesion_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i"         , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o" , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"  , Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public Map<String, String> ejecutarValoresDefecto (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, String cdbloque) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        params.put("pv_nmsituac_i", nmsituac);
        params.put("pv_nmsuplem_i", nmsuplem);
        params.put("pv_cdbloque_i", cdbloque);
        Map<String, Object> procRes = ejecutaSP(new EjecutarValoresDefectoSP(getDataSource()), params);
        String valores = (String) procRes.get("pv_valores_o");
        if (StringUtils.isBlank(valores)) {
            valores = "";
        }
        
        Map<String, String> valoresMap = new LinkedHashMap<String, String>();
        
        String[] valoresArray = valores.split(" ");
        for (int i = 0; i < valoresArray.length ; i = i + 2) {
            valoresMap.put(valoresArray[i].replaceAll(Utils.join(cdbloque, "."), "").toLowerCase(), valoresArray[i + 1]);
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
            declareParameter(new SqlOutParameter("pv_string_val_o" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o"     , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"      , Types.VARCHAR));
            compile();
        }
    }
}
