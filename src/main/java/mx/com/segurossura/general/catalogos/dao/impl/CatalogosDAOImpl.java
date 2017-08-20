package mx.com.segurossura.general.catalogos.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import com.biosnettcs.core.Utils;
import com.biosnettcs.core.dao.HelperJdbcDao;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.dao.mapper.GenericMapper;
import com.biosnettcs.core.model.BaseVO;

import mx.com.segurossura.general.catalogos.dao.CatalogosDAO;

@Repository
public class CatalogosDAOImpl extends HelperJdbcDao implements CatalogosDAO {
    
    private Logger logger = LoggerFactory.getLogger(CatalogosDAOImpl.class);

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerSucursales() throws Exception {
		return (List<Map<String, String>>) ((Map<String, Object>) ejecutaSP(new ObtenerSucursalesSP(getDataSource()),
				new HashMap<String, String>())).get("pv_registro_o");
	}

	protected class ObtenerSucursalesSP extends StoredProcedure {
		protected ObtenerSucursalesSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_SUCURSAL");
			String[] cols = new String[] { "cdunieco", "dsunieco" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerCatalogoTatripol(String cdramo, String cdatribu, String idPadre1,
			String idPadre2, String idPadre3, String idPadre4, String idPadre5) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdramo_i", cdramo);
		params.put("pv_cdatribu_i", cdatribu);
		params.put("pv_clave_i", idPadre1);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTatripolSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCatalogoTatripolSP extends StoredProcedure {
		protected ObtenerCatalogoTatripolSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_GET_CAT_TATRIPOL");
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_clave_i", Types.VARCHAR));
			String[] cols = new String[] { "clave", "descripcion" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerCatalogoTatrisit(String cdtipsit, String cdatribu, String idPadre1,
			String idPadre2, String idPadre3, String idPadre4, String idPadre5) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdtipsit_i", cdtipsit);
		params.put("pv_cdatribu_i", cdatribu);
		params.put("pv_clave_i", idPadre1);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTatrisitSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCatalogoTatrisitSP extends StoredProcedure {
		protected ObtenerCatalogoTatrisitSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_GET_CAT_TATRISIT");
			declareParameter(new SqlParameter("pv_cdtipsit_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_clave_i", Types.VARCHAR));
			String[] cols = new String[] { "clave", "descripcion" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerCatalogoTatrigar(String cdramo, String cdgarant, String cdatribu,
			String idPadre1, String idPadre2, String idPadre3, String idPadre4, String idPadre5) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdramo_i", cdramo);
		params.put("pv_cdgarant_i", cdgarant);
		params.put("pv_cdatribu_i", cdatribu);
		params.put("pv_clave_i", idPadre1);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTatrigarSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCatalogoTatrigarSP extends StoredProcedure {
		protected ObtenerCatalogoTatrigarSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_GET_CAT_TATRIGAR");
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_clave_i", Types.VARCHAR));

			String[] cols = new String[] { "clave", "descripcion" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerCatalogoTatriper(String cdramo, String cdrol, String cdatribu,
			String idPadre1, String idPadre2, String idPadre3, String idPadre4, String idPadre5) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdramo_i", cdramo);
		params.put("pv_cdrol_i", cdrol);
		params.put("pv_cdatribu_i", cdatribu);
		params.put("pv_clave_i", idPadre1);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTatriperSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCatalogoTatriperSP extends StoredProcedure {
		protected ObtenerCatalogoTatriperSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_GET_CAT_TATRIPER");
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdrol_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdatribu_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_clave_i", Types.VARCHAR));

			String[] cols = new String[] { "clave", "descripcion" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerTipoSituaciones(String cdramo) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdramo_i", cdramo);
		Map<String, Object> procRes = ejecutaSP(new ObtenerTipoSituacionesSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerTipoSituacionesSP extends StoredProcedure {
		protected ObtenerTipoSituacionesSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.p_get_cat_tipsit");
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			String[] cols = new String[] { "cdtipsit", "dstipsit" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BaseVO> obtenerCatalogoTablaApoyo(String cdtabla) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdtabla_i", cdtabla);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTablaApoyoSP(getDataSource()), params);
		List<BaseVO> lista = (List<BaseVO>) procRes.get("pv_registro_o");
		logger.debug(Utils.log("\n****** obtenerCatalogoTablaApoyo cdtabla: ", cdtabla, ", lista: ", lista));
		return lista;
	}

	protected class ObtenerCatalogoTablaApoyoSP extends StoredProcedure {
		protected ObtenerCatalogoTablaApoyoSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_GET_CAT_TABLA_APOYO");
			declareParameter(new SqlParameter("pv_cdtabla_i", Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new BaseMapper()));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	protected class BaseMapper implements RowMapper<BaseVO> {
		public BaseVO mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new BaseVO(rs.getString("codigo"), rs.getString("descripl"));
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerRolXRamo(String cdramo, String cdnivel) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdramo_i", cdramo);
		params.put("pv_cdnivel_i", cdnivel);
		Map<String, Object> procRes = ejecutaSP(new ObtenerRolXRamo(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerRolXRamo extends StoredProcedure {
		protected ObtenerRolXRamo(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_ROLXRAMO");
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdnivel_i", Types.VARCHAR));
			String[] cols = new String[] { "cdrol", "descripl" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerPersonas(String cdunieco, String cdramo, String estado, String nmpoliza,
			String nmsituac, String nmsuplem, String cdrol, String cdperson, String cdatribu, String otvalor)
			throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_dsatribu_i", cdatribu);
		params.put("pv_otvalor_i", otvalor);
		Map<String, Object> procRes = ejecutaSP(new ObtenerPersonas(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerPersonas extends StoredProcedure {
		protected ObtenerPersonas(DataSource dataSource) {
			super(dataSource, "PKG_DATA_ALEA.P_GET_PERSONAS_CRITERIO");
			declareParameter(new SqlParameter("pv_dsatribu_i", Types.VARCHAR));
			declareParameter(new SqlParameter("pv_otvalor_i", Types.VARCHAR));
			String[] cols = new String[] { "cdperson", "dsnombre" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerMunicipio(String cdprovin) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdprovin_i", cdprovin);
		Map<String, Object> procRes = ejecutaSP(new ObtenerMunicipioSP(getDataSource()), params);
		return (List<Map<String, String>>) procRes.get("pv_registro_o");

	}

	protected class ObtenerMunicipioSP extends StoredProcedure {
		protected ObtenerMunicipioSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_MUNICI");
			declareParameter(new SqlParameter("pv_cdprovin_i", Types.VARCHAR));
			String[] cols = new String[] { "cdmunici", "dsmunici" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerProvincia() throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();

		Map<String, Object> procRes = ejecutaSP(new ObtenerProvinciaSP(getDataSource()), params);
		return (List<Map<String, String>>) procRes.get("pv_registro_o");
	}

	protected class ObtenerProvinciaSP extends StoredProcedure {
		protected ObtenerProvinciaSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_PROVIN");

			String[] cols = new String[] { "cdprovin", "dsprovin", "sgentfed" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerColonia(String cdcodpos) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();

		params.put("pv_cdcodpos_i", cdcodpos);
		Map<String, Object> procRes = ejecutaSP(new ObtenerColoniaSP(getDataSource()), params);
		return (List<Map<String, String>>) procRes.get("pv_registro_o");
	}

	protected class ObtenerColoniaSP extends StoredProcedure {
		protected ObtenerColoniaSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_COLONIA");

			declareParameter(new SqlParameter("pv_cdcodpos_i", Types.VARCHAR));
			String[] cols = new String[] { "cdcoloni", "dscoloni"

			};
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerCuadrosComision(String cdramo) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdramo_i", cdramo);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCuadrosComisionSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCuadrosComisionSP extends StoredProcedure {
		protected ObtenerCuadrosComisionSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.p_lov_cuadxramo");
			declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
			String[] cols = new String[] { "nmcuadro", "descripl" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> obtenerCatalogoTablaManteni(String cdtabla) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdtabla_i", cdtabla);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTablaManteniSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCatalogoTablaManteniSP extends StoredProcedure {
		protected ObtenerCatalogoTablaManteniSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_GET_CAT_TMANTENI");
			declareParameter(new SqlParameter("pv_cdtabla_i", Types.VARCHAR));
			String[] cols = new String[] { "codigo", "descripl" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@Override
	public List<Map<String, String>> obtenerProductos() throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		Map<String, Object> procRes = ejecutaSP(new ObtenerProductos(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerProductos extends StoredProcedure {
		protected ObtenerProductos(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_PRODUCTOS");
			String[] cols = new String[] { "cdramo", "dsramo" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@Override
	public List<Map<String, String>> obtenerSucuBanc(String cdbanco) throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdbanco_i", cdbanco);
		Map<String, Object> procRes = ejecutaSP(new ObtenerCatalogoTablaMsucursaSP(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}

	protected class ObtenerCatalogoTablaMsucursaSP extends StoredProcedure {
		protected ObtenerCatalogoTablaMsucursaSP(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_SUCBANC");
			declareParameter(new SqlParameter("pv_cdbanco_i", Types.VARCHAR));
			String[] cols = new String[] { "cdsucurs", "dssucurs", "dirsucur", "cdpossuc" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@Override
	public List<Map<String, String>> obtienerGestoresCob() throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		Map<String, Object> procRes = ejecutaSP(new ObtenerGestoresCobranza(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}
	
	protected class ObtenerGestoresCobranza extends StoredProcedure {
		protected ObtenerGestoresCobranza(DataSource dataSource) {
			super(dataSource, "PKG_LOV_ALEA.P_LOV_GESTCOB");
			String[] cols = new String[] { "dsgestor", "cdgestor" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}

	@Override
	public List<Map<String, String>> obtenerEstatusTramite() throws Exception {
		Map<String, String> params = new LinkedHashMap<String, String>();
		params.put("pv_cdestadomc_i", null);
		Map<String, Object> procRes = ejecutaSP(new ObtenerEstatusTramite(getDataSource()), params);
		List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
		if (lista == null) {
			lista = new ArrayList<Map<String, String>>();
		}
		return lista;
	}
	
	protected class ObtenerEstatusTramite extends StoredProcedure {
		protected ObtenerEstatusTramite(DataSource dataSource){
			super(dataSource, "PKG_MESACONTROL.P_GET_TESTADOMC");
			declareParameter(new SqlParameter("pv_cdestadomc_i", Types.VARCHAR));
			String[] cols = new String[] { "cdestadomc", "dsestadomc" };
			declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
			compile();
		}
	}
	
	@Override
    public List<Map<String, String>> obtenerCompañias() throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        Map<String, Object> procRes = ejecutaSP(new ObtenerCompañias(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerCompañias extends StoredProcedure {
        protected ObtenerCompañias(DataSource dataSource){
            super(dataSource, "PKG_LOV_ALEA.P_GET_MCIAS");
            String[] cols = new String[] {
                    "cdcia",
                    "dscia"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerPuntosVentaPorUsuario (String cdusuari) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdusuari_i", cdusuari);
        Map<String, Object> procRes = ejecutaSP(new ObtenerPuntosVentaPorUsuarioSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerPuntosVentaPorUsuarioSP extends StoredProcedure {
        protected ObtenerPuntosVentaPorUsuarioSP(DataSource dataSource){
            super(dataSource, "PKG_DATA_ALEA.P_GET_PUNTO_VENTA");
            declareParameter(new SqlParameter("pv_cdusuari_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdptovta",
                    "dsobserv"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> obtenerGruposPorPuntosventaRamo (String cdptovta, String cdramo) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdptovta_i", cdptovta);
        Map<String, Object> procRes = ejecutaSP(new ObtenerGruposPorPuntosventaRamoSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerGruposPorPuntosventaRamoSP extends StoredProcedure {
        protected ObtenerGruposPorPuntosventaRamoSP(DataSource dataSource){
            super(dataSource, "PKG_DATA_ALEA.P_GET_GRUPOS_PV");
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdptovta_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdgrupo",
                    "dsgrupo"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    public List<Map<String, String>> obtenerSubgruposPorPuntoventaRamo (String cdptovta, String cdgrupo,
            String cdramo) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdptovta_i", cdptovta);
        params.put("pv_cdgrupo_i", cdgrupo);
        Map<String, Object> procRes = ejecutaSP(new ObtenerSubgruposPorPuntoventaRamoSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerSubgruposPorPuntoventaRamoSP extends StoredProcedure {
        protected ObtenerSubgruposPorPuntoventaRamoSP(DataSource dataSource){
            super(dataSource, "PKG_DATA_ALEA.P_GET_SUBGRUPOS_PV");
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdptovta_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdgrupo_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdsubgrp",
                    "dssubgrp"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    public List<Map<String, String>> obtenerPerfilesPorPuntoventaSubgrupoRamo (String cdptovta, String cdsubgpo,
            String cdramo) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdramo_i", cdramo);
        params.put("pv_cdptovta_i", cdptovta);
        params.put("pv_cdsubgpo_i", cdsubgpo);
        Map<String, Object> procRes = ejecutaSP(new ObtenerPerfilesPorPuntoventaSubgrupoRamoSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerPerfilesPorPuntoventaSubgrupoRamoSP extends StoredProcedure {
        protected ObtenerPerfilesPorPuntoventaSubgrupoRamoSP(DataSource dataSource){
            super(dataSource, "PKG_DATA_ALEA.P_GET_PERFILES_PV");
            declareParameter(new SqlParameter("pv_cdramo_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdptovta_i", Types.VARCHAR));
            declareParameter(new SqlParameter("pv_cdsubgpo_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdperfit",
                    "dsperfit"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    public List<Map<String, String>> obtenerSucursalesDePuntoventa (String cdptovta) throws Exception {
        Map<String, String> params = new LinkedHashMap<String, String>();
        params.put("pv_cdptovta_i", cdptovta);
        Map<String, Object> procRes = ejecutaSP(new ObtenerSucursalesDePuntoventaSP(getDataSource()), params);
        List<Map<String, String>> lista = (List<Map<String, String>>) procRes.get("pv_registro_o");
        if (lista == null) {
            lista = new ArrayList<Map<String, String>>();
        }
        return lista;
    }
    
    protected class ObtenerSucursalesDePuntoventaSP extends StoredProcedure {
        protected ObtenerSucursalesDePuntoventaSP(DataSource dataSource){
            super(dataSource, "PKG_DATA_ALEA.P_GET_SUCURSAL_PV");
            declareParameter(new SqlParameter("pv_cdptovta_i", Types.VARCHAR));
            String[] cols = new String[] {
                    "cdunieco",
                    "dsunieco"
            };
            declareParameter(new SqlOutParameter("pv_registro_o", OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o", Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o", Types.VARCHAR));
            compile();
        }
    }
    
    @Override
    public List<Map<String, String>> recuperarMotivosRechazo (String ntramite) throws Exception {
        Map<String, String> params = new LinkedHashMap<String,String>();
        params.put("ntramite", ntramite);
        Map<String,Object> procRes = ejecutaSP(new RecuperarMotivosRechazoSP(getDataSource()),params);
        List<Map<String,String>> lista = (List<Map<String,String>>) procRes.get("pv_registro_o");
        return lista;
    }
    
    protected class RecuperarMotivosRechazoSP extends StoredProcedure{
        protected RecuperarMotivosRechazoSP(DataSource dataSource){
            super(dataSource,"PKG_LOV_ALEA.P_GET_MOTIVOS_RECHAZO_TRA");
            declareParameter(new SqlParameter("ntramite", Types.VARCHAR));
            String[] cols = new String[]{
                    "CDRAZRECHA", 
                    "DSRAZRECHA", 
                    "TEXTORECHA"
            };
            declareParameter(new SqlOutParameter("pv_registro_o" , OracleTypes.CURSOR, new GenericMapper(cols)));
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
        }
    }
}
