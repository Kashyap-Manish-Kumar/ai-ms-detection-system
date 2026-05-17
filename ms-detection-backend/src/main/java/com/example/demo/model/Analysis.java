package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "analyses")
public class Analysis {

    @Id
    private String id;

    private String patientId;

    // Prediction Result
    private String prediction;

    // Statistics
    private Integer lesionPixels;

    private Double lesionVolume;

    // NEW FIELDS
    private String diseaseSeverity;

    private Integer totalLesionsDetected;

    private Integer averageLesionSizePixels;

    private Integer largestLesionAreaPixels;

    private String primaryBrainRegion;

    // Images
    private String originalMriImage;

    private String maskImage;

    private String overlayImage;

    // PDF
    private String reportPdf;

    private String reportPath;

    private LocalDateTime createdAt;

    public Analysis() {
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    public Integer getLesionPixels() {
        return lesionPixels;
    }

    public void setLesionPixels(Integer lesionPixels) {
        this.lesionPixels = lesionPixels;
    }

    public Double getLesionVolume() {
        return lesionVolume;
    }

    public void setLesionVolume(Double lesionVolume) {
        this.lesionVolume = lesionVolume;
    }

    // NEW GETTERS & SETTERS

    public String getDiseaseSeverity() {
        return diseaseSeverity;
    }

    public void setDiseaseSeverity(String diseaseSeverity) {
        this.diseaseSeverity = diseaseSeverity;
    }

    public Integer getTotalLesionsDetected() {
        return totalLesionsDetected;
    }

    public void setTotalLesionsDetected(Integer totalLesionsDetected) {
        this.totalLesionsDetected = totalLesionsDetected;
    }

    public Integer getAverageLesionSizePixels() {
        return averageLesionSizePixels;
    }

    public void setAverageLesionSizePixels(Integer averageLesionSizePixels) {
        this.averageLesionSizePixels = averageLesionSizePixels;
    }

    public Integer getLargestLesionAreaPixels() {
        return largestLesionAreaPixels;
    }

    public void setLargestLesionAreaPixels(Integer largestLesionAreaPixels) {
        this.largestLesionAreaPixels = largestLesionAreaPixels;
    }

    public String getPrimaryBrainRegion() {
        return primaryBrainRegion;
    }

    public void setPrimaryBrainRegion(String primaryBrainRegion) {
        this.primaryBrainRegion = primaryBrainRegion;
    }

    public String getOriginalMriImage() {
        return originalMriImage;
    }

    public void setOriginalMriImage(String originalMriImage) {
        this.originalMriImage = originalMriImage;
    }

    public String getMaskImage() {
        return maskImage;
    }

    public void setMaskImage(String maskImage) {
        this.maskImage = maskImage;
    }

    public String getOverlayImage() {
        return overlayImage;
    }

    public void setOverlayImage(String overlayImage) {
        this.overlayImage = overlayImage;
    }

    public String getReportPdf() {
        return reportPdf;
    }

    public void setReportPdf(String reportPdf) {
        this.reportPdf = reportPdf;
    }

    public String getReportPath() {
        return reportPath;
    }

    public void setReportPath(String reportPath) {
        this.reportPath = reportPath;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}