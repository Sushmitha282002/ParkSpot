package org.happiest.capstone_microserviceauth.repository;

import jdk.jshell.spi.ExecutionControl;
import org.happiest.capstone_microserviceauth.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository

public interface UserRepo extends JpaRepository<Users, Integer> {

    Users findByUsername(String username);
    Users findByMobile(String mobile);


    @Query(value = "SELECT DATE(created_at) AS day, COUNT(*) AS count " +
            "FROM userdetails " +
            "WHERE role = :role " +
            "AND created_at >= CURDATE() - INTERVAL 6 DAY " +
            "GROUP BY day " +
            "ORDER BY day ASC", nativeQuery = true)
    List<Map<String, Object>> getWeeklyRegistrationsByRole(@Param("role") String role);




}

