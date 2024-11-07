package org.happiest.ProviderParkingSlot.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity

@Table(name = "userdetails")

@Data

@AllArgsConstructor

@NoArgsConstructor

public class Users {

    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column

    private String firstname;

    private String lastname;

    private String username;

    private String password;

    private String mobile;

    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore

    private List<ParkArea> parkAreas;

 public Users(int id, String firstname, String lastname, String username,String password,String mobile, String role) {
  this.id = id;
  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.password = password;
  this.mobile = mobile;
  this.role = role;
 }


}

