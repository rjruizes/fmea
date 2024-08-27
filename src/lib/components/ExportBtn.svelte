<script lang="ts">
	import jsPDF from 'jspdf'
	import autoTable from 'jspdf-autotable'
  import { formData, submissionsList } from "$lib/store";
	import Button from "./Button.svelte";
	import s from './strings';
	import { calculateRiskAssessment } from '$lib/calculateRiskAssessment';
	import { Arial } from '$lib/fonts/Arial';
	import { calculateRpnPercentage, formatRpnPercentageMessage } from '$lib/calculateRpnPercentage';
	import TableFormCell from './TableFormCell.svelte';
  // import * as TableToExcel from "@linways/table-to-excel";

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
        [s['addl.comments'], firstSubmission.addlComments],
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
        const actionsTaken = submission.actionsTaken.map((actionTaken, i) => [`${s['action.taken']} #${i+1}`, actionTaken])

        finalY = (doc as any).lastAutoTable.finalY
        doc.text(s['corrective.actions'], 14, finalY + 15)
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

      // Additional comments
      if (submission.addlComments) {
        finalY = (doc as any).lastAutoTable.finalY
        // doc.text(s['addl.comments'], 14, finalY + 15)
        autoTable(doc, {
          theme: 'grid',
          startY: finalY + 8,
          columnStyles: {
            0: {cellWidth: FIRST_COL_WIDTH},
          },
          styles: {
            font: 'arial',
            fontStyle: 'normal',
          },
          body: [
            [s['addl.comments'], submission.addlComments],
          ],
        })
      }
    })

    // Signature line and date
    finalY = (doc as any).lastAutoTable.finalY
    // doc.text(s['signature.line'], 14, finalY + 15)
    autoTable(doc, {
      theme: 'grid',
      startY: finalY + 20,
      // columnStyles: {
      //   0: {cellWidth: FIRST_COL_WIDTH},
      // },
      styles: {
        font: 'arial',
        fontStyle: 'normal',
      },
      body: [
        [{
          content: 'Signature',
          styles: {
            lineColor: 'black',
            lineWidth: {
              top: 0.25,
            },
          },
        },
        {
          content: '',
          styles: {
            lineWidth: {},
          },
        },
        {
          content: s['date'],
          styles: {
            lineColor: 'black',
            lineWidth: {
              top: 0.25,
            },
          },
        }],
        [
          { content: '', styles: { lineWidth: {} }},
          { content: '', styles: { lineWidth: {} }},
          { content: '', styles: { lineWidth: {} }},
        ],
        [{
          content: 'Signature',
          styles: {
            lineColor: 'black',
            lineWidth: {
              top: 0.25,
            },
          },
        },
        {
          content: '',
          styles: { lineWidth: {}, },
        },
        {
          content: s['date'],
          styles: {
            lineColor: 'black',
            lineWidth: {
              top: 0.25,
            },
          },
        }],
      ],
    })

    doc.save('fmea.pdf')
  }

  function exportCsv() {
    window['TableToExcel'].convert(document.getElementById("table1"))
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/gh/linways/table-to-excel/dist/tableToExcel.js"></script>
</svelte:head>
<div class="hidden">
  <table id="table1" data-cols-width="26,16,8,26">
    <tr data-height='33'>
      <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
        Forensic Science FMEA
      </td>
    </tr>
    <tr data-height='20'>
      <TableFormCell>{s['risk.to.be.evaluated']}</TableFormCell>
      <TableFormCell colspan={3}>{$formData.riskType === 'nonConformance' ? s['non.conformance'] : s['area.of.concern']}</TableFormCell>
    </tr>
    <tr data-height='20'>
      <TableFormCell>{s['qa.manager']}</TableFormCell>
      <TableFormCell colspan={3}>{$formData.qaManager}</TableFormCell>
    </tr>
    <tr data-height='20'>
      <TableFormCell>{s['prepared.by']}</TableFormCell>
      <TableFormCell colspan={3}>{$formData.preparer}</TableFormCell>
    </tr>
    <tr data-height='20'>
      <TableFormCell>{s['car.num']}</TableFormCell>
      <TableFormCell colspan={3}>{$formData.carNum}</TableFormCell>
    </tr>
    <tr data-height='20'>
      <TableFormCell>{s['fmea.num']}</TableFormCell>
      <TableFormCell colspan={3}>{$formData.fmeaNum}</TableFormCell>
    </tr>
    <tr data-height='20'>
      <TableFormCell>{s['date']}</TableFormCell>
      <TableFormCell colspan={3}>{String($formData.date)}</TableFormCell>
    </tr>
    <tr data-height='26'>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr data-height="20">
      <!-- First submission -->
      <TableFormCell>{s['process']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].process)}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['failure']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].failure)}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['effect']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].effect)}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['severity']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].severity)}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['cause']}</TableFormCell>
      <TableFormCell colspan={3}>{$submissionsList[0].cause}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['occurrence']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].occurrence)}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['controls']}</TableFormCell>
      <TableFormCell colspan={3}>{$submissionsList[0].controls}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s['detection']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].detection)}</TableFormCell>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr data-height='33'>
      <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
        Risk Assessment
      </td>
    </tr>
    <tr data-height="20">
      <!-- Risk assessment -->
      <TableFormCell>{s['rpn.score']}</TableFormCell>
      <TableFormCell colspan={3}>{String($submissionsList[0].rpn)}</TableFormCell>
    </tr>
    <tr data-height="20">
      <TableFormCell>{s["rpn.description"]}</TableFormCell>
      <TableFormCell colspan={3}>{calculateRiskAssessment($submissionsList[0].rpn, $submissionsList[0].severity).label}</TableFormCell>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    {#if $submissionsList[0].rpn > 9}
      <tr data-height='33'>
        <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
          {s['corrective.actions']}
        </td>
      </tr>
      {#each $submissionsList[0].actionsTaken as actionTaken, i}
        <tr data-height="20">
          <!-- Corrective actions -->
          <TableFormCell>{s['action.taken']} #{i+1}</TableFormCell>
          <TableFormCell colspan={3}>{actionTaken}</TableFormCell>
        </tr>
      {/each}
      <tr data-height="20">
        <TableFormCell>{s['carpar']}</TableFormCell>
        <TableFormCell colspan={3}>{$submissionsList[0].carpar}</TableFormCell>
      </tr>

      {#if $submissionsList[0].addlComments}
        <tr>
          <TableFormCell>{s['addl.comments']}</TableFormCell>
          <TableFormCell colspan={3}>{$submissionsList[0].addlComments}</TableFormCell>
        </tr>
      {/if}
    {/if}

    {#each $submissionsList.slice(1) as submission, i}
      <tr data-height='33'>
        <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
          Rescore
        </td>
      </tr>
      <tr data-height="20">
        <!-- Rescore -->
        <TableFormCell>{s['severity']}</TableFormCell>
        <TableFormCell colspan={3}>{String(submission.severity)}</TableFormCell>
      </tr>
      <tr data-height="20">
        <TableFormCell>{s['occurrence']}</TableFormCell>
        <TableFormCell colspan={3}>{String(submission.occurrence)}</TableFormCell>
      </tr>
      <tr data-height="20">
        <TableFormCell>{s['detection']}</TableFormCell>
        <TableFormCell colspan={3}>{String(submission.detection)}</TableFormCell>
      </tr>
      <tr data-height='33'>
        <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
          Risk Assessment
        </td>
      </tr>
      <tr data-height="20">
        <!-- Risk assessment -->
        <TableFormCell>{s['rpn.score']}</TableFormCell>
        <TableFormCell colspan={3}>{String(submission.rpn)}</TableFormCell>
      </tr>
      <tr data-height="20">
        <TableFormCell>{s["rpn.description"]}</TableFormCell>
        <TableFormCell colspan={3}>{calculateRiskAssessment(submission.rpn, submission.severity).label}</TableFormCell>
      </tr>
      {#if submission.rpn > 9}
        <tr data-height='33'>
          <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
            {s['corrective.actions']}
          </td>
        </tr>
        {#each submission.actionsTaken as actionTaken, i}
          <tr data-height="20">
            <!-- Corrective actions -->
            <TableFormCell>{s['action.taken']} #{i+1}</TableFormCell>
            <TableFormCell colspan={3}>{actionTaken}</TableFormCell>
          </tr>
        {/each}
        <tr data-height="20">
          <TableFormCell>{s['carpar']}</TableFormCell>
          <TableFormCell colspan={3}>{submission.carpar}</TableFormCell>
        </tr>
      {/if}

      {#if submission.addlComments}
        <tr data-height='33'>
          <td colspan="4" data-f-sz="14" data-f-bold="true" data-a-v='middle'>
            Additional Comments
          </td>
        </tr>
        <tr data-height="20">
          <!-- Additional comments -->
          <TableFormCell colspan={4}>{submission.addlComments}</TableFormCell>
        </tr>
      {/if}
    {/each}
  </table>
</div>

<Button class="max-w-xs bg-gray-600 hover:bg-gray-500" on:click={exportPdf} >Export PDF</Button>
<Button class="max-w-xs bg-gray-600 hover:bg-gray-500" on:click={exportCsv} >Export Excel</Button>
