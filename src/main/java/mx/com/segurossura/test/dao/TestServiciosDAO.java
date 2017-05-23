package mx.com.segurossura.test.dao;

import java.util.List;
import java.util.Map;

import mx.com.segurossura.test.model.AlumnoMateriaVO;
import mx.com.segurossura.test.model.AlumnoVO;
import mx.com.segurossura.test.model.MateriaVO;

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
    
    
    /**
     * 
     * @param stdVO
     * @throws Exception
     */
    public long guardarAlumno(AlumnoVO stdVO) throws Exception;
    
    /**
     * 
     * @param stdMatVO
     * @throws Exception
     */
    public void guardarAlumnoMateria(AlumnoMateriaVO stdMatVO) throws Exception;
    
    /**
     * 
     * @param matVO
     * @throws Exception
     */
    public long guardarMateria(MateriaVO materia) throws Exception;
    
}
