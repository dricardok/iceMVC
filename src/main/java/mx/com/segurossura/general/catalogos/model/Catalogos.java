package mx.com.segurossura.general.catalogos.model;

public enum Catalogos {
    
    SUCURSALES(""),
    TATRIPOL(""),
    TATRISIT(""),
    TATRIGAR(""),
    TIPO_SITUACIONES("");

    
    private String cdtabla;
    
    private Catalogos(String cdtabla) {
        this.cdtabla = cdtabla;
    }

    public String getCdtabla() {
        return cdtabla;
    }

}