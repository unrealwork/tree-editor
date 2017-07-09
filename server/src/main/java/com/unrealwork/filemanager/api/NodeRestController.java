package com.unrealwork.filemanager.api;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.unrealwork.filemanager.models.Description;
import com.unrealwork.filemanager.models.Node;
import com.unrealwork.filemanager.services.NodeService;
import java.util.Collection;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "node")
@RequestMapping(path = "/api/nodes")
@Slf4j
public class NodeRestController {

  private NodeService nodeService;

  @Autowired
  public NodeRestController(NodeService nodeService) {
    this.nodeService = nodeService;
  }

  @RequestMapping(method = RequestMethod.GET, path = "{id}",
      produces = APPLICATION_JSON_VALUE)
  public ResponseEntity<Node> getNode(@PathVariable Long id) {
    Node node = nodeService.getOne(id);
    return new ResponseEntity<>(node, HttpStatus.OK);
  }

  @RequestMapping(method = RequestMethod.GET, path = "{id}/children",
      produces = APPLICATION_JSON_VALUE)
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
      produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE
  )
  public ResponseEntity<Node> add(@PathVariable Long id, @Valid @RequestBody Description content) {
    Node newNode = nodeService.add(id, content);
    return new ResponseEntity<>(newNode, HttpStatus.CREATED);
  }

  /**
   * Remove node with specified id
   *
   * @param id - parent's node id
   * @return new node if success.
   */
  @RequestMapping(method = RequestMethod.DELETE, path = "{id}")
  public ResponseEntity<Node> remove(@PathVariable Long id) {
    Node removedNode = nodeService.remove(id);
    return new ResponseEntity<>(removedNode, HttpStatus.OK);
  }

  /**
   * Update content with node with specified description to children
   *
   * @param id - parent's node id
   * @param content - {@link Description} instance.
   * @return new node if success.
   */
  @RequestMapping(method = RequestMethod.POST, path = "{id}",
      produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE
  )
  public ResponseEntity<Node> update(@PathVariable Long id,
      @Valid @RequestBody Description content) {
    Node updatedNode = nodeService.update(id, content);
    return new ResponseEntity<>(updatedNode, HttpStatus.OK);
  }

  /**
   * Retrieve collection with all nodes.
   *
   * @return collection of nodes
   */
  @RequestMapping(method = RequestMethod.GET, path = "", produces = APPLICATION_JSON_VALUE)
  public ResponseEntity<Collection<Node>> list() {
    Collection<Node> removedNode = nodeService.list();
    return new ResponseEntity<>(removedNode, HttpStatus.OK);
  }

  /**
   * Copy node with specified id to node with another id
   *
   * @param id - source node id.
   * @param destId - id of destination node .
   * @return new node if success.
   */
  @RequestMapping(method = RequestMethod.GET, path = "{id}/move/{destId}",
      produces = APPLICATION_JSON_VALUE
  )
  public ResponseEntity<Node> move(@PathVariable Long id,
      @PathVariable Long destId) {
    Node updatedNode = nodeService.move(id, destId);
    return new ResponseEntity<>(updatedNode, HttpStatus.OK);
  }

  @RequestMapping(method = RequestMethod.GET, path = "root",
      produces = APPLICATION_JSON_VALUE
  )
  public ResponseEntity<Node> root() {
    Node updatedNode = nodeService.root();
    return new ResponseEntity<>(updatedNode, HttpStatus.OK);
  }
}