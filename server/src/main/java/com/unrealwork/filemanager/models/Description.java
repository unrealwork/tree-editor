package com.unrealwork.filemanager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;
import lombok.Getter;

@Entity
@Data
public class Description {

  @Id
  @GeneratedValue
  @JsonIgnore
  @Getter
  private Long id;
  @Getter

  private String name;

  Description() {
  }

  public Description(String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Description)) {
      return false;
    }
    Description that = (Description) o;
    return Objects.equals(getName(), that.getName());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getName());
  }
}
