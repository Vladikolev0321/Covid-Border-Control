package com.example.demo2.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
public class StudentController {


    private final StudentService studentService;
    //// For db
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping("/hello")
    public List<Student> getStudents(){
        return studentService.getStudents();
    }

    // Accessing the db contents

    @GetMapping("/students")
    public List<Student> index(){
        return studentRepository.findAll();
    }

    // Create
    @PostMapping("/students/create")
    //  @ResponseBody
    public Student createStudent(@RequestBody Student student){
//        System.out.println(body);
//        String name = body.get("name");
//        Integer age = Integer.parseInt(body.get("age"));
        return studentRepository.save(student);
    }

    // Read
//        Integer age = Integer.parseInt(body.get("age"));
    @GetMapping("/students/{id}")
    public Student show(@PathVariable("id") Long id){
        // return studentRepository.findOne(id).orElse(null);
        return studentRepository.findById(id).orElse(null);
    }



//    @PostMapping("/students")
//    @ResponseBody
//    public Student create(@RequestBody Map<String, String> body){
//        String name = body.get("name");
//        Integer age = Integer.parseInt(body.get("age"));
//        return studentRepository.save(new Student(name, age));
//    }

    // Update
    @PutMapping("/students/{id}")
    public Student update(@PathVariable("id") long id, @RequestBody Map<String, String> body){
       // int studentId = Integer.parseInt(id);
        // getting blog
        Student student = studentRepository.findById(id).orElse(null);

        if(student != null){
            student.setName(body.get("name"));
            student.setAge(Integer.parseInt(body.get("age")));
            return studentRepository.save(student);
        }
        return null;
    }

    // Delete
    @DeleteMapping("students/{id}")
    public void delete(@PathVariable("id") long id){
        studentRepository.deleteById(id);
    }



    //

    // Accessing the made student service
    @RequestMapping(value = "/generate", method = RequestMethod.GET)
    @ResponseBody
    public void generateProfile() {

        studentService.addStudent(4L, "added", 34);
    }

    @RequestMapping(value = "/profile/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Student getProfileWithId(@PathVariable("id") long id) {

        var students = studentService.getStudents();
        return students.stream().filter(s -> s.getId() == id).findFirst().orElse(null);
    }

    @RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
    @ResponseBody
    public List<Student> getAllUsers() {

        return studentService.getStudents();
    }

    @RequestMapping(value = "/delete/{id}")
    @ResponseBody
    public void deleteProfileWithThisId(@PathVariable("id") long id) {

//        var students = studentService.getStudents();
//        var studentToRemove = students.stream().filter(s -> s.getId() == id).findFirst().orElse(null);
        studentService.deleteStudent(id);
    }

    @RequestMapping(value = "/update/{id}")
   // @ResponseBody
    public void update(@PathVariable("id") long id) {
        studentService.updateStudent(id);

    }



}
