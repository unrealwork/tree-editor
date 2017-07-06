package com.unrealwork.filemanager.exceptions;

import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RestResponseExceptionHandler {

  private final MessageSource messageSource;

  @Autowired
  public RestResponseExceptionHandler(MessageSource messageSource) {
    this.messageSource = messageSource;
  }

  /**
   * Describes how to handle {@link NodeNotFoundException}.
   *
   * @param req - request
   * @param ex - thrown exception
   */
  @ExceptionHandler({NodeNotFoundException.class})
  @ResponseStatus(value = HttpStatus.NOT_FOUND)
  @ResponseBody
  public ErrorInfo nodeNotFound(HttpServletRequest req, NodeNotFoundException ex) {
    Locale locale = LocaleContextHolder.getLocale();
    String errorMessage = messageSource.getMessage("error.no.node.id", null, locale);
    errorMessage += ex.getNodeId();
    String errorUrl = req.getRequestURL().toString();
    return new ErrorInfo(errorUrl, errorMessage);
  }

  /**
   * Describes how to handle {@link NumberFormatException}.
   *
   * @param req - request
   * @param ex - thrown exception
   */
  @ExceptionHandler({NumberFormatException.class})
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorInfo incorrectId(HttpServletRequest req, NumberFormatException ex) {
    Locale locale = LocaleContextHolder.getLocale();
    String errorMessage = messageSource.getMessage("error.incorrect.id", null, locale);
    String errorUrl = req.getRequestURL().toString();
    return new ErrorInfo(errorUrl, errorMessage);
  }
}
