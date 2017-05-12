package mx.com.segurossura.general.cmp.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.general.cmp.dao.ComponentesDAO;
import mx.com.segurossura.general.cmp.service.ComponentesManager;

@Service
public class ComponentesManagerImpl implements ComponentesManager {

    @Autowired
    private ComponentesDAO componentesDAO;
    
    @Override
    public Map<String, List<Map<String, String>>> obtenerComponentes(List<Map<String, String>> componentes) throws Exception {
        Map<String, List<Map<String, String>>> result = new HashMap<String, List<Map<String,String>>>();
        String paso = "";
        try{
            for(Map<String, String> map: componentes){
                paso = "Antes de obtener componentes";
                String pantalla = map.get("pantalla");
                String seccion = map.get("seccion");
                String modulo = map.get("modulo");
                String estatus = map.get("estatus");
                String cdramo = map.get("cdramo");
                String cdtipsit = map.get("cdtipsit");
                String cdsisrol = map.get("cdsisrol");
                String auxkey = map.get("auxKey");                
                result.put(seccion, componentesDAO.obtenerListaComponentesSP(pantalla, seccion, modulo, estatus, cdramo, cdtipsit, cdsisrol, auxkey));
            }
             
        }
        catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return result;
    }

    @Override
    public void movimientoComponentes(String pantalla, String seccion, String modulo,
            String estatus, String cdramo, String cdtipsit, String cdsisrol, String auxkey, List<Map<String, String>> lista) throws Exception{
        String paso = "";
        try{
            paso = "Antes de hacer operacion de componentes";
            componentesDAO.movimientoComponentesSP(pantalla, seccion, modulo, estatus, cdramo, cdtipsit, cdsisrol, auxkey, lista);
        }
        catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
    }
}
