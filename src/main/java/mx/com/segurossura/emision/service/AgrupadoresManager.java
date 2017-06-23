package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

import com.biosnettcs.core.model.BaseVO;

public interface AgrupadoresManager {
    
    /**
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @return
     * @throws Exception
     */
    List<BaseVO> obtenerAgrupadoresEnteros(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception;
    
    /**
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param nmsuplem
     * @param cdagrupa
     * @return
     * @throws Exception
     */
    List<Map<String, String>> obtenerMpoligar(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem, String cdagrupa) throws Exception;
    
    /**
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param pv_cdagrupa_i
     * @param pv_nmsuplem_sesion_i
     * @param pv_nmsuplem_bloque_i
     * @param cdperson
     * @param nmorddom
     * @param cdforpag
     * @param cdbanco
     * @param cdsucurs
     * @param cdcuenta
     * @param cdrazon
     * @param swregula
     * @param cdperreg
     * @param feultreg
     * @param cdgestor
     * @param cdtipred
     * @param fevencim
     * @param cdtarcre
     * @param nmcuota
     * @param nmporcen
     * @param accion
     * @throws Exception
     */
    void realizarMovimientoMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
			String pv_cdagrupa_i, String pv_nmsuplem_sesion_i, String pv_nmsuplem_bloque_i, String cdperson,
			String nmorddom, String cdforpag, String cdbanco, String cdsucurs, String cdcuenta, String cdrazon,
			String swregula, String cdperreg, String feultreg, String cdgestor, String cdtipred, String fevencim,
			String cdtarcre, String nmcuota, String nmporcen, String accion) throws Exception;
    
    
}