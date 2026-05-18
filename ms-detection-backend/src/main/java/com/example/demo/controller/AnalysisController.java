package com.example.demo.controller;

import com.example.demo.model.Analysis;

import java.util.List;
import com.example.demo.service.AnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    @PostMapping("/upload")
    public Analysis uploadMRI(
            @RequestParam String patientId,
            @RequestParam MultipartFile file
    ) throws IOException {

        return analysisService.analyzeMRI(patientId, file);
    }
    
    
    @GetMapping
    public List<Analysis> getAllAnalysis() {

        return analysisService.getAllAnalysis();
    }

    @DeleteMapping("/{id}")
    public void deleteAnalysis(
            @PathVariable String id
    ) {

        analysisService.deleteAnalysis(id);
    }
    
    
   
}