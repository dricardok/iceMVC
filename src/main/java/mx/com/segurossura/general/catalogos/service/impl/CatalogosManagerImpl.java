package mx.com.segurossura.general.catalogos.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        List<Map<String, String>> registrosTmanteni  = null;
        try {
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
                List<Map<String, String>> registrosTatripol = catalogosDAO.obtenerCatalogoTatripol(params.get("cdramo"), params.get("cdatribu"));
                lista = new ArrayList<BaseVO>();
                if (registrosTatripol != null) {
                    for (Map<String, String> registroTatripol: registrosTatripol) {
                        lista.add(new BaseVO(registroTatripol.get("otclave1"), registroTatripol.get("otvalor26")));
                    }
                }
                break;
            
            case TATRISIT:
                paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                List<Map<String, String>> registrosTatrisit = catalogosDAO.obtenerCatalogoTatrisit(params.get("cdtipsit"), params.get("cdatribu"));
                lista = new ArrayList<BaseVO>();
                if (registrosTatrisit != null) {
                    for (Map<String, String> registroTatrisit: registrosTatrisit) {
                        lista.add(new BaseVO(registroTatrisit.get("otclave1"), registroTatrisit.get("otvalor26")));
                    }
                }
                break;
                
            case TATRIGAR:
                paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                List<Map<String, String>> registrosTatrigar = catalogosDAO.obtenerCatalogoTatrigar(params.get("cdramo"), params.get("cdgarant"), params.get("cdatribu"));
                lista = new ArrayList<BaseVO>();
                logger.debug("-->tatrigar"+registrosTatrigar);
                if (registrosTatrigar != null) {
                    for (Map<String, String> registroTatrigar: registrosTatrigar) {
                        lista.add(new BaseVO(registroTatrigar.get("otclave1"), registroTatrigar.get("otvalor26")));
                    }
                }
                break;
                
            case FORMAS_PAGO:
                paso = "Recuperando tabla de mantenimiento";
                registrosTmanteni = catalogosDAO.obtenerCatalogoTmanteni(cat.getCdtabla());
                lista = new ArrayList<BaseVO>();
                if (registrosTmanteni != null) {
                    for (Map<String, String> registroTmanteni: registrosTmanteni) {
                        lista.add(new BaseVO(registroTmanteni.get("codigo"), registroTmanteni.get("descripl")));
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
                
            default:
                throw new ApplicationException(Utils.join("No existe el cat\u00e1logo ", catalogo));
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
    }
    
}