import { getIframeBody } from '../../../support/commands';

export default class SaveNewListPage {
    fillUpValidInfo() {
        getIframeBody().find('[data-test="name"]').type('New List 001');
        getIframeBody().find('#description').type('New List Desc');
        getIframeBody().find('#dropdownTypes').select("LST");      
        getIframeBody().find('#notes').type('New List 001');
    }

    enterNewName(newName: string) {
        getIframeBody().find('[data-test="name"]').clear().type('New List 001');
    }

    clickModalSave() {
        getIframeBody().then(($iframe) => {
          
        });
    }

    verifySuccessEditMetadata () {
    }

    verifyError (errorMessage: string) {

    }
}

