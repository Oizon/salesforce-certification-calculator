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
const processAutomationAndLogicQuestionCount = 
    Math.round(questionCount * processAutomationAndLogicWeight);
const userInterfaceQuestionCount = 
    Math.round(questionCount * userInterfaceWeight);
const testingDebuggingAndDeploymentQuestionCount = 
    Math.round(questionCount * testingDebuggingAndDeploymentWeight);
const INVALID_MESSAGE = 'Please enter a valid value.';

export default class CertificationCalculator extends LightningElement {
    //@track is used to make variables reactive allowing use to store the value
    @track developerFundamentals = 0;
    @track processAutomationAndLogic = 0; 
    @track userInterface = 0 ;
    @track testingDebuggingAndDeployment = 0;
    @track scoreMessage = 'Awaiting Results...';
    @track sectionQuestionCount = 'Awaiting Results...';

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
            this.processAutomationAndLogic > 100 ||
            this.userInterface > 100 ||
            this.testingDebuggingAndDeployment > 100){
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