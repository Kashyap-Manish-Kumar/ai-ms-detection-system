
package com.example.demo.repository;

import com.example.demo.model.MRIScan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MRIScanRepository extends MongoRepository<MRIScan, String> {
}