from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle, Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4

import numpy as np
import cv2
from scipy import ndimage


def classify_severity(volume):
    if volume < 200:
        return "Mild MS"
    elif volume < 800:
        return "Moderate MS"
    else:
        return "Severe MS"


# -----------------------------
# Lesion Statistics Function
# -----------------------------
def compute_lesion_statistics(mask_path="lesion_mask.png"):

    mask = cv2.imread(mask_path, 0)

    if mask is None:
        return 0, 0, 0

    _, mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)

    labeled, num_features = ndimage.label(mask)

    lesion_sizes = ndimage.sum(mask, labeled, range(1, num_features + 1))

    if len(lesion_sizes) > 0:
        avg_size = int(np.mean(lesion_sizes))
        max_size = int(np.max(lesion_sizes))
    else:
        avg_size = 0
        max_size = 0

    return num_features, avg_size, max_size


def generate_report(patient_id,
                    slices_analyzed,
                    lesion_slices,
                    total_pixels,
                    volume_mm3,
                    output_file):

    severity = classify_severity(volume_mm3)

    lesion_count, avg_size, max_size = compute_lesion_statistics()

    width, height = A4
    c = canvas.Canvas(output_file, pagesize=A4)

    # Page Border
    c.setLineWidth(2)
    c.rect(15, 15, width-30, height-30)

    y = height - 50

    # Header
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(width/2, y, "AI MRI Lesion Detection System")

    y -= 18
    c.setFont("Helvetica", 10)
    c.drawCentredString(width/2, y, "Developed by Manish Kashyap")

    y -= 12
    c.line(40, y, width-40, y)

    y -= 30
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(width/2, y,
        "Multiple Sclerosis MRI Analysis Report")

    y -= 40

    # -----------------------------
    # Report Information
    # -----------------------------
    report_data = [
        ["I. Report Information", ""],
        ["Patient ID", patient_id],
        ["MRI Slices Analyzed", slices_analyzed]
    ]

    table1 = Table(report_data, colWidths=[260, 260])

    table1.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(1,0),colors.red),
        ("TEXTCOLOR",(0,0),(1,0),colors.white),
        ("SPAN",(0,0),(1,0)),
        ("ALIGN",(0,0),(1,0),"CENTER"),
        ("GRID",(0,0),(-1,-1),1,colors.black)
    ]))

    w, h = table1.wrap(0, 0)
    table1.drawOn(c, (width-w)/2, y-h)

    y = y - h - 25

    # -----------------------------
    # Lesion Summary
    # -----------------------------
    analysis_data = [
        ["II. AI Lesion Detection Summary", ""],
        ["Lesion Slices Detected", lesion_slices],
        ["Total Lesion Pixels", total_pixels],
        ["Estimated Lesion Volume (mm³)", volume_mm3],
        ["Disease Severity", severity]
    ]

    table2 = Table(analysis_data, colWidths=[260, 260])

    table2.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(1,0),colors.red),
        ("TEXTCOLOR",(0,0),(1,0),colors.white),
        ("SPAN",(0,0),(1,0)),
        ("ALIGN",(0,0),(1,0),"CENTER"),
        ("GRID",(0,0),(-1,-1),1,colors.black)
    ]))

    w, h = table2.wrap(0, 0)
    table2.drawOn(c, (width-w)/2, y-h)

    y = y - h - 40

    # Visualization title
    c.setFont("Helvetica-Bold", 13)
    c.drawCentredString(width/2, y,
        "MRI Lesion Detection Visualization")

    y -= 30

    try:

        img1 = Image("mri_slice.png", width=160, height=160)
        img2 = Image("lesion_mask.png", width=160, height=160)
        img3 = Image("lesion_overlay.png", width=160, height=160)

        image_table = Table([
            [img1, img2, img3],
            ["Input MRI", "Detected Lesion Mask", "Mask Overlay on MRI"]
        ], colWidths=[180,180,180])

        image_table.setStyle(TableStyle([
            ("ALIGN",(0,0),(-1,-1),"CENTER"),
            ("FONTNAME",(0,1),(-1,1),"Helvetica-Bold"),
            ("FONTSIZE",(0,1),(-1,1),10),
            ("TOPPADDING",(0,1),(-1,1),12),
        ]))

        w, h = image_table.wrap(0, 0)
        image_table.drawOn(c, (width-w)/2, y-h)

        y = y - h - 40

    except Exception as e:
        print("Image loading error:", e)

    # Lesion Statistics
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(width/2, y, "III. Lesion Statistics")

    y -= 25

    stats_data = [
        ["Total Lesions Detected", lesion_count],
        ["Average Lesion Size (pixels)", avg_size],
        ["Largest Lesion Area (pixels)", max_size],
        ["Primary Brain Region", "Periventricular"]
    ]

    stats_table = Table(stats_data, colWidths=[260, 260])

    stats_table.setStyle(TableStyle([
        ("GRID",(0,0),(-1,-1),1,colors.black),
        ("BACKGROUND",(0,0),(0,-1),colors.lightgrey)
    ]))

    w, h = stats_table.wrap(0,0)
    stats_table.drawOn(c, (width-w)/2, y-h)

    # Footer
    c.line(40, 80, width-40, 80)

    c.setFont("Helvetica", 9)

    c.drawString(50, 60, "AI Assisted Diagnosis Tool")
    c.drawCentredString(width/2, 60, "Research & Clinical Support")
    c.drawRightString(width-50, 60, "Page 1 of 1")

    c.drawCentredString(width/2, 45,
        "Generated using Deep Learning MRI Lesion Segmentation Model")

    c.save()

    print("Report generated:", output_file)