package app.rest;


import app.Exception.UnAuthorizedException;
import app.models.Scooter;
import app.models.User;
import app.service.ConfigureAbleFactoryBean;
import app.utilities.JWToken;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {


  @Autowired
  ConfigureAbleFactoryBean apiConfig;

  @PostMapping(value = "/login" ,produces = "application/json")
  public ResponseEntity<User> authenticate(@RequestBody ObjectNode signInfo) {
    String email = signInfo.get("email").asText();
    String userName = email.split("@")[0];
    String password = signInfo.get("password").asText();

    if (userName.equalsIgnoreCase(password)) {
      User loggedInUser = new User(userName, email, false);

      JWToken jwToken = new JWToken(loggedInUser.getName(), loggedInUser.getId(), loggedInUser.isAdmin());
      String tokenString = jwToken.encode(this.apiConfig.getIssuer(), this.apiConfig.getPassPhrase(),
        this.apiConfig.getTokenDurationOfValidity());
      return ResponseEntity.accepted().header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).body(loggedInUser);
    } else {
      throw new UnAuthorizedException("Cannot authenticate user by email " + email + " and password #" + password.length());
    }
  }

}
