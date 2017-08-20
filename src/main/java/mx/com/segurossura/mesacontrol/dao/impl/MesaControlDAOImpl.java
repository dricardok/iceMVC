package mx.com.segurossura.mesacontrol.dao.impl;

import java.sql.Types;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.mesacontrol.dao.MesaControlDAO;

@Repository("mesaControlDAOImplNew")
public class MesaControlDAOImpl extends HelperJdbcDao implements MesaControlDAO {
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlDAOImpl.class);

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza, 
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici, String cdusuari, String cdsisrol, long start, long limit) throws Exception {
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		params.put("pv_cdunieco_i", cdunieco);
	    params.put("pv_cdramo_i",   cdramo);
	    params.put("pv_estado_i",   estado);
	    params.put("pv_nmpoliza_i", nmpoliza);
	    params.put("pv_cdagente_i", cdagente);
	    params.put("pv_ntramite_i", ntramite);
	    params.put("pv_estatus_i", estatus);
	    params.put("pv_fstatusi_i", desde);
	    params.put("pv_fstatusf_i", hasta);
	    params.put("pv_nombre_i", nombre);
	    params.put("pv_nmsolici_i", nmsolici);
	    params.put("pv_cdusuari_i", cdusuari);
        params.put("pv_cdsisrol_i", cdsisrol);
	    params.put("pv_start_i", start);
        params.put("pv_limit_i", limit);        
	    logger.debug("-->"+params);
	    Map<String, Object> resultado = ejecutaSP(new ObtieneMesaControl(getDataSource()), params);
        List<Map<String, String>> listaDatos = (List<Map<String, String>>) resultado.get("pv_registro_o");
        String total = (String)resultado.get("pv_total_o");
        
        logger.debug(Utils.log("\nlistaDatos", listaDatos));
        logger.debug("Total de registros de mesa de control " + total);
        
        if (listaDatos != null && listaDatos.size() != 0) {            
            listaDatos.get(0).put("total", total);     
        }           
        
        return listaDatos;
	}
	
	protected class ObtieneMesaControl extends StoredProcedure {
		protected ObtieneMesaControl(DataSource dataSource) {
            super(dataSource, "PKG_MESACONTROL.P_GET_TMESACONTROL");
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ntramite_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmsolici_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdagente_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fstatusi_i", Types.DATE));
            declareParameter(new SqlParameter("pv_fstatusf_i", Types.DATE));            
            declareParameter(new SqlParameter("pv_nombre_i", Types.VARCHAR));            
            declareParameter(new SqlParameter("pv_estatus_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdusuari_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsisrol_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_start_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_limit_i", Types.NUMERIC));
            String[] cols = new String[] {
            		"NTRAMITE",     
                    "CDUNIECO",
                    "DSUNIECO",
                    "CDRAMO",
                    "DSRAMO",
                    "ESTADO",
                    "DESCRIPL",
                    "NMPOLIZA",     
                    "NMSUPLEM",   
                    "NMSOLICI",   
                    "CDSUCADM",   
                    "CDSUCDOC",        
                    "CDTIPTRA",
                    "DSTIPTRA",
                    "FERECEPC",   
                    "CDAGENTE",   
                    "REFERENCIA",   
                    "NOMBRE", 
                    "FECSTATU",    
                    "ESTATUS",
                    "DSESTADOMC",
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
                    "DSTIPFLU",
                    "CDFLUJOMC", 
                    "DSFLUJOMC",
                    "CDUSUARI",
                    "DSUSUARI",
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
            declareParameter(new SqlOutParameter("pv_total_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
		}
	}
	
	@Override
    public String movimientoTmesacontrol (String ntramite  ,
    		String cdunieco  ,
    		String cdramo    ,
    		String estado    ,
    		String nmpoliza  ,
    		String nmsuplem  ,
    		String nmsolici  ,
    		String cdsucadm  ,
    		String cdsucdoc  ,
    		String cdtiptra  ,
    		Date ferecepc  ,
    		String cdagente  ,
    		String referencia,
    		String nombre    ,
    		Date fecstatu ,
    		String estatus   ,
    		String comments  ,
    		String cdtipsit  ,
    		String otvalor01 ,
    		String otvalor02 ,
    		String otvalor03 ,
    		String otvalor04 ,
    		String otvalor05 ,
    		String otvalor06 ,
    		String otvalor07 ,
    		String otvalor08 ,
    		String otvalor09 ,
    		String otvalor10 ,
    		String otvalor11 ,
    		String otvalor12 ,
    		String otvalor13 ,
    		String otvalor14 ,
    		String otvalor15 ,
    		String otvalor16 ,
    		String otvalor17 ,
    		String otvalor18 ,
    		String otvalor19 ,
    		String otvalor20 ,
    		String otvalor21 ,
    		String otvalor22 ,
    		String otvalor23 ,
    		String otvalor24 ,
    		String otvalor25 ,
    		String otvalor26 ,
    		String otvalor27 ,
    		String otvalor28 ,
    		String otvalor29 ,
    		String otvalor30 ,
    		String otvalor31 ,
    		String otvalor32 ,
    		String otvalor33 ,
    		String otvalor34 ,
    		String otvalor35 ,
    		String otvalor36 ,
    		String otvalor37 ,
    		String otvalor38 ,
    		String otvalor39 ,
    		String otvalor40 ,
    		String otvalor41 ,
    		String otvalor42 ,
    		String otvalor43 ,
    		String otvalor44 ,
    		String otvalor45 ,
    		String otvalor46 ,
    		String otvalor47 ,
    		String otvalor48 ,
    		String otvalor49 ,
    		String otvalor50 ,
    		String swimpres  ,
    		String cdtipflu  ,
    		String cdflujomc ,
    		String cdusuari  ,
    		String cdtipsup  ,
    		String swvispre  ,
    		String cdpercli  ,
    		String renuniext ,
    		String renramo   ,
    		String renpoliex ,
    		String sworigenmesa  ,
    		String cdrazrecha,
    		String cdunidspch,
    		String ntrasust  ,
    		String cdsisrol  ,
    		String accion    ) throws Exception {
    	
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        params.put("pv_ntramite_i",ntramite);
        params.put("pv_cdunieco_i",cdunieco);
        params.put("pv_cdramo_i",cdramo);
        params.put("pv_estado_i",estado);
        params.put("pv_nmpoliza_i",nmpoliza);
        params.put("pv_nmsuplem_i",nmsuplem);
        params.put("pv_nmsolici_i",nmsolici);
        params.put("pv_cdsucadm_i",cdsucadm);
        params.put("pv_cdsucdoc_i",cdsucdoc);
        params.put("pv_cdtiptra_i",cdtiptra);
        params.put("pv_ferecepc_i",ferecepc);
        params.put("pv_cdagente_i",cdagente);
        params.put("pv_referencia_i",referencia);
        params.put("pv_nombre_i",nombre);
        params.put("pv_fecstatu_i",fecstatu);
        params.put("pv_estatus_i",estatus);
        params.put("pv_comments_i",comments);
        params.put("pv_cdtipsit_i",cdtipsit);
        params.put("pv_otvalor01_i",otvalor01);
        params.put("pv_otvalor02_i",otvalor02);
        params.put("pv_otvalor03_i",otvalor03);
        params.put("pv_otvalor04_i",otvalor04);
        params.put("pv_otvalor05_i",otvalor05);
        params.put("pv_otvalor06_i",otvalor06);
        params.put("pv_otvalor07_i",otvalor07);
        params.put("pv_otvalor08_i",otvalor08);
        params.put("pv_otvalor09_i",otvalor09);
        params.put("pv_otvalor10_i",otvalor10);
        params.put("pv_otvalor11_i",otvalor11);
        params.put("pv_otvalor12_i",otvalor12);
        params.put("pv_otvalor13_i",otvalor13);
        params.put("pv_otvalor14_i",otvalor14);
        params.put("pv_otvalor15_i",otvalor15);
        params.put("pv_otvalor16_i",otvalor16);
        params.put("pv_otvalor17_i",otvalor17);
        params.put("pv_otvalor18_i",otvalor18);
        params.put("pv_otvalor19_i",otvalor19);
        params.put("pv_otvalor20_i",otvalor20);
        params.put("pv_otvalor21_i",otvalor21);
        params.put("pv_otvalor22_i",otvalor22);
        params.put("pv_otvalor23_i",otvalor23);
        params.put("pv_otvalor24_i",otvalor24);
        params.put("pv_otvalor25_i",otvalor25);
        params.put("pv_otvalor26_i",otvalor26);
        params.put("pv_otvalor27_i",otvalor27);
        params.put("pv_otvalor28_i",otvalor28);
        params.put("pv_otvalor29_i",otvalor29);
        params.put("pv_otvalor30_i",otvalor30);
        params.put("pv_otvalor31_i",otvalor31);
        params.put("pv_otvalor32_i",otvalor32);
        params.put("pv_otvalor33_i",otvalor33);
        params.put("pv_otvalor34_i",otvalor34);
        params.put("pv_otvalor35_i",otvalor35);
        params.put("pv_otvalor36_i",otvalor36);
        params.put("pv_otvalor37_i",otvalor37);
        params.put("pv_otvalor38_i",otvalor38);
        params.put("pv_otvalor39_i",otvalor39);
        params.put("pv_otvalor40_i",otvalor40);
        params.put("pv_otvalor41_i",otvalor41);
        params.put("pv_otvalor42_i",otvalor42);
        params.put("pv_otvalor43_i",otvalor43);
        params.put("pv_otvalor44_i",otvalor44);
        params.put("pv_otvalor45_i",otvalor45);
        params.put("pv_otvalor46_i",otvalor46);
        params.put("pv_otvalor47_i",otvalor47);
        params.put("pv_otvalor48_i",otvalor48);
        params.put("pv_otvalor49_i",otvalor49);
        params.put("pv_otvalor50_i",otvalor50);
        params.put("pv_swimpres_i",swimpres);
        params.put("pv_cdtipflu_i",cdtipflu);
        params.put("pv_cdflujomc_i",cdflujomc);
        params.put("pv_cdusuari_i",cdusuari);
        params.put("pv_cdtipsup_i",cdtipsup);
        params.put("pv_swvispre_i",swvispre);
        params.put("pv_cdpercli_i",cdpercli);
        params.put("pv_renuniext_i",renuniext);
        params.put("pv_renramo_i",renramo);
        params.put("pv_renpoliex_i",renpoliex);
        params.put("pv_sworigenmesa_i",sworigenmesa);
        params.put("pv_cdrazrecha_i",cdrazrecha);
        params.put("pv_cdunidspch_i",cdunidspch);
        params.put("pv_ntrasust_i",ntrasust);
        params.put("pv_cdsisrol_i",cdsisrol);
        params.put("pv_accion_i",accion);
        Map<String, Object> procRes = ejecutaSP(new movimientoTmesacontrolSP(getDataSource()), params);
        logger.debug("--->"+procRes);
        return (String)procRes.get("pv_ntramite_i");
        
       
    }
    
    protected class movimientoTmesacontrolSP extends StoredProcedure {
        protected movimientoTmesacontrolSP (DataSource dataSource) {
            super(dataSource, "PKG_MESACONTROL.P_MOV_TMESACONTROL");           
            
            declareParameter(new SqlInOutParameter("pv_ntramite_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdunieco_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_cdramo_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_estado_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_nmsuplem_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_nmsolici_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_cdsucadm_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsucdoc_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtiptra_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_ferecepc_i", Types.DATE));
            declareParameter(new SqlParameter("pv_cdagente_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_referencia_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nombre_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_fecstatu_i", Types.DATE));
            declareParameter(new SqlParameter("pv_estatus_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_comments_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsit_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor01_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor02_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor03_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor04_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor05_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor06_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor07_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor08_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor09_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor10_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor11_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor12_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor13_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor14_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor15_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor16_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor17_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor18_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor19_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor20_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor21_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor22_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor23_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor24_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor25_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor26_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor27_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor28_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor29_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor30_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor31_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor32_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor33_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor34_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor35_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor36_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor37_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor38_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor39_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor40_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor41_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor42_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor43_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor44_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor45_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor46_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor47_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor48_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor49_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_otvalor50_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_swimpres_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipflu_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_cdflujomc_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_cdusuari_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdtipsup_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_swvispre_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdpercli_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_renuniext_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_renramo_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_renpoliex_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_sworigenmesa_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdrazrecha_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdunidspch_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_ntrasust_i", Types.NUMERIC));
            declareParameter(new SqlParameter("pv_cdsisrol_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_accion_i", Types.VARCHAR));
            
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
    @Override
    public String existePoliza(String cdunieco, String cdramo, String estado, String nmpoliza)
            throws Exception {
        
        Map<String, Object> params = new LinkedHashMap<String, Object>();       
        params.put("pv_cdunieco_i", cdunieco);
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_estado_i", estado);
        params.put("pv_nmpoliza_i", nmpoliza);
        Map<String, Object> resultado = ejecutaSP(new ExistePolizaF(getDataSource()), params);
        return (String) resultado.get("v_return");
        //return true;
    }
    
    protected class ExistePolizaF extends StoredProcedure {
        protected ExistePolizaF (DataSource dataSource) {
            super(dataSource, "pkg_valida_alea.f_val_existe_poliza");
            /** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return",    Types.VARCHAR));  
            declareParameter(new SqlParameter("pv_cdunieco_i" , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdramo_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_estado_i"   , Types.VARCHAR));
            declareParameter(new SqlParameter("pv_nmpoliza_i" , Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o",  Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }
}
