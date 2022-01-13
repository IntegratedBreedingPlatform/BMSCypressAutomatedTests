import { When, And, Then, After} from 'cypress-cucumber-preprocessor/steps';
import ManageObservationsPage from '../../../pageobjects/studies/manage-observations-page'
import SidebarSection from '../../../pageobjects/sidebar-section'

const manageObservationsPage = new ManageObservationsPage();
const sidebar = new SidebarSection();


When('I inline edit an observation for the {} trait {} with id {}', (dataType, traitName, traitId) => {
    // Hide the sidebar to minimize horizontal scrolling in observations table
    sidebar.toggleVisibility();
    manageObservationsPage.performInlineEdit(traitName, dataType, traitId, true);
})

When('I inline edit an observation for trait {} with id {} using an out-of-bound value', (traitName, traitId) => {
    sidebar.toggleVisibility();
    manageObservationsPage.performInlineEdit(traitName, 'categorical', traitId, false);
})

And('I confirm to keep the value', () => {
    manageObservationsPage.keepOutOfBoundData();
})

And('I confirm to discard the value', () => {
    manageObservationsPage.discardOutOfBoundData();
})

Then('observation value for the {} trait with id {} should be saved', (dataType, traitId) => {
    manageObservationsPage.verifyInlineEditSuccessful(dataType, traitId, 1);
})

Then('out-of-bound value for trait {} with id {} should not be saved', (traitName, traitId) => {
    manageObservationsPage.verifyDataNotSaved(traitId);
})

Then('out-of-bound value for trait {} with id {} should be saved', (traitName, traitId) => {
    manageObservationsPage.verifyOutOfBoundDataSaved(traitId);
})

// Show the sidebar again after each scenario
After(() => {
    sidebar.toggleVisibility();
})

