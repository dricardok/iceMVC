package mx.com.segurossura.emision.service;

import java.util.List;

import mx.com.royalsun.alea.commons.bean.Documento;

public interface ImpresionManager {
	
	public List<Documento> getDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem) throws Exception;

}
