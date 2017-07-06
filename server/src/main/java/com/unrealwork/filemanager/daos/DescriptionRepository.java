package com.unrealwork.filemanager.daos;

import com.unrealwork.filemanager.models.Description;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DescriptionRepository extends JpaRepository<Description, Long> {

}
