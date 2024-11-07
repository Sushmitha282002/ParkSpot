package org.happiest.ProviderParkingSlot.repository;


import org.happiest.ProviderParkingSlot.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    @Query(value = "SELECT * FROM userdetails WHERE role = :role", nativeQuery = true)
    List<Users> findAllByRole(String role);

    @Query(value = "SELECT * FROM userdetails WHERE role = :role", nativeQuery = true)
    List<Users> findByRole(String role);
}
