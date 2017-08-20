package mx.com.segurossura.general.catalogos.model;

public enum Catalogos {
    
    SUCURSALES(""),
    PRODUCTOS(""),
    TATRIPOL(""),
    TATRISIT(""),
    TATRIGAR(""),
    TIPO_SITUACIONES(""),
    ROLES_X_RAMO(""),
    PERSONAS(""),
    MUNICIPIO(""),
    PROVINCIA(""),
    TATRIPER(""),
    COLONIA(""),
    CUACOM_RAMO(""),
    TMANTENI(""),
    AGRUPADORES_POLIZA(""),
    SUCURSALES_BANCARIAS(""),
    GESTORES_COBRANZA(""),
    ESTATUS_TRAMITE(""),
    COMPANIAS(""),
    TTIPTRAMC(""),
    TTIPSUPL(""),
    TIPOS_RAMO(""),
    
    // perfilamiento
    PUNTOS_VENTA_X_USUARIO(""),
    GRUPOS_X_PUNTOVENTA_RAMO(""),
    SUBGRUPOS_X_PUNTOVENTA_RAMO(""),
    PERFILESTARIFA_X_PUNTOVENTA_SUBGRUPO_RAMO(""),
    SUCURSAL_DE_PUNTO_VENTA(""),
    MOTIVOS_RECHAZO_TRAMITE("");
    
    private String cdtabla;
    
    private Catalogos(String cdtabla) {
        this.cdtabla = cdtabla;
    }

    public String getCdtabla() {
        return cdtabla;
    }

}