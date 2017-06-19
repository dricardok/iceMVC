package mx.com.segurossura.general.catalogos.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.core.model.BaseVO;

import mx.com.segurossura.general.catalogos.dao.CatalogosDAO;
import mx.com.segurossura.general.catalogos.model.Catalogos;
import mx.com.segurossura.general.catalogos.service.CatalogosManager;

@Service
public class CatalogosManagerImpl implements CatalogosManager {
    
    private static final Logger logger = LoggerFactory.getLogger(CatalogosManagerImpl.class);
    
    @Autowired
    private CatalogosDAO catalogosDAO;
    
    @Override
    public List<BaseVO> obtenerCatalogo (String catalogo, Map<String, String> params, String cdusuari, String cdsisrol) throws Exception {
        String paso = Utils.join("Recuperando cat\u00e1logo ", catalogo);
        List<BaseVO> lista = null;
        
        try {
            // Si se encuentra el prefijo "CAT_" se busca en las tablas de apoyo: 
            if(catalogo.toUpperCase().startsWith("CAT_")) {
                lista = catalogosDAO.obtenerCatalogoTablaApoyo(catalogo.toUpperCase().substring(4));
            } else {
                Catalogos cat = Catalogos.valueOf(catalogo);
                switch (cat) {
                case SUCURSALES:
                    paso = "Recuperando sucursales";
                    List<Map<String, String>> sucursales = catalogosDAO.obtenerSucursales();
                    lista = new ArrayList<BaseVO>();
                    if (sucursales != null) {
                        for (Map<String, String> sucursal : sucursales) {
                            lista.add(new BaseVO(sucursal.get("cdunieco"), sucursal.get("dsunieco")));
                        }
                    }
                    break;
                    
                case TATRIPOL:
                    paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                    List<Map<String, String>> registrosTatripol = catalogosDAO.obtenerCatalogoTatripol(params.get("cdramo"),
                            params.get("cdatribu"), params.get("idPadre"), params.get("idPadre2"), params.get("idPadre3"),
                            params.get("idPadre4"), params.get("idPadre5"));
                    lista = new ArrayList<BaseVO>();
                    if (registrosTatripol != null) {
                        for (Map<String, String> registroTatripol: registrosTatripol) {
                            lista.add(new BaseVO(registroTatripol.get("clave"), registroTatripol.get("descripcion")));
                        }
                    }
                    break;
                
                case TATRISIT:
                    paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                    List<Map<String, String>> registrosTatrisit = catalogosDAO.obtenerCatalogoTatrisit(params.get("cdtipsit"),
                            params.get("cdatribu"), params.get("idPadre"), params.get("idPadre2"), params.get("idPadre3"),
                            params.get("idPadre4"), params.get("idPadre5"));
                    lista = new ArrayList<BaseVO>();
                    if (registrosTatrisit != null) {
                        for (Map<String, String> registroTatrisit: registrosTatrisit) {
                            lista.add(new BaseVO(registroTatrisit.get("clave"), registroTatrisit.get("descripcion")));
                        }
                    }
                    break;
                    
                case TATRIGAR:
                    paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                    List<Map<String, String>> registrosTatrigar = catalogosDAO.obtenerCatalogoTatrigar(params.get("cdramo"),
                            params.get("cdgarant"), params.get("cdatribu"), params.get("idPadre"), params.get("idPadre2"),
                            params.get("idPadre3"), params.get("idPadre4"), params.get("idPadre5"));
                    lista = new ArrayList<BaseVO>();
                    logger.debug("-->tatrigar"+registrosTatrigar);
                    if (registrosTatrigar != null) {
                        for (Map<String, String> registroTatrigar: registrosTatrigar) {
                            lista.add(new BaseVO(registroTatrigar.get("clave"), registroTatrigar.get("descripcion")));
                        }
                    }
                    break;
                    
                case TIPO_SITUACIONES:
                    paso = "Recuperando catalogo tipo de situaciones";
                    lista = new ArrayList<>();
                    List<Map<String, String>> listaTipSit = catalogosDAO.obtenerTipoSituaciones(params.get("cdramo"));
                    if (listaTipSit != null) {
                        for (Map<String, String> registroTmanteni: listaTipSit) {
                            lista.add(new BaseVO(registroTmanteni.get("cdtipsit"), registroTmanteni.get("dstipsit")));
                        }
                    }
                    break;
                case MUNICIPIO:
                	 paso = "Recuperando catalogo municipios";
                     lista = new ArrayList<>();
                     List<Map<String, String>> listaM = catalogosDAO.obtenerMunicipio(params.get("idPadre"));
                     if (listaM != null) {
                         for (Map<String, String> registro: listaM) {
                             lista.add(new BaseVO(registro.get("cdmunici"), registro.get("dsmunici")));
                         }
                     }
                	break;
                case PROVINCIA:
                	
                	 paso = "Recuperando catalogo provincia";
                     lista = new ArrayList<>();
                     List<Map<String, String>> listaP = catalogosDAO.obtenerProvincia();
                     if (listaP != null) {
                         for (Map<String, String> registroTmanteni: listaP) {
                             lista.add(new BaseVO(registroTmanteni.get("cdprovin"), registroTmanteni.get("dsprovin")));
                         }
                     }
                     break;
                case COLONIA:
                	 paso = "Recuperando catalogo colonia";
                     lista = new ArrayList<>();
                     if(StringUtils.isBlank(params.get("idPadre"))){
                    	 break;
                     }
                     List<Map<String, String>> listaC = catalogosDAO.obtenerColonia(params.get("idPadre"));
                     if (listaC != null) {
                         for (Map<String, String> registroTmanteni: listaC) {
                             lista.add(new BaseVO(registroTmanteni.get("cdcoloni"), registroTmanteni.get("dscoloni")));
                         }
                     }
                	break;
                default:
                    throw new ApplicationException(Utils.join("No existe el cat\u00e1logo ", catalogo));
                }
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
    }
    
}