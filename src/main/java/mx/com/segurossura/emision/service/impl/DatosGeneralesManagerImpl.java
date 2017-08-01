package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.Date;
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

import mx.com.segurossura.emision.dao.AgentesDAO;
import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.DatosGeneralesManager;
import mx.com.segurossura.general.catalogos.model.Bloque;
import mx.com.segurossura.general.utils.ValoresMinimosUtils;

@Service
public class DatosGeneralesManagerImpl implements DatosGeneralesManager{

    private static final Logger logger = LoggerFactory.getLogger(DatosGeneralesManagerImpl.class);
    
    @Autowired
    private EmisionDAO emisionDAO;
    
    @Autowired
    private AgentesDAO agentesDAO;
    
    @Override
    public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String status, String swcolind, String nmpolcoi, String cdusuari, String cdsisrol, String cdptovta, String cdgrupo,
            String cdsubgpo, String cdperfil) throws Exception {
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso = null;
        try {
            paso = "Calculando n\u00famero de p\u00f3liza";
            nmpoliza = emisionDAO.generaNmpoliza(cdunieco, cdramo, estado, swcolind, nmpolcoi);
            
            paso = "Ejecutando valores por defecto fijos de bloque de datos generales";
            Map<String, String> valoresDefecto = emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza,
                    "0", //nmsituac
                    nmsuplem,
                    Bloque.DATOS_GENERALES.getCdbloque(),
                    null, cdptovta, cdgrupo, cdsubgpo, cdperfil,
                    cdusuari, cdsisrol
                    );
            
            // se recuperan los valores minimos y se les agregan los valores por defecto 
            Map<String, String> mpolizas = ValoresMinimosUtils.obtenerValores(Bloque.DATOS_GENERALES, valoresDefecto);
            
            // cuando viene una x de ValoresMinimosUtils
            if ("x".equalsIgnoreCase(mpolizas.get("nmcuadro"))) {
                mpolizas.put("nmcuadro", emisionDAO.obtenerCuadroComisionesDefault(cdramo));
            }
            
            paso = "Insertando maestro de p\u00f3liza";
            emisionDAO.movimientoMpolizas(
                    // llave
                    cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, "V",
                    
                    // datos
                    mpolizas.get("swestado"),
                    mpolizas.get("nmsolici"),
                    Utils.parse(mpolizas.get("feautori")),
                    mpolizas.get("cdmotanu"),
                    Utils.parse(mpolizas.get("feanulac")),
                    mpolizas.get("swautori"),
                    mpolizas.get("cdmoneda"),
                    Utils.parse(mpolizas.get("feinisus")),
                    Utils.parse(mpolizas.get("fefinsus")),
                    mpolizas.get("ottempot"),
                    Utils.parse(mpolizas.get("feefecto")),
                    mpolizas.get("hhefecto"),
                    Utils.parse(mpolizas.get("feproren")),
                    Utils.parse(mpolizas.get("fevencim")),
                    mpolizas.get("nmrenova"),
                    Utils.parse(mpolizas.get("ferecibo")),
                    Utils.parse(mpolizas.get("feultsin")),
                    mpolizas.get("nmnumsin"),
                    mpolizas.get("cdtipcoa"),
                    mpolizas.get("swtarifi"),
                    mpolizas.get("swabrido"),
                    Utils.parse(mpolizas.get("feemisio")),
                    mpolizas.get("cdperpag"),
                    mpolizas.get("nmpoliex"),
                    mpolizas.get("nmcuadro"),
                    mpolizas.get("porredau"),
                    mpolizas.get("swconsol"),
                    mpolizas.get("nmpolcoi"),
                    mpolizas.get("adparben"),
                    mpolizas.get("nmcercoi"),
                    mpolizas.get("cdtipren"),
                    
                    // accion
                    "I");
            
            paso = "Recuperando maestro de p\u00f3liza generado";
            Map<String, String> mpolizasRecuperado = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
            for (Entry <String, String> en : mpolizasRecuperado.entrySet()) {
                String key = en.getKey();
                if ("cdunieco".equals(key) ||
                        "cdramo".equals(key) ||
                        "estado".equals(key) ||
                        "nmpoliza".equals(key) ||
                        "nmsuplem".equals(key) ||
                        "status".equals(key)) {
                    valores.put(key, en.getValue());
                } else {
                    valores.put(Utils.join("b1_", key), en.getValue());
                }
            }
            
            // cuando es agente se intenta insertar su cdagente en mpoliage
            // if (RolSistema.AGENTE.getCdsisrol().equals(cdsisrol)) {
            //    try {
            //        emisionDAO.insertarAgenteDeSesion(cdunieco, cdramo, estado, nmpoliza, nmsuplem, cdusuari);
            //    } catch (Exception e) {
            //        logger.warn("No se pudo insertar el agente del usuario en sesi\u00f3n", e);
            //        throw new ApplicationException("No se encuentra la clave del agente en sesi\u00f3n. Favor de contactar a soporte");
            //    }
            // }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return valores;
    }
    
    @Override
    public Map<String, String> valoresDefectoVariables (String cdusuari, String cdsisrol,
            String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status, Map<String, String> datosMpolizasPantalla,
            String cdptovta, String cdgrupo, String cdsubgpo, String cdperfil) throws Exception {
        logger.debug(Utils.log("@@@@@@ valoresDefectoVariables datosMpolizasPantalla = ", datosMpolizasPantalla));
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso = null;
        try {
            paso = "Recuperando maestro de p\u00f3liza";
            Map<String, String> mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplembloque).get(0);
            mpolizas.putAll(datosMpolizasPantalla);
            
            paso = "Actualizando maestro de p\u00f3liza";
            emisionDAO.movimientoMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplembloque, nmsuplemsesion, status,
                    mpolizas.get("swestado"), mpolizas.get("nmsolici"), Utils.parse(mpolizas.get("feautori")), mpolizas.get("cdmotanu"),
                    Utils.parse(mpolizas.get("feanulac")), mpolizas.get("swautori"), mpolizas.get("cdmoneda"),
                    Utils.parse(mpolizas.get("feinisus")), Utils.parse(mpolizas.get("fefinsus")), mpolizas.get("ottempot"),
                    Utils.parse(mpolizas.get("feefecto")), mpolizas.get("hhefecto"), Utils.parse(mpolizas.get("feproren")),
                    Utils.parse(mpolizas.get("fevencim")), mpolizas.get("nmrenova"), Utils.parse(mpolizas.get("ferecibo")),
                    Utils.parse(mpolizas.get("feultsin")), mpolizas.get("nmnumsin"), mpolizas.get("cdtipcoa"), mpolizas.get("swtarifi"),
                    mpolizas.get("swabrido"), Utils.parse(mpolizas.get("feemisio")), mpolizas.get("cdperpag"), mpolizas.get("nmpoliex"),
                    mpolizas.get("nmcuadro"), mpolizas.get("porredau"), mpolizas.get("swconsol"), mpolizas.get("nmpolcoi"),
                    mpolizas.get("adparben"), mpolizas.get("nmcercoi"), mpolizas.get("cdtipren"), "U");
            
            paso = "Ejecutando valores por defecto variables";
            emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza,
                    "0", //nmsituac
                    nmsuplemsesion,
                    Bloque.ATRIBUTOS_DATOS_GENERALES.getCdbloque(),
                    null, cdptovta, cdgrupo, cdsubgpo, cdperfil,
                    cdusuari, cdsisrol
                    );
            
            paso = "Recuperando valores variables";
            Map<String, String> tvalopol = emisionDAO.obtenerTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplemsesion);
            for (Entry<String, String> en : tvalopol.entrySet()) {
                valores.put(Utils.join("b1b_", en.getKey()), en.getValue());
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return valores;
    }
    
    @Override
    public Map<String, String> cargar (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String swcolind, String nmpolcoi) throws Exception {
        Map<String, String> datos = new LinkedHashMap<String, String>();
        String paso = null;
        try {
            Date hoy = new Date();
            
            if (StringUtils.isBlank(estado) || StringUtils.isBlank(nmpoliza)) {
                paso = "Generando numerador de p\u00f3liza";
                estado = "P";
                nmpoliza = emisionDAO.generaNmpoliza(cdunieco, cdramo, estado, swcolind, nmpolcoi);
                logger.debug("Se genera nmpoliza {} para estado P", nmpoliza);
                
                paso = "Ejecutando valores por defecto de p\u00f3liza";
                // por el momento no se ejecutan valores por defecto, se inserta nueva
                emisionDAO.movimientoMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, "V", //status
                        null, //swestado
                        nmpoliza, //nmsolici
                        hoy, //feautori
                        null, //cdmotanu
                        null, //feanulac
                        null, //swautori
                        null, //cdmoneda
                        null, //feinisus
                        null, //fefinsus
                        null, //ottempot
                        hoy, //feefecto
                        "12:00", //hhefecto
                        hoy, //feproren
                        null, //fevencim
                        "1", //nmrenova
                        null, //ferecibo
                        null, //feultsin
                        null, //nmnumsin
                        null, //cdtipcoa
                        null, //swtarifi
                        null, //swabrido
                        null, //feemisio
                        "12", //cdperpag
                        nmpoliza, //nmpoliex
                        null, //nmcuadro
                        "0", //porredau
                        null, //swconsol
                        null, //nmpolcoi
                        null, //adparben
                        null, //nmcercoi
                        null, //cdtipren
                        "I" //accion
                );
                
                paso = "Ejecutando valores por defecto de atributos variables de p\u00f3liza";
                // por el momento no se ejecutan valores por defecto, se inserta nueva
                emisionDAO.movimientoTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, "V",
                        new HashMap<String, String>(), "I");
            }
            
            paso = "Recuperando p\u00f3liza";
            Map<String, String> mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
            if (mpolizas == null) {
                throw new ApplicationException("No se encuentra la p\u00f3liza");
            }
            
            for (Entry<String, String> en : mpolizas.entrySet()) {
                datos.put(Utils.join("b1_", en.getKey()), en.getValue());
            }
            
            try {
                paso = "Recuperando atributos variables de p\u00f3liza";
                Map<String, String> tvalopol = emisionDAO.obtenerTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
                if (tvalopol != null) {
                    for (Entry<String, String> en : tvalopol.entrySet()) {
                        datos.put(Utils.join("b1b_", en.getKey()), en.getValue());
                    }
                }
            } catch (Exception e) {
                logger.warn("No hay tvalopol", e);
            }
            
            paso = "Cargando agente de la p\u00F3liza";
            List<Map<String, String>> listaAgentes = agentesDAO.obtieneMpoliage(cdunieco, cdramo, estado, nmpoliza, null, nmsuplem);
            if(listaAgentes != null && listaAgentes.size() > 0) {
            	for (Map<String, String> ag : listaAgentes) {
            		// TODO: RBS Hacer enum de tipo agente, estatus Vivo y quitar valores fijos
    				if("1".equals(ag.get("cdtipoag")) && "V".equals(ag.get("status"))) {
    					datos.put("cdagente", ag.get("cdagente"));
    				}
    			}
            }
            
            if ("P".equals(estado)) {
                datos.put("estado", "");
                datos.put("nmpoliza", "");
                
                paso = "Borrando propuesta";
                emisionDAO.movimientoMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, "V",
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                        null, "D");
                
                emisionDAO.movimientoTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, "V",
                        new HashMap<String, String>(), "D");
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return datos;
    }
    
    @Override
    public List<Map<String, String>> guardar (String cdusuari, String cdsisrol, String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsuplem, Map<String, String> datosPantalla) throws Exception {
        List<Map<String, String>> validaciones = new ArrayList<Map<String, String>>();
        String paso = null;
        try {
            paso = "Recuperando datos actuales";
            Map<String, String> mpolizas = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0),
                                tvalopol = emisionDAO.obtenerTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            
            paso = "Agregando datos modificados";
            String key, value, b1Key, b1bKey;
            for (Entry<String, String> datoPantalla : datosPantalla.entrySet()) {
                key = datoPantalla.getKey();
                value = datoPantalla.getValue();
                
                if (StringUtils.isBlank(value)) { // no enviar cadena vacia
                    value = null;
                }
                
                if (key.indexOf("_cdunieco") != -1 // no tocar llave
                        || key.indexOf("_cdramo") != -1
                        || key.indexOf("_estado") != -1
                        || key.indexOf("_nmpoliza") != -1
                        || key.indexOf("_nmsuplem") != -1
                        ) {
                    continue;
                }
                
                if (key.indexOf("b1_") != -1) { // mpolizas
                    b1Key = key.substring("b1_".length());
                    if (mpolizas.containsKey(b1Key)) {
                        mpolizas.put(b1Key, value);
                    }
                } else if (key.indexOf("b1b_") != -1) { // tvalopol
                    b1bKey = key.substring("b1b_".length());
                    if (tvalopol.containsKey(b1bKey)) {
                        tvalopol.put(b1bKey, value);
                    }
                }
            }
            
            paso = "Obteniendo cuadro de comision del agente";
            String cesionComisionAgente = null;
            String cdAgentePantalla = datosPantalla.get("cdagente");
            if (StringUtils.isNotBlank(cdAgentePantalla)) {
				cesionComisionAgente = emisionDAO.obtenerCuadroComisionAgente(cdAgentePantalla, cdramo);
				logger.debug("Cuadro de comision para agente {} es: {}", cdAgentePantalla, cesionComisionAgente);
            }
            
            paso = "Guardando datos";
            emisionDAO.movimientoMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem,
                    mpolizas.get("status"),
                    mpolizas.get("swestado"),
                    mpolizas.get("nmsolici"),
                    Utils.parse(mpolizas.get("feautori")),
                    mpolizas.get("cdmotanu"),
                    Utils.parse(mpolizas.get("feanulac")),
                    mpolizas.get("swautori"),
                    mpolizas.get("cdmoneda"),
                    Utils.parse(mpolizas.get("feinisus")),
                    Utils.parse(mpolizas.get("fefinsus")),
                    mpolizas.get("ottempot"),
                    Utils.parse(mpolizas.get("feefecto")),
                    mpolizas.get("hhefecto"),
                    Utils.parse(mpolizas.get("feproren")),
                    Utils.parse(mpolizas.get("fevencim")),
                    mpolizas.get("nmrenova"),
                    Utils.parse(mpolizas.get("ferecibo")),
                    Utils.parse(mpolizas.get("feultsin")),
                    mpolizas.get("nmnumsin"),
                    mpolizas.get("cdtipcoa"),
                    mpolizas.get("swtarifi"),
                    mpolizas.get("swabrido"),
                    Utils.parse(mpolizas.get("feemisio")),
                    mpolizas.get("cdperpag"),
                    mpolizas.get("nmpoliex"),
                    StringUtils.isNotBlank(cesionComisionAgente) ? cesionComisionAgente : mpolizas.get("nmcuadro"),
                    mpolizas.get("porredau"),
                    mpolizas.get("swconsol"),
                    mpolizas.get("nmpolcoi"),
                    mpolizas.get("adparben"),
                    mpolizas.get("nmcercoi"),
                    mpolizas.get("cdtipren"),
                    "U" // accion
                    );
            
            Map<String, String> otvalores = new LinkedHashMap<String, String>();
            for (int i = 1; i <= 120; i++) {
                key = "otvalor";
                if (i < 10) {
                    key = Utils.join(key, "0"); // otvalor0
                }
                key = Utils.join(key, i);
                
                otvalores.put(key, tvalopol.get(key));
            }
            
            emisionDAO.movimientoTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem, nmsuplem, tvalopol.get("status"),
                    otvalores, "M" // accion
                    );
            
            // Si existe cdagente lo actualizamos:
			if (StringUtils.isNotBlank(cdAgentePantalla)) {
				paso = "Actualizando agente";
				logger.debug("Agente en pantalla para guardar: {}", cdAgentePantalla);
    			agentesDAO.movimientoMpoliage(cdunieco, cdramo, estado, nmpoliza, null, nmsuplem, nmsuplem, null, null, "D");
    			// TODO: RBS Cambiar valores de cdtipoag y porredau por constantes:
    			agentesDAO.movimientoMpoliage(cdunieco, cdramo, estado, nmpoliza, datosPantalla.get("cdagente"), nmsuplem,
    					nmsuplem, "1", "100", "I");
            }
			
            paso = "Ejecutando validaciones";
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    "0", // nmsituac
                    nmsuplem,
                    null,
                    Bloque.DATOS_GENERALES.getCdbloque(), cdusuari, cdsisrol
                    ));
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    "0", // nmsituac
                    nmsuplem,
                    null,
                    Bloque.ATRIBUTOS_DATOS_GENERALES.getCdbloque(), cdusuari, cdsisrol
                    ));
            
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return validaciones;
    }

    @Override
    public List<Map<String, String>> obtenerCoaseguroCedido(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
        logger.debug(Utils.log("@@@@@@ obtenerCoaseguroCedido cdunieco=", cdunieco, 
                " cdramo=", cdramo, 
                " estado=", estado, 
                " nmpoliza=", nmpoliza,
                " nmsuplem=", nmsuplem));
        String paso = "Obteniendo coaseguro cedido";
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        try{
            lista = emisionDAO.obtenerPorcPartCoa(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
        } catch (Exception e) {
            Utils.generaExcepcion(e, paso);
        }
        return lista;
    }
    
    @Override
    public List<Map<String, String>> obtenerModeloCoaseguro(String cdmodelo) throws Exception{
        String paso = "Obteniendo modelo coaseguro";
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        try{
            lista = emisionDAO.obtenerModeloCoaseguro(cdmodelo);
        } catch (Exception e) {
            Utils.generaExcepcion(e, paso);
        }
        return lista;
    }
    
    @Override
    public void movimientoMpolicoa(String cdunieco, String cdramo, String estado, String nmpoliza, 
            String nmsuplem_bloque, String nmsuplem_session, String cdtipcoa, String status, 
            String cdmodelo, String swpagcom, List<Map<String, String>> cias, String accion) throws Exception{
        logger.debug(Utils.log("@@@@@@ movimientoMpolicoa cdunieco=", cdunieco, 
                " cdramo=", cdramo, 
                " estado=", estado, 
                " nmpoliza=", nmpoliza,
                " nmsuplem=", nmsuplem_bloque));
        String paso = "Movimiento coaseguro cedido";
        try {
            validaCoaseguro(cdunieco, cdramo, estado, nmpoliza, nmsuplem_bloque);
            for(Map<String, String> cia: cias){
                String cdcia = cia.get("cdcia");
                String porcpart = cia.get("porcpart");
                String swabrido = cia.get("swabrido");
                emisionDAO.movimientoMpolicoa(cdunieco, cdramo, estado, nmpoliza, nmsuplem_bloque, nmsuplem_session, 
                        cdcia, cdtipcoa, status, swabrido, porcpart, cdmodelo, swpagcom, accion);                
            }
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
    }
    
    @Override
    public void movimientoMsupcoa(String cdcialider, String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmpolizal, String nmsuplem_bloque, String nmsuplem_session, String tipodocu, String ndoclider, 
            String status, String accion) throws Exception{
        logger.debug(Utils.log("@@@@@@ movimientoMsupcoa cdunieco=", cdunieco, 
                " cdramo=", cdramo, 
                " estado=", estado, 
                " nmpoliza=", nmpoliza,
                " nmsuplem=", nmsuplem_bloque));
        String paso = "Movimiento msupcoa";
        try{
            validaCoaseguro(cdunieco, cdramo, estado, nmpoliza, nmsuplem_bloque);
            emisionDAO.movimientoMsupcoa(cdcialider, cdunieco, cdramo, estado, nmpoliza, nmpolizal, nmsuplem_bloque, nmsuplem_session, tipodocu, ndoclider, status, accion);
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerCoaseguroAceptado(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
        String paso = "Obteniendo coaseguro aceptado";
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        try{
            lista = emisionDAO.obtenerCoaseguroAceptado(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
    }
    
    private void validaCoaseguro(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
        logger.debug(Utils.log("@@@@@@ validaCoaseguro cdunieco=", cdunieco, 
                " cdramo=", cdramo, 
                " estado=", estado, 
                " nmpoliza=", nmpoliza,
                " nmsuplem=", nmsuplem));
        String paso = "Validando coaseguro de poliza";
        try{
            if(emisionDAO.tieneCoaseguro(cdunieco, cdramo, estado, nmpoliza, nmsuplem)){
                emisionDAO.eliminaCoaseguro(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
    }
    
    @Override
    public void eliminaCoaseguro(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
        String paso = "Eliminando coaseguro de poliza";
        try{
            emisionDAO.eliminaCoaseguro(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
    }
    
    @Override
    public void actualizaSwitchCoaseguroCedido(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, Map<String, String> cdesqcoa) throws Exception{
        String paso = "Actualizando switch de coaseguro cedido";
        try{
            String otvalor = "";
            for(String key:cdesqcoa.keySet()){
                if(key.startsWith("otvalor")){
                    otvalor = cdesqcoa.get(key);
                    emisionDAO.actualizaSwitchCoaseguroCedido(cdunieco, cdramo, estado, nmpoliza, nmsuplem, otvalor);
                }
            }
        } catch (Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerExclusionesSituacCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsituac, String nmsuplem) throws Exception{
        String paso = "Obtener situaciones excluidas de coaseguro cedido parcial";
        List<Map<String, String>> exclusiones = new ArrayList<Map<String, String>>();
        try{
            exclusiones = emisionDAO.obtenerTsiexcoa(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return exclusiones;
    }

    @Override
    public List<Map<String, String>> obtenerExclusionesCoberCoaCedParc(String cdunieco, String cdramo, String estado,
            String nmpoliza, String nmsituac, String cdgarant, String nmsuplem) throws Exception {
        List<Map<String, String>> exclusiones = new ArrayList<Map<String, String>>();
        String paso = "Obteniendo coberturas excluidas de coaseguro cedido parcial";
        try{
            exclusiones = emisionDAO.obtenerTgrexcoa(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdgarant, nmsuplem);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return exclusiones;
    }

    @Override
    public String obtenerCoaseguroPoliza(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem)
            throws Exception {
        List<Map<String, String>> exclusiones = new ArrayList<Map<String, String>>();
        String paso = "Obteniendo coaseguro de poliza",
               cdtipcoa = "";
        try{
            cdtipcoa = emisionDAO.obtenerCdtipcoaPoliza(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return cdtipcoa;
    }

    @Override
    public void movimientoExclusionesSituacCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String nmsuplem, String accion) throws Exception {
        String paso = "Modificando situaciones excluidas de coaseguro cedido parcial";
        try{
            emisionDAO.movimientoTsiexcoa(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, accion);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
    }

    @Override
    public void movimientoExclusionesCoberCoaCedParc(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String cdcapita, String nmsuplem, String accion) throws Exception {
        String paso = "Modificando coberturas excluidas de coaseguro cedido parcial";
        try{
            emisionDAO.movimientoTgrexcoa(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdcapita, nmsuplem, accion);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }   
    }
}