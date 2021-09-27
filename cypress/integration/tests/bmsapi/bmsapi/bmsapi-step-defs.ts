  
import { Given,When,And,Then } from "cypress-cucumber-preprocessor/steps";
import BmsApiPage from '../../../pageobjects/bmsapi-page'

const apiPage = new BmsApiPage()

Given('I navigate to the BMSAPI page',()=>{
    apiPage.launchBMSAPI()
})

Then('The API Swagger page will display',()=>{
    apiPage.verifyPageLoaded()
})

