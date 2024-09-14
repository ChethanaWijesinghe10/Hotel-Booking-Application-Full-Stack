package com.example.server.service;

import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.exceptions.RoleAlreadyExistException;
import com.example.server.exceptions.UserAlreadyExistsException;
import com.example.server.repo.RoleRepo;
import com.example.server.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService{
    @Autowired
    RoleRepo roleRepo;

    @Autowired
    UserRepo userRepo;
    @Autowired
    UserService userService;
    @Override
    public List<Role> getRoles() {
        return null;
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName="ROLE_"+theRole.getName().toUpperCase();
        Role role =new Role(roleName);
        if(roleRepo.existsByName(role)){
            throw new RoleAlreadyExistException(theRole.getName()+"role already exists");

        }

        return roleRepo.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
this.removeAllUsersFromRole(roleId);
roleRepo.deleteById(roleId);

    }

    @Override
    public Role findByName(String name) {
        return roleRepo.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepo.findById(userId);
        Optional<Role>  role = roleRepo.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepo.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepo.findById(userId);
        Optional<Role>  role = roleRepo.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistsException(
                    user.get().getFirstName()+ " is already assigned to the" + role.get().getName()+ " role");
        }
        if (role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepo.save(role.get());
        }
        return user.get();

    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepo.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return roleRepo.save(role.get());
    }
}
