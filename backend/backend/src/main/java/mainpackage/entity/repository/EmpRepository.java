package mainpackage.entity.repository;

import mainpackage.entity.Employee;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmpRepository {
    List<Employee> employees = new ArrayList<>();


}
