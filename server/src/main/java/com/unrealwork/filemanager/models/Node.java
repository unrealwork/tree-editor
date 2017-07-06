package com.unrealwork.filemanager.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.unrealwork.filemanager.exceptions.DuplicateChildContentException;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "children"})
public class Node {

  @OneToOne
  @Getter
  protected Description content;
  @OneToMany
  @Getter
  protected Set<Node> children;
  @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
  @Getter
  @Setter
  protected Node parent;
  @Id
  @GeneratedValue
  @Getter
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
    child.setParent(this);
    if (!children.contains(child)) {
      children.add(child);
    } else {
      log.error("Duplicate Node {}", child);
      throw new DuplicateChildContentException(child);
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Node)) {
      return false;
    }
    Node node = (Node) o;
    return Objects.equals(getContent(), node.getContent()) &&
        Objects.equals(getParent(), node.getParent());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getContent(), getParent());
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
