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

  // This will append lot information for Import Lots template.
export function generateImportLotsData (param: string) {
  // HACK: The parameters contain two sections: fileName and gid, separated by "#" delimiter
  let index = param.indexOf('#');
  let fileName = param.substring(0, index);
  let gid = param.substring(index+1, param.length);
  let workbook = XLSX.readFile(fileName); // reads original file
  let sheetName = workbook.SheetNames[0]; //get 'Lots' sheet
  let workSheet = workbook.Sheets[sheetName];
  XLSX.utils.sheet_add_aoa(workSheet, [[gid]], {origin: 'A2'});
  XLSX.utils.sheet_add_aoa(workSheet, [['DSS']], {origin: 'B2'});
  XLSX.utils.sheet_add_aoa(workSheet, [['SEED_AMOUNT_g']], {origin: 'C2'});
  XLSX.utils.sheet_add_aoa(workSheet, [['100']], {origin: 'D2'});
  XLSX.utils.sheet_add_aoa(workSheet, [['Notes ' +Math.random().toString(36).substr(2, 10)]], {origin: 'E2'});
  XLSX.utils.sheet_add_aoa(workSheet, [['Sample Lot Notes']], {origin: 'F2'});
  XLSX.writeFile(workbook, fileName); // write the same file with new values

  // explicitly return null to signal that the given event has been handled.
  return null;
}

