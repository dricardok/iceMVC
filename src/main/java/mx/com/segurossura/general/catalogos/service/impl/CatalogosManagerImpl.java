package mx.com.segurossura.general.catalogos.service.impl;

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
import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.core.model.BaseVO;

import mx.com.segurossura.emision.dao.AgrupadoresDAO;
import mx.com.segurossura.general.catalogos.dao.CatalogosDAO;
import mx.com.segurossura.general.catalogos.model.Catalogos;
import mx.com.segurossura.general.catalogos.service.CatalogosManager;

@Service
public class CatalogosManagerImpl implements CatalogosManager {
    
    private static final Logger logger = LoggerFactory.getLogger(CatalogosManagerImpl.class);
    
    @Autowired
    private CatalogosDAO catalogosDAO;
    
    @Autowired
    private AgrupadoresDAO agrupadoresDAO;
    
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
                
                case PRODUCTOS:
                    paso = "Recuperando productos";
                    List<Map<String, String>> productos = catalogosDAO.obtenerProductos();
                    lista = new ArrayList<BaseVO>();
                    if (productos != null) {
                        for (Map<String, String> sucursal : productos) {
                            lista.add(new BaseVO(sucursal.get("cdramo"), sucursal.get("dsramo")));
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
                    
                case TATRIPER:
                    paso = "Recuperando lista de apoyo para atributo de p\u00f3liza";
                    List<Map<String, String>> registrosTatriper = catalogosDAO.obtenerCatalogoTatriper(params.get("cdramo"),
                            params.get("cdrol"), params.get("cdatribu"), params.get("idPadre"), params.get("idPadre2"),
                            params.get("idPadre3"), params.get("idPadre4"), params.get("idPadre5"));
                    lista = new ArrayList<BaseVO>();
                    logger.debug("-->tatrigar"+registrosTatriper);
                    if (registrosTatriper != null) {
                        for (Map<String, String> registroTatriper: registrosTatriper) {
                            lista.add(new BaseVO(registroTatriper.get("clave"), registroTatriper.get("descripcion")));
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
                    
                case ROLES_X_RAMO:
                    paso = "Recuperando catalogo roles por ramo";
                    lista = new ArrayList<>();
                    List<Map<String, String>> listaRoles = catalogosDAO.obtenerRolXRamo(params.get("cdramo"));
                    if (listaRoles != null) {
                        for (Map<String, String> registroTmanteni: listaRoles) {
                            lista.add(new BaseVO(registroTmanteni.get("cdrol"), registroTmanteni.get("descripl")));
                        }
                    }
                    break;
                    
                case PERSONAS:
                    paso = "Recuperando catalogo roles por ramo";
                    lista = new ArrayList<>();
                    String cdunieco = params.get("cdunieco");
                    String cdramo = params.get("cdramo");
                    String estado = params.get("estado");
                    String nmpoliza = params.get("nmpoliza");
                    String nmsituac = params.get("nmsituac");
                    String nmsuplem = params.get("nmsuplem");
                    String cdrol = params.get("cdrol");
                    String cdperson = params.get("cdperson");
                    String cdatribu = params.get("cdatribu");
                    String otvalor = params.get("otvalor").toUpperCase();
                    List<Map<String, String>> listaPersonas = catalogosDAO.obtenerPersonas(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem, cdrol, cdperson, cdatribu, otvalor);
                    if (listaPersonas != null) {
                        for (Map<String, String> registroTmanteni: listaPersonas) {
                            lista.add(new BaseVO(registroTmanteni.get("cdperson"), registroTmanteni.get("dsnombre")));
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
                   
               case CUACOM_RAMO:
            	   paso = "Recuperando catalogo de cuadros comision";
            	   lista = new ArrayList<>();
            	   List<Map<String, String>> listaCuacom = catalogosDAO.obtenerCuadrosComision(params.get("cdramo"));
            	   if(listaCuacom != null){
            		   for (Map<String, String> registroTmanteni: listaCuacom) {
            			   lista.add(new BaseVO(registroTmanteni.get("nmcuadro"), registroTmanteni.get("descripl")));
            		   }
            	   }
            	   break;
            	   
               case TMANTENI:
            	   paso = "Recuperando catalogo de TMANTENI";
            	   lista = new ArrayList<>();
            	   List<Map<String, String>> tmanteni = catalogosDAO.obtenerCatalogoTablaManteni(params.get("cdtabla"));
            	   if(tmanteni != null){
            		   for (Map<String, String> registro: tmanteni) {
            			   lista.add(new BaseVO(registro.get("codigo"), registro.get("descripl")));
            		   }
            	   }
            	   break;
            	   
               case AGRUPADORES_POLIZA:
                   paso = "Recuperando cat\u00e1logo de agrupadores de p\u00f3liza";
                   if (params != null) {
                       lista = new ArrayList<>();
                       int agrupadorMax = agrupadoresDAO.obtenerAgrupadorMaximo(
                               params.get("cdunieco"), params.get("cdramo"), params.get("estado"), params.get("nmpoliza"),
                               Utils.NVL(params.get("nmsuplem"), "0"));
                       for (int i = 1; i <= agrupadorMax; i++) {
                           lista.add(new BaseVO(i + "", i + ""));
                       }
                   }
                   break;
                   
               case SUCURSALES_BANCARIAS:
            	   paso = "Recuperando cat\u00e1logo de sucursales bancarias";
            	   if (params == null) {
            	       params = new HashMap<String, String>();
            	   }
        		   lista = new ArrayList<>();
            	   List<Map<String, String>> sucBanc = catalogosDAO.obtenerSucuBanc(params.get("idPadre"));
            	   if(sucBanc != null){
            		   for (Map<String, String> registro: sucBanc) {
            			   lista.add(new BaseVO(registro.get("cdsucurs"), registro.get("dssucurs")));
            		   }
            	   }
            	   break;
               case GESTORES_COBRANZA:
            	   paso = "Recuperando cat\u00e1logo de gestores de cobranza";
            	   lista = new ArrayList<>();
                   List<Map<String, String>> gestoresCobranza = catalogosDAO.obtienerGestoresCob();
                   if (gestoresCobranza != null) {
                       for (Map<String, String> registro: gestoresCobranza) {
                           lista.add(new BaseVO(registro.get("cdgestor"), registro.get("dsgestor")));
                       }
                   }
            	   break;
               case ESTATUS_TRAMITE:
            	   paso = "Recuperando cat\u00e1logo de estatus de tramite";
            	   lista = new ArrayList<>();
            	   List<Map<String, String>> estatusTramite = catalogosDAO.obtenerEstatusTramite();
                   if (estatusTramite != null) {
                	   lista.add(new BaseVO("-1", "TAREAS PENDIENTES"));
                	   lista.add(new BaseVO("0", "TODOS"));
                       for (Map<String, String> registro: estatusTramite) {
                           lista.add(new BaseVO(registro.get("estatus"), registro.get("dsestadomc")));
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