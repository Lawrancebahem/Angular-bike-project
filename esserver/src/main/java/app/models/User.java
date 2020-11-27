package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Random;

@Entity
public class User {

  @Id
  private long id;
  private String name;
  private String email;
  @JsonIgnore
  private String hashedPassword;
  private boolean admin;


  @Transient
  private Random random;

  public User(String name, String email, boolean admin) {
    this.random = new Random();
    this.id = this.random.nextInt(10000);
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.admin = admin;
  }

  public User() {
  }

  public long getId() {
    return id;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
