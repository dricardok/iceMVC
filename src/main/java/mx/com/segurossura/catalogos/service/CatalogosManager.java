package mx.com.segurossura.catalogos.service;

import java.util.List;
import java.util.Map;

import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.catalogos.controller.Catalogos;
import mx.com.segurossura.catalogos.model.GenericVO;


public interface CatalogosManager {
	
    public List<GenericVO> obtieneCatalogo(UsuarioVO usuario, String catalogo, Map<String, String> params) throws Exception;
}