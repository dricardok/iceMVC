package com.biosnettcs.portal.model;

public enum RolSistema {
	
    AGENTE("EJECUTIVOCUENTA"),
//	CALLCENTER("CALLCENTER"),
//	COORDINADOR_SINIESTROS("COORDINASINI"),
//	COORDINADOR_MEDICO("COORDINAMED"),
//	COORDINADOR_MEDICO_MULTIREGIONAL("COORDMEDMULTI"),
//	CONSULTA_INFORMACION("CONSULTA"),
//	EJECUTIVO_INTERNO("EJECUTIVOINTERNO"),
//	GERENTE_OPERACION_SINIESTROS("GERENTEOPSINI"),
//	GERENTE_MEDICO_MULTIREGIONAL("GERMEDMULTI"),
//	MEDICO("MEDICO"),
//	MEDICO_AJUSTADOR("MEDAJUSTADOR"),
//	MESA_DE_CONTROL("MESADECONTROL"),
//	MESA_DE_CONTROL_SINIESTROS("MCSINIESTROS"),
//	OPERADOR_SINIESTROS("OPERADORSINI"),
//	PARAMETRIZADOR("PARAMETRIZADOR"),
//	PARAMETRIZADOR_AREA_TECNICA("PARAMETRIZATEC"),
	PARAMETRIZADOR_SISTEMAS("PARAMETRIZASIS")//,
//	PROMOTOR_AUTO("PROMOTORAUTO"),
//	SUPERVISOR ("SUPERVISOR"),
//	SUSCRIPTOR("SUSCRIPTOR"),
//	SUSCRIPTOR_AUTO("SUSCRIAUTO"),
//	SUSCRIPTOR_TECNICO("COTIZADOR"),
//	SUSCRIPTOR_TECNICO_ESPECIALISTA("COTIESPE"),
//	SINIESTRO_INFONAVIT("INPLANTSSI"),
//	TECNICO_SUSCRI_DANIOS("TECNISUSCRI"),
//	JEFE_SUSCRI_DANIOS("JEFESUSCRI"),
//	GERENTE_SUSCRI_DANIOS("GERENSUSCRI"),
//	EMISOR_SUSCRI_DANIOS("EMISUSCRI"),
//	SUBDIRECTOR_SUSCRI_DANIOS("SUBDIRSUSCRI"),
//	SUPERVISOR_TECNICO_SALUD("SUPTECSALUD"),
//	SUPERVISOR_EMISION_SALUD("SUPERVISOR"),
//	SUBDIRECTOR_SALUD("SUBDIRSALUD"),
//	DIRECTOR_SALUD("DIRECSALUD"),
//  GENERENTE_OPERACION_EMISION("GERENTEOPEMI")
	;
    
	private String cdsisrol;

	private RolSistema(String cdsisrol) {
		this.cdsisrol = cdsisrol;
	}

	public String getCdsisrol() {
		return cdsisrol;
	}
	
}