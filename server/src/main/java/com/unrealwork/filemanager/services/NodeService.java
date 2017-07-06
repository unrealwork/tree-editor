package com.unrealwork.filemanager.services;

import com.unrealwork.filemanager.daos.NodeRepository;
import com.unrealwork.filemanager.exceptions.NodeNotFoundException;
import com.unrealwork.filemanager.models.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class NodeService {

  private final NodeRepository nodeRepository;

  @Autowired
  public NodeService(NodeRepository nodeRepository) {
    this.nodeRepository = nodeRepository;
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
}
