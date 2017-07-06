package com.unrealwork.filemanager.services;

import com.unrealwork.filemanager.daos.DescriptionRepository;
import com.unrealwork.filemanager.daos.NodeRepository;
import com.unrealwork.filemanager.exceptions.NodeNotFoundException;
import com.unrealwork.filemanager.models.Description;
import com.unrealwork.filemanager.models.Node;
import java.util.Collection;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
  public Node add(Long id, Description content) {
    //TODO: atocmic operation
    descriptionRepository.save(content);
    Node node = getOne(id);
    Node newNode = new Node(content);
    node.add(newNode);
    nodeRepository.save(newNode);
    nodeRepository.save(node);
    return newNode;
  }
}
