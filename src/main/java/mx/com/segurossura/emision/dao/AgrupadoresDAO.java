package mx.com.segurossura.emision.dao;

import java.util.List;
import java.util.Map;

public interface AgrupadoresDAO {
    
	int obtenerAgrupadorMaximo(String pv_cdunieco_i, String pv_cdramo_i, String pv_estado_i, String pv_nmpoliza_i, String pv_nmsuplem_i) throws Exception;
	
	List<Map<String, String>> obtenerMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza, String cdagrupa, String nmsuplem) throws Exception;	
	
	void realizarMovimientoMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza, String cdagrupa, String nmsuplem_sesion, String nmsuplem_bloque,
			String cdperson, String nmorddom, String cdforpag, String cdbanco, String cdsucurs, String cdcuenta, String cdrazon, String swregula,
			String cdperreg, String feultreg, String cdgestor, String cdtipred, String fevencim, String cdtarcre, String nmcuota, String nmporcen,
			String accion) throws Exception;
}