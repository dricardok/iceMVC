package mx.com.segurossura.general.utils;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.general.catalogos.model.Bloque;

public class ValoresMinimosUtils {
    /**
     * COLUMNAS QUE NO PUEDEN SER NULL PARA HACER UN P_MOV.
     * Query:
     * SELECT COLUMN_ID,
              TABLE_NAME,
              COLUMN_NAME,
              DATA_TYPE,
              DATA_LENGTH,
              DATA_PRECISION,
              DATA_SCALE,
              NULLABLE
         FROM ALL_TAB_COLUMNS
        WHERE TABLE_NAME = <<<NOMBRE_TABLA>>>
          AND NULLABLE = 'N'
        ORDER BY COLUMN_ID
     * VALOR MAS USUAL.
     * Query:
     * SELECT <<<NOMBRE_COLUMNA>>>,
              COUNT(*) CONTEO
         FROM <<<NOMBRE_TABLA>>>
        WHERE ESTADO = 'W'
        GROUP BY <<<NOMBRE_COLUMNA>>>
        ORDER BY 2 DESC
     */
    public static Map<String, Object> obtenerValores(Bloque bloque) throws Exception {
        Map<String, Object> valoresMinimos = new LinkedHashMap<String, Object>();
        if (bloque.equals(Bloque.DATOS_GENERALES)) { // MPOLIZAS
            valoresMinimos.put("swestado", "0");
            valoresMinimos.put("swautori", "N");
            valoresMinimos.put("cdmoneda", "MXP");
            valoresMinimos.put("ottempot", "R");
            valoresMinimos.put("feefecto", new Date());
            valoresMinimos.put("hhefecto", "12:00");
            valoresMinimos.put("nmrenova", "0");
            valoresMinimos.put("nmnumsin", "0");
            valoresMinimos.put("cdtipcoa", "N");
            valoresMinimos.put("swtarifi", "A");
            valoresMinimos.put("feemisio", new Date());
            valoresMinimos.put("cdperpag", "12");
            valoresMinimos.put("nmcuadro", "X"); // es por prod?
            valoresMinimos.put("porredau", "0");
            valoresMinimos.put("swconsol", "S");
            valoresMinimos.put("cdtipren", "12");
        } else if (bloque.equals(Bloque.ATRIBUTOS_DATOS_GENERALES)) { // TVALOPOL
            // sin valores minimos, solo llave e imagen (nmsuplem, status)
        } else if (bloque.equals(Bloque.SITUACIONES)) { // MPOLISIT
            valoresMinimos.put("cdtipsit", "X"); // es por prod?
            valoresMinimos.put("cdagrupa", "1");
            valoresMinimos.put("cdestado", "0");
            valoresMinimos.put("fefecsit", new Date());
        } else if (bloque.equals(Bloque.ATRIBUTOS_SITUACIONES)) { // TVALOSIT
            valoresMinimos.put("cdtipsit", "X"); // es por prod?
        } else {
            throw new ApplicationException("No se han implementado los valores minimos para el bloque");
        }
        return valoresMinimos;
    };
    
    /**
     * Sobrecargado. El original tiene los elementos, este los fusiona agregando los del mapa de entrada
     */
    public static Map<String, Object> obtenerValores(Bloque bloque, Map<String, String> datos) throws Exception {
        Map<String, Object> valoresMinimos = ValoresMinimosUtils.obtenerValores(bloque);
        for (Entry<String, String> en : datos.entrySet()) {
            String key = en.getKey(),
                   value = en.getValue();
            Object valueObj = value;
            
            // tratamos las fechas para ser null o Date
            if (key.substring(0, 1).equals("f")) {
                if (StringUtils.isBlank(value)) {
                    valueObj = null;
                } else {
                    valueObj = Utils.parse(value);
                }
            }
            valoresMinimos.put(key, valueObj);
        }
        return valoresMinimos;
    };
}