import { When,And,Then } from "cypress-cucumber-preprocessor/steps";
import ManageGermplasmPage from '../../../pageobjects/germplasm/manage-germplasm-page'
import GermplasmSelectorPage from '../../../pageobjects/germplasm/germplasm-selector-page'


const manageGermplasmPage = new ManageGermplasmPage()
const germplasmSelectorPage = new GermplasmSelectorPage()

When('When I select some germplasm entries',()=>{
    germplasmSelectorPage.selectRandomEntries();
})

And('I add selected germplasm entries to a new list',(tab)=>{

})

And('I save the new list',(tab)=>{

})

Then('a message saying germplasm list successfully saved should display',()=>{

})

Then('the new list should include the selected germplasm list',()=>{

})
