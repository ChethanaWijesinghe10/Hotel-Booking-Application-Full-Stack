package com.example.server.repo;

import com.example.server.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<User,Long> {

    boolean existsByEmail(String email);

    void deleteByEmail(String email);

  Optional<User> findByEmail(String email);
}
