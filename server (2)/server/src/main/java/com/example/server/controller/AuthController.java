package com.example.server.controller;

import com.example.server.entity.User;
import com.example.server.exceptions.UserAlreadyExistsException;
import com.example.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    UserService userService;



    @PostMapping("/register")
    public ResponseEntity<?> registerUser(User user){
       try{
           userService.registerUser(user);
           return ResponseEntity.ok("Successfully registered the user.");

       }catch (UserAlreadyExistsException e){
           return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

       }
    }

}
