/*package com.example.demo.service;

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
}*/


package com.example.demo.service;

import com.example.demo.dto.MLResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;

@Service
@RequiredArgsConstructor
public class MLService {

    private final RestTemplate restTemplate;

    @Value("${ml.api.url}")
    private String mlApiUrl;
    
    public MLResponseDTO analyzeMRI(File file) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", new FileSystemResource(file));

        HttpEntity<MultiValueMap<String, Object>> requestEntity =
                new HttpEntity<>(body, headers);

        ResponseEntity<MLResponseDTO> response =
                restTemplate.exchange(
                        mlApiUrl + "/predict-upload",
                        HttpMethod.POST,
                        requestEntity,
                        MLResponseDTO.class
                );

        return response.getBody();
    }
}