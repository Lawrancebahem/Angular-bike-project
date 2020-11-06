package app.service;

import app.repositories.ScooterRepository;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
  public ScooterRepository getScooterRepository(){
    return (ScooterRepository) beanFactory.getBean(scooterRepository);

  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("http://localhost:4200");
  }
}
