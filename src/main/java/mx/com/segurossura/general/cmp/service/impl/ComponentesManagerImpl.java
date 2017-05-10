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
    public List<Map<String, String>> obtenerComponentes(String pantalla, String seccion, String modulo, String estatus,
            String cdramo, String cdtipsit, String cdsisrol, String auxkey) throws Exception {
        List<Map<String, String>> componentes = new ArrayList<Map<String,String>>();
        String paso = "";
        try{
            paso = "Antes de obtener componentes";
            componentes = componentesDAO.obtenerListaComponentesSP(pantalla, seccion, modulo, estatus, cdramo, cdtipsit, cdsisrol, auxkey); 
        }
        catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return componentes;
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
