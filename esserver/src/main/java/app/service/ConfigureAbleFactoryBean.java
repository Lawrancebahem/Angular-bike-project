package app.service;

import app.models.Scooter;
import app.repositories.EntityRepository;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class ConfigureAbleFactoryBean implements WebMvcConfigurer{

  @Autowired
  BeanFactory beanFactory;

  @Value("${scooterRepositoryName}")
  private String scooterRepository;

  @Bean("scooterRepository")
  public EntityRepository<Scooter> getScooterRepository(){
    return (EntityRepository<Scooter>) beanFactory.getBean(scooterRepository);
  }

  @Value("${jwt.issuer}")
  private String issuer;

  @Value("${jwt.pass-phrase:this is very very secret}")
  private String passPhrase;

  @Value("${jwt.duration-of-validity}")
  public int tokenDurationOfValidity;


  public BeanFactory getBeanFactory() {
    return beanFactory;
  }

  public String getIssuer() {
    return issuer;
  }

  public String getPassPhrase() {
    return passPhrase;
  }

  public int getTokenDurationOfValidity() {
    return tokenDurationOfValidity;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowCredentials(true)
      .allowedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
      .exposedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4200");
  }
}
