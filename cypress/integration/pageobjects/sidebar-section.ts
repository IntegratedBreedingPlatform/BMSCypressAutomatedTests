import { getIframeBody } from '../../support/commands';

export default class SidebarSection {
    navigateTo(link:string){
        let sidebarTool = SidebarTool.getFromLinkName(link);
        this.navigate(sidebarTool);
    }

    navigate(sidebarTool:SidebarTool){
        // Expand sidebar category if collapsed
            cy.xpath(`//mat-tree-node[not(contains(@class, 'leaf')) and contains(text(), ' ${sidebarTool.category} ')]`).should('exist').invoke('attr', 'aria-expanded').then((isExpanded) => {
                if (isExpanded !== 'true') {
                    cy.xpath(`//mat-tree-node[not(contains(@class, 'leaf')) and contains(text(), ' ${sidebarTool.category} ')]`).click();
                    cy.xpath(`//mat-tree-node[not(contains(@class, 'leaf')) and contains(text(), ' ${sidebarTool.category} ')]`).invoke('attr', 'aria-expanded').should('eq', 'true');
                } 
            });
        // Then click the sidebar category child
        cy.xpath(`//mat-tree-node[contains(@class, 'leaf') and contains(text(), ' ${sidebarTool.linkName} ')]`).should('exist').first().click();
    }

    /**
     * Assumes sidebar section is already expanded
     */
    reload(sidebarTool:SidebarTool){
        getIframeBody().then(($iframe) => {
            cy.xpath(`//mat-tree-node[contains(@class, 'leaf') and contains(text(), ' ${sidebarTool.linkName} ')]`).should('exist').first().click();
        });
    }

    verifyPageIsShown(page:string) {
        let sidebarTool = SidebarTool.getFromLinkName(page);

        if(sidebarTool.isVaadin) {
            cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
                if (sidebarTool.toolName === 'GDMS') {
                    cy.wrap($iframeBody).xpath(`//img[@src="/GDMS/VAADIN/themes/gdmstheme/images/GDMS.gif"]`).should('exist')

                } else if (sidebarTool.linkName == 'High Density') {
                    cy.wrap($iframeBody).xpath(`//p[contains(text(),'${sidebarTool.toolName}')]`).should('exist')

                } else {
                    cy.wrap($iframeBody).xpath(`//div[@id="toolTitle"]`).should('exist').should('have.text', sidebarTool.toolName);
                }
            });
        } else {
            cy.get('mat-sidenav-content > iframe').waitIframeToLoad().then(($iframeBody) => {
                cy.wrap($iframeBody).xpath(`//h1[contains(text(),'${sidebarTool.toolName}')]| 
                    //h2[contains(text(),'${sidebarTool.toolName}')] | 
                    //h1/span[contains(text(),'${sidebarTool.toolName}')]| 
                    //h1/span/span[contains(text(),'${sidebarTool.toolName}')]`).should('exist');
            });
        }

    }

    verifyBMSVersion() {
        let bmsVersion = Cypress.env('bmsVersion');
        cy.xpath(`//mat-sidenav/div[contains(text(), 'BMS ${bmsVersion}')]`).should('exist');
    }
}


export class SidebarTool {

    public static readonly MANAGE_GERMPLASM = new SidebarTool('Manage Germplasm', 'Germplasm', 'Germplasm Manager');
    public static readonly SAMPLE_LISTS = new SidebarTool('Samples Lists', 'Lists', 'Manage Samples');
    public static readonly GERMPLASM_LISTS = new SidebarTool('Germplasm Lists', 'Lists', 'Germplasm Lists');
    public static readonly MANAGE_STUDIES = new SidebarTool('Manage Studies', 'Studies', 'Manage Studies');
    public static readonly BROWSE_STUDIES = new SidebarTool('Browse Studies', 'Studies', 'Browse Studies', true);
    public static readonly DATASET_IMPORT = new SidebarTool('Import Datasets', 'Studies', 'Dataset Importer');
    public static readonly SINGLE_SITE_ANALYSIS = new SidebarTool('Single-Site Analysis', 'Studies', 'Single-Site Analysis', true);
    public static readonly MULTI_SITE_ANALYSIS = new SidebarTool('Multi-Site Analysis', 'Studies', 'Multi-Site Analysis', true);
    public static readonly MANAGE_INVENTORY = new SidebarTool('Manage Inventory', 'Inventory', 'Manage Inventory');
    public static readonly GRAPHICAL_QUERIES = new SidebarTool('Graphical Queries', 'Queries', 'BrAPI Graphical Queries');
    public static readonly HEAD_TO_HEAD_QUERY = new SidebarTool('Head to Head Query', 'Queries', 'Main Head to Head Query', true);
    public static readonly MULTI_TRAIT_QUERY = new SidebarTool('Multi-trait Query', 'Queries', 'Multi-trait Query', true);
    public static readonly GDMS = new SidebarTool('Low Density', 'Genotyping', 'GDMS', true);
    public static readonly HIGH_DENSITY = new SidebarTool('High Density', 'Genotyping', 'Module is not defined yet', true);
    public static readonly MANAGE_ONTOLOGIES = new SidebarTool('Manage Ontologies', 'Crop Administration', 'Ontology Browser');
    public static readonly MANAGE_METADATA = new SidebarTool('Manage Metadata', 'Crop Administration', 'Manage Metadata');
    public static readonly MANAGE_PROGRAM_SETTINGS = new SidebarTool('Manage Program Settings', 'Program Administration',
        'Manage Program Settings', true);

    private static TOOLS : SidebarTool[] = [SidebarTool.MANAGE_GERMPLASM, SidebarTool.SAMPLE_LISTS, SidebarTool.GERMPLASM_LISTS, SidebarTool.MANAGE_STUDIES,
        SidebarTool.BROWSE_STUDIES, SidebarTool.DATASET_IMPORT, SidebarTool.SINGLE_SITE_ANALYSIS, SidebarTool.MULTI_SITE_ANALYSIS, SidebarTool.MANAGE_INVENTORY, SidebarTool.GRAPHICAL_QUERIES,
        SidebarTool.HEAD_TO_HEAD_QUERY, SidebarTool.MULTI_TRAIT_QUERY, SidebarTool.GDMS, SidebarTool.HIGH_DENSITY, SidebarTool.MANAGE_ONTOLOGIES, SidebarTool.MANAGE_METADATA,
        SidebarTool.MANAGE_PROGRAM_SETTINGS]
    constructor(
        public linkName?: string,
        public category?: string,
        public toolName?: string,
        public isVaadin?: boolean
    ) {
    }

    public static getFromLinkName(link:string): SidebarTool {
       const sidebarTools = SidebarTool.TOOLS.filter((tool) => tool.linkName === link);
       if (sidebarTools.length > 0) {
           return sidebarTools[0];
       }
       throw new Error('Could not find tool ' + link);
    }

    public static getFromToolName(link:string): SidebarTool {
        const sidebarTools = SidebarTool.TOOLS.filter((tool) => tool.toolName === link);
        if (sidebarTools.length > 0) {
            return sidebarTools[0];
        }
        throw new Error('Could not find tool ' + link);
    }
}
