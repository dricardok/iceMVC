package mx.com.segurossura.emision.dao.impl;

import java.sql.Types;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.SqlInOutParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.object.StoredProcedure;

import com.biosnettcs.core.dao.AbstractManagerDAO;
import com.biosnettcs.core.dao.OracleTypes;
import com.biosnettcs.core.exception.ApplicationException;

import mx.com.segurossura.emision.dao.EmisionDAO;

import com.biosnettcs.core.GenericMapper;


public class EmisionDAOImpl extends AbstractManagerDAO implements EmisionDAO {

	@Override
	public void movimientoMpolizasSP(//String Gv_Identificador_Error			,
									 String Gn_Cdunieco 		  			,
									 String Gn_Cdramo    					,
									 String Gv_Estado    					,
									 String Gn_Nmpoliza     				,
									 String Gn_NmsuplemBloque				,
									 String Gn_NmsuplemSesion				,
									 String Gv_Status     					,
									 String Gv_Swestado   					,
									 String Gn_Nmsolici   					,
									 Date   Gd_Feautori   					,
									 String Gn_Cdmotanu   					,
									 Date   Gd_Feanulac   					,
									 String Gv_Swautori   					,
									 String Gv_Cdmoneda   					,
									 Date   Gd_Feinisus 					,
									 Date   Gd_Fefinsus    					,
									 String Gv_Ottempot   					,
									 Date   Gd_Feefecto    					,
									 String Gv_Hhefecto   					,
									 Date   Gd_Feproren   					,
									 Date   Gd_Fevencim  					,
									 String Gn_Nmrenova  					,
									 Date   Gd_Ferecibo  					,
									 Date   Gd_Feultsin  					,
									 String Gn_Nmnumsin  					,
									 String Gv_Cdtipcoa  					,
									 String Gv_Swtarifi  					,
									 String Gv_Swabrido  					,
									 Date   Gd_Feemisio  					,
									 String Gn_Cdperpag  					,
									 String Gn_Nmpoliex  					,
									 String Gv_Nmcuadro  					,
									 String Gn_Porredau  					,
									 String Gv_Swconsol  					,
									 String Gn_Nmpolcoi  					,
									 String Gv_Adparben 					,
									 String Gn_Nmcercoi  					,
									 String Gn_Cdtipren  					,
									// String Gv_Rowid  						,
									 String Gv_Accion						
									) throws Exception{
		
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		 //params.put("Gv_Identificador_Error",   Gv_Identificador_Error);
		 params.put("Gn_Cdunieco",   Gn_Cdunieco);
		 params.put("Gn_Cdramo",   Gn_Cdramo);
		 params.put("Gv_Estado",   Gv_Estado);
		 params.put("Gn_Nmpoliza",   Gn_Nmpoliza);
		 params.put("Gn_NmsuplemBloque",   Gn_NmsuplemBloque);
		 params.put("Gn_NmsuplemSesion",   Gn_NmsuplemSesion);
		 params.put("Gv_Status",   Gv_Status);
		 params.put("Gv_Swestado",   Gv_Swestado);
		 params.put("Gn_Nmsolici",   Gn_Nmsolici);
		 params.put("Gd_Feautori",   Gd_Feautori);
		 params.put("Gn_Cdmotanu",   Gn_Cdmotanu);
		 params.put("Gd_Feanulac",   Gd_Feanulac);
		 params.put("Gv_Swautori",   Gv_Swautori);
		 params.put("Gv_Cdmoneda",   Gv_Cdmoneda);
		 params.put("Gd_Feinisus",   Gd_Feinisus);
		 params.put("Gd_Fefinsus",   Gd_Fefinsus);
		 params.put("Gv_Ottempot",   Gv_Ottempot);
		 params.put("Gd_Feefecto",   Gd_Feefecto);
		 params.put("Gv_Hhefecto",   Gv_Hhefecto);
		 params.put("Gd_Feproren",   Gd_Feproren);
		 params.put("Gd_Fevencim",   Gd_Fevencim);
		 params.put("Gn_Nmrenova",   Gn_Nmrenova);
		 params.put("Gd_Ferecibo",   Gd_Ferecibo);
		 params.put("Gd_Feultsin",   Gd_Feultsin);
		 params.put("Gn_Nmnumsin",   Gn_Nmnumsin);
		 params.put("Gv_Cdtipcoa",   Gv_Cdtipcoa);
		 params.put("Gv_Swtarifi",   Gv_Swtarifi);
		 params.put("Gv_Swabrido",   Gv_Swabrido);
		 params.put("Gd_Feemisio",   Gd_Feemisio);
		 params.put("Gn_Cdperpag",   Gn_Cdperpag);
		 params.put("Gn_Nmpoliex",   Gn_Nmpoliex);
		 params.put("Gv_Nmcuadro",   Gv_Nmcuadro);
		 params.put("Gn_Porredau",   Gn_Porredau);
		 params.put("Gv_Swconsol",   Gv_Swconsol);
		 params.put("Gn_Nmpolcoi",   Gn_Nmpolcoi);
		 params.put("Gv_Adparben",   Gv_Adparben);
		 params.put("Gn_Nmcercoi",   Gn_Nmcercoi);
		 params.put("Gn_Cdtipren",   Gn_Cdtipren);
		// params.put("Gv_Rowid",   Gv_Rowid);
		 params.put("Gv_Accion",   Gv_Accion);	
		 
		 Map<String, Object> resultado = ejecutaSP(new MovimientoMpolizas(getDataSource()), params);
	}
	
