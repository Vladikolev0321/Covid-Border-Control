package com.example.demo.person;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.nio.file.Path;
import java.time.LocalDate;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private LocalDate birthdate;
    private HealthStatus healthStatus;
    private String imagePath;

    public Person(){

    }

    public Person(Long id, String firstName, String lastName, LocalDate birthdate, HealthStatus healthStatus, Path imagePath) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.healthStatus = healthStatus;
        this.imagePath = imagePath.toString();
    }

    public Person(String firstName, String lastName, LocalDate birthdate, HealthStatus healthStatus, Path imagePath) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.healthStatus = healthStatus;
        this.imagePath = imagePath.toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public HealthStatus getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(HealthStatus healthStatus) {
        this.healthStatus = healthStatus;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthdate=" + birthdate +
                ", healthStatus=" + healthStatus +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}
