package com.unrealwork.filemanager.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.unrealwork.filemanager.exceptions.DuplicateChildContentException;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "children", "parent"})
public class Node {

  @OneToOne
  @Getter
  protected Description content;
  @OneToMany(cascade = CascadeType.ALL)
  @Getter
  protected Set<Node> children;
  @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @Getter
  @Setter
  protected Node parent;
  @Id
  @GeneratedValue
  @Getter
  private Long id;
  private Long level;

  public Node() {
    this.level = 0L;
  }

  /**
   * Create a Node instance with specified content.
   *
   * @param content - {@link Description} class' instance
   */
  public Node(Description content) {
    this();
    this.content = content;
    children = new HashSet<>();
    log.debug("Node with the value {} was created!", content);
  }

  public void setParent(Node parent) {
    this.parent = parent;
    this.level = parent.getLevel() + 1;
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
      throw new DuplicateChildContentException(child.getContent());
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
    return Objects.equals(getContent(), node.getContent())
        && Objects.equals(getParent(), node.getParent());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getContent(), getParent());
  }

  /**
   * Is node root.
   *
   * @return true if root
   */
  public boolean isRoot() {
    return parent == null;
  }

  /**
   * Remove specified child.
   *
   * @param child - {@link Node} link to child instance.
   */
  public Node remove(Node child) {
    if (children != null && children.contains(child)) {
      children.remove(child);
      return child;
    }
    log.error("The folder doesn't have following child {}.", child);
    throw new IllegalStateException("The folder doesn't have following child");
  }


  /**
   * Check that node has sibling with the same content.
   *
   * @param content content to check.
   * @return true if does.
   */
  public boolean hasSibling(Description content) {
    return !isRoot() && parent.getChildren().stream()
        .anyMatch(node -> node != this && node.getContent().equals(content));
  }

  /**
   * Calc node level.
   *
   * @return level value > 0
   */
  public Long getLevel() {
    return level;
  }


  public boolean hasChild(Description content) {
    return children.stream()
        .anyMatch(node -> node.getContent().equals(content));
  }

  /**
   * Is node descendant of this node.
   *
   * @param node - node to check.
   * @return true if is.
   */
  public boolean isDescendant(Node node) {
    Node iterate = node;
    while (!iterate.isRoot()) {
      if (iterate == this) {
        return true;
      }
      iterate = iterate.parent;
    }
    return false;
  }

  /**
   * Remove all children.
   */
  public void removeAll() {
    children.clear();
  }

  public boolean isTerminal() {
    return children.isEmpty();
  }
}
