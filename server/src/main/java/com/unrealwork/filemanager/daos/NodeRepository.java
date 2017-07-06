package com.unrealwork.filemanager.daos;

import com.unrealwork.filemanager.models.Node;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NodeRepository extends JpaRepository<Node, Long> {

  Node findOne(Long id);
}
