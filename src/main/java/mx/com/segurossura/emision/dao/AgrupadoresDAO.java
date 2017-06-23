package mx.com.segurossura.emision.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface AgrupadoresDAO {

    /**
     * 
     * @param pv_cdunieco_i
     * @param pv_cdramo_i
     * @param pv_estado_i
     * @param pv_nmpoliza_i
     * @param pv_nmsuplem_i
     * @return
     * @throws Exception
     */
    public int obtenerAgrupadorMaximo(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i,
            String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception;

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
    public List<Map<String, String>> obtenerMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplem, String cdagrupa) throws Exception;

    /**
     * 
     * @param cdunieco
     * @param cdramo
     * @param estado
     * @param nmpoliza
     * @param cdagrupa
     * @param nmsuplem_sesion
     * @param nmsuplem_bloque
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
    public void realizarMovimientoMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
            String cdagrupa, String nmsuplem_sesion, String nmsuplem_bloque, String cdperson, String nmorddom,
            String cdforpag, String cdbanco, String cdsucurs, String cdcuenta, String cdrazon, String swregula,
            String cdperreg, Date feultreg, String cdgestor, String cdtipred, Date fevencim, String cdtarcre,
            String nmcuota, String nmporcen, String accion) throws Exception;
    
}