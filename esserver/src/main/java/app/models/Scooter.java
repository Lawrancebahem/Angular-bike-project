package app.models;

import app.repositories.Identifiable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Entity
public class Scooter implements Identifiable {
  @Transient
  private final String randomString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  //  @JsonView({ShowScooterSummary.class, ShowId.class, ShowTag.class, ShowCharge.class, ShowStatus.class})
  @JsonView(ShowScooterSummary.class)
  @Id
  @GeneratedValue
  private int id;
  @JsonView(ShowScooterSummary.class)
  private String tag;
  @JsonView(ShowScooterSummary.class)
  @Enumerated(EnumType.STRING)
  private StatusScooter status;
  @JsonView(ShowScooterSummary.class)
  private int chargeBattery;
  @JsonIgnore
  public static int uniqueId = 30000;

  private String gpsLocation;
  private double mileage;

  @OneToMany(mappedBy = "scooter")
  private List<Trip> trips;
  @Transient
  Random random = new Random();
  public Scooter() {
    int randomIndex = random.nextInt(3);
    GeoLocation geoLocation = randomGeo(52.377956, 4.897070);
//      this.id = uniqueId++;
    this.status = StatusScooter.values()[randomIndex];
    this.tag = generateRandomTag(8, randomString);
    this.gpsLocation = geoLocation.lat + ", " + geoLocation.lon;
    this.chargeBattery = 0;
    this.mileage = geoLocation.distance;
    this.chargeBattery = generateRandomCharge();
    this.trips= new ArrayList<>();
  }

  public Scooter(String tag) {
    this();
    this.tag = tag;
  }

  public static Scooter creatRandomScooter() {
    return new Scooter();
  }

  public int generateRandomCharge() {
    return (int) Math.floor(5 + Math.random() * (100 + 1 - 5));
  }

  /**
   * Generate random GeoLocation
   *
   * @param latitude
   * @param longitude
   * @return
   */
  private GeoLocation randomGeo(double latitude, double longitude) {

    double y0 = latitude;
    double x0 = longitude;
    long rd = 5000 / 111300; // about 111300 meters in one degree

    double u = Math.random();
    double v = Math.random();

    double w = rd * Math.sqrt(u);
    double t = 2 * Math.PI * v;
    double x = w * Math.cos(t);
    double y = w * Math.sin(t);

    double newLatitude = y + y0+u;
    double newLongitude = x + x0+v;
    double newDistance = distance(latitude, newLatitude, longitude, newLongitude, "K");
    return new GeoLocation(newLatitude, newLongitude, newDistance);
  }


  /**
   * Calculate the distance between two distances
   *
   * @param lat1
   * @param lon1
   * @param lat2
   * @param lon2
   * @return
   */
  private double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      double theta = lon1 - lon2;
      double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) +
        Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
      dist = Math.acos(dist);
      dist = Math.toDegrees(dist);
      dist = dist * 60 * 1.1515;
      if (unit.equals("K")) {
        dist = dist * 1.609344;
      } else if (unit.equals("N")) {
        dist = dist * 0.8684;
      }
      int random = (int) (Math.random() * 1000);
      return (double) (Math.round(dist * 100) / 100) + random;
    }
  }

  /**
   * To generate random tag
   *
   * @param lengthOfCode
   * @param possible
   * @return
   */
  private String generateRandomTag(int lengthOfCode, String possible) {
    StringBuilder text = new StringBuilder();
    for (int i = 0; i < lengthOfCode; i++) {
      text.append(possible.charAt((int) Math.floor(Math.random() * possible.length())));
    }
    return text.toString();
  }

  public Trip startNewTrip(LocalDateTime startDateTime){
    Trip trip = new Trip();
    if (this.status.equals(StatusScooter.IDLE)){
      trip.setStart(startDateTime);
      trip.setStartPosition(this.gpsLocation);
      String[] gpsLocation = this.gpsLocation.split(",");
      GeoLocation randomGeo = randomGeo(Double.parseDouble(gpsLocation[0]),Double.parseDouble(gpsLocation[1]));
      trip.setEndPosition(randomGeo.lat + ", " +randomGeo.lon);
      this.status = StatusScooter.IN_USE;

      return trip;
    }
    return null;
  }

  public void addTrip(Trip trip){
    this.trips.add(trip);
  }



  public String getTag() {
    return tag;
  }

  public String getGpsLocation() {
    return gpsLocation;
  }

  public int getChargeBattery() {
    return chargeBattery;
  }

  public double getMileage() {
    return mileage;
  }

  public StatusScooter getStatus() {
    return status;
  }


  public void setTag(String tag) {
    this.tag = tag;
  }

  @Override
  public int getId() {
    return this.id;
  }

  @Override
  public void setId(int id) {
    this.id = id;
  }

  public void setStatus(StatusScooter status) {
    this.status = status;
  }

  public void setChargeBattery(int chargeBattery) {
    this.chargeBattery = chargeBattery;
  }

  public static void setUniqueId(int uniqueId) {
    Scooter.uniqueId = uniqueId;
  }

  public void setGpsLocation(String gpsLocation) {
    this.gpsLocation = gpsLocation;
  }

  public void setMileage(double mileage) {
    this.mileage = mileage;
  }

  public void setTrips(List<Trip> trips) {
    this.trips = trips;
  }

  public void setRandom(Random random) {
    this.random = random;
  }

  public List<Trip> getTrips() {
    return trips;
  }




  /**
   * GeoLocation class to hold the random latitude and the longitude with the calculated distance
   * Between these coordinates and Amsterdam location
   */
  static class GeoLocation {
    private double lat;
    private double lon;
    private double distance;

    public GeoLocation(double lat, double lon, double distance) {
      this.lat = lat;
      this.lon = lon;
      this.distance = distance;
    }

    public double getLat() {
      return lat;
    }

    public double getLon() {
      return lon;
    }

    public double getDistance() {
      return distance;
    }

  }




   public enum StatusScooter {
    IDLE,
    IN_USE,
    MAINTENANCE
  }

  public class ShowScooterSummary {
  }

}
