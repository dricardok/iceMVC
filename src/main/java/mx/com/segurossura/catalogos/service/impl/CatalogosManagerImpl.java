package mx.com.segurossura.catalogos.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.catalogos.service.CatalogosManager;
import mx.com.segurossura.catalogos.controller.Catalogos;
import mx.com.segurossura.catalogos.dao.CatalogosDAO;
import mx.com.segurossura.catalogos.model.GenericVO;
import mx.com.segurossura.catalogos.service.CatalogosManager;

@Service
public class CatalogosManagerImpl implements CatalogosManager {
	
    @Autowired
    private CatalogosDAO catalogosDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(CatalogosManagerImpl.class);
		
	@Override
	public List<GenericVO> obtieneCatalogo(UsuarioVO usuario, String catalogo, Map<String, String> params) throws Exception{
	    String paso = "";
	    List<GenericVO> lista = null;
        try{
            paso = "Antes de obtener catalogo";
            Catalogos cat = Catalogos.valueOf(catalogo);
            switch(cat){
            case TATRISIT:
                lista = obtieneAtributosSituacion(params.get("cdatribu"), params.get("cdtipsit"), params.get("otvalor"), usuario.getRolActivo().getCdsisrol());
                break;          
            default:
                throw new Exception("Catalogo no existente: " + cat);
                //break;
            }
        }
        catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
	}
	
    private List<GenericVO> obtieneAtributosSituacion(String cdatribu, String cdtipsit, String otvalor, String cdsisrol) throws Exception {
        logger.info(
                new StringBuilder()
                .append("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                .append("\n@@@@@@ obtieneAtributosSituacion @@@@@@")
                .toString()
                );
        String paso = "";
        List<GenericVO> lista = new ArrayList<GenericVO>();
        try{
            paso = "Antes de recuperar Giros";          
            lista = catalogosDAO.obtieneAtributosSituacionDAO(cdatribu, cdtipsit, otvalor, cdsisrol);
        }
        catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }       
        logger.info(
                new StringBuilder()
                .append("\n@@@@@@ obtieneAtributosSituacion @@@@@@")
                .append("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")             
                .toString()
                );
        return lista;
    }
}