import jsPDF from 'jspdf';

export const downloadPDF = (schedule, weeks, getDayName) => {
  const doc = new jsPDF();

  // Add Title
  doc.setFontSize(18);
  doc.text(`${weeks}-Week Meal Plan`, 10, 10);

  let yOffset = 20; // Y-offset for content placement

  // Iterate through the schedule
  schedule.forEach((week, weekIndex) => {
    doc.setFontSize(14);
    doc.text(`Week ${weekIndex + 1}`, 10, yOffset);
    yOffset += 10;

    week.lunch.forEach((_, dayIndex) => {
      doc.setFontSize(12);
      doc.text(`${getDayName(dayIndex)}`, 10, yOffset);
      yOffset += 6;

      doc.text(`Lunch: ${week.lunch[dayIndex]}`, 20, yOffset);
      yOffset += 6;

      doc.text(`Dinner: ${week.dinner[dayIndex]}`, 20, yOffset);
      yOffset += 10;

      // If yOffset exceeds page height, add a new page
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 10;
      }
    });
  });

  // Save the PDF
  doc.save('meal-schedule.pdf');
};
