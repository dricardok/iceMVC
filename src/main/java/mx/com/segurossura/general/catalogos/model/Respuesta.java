package mx.com.segurossura.general.catalogos.model;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Respuesta<T> {
    
    private static final String MSG_EMPTY = "";
    
    @SuppressWarnings("unused")
    private static final int STATUS_OK = HttpStatus.OK.value();
    
    private static final int STATUS_NOT_FOUND = HttpStatus.NOT_FOUND.value();
    
    private final Date execDt;
    
    private final String message;
    
    private int status;
    
    private List<T> list;
    
    
    /**
     * A Creates a new instance of Response
     *
     * @param code
     * @param message
     * @param execDt
     */
    public Respuesta(final int status, final String message, final Date execDt) {
        this.execDt = execDt == null ? Calendar.getInstance().getTime() : execDt;
        this.message = message == null ? Respuesta.MSG_EMPTY : message;
        this.status = status == 0 ? Respuesta.STATUS_NOT_FOUND : status;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Date getExecDt() {
        return execDt;
    }

    public String getMessage() {
        return message;
    }

}