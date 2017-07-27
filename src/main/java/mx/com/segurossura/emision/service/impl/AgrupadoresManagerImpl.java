package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.core.model.BaseVO;

import mx.com.segurossura.emision.dao.AgrupadoresDAO;
import mx.com.segurossura.emision.service.AgrupadoresManager;
import mx.com.segurossura.general.catalogos.model.Bloque;
import mx.com.segurossura.general.utils.ValoresMinimosUtils;

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
										   String cdagrupa, String nmsuplem_sesion, String nmsuplem_bloque,
										   Map<String, String> datos, String accion) throws Exception {
		
		String paso = "Ejecutando movimiento de poliagr";		
		try{
			if ("D".equals(accion)) {
				if(StringUtils.isBlank(cdagrupa)) {
					throw new ApplicationException("Falta cdagrupa");
				}			
				agrupadoresDAO.realizarMovimientoMpoliagr(cdunieco, cdramo, estado, nmpoliza, cdagrupa, nmsuplem_sesion, nmsuplem_bloque,
				        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, accion);
			
			} else if("I".equals(accion) || "U".equals(accion)) {
				
				// Recupera el registro actual
				Map<String, String> agrupador = null;
				try {
					agrupador = agrupadoresDAO.obtenerMpoliagr(cdunieco, cdramo, estado, nmpoliza,nmsuplem_sesion, cdagrupa ).get(0);
				} catch (Exception ex) {
					logger.warn("No se encuentra agrupador");
				}
				if (agrupador == null) {
					agrupador = ValoresMinimosUtils.obtenerValores(Bloque.AGRUPADOR_DE_SITUACIONES);
		        }
				
				// agregar los datos de pantalla al registro actual
				Map<String, String> camposLlave = new HashMap<String, String>();
				camposLlave.put("cdunieco", null);
		        camposLlave.put("cdramo", null);
		        camposLlave.put("estado", null);
		        camposLlave.put("nmpoliza", null);
		        camposLlave.put("cdagrupa", null);
		        camposLlave.put("nmsuplem", null);
		        camposLlave.put("status", null);
		        camposLlave.put("accion", null);
		        
		        for (Entry<String, String> en : datos.entrySet()) {
		            String key = en.getKey();
		            if (!camposLlave.containsKey(key)) {
		            	agrupador.put(key, en.getValue());
		            }
		        }
		        
				// invocar movimiento
		        agrupadoresDAO.realizarMovimientoMpoliagr(
		        		// llvae
		        		cdunieco, cdramo, estado, nmpoliza, cdagrupa, nmsuplem_sesion, nmsuplem_bloque,
		        		// datos
		        		agrupador.get("cdperson"),
		        		agrupador.get("nmorddom"),
		        		agrupador.get("cdforpag"),
		        		agrupador.get("cdbanco"),
		        		agrupador.get("cdsucurs"),
		        		agrupador.get("cdcuenta"),
		        		agrupador.get("cdrazon"),
		        		agrupador.get("swregula"),		        		
		        		agrupador.get("cdperreg"),		        		
		        		Utils.parse(agrupador.get("feultreg")),
		        		agrupador.get("cdgestor"),
		        		agrupador.get("cdtipred"),
		        		Utils.parse(agrupador.get("fevencim")),
		        		agrupador.get("cdtarcre"),
		        		agrupador.get("nmcuota"),
		        		agrupador.get("nmporcen"),
		        		
		        		// accion
		        		accion);		
			
			} else {
				throw new ApplicationException("Acc\u00f3n no v\u00e1lida");
			}			
		} catch(Exception ex) {
			Utils.generaExcepcion(ex, paso);
		}
	}
	
	@Override
	public List<Map<String, String>> obtenerMpoliagrVista (String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplemSes)
            throws Exception {
	    String paso = "Recuperando agrupadores vista";
	    List<Map<String, String>> lista = null;
	    try {
	        lista = agrupadoresDAO.obtenerMpoliagrVista(cdunieco, cdramo, estado, nmpoliza, nmsuplemSes);
	    } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
	    }
	    return lista;
	}
}