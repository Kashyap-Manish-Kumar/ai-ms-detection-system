
package com.example.demo.service;

import com.example.demo.model.MRIScan;
import com.example.demo.repository.MRIScanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MRIScanService {

    private final MRIScanRepository mriScanRepository;

    public MRIScanService(MRIScanRepository mriScanRepository) {
        this.mriScanRepository = mriScanRepository;
    }

    // Save MRI scan info
    public MRIScan saveScan(MRIScan scan) {
        return mriScanRepository.save(scan);
    }

    // Get scans for patient
    public List<MRIScan> getScansByPatient(String patientId) {
        return mriScanRepository.findAll()
                .stream()
                .filter(scan -> scan.getPatientId().equals(patientId))
                .toList();
    }
}