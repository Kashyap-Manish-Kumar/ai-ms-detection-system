package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MLService {

    private final String ML_API_URL = "http://localhost:8000/predict";

    public String runAnalysis(String patientId) {

        String url = ML_API_URL + "?patient_id=" + patientId;

        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.postForObject(url, null, String.class);

        return response;
    }
}