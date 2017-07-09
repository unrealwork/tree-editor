package com.unrealwork.filemanager;

import com.unrealwork.filemanager.daos.DescriptionRepository;
import com.unrealwork.filemanager.daos.NodeRepository;
import com.unrealwork.filemanager.exceptions.RootNotFoundException;
import com.unrealwork.filemanager.models.Description;
import com.unrealwork.filemanager.models.Node;
import com.unrealwork.filemanager.services.NodeService;
import java.util.Locale;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@SpringBootApplication
@Slf4j
public class Application {

  public static final Node ROOT_NODE = new Node(new Description("/"));

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Bean
  CommandLineRunner init(NodeRepository nodeRepository,
      DescriptionRepository descriptionRepository, NodeService nodeService) {
    return (args) -> {
      try {
        Node rootNode = nodeService.root();
        log.info("Root node loaded from DB {}", rootNode);
      } catch (RootNotFoundException e) {
        descriptionRepository.save(ROOT_NODE.getContent());
        nodeRepository.save(ROOT_NODE);
        log.info("Start with new empty root node {}", ROOT_NODE);
      }

    };
  }

  /**
   * Set up default locale.
   *
   * @return locale resolver
   */
  @Bean
  public LocaleResolver localeResolver() {
    SessionLocaleResolver slr = new SessionLocaleResolver();
    slr.setDefaultLocale(Locale.US);
    return slr;
  }


  /**
   * Set messageSource bean.
   *
   * @return return set message source instance
   */
  @Bean
  public ReloadableResourceBundleMessageSource messageSource() {
    ReloadableResourceBundleMessageSource messageSource =
        new ReloadableResourceBundleMessageSource();
    messageSource.setBasename("classpath:locale/messages");
    messageSource.setCacheSeconds(3600); //refresh cache once per hour
    return messageSource;
  }
}
