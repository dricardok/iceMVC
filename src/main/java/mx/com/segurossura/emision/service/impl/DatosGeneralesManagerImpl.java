package mx.com.segurossura.emision.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
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

@Service
public class DatosGeneralesManagerImpl implements DatosGeneralesManager{

    private static final Logger logger = LoggerFactory.getLogger(DatosGeneralesManagerImpl.class);
    
    @Autowired
    private EmisionDAO emisionDAO;
    
    @Override
    public Map<String, String> valoresDefectoFijos (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem,
            String swcolind, String nmpolcoi) throws Exception {
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso = null;
        try {
            paso = "Calculando n\u00famero de p\u00f3liza";
            estado = "W";
            nmpoliza = emisionDAO.generaNmpoliza(cdunieco, cdramo, estado, swcolind, nmpolcoi);
            
            valores.put("b1_estado", "W");
            valores.put("b1_nmpoliza", nmpoliza);
            
            paso = "Ejecutando valores por defecto fijos de bloque de datos generales";
            Map<String, String> valoresDefecto = emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, estado, nmpoliza,
                    "0", //nmsituac
                    nmsuplem,
                    "B1");
            for (Entry<String, String> en : valoresDefecto.entrySet()) {
                valores.put(Utils.join("b1_", en.getKey()), en.getValue());
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return valores;
    }
    
    @Override
    public Map<String, String> valoresDefectoVariables (String cdusuari, String cdsisrol,
            String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status, String swestado,
            String nmsolici, Date feautori, String cdmotanu, Date feanulac, String swautori,
            String cdmoneda, Date feinisus, Date fefinsus, String ottempot, Date feefecto,
            String hhefecto, Date feproren, Date fevencim, String nmrenova, Date ferecibo,
            Date feultsin, String nmnumsin, String cdtipcoa, String swtarifi, String swabrido,
            Date feemisio, String cdperpag, String nmpoliex, String nmcuadro, String porredau,
            String swconsol, String nmpolcoi, String adparben, String nmcercoi, String cdtipren) throws Exception {
        Map<String, String> valores = new LinkedHashMap<String, String>();
        String paso = null;
        try {
            paso = "Instanciando variables principales";
            nmsuplembloque = Utils.NVL(nmsuplembloque, "0");
            nmsuplemsesion = Utils.NVL(nmsuplemsesion, "0");
            status = Utils.NVL(status, "V");
            
            paso = "Insertando maestro de p\u00f3lizas";
            emisionDAO.movimientoMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplembloque, nmsuplemsesion, status, swestado,
                    nmsolici, feautori, cdmotanu, feanulac, swautori, cdmoneda, feinisus, fefinsus, ottempot, feefecto,
                    hhefecto, feproren, fevencim, nmrenova, ferecibo, feultsin, nmnumsin, cdtipcoa, swtarifi, swabrido,
                    feemisio, cdperpag, nmpoliex, nmcuadro, porredau, swconsol, nmpolcoi, adparben, nmcercoi, cdtipren,
                    "I" //accion
                    );
            
            paso = "Ejecutando valores por defecto variables";
            emisionDAO.ejecutarValoresDefecto(cdunieco, cdramo, swestado, nmpoliza,
                    "0", //nmsituac
                    nmsuplembloque,
                    "B1B" //cdbloque
                    );
            
            paso = "Recuperando valores variables";
            Map<String, String> tvalopol = emisionDAO.obtenerTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplembloque);
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
        Map<String, String> datos = null;
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
            datos = emisionDAO.obtieneMpolizas(cdunieco, cdramo, estado, nmpoliza, nmsuplem).get(0);
            if (datos == null) {
                throw new ApplicationException("No se encuentra la p\u00f3liza");
            }
            
            try {
                paso = "Recuperando atributos variables de p\u00f3liza";
                datos.putAll(emisionDAO.obtenerTvalopol(cdunieco, cdramo, estado, nmpoliza, nmsuplem));
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
    public Map<String, String> guardar (String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplembloque, String nmsuplemsesion, String status, String swestado,
            String nmsolici, Date feautori, String cdmotanu, Date feanulac, String swautori,
            String cdmoneda, Date feinisus, Date fefinsus, String ottempot, Date feefecto,
            String hhefecto, Date feproren, Date fevencim, String nmrenova, Date ferecibo,
            Date feultsin, String nmnumsin, String cdtipcoa, String swtarifi, String swabrido,
            Date feemisio, String cdperpag, String nmpoliex, String nmcuadro, String porredau,
            String swconsol, String nmpolcoi, String adparben, String nmcercoi, String cdtipren,
            Map<String, String> otvalores) throws Exception {
        Map<String, String> errores = null;
        String paso = null;
        try {
            paso = "Recuperando p\u00f3liza anterior";
            Map<String, String> mpolizasObj = null;
            
            if (StringUtils.isNotBlank(nmpoliza)) {
                try {
                    mpolizasObj = emisionDAO.obtieneMpolizas(cdunieco, cdramo, swestado, nmpoliza, nmsuplembloque).get(0);
                } catch (Exception e) {
                    logger.warn("No se encuentra la poliza anterior {}", e);
                }
            }
            
            // generar nmpoliza
            if (mpolizasObj == null) {
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return errores;
    }

}
