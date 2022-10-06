package ch.akros.marketplace.service.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class LatLon {
  private String lat;
  private String lon;

  @JsonCreator
  public LatLon(@JsonProperty("lat") String lat, @JsonProperty("lon") String lon) {
    this.lat = lat;
    this.lon = lon;
  }
}
