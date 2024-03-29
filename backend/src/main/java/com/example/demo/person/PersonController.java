package com.example.demo.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    @ResponseBody
    public String hello(){
        return "Hello, Spring!";
    }

    @GetMapping(value = "/person/get_all")
    @ResponseBody
    public List<Person> getPeople(){
        return service.getAll();
    }

    @RequestMapping(value="person/create", method = RequestMethod.POST, consumes = "application/json")
    @CrossOrigin(origins = "https://register.tuesbordercontrol.com/")
    @ResponseBody
    public Person createPerson(@RequestBody Map<String, String> personMap) throws IOException {

        String firstName = personMap.get("firstName");
        String lastName = personMap.get("lastName");
        LocalDate birthDate = LocalDate.parse(personMap.get("birthdate"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        HealthStatus healthStatus = HealthStatus.valueOf(personMap.get("healthStatus"));
        String imageInB64 = personMap.get("image"); // B64 string encoded

        String base64Image = imageInB64.split(",")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

        Path imagePath = Path.of(".\\uploads\\" + firstName + "_" + lastName + "_" + birthDate + ".jpg");

        Files.write(imagePath, imageBytes);
        Person p = new Person(firstName, lastName, birthDate, healthStatus, imagePath);
        service.save(p);

        return p;
    }

    @RequestMapping(value = "person/check", method = RequestMethod.POST, consumes = "application/json")
    @CrossOrigin(origins = "https://verify.tuesbordercontrol.com/")
    @ResponseBody
    public Person checkPerson(@RequestBody Map<String, String> im) throws IOException {
        String imageInB64 = im.get("image"); // B64 string encoded

        String base64Image = imageInB64.split(",")[1];
        byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

        int counter = service.getCounter();
        Path imagePath = Path.of(".\\uploads\\" + "_received" + counter + ".jpg");

        Files.write(imagePath, imageBytes);

        String basePicPath = ".\\uploads\\";

        Set<String> allFilesNamesInUploadsFolder = service.listFilesUsingDirectoryStream(basePicPath, imagePath);

        String nameOfTheMostComparableImage = null;
        double maxAccuracy = 0;
        for (String currFileName : allFilesNamesInUploadsFolder) {

            double compareHist = service.compare_image(imagePath.toString(), basePicPath + currFileName);
            if (compareHist > maxAccuracy) {
                nameOfTheMostComparableImage = currFileName;
                maxAccuracy = compareHist;
            }
        }
        System.out.println(maxAccuracy);

        if (maxAccuracy > 0.72) {
            System.out.println("face matching with image:" + nameOfTheMostComparableImage + " with " + maxAccuracy * 100);
        } else {
            System.out.println("Face does not match");
        }

        Person personWithThisImagePath = service.searchPersonWithThisImagePath(nameOfTheMostComparableImage);

        Files.delete(imagePath);
        return personWithThisImagePath;
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
