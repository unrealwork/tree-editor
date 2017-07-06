package com.unrealwork.filemanager.exceptions;

import lombok.Getter;

public class NodeNotFoundException extends RuntimeException {

  @Getter
  private Long nodeId;

  public NodeNotFoundException(Long nodeId) {
    this.nodeId = nodeId;
  }
}
