import { LightningElement } from 'lwc';

//Storage of Variables
const INVALID_MESSAGE = 'Please enter a valid value.';
const NO_RESULTS = 'Awaiting Results...';
let examData;

export default class SalesforceCertificationCalculator extends LightningElement {
//Default bind variables
    scoreMessage = NO_RESULTS;
    sectionQuestionCount = NO_RESULTS;
    showExams = false;
    showQuestions = false;
//This test Object stores all the possible certification exams and their related information.
test = {
    'platformDeveloper1' : {
        section :   ['Developer Fundamentals', 'Process Automation And Logic', 'User Interface','Testing Debugging And Deployment'],
        weight :    [.23, .30, .25, .22],
        score : [0,0,0,0],
        passingScore :69,
        questionCount : 60
    },
    'platformDeveloper2' : {
        section :   ["Advanced Developer Fundamentals",'Process, Automation, Logic, And Integration','User Interface',
                    'Testing Debugging And Deployment','Performance'],
        weight :    [.15,.27,.20,.20,.18],
        score : [0,0,0,0,0],
        passingScore :70,
        questionCount : 60
    },
    'platformAppBuilder' : {
        section :   ['Salesforce Fundamentals','Data Modeling and Management','Business Logic and Process Automation',
                    'User Interface','App Deployment'],
        weight :    [.23,.22,.28,.17,.10],
        score : [0,0,0,0,0],
        passingScore :63,
        questionCount : 60
    },
    'administrator' : {
        section :   ['Configuration and Setup','Object Manager and Lightning App Builder', 'Sales and Marketing Applications', 
                    'Service and Support Applications','Productivity and Collaboration','Data and Analytics Management','Workflow/Process Automation'],
        weight :    [.20,.20,.12,.11,.07,.14,.16],
        score : [0,0,0,0,0,0,0],
        passingScore :65,
        questionCount : 60
    },
    'advancedAdministrator' : {
        section :   ['Security and Access','Objects and Applications','Auditing and Monitoring','Cloud Applications',
                    'Data and Analytics Management','Environment Management and Deployment','Process Automation'],
        weight :    [.20,.19,.10,.11,.13,.07,.20],
        score : [0,0,0,0,0,0,0],
        passingScore : 65,
        questionCount : 60
    },
    'businessAnalyst' : {
        section :   ['Customer Discovery','Collaboration with Stakeholders','Business Process Mapping','Requirements',
                    'User Stories','User Acceptance'],
        weight :    [.17,.24,.16,.17,.18,.08],
        score : [0,0,0,0,0,0],
        passingScore : 72,
        questionCount : 60
    },
    'dataArchitect' : {
        section:    ['Data modeling/Database Design','Master Data Management','Salesforce Data Management',
                    'Data Governance','Large Data Volume considerations','Data Migration'],
        weight:     [.25,.05,.25,.10,.20,.15],
        score : [0,0,0,0,0,0],
        passingScore: 58,
        questionCount : 60 
    },
    'associate' : {
        section:    ['Salesforce Ecosystem','Navigation','Data Model','Reports & Dashboards'],
        weight:     [.32,.28,.25,.15],
        score : [0,0,0,0],
        passingScore: 62,
        questionCount : 40
    },
    'marketingCloudAdministrator' : {
        section:    ['Digital Marketing Proficiency','Subscriber Data Management','Setup',
                    'Channel Management','Maintenance'],
        weight:     [.13,.18,.38,.16,.15],
        score : [0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'strategyDesigner' : {
        section:    ['Value Design','Tools and Artifacts','Intangible Deliverables','Leveraging Adjacent Roles/Skills'],
        weight:     [.32,.23,.26,.19],
        score : [0,0,0,0],
        passingScore: 70,
        questionCount: 60
    },
    'cpqSpecialist' :{
        section:    ['CPQ Platform','Bundle Configurations','Pricing','Quote Templates','Product Selection',
                    'Orders, Contracts, Amendments, and Renewals','Products','Approvals'],
        weight:     [.23,.17,.16,.07,.07,.15,.11,.04],
        score:  [0,0,0,0,0,0,0,0],
        passingScore: 65,
        questionCount: 60
    },
    'sharingAndVisbilityArchitect' :{
        section:    ['Permissions to Standard Objects, Custom Objects, and Fields','Access to Records',
                    'Access to other Data','Implications of Security Model Choice'],
        weight:     [.27,.39,.16,.18],
        score:  [0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'b2bSolutionArchitect' :{
        section:    ['Discovery and Customer Success','Data Governance and Integration','Design',
                    'Delivery','Operationalize the Solution'],
        weight:     [.25,.26,.29,.12,.08],
        score:  [0,0,0,0,0],
        passingScore: 58,
        questionCount: 60
    },
    'userExperienceDesigner' :{
        section:    ['Discovery','UX Fundamentals','Human-Centered Design','Declarative Design',
                    'Testing','Salesforce Lightning Design System (SLDS)'],
        weight:     [.13,.16,.12,.27,.11,.21],
        score:  [0,0,0,0,0,0],
        passingScore: 65,
        questionCount: 60
    },
    'educationCloudConsultant' :{
        section:    ['Domain Expertise','Education Cloud Configuration','Implementation Strategies and Best Practices',
                    'Solution Design','Integration and Data Management','Analytics'],
        weight:     [.18,.22,.18,.19,.16,.07],
        score:  [0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'experienceCloudConsultant' :{
        section:    ['Sharing, Visibility, and Licensing','Branding, Personalization, and Content','Templates and Themes',
                    'User Creation and Authentication','Adoption and Analytics','Administration, Setup and Configuration','Customization Considerations, and Limitations'],
        weight:     [.17,.15,.10,.13,.05,.25,.07],
        score:  [0,0,0,0,0,0,0],
        passingScore: 65,
        questionCount: 60
    },
    'fieldServiceConsultant' :{
        section:    ['Managing Resources','Managing Work Orders','Managing Scheduling and Optimization','Configuring Mobility',
                    'Managing Inventory','Managing Assets','Configuring Maintenance Plans','Permissions and Sharing'],
        weight:     [.16,.23,.28,.10,.08,.05,.05,.05],
        score:  [0,0,0,0,0,0,0,0],
        passingScore: 63,
        questionCount: 60
    },
    'marketingCloudConsultant' :{
        section:    ['Discovery and Architecture','Integration','Account Configuration','Automation','Data Modeling and Management','Messaging'],
        weight:     [.16,.20,.12,.20,.21,.11],
        score:  [0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'nonprofitCloudConsultant' :{
        section:    ['Domain Expertise','Nonprofit Cloud Product Configuration','Implementation Strategies and Best Practices',
                    'Solution Design','Integration and Data Management','Analytics'],
        weight:     [.20,.22,.18,.20,.15,.05],
        score:  [0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'omniStudioConsultant' :{
        section:    ['FlexCards','OmniScripts','Data Tools','Best Fit Solutioning'],
        weight:     [.23,.27,.23,.27],
        score:  [0,0,0,0],
        passingScore: 63,
        questionCount: 60
    },
    'pardotConsultant' :{
        section:    ['Evaluation','Account Configuration','Automating Business Processes','Email Marketing',
                    'Lead Management','Personalizing the Prospect Experience','Reporting, Metrics & Analytics','Salesforce Engage'],
        weight:     [.17,.20,.17,.10,.14,.08,.11,.03],
        score:  [0,0,0,0,0,0,0,0],
        passingScore: 68,
        questionCount: 60
    },
    'salesCloudConsultant' :{
        section:    ['Sales Practices','Implementation Strategies','Application of Product Knowledge','Lead Management','Account and Contact Management',
                    'Opportunity Management','Sales Productivity and Integration','Consulting Practices','Sales Metrics, Reports & Dashboards','Data Management'],
        weight:     [.11,.13,.18,.07,.11,.10,.08,.07,.07,.08],
        score:  [0,0,0,0,0,0,0,0,0,0],
        passingScore: 68,
        questionCount: 60
    },
    'serviceCloudConsultant' :{
        section:    ['Industry Knowledge','Implementation Strategies','Service Cloud Solution Design','Knowledge Management','Interaction Channels',
                    'Case Management','Contact Center Analytics','Integration and Data Management','Service Console'],
        weight:     [.10,.15,.16,.09,.10,.15,.05,.05,.15],
        score:  [0,0,0,0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'tableauCRMAndEinsteinDiscoveryConsultant' :{
        section:    ['Data Layer','Security','Administration','Tableau CRM Dashboard Design',
                    'Tableau CRM Dashboard Implementation','Einstein Discovery Story Design'],
        weight:     [.24,.11,.09,.19,.18,.19],
        score:  [0,0,0,0,0,0],
        passingScore: 68,
        questionCount: 60
    },
    'marketingCloudDeveloper' :{
        section:    ['Data Modeling','Programmatic Languages','API','Data Management','Security'],
        weight:     [.14,.35,.22,.22,.07],
        score:  [0,0,0,0,0,0],
        passingScore: 63,
        questionCount: 60
    },
    'marketingCloudEmailSpecialist' :{
        section:    ['Email Marketing Best Practices','Content Creation and Delivery','Marketing Automation',
                    'Subscriber and Data Management','Insights and Analytics'],
        weight:     [.10,.24,.26,.26,.14],
        score:  [0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'pardotSpecialist' :{
        section:    ['Visitors and Prospects','Administration','Pardot Forms, Form Handlers and Landing Pages',
                    'Lead Management','Email Marketing','Engagement Studio'],
        weight:     [.08,.11,.20,.24,.20,.17],
        score:  [0,0,0,0,0,0],
        passingScore: 72,
        questionCount: 60
    },
    'omniStudioDeveloper' :{
        section:    ['FlexCards','OmniScripts','Integration Procedures','Data Raptors',
                    'Expression Sets & Decision Matrices','Integrated Troubleshooting and Deployment'],
        weight:     [.15,.20,.17,.20,.08,.20],
        score:  [0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'javaScriptDeveloper1' :{
        section:    ['Variables, Types, and Collections','Objects, Functions, and Classes','Browser and Events',
                    'Debugging and Error Handling','Asynchronous Programming','Server Side JavaScript','Testing'],
        weight:     [.23,.25,.17,.07,.13,.08,.07],
        score:  [0,0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'industriesCPQDeveloper' :{
        section:    ['Products','Promotions and Discounts','Pricing','Rules','APIs','Ordering and Quoting','Troubleshooting'],
        weight:     [.20,.07,.17,.12,.12,.12,.20],
        score:  [0,0,0,0,0,0,0],
        passingScore: 63,
        questionCount: 60
    },
    'b2cCommerceCPQDeveloper' :{
        section:    ['B2C Commerce Setup','Work With a B2C Site','Data Management Using Business Manager Usage','Application Development'],
        weight:     [.11,.12,.24,.53],
        score:  [0,0,0,0],
        passingScore: 65,
        questionCount: 60
    },
    'integrationArchitect' :{
        section:    ['Evaluate the Current System Landscape','Evaluate Business Needs','Translate Needs to Integration Requirements',
                    'Design Integration Solutions','Build Solution','Maintain Integration'],
        weight:     [.08,.11,.22,.28,.23,.08],
        score:  [0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'b2cSolutionArchitect' :{
        section:    ['Discovery and Customer Success','Functional Capabilities and Business Value','Architecture Design',
                    'Data Models and Management','Integration'],
        weight:     [.18,.19,.23,.21,.19],
        score:  [0,0,0,0,0],
        passingScore: 63,
        questionCount: 60
    },
    'b2cCommerceArchitect' :{
        section:    ['Design/Discovery','Build','Monitoring/Troubleshooting','Integrations and Customizations','Launch'],
        weight:     [.29,.19,.14,.22,.16],
        score:  [0,0,0,0,0],
        passingScore: 65,
        questionCount: 60
    },
    'herokuArchitect' :{
        section:    ['Heroku Platform','Data','Security','Heroku Enterprise','Architect Applications','Integrations'],
        weight:     [.10,.17,.15,.28,.15,.15],
        score:  [0,0,0,0,0,0],
        passingScore: 72,
        questionCount: 60
    },
    'identityAndAccessManagementArchitect' :{
        section:    ['Identity Management Concepts','Accepting Third-Party Identity in Salesforce','Salesforce as an Identity Provider',
                    'Access Management Best Practices','Salesforce Identity','Community (Partner and Customer)'],
        weight:     [.17,.21,.17,.15,.12,.18],
        score:  [0,0,0,0,0,0],
        passingScore: 67,
        questionCount: 60
    },
    'developmentLifecycleAndDeploymentArchitect' :{
        section:    ['Application Lifecycle Management','Planning','System Design','Building','Deploying','Testing','Releasing','Operating'],
        weight:     [.08,.13,.15,.14,.14,.13,.13,.10],
        score:  [0,0,0,0,0,0,0,0],
        passingScore: 65,
        questionCount: 60
    }
}
    get roleOptions (){
        return [
            {label: 'Administrator', value: 'administrator'},
            {label: 'Architect', value: 'architect'},
            {label: 'Developer', value: 'developer'},
            {label: 'Marketer', value: 'marketer'},
            {label: 'Consultant', value:'consultant'},
            {label: 'Designer', value:'designer'},
        ]
    }
    handleRoleChange(event){
        //Get the value of the selected option
        let selectedValue = event.detail.value;
        this.showQuestions = false;
        this.showExams = false;
        //update the options of the dependent combobox based on the selection
        if(selectedValue ==='administrator'){
            this.examOptions = [
                {label: 'Associate', value: 'associate'},
                {label: 'Administrator', value : 'administrator'},
                {label: 'Advanced Administrator', value: 'advancedAdministrator'},
                {label: 'Business Analyst', value: 'businessAnalyst'},
                {label: 'Marketing Cloud Administrator', value: 'marketingCloudAdministrator'},
                {label: 'CPQ Specialist', value: 'cpqSpecialist'},
                {label: 'Platform App Builder', value: 'platformAppBuilder' },
            ];
        }else if(selectedValue === 'architect'){
            this.examOptions = [
                {label:'Data Architect', value: 'dataArchitect'},
                {label:'Sharing and Visibility Architect', value: 'sharingAndVisbilityArchitect'},
                {label: 'B2B Solution Architect', value: 'b2bSolutionArchitect'},
                {label: 'Integration Architect', value: 'integrationArchitect'},
                {label: 'B2C Solution Architect', value: 'b2cSolutionArchitect'},
                {label: 'B2C Commerce Architect', value: 'b2cCommerceArchitect'},
                {label: 'Heroku Architect', value: 'herokuArchitect'},
                {label: 'Identity and Access Management Architect', value: 'identityAndAccessManagementArchitect'},
                {label: 'Development Lifecycle and Deployment Architect', value: 'developmentLifecycleAndDeploymentArchitect'},
            ];
        }else if(selectedValue === 'developer'){
            this.examOptions = [
                {label: 'Platform App Builder', value: 'platformAppBuilder' },
                {label: 'Platform Developer 1', value: 'platformDeveloper1' },
                {label: 'Platform Developer 2', value: 'platformDeveloper2' },
                {label: 'Marketing Cloud Developer', value: 'marketingCloudDeveloper'},
                {label: 'OmniStudio Developer', value: 'omniStudioDeveloper'},
                {label: 'JavaScript Developer 1', value: 'javaScriptDeveloper1'},
                {label: 'Industries CPQ Developer', value: 'industriesCPQDeveloper'},
                {label: 'B2C Commerce Developer', value: 'b2cCommerceCPQDeveloper'},
            ];
        }else if(selectedValue === 'marketer'){
            this.examOptions = [
                {label: 'Marketing Cloud Administrator', value: 'marketingCloudAdministrator'},
                {label: 'Marketing Cloud Consultant', value: 'marketingCloudConsultant'},
                {label: 'Marketing Cloud Developer', value: 'marketingCloudDeveloper'},
                {label: 'Marketing Cloud Email Specialist', value: 'marketingCloudEmailSpecialist'},
                {label: 'Pardot Consultant', value: 'pardotConsultant'},
                {label: 'Pardot Specialist', value: 'pardotSpecialist'},
            ]
        }else if(selectedValue === 'consultant'){
            this.examOptions = [
                {label: 'Business Analyst', value: 'businessAnalyst'},
                {label: 'Education Cloud Consultant', value: 'educationCloudConsultant'},
                {label: 'Experience Cloud Consultant', value: 'experienceCloudConsultant'},
                {label: 'Field Service Consultant', value: 'fieldServiceConsultant'},
                {label: 'Marketing Cloud Consultant', value: 'marketingCloudConsultant'},
                {label: 'Nonprofit Cloud Consultant', value: 'nonprofitCloudConsultant'},
                {label: 'OmniStudio Consultant', value: 'omniStudioConsultant'},
                {label: 'Pardot Consultant', value: 'pardotConsultant'},
                {label: 'Sales Cloud Consultant', value: 'salesCloudConsultant'},
                {label: 'Service Cloud Consultant', value: 'serviceCloudConsultant'},
                {label: 'Tableau CRM and Einstein Discovery Consultant', value: 'tableauCRMAndEinsteinDiscoveryConsultant'},
            ]
        }else if(selectedValue === 'designer'){
            this.examOptions = [
                {label: 'Strategy Designer', value: 'strategyDesigner'},
                {label: 'User Experience Designer', value: 'userExperienceDesigner'},
            ]
        }
        this.showExams = true;	
    }

    handleChange(event) {
        this.showQuestions = false;
        this.showExams = false;
        this.value = event.detail.value;
        examData = this.test[event.detail.value];
        this.exams = examData.section.map((section, index) => ({
            section,
            weight: examData.weight[index],
        }));
        this.showQuestions = true;
        this.showExams = true;
        this.scoreMessage = NO_RESULTS;
        this.sectionQuestionCount = NO_RESULTS;
    }
//-----------------------------------------------------------------------------------------------
    handleScoreChange(event) {
        const index = this.exams.findIndex(exa => exa.section === event.target.label);
        examData.score[index] = event.target.value;
        // Now you can use this.exams to access the values of the input fields
    }
    calculateScore(){
        let totalScore = 0;
        let totalBreakdown ='';
        console.log(examData.passingScore);
        console.log(examData.questionCount);
        for(let i = 0; i < examData.score.length; i++){
            let sectionScore = Math.round(examData.score[i] * examData.weight[i]);
            totalScore += sectionScore;
            let sectionQuestionCount = Math.round(examData.questionCount * examData.weight[i]);
            let sectionCorrectCount = Math.round(examData.score[i] / 100 * sectionQuestionCount);
            let sectionBreakdown = 
            `For ${examData.section[i]}, you got ${sectionCorrectCount} out of ${sectionQuestionCount} correct.` +'\n';
            totalBreakdown += sectionBreakdown;
        }
        console.log(`The total score is ${totalScore}`);
        console.log(totalBreakdown);
        if(totalScore > 100 || totalScore < 0){
            this.scoreMessage = INVALID_MESSAGE;
            this.sectionQuestionCount = INVALID_MESSAGE;
        }else if(totalScore >= examData.passingScore){
            this.scoreMessage = `Pass! Your overall score is ${totalScore}%`;
            this.sectionQuestionCount = totalBreakdown;
        }else{
            this.scoreMessage = `Unfortunately, you failed, your score is ${totalScore}%`;
            this.sectionQuestionCount = totalBreakdown;
        }
    }
}