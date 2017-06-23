package mx.com.segurossura.emision.service;

import java.util.List;
import java.util.Map;

import com.biosnettcs.core.model.BaseVO;

public interface AgrupadoresManager {
    
    List<BaseVO> obtenerAgrupadoresEnteros(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception;
    
    List<Map<String, String>> obtenerMpoligar(String cdunieco, String cdramo, String estado,
			String nmpoliza, String cdagrupa, String nmsuplem) throws Exception;
    
    void realizarMovimientoMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
			String pv_cdagrupa_i, String pv_nmsuplem_sesion_i, String pv_nmsuplem_bloque_i, String cdperson,
			String nmorddom, String cdforpag, String cdbanco, String cdsucurs, String cdcuenta, String cdrazon,
			String swregula, String cdperreg, String feultreg, String cdgestor, String cdtipred, String fevencim,
			String cdtarcre, String nmcuota, String nmporcen, String accion) throws Exception;
}