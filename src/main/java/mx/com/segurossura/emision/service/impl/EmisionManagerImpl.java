package mx.com.segurossura.emision.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.EmisionManager;

@Service
public class EmisionManagerImpl implements EmisionManager{

	private final static Logger logger = LoggerFactory.getLogger(EmisionManagerImpl.class);
	
	@Autowired
	private EmisionDAO emisionDAO;
	
	@Override
	public void movimientoMpolisit(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Sesion, String Gn_Nmsuplem_Bean, String Gv_Status,
			String Gv_Cdtipsit, String Gv_Swreduci, String Gn_Cdagrupa, String Gn_Cdestado, String Gf_Fefecsit,
			String Gf_Fecharef, String Gv_Indparbe, String Gf_Feinipbs, String Gn_Porparbe, String Gn_Intfinan,
			String Gn_Cdmotanu, String Gf_Feinisus, String Gf_Fefinsus, String Gv_Accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoMpolisitSP"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoMpolisit(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Sesion, Gn_Nmsuplem_Bean, Gv_Status, Gv_Cdtipsit, Gv_Swreduci, Gn_Cdagrupa, Gn_Cdestado, Gf_Fefecsit, Gf_Fecharef, Gv_Indparbe, Gf_Feinipbs, Gn_Porparbe, Gn_Intfinan, Gn_Cdmotanu, Gf_Feinisus, Gf_Fefinsus, Gv_Accion);

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpolisitSP"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}

	@Override
	public void movimientoTvalosit(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gv_Cdtipsit, String Gn_Cdatribu, String Gn_Nmsuplem, String Gv_Otvalor,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalosit"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoTvalosit(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gv_Cdtipsit, Gn_Cdatribu, Gn_Nmsuplem, Gv_Otvalor, Gv_Accion);
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoTvalosit"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
	}

	@Override
	public void movimientoMpoligar(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Session, String Gv_Cdgarant, String Gn_Cdcapita, Date Gd_Fevencim,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoMpoligar"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoMpoligar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Session, Gv_Cdgarant, Gn_Cdcapita, Gd_Fevencim, Gv_Accion);
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpoligar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}

	@Override
	public void movimientoTvalogar(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Cdatribu, String Gn_Nmsuplem, String Gn_Nmsituac, String Gv_Cdgarant, String Gv_Otvalor,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalogar"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoTvalogar(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Cdatribu, Gn_Nmsuplem, Gn_Nmsituac, Gv_Cdgarant, Gv_Otvalor, Gv_Accion);
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoTvalogar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}

	@Override
	public List<Map<String, String>> obtieneMpoligar(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdgarant_i, String pv_nmsuplem_i) throws Exception {
		// TODO Auto-generated method stub
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpoligar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMpoligar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdgarant_i, pv_nmsuplem_i);
					

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpoligar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneMpolicap(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdcapita_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpolicap"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdcapita_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpolicap"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneTvalogar(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvalogar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneTvalogar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvalogar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneMcapital(String pv_cdramo_i, String pv_cdcapita_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMcapital"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMcapital(pv_cdramo_i, pv_cdcapita_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMcapital"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneTgaranti(String pv_cdgarant_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTgaranti"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneTgaranti(pv_cdgarant_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTgaranti"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public void movimientoMpolicap(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Nmsituac, String Gn_Nmsuplem_Sesion, String Gv_Swrevalo, String Gv_Cdcapita, String Gn_Ptcapita,
			String Gn_Nmsuplem_Bloque, String Gv_ModoAcceso) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoMpolicap"
				
				));
		String paso="";
		try{
			
			paso="Consultando datos";
			
			emisionDAO.movimientoMpolicap(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Sesion, Gv_Swrevalo, Gv_Cdcapita, Gn_Ptcapita, Gn_Nmsuplem_Bloque, Gv_ModoAcceso);

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpolicap"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
		
	}

	@Override
	public List<Map<String, String>> obtieneTvalosit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_cdtipsit_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvalosit"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneTvalosit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvalosit"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneMpolizas(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpolizas"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMpolizas(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpolizas"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public Map<String, String> obtenerTvalopol(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvalopol"
				
				));
		String paso="";
		Map<String, String> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtenerTvalopol(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvalopol"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

	@Override
	public void movimientoMpolizas(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_NmsuplemBloque, String Gn_NmsuplemSesion, String Gv_Status, String Gv_Swestado,
			String Gn_Nmsolici, Date Gd_Feautori, String Gn_Cdmotanu, Date Gd_Feanulac, String Gv_Swautori,
			String Gv_Cdmoneda, Date Gd_Feinisus, Date Gd_Fefinsus, String Gv_Ottempot, Date Gd_Feefecto,
			String Gv_Hhefecto, Date Gd_Feproren, Date Gd_Fevencim, String Gn_Nmrenova, Date Gd_Ferecibo,
			Date Gd_Feultsin, String Gn_Nmnumsin, String Gv_Cdtipcoa, String Gv_Swtarifi, String Gv_Swabrido,
			Date Gd_Feemisio, String Gn_Cdperpag, String Gn_Nmpoliex, String Gv_Nmcuadro, String Gn_Porredau,
			String Gv_Swconsol, String Gn_Nmpolcoi, String Gv_Adparben, String Gn_Nmcercoi, String Gn_Cdtipren,
			String Gv_Accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoMpolizas"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoMpolizas(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_NmsuplemBloque, Gn_NmsuplemSesion, Gv_Status, Gv_Swestado, Gn_Nmsolici, Gd_Feautori, Gn_Cdmotanu, Gd_Feanulac, Gv_Swautori, Gv_Cdmoneda, Gd_Feinisus, Gd_Fefinsus, Gv_Ottempot, Gd_Feefecto, Gv_Hhefecto, Gd_Feproren, Gd_Fevencim, Gn_Nmrenova, Gd_Ferecibo, Gd_Feultsin, Gn_Nmnumsin, Gv_Cdtipcoa, Gv_Swtarifi, Gv_Swabrido, Gd_Feemisio, Gn_Cdperpag, Gn_Nmpoliex, Gv_Nmcuadro, Gn_Porredau, Gv_Swconsol, Gn_Nmpolcoi, Gv_Adparben, Gn_Nmcercoi, Gn_Cdtipren, Gv_Accion);
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpolizas"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}

	@Override
	public void movimientoTvalopol(String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado, String Gn_Nmpoliza,
			String Gn_Cdatribu, String Gn_Nmsuplem, String Gv_Otvalor_New, String Gv_Otvalor_Old) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalopol"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			emisionDAO.movimientoTvalopol(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Cdatribu, Gn_Nmsuplem, Gv_Otvalor_New, Gv_Otvalor_Old);

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoTvalopol"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}

	@Override
	public String generaNmpoliza(String Gn_Nmpoliza, String Gn_Cdunieco, String Gn_Cdramo, String Gv_Estado,
			String Gv_Swcolind, String Gn_Nmpolcoi) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ generaNmpoliza"
				
				));
		String paso="";
		String nmpoliza=null;
		try{
			
			paso="Consultando datos";
			nmpoliza = emisionDAO.generaNmpoliza(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gv_Swcolind, Gn_Nmpolcoi);

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ generaNmpoliza"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return nmpoliza;
	}

	@Override
	public List<Map<String, String>> obtieneMpolisit(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
			String pv_nmpoliza_i, String pv_nmsituac_i, String pv_nmsuplem_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpolisit"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneMpolisit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpolisit"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	
	@Override
	public List<Map<String,String>> obtieneTatrigar(String pv_cdramo_i  ,
			String pv_cdtipsit_i  ,
			String pv_cdgarant_i  ,
			String pv_cdatribu_i) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTatrigar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=emisionDAO.obtieneTatrigar(pv_cdramo_i, pv_cdtipsit_i, pv_cdgarant_i, pv_cdatribu_i);

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTatrigar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	
	@Override
	public String obtieneNmsituac(String cdunieco, String cdramo, String estado, String nmpoliza) throws Exception{
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ obtieneNmsituac"
               ));
        String paso = "";
        String nmsituac = "";
        try{
            nmsituac = emisionDAO.obtieneNmsituac(cdunieco, cdramo, estado, nmpoliza);
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ obtieneNmsituac"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return nmsituac;
	}
    
	@Override
    public void borraEstructuraSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac) throws Exception{
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ borraEstructuraSituacion"
               ));
        String paso = "";
        try{
            emisionDAO.borraEstructuraSituacion(cdunieco, cdramo, estado, nmpoliza, nmsituac);
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ borraEstructuraSituacion"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
	}


	@Override
	public void guardarCobertura(
			String pv_cdunieco_i, 
			String pv_cdramo_i,
			String pv_estado_i, 
			String pv_nmpoliza_i, 
			String pv_nmsituac_i, 
			String pv_cdtipsit_i, 
			String pv_nmsuplem_i,
			String pv_cdgarant_i,
			String pv_cdcapita_i,
			List<Map<String,String>> valores) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTatrigar"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Guardando datos";
			
			for(Map<String,String> m: valores){
				logger.debug("@@@@@ "+m);
				if(m.get("valor")!= null && !m.get("valor").equals(m.get("valorOriginal"))){
					if(m.get("tabla")==null || "null".equals(m.get("tabla"))){
						emisionDAO.movimientoTvalogar(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, m.get("name").substring("otvalor".length()), pv_nmsuplem_i, pv_nmsituac_i, pv_cdgarant_i, m.get("valor"), "U");
					}else{//mpolicap
						emisionDAO.movimientoMpolicap(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i, null, pv_cdcapita_i, m.get("valor"), pv_nmsuplem_i, "U");
					}
				}
			}
			

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTatrigar"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}
}
