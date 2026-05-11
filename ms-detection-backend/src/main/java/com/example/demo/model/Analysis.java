package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "analyses")
public class Analysis {

    @Id
    private String id;

    private String patientId;

    private int slicesAnalyzed;

    private int lesionSlices;

    private int volumeMm3;

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

    public int getSlicesAnalyzed() {
        return slicesAnalyzed;
    }

    public void setSlicesAnalyzed(int slicesAnalyzed) {
        this.slicesAnalyzed = slicesAnalyzed;
    }

    public int getLesionSlices() {
        return lesionSlices;
    }

    public void setLesionSlices(int lesionSlices) {
        this.lesionSlices = lesionSlices;
    }

    public int getVolumeMm3() {
        return volumeMm3;
    }

    public void setVolumeMm3(int volumeMm3) {
        this.volumeMm3 = volumeMm3;
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