package org.happiest.capstone_microserviceauth.jwt;


import jakarta.servlet.FilterChain;

import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;

import jakarta.servlet.http.HttpServletResponse;

import org.happiest.capstone_microserviceauth.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.ApplicationContext;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component

public class JwtFilter extends OncePerRequestFilter {//it will check every incomoing http req

    // Injecting JWTService for extracting and validating JWT tokens

    @Autowired

    private JWTService jwtService;

    // ApplicationContext is injected to get Spring beans, specifically for loading user details

    @Autowired

    ApplicationContext context;

    // The method that will be called for every incoming HTTP request

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // Fetching the Authorization header from the request

        String authHeader = request.getHeader("Authorization");

        String token = null;      // Placeholder for JWT token

        String email = null;   // Placeholder for username extracted from the token

        // If the Authorization header exists and starts with "Bearer ", we extract the token

        if(authHeader != null && authHeader.startsWith("Bearer ")){

            token = authHeader.substring(7);  // Extract the token, removing the "Bearer " prefix

            email = jwtService.extractUserName(token);  // Extract username from the JWT

        }

        // If a username is extracted and the user is not yet authenticated

        if(email != null && SecurityContextHolder.getContext().getAuthentication() == null ){

            // Load user details from the database or user store

            UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(email);

            // Validate the token using the user details (check signature, expiration, etc.)

            if(jwtService.validateToken(token, userDetails)){

                // Create an authentication object with the user's details and authorities

                UsernamePasswordAuthenticationToken authToken =

                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // Attach additional request details like IP address to the authentication token

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication object in the SecurityContext, marking the user as authenticated

                SecurityContextHolder.getContext().setAuthentication(authToken);

            }

        }

        // Continue the request-response flow (pass control to the next filter)

        filterChain.doFilter(request, response);

    }

}







