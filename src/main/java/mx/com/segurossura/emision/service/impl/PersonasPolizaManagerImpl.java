package mx.com.segurossura.emision.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.PersonasPolizaDAO;
import mx.com.segurossura.emision.service.PersonasPolizaManager;

@Service
public class PersonasPolizaManagerImpl implements PersonasPolizaManager {
    
    private final static Logger logger = LoggerFactory.getLogger(PersonasPolizaManagerImpl.class);
    
    @Autowired
    private PersonasPolizaDAO personasPolizaDAO;

    @Override
    public List<Map<String, String>> obtieneMpoliper(String cdunieco, String cdramo, String estado, String nmpoliza, 
                                                     String nmsituac, String nmsuplem) throws Exception {       
        logger.debug(Utils.join(
                 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                ,"\n@@@@@@ obtieneMpoliper"
                ));
        String paso = "";       
        List<Map<String, String>> datos = null;
        try{
            paso = "Consultando datos";         
            datos = personasPolizaDAO.obtenerMpoliper(cdunieco, cdramo, estado, nmpoliza, nmsituac, nmsuplem);      
        }catch(Exception ex) {          
            Utils.generaExcepcion(ex, paso);
        }       
        logger.debug(Utils.join(
                 "\n@@@@@@ obtieneMpolizas"
                ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                )); 
        return datos;
    }
    
    @Override
    public void movimientoMpoliper(String cdunieco, String cdramo, String estado, String nmpoliza,
            String nmsituac, String cdrol, String cdperson, String cdrolNew, String cdpersonNew, 
            String nmsuplem_sesion, String nmsuplem_bloque, String nmorddom, String swfallec, String accion) throws Exception {        
        logger.debug(Utils.join(
                 "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                ,"\n@@@@@@ movimientoMpoliper"
                ));
        String paso = "";        
        try{
            paso = "Consultando datos";
            personasPolizaDAO.movimientoMpoliper(cdunieco, cdramo, estado, nmpoliza, nmsituac, cdrol, cdperson, cdrolNew, cdpersonNew, nmsuplem_sesion, nmsuplem_bloque, nmorddom, swfallec, accion);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                 "\n@@@@@@ movimientoMpoliper"
                ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                ));
        
    }
    
    @Override
    public List<Map<String, String>> obtenerPersonasCriterio(String cdunieco, String cdramo, String estado, String nmpoliza, String cdatribu, String otvalor) throws Exception{
        logger.debug(Utils.join(
                "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ,"\n@@@@@@ obtenerPersonasCriterio"
               ));
        String paso = "";
        List<Map<String, String>> listaPersonas = new ArrayList<Map<String, String>>(0);
        try{
            listaPersonas = personasPolizaDAO.obtenerPersonasCriterio(cdunieco, cdramo, estado, nmpoliza, cdatribu, otvalor);
        } catch(Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        logger.debug(Utils.join(
                "\n@@@@@@ obtenerPersonasCriterio"
               ,"\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
               ));
        return listaPersonas;
    }
}
