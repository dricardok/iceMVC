package mx.com.segurossura.emision.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface RegistoPersonaDAO {

	List<Map<String, String>> lovCdpost(String pv_cdcodpos_i, String pv_cdprovin_i, String pv_cdmunici_i, String pv_cdciudad_i)
			throws Exception;

	List<Map<String, String>> obtieneTvaloper(String cdperson) throws Exception;

	List<Map<String, String>> obtieneMpersona(String cdperson) throws Exception;

	List<Map<String, String>> obtieneMdomicil(String cdperson, String nmorddom) throws Exception;

	void movimientoTvaloper(String cdperson, Map<String, String> otvalores, String accion)
			throws Exception;

	void movimientoMpersona(String cdperson, String cdtipide, String cdideper, String dsnombre,
			String dsnombr1, String dsnombr2, String dsapell1, String dsapell2, String cdtipper, String otfisjur,
			String otsexo, Date fenacimi, String cdprovin, String accion) throws Exception;

	void movimientoMdomicil(String cdperson, String nmorddom, String cdtipdom, String dsdomici,
			String cdsiglas, String cdidioma, String nmtelex, String nmfax, String nmtelefo, String cdpostal,
			String otpoblac, String cdpais, String otpiso, String nmnumero, String cdprovin, String dszona,
			String cdcoloni, String accion) throws Exception;

	List<Map<String, String>> obtieneAttrXRol(String cdramo, String cdrol) throws Exception;

	String generaCdperson() throws Exception;

	String personaDuplicada(String cdperson, String dsnombre, Date fenacimi) throws Exception;

}
