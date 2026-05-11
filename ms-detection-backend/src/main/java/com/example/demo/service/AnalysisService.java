
package com.example.demo.service;

import com.example.demo.model.Analysis;
import com.example.demo.repository.AnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalysisService {

    private final AnalysisRepository analysisRepository;
    private final MLService mlService;

    public AnalysisService(AnalysisRepository analysisRepository,
                           MLService mlService) {
        this.analysisRepository = analysisRepository;
        this.mlService = mlService;
    }

    // Run ML analysis
    public String runAnalysis(String patientId) {

        String result = mlService.runAnalysis(patientId);

        return result;
    }

    // Save analysis
    public Analysis saveAnalysis(Analysis analysis) {
        return analysisRepository.save(analysis);
    }

    // Get analysis history
    public List<Analysis> getAllAnalyses() {
        return analysisRepository.findAll();
    }
}