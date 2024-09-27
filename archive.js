const testData = require('./Td1.json');
describe('Create new job description', function() {
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
                                if (result.value === testData.editjd.jobtitle) {
                                    browser.click("//*[text()='Archive']")
                                    console.log("Job Archived", result.value);
                                    browser.pause(15000)
                                    // browser.back()
                                    .perform(() => {
                                        
                                        Archive(); // Recursive call to start over on the new page
                                    });

                                   

                                   
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
    });
        function Archive(){
            it('To verify job description Archived or not', function(browser){
                this.timeout(120000); // Increase timeout for this specific test
               
                console.log("hsjhasvchvbcavhjvdhjv")
                browser.click("//button[text()='Archive']")
                .pause(5000)

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
                                        if (result.value === testData.editjd.jobtitle) {
                                            console.log("Job title matches:", result.value);
                                            browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(result) {
                                                console.log('JOB DESCRIPTION:');
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
                                                console.log("The Archived job description matches the expected data.");
                                            } else {
                                                console.log("The Archived job description does not match the expected data.");
                                            }
                                            });
                                            browser.end();
                                        } else {
                                            console.log("Job title does not match, going back to previous page");
                                            browser
                                                .back()
                                                .pause(3000)
                                                .perform(() => processElement(index + 2)); // Recursive call to process next element, incrementing by 3
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

        
       

        }
        Archive()

   
});

