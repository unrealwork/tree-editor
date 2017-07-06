package com.unrealwork.filemanager.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class Node {

  @OneToOne
  protected Description content;
  @OneToMany
  protected Set<Node> children;
  @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
  protected Node parent;
  @Id
  @GeneratedValue
  private Long id;

  public Node() {

  }

  /**
   * Create a Node instance with specified content.
   *
   * @param content - {@link Description} class' instance
   */
  public Node(Description content) {
    this.content = content;
    children = new HashSet<>();
    log.debug("Node with the value {} was created!", content);
  }

  /**
   * Add specified child to this node.
   *
   * @param child - instance of {@link Node}.
   */
  public void add(Node child) {
    if (!children.contains(child)) {
      children.add(child);
      child.setParent(this);
    } else {
      log.error("Duplicate Node {}", child);
      throw new IllegalStateException("Duplicate Node");
    }
  }

  /**
   * Remove specified child.
   *
   * @param child - {@link Node} link to child instance.
   */
  public Node remove(Node child) {
    if (children.contains(child)) {
      children.remove(child);
      return child;
    }
    log.error("The folder doesn't have following child {}.", child);
    throw new IllegalStateException("The folder doesn't have following child");
  }
}
