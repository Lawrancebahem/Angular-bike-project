package app.models;

import app.repositories.Identifiable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import javax.persistence.*;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Random;

@Entity

@NamedQueries({
  @NamedQuery(
    name = "Trip_find_current_from_scooter",
    query = "SELECT t FROM Trip t"
  )
})

public class Trip implements Identifiable {

  @Id
  @GeneratedValue
  private int id;
  @JsonSerialize(using = CustomDateSerializer.class)
  private LocalDateTime start;
  @JsonSerialize(using = CustomDateSerializer.class)
  private LocalDateTime end;
  @JsonSerialize(using = CustomDateSerializer.class)
  private LocalDateTime time;
  private String startPosition;
  private String endPosition;
  private double mileage;
  private double cost;

  @JsonIgnoreProperties("trips")
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

  @Override
  public int getId() {
    return this.id;
  }

  @Override
  public void setId(int id) {
    this.id = id;
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

  public static class ShowInfo {

  }

  /**
   * To format the local date time in an appropriate format
   */
  static class CustomDateSerializer extends StdSerializer<LocalDateTime> {
    private static final long serialVersionUID = 1L;
//    private static SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    protected CustomDateSerializer() {
      this(null);
    }

    public CustomDateSerializer(Class<LocalDateTime> t) {
      super(t);
    }

    @Override
    public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider provider) throws IOException {
      gen.writeString(formatter.format(value));
    }
  }
}

