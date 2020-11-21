package app.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.apache.catalina.mapper.Mapper;

import java.io.IOException;

public class CustomJson {

  public static class Shallow{}

  public static class Summary extends Shallow{}

  public static class ShallowSerializer extends JsonSerializer<Object> {


    @Override
    public void serialize(Object value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
      ObjectMapper mapper = new ObjectMapper().configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
        .setSerializationInclusion(JsonInclude.Include.NON_NULL);

      mapper.registerModule(new JavaTimeModule()).configure(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS, false);

      mapper.setConfig(mapper.getSerializationConfig().withView(CustomJson.Shallow.class));

      gen.setCodec(mapper);
      gen.writeObject(value);
    }
  }
}
