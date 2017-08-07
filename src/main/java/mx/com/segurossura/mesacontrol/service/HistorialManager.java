package mx.com.segurossura.mesacontrol.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface HistorialManager {

	List<Map<String, String>> obtieneTdmesacontrol(String ntramite) throws Exception;

	List<Map<String, String>> obtieneThmesacontrol(String ntramite) throws Exception;

	void movimientoTdmesacontrol(String ntramite, String nmordina, String cdtiptra,
			String cdclausu, Date fecha, String commets, String cdusuari, String cdmotivo, String cdsisrol,
			String swagente, String estatus, String cdmodulo, String cdevento, String accion) throws Exception;

}
