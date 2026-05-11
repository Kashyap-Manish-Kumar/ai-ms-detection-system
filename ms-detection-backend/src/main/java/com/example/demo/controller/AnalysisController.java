package com.example.demo.controller;

import com.example.demo.model.Analysis;
import com.example.demo.service.AnalysisService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    // Run MRI analysis
    @PostMapping("/run/{patientId}")
    public String runAnalysis(@PathVariable String patientId) {

        return analysisService.runAnalysis(patientId);
    }

    // Save analysis result
    @PostMapping("/save")
    public Analysis saveAnalysis(@RequestBody Analysis analysis) {

        return analysisService.saveAnalysis(analysis);
    }

    // Get analysis history
    @GetMapping
    public List<Analysis> getAllAnalyses() {

        return analysisService.getAllAnalyses();
    }
}