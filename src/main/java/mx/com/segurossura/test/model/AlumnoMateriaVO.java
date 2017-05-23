package mx.com.segurossura.test.model;

import java.util.Date;

public class AlumnoMateriaVO {

    private long cdalumno;
    
    private long cdmateria;
    
    private Date fechaIni;

    public long getCdalumno() {
        return cdalumno;
    }

    public void setCdalumno(long cdalumno) {
        this.cdalumno = cdalumno;
    }

    public long getCdmateria() {
        return cdmateria;
    }

    public void setCdmateria(long cdmateria) {
        this.cdmateria = cdmateria;
    }

    public Date getFechaIni() {
        return fechaIni;
    }

    public void setFechaIni(Date fechaIni) {
        this.fechaIni = fechaIni;
    }

}