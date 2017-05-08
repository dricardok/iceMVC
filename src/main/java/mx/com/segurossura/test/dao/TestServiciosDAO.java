package mx.com.segurossura.test.dao;

import java.util.List;
import java.util.Map;

public interface TestServiciosDAO {

    /**
     * Obtiene los submenus de un menu padre
     * @param cdmenu Codigo del menu padre
     * @param cdnivelPadre Nivel del menu padre
     * @return Lista de submenus
     * @throws Exception
     */
    public List<Map<String, String>> obtieneSubmenus(String cdmenu, String cdnivelPadre) throws Exception;    
    
    /**
     * 
     * @param paramEntrada
     * @return
     * @throws Exception
     */
    public String ejecutaStoredFunction(String paramEntrada) throws Exception;
    
}
