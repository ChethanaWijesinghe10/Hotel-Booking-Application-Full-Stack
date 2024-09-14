package com.example.server.service;


import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.exceptions.UserAlreadyExistsException;
import com.example.server.repo.RoleRepo;
import com.example.server.repo.UserRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
@Service
@RequiredArgsConstructor
public class UserServiceImpl  implements UserService{
    private final PasswordEncoder passwordEncoder;
@Autowired
    UserRepo userRepo;


@Autowired
    RoleRepo roleRepo;
    @Override
    public User registerUser(User user) throws  UserAlreadyExistsException {
        if (userRepo.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Object userRole = roleRepo.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList((Role) userRole));
        return userRepo.save(user);
    }

    @Override
    public List<User> getUsers() {

        return userRepo.findAll();
    }


    @Transactional
    @Override
    public void deleteUser(String email) {
  userRepo.deleteByEmail(email);
    }

    //get one user

    @Override
    public User getUser(String email) {

        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


    }
    }

