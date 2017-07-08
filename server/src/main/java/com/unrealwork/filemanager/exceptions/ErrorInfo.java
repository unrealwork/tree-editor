package com.unrealwork.filemanager.exceptions;

import lombok.Data;

@Data
class ErrorInfo {

  private String url;
  private String message;

  ErrorInfo(String errorUrl, String message) {
    this.url = errorUrl;
    this.message = message;
  }
}
