package com.example.demo.service;

import com.example.demo.dto.MLResponseDTO;
import com.example.demo.model.Analysis;
import com.example.demo.model.Patient;
import com.example.demo.repository.AnalysisRepository;
import com.example.demo.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AnalysisService {

    private final MLService mlService;

    private final AnalysisRepository analysisRepository;

    private final PatientRepository patientRepository;
    
    private final EmailService emailService;

    
    
    
    public void sendReport(String analysisId) {

        Analysis analysis =
                analysisRepository.findById(analysisId)
                .orElseThrow();

        Patient patient =
                patientRepository.findById(
                        analysis.getPatientId()
                ).orElseThrow();

        String reportUrl =
                "https://manditake-om-turing-body-ml-api.hf.space"
                + analysis.getReportPdf();

        emailService.sendReport(
                patient.getEmail(),
                patient.getId(),
                reportUrl
        );
    }
    
    public List<Analysis> getAllAnalysis() {

        return analysisRepository.findAll();
    }

    public void deleteAnalysis(String id) {

        analysisRepository.deleteById(id);
    }
    
    // FIXED HERE
    public Analysis analyzeMRI(String patientId, MultipartFile multipartFile)
            throws IOException {

        File tempFile = File.createTempFile(
                "mri_",
                multipartFile.getOriginalFilename()
        );

        multipartFile.transferTo(tempFile);

        MLResponseDTO mlResponse = mlService.analyzeMRI(tempFile);

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient Not Found"));

        Analysis analysis = new Analysis();

        analysis.setPatientId(patient.getId());

        analysis.setPrediction(
                mlResponse.getPrediction()
        );
        

        if (mlResponse.getStatistics() != null) {

            analysis.setLesionPixels(
                    mlResponse.getStatistics().getLesion_pixels()
            );

            analysis.setLesionVolume(
                    mlResponse.getStatistics().getVolume_mm3()
            );

            // NEW FIELDS
            analysis.setDiseaseSeverity(
                    mlResponse.getStatistics().getDisease_severity()
            );

            analysis.setTotalLesionsDetected(
                    mlResponse.getStatistics().getTotal_lesions_detected()
            );

            analysis.setAverageLesionSizePixels(
                    mlResponse.getStatistics().getAverage_lesion_size_pixels()
            );

            analysis.setLargestLesionAreaPixels(
                    mlResponse.getStatistics().getLargest_lesion_area_pixels()
            );

            analysis.setPrimaryBrainRegion(
                    mlResponse.getStatistics().getPrimary_brain_region()
            );
        }

        if (mlResponse.getImages() != null) {

            analysis.setOriginalMriImage(
                    mlResponse.getImages().getMri()
            );

            analysis.setMaskImage(
                    mlResponse.getImages().getMask()
            );

            analysis.setOverlayImage(
                    mlResponse.getImages().getOverlay()
            );
        }

        analysis.setReportPdf(
                mlResponse.getReport_pdf()
        );

        return analysisRepository.save(analysis);
    }
}