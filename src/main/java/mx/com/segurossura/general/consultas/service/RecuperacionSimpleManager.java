package mx.com.segurossura.general.consultas.service;

import java.util.List;
import java.util.Map;

import com.biosnettcs.portal.model.UsuarioVO;

import mx.com.segurossura.general.consultas.model.RecuperacionSimple;

public interface RecuperacionSimpleManager {

    /*public ManagerRespuestaSmapVO recuperacionSimple (RecuperacionSimple procedimiento, Map<String, String> parametros,
            String cdsisrol, String cdusuari) throws Exception;

    public ManagerRespuestaSlist2VO recuperacionSimpleLista (RecuperacionSimple procedimiento,
            Map<String, String> parametros, String cdsisrol, String cdusuari) throws Exception;*/

    public Map<String, String> recuperarMapa (String cdusuari, String cdsisrol, RecuperacionSimple consulta,
            Map<String, String> params, UsuarioVO usuario) throws Exception;

    public List<Map<String, String>> recuperarLista (String cdusuari, String cdsisrol, RecuperacionSimple consulta,
            Map<String, String> params, UsuarioVO usuario) throws Exception;

    /*
    public PagedMapList recuperarListaPaginada(String cdusuari, String cdsisrol, RecuperacionSimple consulta,
            Map<String, String> params, String start, String limit, UserVO usuario) throws Exception;
    */

}
