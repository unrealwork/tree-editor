package com.unrealwork.filemanager.models;

import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public @Data
class Node<T> {

  private Node<T> parent;
  private T content;
  private Set<Node<T>> children;

  private Node() {
  }

  public Node(T content) {
    this.content = content;
    children = new HashSet<>();
    log.debug("Node with the value {} was created!", content);
  }

  /**
   * Add specified child to this node.
   *
   * @param child - instance of {@link Node}.
   */
  public void add(Node<T> child) {
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
  public Node<T> remove(Node<T> child) {
    if (children.contains(child)) {
      children.remove(child);
      return child;
    }
    log.error("The folder doesn't have following child {}.", child);
    throw new IllegalStateException("The folder doesn't have following child");
  }
}
