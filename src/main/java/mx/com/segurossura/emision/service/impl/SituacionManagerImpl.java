package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.dao.SituacionDAO;
import mx.com.segurossura.emision.service.SituacionManager;
import mx.com.segurossura.general.catalogos.model.Bloque;
import mx.com.segurossura.general.utils.ValoresMinimosUtils;

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
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ valoresDefectoFijos @@@@@@"                
               ));
	    Map<String, String> valores = null;
        String paso="";
        try{
            paso = "Antes de obtener nuevo numero de situacion";
            String nmsituac = situacionDAO.obtieneNmsituac(cdunieco, cdramo, estado, nmpoliza);
            
            paso = "Antes de obtener valores por defecto de situacion de riesgo";
            Map<String, String> valoresDefecto = emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                    nmsuplem, Bloque.SITUACIONES.getCdbloque(), "NULO");
            
            if (!valoresDefecto.containsKey("fefecsit")) {
                valoresDefecto.put("fefecsit", emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem)
                        .get(0).get("feefecto"));
            }
            
            Map<String, String> mpolisit = ValoresMinimosUtils.obtenerValores(Bloque.SITUACIONES, valoresDefecto);
            
            paso = "Insertando situaci\u00f3n";
            situacionDAO.movimientoMpolisit(
                    // llave
                    cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, nmsuplem, "V",
                    
                    // datos
                    mpolisit.get("cdtipsit"),
                    mpolisit.get("swreduci"),
                    mpolisit.get("cdagrupa"),
                    mpolisit.get("cdestado"),
                    Utils.parse(mpolisit.get("fefecsit")),
                    Utils.parse(mpolisit.get("fecharef")),
                    mpolisit.get("indparbe"),
                    Utils.parse(mpolisit.get("feinipbs")),
                    mpolisit.get("porparbe"),
                    mpolisit.get("intfinan"),
                    mpolisit.get("cdmotanu"),
                    Utils.parse(mpolisit.get("feinisus")),
                    Utils.parse(mpolisit.get("fefinsus")),
                    
                    // accion
                    "I");
            
            paso = "Recuperando sitauci\u00f3n";
            valores = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem).get(0);
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ valoresDefectoFijos @@@@@@",
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return valores;
	}
	
	@Override
    public Map<String, String> valoresDefectoVariables (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, 
            String nmsuplem, String status, Map<String, String> datos) throws Exception{
        logger.debug("@@@@@@ valoresDefectoVariables");
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso = null;
        try {
            paso = "Recuperando situaci\u00f3n";
            Map<String, String> mpolisit = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem).get(0);
            mpolisit.putAll(datos);
            
            paso = "Actualizando situaci\u00f3n";
            situacionDAO.movimientoMpolisit(
                    // llave
                    cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, nmsuplem, status,
                    
                    // datos
                    mpolisit.get("cdtipsit"),
                    mpolisit.get("swreduci"),
                    mpolisit.get("cdagrupa"),
                    mpolisit.get("cdestado"),
                    Utils.parse(mpolisit.get("fefecsit")),
                    Utils.parse(mpolisit.get("fecharef")),
                    mpolisit.get("indparbe"),
                    Utils.parse(mpolisit.get("feinipbs")),
                    mpolisit.get("porparbe"),
                    mpolisit.get("intfinan"),
                    mpolisit.get("cdmotanu"),
                    Utils.parse(mpolisit.get("feinisus")),
                    Utils.parse(mpolisit.get("fefinsus")),
                    
                    // accion
                    "U");
            
            paso = "Ejecutando valores por defecto de situacion";
            emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, Bloque.ATRIBUTOS_SITUACIONES.getCdbloque(), "NULO");
            
            paso = "Recuperando valores variables";
            List<Map<String, String>> tvalositList = situacionDAO.obtieneTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                    datos.get("cdtipsit"), nmsuplem);
            
            // si fallan en insertar los valores por def
            if (tvalositList == null || tvalositList.size() == 0) {
                paso = "Insertando valores variables de situaci\u00f3n";
                Map<String, String> tvalosit = ValoresMinimosUtils.obtenerValores(Bloque.ATRIBUTOS_SITUACIONES);
                if ("x".equalsIgnoreCase(tvalosit.get("cdtipsit"))) {
                    tvalosit.put("cdtipsit", mpolisit.get("cdtipsit"));
                }
                situacionDAO.movimientoTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                        tvalosit.get("cdtipsit"), status, nmsuplem,
                        tvalosit,
                        "I");
                tvalositList = situacionDAO.obtieneTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                        datos.get("cdtipsit"), nmsuplem);
            }
            
            if (tvalositList != null && tvalositList.size() > 0) {
                for (Entry<String, String> en : tvalositList.get(0).entrySet()) {
                    valores.put(Utils.join("b5b_", en.getKey()), en.getValue());
                }
            }
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug("@@@@@@ valoresDefectoVariables");
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
	        emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, Bloque.GARANTIAS.getCdbloque(), "NULO");
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
	public void movimientoMpolisit(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplemEnd, String nmsuplem, String status, Map<String, String> datos,
            String accion) throws Exception {
		String paso = "Ejecutando movimiento de relaci\u00f3n p\u00f3liza situaci\u00f3n";		
		try {
		    if ("D".equals(accion)) {
		        if (StringUtils.isBlank(nmsituac)) {
		            throw new ApplicationException("Falta situaci\u00f3n");
		        }
		        situacionDAO.movimientoMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplemEnd, nmsuplem, status, null,
		                null, null, null, null, null, null, null, null, null, null, null, null, accion);
		    } else if ("I".equals(accion) || "U".equals(accion)) {
		        // si no hay situacion, calcula la siguiente
		        if (StringUtils.isBlank(nmsituac)) {
		            nmsituac = situacionDAO.obtieneNmsituac(cdunieco, cdramo, estado, nmpoliza);
		        }
		        
		        // recuperar registro actual
		        Map<String, String> mpolisit = null;
		        try {
		            mpolisit = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplemEnd).get(0);
		        } catch (Exception ex) {
		            logger.warn("No se encuentra situaci\u00f3n");
		        }
		        if (mpolisit == null) {
		            mpolisit = ValoresMinimosUtils.obtenerValores(Bloque.SITUACIONES);
		        }
		        
		        // agregar los datos de pantalla al registro actual
		        Map<String, String> camposLlave = new HashMap<String, String>();
		        camposLlave.put("cdunieco", null);
		        camposLlave.put("cdramo", null);
		        camposLlave.put("estado", null);
		        camposLlave.put("nmpoliza", null);
		        camposLlave.put("nmsituac", null);
		        camposLlave.put("nmsuplemEnd", null);
		        camposLlave.put("nmsuplem", null);
		        camposLlave.put("status", null);
		        camposLlave.put("accion", null);
		        for (Entry<String, String> en : datos.entrySet()) {
		            String key = en.getKey();
		            if (!camposLlave.containsKey(key)) {
		                mpolisit.put(key, en.getValue());
		            }
		        }
		        
		        // invocar movimiento
		        situacionDAO.movimientoMpolisit(
		                // llave
		                cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplemEnd, nmsuplem, status,
		                
		                // datos
		                mpolisit.get("cdtipsit"),
		                mpolisit.get("swreduci"),
		                mpolisit.get("cdagrupa"),
		                mpolisit.get("cdestado"),
		                Utils.parse(mpolisit.get("fefecsit")),
		                Utils.parse(mpolisit.get("fecharef")),
		                mpolisit.get("indparbe"),
		                Utils.parse(mpolisit.get("feinipbs")),
		                mpolisit.get("porparbe"),
		                mpolisit.get("intfinan"),
		                mpolisit.get("cdmotanu"),
		                Utils.parse(mpolisit.get("feinisus")),
		                Utils.parse(mpolisit.get("fefinsus")),
		                
		                // accion
		                accion);
		    } else {
		        throw new ApplicationException("Acc\u00f3n no v\u00e1lida");
		    }
		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
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
	
	@Override
	public List<Map<String, String>> actualizaSituacion (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac,
            String nmsuplem, String status, Map<String, String> datos) throws Exception {
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ actualizaSituacion @@@@@@",
                "\n@@@@@@ cdunieco = " , cdunieco,
                "\n@@@@@@ cdramo   = " , cdramo,
                "\n@@@@@@ estado   = " , estado,
                "\n@@@@@@ nmpoliza = " , nmpoliza,
                "\n@@@@@@ nmsituac = " , nmsituac,
                "\n@@@@@@ nmsuplem = " , nmsuplem
               ));
	    List<Map<String, String>> coberturas = null;
	    List<Map<String, String>> validaciones = new ArrayList<>();
        String paso = null;
        try {
            paso = "Recuperando situaci\u00f3n";
            Map<String, String> mpolisit = situacionDAO.obtieneMpolisit(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem).get(0);
            mpolisit.putAll(datos);
            
            paso = "Actualizando situaci\u00f3n";
            situacionDAO.movimientoMpolisit(
                    // llave
                    cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, nmsuplem, status,
                    
                    // datos
                    mpolisit.get("cdtipsit"),
                    mpolisit.get("swreduci"),
                    mpolisit.get("cdagrupa"),
                    mpolisit.get("cdestado"),
                    Utils.parse(mpolisit.get("fefecsit")),
                    Utils.parse(mpolisit.get("fecharef")),
                    mpolisit.get("indparbe"),
                    Utils.parse(mpolisit.get("feinipbs")),
                    mpolisit.get("porparbe"),
                    mpolisit.get("intfinan"),
                    mpolisit.get("cdmotanu"),
                    Utils.parse(mpolisit.get("feinisus")),
                    Utils.parse(mpolisit.get("fefinsus")),
                    
                    // accion
                    "U");
            
            paso = "Recuperando valores de situaci\u00f3n";
            Map<String, String> tvalosit = situacionDAO.obtieneTvalosit(cdunieco, cdramo, estado, nmpoliza, nmsituac,
                    datos.get("cdtipsit"), nmsuplem).get(0);
            tvalosit.putAll(datos);
            
            paso = "Actualizando valores de situaci\u00f3n";
            situacionDAO.movimientoTvalosit(
                    // llave
                    cdunieco, cdramo, estado, nmpoliza, nmsituac, datos.get("cdtipsit"), status, nmsuplem,
                    
                    // datos
                    tvalosit,
                    
                    // accion
                    "M");
            
            paso = "Recuperando coberturas";
            coberturas = emisionDAO.obtieneMpoligarTabla(cdunieco, cdramo, estado, nmpoliza, nmsituac, null, nmsuplem);
            
            if (coberturas == null || coberturas.size() == 0) {
                emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem,
                        Bloque.BLOQUE_DUMMY_B18_B19_B19B.getCdbloque(), "NULO");
            }
            
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    nmsituac,
                    nmsuplem,
                    null,
                    Bloque.SITUACIONES.getCdbloque()
                    ));
            
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    nmsituac,
                    nmsuplem,
                    null,
                    Bloque.ATRIBUTOS_SITUACIONES.getCdbloque()
                    ));
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ actualizaSituacion @@@@@@"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return validaciones;
	}

	@Override
	public List<Map<String, String>> validaBloqueSituacion(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
	    logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",
                "\n@@@@@@ validaBloqueSituacion"
               ));
	    String paso = "";
        List<Map<String, String>> validaciones = new ArrayList<Map<String, String>>();
        try{
            paso = "Antes de validar bloque "+Bloque.SITUACIONES.getCdbloque();
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    "0",
                    nmsuplem,
                    null,
                    Bloque.SITUACIONES.getCdbloque()
                    ));
            paso = "Antes de validar bloque "+Bloque.ATRIBUTOS_SITUACIONES.getCdbloque();
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    "0",
                    nmsuplem,
                    null,
                    Bloque.ATRIBUTOS_SITUACIONES.getCdbloque()
                    ));
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ validaBloqueSituacion"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return validaciones;
	}
	
}
