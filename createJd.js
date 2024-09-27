const testData = require('./Td1.json');

describe('Create new jobdescription' ,function(){
    this.timeout(60000); 
    it('open the browser', function(browser){
        this.timeout(60000); // Set timeout to 60 seconds
        browser.url(testData.urls.baseUrl)
        .window.maximize()
        .pause(3000)    
    })
    it('login into Ntp page',function(browser){
        browser.useXpath()
        .setValue("//input[@name='username']",testData.credentials.username)
        .setValue("//input[@name='password']",testData.credentials.password)
        .click("//button[@name='action']")
        .pause(3000)
        
    })
    it('Go to hiring model', function(browser){
        browser.useXpath()
        .click("//a[text()='Hiring']")
        .click("//a[text()='Job Description']")
        // .waitForElementVisible("(//div[@class='flex items-center gap-4 rounded-lg border border-gray-200 px-7.5 py-4'])[1]", 10000)
    })
    it('Create new job description', function(browser){
        browser.useXpath()
        .click("//a[text()='Create New Job']")
        .pause(3000)
    })
    it('Enter the datas for creating new job description', function(browser){
        this.timeout(60000); // Set timeout to 60 seconds
        browser.useXpath()
        .setValue("//input[@label='Job Title']",testData.addnewjd.jobtitle)
        .pause(1000)
        .setValue("(//button[@role='combobox'])[1]",'Trichy')
        .pause(2000)
        .setValue("//*[@placeholder='Enter Skills']",testData.addnewjd.skills)
        .pause(1000)
        // .setValue("(//button[@role='combobox'])[2]",'Active')
        // .pause(1000)
        // .click("(//*[@class='tiptap ProseMirror rounded-md border min-h-[150px] border-input p-2'])[1]")
        // .pause(3000)
        .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[1]", testData.addnewjd.responsibilities)
        .pause(3000)
        .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[2]", testData.addnewjd.requirements)
        .pause(3000)
        .click("//button[@type='submit']")
        .pause(9000)
        // .waitForElementVisible("//h4[text()='Active Jobs']", 20000)
    })
    it('To verify job description created or not', function(browser){
        const xPathSelector = "(//*[@class='text-sm font-medium'])";
        const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";

        function iterateThroughJobs() {
            browser.elements('xpath', xPathSelector, function(result) {
                const elementsCount = result.value.length;
                console.log("Total elements found:", elementsCount);

                (function processElement(index) {
                    if (index <elementsCount) {
                        browser
                            .click(`(${xPathSelector})[${index + 1}]`) // index+1 because index is zero-based
                            .pause(4000)
                            .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                if (result.value === testData.addnewjd.jobtitle) {
                                    console.log("Job title matches:", result.value);
                                    browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(result) {
                                        console.log('jOB DESCRIPTION:');
                                        console.log('--------------------------------------------------');
                                        console.log(result.value);
                                        console.log('--------------------------------------------------');
                                    const expectedJobDescription = testData.addnewjd; // Get the expected job description from test data
                                    const actualJobDescription = result.value; // The job description fetched from the browser

                                    // Compare the actual job description with the expected one
                                    const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) && 
                                                    expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
                                                    expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
                                                    expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));

                                    if (isMatch) {
                                        console.log("The job description created and matches the expected data.");
                                    } else {
                                        console.log("The job description does not match the expected data.");
                                    }
                                    });
                                    browser.end();
                                } else {
                                    console.log("Job title does not match, going back to previous page");
                                    browser
                                        .back()
                                        .pause(3000)
                                        .perform(() => processElement(index + 3)); // Recursive call to process next element, incrementing by 3
                                       browser.pause(3000)
                                }
                            });
                    } else {
                        browser.elements('xpath', nextPageButtonSelector, function(result) {
                            if (result.value && result.value.length > 0) { // Next button exists
                                browser
                                    .click(nextPageButtonSelector)
                                    .pause(3000)
                                    .perform(() => {
                                        console.log("Moving to next page");
                                        iterateThroughJobs(); // Recursive call to start over on the new page
                                    });
                            } else {
                                console.log("No more pages left.");
                                browser.end();
                            }
                        });
                    }
                })(0); // Start processing elements from index 0
            });
        }

        iterateThroughJobs();
       
        
    })


})


