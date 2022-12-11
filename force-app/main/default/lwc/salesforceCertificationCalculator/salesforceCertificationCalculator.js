import { LightningElement, track } from 'lwc';

//Storage of Variables
const questionCount = 60;
const passingScore = 68;
const developerFundamentalsWeight = .23
const processAutomationAndLogicWeight = .30;
const userInterfaceWeight = .25;
const testingDebuggingAndDeploymentWeight = .22;
const developerFunadmentalsQuestionsCount =
    Math.round(questionCount * developerFundamentalsWeight);
const processAuthomationAndLogicQuestionCount = 
    Math.round(questionCount * processAutomationAndLogicWeight);
const userInterfaceQuestionCount = 
    Math.round(questionCount * userInterfaceWeight);
const testingDebuggingAndDeploymentQuestionCount = 
    Math.round(questionCount * testingDebuggingAndDeploymentWeight);

export default class CertificationCalculator extends LightningElement {
    //@track is used to make variables reactive allowing use to store the value
    @track developerFundamentals = 0;
    @track processAutomationAndLogic = 0; 
    @track userInterface = 0 ;
    @track testingDebuggingAndDeployment = 0;
    @track scoreMessage = 'Awaiting Results...'

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
    calculateScore () {
        let developerFundamentalsScore = 
            Math.round(this.developerFundamentals  * developerFundamentalsWeight);
        let processAutomationAndLogicScore = 
            Math.round(this.processAutomationAndLogic * processAutomationAndLogicWeight);
        let userInterfaceScore = 
            Math.round(this.userInterface * userInterfaceWeight);
        let testingDebuggingAndDeploymentScore =
            Math.round(this.testingDebuggingAndDeployment * testingDebuggingAndDeploymentWeight);
        
        let developerFundamentalsQuestionsCorrectCount = 
            Math.round()

        let score = developerFundamentalsScore + processAutomationAndLogicScore + userInterfaceScore + testingDebuggingAndDeploymentScore;
        //This checks the score retrieved with the passing score and outputs a sentence. 
        if (score >= passingScore && score < 101) {
            this.scoreMessage = `Pass! Your overall score is ${score}`;
        }else if(score >= 101){
            this.scoreMessage = 'Please enter a valid value';
        }else
            this.scoreMessage = `Fail your overall score was ${score}`;
    }
}

