package com.example.demo.service;





import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.core.io.FileSystemResource;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import java.io.File;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public void sendReport(
            String toEmail,
            String patientId,
            String reportPath
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true
                    );

            helper.setFrom(sender);

            helper.setTo(toEmail);

            helper.setSubject(
                    "MRI Analysis Report - Turing Body"
            );

            String htmlContent = """

            		<!DOCTYPE html>
            		<html>

            		<head>

            		    <style>

            		        body {
            		            font-family: Arial, sans-serif;
            		            background-color: #0f172a;
            		            margin: 0;
            		            padding: 0;
            		            color: #ffffff;
            		        }

            		        .container {
            		            max-width: 700px;
            		            margin: 40px auto;
            		            background: #111827;
            		            border-radius: 20px;
            		            overflow: hidden;
            		            border: 1px solid rgba(34,211,238,0.2);
            		            box-shadow: 0 0 30px rgba(34,211,238,0.1);
            		        }

            		        .header {
            		            background: linear-gradient(
            		                135deg,
            		                #06b6d4,
            		                #2563eb
            		            );

            		            padding: 40px;
            		            text-align: center;
            		        }

            		        .header h1 {
            		            margin: 0;
            		            font-size: 32px;
            		            color: white;
            		        }

            		        .content {
            		            padding: 40px;
            		        }

            		        .card {
            		            background: #0b1120;
            		            border: 1px solid rgba(34,211,238,0.15);
            		            border-radius: 16px;
            		            padding: 25px;
            		            margin-top: 25px;
            		        }

            		        .label {
            		            color: #67e8f9;
            		            font-size: 14px;
            		            margin-bottom: 8px;
            		        }

            		        .value {
            		            font-size: 20px;
            		            font-weight: bold;
            		            color: white;
            		        }

            		        .message {
            		            color: #cbd5e1;
            		            line-height: 1.8;
            		            margin-top: 25px;
            		        }

            		        .footer {
            		            padding: 30px;
            		            text-align: center;
            		            color: #94a3b8;
            		            font-size: 14px;
            		            border-top: 1px solid rgba(34,211,238,0.1);
            		        }

            		        .button {
            		            display: inline-block;
            		            margin-top: 30px;
            		            background: #06b6d4;
            		            color: #000000 !important;
            		            text-decoration: none;
            		            padding: 14px 28px;
            		            border-radius: 12px;
            		            font-weight: bold;
            		        }

            		        .highlight {
            		            color: #22d3ee;
            		            font-weight: bold;
            		        }

            		    </style>

            		</head>

            		<body>

            		    <div class="container">

            		        <div class="header">

            		            <h1>
            		              Ammu QuantumCare Hospital
            		            </h1>

            		        </div>

            		        <div class="content">

            		            <h2 style="color: #22d3ee;">
            		                Dear Patient,
            		            </h2>

            		            <p class="message">

            		                Your AI-powered MRI analysis has been completed successfully.

            		                Please find the attached clinical report PDF for detailed
            		                lesion analysis and diagnostic insights.

            		            </p>

            		            <div class="card">

            		                <div class="label">
            		                    Patient ID
            		                </div>

            		                <div class="value">
            		                    """ + patientId + """
            		                </div>

            		            </div>

            		            <p class="message">

            		                The report includes:

            		                <br><br>

            		                • Lesion detection analysis
            		                <br>
            		                • Disease severity estimation
            		                <br>
            		                • Brain region identification
            		                <br>
            		                • Statistical lesion measurements
            		                <br>
            		                • MRI overlay visualization

            		            </p>

            		            <p class="message">

            		                Please consult your neurologist or radiologist for further
            		                medical evaluation and treatment planning.

            		            </p>

            		            <a href="#"
            		               class="button">
            		               MRI Report Attached
            		            </a>

            		        </div>

            		        <div class="footer">

            		            Powered by
            		            <span class="highlight">
            		                Turing Body AI
            		            </span>

            		            <br><br>

            		            AI-Powered Multiple Sclerosis Detection System

            		        </div>

            		    </div>

            		</body>

            		</html>

            		""";

            		helper.setText(htmlContent, true);
            FileSystemResource file =
                    new FileSystemResource(
                            new File(reportPath)
                    );

            helper.addAttachment(
                    "MRI_Report.pdf",
                    file
            );

            mailSender.send(message);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Email Sending Failed"
            );
        }
    }
}