package com.example.demo2.person;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;

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

    @RequestMapping(value="person/create", method = RequestMethod.POST, consumes = "text/plain")
    @ResponseBody
    public void createPerson(@RequestBody String givenString) throws IOException {

        System.out.println(givenString);
        ObjectMapper o = new ObjectMapper();
        Map<String, String> personMap = o.readValue(givenString, Map.class);

        System.out.println(personMap);

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

        Files.write(imagePath, imageBytes);

        service.save(new Person(firstName, lastName, birthDate, healthStatus, imagePath));
    }

    @RequestMapping(value = "person/check", method = RequestMethod.POST, consumes = "text/plain")
    public void checkPerson(@RequestBody String givenString) throws IOException {
       // System.out.println(givenString);
        ObjectMapper o = new ObjectMapper();
        Map<String, String> personMap = o.readValue(givenString, Map.class);

       // System.out.println(personMap);


        String imageInB64 = personMap.get("image"); // B64 string encoded


        String base64Image = imageInB64.split(",")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

        int counter = service.getCounter();
        Path imagePath = Path.of(".\\uploads\\" + "_received" + counter + ".jpg");

        Files.write(imagePath, imageBytes);

        String basePicPath = "uploads\\";

        Set<String> allFilesNamesInUploadsFolder = service.listFilesUsingDirectoryStream(basePicPath, imagePath);

        String nameOfTheMostComparableImage = null;
        double maxAccuracy = 0;
        for (String currFileName : allFilesNamesInUploadsFolder){

            System.out.println(currFileName);
            double compareHist = service.compare_image(imagePath.toString(), basePicPath + currFileName);
            if(compareHist > maxAccuracy){
                nameOfTheMostComparableImage = currFileName;
                maxAccuracy = compareHist;
            }
        }
        if (maxAccuracy > 0.72) {
            System.out.println("face matching with image:" + nameOfTheMostComparableImage + " with " + maxAccuracy*100);
        } else {
            System.out.println("Face does not match");
        }

        service.searchPersonWithThisImagePath(nameOfTheMostComparableImage);


//        double compareHist = service.compare_image(imagePath.toString(), basePicPath + "ivan_proba.png");
//        System.out.println(compareHist);
//        if (compareHist > 0.72) {
//            System.out.println("face matching");
//        } else {
//            System.out.println("Face does not match");
//        }


        Files.delete(imagePath);
//
//        service.save(new Person(firstName, lastName, birthDate, healthStatus, imagePath));
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
