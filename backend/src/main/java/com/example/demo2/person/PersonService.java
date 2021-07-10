package com.example.demo2.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
@Component
public class PersonService {

    @Autowired
    private PersonRepository repo;

    public Person save(Person person){
        return repo.save(person);
    }

    public List<Person> getAll() {
        return repo.findAll();
    }

    public Person getPersonByID(Long id){
        return repo.findById(id).orElse(null);
    }

    public Person updatePerson(Long id, Map<String, String> args){

        Person person = this.getPersonByID(id);

        if(person != null){
            person.setFirstName(args.get("firstName"));
            person.setLastName(args.get("lastName"));
            person.setBirthdate(LocalDate.parse(args.get("birthdate"), DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            person.setHealthStatus(HealthStatus.valueOf(args.get("healthStatus")));
            return this.save(person);
        }

        return null;
    }

    public void checkPerson(){

    }

    public void deletePerson(Long id){
        repo.delete(this.getPersonByID(id));
    }
}
