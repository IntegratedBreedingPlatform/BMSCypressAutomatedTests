const XLSX = require("xlsx");

// This will append observation plots for Import Crosses template.
export function generateImportCrossesTestData (fileName: string) {
    let workbook = XLSX.readFile(fileName); // reads original file
    let sheetName = workbook.SheetNames[1]; //get 'Observation' sheet
    let workSheet = workbook.Sheets[sheetName];
    XLSX.utils.sheet_add_aoa(workSheet, [['1']], {origin: 'A2'});
    XLSX.utils.sheet_add_aoa(workSheet, [['2']], {origin: 'A3'});
    XLSX.utils.sheet_add_aoa(workSheet, [['3']], {origin: 'A4'});
    XLSX.utils.sheet_add_aoa(workSheet, [['4']], {origin: 'A5'});
    XLSX.utils.sheet_add_aoa(workSheet, [['5']], {origin: 'A6'});
    XLSX.utils.sheet_add_aoa(workSheet, [['6']], {origin: 'C2'});
    XLSX.utils.sheet_add_aoa(workSheet, [['7']], {origin: 'C3'});
    XLSX.utils.sheet_add_aoa(workSheet, [['8']], {origin: 'C4'});
    XLSX.utils.sheet_add_aoa(workSheet, [['9']], {origin: 'C5'});
    XLSX.utils.sheet_add_aoa(workSheet, [['10']], {origin: 'C6'});
    XLSX.writeFile(workbook, fileName); // write the same file with new values

    // explicitly return null to signal that the given event has been handled.
    return null;
  }

