package com.unrealwork.filemanager.api;

import com.unrealwork.filemanager.models.Description;
import com.unrealwork.filemanager.models.Node;
import com.unrealwork.filemanager.services.NodeService;
import java.util.Collection;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

  @RequestMapping(method = RequestMethod.GET, path = "{id}",
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Node> getNode(@PathVariable Long id) {
    Node node = nodeService.getOne(id);
    return new ResponseEntity<>(node, HttpStatus.OK);
  }

  @RequestMapping(method = RequestMethod.GET, path = "{id}/children",
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Collection<Node>> getChildren(@PathVariable Long id) {
    Collection<Node> children = nodeService.getChildren(id);
    return new ResponseEntity<>(children, HttpStatus.OK);
  }

  /**
   * Add new node with specified description to children
   *
   * @param id - parent's node id
   * @param content - {@link Description} instance.
   * @return new node if success.
   */
  @RequestMapping(method = RequestMethod.PUT, path = "{id}",
      produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<Node> add(@PathVariable Long id, @Valid @RequestBody Description content) {
    Node newNode = nodeService.add(id, content);
    return new ResponseEntity<>(newNode, HttpStatus.OK);
  }
}