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
    COMPANIAS("");

    
    private String cdtabla;
    
    private Catalogos(String cdtabla) {
        this.cdtabla = cdtabla;
    }

    public String getCdtabla() {
        return cdtabla;
    }

}