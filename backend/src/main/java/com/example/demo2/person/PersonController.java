package com.example.demo2.person;

import com.example.demo2.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
public class PersonController {

    @Autowired
    private PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String hello(){
        return "Hello, Spring!";
    }

    @GetMapping("/test")
    public List<Person> getPeople(){
        return service.getAll();
    }

    @PostMapping("/person/create")
    public void createPerson(@RequestBody Person person){
        service.save(person);
    }

    @GetMapping("/person/{id}")
    public Person getPerson(@PathVariable("id") Long id){
        return service.getPersonByID(id);
    }

    @PutMapping("/person/update/{id}")
    public Person update(@PathVariable("id") long id, @RequestBody Map<String, String> body){
        return service.updatePerson(id, body);
    }

    @RequestMapping(value = "/person/delete/{id}")
    public void delete(@PathVariable("id") long id) {
        service.deletePerson(id);
    }
}
