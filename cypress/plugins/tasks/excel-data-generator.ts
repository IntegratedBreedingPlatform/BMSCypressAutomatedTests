const XLSX = require("xlsx");
import { randomString } from '../../support/commands';

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
  export function generateImportGermplasmData (param: string) {
    let index = param.indexOf('#');
    let fileName = param.substring(0, index);
    let germplasmName = param.substring(index+1, param.length);
    let workbook = XLSX.readFile(fileName); 
    let sheetName = workbook.SheetNames[0]; 
    let workSheet = workbook.Sheets[sheetName];
    XLSX.utils.sheet_add_aoa(workSheet, [['1']], {origin: 'A2'});
    XLSX.utils.sheet_add_aoa(workSheet, [[germplasmName]], {origin: 'B2'});  
    XLSX.utils.sheet_add_aoa(workSheet, [["AFG"]], {origin: 'F2'}); 
    XLSX.utils.sheet_add_aoa(workSheet, [["UDM"]], {origin: 'I2'});      
    XLSX.utils.sheet_add_aoa(workSheet, [["DSS"]], {origin: 'M2'});    
    XLSX.utils.sheet_add_aoa(workSheet, [["SEED_AMOUNT_g"]], {origin: 'N2'});      
    XLSX.utils.sheet_add_aoa(workSheet, [["500"]], {origin: 'O2'});   
    XLSX.utils.sheet_add_aoa(workSheet, [[germplasmName+"STK1"]], {origin: 'P2'});   
    XLSX.writeFile(workbook, fileName);
    return null;
  }

  // This will dynamic germplasm name for Import Germplasm template
  export function generateImportGermplasmUpdates (param: string) {
    // HACK: The parameters contain two sections: fileName and gid, separated by "#" delimiter
    let index = param.indexOf('#');
    let fileName = param.substring(0, index);
    let gid = param.substring(index+1, param.length);
    let workbook = XLSX.readFile(fileName); // reads original file
    let sheetName = workbook.SheetNames[0]; 
    let workSheet = workbook.Sheets[sheetName];
    XLSX.utils.sheet_add_aoa(workSheet, [[gid]], {origin: 'A2'});
    //update method
    XLSX.utils.sheet_add_aoa(workSheet, [['UBM']], {origin: 'C2'});  
    //update progenitor
    XLSX.utils.sheet_add_aoa(workSheet, [['1']], {origin: 'D2'});
    XLSX.utils.sheet_add_aoa(workSheet, [['1']], {origin: 'E2'});
    //update preferred name
    XLSX.utils.sheet_add_aoa(workSheet, [['PUI']], {origin: 'F2'});    
    //update location abbr
    XLSX.utils.sheet_add_aoa(workSheet, [['AFG']], {origin: 'G2'});    
    //update creation date
    XLSX.utils.sheet_add_aoa(workSheet, [['20220101']], {origin: 'H2'});    
    //update reference
    XLSX.utils.sheet_add_aoa(workSheet, [['Reference1']], {origin: 'I2'});   
    //update DRVNM
    XLSX.utils.sheet_add_aoa(workSheet, [['Drvnm1']], {origin: 'J2'}); 
    //update NOTE_AA_text
    XLSX.utils.sheet_add_aoa(workSheet, [['Note1']], {origin: 'K2'});   
    //add PUI column and value
    XLSX.utils.sheet_add_aoa(workSheet, [['PUI']], {origin: 'L1'});
    XLSX.utils.sheet_add_aoa(workSheet, [['PUINewGermplasm1']], {origin: 'L2'});
    //add new attribute
    XLSX.utils.sheet_add_aoa(workSheet, [['ANCEST_AP_text']], {origin: 'M1'});
    XLSX.utils.sheet_add_aoa(workSheet, [['NewAttribute1']], {origin: 'M2'});
    //add new name
    XLSX.utils.sheet_add_aoa(workSheet, [['VABBR']], {origin: 'N1'});
    XLSX.utils.sheet_add_aoa(workSheet, [['NewName1']], {origin: 'N2'});
    //update existing name
    XLSX.utils.sheet_add_aoa(workSheet, [['LNAME']], {origin: 'O1'});
    XLSX.utils.sheet_add_aoa(workSheet, [['NewGermplasm1Edited']], {origin: 'O2'});

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

