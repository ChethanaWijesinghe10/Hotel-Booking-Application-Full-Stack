package com.example.server.repo;

import com.example.server.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface RoleRepo extends JpaRepository<Role,Long> {
  //  @Override
   // Optional<Role> findById(Long aLong);

   Optional<Role>findByName(String role);
}
