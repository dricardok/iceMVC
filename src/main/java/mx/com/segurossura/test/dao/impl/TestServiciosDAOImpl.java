package mx.com.segurossura.test.dao.impl;

import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;

import mx.com.segurossura.test.dao.TestServiciosDAO;
import mx.com.segurossura.test.model.AlumnoMateriaVO;
import mx.com.segurossura.test.model.AlumnoVO;
import mx.com.segurossura.test.model.MateriaVO;

@Repository
public class TestServiciosDAOImpl extends HelperJdbcDao implements TestServiciosDAO {

    private static Logger logger = LoggerFactory.getLogger(TestServiciosDAOImpl.class);
    
    @SuppressWarnings("unchecked")
    @Override
    public List<Map<String, String>> obtieneSubmenus(String cdmenu, String cdnivelPadre) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("PV_CDMENU_I", cdmenu);
        params.put("PV_CDNIVEL_PADRE_I", cdnivelPadre);
        Map<String, Object> resultado = ejecutaSP(new ObtieneOpcionesSubMenu(getDataSource()), params);
        logger.debug("resultado={}", resultado);
        return (List<Map<String, String>>) resultado.get("pv_registro_o");
    }
    
    protected class ObtieneOpcionesSubMenu extends StoredProcedure {
        
        protected ObtieneOpcionesSubMenu(DataSource dataSource) {
            super(dataSource, "PKG_MENU.OBTIENE_MENU_HIJOS");
            declareParameter(new SqlParameter("PV_CDMENU_I", Types.VARCHAR));
            declareParameter(new SqlParameter("PV_CDNIVEL_PADRE_I", Types.VARCHAR));
            String[] cols = new String[]{"CDNIVEL", "CDNIVEL_PADRE", "DSMENU_EST", "CDTITULO", "DSTITULO"};
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            declareParameter(new SqlOutParameter("pv_text_o", Types.VARCHAR));
            compile();
        }
    }
    
    
    @Override
    public String ejecutaStoredFunction(String paramEntrada) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pv_param1_i", paramEntrada);
        Map<String, Object> resultado = ejecutaSP(new FTest1(getDataSource()), params);
        logger.debug("resultado={}", resultado);
        return (String) resultado.get("v_return");
    }
    
    protected class FTest1 extends StoredProcedure {
        
        protected FTest1(DataSource dataSource) {
            super(dataSource, "F_TEST1");
            /** important that the out parameter is defined before the in parameter. */
            declareParameter(new SqlOutParameter("v_return", Types.VARCHAR));  
            declareParameter(new SqlParameter("pv_param1_i", Types.VARCHAR));
            /** use function instead of stored procedure */
            setFunction(true);
            compile();
        }
    }


    @Override
    public long guardarAlumno(AlumnoVO alumno) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("p_nombre", alumno.getNombre());
        params.put("p_paterno", alumno.getPaterno());
        params.put("p_materno", alumno.getMaterno());
        params.put("p_fecha_nac", alumno.getFechaNac());
        Map<String, Object> resultado = ejecutaSP(new MovAlumnoSP(getDataSource()), params);
        logger.debug("resultado MovAlumnoSP={}", resultado);
        return Long.parseLong((String)resultado.get("l_idusu")); 
    }
    
    protected class MovAlumnoSP extends StoredProcedure {
        
        protected MovAlumnoSP(DataSource dataSource) {
            super(dataSource, "P_MOV_ALUMNO");
            declareParameter(new SqlParameter("p_nombre", Types.VARCHAR));
            declareParameter(new SqlParameter("p_paterno", Types.VARCHAR));
            declareParameter(new SqlParameter("p_materno", Types.VARCHAR));
            declareParameter(new SqlParameter("p_fecha_nac", Types.DATE));
            declareParameter(new SqlOutParameter("l_idusu", Types.VARCHAR));
            declareParameter(new SqlOutParameter("l_error", Types.VARCHAR));
        }
    }
    

    @Override
    public void guardarAlumnoMateria(AlumnoMateriaVO alumnoMateria) throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("p_cdalumno", alumnoMateria.getCdalumno());
        params.put("p_cdmateria", alumnoMateria.getCdmateria());
        params.put("p_fecha_ini", alumnoMateria.getFechaIni());
        Map<String, Object> resultado = ejecutaSP(new MovAlumnoMateriaSP(getDataSource()), params);
        logger.debug("resultado MovAlumnoMateriaSP={}", resultado);
    }
    
    protected class MovAlumnoMateriaSP extends StoredProcedure {
        protected MovAlumnoMateriaSP(DataSource dataSource) {
            super(dataSource, "P_MOV_ALUMNO_MATERIA");
            declareParameter(new SqlParameter("p_cdalumno", Types.VARCHAR));
            declareParameter(new SqlParameter("p_cdmateria", Types.VARCHAR));
            declareParameter(new SqlParameter("p_fecha_ini", Types.DATE));
            declareParameter(new SqlOutParameter("pv_title_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.VARCHAR));
        }
    }
    
    

    @Override
    public long guardarMateria(MateriaVO materia) throws Exception {
        
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("p_dsmateria", materia.getCdmateria());
        Map<String, Object> resultado = ejecutaSP(new MovMateriaSP(getDataSource()), params);
        logger.debug("resultado MovAlumnoMateriaSP={}", resultado);
        return (long)resultado.get("l_idmat");
    }
    
    protected class MovMateriaSP extends StoredProcedure {
        protected MovMateriaSP(DataSource dataSource) {
            super(dataSource, "P_MOV_MATERIA");
            declareParameter(new SqlParameter("p_dsmateria", Types.VARCHAR));
            declareParameter(new SqlOutParameter("l_idmat", Types.VARCHAR));
            declareParameter(new SqlOutParameter("l_error", Types.VARCHAR));
        }
    }
    
}