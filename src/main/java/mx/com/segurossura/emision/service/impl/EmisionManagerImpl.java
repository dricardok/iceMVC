
package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.dao.SituacionDAO;
import mx.com.segurossura.emision.service.EmisionManager;
import mx.com.segurossura.general.catalogos.model.Bloque;

@Service
public class EmisionManagerImpl implements EmisionManager{

	private final static Logger logger = LoggerFactory.getLogger(EmisionManagerImpl.class);
	
	@Autowired
	private EmisionDAO emisionDAO;
	
	@Autowired
    private SituacionDAO situacionDAO;

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
	public List<Map<String, String>> ejecutarValidaciones (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, List<String> cdbloque) throws Exception{
		
		 logger.debug(Utils.join(
	                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
	                "\n@@@@@@ borraEstructuraSituacion"
	               ));
	        String paso = "";
	        try{
	        	
	        	List<Map<String, String>> lista=new ArrayList<>();
	        	for(String bloque:cdbloque){
	        		lista.addAll(
		            		emisionDAO.ejecutarValidaciones(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, bloque)
		            		) ;
	        	}
	            
	        } catch (Exception ex){
	            Utils.generaExcepcion(ex, paso);
	        }
	        logger.debug(Utils.join(
	                "\n@@@@@@ borraEstructuraSituacion"
	               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
	               ));
		return null;
	}

    @Override
    public Map<String, Object> generarTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac) throws Exception {
        String paso = null;
        Map<String, Object> res = null;
        try {
            paso = "Tarificando situaciones";
            List<Map<String,String>> situacionesPoliza = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, "0");
            for (Map<String, String> situac : situacionesPoliza) {
                logger.debug("Inicio tarificando inciso {} de cdunieco={}, cdramo:{}, nmpoliza:{}", situac.get("nmsituac"), cdunieco, cdramo, nmpoliza);
                res = emisionDAO.generarTarificacion(cdunieco, cdramo, estado, nmpoliza, situac.get("nmsituac"));
                logger.debug("Fin    tarificando inciso {} de cdunieco={}, cdramo:{}, nmpoliza:{}", situac.get("nmsituac"), cdunieco, cdramo, nmpoliza);
            }
            
            paso = "Tarificando conceptos globales";
            emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, "0", "0", Bloque.TARIFICACION_POLIZA_SITU.getCdbloque(),
                    "NULO");
            
            emisionDAO.distribuirAgrupadores(cdunieco, cdramo, estado, nmpoliza, "0");
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return res;
    }

    @Override
    public List<Map<String, String>> obtenerDatosTarificacion(String cdunieco, String cdramo, String estado, String nmpoliza)
            throws Exception {
        return emisionDAO.obtenerDatosTarificacion(cdunieco, cdramo, estado, nmpoliza);
    }


	@Override
	public Map<String, Object> distribuirAgrupadores(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception {		
		 
		String paso = null;
	    Map<String, Object> res = null;
	    Map<String, Object> resultado = null;
	    try {
	         paso = "Distribuyendo agrupadores";
	         
	         try{
	        	 
	        	 resultado = emisionDAO.distribuirAgrupadores(cdunieco, cdramo, estado, nmpoliza, nmsuplem); 
	        	 
	         }catch(Exception ex){
	        	 logger.error("Error al llamar funcion de distribucionAgrupadores");
	         }
	         
	         
	     } catch (Exception ex) {
	         Utils.generaExcepcion(ex, paso);
	     }
	   return res;
	}

}
