package mx.com.segurossura.test.service;

import mx.com.segurossura.test.model.AlumnoMateriaVO;
import mx.com.segurossura.test.model.AlumnoVO;
import mx.com.segurossura.test.model.MateriaVO;

public interface TestServiciosManager {
    
    /**
     * Guarda un alumno
     * @param alumno
     * @throws Exception
     */
    public void guardarAlumno(AlumnoVO alumno) throws Exception;

    /**
     * Guarda la relacion alumno-materia
     * @param alumno
     * @param alumnoMateria
     * @throws Exception
     */
    public void guardarAlumnoMateria(AlumnoVO alumno, AlumnoMateriaVO alumnoMateria) throws Exception;

    /**
     * Guarda una materia
     * @param materia
     * @throws Exception
     */
    public void guardarMateria(MateriaVO materia) throws Exception;
    
}