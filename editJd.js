const testData = require('./Td1.json');
describe('editw job description', function() {
    this.timeout(120000); // Increase timeout to 120 seconds for the entire suite
    it('open the browser', function(browser) {
        this.timeout(120000); // Increase timeout for this specific test
        browser
            .url(testData.urls.baseUrl)
            .windowMaximize()
            .pause(3000)
            .useXpath()
            .setValue("//input[@name='username']", testData.credentials.username)
            .setValue("//input[@name='password']", testData.credentials.password)
            .click("//button[@name='action']")
            .pause(3000)
            .click("//a[text()='Hiring']")
            .pause(3000)
            .click("//a[text()='Job Description']")
            .pause(3000);

        const xPathSelector = "(//*[@class='text-sm font-medium'])";
        const nextPageButtonSelector = "//li[@class='next']";

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
                                    browser.click("//*[text()='Edit']")
                                    // console.log("Job title matches:", result.value);
                                    .pause(3000)
                                    // browser.setValue("//input[@label='Job Title']",testData.addnewjd2.jobtitle)
                                    .setValue("//input[@label='Job Title']",testData.editjd.jobtitle)
                                    .pause(2000)
                                    .setValue("(//button[@role='combobox'])[1]",'Chennai')
                                    .pause(3000)
                                    .setValue("//*[@placeholder='Enter Skills']",testData.editjd.skills)
                                    .pause(1000)
                                    // .setValue("(//button[@role='combobox'])[2]",'Active')
                                    .pause(3000)
                                    // .click("(//*[@class='tiptap ProseMirror rounded-md border min-h-[150px] border-input p-2'])[1]")
                                    // .pause(3000)
                                    .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[1]", testData.editjd.responsibilities)
                                    .pause(3000)
                                    .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[2]", testData.editjd.requirements)
                                    .pause(3000)
                                    .click("//button[@type='submit']")
                                    .pause(9000)
                                    .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                        if (result.value === testData.editjd.jobtitle) {
                                            console.log("Job title matches:", result.value);
                                            browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(result) {
                                                console.log('jOB DESCRIPTION:');
                                                console.log('--------------------------------------------------');
                                                console.log(result.value);
                                                console.log('--------------------------------------------------');
                                            const expectedJobDescription = testData.editjd; // Get the expected job description from test data
                                            const actualJobDescription = result.value; // The job description fetched from the browser
        
                                            // Compare the actual job description with the expected one
                                            const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) && 
                                                            expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
                                                            expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
                                                            expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));
        
                                            if (isMatch) {
                                                console.log("The job description was edited and matches the expected data.");
                                            } else {
                                                console.log("The edit job description does not match the expected data.");
                                            }
                                            })
                                            
                                        }
                                    })
                                    

                                   
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
                                    .pause(9000)
                                
                                     // Pause for a moment before scrolling
                                    
                                    .moveToElement("//*[text()='Active Jobs']", 10, 10)
                                    // .waitForElementVisible(#myElement, 500)
                                   browser.pause(3000)
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
    });
});
