package mx.com.segurossura.catalogos.util;

public enum Bloques {
    
    AGENTES("B2"),
    PERSONAS_SITUACION("B3"),
    ATRIBUTOS_PERSONAS_SITUACION("B3B"),
    DOMICILIOS_PERSONAS_SITUACION("B3C"),
    PERSONAS_POLIZA("B4"),
    ATRIBUTOS_PERSONAS_POLIZA("B4B"),
    DOMICILIOS_PERSONAS_POLIZA("B4C"),
    SITUACIONES("B5"),
    ATRIBUTOS_SITUACIONES("B5B"),
    OBJETOS("B6"),
    ATRIBUTOS_OBJETOS("B6B"),
    RENTAS_PREJUBILACIONES("B7"),
    CONCEPTOS_MANUALES("B8"),
    REVALORIZACIONES("B9"),
    REAPARTO_CONTRATO_CIA_REAS("B11"),
    ATRIBUTOS_FACULTATIVO_CIA("B11B"),
    TARIFICACION_POLIZA_SITUACION("B12"),
    TARIFICACION_POLIZA_SITU("B13"),
    AGRUPADOR_DE_SITUACIONES("B16"),
    CAPITALES("B18"),
    GARANTIAS("B19"),
    ATRIBUTOS_GARANTIAS("B19B"),
    TARIFICACION_RENTAS("B24"),
    DATOS_REVERSIBLIDAD_RENTAS("B25"),
    INTERESES_DE_RENTAS("B26"),
    REVALORIZACION_RENTAS("B27"),
    PAGOS_IRREGULARES_RENTAS("B28"),
    PAGOS_CALCULADOS_RENTAS("B29"),
    APORTACIONES_PRIMA_UNICA("B30"),
    ANTICIPOS("B31"),
    MOVIMIENTOS_ANTICIPOS("B32"),
    PAGOS_PERIODICOS_ADIC("B33"),
    ACCIONES_SOBRE_POLIZAS("B40"),
    DIVIDENDOS("B47"),
    MAESTRO_DE_SINIESTROS("B50"),
    ATRIBUTOS_SINIESTROS("B50B"),
    MAESTRO_VALORACION_SINIESTROS("B51"),
    MAESTRO_OBJETOS_SINIESTROS("B52"),
    RENTAS_SINIESTROS("B53"),
    DATOS_SINIESTROS_RENTAS("B54"),
    PAGOS_RENTAS("B55"),
    MAESTRO_RECIBOS("B60"),
    TRATADO_RIESGO_REASEGURO("B70"),
    BLOQUE_CONTROL_E_ALEA("B0"),
    CANCELACION_A_SOLICITUD("B85"),
    BLOQUE_CONSULTA_ASEGURADOS("B5C"),
    DATOS_GENERALES_PERSONA("B90"),
    ATRIBUTOS_VARIABLES_PERSONA("B90B"),
    DOMICILIO_PERSONA("B90C"),
    CLAUSULAS_GENERALES_POLIZA("B80"),
    DETALLE_CLAUSULAS_GENERALES("B80C"),
    CLAUSULAS_ESPECIALES_POLIZA("B81"),
    DETALLE_CLAUSULAS_ESPECIALES_POLIZA("B81C"),
    CLAUSULAS_GENERALES_SITUACION("B82"),
    DETALLE_CLAUSULAS_GENERALE_SITUACION("B82C"),
    CLAUSULAS_ESPECIALES_SITUACION("B83"),
    DETALLE_CLAUSULAS_ESPECIALES_SITUAC("B83C"),
    SELECCION_CARTERA_WEB("B91"),
    BOQUE_PARA_RESTRICCIONES_RENOVACIONES("B92"),
    CONFIRMACION_POLIZAS_RENOVADAS("B93"),
    BLOQUE_ACTUALIZACION_AGENTES("B100"),
    BLOQUE_LIQUIDACIONES("B101"),
    BLOQUE_LIQUIDACIONES_REMESA("B101C"),
    BLOQUE_CONSULTA_CARTERA("B95"),
    BLOQUE_LIQUIDACIONES_POLIZA("B101B"),
    BLOQUE_AUTORIZACIONES ("B12A"),
    BLOQUE_COTIZADOR("B200"),
    BLOQUE_DATOS_VEHICULO("B102B"),
    BLOQUE_GRAL_SOL_SEGUROS_AUTOS("B102A"),
    BLOQUE_COBERTURAS_AUTOS("B102C"),
    BLOQUE_DEDUCIBLES_AUTOS("B102D"),
    BLOQUE_SUBMARCA("B200B"),
    BLOQUE_DUMMY_B18_B19_B19B("B99");
    
    private String cdbloque;
    
    private Bloques(String cdbloque){
        this.cdbloque = cdbloque;
    }
    
    private String getCdBloque(){
        return cdbloque;
    }
}
