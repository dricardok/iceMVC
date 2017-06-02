package mx.com.segurossura.test.model;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = Term.TermSerializer.class)
public class Term {

    // @JsonProperty("field")
    private String field;

    public Term() {

    }

    public Term(String field) {
        this.field = field;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public static class TermSerializer extends JsonSerializer<Term> {
        @Override
        public void serialize(Term value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeStringField("price", value.getField());// dynamic field name
            jsonGenerator.writeEndObject();
        }
    }

    public static void main(String[] args) {
        Term term = new Term("color");
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        //mapper.enable(SerializationFeature.WRAP_ROOT_VALUE);
        String jsonString = null;
        try {
            jsonString = mapper.writeValueAsString(term);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(jsonString);
    }
}
