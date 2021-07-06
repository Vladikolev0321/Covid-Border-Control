package com.example.demo2.student;

import org.springframework.stereotype.Service;

import javax.ws.rs.client.Client;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private List<Student> students;

    public StudentService() {
        students = new ArrayList<>();
    }

    public List<Student> getStudents(){
//        return List.of(
//                new Student(
//                        1L, "Mariam", 21
//                ),
//                new Student(
//                        2L, "Pesho", 20
//                )
        return students;
        //);

    }

    public void addStudent(Long id, String name, Integer age){
        students.add(new Student(id, name, age));
    }
    public void deleteStudent(Long id){
        Student studentWithThisId = students.stream().filter(s -> s.getId() == id).findFirst().orElse(null);

        students.remove(studentWithThisId);
    }
    public void updateStudent(Long id){
        Student studentToUpdate = students.stream().filter(s -> s.getId() == id).findFirst().orElse(null);
        studentToUpdate.setName(studentToUpdate.getName() + " Updated");

    }
}
