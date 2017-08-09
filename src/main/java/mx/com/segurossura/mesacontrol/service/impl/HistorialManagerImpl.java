package mx.com.segurossura.mesacontrol.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.mesacontrol.dao.HistorialDAO;
import mx.com.segurossura.mesacontrol.dao.impl.HistorialDAOImpl;
import mx.com.segurossura.mesacontrol.service.HistorialManager;

@Service
public class HistorialManagerImpl  implements HistorialManager{

	private static final Logger logger = LoggerFactory.getLogger(HistorialManagerImpl.class);
	
	@Autowired
	HistorialDAO historialDao;
	
	@Override
	public List<Map<String, String>> obtieneTdmesacontrol(String ntramite) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtieneTdmesacontrol"

		));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {

			paso = "Consultando datos";

			datos = historialDao.obtieneTdmesacontrol(ntramite);
			datos.forEach(m -> { 
				String f=m.get("fecha");
				if(f!= null && f.matches("^[0-9]{2}/[0-9]{2}/[0-9]{4}$")){
					m.put("fecha", f+" 00:00");
				}
			});


		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ obtieneTdmesacontrol", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public List<Map<String, String>> obtieneThmesacontrol(String ntramite) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ obtieneThmesacontrol"

		));
		String paso = "";
		List<Map<String, String>> datos = null;
		try {

			paso = "Consultando datos";

			datos = historialDao.obtieneThmesacontrol(ntramite);
			
			datos.forEach(m -> { 
				String f=m.get("fefecha");
				if(f!= null && f.matches("^[0-9]{2}/[0-9]{2}/[0-9]{4}$")){
					m.put("fefecha", f+" 00:00");
				}
				
				f=m.get("fefecha_fin");
				if(f!= null && f.matches("^[0-9]{2}/[0-9]{2}/[0-9]{4}$")){
					m.put("fefecha_fin", f+" 00:00");
				}
			});

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ obtieneThmesacontrol", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
		return datos;
	}

	@Override
	public void movimientoTdmesacontrol(String ntramite, String nmordina, String cdtiptra,
			String cdclausu, Date fecha, String commets, String cdusuari, String cdmotivo, String cdsisrol,
			String swagente, String estatus, String cdmodulo, String cdevento, String accion) throws Exception {
		logger.debug(Utils.join("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", "\n@@@@@@ movimientoTdmesacontrol"

		));
		String paso = "";

		try {

			paso = "Consultando datos";
			historialDao.movimientoTdmesacontrol(ntramite, nmordina, cdtiptra, cdclausu, fecha, commets, cdusuari, cdmotivo, cdsisrol, swagente, estatus, cdmodulo, cdevento, accion);
			

		} catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}

		logger.debug(Utils.join("\n@@@@@@ movimientoTdmesacontrol", "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"));
	}

}
