package mx.com.segurossura.mesacontrol.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.mesacontrol.dao.MesaControlDAO;
import mx.com.segurossura.mesacontrol.service.MesaControlManager;

@Service("mesaControlManagerImplNew")
public class MesaControlManagerImpl implements MesaControlManager {
	
	private static final Logger logger = LoggerFactory.getLogger(MesaControlManagerImpl.class);
	
	@Autowired
	private MesaControlDAO mesaControlDAO;
	
	@Override
	public List<Map<String, String>> obtenerTramites(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagente, String ntramite, String estatus, Date desde, Date hasta, String nombre, String nmsolici, long start, long limit)
			throws Exception {
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtenerMesaControl"				
				));
		String paso = "";
        List<Map<String, String>> datos = null;
		try {
			paso="Consultando tramites de mesa de control";
			datos = mesaControlDAO.obtenerTramites(cdunieco, cdramo, estado, nmpoliza, cdagente, ntramite, estatus, desde, hasta, nombre, nmsolici, start, limit);
			
        } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtenerMesaControl"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}

}
