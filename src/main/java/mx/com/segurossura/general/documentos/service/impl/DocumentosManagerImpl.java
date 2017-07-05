package mx.com.segurossura.general.documentos.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.biosnettcs.core.Utils;
import mx.com.segurossura.general.documentos.service.DocumentosManager;

@Service
public class DocumentosManagerImpl implements DocumentosManager {

    @Override
    public List<Map<String, String>> obtenerDocumentos(String cdunieco, String cdramo, String estado, String nmpoliza, String nmsuplem, 
            String ntramite, String cdsisrol, String dsdocume, long start, long limit) throws Exception {
        String paso = "";
        List<Map<String, String>> lista = new ArrayList<Map<String, String>>();
        try{
            paso = "Obteniendo lista documentos";
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
    }

    @Override
    public void movimientoTdocupol() throws Exception {
        String paso = "";
        try{
            paso = "Movimiento en tdocupol";
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
    }

    @Override
    public Map<String, String> obtenerDocumento() throws Exception {
        String paso = "";
        Map<String, String> lista = new HashMap<String, String>();
        try{
            paso = "Obteniendo lista documentos";
        } catch(Exception ex){
            Utils.generaExcepcion(ex, paso);
        }
        return lista;
    }

}
