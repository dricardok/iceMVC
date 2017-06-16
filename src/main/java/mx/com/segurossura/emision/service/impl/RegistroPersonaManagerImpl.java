package mx.com.segurossura.emision.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biosnettcs.core.Utils;

import mx.com.segurossura.emision.dao.RegistoPersonaDAO;
import mx.com.segurossura.emision.service.RegistroPersonaManager;

@Service
public class RegistroPersonaManagerImpl implements RegistroPersonaManager {

	@Autowired
	private RegistoPersonaDAO registroPersonaDao;
	@Override
	public List<Map<String, String>> lovCdpost(String pv_cdcodpos_i, String pv_cdprovin_i, String pv_cdmunici_i, String pv_cdciudad_i)
			throws Exception{
		String paso="";
		List<Map<String, String>> list = null;
		try{
			list=registroPersonaDao.lovCdpost(pv_cdcodpos_i, pv_cdprovin_i, pv_cdmunici_i, pv_cdciudad_i);
			for(Map<String, String> m:list){
				m.put("cdpostal", m.get("cdcodpos"));
				m.put("otpoblac", m.get("dsmunici"));
			}
		}catch(Exception e){
			Utils.generaExcepcion(e, paso);
		}
		return list;
	}
}
