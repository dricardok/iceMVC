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
        List<Map<String, String>> registros = new ArrayList<>();
        List<BaseVO> lista = null;
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
                registros = catalogosDAO.obtenerCatalogoTatripol(params.get("cdramo"), params.get("cdatribu"));
                lista = new ArrayList<BaseVO>();
                if (registros != null) {
                    for (Map<String, String> registro: registros) {
                        lista.add(new BaseVO(registro.get("otclave1"), registro.get("otvalor26")));
                    }
                }
                break;
             
            case TATRISIT:
                paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                registros = catalogosDAO.obtenerCatalogoTatrisit(params.get("cdtipsit"), params.get("cdatribu"));
                lista = new ArrayList<BaseVO>();
                if (registros != null) {
                    for (Map<String, String> registro: registros) {
                        lista.add(new BaseVO(registro.get("otclave1"), registro.get("otvalor26")));
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