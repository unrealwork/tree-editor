package com.unrealwork.filemanager.models;

import static org.testng.Assert.assertEquals;

import lombok.val;
import org.testng.annotations.Test;

public class NodeTest {

  @Test
  public void testGetContent() throws Exception {
    val content = new Description("/");
    Node node = new Node(content);
    assertEquals(content, node.getContent());
  }

}