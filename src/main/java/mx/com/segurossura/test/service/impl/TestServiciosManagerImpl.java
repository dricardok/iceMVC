package mx.com.segurossura.test.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.biosnettcs.core.exception.ApplicationException;
import com.biosnettcs.core.exception.DaoException;

import mx.com.segurossura.test.dao.TestServiciosDAO;
import mx.com.segurossura.test.model.AlumnoMateriaVO;
import mx.com.segurossura.test.model.AlumnoVO;
import mx.com.segurossura.test.model.MateriaVO;
import mx.com.segurossura.test.service.TestServiciosManager;

@Service
public class TestServiciosManagerImpl implements TestServiciosManager {

    @Autowired
    private TestServiciosDAO testServiciosDAO;
    
    @Override
    public void guardarAlumno(AlumnoVO alumno) throws Exception {
        testServiciosDAO.guardarAlumno(alumno);
    }

    @Override
    @Transactional(rollbackFor={DaoException.class, ApplicationException.class, Exception.class})
    public void guardarAlumnoMateria(AlumnoVO alumno, AlumnoMateriaVO alumnoMateria) throws Exception {
        alumnoMateria.setCdalumno( testServiciosDAO.guardarAlumno(alumno));
        testServiciosDAO.guardarAlumnoMateria(alumnoMateria);
    }

    @Override
    public void guardarMateria(MateriaVO materia) throws Exception {
        testServiciosDAO.guardarMateria(materia);
    }

    
}
