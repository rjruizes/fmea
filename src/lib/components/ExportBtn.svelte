<script lang="ts">
	import jsPDF from 'jspdf'
	import autoTable from 'jspdf-autotable'
  import { formData, submissionsList } from "$lib/store";
	import Button from "./Button.svelte";
	import s from './strings';
	import { calculateRiskAssessment } from '$lib/calculateRiskAssessment';
	import { Arial } from '$lib/fonts/Arial';
	import { calculateRpnPercentage, formatRpnPercentageMessage } from '$lib/calculateRpnPercentage';

  function exportPdf() {
    const doc = new jsPDF()
    doc.addFileToVFS('Arial-Regular.ttf', Arial)
    doc.addFont('Arial-Regular.ttf', 'arial', 'normal')
    doc.setFont('arial', 'normal');
    const FIRST_COL_WIDTH = 55
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12);
    doc.text("Forensic Science FMEA", 14, 14)
    let finalY = 20

    autoTable(doc, {
      theme: 'grid',
      startY: finalY,
      columnStyles: {
        0: {cellWidth: FIRST_COL_WIDTH},
      },
      styles: {
        font: 'arial',
        fontStyle: 'normal',
      },
      body: [
        [s['risk.to.be.evaluated'], $formData.riskType === 'nonConformance' ? s['non.conformance'] : s['area.of.concern']],
        [s['qa.manager'], $formData.qaManager],
        [s['prepared.by'], $formData.preparer],
        [s['car.num'], $formData.carNum],
        [s['fmea.num'], $formData.fmeaNum],
        [s['date'], String($formData.date)]
      ],
    })
    finalY = (doc as any).lastAutoTable.finalY

    // First submission
    const firstSubmission = $submissionsList[0]
    autoTable(doc, {
      theme: 'grid',
      startY: finalY + 10,
      columnStyles: {
        0: {cellWidth: FIRST_COL_WIDTH},
      },
      styles: {
        font: 'arial',
        fontStyle: 'normal',
      },
      body: [
        [s['process'], String(firstSubmission.process)],
        [s['failure'], String(firstSubmission.failure)],
        [s['effect'], String(firstSubmission.effect)],
        [s['severity'], String(firstSubmission.severity)],
        [s['cause'], firstSubmission.cause],
        [s['occurrence'], String(firstSubmission.occurrence)],
        [s['controls'], firstSubmission.controls],
        [s['detection'], String(firstSubmission.detection)],
      ],
    })
    finalY = (doc as any).lastAutoTable.finalY

    // Risk assessment
    doc.text(s['risk.assessment'], 14, finalY + 15)
    autoTable(doc, {
      theme: 'grid',
      startY: finalY + 20,
      columnStyles: {
        0: {cellWidth: FIRST_COL_WIDTH},
      },
      styles: {
        font: 'arial',
        fontStyle: 'normal',
      },
      body: [
        [s['rpn.score'], String(firstSubmission.rpn)],
        [s["rpn.description"], calculateRiskAssessment(firstSubmission.rpn, firstSubmission.severity).label],
      ],
    })

    // Corrective actions
    finalY = (doc as any).lastAutoTable.finalY
    doc.text(s['corrective.actions'], 14, finalY + 15)
    const actionsTaken = firstSubmission.actionsTaken.map((actionTaken, i) => [`${s['action.taken']} #${i+1}`, actionTaken])
    autoTable(doc, {
      theme: 'grid',
      startY: finalY + 20,
      columnStyles: {
        0: {cellWidth: FIRST_COL_WIDTH},
      },
      styles: {
        font: 'arial',
        fontStyle: 'normal',
      },
      body: [
        ...actionsTaken,
        [s['carpar'], firstSubmission.carpar],
      ],
    })

    // Rest of submissions
    const restOfSubmissions = $submissionsList.slice(1)
    restOfSubmissions.forEach((submission, i) => {
      finalY = (doc as any).lastAutoTable.finalY
      doc.text(s["rescore"], 14, finalY + 15)
      autoTable(doc, {
        theme: 'grid',
        startY: finalY + 20,
        columnStyles: {
          0: {cellWidth: FIRST_COL_WIDTH},
        },
        styles: {
          font: 'arial',
          fontStyle: 'normal',
        },
        body: [
          [s['severity'], String(submission.severity)],
          [s['occurrence'], String(submission.occurrence)],
          [s['detection'], String(submission.detection)],
        ],
      })

      console.log($submissionsList, i)
      const rpnPercentageChange = calculateRpnPercentage($submissionsList[i].rpn, submission.rpn)
      finalY = (doc as any).lastAutoTable.finalY
      doc.text(s["risk.assessment"], 14, finalY + 15)
      autoTable(doc, {
        theme: 'grid',
        startY: finalY + 20,
        columnStyles: {
          0: {cellWidth: FIRST_COL_WIDTH},
        },
        styles: {
          font: 'arial',
          fontStyle: 'normal',
        },
        body: [
          [s['rpn.score'], String(submission.rpn)],
          [formatRpnPercentageMessage(rpnPercentageChange), String(rpnPercentageChange)+'%'],
          [s["rpn.description"], calculateRiskAssessment(submission.rpn, submission.severity).label],
        ],
      })

      if (submission.rpn > 9) {
        finalY = (doc as any).lastAutoTable.finalY
        doc.text(s['corrective.actions'], 14, finalY + 15)
        const actionsTaken = submission.actionsTaken.map((actionTaken, i) => [`${s['action.taken']} #${i+1}`, actionTaken])
        autoTable(doc, {
          theme: 'grid',
          startY: finalY + 20,
          columnStyles: {
            0: {cellWidth: FIRST_COL_WIDTH},
          },
          styles: {
            font: 'arial',
            fontStyle: 'normal',
          },
          body: [
            ...actionsTaken,
            [s['carpar'], submission.carpar],
          ],
        })
      }
    })

    doc.save('fmea.pdf')
  }
</script>

<Button class="max-w-xs bg-gray-600 hover:bg-gray-500" on:click={exportPdf} >Export PDF</Button>