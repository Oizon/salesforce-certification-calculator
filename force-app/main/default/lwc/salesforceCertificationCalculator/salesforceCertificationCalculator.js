//TO-DO make calculate button and calculation for pd2

import { LightningElement } from 'lwc';
import PlatformDeveloper1 from './PlatformDeveloper1.html';
import SelectorPage from './SelectorPage.html';
import PlatformDeveloper2 from './PlatformDeveloper2.html';

//Storage of Variables

const INVALID_MESSAGE = 'Please enter a valid value.';
const NO_RESULTS = 'Awaiting Results...';

export default class CertificationCalculator extends LightningElement {
    //Calculator Switch
    showTemplate = 'SelectorPage';

    render(){
        if(this.showTemplate == 'PlatformDeveloper1') return PlatformDeveloper1;
        if(this.showTemplate == 'SelectorPage') return SelectorPage;
        if(this.showTemplate == 'PlatformDeveloper2') return PlatformDeveloper2;
    }
    showSelectorPage(){
        this.showTemplate = 'SelectorPage';
        this.scoreMessage = NO_RESULTS;
        this.sectionQuestionCount = NO_RESULTS;
    }
    showPlatformDeveloper1(){
        this.showTemplate = 'PlatformDeveloper1';
    }
    showPlatformDeveloper2(){
        this.showTemplate = 'PlatformDeveloper2';
    }
    
    
    //@track is used to make variables reactive allowing use to store the value
    developerFundamentals = 0;
    processAutomationAndLogic = 0; 
    userInterface = 0 ;
    testingDebuggingAndDeployment = 0;
    scoreMessage = NO_RESULTS;
    sectionQuestionCount = NO_RESULTS;

    //Retrieves the number that is inputted for use in the back end
    onDeveloperFundamentalsChange(event){
         this.developerFundamentals = event.target.value;
     }
     onProcessAutomationAndLogicChange(event){
         this.processAutomationAndLogic = event.target.value;
     }
     onUserInterfaceChange(event){
         this.userInterface = event.target.value;
     }
     onTestingDebuggingAndDeploymentChange(event){
         this.testingDebuggingAndDeployment = event.target.value;
     }

    //This calculates the score based on const and inputted variables
    calculateScorePlatformDeveloper1 () {

        //Storage of Variables
        const questionCount = 60;
        const passingScore = 68;
        const developerFundamentalsWeight = .23
        const processAutomationAndLogicWeight = .30;
        const userInterfaceWeight = .25;
        const testingDebuggingAndDeploymentWeight = .22;
        const developerFunadmentalsQuestionsCount =
        Math.round(questionCount * developerFundamentalsWeight);
        const processAutomationAndLogicQuestionCount = 
        Math.round(questionCount * processAutomationAndLogicWeight);
        const userInterfaceQuestionCount = 
        Math.round(questionCount * userInterfaceWeight);
        const testingDebuggingAndDeploymentQuestionCount = 
        Math.round(questionCount * testingDebuggingAndDeploymentWeight);

        let developerFundamentalsScore = 
            Math.round(this.developerFundamentals  * developerFundamentalsWeight);
        let processAutomationAndLogicScore = 
            Math.round(this.processAutomationAndLogic * processAutomationAndLogicWeight);
        let userInterfaceScore = 
            Math.round(this.userInterface * userInterfaceWeight);
        let testingDebuggingAndDeploymentScore =
            Math.round(this.testingDebuggingAndDeployment * testingDebuggingAndDeploymentWeight);
        
        let developerFundamentalsQuestionsCorrectCount = 
            Math.round(this.developerFundamentals / 100 * developerFunadmentalsQuestionsCount);
        let processAutomationAndLogicCorrectCount = 
            Math.round(this.processAutomationAndLogic / 100 * processAutomationAndLogicQuestionCount);
        let userInterfaceCorrectCount = 
            Math.round(this.userInterface / 100 * userInterfaceQuestionCount);
        let testingDebuggingAndDeploymentCorrectCount = 
            Math.round(this.testingDebuggingAndDeployment / 100 * testingDebuggingAndDeploymentQuestionCount);
        let sectionBreakdown = 
            `For Developer Fundamentals you got ${developerFundamentalsQuestionsCorrectCount} out of ${developerFunadmentalsQuestionsCount} correct.` + '\n' + 
            `For Process Automation and Logic you got ${processAutomationAndLogicCorrectCount} out of ${processAutomationAndLogicQuestionCount} correct.` + '\n' +
            `For User Interface you got ${userInterfaceCorrectCount} out of ${userInterfaceQuestionCount} correct.` + '\n' +
            `For Testing Debugging and Deployment you got ${testingDebuggingAndDeploymentCorrectCount} out of ${testingDebuggingAndDeploymentQuestionCount} correct.`;

        let score = developerFundamentalsScore + processAutomationAndLogicScore + userInterfaceScore + testingDebuggingAndDeploymentScore;
        //This checks the score retrieved with the passing score and outputs a sentence. 
        //This if statement checks for invalid values
        if(this.developerFundamentals > 100 ||
            this.developerFundamentals < 0 ||
            this.processAutomationAndLogic > 100 ||
            this.processAutomationAndLogic < 0 ||
            this.userInterface > 100 ||
            this.userInterface < 0 ||
            this.testingDebuggingAndDeployment > 100 ||
            this.testingDebuggingAndDeployment < 0){
                this.scoreMessage = INVALID_MESSAGE;
                this.sectionQuestionCount = INVALID_MESSAGE;
            }else{
                //This one checks if it is passing or failing and displays the appropriate score.
                if (score >= passingScore) {
                    this.scoreMessage = `Pass! Your overall score is ${score}`;
                    this.sectionQuestionCount = sectionBreakdown; 
                }else{
                    this.scoreMessage = `Fail your overall score was ${score}`;
                    this.sectionQuestionCount = sectionBreakdown;
            }
        }
    }
}