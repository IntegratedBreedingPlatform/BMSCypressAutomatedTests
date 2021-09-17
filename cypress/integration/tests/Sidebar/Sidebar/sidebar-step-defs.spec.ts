
import { Then } from "cypress-cucumber-preprocessor/steps";
import SidebarSection from '../../../pageobjects/SidebarSection'

const sidebar = new SidebarSection()

Then('The BMS sidebar should have the correct version',()=>{
    sidebar.verifyBMSVersion();
})