package com.example.demo.dto;

import lombok.Data;

@Data
public class MLResponseDTO {

    private String status;

    private String prediction;

    private Statistics statistics;

    private Images images;

    private String report_pdf;

    @Data
    public static class Statistics {

        private Integer lesion_pixels;

        private Double volume_mm3;

        // NEW FIELDS
        private String disease_severity;

        private Integer total_lesions_detected;

        private Integer average_lesion_size_pixels;

        private Integer largest_lesion_area_pixels;

        private String primary_brain_region;
    }

    @Data
    public static class Images {

        private String mri;

        private String mask;

        private String overlay;
    }
}