	protected class MovimientoMpolizas extends StoredProcedure
	{
    	protected MovimientoMpolizas(DataSource dataSource) {
            super(dataSource,"P_COT_MOV_MPOLIZAS");
            //declareParameter(new SqlInOutParameter("Gv_Identificador_Error",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_NmsuplemBloque",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_NmsuplemSesion",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Status",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Swestado",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmsolici",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feautori",Types.DATE));
            declareParameter(new SqlParameter("Gn_Cdmotanu",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feanulac",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Swautori",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Cdmoneda",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feinisus",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Fefinsus",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Ottempot",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feefecto",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Hhefecto",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feproren",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Fevencim",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmrenova",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Ferecibo",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feultsin",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmnumsin",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Cdtipcoa",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Swtarifi",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Swabrido",Types.VARCHAR));
            declareParameter(new SqlParameter("Gd_Feemisio",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Cdperpag",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmpoliex",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Nmcuadro",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Porredau",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Swconsol",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmpolcoi",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Adparben",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Nmcercoi",Types.VARCHAR));
            declareParameter(new SqlParameter("Gn_Cdtipren",Types.VARCHAR));
           // declareParameter(new SqlInOutParameter("Gv_Rowid",Types.VARCHAR));
            declareParameter(new SqlParameter("Gv_Accion",Types.VARCHAR));
//         
            declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
            declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
            compile();
    	}
	}
	
	
	@Override			//nombre
	public void movimientoTvalopolSP(
			 //parametros
			String  Gn_Cdunieco    		 ,
			String  Gn_Cdramo     		 ,
			String  Gv_Estado     		 ,
			String  Gn_Nmpoliza    		 ,
			String  Gn_Cdatribu            ,
			String  Gn_Nmsuplem            ,
			String  Gv_Otvalor_New         ,
			String  Gv_Otvalor_Old         
			//String  Gv_Status_Registro     
			) throws Exception{

		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("Gn_Cdunieco",		 Gn_Cdunieco);
		params.put("Gn_Cdramo",       Gn_Cdramo);
		params.put("Gv_Estado",       Gv_Estado);
		params.put("Gn_Nmpoliza",       Gn_Nmpoliza);
		params.put("Gn_Cdatribu",     Gn_Cdatribu);
		params.put("Gn_Nmsuplem",     Gn_Nmsuplem);
		params.put("Gv_Otvalor_New",     Gv_Otvalor_New);
		params.put("Gv_Otvalor_Old",     Gv_Otvalor_Old);
		//params.put("Gv_Status_Registro",     Gv_Status_Registro);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new MovimientoTvalopol(getDataSource()), params);
}
					//Clase
	protected class MovimientoTvalopol extends StoredProcedure
	{
		protected MovimientoTvalopol(DataSource dataSource) {
			super(dataSource,"P_COT_MOV_TVALOPOL");// Nombre
			//SqlParameters
			//declareParameter(new SqlInOutParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdatribu",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Otvalor_New",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Otvalor_Old",Types.VARCHAR));
			//declareParameter(new SqlParameter("Gv_Status_Registro",Types.VARCHAR));
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	
	//nombre
	@Override
	public String generaNmpolizaSP(
			String Gn_Nmpoliza			 ,
			String Gn_Cdunieco						  ,
			String Gn_Cdramo							  ,
			String Gv_Estado							  ,
			String Gv_Swcolind						 ,
			String Gn_Nmpolcoi
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
	
		//params.put("Gv_Identificador_Error",null);
		params.put("Gn_Nmpoliza",					Gn_Nmpoliza);
		params.put("Gn_Cdunieco",     Gn_Cdunieco);
		params.put("Gn_Cdramo", Gn_Cdramo);
		params.put("Gv_Estado", Gv_Estado);
		params.put("Gv_Swcolind",      Gv_Swcolind);
		params.put("Gn_Nmpolcoi",           Gn_Nmpolcoi);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new GeneraNmpoliza(getDataSource()), params);
		String datos=(String)resultado.get("Gn_Nmpoliza");
		
		return datos;

	}
				//Clase
	protected class GeneraNmpoliza extends StoredProcedure
	{
		protected GeneraNmpoliza(DataSource dataSource) {
			super(dataSource,"P_GENERA_NMPOLIZA");// Nombre
			//SqlParameters
			
			declareParameter(new SqlInOutParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlInOutParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Swcolind",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpolcoi",Types.VARCHAR));
//			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
//			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoMpolisitSP(
		 //parametros
			String Gn_Cdunieco				,
			String Gn_Cdramo   				,
			String Gv_Estado   				,
			String Gn_Nmpoliza				,
			String Gn_Nmsituac				,
			String Gn_Nmsuplem_Sesion		,
			String Gn_Nmsuplem_Bean			,
			String Gv_Status    			,
			String Gv_Cdtipsit				,
			String Gv_Swreduci				,
			String Gn_Cdagrupa				,
			String Gn_Cdestado				,
			String Gf_Fefecsit				,
			String Gf_Fecharef				,
			String Gv_Indparbe				,
			String Gf_Feinipbs				,
			String Gn_Porparbe				,
			String Gn_Intfinan				,
			String Gn_Cdmotanu				,
			String Gf_Feinisus				,
			String Gf_Fefinsus				,
			String Gv_Accion	  			
			//String Gv_Rowid    				,
			//String Gv_Error    				 

		) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	params.put("Gn_Cdunieco",	 Gn_Cdunieco);
	params.put("Gn_Cdramo",         Gn_Cdramo);
	params.put("Gv_Estado",         Gv_Estado);
	params.put("Gn_Nmpoliza",         Gn_Nmpoliza);
	params.put("Gn_Nmsituac",         Gn_Nmsituac);
	params.put("Gn_Nmsuplem_Sesion",            Gn_Nmsuplem_Sesion);
	params.put("Gn_Nmsuplem_Bean",            Gn_Nmsuplem_Bean);
	params.put("Gv_Status",         Gv_Status);
	params.put("Gv_Cdtipsit",     Gv_Cdtipsit);
	params.put("Gv_Swreduci",     Gv_Swreduci);
	params.put("Gn_Cdagrupa",     Gn_Cdagrupa);
	params.put("Gn_Cdestado",     Gn_Cdestado);
	params.put("Gf_Fefecsit",     Gf_Fefecsit);
	params.put("Gf_Fecharef",     Gf_Fecharef);
	params.put("Gv_Indparbe",     Gv_Indparbe);
	params.put("Gf_Feinipbs",     Gf_Feinipbs);
	params.put("Gn_Porparbe",     Gn_Porparbe);
	params.put("Gn_Intfinan",     Gn_Intfinan);
	params.put("Gn_Cdmotanu",     Gn_Cdmotanu);
	params.put("Gf_Feinisus",     Gf_Feinisus);
	params.put("Gf_Fefinsus",     Gf_Fefinsus);
	params.put("Gv_Accion",            Gv_Accion);
//	params.put("Gv_Rowid",     null);
//	params.put("Gv_Error",            null);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoMpolisit(getDataSource()), params);
	}
				//Clase
	protected class MovimientoMpolisit extends StoredProcedure
	{
		protected MovimientoMpolisit(DataSource dataSource) {
			super(dataSource,"P_COT_Mov_Mpolisit");// Nombre
			//SqlParameters
			
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsituac",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem_Sesion",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem_Bean",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Status",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Cdtipsit",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Swreduci",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdagrupa",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdestado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gf_Fefecsit",Types.VARCHAR));
			declareParameter(new SqlParameter("Gf_Fecharef",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Indparbe",Types.VARCHAR));
			declareParameter(new SqlParameter("Gf_Feinipbs",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Porparbe",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Intfinan",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdmotanu",Types.VARCHAR));
			declareParameter(new SqlParameter("Gf_Feinisus",Types.VARCHAR));
			declareParameter(new SqlParameter("Gf_Fefinsus",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Accion",Types.VARCHAR));
			
 			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoTvalositSP(
		 //parametros
			//String Gv_Identificador_Error	IN OUT	   VARCHAR2,
			String Gn_Cdunieco,	
			String Gn_Cdramo,   
			String Gv_Estado,   
			String Gn_Nmpoliza, 
			String Gn_Nmsituac, 
			String Gv_Cdtipsit, 
			String Gn_Cdatribu, 
			String Gn_Nmsuplem, 
			String Gv_Otvalor,  
			String Gv_Accion 	

		) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Gv_Identificador_Error",Gv_Identificador_Error);
	params.put("Gn_Cdunieco",	  Gn_Cdunieco);
	params.put("Gn_Cdramo",        Gn_Cdramo);
	params.put("Gv_Estado",        Gv_Estado);
	params.put("Gn_Nmpoliza",       Gn_Nmpoliza);
	params.put("Gn_Nmsituac",       Gn_Nmsituac);
	params.put("Gv_Cdtipsit",       Gv_Cdtipsit);
	params.put("Gn_Cdatribu",       Gn_Cdatribu);
	params.put("Gn_Nmsuplem",       Gn_Nmsuplem);
	params.put("Gv_Otvalor",        Gv_Otvalor);
	params.put("Gv_Accion",               Gv_Accion); 
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoTvalosit(getDataSource()), params);
	}
				//Clase
	protected class MovimientoTvalosit extends StoredProcedure
	{
		protected MovimientoTvalosit(DataSource dataSource) {
			super(dataSource,"P_COT_MOV_TVALOSIT");// Nombre
			//SqlParameters
			//declareParameter(new SqlParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsituac",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Cdtipsit",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdatribu",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Otvalor",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Accion",Types.VARCHAR));
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	
	@Override //nombre
	public void movimientoMpoligarSP(
		 //parametros
			//String Gv_Identificador_Error   ,
			String Gn_Cdunieco				,
			String Gn_Cdramo				,
			String Gv_Estado				,
			String Gn_Nmpoliza				,
			String Gn_Nmsituac				,
			String Gn_Nmsuplem_Session				,
			String Gv_Cdgarant				,
			String Gn_Cdcapita				,
			Date   Gd_Fevencim				,
			String Gv_Accion         		 
		) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Gv_Identificador_Error",				Gv_Identificador_Error);
	params.put("Gn_Cdunieco",               Gn_Cdunieco);
	params.put("Gn_Cdramo",               Gn_Cdramo);
	params.put("Gv_Estado",               Gv_Estado);
	params.put("Gn_Nmpoliza",               Gn_Nmpoliza);
	params.put("Gn_Nmsituac",               Gn_Nmsituac);
	params.put("Gn_Nmsuplem_Session",       Gn_Nmsuplem_Session);
	params.put("Gv_Cdgarant",               Gv_Cdgarant);
	params.put("Gn_Cdcapita",               Gn_Cdcapita);
	params.put("Gd_Fevencim",               Gd_Fevencim);
	params.put("Gv_Accion",	            Gv_Accion);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoMpoligar(getDataSource()), params);
	}
				//Clase
	protected class MovimientoMpoligar extends StoredProcedure
	{
		protected MovimientoMpoligar(DataSource dataSource) {
			super(dataSource,"P_COT_MOV_MPOLIGAR");// Nombre
			//SqlParameters
			//declareParameter(new SqlInOutParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsituac",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem_Session",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Cdgarant",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdcapita",Types.VARCHAR));
			declareParameter(new SqlParameter("Gd_Fevencim",Types.DATE));
			declareParameter(new SqlParameter("Gv_Accion",Types.VARCHAR));
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoTvalogarSP(
		 //parametros
			//String Gv_Identificador_Error	,
			String Gn_Cdunieco				,
			String Gn_Cdramo				,
			String Gv_Estado				,
			String Gn_Nmpoliza				,
			String Gn_Cdatribu				,
			String Gn_Nmsuplem				,
			String Gn_Nmsituac				,
			String Gv_Cdgarant				,
			String Gv_Otvalor				,
			String Gv_Accion 				
		) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Gv_Identificador_Error",	   Gv_Identificador_Error);
	params.put("Gn_Cdunieco",      Gn_Cdunieco);
	params.put("Gn_Cdramo",      Gn_Cdramo);
	params.put("Gv_Estado",      Gv_Estado);
	params.put("Gn_Nmpoliza",      Gn_Nmpoliza);
	params.put("Gn_Cdatribu",      Gn_Cdatribu);
	params.put("Gn_Nmsuplem",      Gn_Nmsuplem);
	params.put("Gn_Nmsituac",      Gn_Nmsituac);
	params.put("Gv_Cdgarant",      Gv_Cdgarant);
	params.put("Gv_Otvalor",      Gv_Otvalor);
	params.put("Gv_Accion",      Gv_Accion);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoTvalogar(getDataSource()), params);
	}
				//Clase
	protected class MovimientoTvalogar extends StoredProcedure
	{
		protected MovimientoTvalogar(DataSource dataSource) {
			super(dataSource,"P_COT_MOV_TVALOGAR");// Nombre
			//SqlParameters
			//declareParameter(new SqlParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdatribu",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsituac",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Cdgarant",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Otvalor",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Accion",Types.VARCHAR));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public void movimientoMpolicapSP(
		 //parametros
			//String Gv_Identificador_Error,
			String Gn_Cdunieco,      		
			String Gn_Cdramo,       		
			String Gv_Estado,    			
			String Gn_Nmpoliza,        		
			String Gn_Nmsituac,        		
			String Gn_Nmsuplem_Sesion,    
			String Gv_Swrevalo,        		
			String Gv_Cdcapita,        		
			String Gn_Ptcapita,        		
			String Gn_Nmsuplem_Bloque,    
			//String Gv_Rowid,              
			String Gv_ModoAcceso          

		) throws Exception{
	
	Map<String, Object> params = new LinkedHashMap<String, Object>();
	
	// params.put
	//params.put("Gv_Identificador_Error",Gv_Identificador_Error);
	params.put("Gn_Cdunieco",Gn_Cdunieco);
	params.put("Gn_Cdramo",Gn_Cdramo);
	params.put("Gv_Estado",Gv_Estado);
	params.put("Gn_Nmpoliza",Gn_Nmpoliza);
	params.put("Gn_Nmsituac",Gn_Nmsituac);
	params.put("Gn_Nmsuplem_Sesion",Gn_Nmsuplem_Sesion);
	params.put("Gv_Swrevalo",Gv_Swrevalo);
	params.put("Gv_Cdcapita",Gv_Cdcapita);
	params.put("Gn_Ptcapita",Gn_Ptcapita);
	params.put("Gn_Nmsuplem_Bloque",Gn_Nmsuplem_Bloque);
	//params.put("Gv_Rowid",Gv_Rowid);
	params.put("Gv_ModoAcceso",Gv_ModoAcceso);
	
												//Clase
	Map<String, Object> resultado = ejecutaSP(new MovimientoMpolicap(getDataSource()), params);
	}
				//Clase
	protected class MovimientoMpolicap extends StoredProcedure
	{
		protected MovimientoMpolicap(DataSource dataSource) {
			super(dataSource,"P_COT_MOV_MPOLICAP");// Nombre
			//SqlParameters
			//declareParameter(new SqlParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlInOutParameter("Gv_Identificador_Error",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdunieco",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Cdramo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Estado",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmpoliza",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsituac",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem_Sesion",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Swrevalo",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_Cdcapita",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Ptcapita",Types.VARCHAR));
			declareParameter(new SqlParameter("Gn_Nmsuplem_Bloque",Types.VARCHAR));
			//declareParameter(new SqlInOutParameter("Gv_Rowid",Types.VARCHAR));
			declareParameter(new SqlParameter("Gv_ModoAcceso",Types.VARCHAR));			
			
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpoligarSP(
		 //parametros
			String pv_cdunieco_i ,
			String pv_cdramo_i   ,
			String pv_estado_i   ,
			String pv_nmpoliza_i ,
			String pv_nmsituac_i ,
			String pv_cdgarant_i ,
			String pv_nmsuplem_i 
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		
		params.put("pv_cdunieco_i",	    pv_cdunieco_i);
		params.put("pv_cdramo_i",      pv_cdramo_i  );
		params.put("pv_estado_i",      pv_estado_i  );
		params.put("pv_nmpoliza_i",      pv_nmpoliza_i);
		params.put("pv_nmsituac_i",      pv_nmsituac_i);
		params.put("pv_cdgarant_i",      pv_cdgarant_i);
		params.put("pv_nmsuplem_i",      pv_nmsuplem_i);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpoligar(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpoligar extends StoredProcedure
	{
		protected ObtieneMpoligar(DataSource dataSource) {
			super(dataSource,"P_COT_GET_MPOLIGAR");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			      
			String[] cols=new String[]{
					"cdunieco",
					 "cdramo",
					   "estado",
					   "nmpoliza",
					 "nmsituac",
					 
					           "cdgarant",
					 "nmsuplem",
					 "cdcapita",
					 "status",
					   "swmanual",
					 
					           "fevencim"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpolicapSP(
		 //parametros
			String pv_cdunieco_i ,
			String pv_cdramo_i   ,
			String pv_estado_i   ,
			String pv_nmpoliza_i ,
			String pv_nmsituac_i ,
			String pv_cdcapita_i ,
			String pv_nmsuplem_i 

		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	pv_cdunieco_i);
		params.put("pv_cdramo_i",      pv_cdramo_i  );
		params.put("pv_estado_i",      pv_estado_i  );
		params.put("pv_nmpoliza_i",    pv_nmpoliza_i);
		params.put("pv_nmsituac_i",    pv_nmsituac_i);
		params.put("pv_cdcapita_i",    pv_cdcapita_i);
		params.put("pv_nmsuplem_i",    pv_nmsuplem_i);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolicap(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpolicap extends StoredProcedure
	{
		protected ObtieneMpolicap(DataSource dataSource) {
			super(dataSource,"P_COT_GET_MPOLICAP");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco",
					 "cdramo",
					   "estado",
					 "nmpoliza",
					 "nmsituac",
					 
					           "cdcapita",
					 "nmsuplem",
					 "status",
					 "ptcapita",
					 "ptreduci",
					 
					           "fereduci",
					 "swrevalo"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTvalogarSP(
		 //parametros
			String pv_cdunieco_i ,
			String pv_cdramo_i   ,
			String pv_estado_i   ,
			String pv_nmpoliza_i ,
			String pv_nmsituac_i ,
			String pv_cdgarant_i ,
			String pv_nmsuplem_i 

		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	pv_cdunieco_i);
		params.put("pv_cdramo_i",      pv_cdramo_i  );
		params.put("pv_estado_i",      pv_estado_i  );
		params.put("pv_nmpoliza_i",    pv_nmpoliza_i);
		params.put("pv_nmsituac_i",    pv_nmsituac_i);
		params.put("pv_cdgarant_i",    pv_cdgarant_i);
		params.put("pv_nmsuplem_i",    pv_nmsuplem_i);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalogar(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTvalogar extends StoredProcedure
	{
		protected ObtieneTvalogar(DataSource dataSource) {
			super(dataSource,"P_COT_GET_TVALOGAR");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco",   "cdramo",     "estado",     "nmpoliza",   "nmsituac", 
			           "cdgarant",   "nmsuplem",   "status",
			           "otvalor01",  "otvalor02",  "otvalor03",  "otvalor04",  "otvalor05", 
			           "otvalor06",  "otvalor07",  "otvalor08",  "otvalor09",  "otvalor10", 
			           "otvalor11",  "otvalor12",  "otvalor13",  "otvalor14",  "otvalor15", 
			           "otvalor16",  "otvalor17",  "otvalor18",  "otvalor19",  "otvalor20", 
			           "otvalor21",  "otvalor22",  "otvalor23",  "otvalor24",  "otvalor25", 
			           "otvalor26",  "otvalor27",  "otvalor28",  "otvalor29",  "otvalor30", 
			           "otvalor31",  "otvalor32",  "otvalor33",  "otvalor34",  "otvalor35", 
			           "otvalor36",  "otvalor37",  "otvalor38",  "otvalor39",  "otvalor40", 
			           "otvalor41",  "otvalor42",  "otvalor43",  "otvalor44",  "otvalor45", 
			           "otvalor46",  "otvalor47",  "otvalor48",  "otvalor49",  "otvalor50", 
			           "otvalor51",  "otvalor52",  "otvalor53",  "otvalor54",  "otvalor55", 
			           "otvalor56",  "otvalor57",  "otvalor58",  "otvalor59",  "otvalor60", 
			           "otvalor61",  "otvalor62",  "otvalor63",  "otvalor64",  "otvalor65", 
			           "otvalor66",  "otvalor67",  "otvalor68",  "otvalor69",  "otvalor70", 
			           "otvalor71",  "otvalor72",  "otvalor73",  "otvalor74",  "otvalor75", 
			           "otvalor76",  "otvalor77",  "otvalor78",  "otvalor79",  "otvalor80", 
			           "otvalor81",  "otvalor82",  "otvalor83",  "otvalor84",  "otvalor85", 
			           "otvalor86",  "otvalor87",  "otvalor88",  "otvalor89",  "otvalor90", 
			           "otvalor91",  "otvalor92",  "otvalor93",  "otvalor94",  "otvalor95", 
			           "otvalor96",  "otvalor97",  "otvalor98",  "otvalor99",  "otvalor100", 
			           "otvalor101", "otvalor102", "otvalor103", "otvalor104", "otvalor105", 
			           "otvalor106", "otvalor107", "otvalor108", "otvalor109", "otvalor110", 
			           "otvalor111", "otvalor112", "otvalor113", "otvalor114", "otvalor115", 
			           "otvalor116", "otvalor117", "otvalor118", "otvalor119", "otvalor120",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneMcapitalSP(
		 //parametros
			String pv_cdramo_i,
			String pv_cdcapita_i
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdramo_i",    pv_cdramo_i);
		params.put("pv_cdcapita_i",    pv_cdcapita_i);
		
		
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMcapita(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMcapita extends StoredProcedure
	{
		protected ObtieneMcapita(DataSource dataSource) {
			super(dataSource,"P_COT_GET_MCAPITAL");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdcapita_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
					"cdramo",
					"cdcapita",
					"cdtipcap",
					"dscapita"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTgarantiSP(
		 //parametros
			String pv_cdgarant_i
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdgarant_i", pv_cdgarant_i);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTgaranti(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTgaranti extends StoredProcedure
	{
		protected ObtieneTgaranti(DataSource dataSource) {
			super(dataSource,"P_COT_GET_TGARANTI");// Nombre
			
			//SqlParameters

			declareParameter(new SqlParameter("pv_cdgarant_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
					"cdgarant",
					"dsgarant",
					"cdtipoga",
					"cdtipgar",
					"cdtipora",
					"swbonos",
					"cdramo",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpolisitSP(
		 //parametros
			String pv_cdunieco_i 				,
			String pv_cdramo_i   				,
			String pv_estado_i   				,
			String pv_nmpoliza_i 				,
			String pv_nmsituac_i 				,
			String pv_nmsuplem_i 				
							
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	   pv_cdunieco_i);
		params.put("pv_cdramo_i",      pv_cdramo_i  );
		params.put("pv_estado_i",      pv_estado_i  );
		params.put("pv_nmpoliza_i",      pv_nmpoliza_i);
		params.put("pv_nmsituac_i",      pv_nmsituac_i);
		params.put("pv_nmsuplem_i",      pv_nmsuplem_i);
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolisit(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpolisit extends StoredProcedure
	{
		protected ObtieneMpolisit(DataSource dataSource) {
			super(dataSource,"P_COT_GET_MPOLISIT");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco", "cdramo",   "estado",   "nmpoliza", "nmsituac", 
			           "nmsuplem", "status",   "cdtipsit", "swreduci", "cdagrupa", 
			           "cdestado", "fefecsit", "fecharef", "indparbe", "feinipbs", 
			           "porparbe", "intfinan", "cdmotanu", "feinisus", "fefinsus",
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTvalositSP(
		 //parametros
			
			String pv_cdunieco_i ,
			String pv_cdramo_i   ,
			String pv_estado_i   ,
			String pv_nmpoliza_i ,
			String pv_nmsituac_i ,
			String pv_cdtipsit_i ,
			String pv_nmsuplem_i 
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	 pv_cdunieco_i );
		params.put("pv_cdramo_i",   pv_cdramo_i   );
		params.put("pv_estado_i",   pv_estado_i   );
		params.put("pv_nmpoliza_i",   pv_nmpoliza_i );
		params.put("pv_nmsituac_i",   pv_nmsituac_i );
		params.put("pv_cdtipsit_i",   pv_cdtipsit_i );
		params.put("pv_nmsuplem_i",   pv_nmsuplem_i );
		
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalosit(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTvalosit extends StoredProcedure
	{
		protected ObtieneTvalosit(DataSource dataSource) {
			super(dataSource,"P_COT_GET_TVALOSIT");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsituac_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdtipsit_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			
			String[] cols=new String[]{
				//cursor
					"cdunieco",   "cdramo",     "estado",     "nmpoliza",   "nmsituac", 
			           "nmsuplem",   "status",     "cdtipsit", 
			           "otvalor01",  "otvalor02",  "otvalor03",  "otvalor04",  "otvalor05", 
			           "otvalor06",  "otvalor07",  "otvalor08",  "otvalor09",  "otvalor10", 
			           "otvalor11",  "otvalor12",  "otvalor13",  "otvalor14",  "otvalor15", 
			           "otvalor16",  "otvalor17",  "otvalor18",  "otvalor19",  "otvalor20", 
			           "otvalor21",  "otvalor22",  "otvalor23",  "otvalor24",  "otvalor25", 
			           "otvalor26",  "otvalor27",  "otvalor28",  "otvalor29",  "otvalor30", 
			           "otvalor31",  "otvalor32",  "otvalor33",  "otvalor34",  "otvalor35", 
			           "otvalor36",  "otvalor37",  "otvalor38",  "otvalor39",  "otvalor40", 
			           "otvalor41",  "otvalor42",  "otvalor43",  "otvalor44",  "otvalor45", 
			           "otvalor46",  "otvalor47",  "otvalor48",  "otvalor49",  "otvalor50", 
			           "otvalor51",  "otvalor52",  "otvalor53",  "otvalor54",  "otvalor55", 
			           "otvalor56",  "otvalor57",  "otvalor58",  "otvalor59",  "otvalor60", 
			           "otvalor61",  "otvalor62",  "otvalor63",  "otvalor64",  "otvalor65", 
			           "otvalor66",  "otvalor67",  "otvalor68",  "otvalor69",  "otvalor70", 
			           "otvalor71",  "otvalor72",  "otvalor73",  "otvalor74",  "otvalor75", 
			           "otvalor76",  "otvalor77",  "otvalor78",  "otvalor79",  "otvalor80", 
			           "otvalor81",  "otvalor82",  "otvalor83",  "otvalor84",  "otvalor85", 
			           "otvalor86",  "otvalor87",  "otvalor88",  "otvalor89",  "otvalor90", 
			           "otvalor91",  "otvalor92",  "otvalor93",  "otvalor94",  "otvalor95", 
			           "otvalor96",  "otvalor97",  "otvalor98",  "otvalor99",  "otvalor100", 
			           "otvalor101", "otvalor102", "otvalor103", "otvalor104", "otvalor105", 
			           "otvalor106", "otvalor107", "otvalor108", "otvalor109", "otvalor110", 
			           "otvalor111", "otvalor112", "otvalor113", "otvalor114", "otvalor115", 
			           "otvalor116", "otvalor117", "otvalor118", "otvalor119", "otvalor120"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneMpolizasSP(
		 //parametros
			String pv_cdunieco_i ,
			String pv_cdramo_i   ,
			String pv_estado_i   ,
			String pv_nmpoliza_i ,
			String pv_nmsuplem_i 
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	    pv_cdunieco_i );
		params.put("pv_cdramo_i",      pv_cdramo_i   );
		params.put("pv_estado_i",      pv_estado_i   );
		params.put("pv_nmpoliza_i",      pv_nmpoliza_i );
		params.put("pv_nmsuplem_i",      pv_nmsuplem_i );
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneMpolizas(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneMpolizas extends StoredProcedure
	{
		protected ObtieneMpolizas(DataSource dataSource) {
			super(dataSource,"P_COT_GET_MPOLIZAS");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
					"cdunieco", "cdramo",   "estado",   "nmpoliza", "nmsuplem", 
			           "status",   "swestado", "nmsolici", "feautori", "cdmotanu", 
			           "feanulac", "swautori", "cdmoneda", "feinisus", "fefinsus", 
			           "ottempot", "feefecto", "hhefecto", "feproren", "fevencim", 
			           "nmrenova", "ferecibo", "feultsin", "nmnumsin", "cdtipcoa", 
			           "swtarifi", "swabrido", "feemisio", "cdperpag", "nmpoliex", 
			           "nmcuadro", "porredau", "swconsol", "nmpolcoi", "adparben", 
			           "nmcercoi", "cdtipren"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
	
	@Override //nombre
	public List<Map<String,String>> obtieneTvalopolSP(
		 //parametros
			String pv_cdunieco_i ,
			String pv_cdramo_i   ,
			String pv_estado_i   ,
			String pv_nmpoliza_i ,
			String pv_nmsuplem_i 
		) throws Exception{
	
		Map<String, Object> params = new LinkedHashMap<String, Object>();
		
		// params.put
		params.put("pv_cdunieco_i",	    pv_cdunieco_i );
		params.put("pv_cdramo_i",      pv_cdramo_i   );
		params.put("pv_estado_i",      pv_estado_i   );
		params.put("pv_nmpoliza_i",      pv_nmpoliza_i );
		params.put("pv_nmsuplem_i",      pv_nmsuplem_i );
													//Clase
		Map<String, Object> resultado = ejecutaSP(new ObtieneTvalopol(getDataSource()), params);
		List<Map<String,String>>listaDatos=(List<Map<String,String>>)resultado.get("pv_registro_o");
		if(listaDatos==null||listaDatos.size()==0)
		{
			throw new ApplicationException("Sin resultados");
		}
		return listaDatos;
	}
				//Clase
	protected class ObtieneTvalopol extends StoredProcedure
	{
		protected ObtieneTvalopol(DataSource dataSource) {
			super(dataSource,"P_COT_GET_TVALOPOL");// Nombre
			//SqlParameters
			declareParameter(new SqlParameter("pv_cdunieco_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_cdramo_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_estado_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmpoliza_i",Types.VARCHAR));
			declareParameter(new SqlParameter("pv_nmsuplem_i",Types.VARCHAR));
			String[] cols=new String[]{
				//cursor
					"cdunieco",   "cdramo",     "estado",     "nmpoliza",   "nmsuplem",  "status", 
			           "otvalor01",  "otvalor02",  "otvalor03",  "otvalor04",  "otvalor05", 
			           "otvalor06",  "otvalor07",  "otvalor08",  "otvalor09",  "otvalor10", 
			           "otvalor11",  "otvalor12",  "otvalor13",  "otvalor14",  "otvalor15", 
			           "otvalor16",  "otvalor17",  "otvalor18",  "otvalor19",  "otvalor20", 
			           "otvalor21",  "otvalor22",  "otvalor23",  "otvalor24",  "otvalor25", 
			           "otvalor26",  "otvalor27",  "otvalor28",  "otvalor29",  "otvalor30", 
			           "otvalor31",  "otvalor32",  "otvalor33",  "otvalor34",  "otvalor35", 
			           "otvalor36",  "otvalor37",  "otvalor38",  "otvalor39",  "otvalor40", 
			           "otvalor41",  "otvalor42",  "otvalor43",  "otvalor44",  "otvalor45", 
			           "otvalor46",  "otvalor47",  "otvalor48",  "otvalor49",  "otvalor50", 
			           "otvalor51",  "otvalor52",  "otvalor53",  "otvalor54",  "otvalor55", 
			           "otvalor56",  "otvalor57",  "otvalor58",  "otvalor59",  "otvalor60", 
			           "otvalor61",  "otvalor62",  "otvalor63",  "otvalor64",  "otvalor65", 
			           "otvalor66",  "otvalor67",  "otvalor68",  "otvalor69",  "otvalor70", 
			           "otvalor71",  "otvalor72",  "otvalor73",  "otvalor74",  "otvalor75", 
			           "otvalor76",  "otvalor77",  "otvalor78",  "otvalor79",  "otvalor80", 
			           "otvalor81",  "otvalor82",  "otvalor83",  "otvalor84",  "otvalor85", 
			           "otvalor86",  "otvalor87",  "otvalor88",  "otvalor89",  "otvalor90", 
			           "otvalor91",  "otvalor92",  "otvalor93",  "otvalor94",  "otvalor95", 
			           "otvalor96",  "otvalor97",  "otvalor98",  "otvalor99",  "otvalor100", 
			           "otvalor101", "otvalor102", "otvalor103", "otvalor104", "otvalor105", 
			           "otvalor106", "otvalor107", "otvalor108", "otvalor109", "otvalor110", 
			           "otvalor111", "otvalor112", "otvalor113", "otvalor114", "otvalor115", 
			           "otvalor116", "otvalor117", "otvalor118", "otvalor119", "otvalor120"
			};
			declareParameter(new SqlOutParameter("pv_registro_o",OracleTypes.CURSOR, new GenericMapper(cols)));
			declareParameter(new SqlOutParameter("pv_msg_id_o"   , Types.NUMERIC));
			declareParameter(new SqlOutParameter("pv_title_o"    , Types.VARCHAR));
			compile();
		}
	}
}
