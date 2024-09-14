package com.example.server.controller;

import com.example.server.entity.User;
import com.example.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;


    @GetMapping(path = "/all-users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.FOUND);

    }


    @GetMapping(path = "/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            User thUser = userService.getUser(email);
            return ResponseEntity.ok(thUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user.");

        }
    }


    @DeleteMapping(path = "/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String email) {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully.");

        } catch (UsernameNotFoundException e) {
            return (ResponseEntity<String>) ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
        catch(Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");

        }
    }

}
