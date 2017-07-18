package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
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
import mx.com.segurossura.emision.service.DatosGeneralesManager;
import mx.com.segurossura.general.catalogos.model.Bloque;
import mx.com.segurossura.general.utils.ValoresMinimosUtils;

@Service
public class DatosGeneralesManagerImpl implements DatosGeneralesManager{

    private static final Logger logger = LoggerFactory.getLogger(DatosGeneralesManagerImpl.class);
    
    @Autowired
    private EmisionDAO emisionDAO;
    
    @Override
    public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String status, String swcolind, String nmpolcoi) throws Exception {
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
                    null
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
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return valores;
    }
    
    @Override
    public Map<String, String> valoresDefectoVariables (String cdusuari, String cdsisrol,
            String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status, Map<String, String> datosMpolizasPantalla) throws Exception {
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
                    null
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
                    mpolizas.get("nmcuadro"),
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
            
            
            paso = "Ejecutando validaciones";
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    "0", // nmsituac
                    nmsuplem,
                    null,
                    Bloque.DATOS_GENERALES.getCdbloque()
                    ));
            validaciones.addAll(emisionDAO.ejecutarValidaciones(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    "0", // nmsituac
                    nmsuplem,
                    null,
                    Bloque.ATRIBUTOS_DATOS_GENERALES.getCdbloque()
                    ));
            
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return validaciones;
    }

    @Override
    public List<Map<String, String>> obtenerCoaseguroCedido(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception{
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
        String paso = "Movimiento coaseguro cedido";
        try {
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
        String paso = "Movimiento msupcoa";
        try{
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
}