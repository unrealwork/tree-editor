package com.unrealwork.filemanager.exceptions;

import lombok.Data;

@Data
class ErrorInfo {

  private String url;
  private String errorMessage;

  ErrorInfo(String errorUrl, String errorMessage) {
    this.url = errorUrl;
    this.errorMessage = errorMessage;
  }
}
