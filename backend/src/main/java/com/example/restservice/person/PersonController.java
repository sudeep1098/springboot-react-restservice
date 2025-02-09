package com.example.restservice.person;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/people")
public class PersonController {

    private final PersonRepository personRepository;

    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @PostMapping
    public Person addPerson(@RequestBody Person person) {
        return personRepository.save(person);
    }

    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable String id, @RequestBody Person updatedPerson) {
        Person existingPerson = personRepository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));

        existingPerson.setFirstName(updatedPerson.getFirstName());
        existingPerson.setLastName(updatedPerson.getLastName());
        return personRepository.save(existingPerson);
    }

    @GetMapping("/{id}")
    public Person getPeopleById(@PathVariable String id) {
        Person existingPerson = personRepository.findById(id).orElseThrow(() -> new RuntimeException("Person not found"));
        return existingPerson;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePerson(@PathVariable String id) {
        if (!personRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found");
        }
        personRepository.deleteById(id);
        return ResponseEntity.ok("Person deleted successfully");
    }

    @GetMapping
    public List<Person> getAllPeople() {
        return personRepository.findAll();
    }

    @GetMapping("/search")
    public List<Person> findByFirstName(@RequestParam String firstName) {
        return personRepository.findByFirstName(firstName);
    }
}
