package mx.com.segurossura.emision.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.RegistoPersonaDAO;
import mx.com.segurossura.emision.service.RegistroPersonaManager;

@Service
public class RegistroPersonaManagerImpl implements RegistroPersonaManager {

	private final static Logger logger = LoggerFactory.getLogger(RegistroPersonaManagerImpl.class);
	@Autowired
	private RegistoPersonaDAO registroPersonaDao;
	@Override
	public List<Map<String, String>> lovCdpost(String pv_cdcodpos_i, String pv_cdprovin_i, String pv_cdmunici_i, String pv_cdciudad_i)
			throws Exception{
		String paso="";
		List<Map<String, String>> list = null;
		try{
			list=registroPersonaDao.lovCdpost(pv_cdcodpos_i, pv_cdprovin_i, pv_cdmunici_i, pv_cdciudad_i);
			for(Map<String, String> m:list){
				m.put("cdpostal", m.get("cdcodpos"));
				m.put("otpoblac", m.get("dsmunici"));
			}
		}catch(Exception e){
			Utils.generaExcepcion(e, paso);
		}
		return list;
	}
	@Override
	public List<Map<String, String>> obtieneTvaloper(String cdperson) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvaloper"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=registroPersonaDao.obtieneTvaloper(cdperson)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvaloper"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	@Override
	public List<Map<String, String>> obtieneMpersona(String cdperson) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMpersona"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=registroPersonaDao.obtieneMpersona(cdperson)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpersona"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	@Override
	public List<Map<String, String>> obtieneMdomicil(String cdperson, String nmorddom) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneMdomicil"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=registroPersonaDao.obtieneMdomicil(cdperson, nmorddom)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMdomicil"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	@Override
	public void movimientoTvaloper(String cdperson, Map<String, String> otvalores, String accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalogar"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			registroPersonaDao.movimientoTvaloper(cdperson, otvalores, accion);
			

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
	public void movimientoMpersona(String cdperson, String cdtipide, String cdideper, String dsnombre, String dsnombr1,
			String dsnombr2, String dsapell1, String dsapell2, String cdtipper, String otfisjur, String otsexo,
			Date fenacimi, String cdprovin, String accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalogar"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			String resp=registroPersonaDao.personaDuplicada(cdperson, dsnombre, fenacimi);
			logger.debug(accion+"Valida persona dup: "+resp);
			if(resp!=null && !"".equals(resp.trim()) && "I".equals(accion)){
				throw new ApplicationException(resp);
			}
			registroPersonaDao.movimientoMpersona(cdperson, cdtipide, cdideper, dsnombre, dsnombr1, dsnombr2, dsapell1, dsapell2, cdtipper, otfisjur, otsexo, fenacimi, cdprovin, accion);
			

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
	public void movimientoMdomicil(String cdperson, String nmorddom, String cdtipdom, String dsdomici, String cdsiglas,
			String cdidioma, String nmtelex, String nmfax, String nmtelefo, String cdpostal, String otpoblac,
			String cdpais, String otpiso, String nmnumero, String cdprovin, String dszona, String cdcoloni,
			String accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalogar"
				
				));
		String paso="";
		
		try{
			
			paso="Consultando datos";
			registroPersonaDao.movimientoMdomicil(cdperson, nmorddom, cdtipdom, dsdomici, cdsiglas, cdidioma, nmtelex, nmfax, nmtelefo, cdpostal, otpoblac, cdpais, otpiso, nmnumero, cdprovin, dszona, cdcoloni, accion);
			
			

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
	public List<Map<String, String>> obtieneAttrXRol(String cdramo, String cdrol) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvaloper"
				
				));
		String paso="";
		List<Map<String, String>> datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=registroPersonaDao.obtieneAttrXRol(cdramo, cdrol)  ;

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvaloper"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	@Override
	public String generaCdperson() throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtieneTvaloper"
				
				));
		String paso="";
		String datos=null;
		try{
			
			paso="Consultando datos";
			
			datos=registroPersonaDao.generaCdperson();

		}catch(Exception ex)
		{
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvaloper"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	
	
}
