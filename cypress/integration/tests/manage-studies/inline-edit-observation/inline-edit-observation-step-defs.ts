import { When, And, Then, After} from 'cypress-cucumber-preprocessor/steps';
import ManageObservationsPage from '../../../pageobjects/studies/manage-observations-page'

const manageObservationsPage = new ManageObservationsPage();

When('I inline edit an observation for the {} trait {} with id {}', (dataType, traitName, traitId) => {
    manageObservationsPage.performInlineEdit(traitName, dataType, traitId, true);
})

When('I inline edit an observation for trait {} with id {} using an out-of-bound value', (traitName, traitId) => {
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
