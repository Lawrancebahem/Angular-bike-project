package app.utilities;


import app.Exception.UnAuthorizedException;
import app.service.ConfigureAbleFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;
import java.util.regex.Pattern;

@Component
@WebFilter
public class JWTRequestFilter extends OncePerRequestFilter {

  private static final Set<String> SECURED_PATHS = Set.of("scooter/currenttrips");

  @Autowired
  private ConfigureAbleFactoryBean api;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

    String servletPath = request.getServletPath();
    //Options requests and non-secured area should pass through without check
    if ((HttpMethod.OPTIONS.matches(request.getMethod()) || SECURED_PATHS.stream().noneMatch(servletPath::equalsIgnoreCase))){
      chain.doFilter(request, response);
      return;
    }

    JWToken jwToken = null;

    //get the encrypted token string from the authorization request header
    String encryptedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

    //block the request if no token was found
    if (encryptedToken != null){
      encryptedToken = encryptedToken.replace("Bearer","");

      //decode the token
      jwToken = JWToken.decode(encryptedToken, this.api.getPassPhrase());

      request.setAttribute(JWToken.getJwtAttributeName(), jwToken);
      chain.doFilter(request, response);
    }

    if (jwToken == null){
      throw new UnAuthorizedException("You need to log in");
    }
  }
}
