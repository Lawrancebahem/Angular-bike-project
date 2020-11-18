package app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Random;

@Entity
public class Trip {

  @Id
  @GeneratedValue
  private int id;
  private LocalDateTime start;
  private LocalDateTime end;
  private LocalDateTime time;
  private String startPosition;
  private String endPosition;
  private double mileage;
  private double cost;
  @JsonBackReference
  @ManyToOne
  private Scooter scooter;

  @Transient
  private static Random random = new Random();
//
//  @Transient
//  private String[] arrayPosition = new String[]{"Amsterdam", "Amstelveen", "Henksneevlieweg", "Centrum", "Leidsplein"};
//

  public Trip() {
    this.start = generateRandomTime();
    this.end = generateRandomTime().plusHours(random.nextInt(4) + 1);
    this.time = LocalDateTime.now();
    this.mileage = random.nextInt(1000) + 1;
    this.cost = random.nextInt(100) + 1;
  }

  public int getId() {
    return id;
  }

  public LocalDateTime getStart() {
    return start;
  }

  public LocalDateTime getEnd() {
    return end;
  }

  public LocalDateTime getTime() {
    return time;
  }

  public String getStartPosition() {
    return startPosition;
  }

  public String getEndPosition() {
    return endPosition;
  }


  public void setId(int id) {
    this.id = id;
  }

  public void setStart(LocalDateTime start) {
    this.start = start;
  }

  public void setEnd(LocalDateTime end) {
    this.end = end;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
  }

  public void setStartPosition(String startPosition) {
    this.startPosition = startPosition;
  }

  public void setEndPosition(String endPosition) {
    this.endPosition = endPosition;
  }

  public void setMileage(double mileage) {
    this.mileage = mileage;
  }

  public void setCost(double cost) {
    this.cost = cost;
  }

  public void setScooter(Scooter scooter) {
    this.scooter = scooter;
  }

  public void setRandom(Random random) {
    this.random = random;
  }

  public double getMileage() {
    return mileage;
  }

  public double getCost() {
    return cost;
  }

  public Scooter getScooter() {
    return scooter;
  }

  public static LocalDateTime generateRandomTime() {
    LocalDateTime time = LocalDateTime.of(LocalDate.now(),
      LocalTime.of(random.nextInt(24), random.nextInt(60),
        random.nextInt(60), random.nextInt(999999999 + 1)));
    return time;
  }
}

