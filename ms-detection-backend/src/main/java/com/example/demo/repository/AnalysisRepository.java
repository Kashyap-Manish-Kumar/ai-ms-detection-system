
package com.example.demo.repository;

import com.example.demo.model.Analysis;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnalysisRepository extends MongoRepository<Analysis, String> {
}