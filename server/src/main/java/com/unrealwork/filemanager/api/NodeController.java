package com.unrealwork.filemanager.api;

import com.unrealwork.filemanager.models.Node;
import com.unrealwork.filemanager.services.NodeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "node")
@RequestMapping(path = "/nodes")
@Slf4j
public class NodeController {

  private NodeService nodeService;

  @Autowired
  public NodeController(NodeService nodeService) {
    this.nodeService = nodeService;
  }

  @RequestMapping(method = RequestMethod.GET, path = "{id}")
  public ResponseEntity<Node> getNode(@PathVariable Long id) {
    Node node = nodeService.getOne(id);
    return new ResponseEntity<>(node, HttpStatus.OK);
  }
}