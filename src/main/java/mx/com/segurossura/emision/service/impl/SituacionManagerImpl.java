package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.dao.SituacionDAO;
import mx.com.segurossura.emision.service.SituacionManager;
import mx.com.segurossura.general.catalogos.model.Bloque;

@Service
public class SituacionManagerImpl implements SituacionManager{

	private final static Logger logger = LoggerFactory.getLogger(SituacionManagerImpl.class);
	
	@Autowired
	private SituacionDAO situacionDAO;
	
	@Autowired
	private EmisionDAO emisionDAO;
	
	@Override
	public Map<String, String> obtenerSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String cdtipsit, String nmsuplem) throws Exception{
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ valoresDefectoFijos"                
               ));
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso="";
        try{
            valores = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem).get(0);
            Map<String, String> valoresDefecto = situacionDAO.obtieneTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdtipsit, nmsuplem).get(0);
            for(Map.Entry<String, String> entry : valoresDefecto.entrySet()){
                valores.put(("b5b_"+entry.getKey()), entry.getValue());
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return valores;
	}
	
	@Override
	public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ valoresDefectoFijos"                
               ));
	    Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso="";
        try{
            paso = "Antes de obtener nuevo numero de situacion";
            String nmsituac = situacionDAO.obtieneNmsituac(cdunieco, cdramo, estado, nmpoliza);
            paso = "Antes de obtener valores por defecto de situacion de riesgo";
            valores = emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, Bloque.SITUACIONES.toString(), "NULO");
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ valoresDefectoFijos",
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return valores;
	}
	
	@Override
    public Map<String, String> valoresDefectoVariables (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String nmsuplem, String status, String cdtipsit, String swreduci, String cdagrupa, String cdestado, String fefecsit, 
            String fecharef, String indparbe, String feinipbs, String porparbe, String intfinan, String cdmotanu, String feinisus, 
            String fefinsus) throws Exception{
        logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ valoresDefectoVariables"                
               ));
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso="";
        try{
            paso = "Antes de guardar datos fijos de situacion";
            situacionDAO.movimientoMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, nmsuplem, status, cdtipsit, swreduci, 
                    cdagrupa, cdestado, fefecsit, fecharef, indparbe, feinipbs, porparbe, intfinan, cdmotanu, feinisus, fefinsus, "I");
            paso = "Antes de guardar valores por defecto";
            emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, Bloque.ATRIBUTOS_SITUACIONES.toString(), "NULO");
            paso = "Recuperando valores variables";
            Map<String, String> tvalopol = situacionDAO.obtieneTvalosit(cdunieco, cdramo, cdestado, nmpoliza, nmsituac, cdtipsit, nmsuplem).get(0);
            for (Entry<String, String> en : tvalopol.entrySet()) {
                valores.put(Utils.join("b5b_", en.getKey()), en.getValue());
            }
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ valoresDefectoVariables",
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return valores;
    }
	
	   @Override
	    public void valoresDefectoCoberturas (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception{
	        logger.debug(Utils.join(
	                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
	                "\n@@@@@@ valoresDefectoCoberturas"                
	               ));
	        String paso="";
	        try{
	            paso = "Antes de guardar valores por defecto";
	            emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, Bloque.GARANTIAS.toString(), "NULO");
	            paso = "Recuperando valores variables";
	        } catch (Exception ex){
	            Utils.generaExcepcion(ex, paso);
	        }
	        logger.debug(Utils.join(
	                "\n@@@@@@ valoresDefectoCoberturas",
	                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
	               ));
	    }
	
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
			situacionDAO.movimientoMpolisit(Gn_Cdunieco, Gn_Cdramo, Gv_Estado, Gn_Nmpoliza, Gn_Nmsituac, Gn_Nmsuplem_Sesion, Gn_Nmsuplem_Bean, Gv_Status, Gv_Cdtipsit, Gv_Swreduci, Gn_Cdagrupa, Gn_Cdestado, Gf_Fefecsit, Gf_Fecharef, Gv_Indparbe, Gf_Feinipbs, Gn_Porparbe, Gn_Intfinan, Gn_Cdmotanu, Gf_Feinisus, Gf_Fefinsus, Gv_Accion);

		} catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpolisitSP"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		
	}

	@Override
	public void movimientoTvalosit(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String cdtipsit, String status, String nmsuplem, Map<String,String> situacion,
            String accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ movimientoTvalosit"
				
				));
		Map<String, String> otvalores = new HashMap<>();
		String paso="";		
		try{			
			paso = "Consultando datos";
			for(Map.Entry<String, String> entry : situacion.entrySet()){
			    if(entry.getKey().startsWith("b5b_otvalor")){
			        otvalores.put((entry.getKey().substring("b5b_".length(), entry.getKey().length())), entry.getValue());
			    }
            }
			situacionDAO.movimientoTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdtipsit, status, nmsuplem, otvalores, accion);
		} catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoTvalosit"
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
			datos=situacionDAO.obtieneTvalosit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_cdtipsit_i, pv_nmsuplem_i)  ;

		} catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneTvalosit"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
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
			datos=situacionDAO.obtieneMpolisit(pv_cdunieco_i, pv_cdramo_i, pv_estado_i, pv_nmpoliza_i, pv_nmsituac_i, pv_nmsuplem_i)  ;

		} catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		logger.debug(Utils.join(
				 "\n@@@@@@ obtieneMpolisit"
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
            nmsituac = situacionDAO.obtieneNmsituac(cdunieco, cdramo, estado, nmpoliza);
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
            situacionDAO.borraEstructuraSituacion(cdunieco, cdramo, estado, nmpoliza, nmsituac);
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ borraEstructuraSituacion"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
	}
	
	@Override
	public List<Map<String, String>> obtenerListaSituaciones(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception{
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ obtenerListaSituaciones"
               ));
	    List<Map<String, String>> lista = new ArrayList<>();
        String paso = "";
        try{
            lista = situacionDAO.obtenerListaSituaciones(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem);
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ obtenerListaSituaciones"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return lista;
	}
}
