package mx.com.segurossura.test.model;

import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(Include.NON_NULL)
public class ResponseList<T> {

    private static final String R_MSG_EMPTY = "";
    private static final String R_CODE_OK = "OK";

    private final String responseCode;
    private final Date execDt;
    private final String message;

    private T response;

    /**
     * A Creates a new instance of Response
     *
     * @param code
     * @param message
     * @param execDt
     */
    public ResponseList(final String code, final String message, final Date execDt) {
        super();
        this.execDt = execDt == null ? Calendar.getInstance().getTime() : execDt;
        this.message = message == null ? ResponseList.R_MSG_EMPTY : message;
        this.responseCode = code == null ? ResponseList.R_CODE_OK : code;
        this.response = null;
    }

    /**
     * @return the execDt
     */
    public Date getExecDt() {

        return this.execDt;
    }

    /**
     * @return the message
     */
    public String getMessage() {

        return this.message;
    }

    /**
     * @return the response
     */
    @JsonProperty(value="list")
    public T getResponse() {

        return this.response;
    }

    /**
     * @return the responseCode
     */
    public String getResponseCode() {

        return this.responseCode;
    }

    /**
     * sets the response object
     *
     * @param obj
     * @return
     */
    public ResponseList<T> setResponse(final T obj) {

        this.response = obj;
        return this;
    }

}