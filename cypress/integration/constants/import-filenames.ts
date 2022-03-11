export default class ImportFileNames{

    public static readonly GERMPLASM_IMPORT_TEMPLATE = "GermplasmListImportTemplate_"+ Cypress.env('cropName')+".xls";
    public static readonly GERMPLASM_IMPORT_VALID = "GermplasmImport.xls";
    public static readonly LIST_IMPORT_VALID = "GermplasmListImport.xls";
    public static readonly LIST_IMPORT_NO_REQUIRED_COLS = "GermplasmListImportNoRequiredCol.xls";
    public static readonly LIST_IMPORT_NO_VALUES = "GermplasmListImportNoValues.xls";
    public static readonly LIST_IMPORT_SINGLE_MATCH = "GermplasmListImportWithSingleMatches.xls";
    public static readonly LIST_IMPORT_MULTIPLE_MATCHES = "GermplasmListImportMultipleMatch.xls";
    public static readonly LIST_IMPORT_WITHOUT_MATCHES = "GermplasmListImportWithoutMatch.xls";
}