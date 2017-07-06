package com.unrealwork.filemanager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Description {

  @Id
  @GeneratedValue
  @JsonIgnore
  private Long id;
  private String name;

  Description() {
  }

  public Description(String name) {
    this.name = name;
  }
}
