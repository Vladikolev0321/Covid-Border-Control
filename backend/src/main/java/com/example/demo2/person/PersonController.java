package com.example.demo2.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
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
    public void createPerson(@RequestBody Map<String, String> personMap) throws IOException {

        String firstName = personMap.get("firstName");
        String lastName = personMap.get("lastName");
        LocalDate birthDate = LocalDate.parse(personMap.get("birthdate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        HealthStatus healthStatus = HealthStatus.valueOf(personMap.get("healthStatus"));
        String imageInB64 = personMap.get("image"); // B64 string encoded

        // get that b64 string
        // save image path in person property
        // decode it and save it to uploads folder

        String base64Image = imageInB64.split(",")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

        Path imagePath = Path.of(".\\uploads\\" + firstName + "_" + lastName + "_" + birthDate + ".jpg");


        System.out.println(imagePath.toString());
        Files.write(imagePath, imageBytes);

        service.save(new Person(firstName, lastName, birthDate, healthStatus, imagePath));
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
