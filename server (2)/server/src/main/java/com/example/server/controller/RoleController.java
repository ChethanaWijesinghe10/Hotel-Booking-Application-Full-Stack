package com.example.server.controller;

import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.exceptions.RoleAlreadyExistException;
import com.example.server.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
@CrossOrigin
public class RoleController {
    @Autowired
    RoleService roleService;


    //to get every role
    @GetMapping(path = "/all-roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.FOUND);
    }

    //create new role
    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role theRole){
        try{
           roleService.createRole(theRole);
           return ResponseEntity.ok("Role created successfully.");
        }catch (RoleAlreadyExistException re){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());

        }

    }
    //to delete role
    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable ("roleId") Long roleId){
       roleService.deleteRole(roleId);

    }

    //remove all users from roles
    @PostMapping("/remove-all-users-from-role/{roleId}")
    public  Role removeAllUsersFromRole(@PathVariable ("roleId") Long roleId){
        return roleService.removeAllUsersFromRole(roleId);
    }


    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId){
        return roleService.removeUserFromRole(userId, roleId);
    }


    @PostMapping("/assign-user-to-role")
    public User assignUserToRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId){
        return roleService.assignRoleToUser(userId, roleId);
    }

}
