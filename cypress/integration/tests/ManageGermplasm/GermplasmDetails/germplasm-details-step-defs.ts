import { When,And,Then } from "cypress-cucumber-preprocessor/steps";

const manageGermplasmPage = new ManageGermplasmPage()
const germplasmDetailsPage = new GermplasmDetailsPage()

When('I click on the GID of a germplasm',()=>{
    manageGermplasmPage.openGermplasm();
})

//
And('I navigate to the {} tab of germplasm details',(tab)=>{
    germplasmDetailsPage.clickTab(tab)
})

And('I click View Pedigree Graph button',()=>{
    germplasmDetailsPage.viewPedigreeGraph()
})

Then('I should be able to see the pedigree tree',()=>{
    germplasmDetailsPage.verifyPedigreeTree();
})

Then('I should be able to see the pedigree graph',()=>{
    germplasmDetailsPage.verifyPedigreeGraph();
})

