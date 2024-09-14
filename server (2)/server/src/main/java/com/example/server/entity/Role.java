package com.example.server.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor

public class Role {
@Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String name;
    @ManyToMany(mappedBy ="roles" )
    private Collection<User> users= new HashSet<User>();

    //assign a user
    public void assignRoleToUser(User user){
        user.getRoles().add(this);
        this.getUsers().add(user);
    }

    //remove the user
    public void removeUserFromRole(User user){
        user.getRoles().remove(this);
        this.getUsers().remove(user);

    }


    //remove  all users from role
    public  void  removeAllUsersFromRole(){
        if(this.getUsers()!=null){
            List<User> roleUser=this.getUsers().stream().toList();
            roleUser.forEach(this::removeUserFromRole);
        }

    }

    public String getName(){
        return name!=null? name :"";
    }

}
