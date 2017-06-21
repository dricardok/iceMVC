package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.data.jdbc.support.oracle.SqlStructValue;
import org.springframework.jdbc.core.SqlInOutParameter;
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

import mx.com.segurossura.emision.dao.RegistoPersonaDAO;
import mx.com.segurossura.emision.model.TvaloperVO;
import mx.com.segurossura.emision.model.TvalositVO;

@Repository
public class RegistroPersonaDAOImpl extends HelperJdbcDao implements RegistoPersonaDAO{

	
	@Override
    public List<Map<String,String>> lovCdpost(String pv_cdcodpos_i,
    		String pv_cdprovin_i,
    		String pv_cdmunici_i,
    		String pv_cdciudad_i) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdcodpos_i", pv_cdcodpos_i);
        params.put("pv_cdprovin_i", pv_cdprovin_i);
        params.put("pv_cdmunici_i", pv_cdmunici_i);
        params.put("pv_cdciudad_i", pv_cdciudad_i);
        

        Map<String, Object> resultado = ejecutaSP(new LovCdpostSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
    }
    
	protected class LovCdpostSP extends StoredProcedure {
		protected LovCdpostSP(DataSource dataSource) {
			super(dataSource,"PKG_LOV_ALEA.P_LOV_CODPOST");
			declareParameter(new SqlParameter("pv_cdcodpos_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdprovin_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdmunici_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdciudad_i",Types.VARCHAR));
			String[] cols=new String[]{
					 
					"cdcodpos",
					"dscodpos",
                    "cdprovin",
                    "dsprovin",
                    "cdmunici",
                    "dsmunici",
                    "cdciudad",
                    "dsciudad",
                    "tipoiva",
                    "cdpais",
                    "descripl",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public List<Map<String,String>> obtieneTvaloper(
    		String cdperson) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdperson_i", cdperson);
        

        Map<String, Object> resultado = ejecutaSP(new ObtieneTvaloperSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
    }
    
	protected class ObtieneTvaloperSP extends StoredProcedure {
		protected ObtieneTvaloperSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_TVALOPER");
			declareParameter(new SqlParameter("pv_cdperson_i",Types.VARCHAR));
			String[] cols=new String[]{
					"cdperson",
					"otvalor01",
					"otvalor02",
					"otvalor03",
					"otvalor04",
					"otvalor05",
					"otvalor06",
					"otvalor07",
					"otvalor08",
					"otvalor09",
					"otvalor10",
					"otvalor11",
					"otvalor12",
					"otvalor13",
					"otvalor14",
					"otvalor15",
					"otvalor16",
					"otvalor17",
					"otvalor18",
					"otvalor19",
					"otvalor20",
					"otvalor21",
					"otvalor22",
					"otvalor23",
					"otvalor24",
					"otvalor25",
					"otvalor26",
					"otvalor27",
					"otvalor28",
					"otvalor29",
					"otvalor30",
					"otvalor31",
					"otvalor32",
					"otvalor33",
					"otvalor34",
					"otvalor35",
					"otvalor36",
					"otvalor37",
					"otvalor38",
					"otvalor39",
					"otvalor40",
					"otvalor41",
					"otvalor42",
					"otvalor43",
					"otvalor44",
					"otvalor45",
					"otvalor46",
					"otvalor47",
					"otvalor48",
					"otvalor49",
					"otvalor50",
					"otvalor51",
					"otvalor52",
					"otvalor53",
					"otvalor54",
					"otvalor55",
					"otvalor56",
					"otvalor57",
					"otvalor58",
					"otvalor59",
					"otvalor60",
					"otvalor61",
					"otvalor62",
					"otvalor63",
					"otvalor64",
					"otvalor65",
					"otvalor66",
					"otvalor67",
					"otvalor68",
					"otvalor69",
					"otvalor70",
					"otvalor71",
					"otvalor72",
					"otvalor73",
					"otvalor74",
					"otvalor75",
					"otvalor76",
					"otvalor77",
					"otvalor78",
					"otvalor79",
					"otvalor80",
					"otvalor81",
					"otvalor82",
					"otvalor83",
					"otvalor84",
					"otvalor85",
					"otvalor86",
					"otvalor87",
					"otvalor88",
					"otvalor89",
					"otvalor90",
					"otvalor91",
					"otvalor92",
					"otvalor93",
					"otvalor94",
					"otvalor95",
					"otvalor96",
					"otvalor97",
					"otvalor98",
					"otvalor99",
					"otvalor100",
					"otvalor101",
					"otvalor102",
					"otvalor103",
					"otvalor104",
					"otvalor105",
					"otvalor106",
					"otvalor107",
					"otvalor108",
					"otvalor109",
					"otvalor110",
					"otvalor111",
					"otvalor112",
					"otvalor113",
					"otvalor114",
					"otvalor115",
					"otvalor116",
					"otvalor117",
					"otvalor118",
					"otvalor119",
					"otvalor120"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public List<Map<String,String>> obtieneMpersona(
    		String cdperson) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdperson_i", cdperson);
        

        Map<String, Object> resultado = ejecutaSP(new ObtieneTvaloperSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
    }
    
	protected class ObtieneMpersonaSP extends StoredProcedure {
		protected ObtieneMpersonaSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MPERSONA");
			declareParameter(new SqlParameter("pv_cdperson_i",Types.VARCHAR));
			String[] cols=new String[]{
					"cdperson",
					"cdtipide",
					"cdideper",
					"dsnombre",
					"dsnombr1",
					"dsnombr2",
					"dsapell1",
					"dsapell2",
					"cdtipper",
					"otfisjur",
					"otsexo",
					"fenacimi",
					"cdprovin"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public List<Map<String,String>> obtieneMdomicil(
    		String cdperson,
    		String nmorddom) throws Exception {

        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_cdperson_i", cdperson);
        params.put("pv_nmorddom_i", nmorddom);
        

        Map<String, Object> resultado = ejecutaSP(new ObtieneMdomicilSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        
		return listaDatos;
    }
    
	protected class ObtieneMdomicilSP extends StoredProcedure {
		protected ObtieneMdomicilSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GET_MDOMICIL");
			declareParameter(new SqlParameter("pv_cdperson_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmorddom_i",Types.VARCHAR));
			String[] cols=new String[]{
					"cdperson",
					"nmorddom",
					"cdtipdom",
					"dsdomici",
					"cdsiglas",
					"cdidioma",
					"nmtelex",
					"nmfax",
					"nmtelefo",
					"cdpostal",
					"otpoblac",
					"cdpais",
					"otpiso",
					"nmnumero",
					"cdprovin",
					"dsprovin",
					"cdmunici",
					"dsmunici",
					"dszona",
					"cdcoloni",
					"dscoloni",
					"cdciudad",
					"dsciudad"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public void movimientoTvaloper(
    		String cdperson,Map<String, String> otvalores, String accion) throws Exception {

		TvaloperVO tvaloper =new TvaloperVO(cdperson);
		String key;
		for (int i = 1; i <= 120; i++) {
            if (i < 10) {
                key = Utils.join("otvalor0", i);
            } else {
                key = Utils.join("otvalor", i);
            }
            tvaloper.put(key, otvalores.get(key));
        }
		Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_status_registro_i", accion);
        params.put("pv_tvalo_record_i", new SqlStructValue<TvaloperVO>(tvaloper));
        

        ejecutaSP(new MovimientoTvaloperSP(getDataSource()), params);
		
    }
    
	protected class MovimientoTvaloperSP extends StoredProcedure {
		protected MovimientoTvaloperSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_TVALOPER");
			this.getJdbcTemplate().setNativeJdbcExtractor(new OracleJdbc4NativeJdbcExtractor()); 
			declareParameter(new SqlParameter("pv_status_registro_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_tvalo_record_i", Types.STRUCT, "TVALOPER_OBJECT"));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public void movimientoMpersona(
    		String cdperson,
    		String cdtipide,
    		String cdideper,
    		String dsnombre,
    		String dsnombr1,
    		String dsnombr2,
    		String dsapell1,
    		String dsapell2,
    		String cdtipper,
    		String otfisjur,
    		String otsexo  ,
    		Date fenacimi,
    		String cdprovin,
    		String accion  ) throws Exception {

		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdperson_i",  cdperson);
		params.put("pv_cdtipide_i",  cdtipide);
		params.put("pv_cdideper_i",  cdideper);
		params.put("pv_dsnombre_i",  dsnombre);
		params.put("pv_dsnombr1_i",  dsnombr1);
		params.put("pv_dsnombr2_i",  dsnombr2);
		params.put("pv_dsapell1_i",  dsapell1);
		params.put("pv_dsapell2_i",  dsapell2);
		params.put("pv_cdtipper_i",  cdtipper);
		params.put("pv_otfisjur_i",  otfisjur);
		params.put("pv_otsexo_i",  otsexo);
		params.put("pv_fenacimi_i",  fenacimi);
		params.put("pv_cdprovin_i",  cdprovin);
		params.put("pv_accion_i",  accion);
        

        ejecutaSP(new MovimientoMpersonaSP(getDataSource()), params);
		
    }
    
	protected class MovimientoMpersonaSP extends StoredProcedure {
		protected MovimientoMpersonaSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MPERSONA");
			declareParameter(new SqlParameter("pv_cdperson_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipide_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdideper_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dsnombre_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dsnombr1_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dsnombr2_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dsapell1_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dsapell2_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipper_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otfisjur_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otsexo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_fenacimi_i", Types.DATE));
			declareParameter(new SqlParameter("pv_cdprovin_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public void movimientoMdomicil(
    		String cdperson,
    		String nmorddom,
    		String cdtipdom,
    		String dsdomici,
    		String cdsiglas,
    		String cdidioma,
    		String nmtelex,
    		String nmfax,
    		String nmtelefo,
    		String cdpostal,
    		String otpoblac,
    		String cdpais,
    		String otpiso,
    		String nmnumero,
    		String cdprovin,
    		String dszona,
    		String cdcoloni,
    		String accion) throws Exception {

		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdperson_i",		cdperson);
		params.put("pv_nmorddom_i",       nmorddom);
		params.put("pv_cdtipdom_i",       cdtipdom);
		params.put("pv_dsdomici_i",       dsdomici);
		params.put("pv_cdsiglas_i",       cdsiglas);
		params.put("pv_cdidioma_i",       cdidioma);
		params.put("pv_nmtelex_i",        nmtelex);
		params.put("pv_nmfax_i",          nmfax);
		params.put("pv_nmtelefo_i",       nmtelefo);
		params.put("pv_cdpostal_i",       cdpostal);
		params.put("pv_otpoblac_i",       otpoblac);
		params.put("pv_cdpais_i",         cdpais);
		params.put("pv_otpiso_i",         otpiso);
		params.put("pv_nmnumero_i",       nmnumero);
		params.put("pv_cdprovin_i",       cdprovin);
		params.put("pv_dszona_i",         dszona);
		params.put("pv_cdcoloni_i",       cdcoloni);
		params.put("pv_accion_i",         accion);
        

        ejecutaSP(new MovimientoMdomicilSP(getDataSource()), params);
		
    }
    
	protected class MovimientoMdomicilSP extends StoredProcedure {
		protected MovimientoMdomicilSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_MOV_MDOMICIL");
			declareParameter(new SqlParameter("pv_cdperson_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmorddom_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipdom_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dsdomici_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdsiglas_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdidioma_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmtelex_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmfax_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmtelefo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdpostal_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otpoblac_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdpais_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otpiso_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmnumero_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdprovin_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_dszona_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcoloni_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public List<Map<String,String>> obtieneAttrXRol(
    		String cdramo,
    		String cdrol) throws Exception {

		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdramo_i",		cdramo);
		params.put("pv_cdrol_i",       cdrol);
		
        

        Map<String, Object> resultado = ejecutaSP(new ObtieneAttrXRolSP(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
        if (listaDatos == null || listaDatos.size() == 0) {
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
    }
    
	protected class ObtieneAttrXRolSP extends StoredProcedure {
		protected ObtieneAttrXRolSP(DataSource dataSource) {
			super(dataSource,"PKG_LOV_ALEA.P_LOV_ATTRXROL");
			
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdrol_i", Types.VARCHAR));
			String[] cols=new String[]{
					"cdatribu",
					"dsatribu",
					"swformat",
					"nmlmin",
					"nmlmax",
					"ottabval",
					"swobliga"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	
	@Override
    public String generaCdperson() throws Exception {

		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		
        
		params.put("pv_cdperson_o", null);
        Map<String, Object> resultado = ejecutaSP(new GeneraCdpersonSP(getDataSource()), params);
        String cdperson=(String)resultado.get("pv_cdperson_o");
        
        if(cdperson==null){
        	throw new ApplicationException("No se pudo generar el cdperson");
        }
        
		return cdperson;
    }
    
	protected class GeneraCdpersonSP extends StoredProcedure {
		protected GeneraCdpersonSP(DataSource dataSource) {
			super(dataSource,"PKG_DATA_ALEA.P_GENERA_CDPERSON");
			
			declareParameter(new SqlInOutParameter("pv_cdperson_o"    , Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
}
