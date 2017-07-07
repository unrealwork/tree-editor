package com.unrealwork.filemanager.models;


import static org.junit.Assert.assertEquals;

import lombok.val;
import org.junit.Test;

public class NodeTest {

  @Test
  public void testEquals() throws Exception {
    Node a = new Node(new Description("/"));
    Node b = new Node(new Description("a"));
    Node c = new Node(new Description("a"));
    b.setParent(a);
    c.setParent(a);
    assertEquals(b, c);
  }

  @Test
  public void testGetContent() throws Exception {
    val content = new Description("/");
    Node node = new Node(content);
    assertEquals(content, node.getContent());
  }

}