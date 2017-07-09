package com.unrealwork.filemanager.exceptions;

import java.util.Locale;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
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

  /**
   * Describes how to handle {@link NumberFormatException}.
   *
   * @param req - request
   * @param ex - thrown exception
   */
  @ExceptionHandler({DuplicateChildContentException.class})
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorInfo duplicateChildContent(HttpServletRequest req,
      DuplicateChildContentException ex) {
    Locale locale = LocaleContextHolder.getLocale();
    String errorMessage = messageSource.getMessage("error.duplicate.child.content", null, locale);
    errorMessage += ex.getContent();
    String errorUrl = req.getRequestURL().toString();
    return new ErrorInfo(errorUrl, errorMessage);
  }

  /**
   * Describes how to handle {@link NumberFormatException}.
   *
   * @param req - request
   * @param ex - thrown exception
   */
  @ExceptionHandler({RootNodeModificationException.class})
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorInfo rootModification(HttpServletRequest req,
      RootNodeModificationException ex) {
    Locale locale = LocaleContextHolder.getLocale();
    String errorMessage = messageSource.getMessage("error.root.modification", null, locale);
    String errorUrl = req.getRequestURL().toString();
    return new ErrorInfo(errorUrl, errorMessage);
  }

  /**
   * Describes how to handle {@link SelfMovementException}.
   *
   * @param req - request
   * @param ex - thrown exception
   */
  @ExceptionHandler({SelfMovementException.class})
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorInfo selfMovement(HttpServletRequest req,
      SelfMovementException ex) {
    Locale locale = LocaleContextHolder.getLocale();
    String errorMessage = messageSource.getMessage("error.self.movement", null, locale);
    String errorUrl = req.getRequestURL().toString();
    return new ErrorInfo(errorUrl, errorMessage);
  }


  /**
   * Describes how to handle {@link RootNotFoundException}.
   *
   * @param req - request
   * @param ex - thrown exception
   */
  @ExceptionHandler({RootNotFoundException.class})
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ResponseBody
  public ErrorInfo rootNotFound(HttpServletRequest req,
      RootNotFoundException ex) {
    Locale locale = LocaleContextHolder.getLocale();
    String errorMessage = messageSource.getMessage("error.root.not.found", null, locale);
    String errorUrl = req.getRequestURL().toString();
    log.error(errorMessage);
    return new ErrorInfo(errorUrl, errorMessage);
  }
}
