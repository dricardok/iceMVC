package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.model.BaseVO;

import mx.com.segurossura.emision.dao.AgrupadoresDAO;
import mx.com.segurossura.emision.service.AgrupadoresManager;

@Service
public class AgrupadoresManagerImpl implements AgrupadoresManager {
	
    private static final Logger logger = LoggerFactory.getLogger(AgrupadoresManagerImpl.class);

	@Autowired
	private AgrupadoresDAO agrupadoresDAO;

	@Override
	public List<BaseVO> obtenerAgrupadoresEnteros(String cdunieco, String cdramo, String estado,
			String nmpoliza, String nmsuplem) throws Exception {
		BaseVO objeto;
		int maxAgrupador = 0;
		List<BaseVO> listaAgrupadores = new ArrayList<BaseVO>();
		
		try{			
			maxAgrupador = agrupadoresDAO.obtenerAgrupadorMaximo(cdunieco, cdramo, estado, nmpoliza, nmsuplem);
			
			for(int i = maxAgrupador; i>0; i--){
				objeto = new BaseVO();
				objeto.setKey(Integer.toString(i));
				objeto.setValue(Integer.toString(i));
				listaAgrupadores.add(objeto);
			}
			
		}catch(Exception e){
			
			e.printStackTrace();
		
		}
		
		return listaAgrupadores;
	}
	
	@Override
    public List<Map<String, String>> obtenerMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsuplem, String cdagrupa) throws Exception {
		
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ obtenerMpoliagr"				
				));
        String paso="";
        List<Map<String, String>> datos=null;
		try {
			paso="Consultando datos";
			datos = agrupadoresDAO.obtenerMpoliagr(cdunieco, cdramo, estado, nmpoliza, nmsuplem, cdagrupa);
			
        } catch (Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ obtenerMpoliagr"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
		return datos;
	}
	
	
	@Override
	public void realizarMovimientoMpoliagr(String cdunieco, String cdramo, String estado, String nmpoliza,
			String cdagrupa, String nmsuplem_sesion, String nmsuplem_bloque, String cdperson,
			String nmorddom, String cdforpag, String cdbanco, String cdsucurs, String cdcuenta, String cdrazon,
			String swregula, String cdperreg, String feultreg, String cdgestor, String cdtipred, String fevencim,
			String cdtarcre, String nmcuota, String nmporcen, String accion) throws Exception {
		logger.debug(Utils.join(
				 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				,"\n@@@@@@ realizarMovimientoMpoliagrSP"				
				));
		List<Map<String, String>> listaMpoligar = null;
		String paso = "";
		try{
			
			paso="Consultando datos";			
			
			if(!accion.equals("D")) {
				
				listaMpoligar = agrupadoresDAO.obtenerMpoliagr(cdunieco, cdramo, estado, nmpoliza, cdagrupa, nmsuplem_sesion);
				
				if( listaMpoligar != null ){
					
					
				}
			
			}
			
			agrupadoresDAO.realizarMovimientoMpoliagr(cdunieco, cdramo, estado, nmpoliza, cdagrupa, nmsuplem_sesion, nmsuplem_bloque, 
					cdperson, nmorddom, cdforpag, cdbanco, cdsucurs, cdcuenta, cdrazon, swregula, cdperreg, feultreg, 
					cdgestor, cdtipred, fevencim, cdtarcre, nmcuota, nmporcen, accion);
			
			
		} catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
		
		logger.debug(Utils.join(
				 "\n@@@@@@ movimientoMpoliagrSP"
				,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
				));
	}
}