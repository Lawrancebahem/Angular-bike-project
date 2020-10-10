package app.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.PRECONDITION_FAILED)
public class PreConditionalFailed extends RuntimeException{
  public PreConditionalFailed(String message) {
    super(message);
  }
}
