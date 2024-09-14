package com.example.server.service;

import com.example.server.entity.User;
import com.example.server.exceptions.UserAlreadyExistsException;

import java.util.List;

public interface UserService {
    User  registerUser (User user) throws  UserAlreadyExistsException;
    List<User> getUsers();

    void deleteUser(String email);
    User getUser(String email);
}
