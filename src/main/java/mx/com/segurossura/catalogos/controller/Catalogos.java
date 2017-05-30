package mx.com.segurossura.catalogos.controller;

public enum Catalogos {
	
    TATRISIT("");

	private String cdTabla;

	private Catalogos(String cdTabla) {
		this.cdTabla = cdTabla;
	}

	public String getCdTabla() {
		return cdTabla;
	}
}
