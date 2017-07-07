package com.unrealwork.filemanager.services;

import com.unrealwork.filemanager.daos.DescriptionRepository;
import com.unrealwork.filemanager.daos.NodeRepository;
import com.unrealwork.filemanager.exceptions.DuplicateChildContentException;
import com.unrealwork.filemanager.exceptions.NodeNotFoundException;
import com.unrealwork.filemanager.exceptions.RootNodeModificationException;
import com.unrealwork.filemanager.exceptions.SelfMovementException;
import com.unrealwork.filemanager.models.Description;
import com.unrealwork.filemanager.models.Node;
import java.util.Collection;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class NodeService {

  private final NodeRepository nodeRepository;
  private final DescriptionRepository descriptionRepository;

  @Autowired
  public NodeService(NodeRepository nodeRepository,
      DescriptionRepository descriptionRepository) {
    this.nodeRepository = nodeRepository;
    this.descriptionRepository = descriptionRepository;
  }

  /**
   * Find Node with specified id in DB.
   *
   * @param id - {@link Long} value
   * @return instance of {@link Node}.
   */
  public Node getOne(Long id) throws NodeNotFoundException {
    Node node = nodeRepository.findOne(id);
    if (node != null) {
      return node;
    }
    throw new NodeNotFoundException(id);
  }


  /**
   * Retrieve collection with all nodes.
   *
   * @return nodes
   */
  public Collection<Node> list() {
    return nodeRepository.findAll();
  }

  /**
   * Retrieve collection of children.
   *
   * @param id -{@link Long} id value
   * @return Collection if children.
   */
  public Collection<Node> getChildren(Long id) throws NodeNotFoundException {
    Node node = getOne(id);
    return node.getChildren();
  }

  /**
   * Add to node with specified id new node with specified content.
   *
   * @param id - id of existing node
   * @param content - instance of {@link Description} class.
   * @return instance of new node.
   */
  @Transactional
  public Node add(Long id, Description content) {
    descriptionRepository.save(content);
    Node node = getOne(id);
    Node newNode = new Node(content);
    node.add(newNode);
    nodeRepository.save(newNode);
    nodeRepository.save(node);
    return newNode;
  }


  /**
   * Remove node with specified if.
   *
   * @param id - id of existing node
   * @return instance of removed node.
   */
  @Transactional
  public Node remove(Long id) {
    //TODO: atocmic operation
    Node node = getOne(id);
    if (node.isRoot()) {
      throw new RootNodeModificationException();
    }
    Node parentNode = node.getParent();
    node = parentNode.remove(node);
    nodeRepository.delete(node);
    descriptionRepository.delete(node.getContent());
    nodeRepository.save(parentNode);
    return node;
  }

  /**
   * Update node's content.
   *
   * @param id - node's id.
   * @param content - new content.
   * @return updatedNode.
   */
  @Transactional
  public Node update(Long id, Description content) {
    Node node = getOne(id);
    if (node.isRoot()) {
      throw new RootNodeModificationException();
    }
    if (node.hasSibling(content)) {
      throw new DuplicateChildContentException(content);
    }
    Description existingContent = node.getContent();
    existingContent.setName(content.getName());
    descriptionRepository.save(existingContent);
    return node;
  }

  /**
   * Move node with specified id to node with destId.
   *
   * @param id - source node's id.
   * @param destId - destination node's id.
   * @return - moved node.
   */
  @Transactional
  public Node move(Long id, Long destId) {
    Node srcNode = getOne(id);
    Node destNode = getOne(destId);
    if (srcNode.isRoot()) {
      throw new RootNodeModificationException();
    }
    if (srcNode.isDescendant(destNode)) {
      throw new SelfMovementException();
    }
    Description sourceContent = srcNode.getContent();
    if (destNode.hasChild(sourceContent)) {
      throw new DuplicateChildContentException(sourceContent);
    }
    Node parent = srcNode.getParent();
    parent.remove(srcNode);
    nodeRepository.save(parent);
    destNode.add(srcNode);
    nodeRepository.save(destNode);
    return srcNode;
  }


  /**
   * Remove all node except root.
   */
  @Transactional
  public void clear() {
    Node root = getOne(1L);
    nodeRepository.delete(root.getChildren());
    root.removeAll();
    nodeRepository.save(root);
  }
}
