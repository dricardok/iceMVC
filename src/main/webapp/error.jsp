<%@page contentType="text/html" pageEncoding="utf-8"%>
<%@ include file="/taglibs.jsp"%>
<!DOCTYPE HTML>
<html>
    <head>
    </head>
    <body>
        <h3>Ha ocurrido un error en la aplicaci&oacute;n</h3>
        Regresar a la <a href="<c:url value="/"/>">p&aacute;gina inicial</a><br/>
        <% if (exception != null) { %>
            <div>
                <pre><% exception.printStackTrace(new java.io.PrintWriter(out)); %></pre>
            </div>
        <% } else { %>
            Please check your log files for further information.
        <% } %>
    </body>
</html>