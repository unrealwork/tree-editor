package com.unrealwork.filemanager.exceptions;


import com.unrealwork.filemanager.models.Node;
import lombok.Getter;

public class DuplicateChildContentException extends RuntimeException {

  @Getter
  private final Node node;

  public DuplicateChildContentException(Node node) {
    this.node = node;
  }
}
