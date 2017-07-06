package com.unrealwork.filemanager.exceptions;

import com.unrealwork.filemanager.models.Description;
import lombok.Getter;

public class DuplicateChildContentException extends RuntimeException {
  @Getter
  private final Description content;

  public DuplicateChildContentException(Description content) {
    this.content = content;
  }
}
