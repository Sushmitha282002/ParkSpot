package org.happiest.capstone_microserviceauth.service;



import org.happiest.capstone_microserviceauth.model.UserPrincipal;
import org.happiest.capstone_microserviceauth.model.Users;
import org.happiest.capstone_microserviceauth.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.User;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service

public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    public UserRepo repo;

    @Override

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = repo.findByUsername(username);

        if (user == null){

            System.out.println("User not found");

            throw new UsernameNotFoundException("User not found");

        }

        return new UserPrincipal(user);

    }

}

