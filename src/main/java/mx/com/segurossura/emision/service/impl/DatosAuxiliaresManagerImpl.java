package mx.com.segurossura.emision.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.EmisionDAO;
import mx.com.segurossura.emision.service.DatosAuxiliaresManager;

@Service
public class DatosAuxiliaresManagerImpl implements DatosAuxiliaresManager {
    
    private final static Logger logger = LoggerFactory.getLogger(DatosAuxiliaresManagerImpl.class);
    
    @Autowired
    private EmisionDAO emisionDAO;
    
    @Override
    public void guardarDatosAuxiliares(String cdunieco, String cdramo, String estado, String nmpoliza, String cdbloque,
            String nmsituac, String cdgarant, String nmsuplem, String status, Map<String, String> params) throws Exception {
        String paso = "Recuperando datos auxiliares";
        try {
            List<Map<String, String>> auxActuales = emisionDAO.obtenerTvaloaux(cdunieco, cdramo, estado, nmpoliza, cdbloque,
                    nmsituac, cdgarant, nmsuplem, status);
            
            String accion = "I";
            Map<String, String> tvaloaux = new LinkedHashMap<String, String>();
            
            if (auxActuales.size() > 0) {
                accion = "U";
                tvaloaux = auxActuales.get(0);
            }
            
            tvaloaux.putAll(params); // se agregan los de pantalla
            
            emisionDAO.ejecutarMovimientoTvaloaux(
                    cdunieco,
                    cdramo,
                    estado,
                    nmpoliza,
                    cdbloque,
                    nmsituac,
                    cdgarant,
                    nmsuplem,
                    status,
                    tvaloaux.get("otvalor01"),
                    tvaloaux.get("otvalor02"),
                    tvaloaux.get("otvalor03"),
                    tvaloaux.get("otvalor04"),
                    tvaloaux.get("otvalor05"),
                    tvaloaux.get("otvalor06"),
                    tvaloaux.get("otvalor07"),
                    tvaloaux.get("otvalor08"),
                    tvaloaux.get("otvalor09"),
                    tvaloaux.get("otvalor10"),
                    tvaloaux.get("otvalor11"),
                    tvaloaux.get("otvalor12"),
                    tvaloaux.get("otvalor13"),
                    tvaloaux.get("otvalor14"),
                    tvaloaux.get("otvalor15"),
                    accion
                    );
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
    }
    
    @Override
    public Map<String, String> cargarDatosAuxiliares (String cdunieco, String cdramo, String estado, String nmpoliza, String cdbloque,
            String nmsituac, String cdgarant, String nmsuplem, String status) throws Exception {
        Map<String, String> tvaloaux = null;
        String paso = "Recuperando valores auxiliares";
        try {
            List<Map<String, String>> auxActuales = emisionDAO.obtenerTvaloaux(cdunieco, cdramo, estado, nmpoliza, cdbloque,
                nmsituac, cdgarant, nmsuplem, status);
            if (auxActuales != null && auxActuales.size() > 0) {
                tvaloaux = auxActuales.get(0);
            }
        } catch (Exception ex) {
            Utils.generaExcepcion(ex, paso);
        }
        return tvaloaux;
    }
}