const testData = require('./test/Flow1/Td1.json');
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
        const nextPageButtonSelector = "(//*[@class='lucide lucide-chevron-right'])[2]";
        function iterateThroughJobs() {
            browser.elements('xpath', xPathSelector, function(result) {
                const elementsCount = result.value.length;
                console.log("Total elements found:", elementsCount);

                (function processElement(index) {
                    if (index <elementsCount) {
                        browser
                            .pause(6000)
                            .click(`(${xPathSelector})[${index + 1}]`) // index+1 because index is zero-based
                            .pause(4000)
                            .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                if (result.value === testData.copyjd.jobtitle) {
                                    browser.click("//*[text()='Candidate']")
                                    .pause(3000)
                                    const xPathSelector = "//*[@class='text-[#586f83] dark:text-dark-6']";
                                    // const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";
                            
                                    function iterateThroughCadidate() {
                                        browser.elements('xpath', xPathSelector, function(result) {
                                            const elementsCount = result.value.length;
                                            console.log("Total elements found:", elementsCount);
                            
                                            (function processElement(index) {
                                                if (index <elementsCount) {
                                                    browser
                                                        .click(`(${xPathSelector})[${index + 1}]`) // index+1 because index is zero-based
                                                        .pause(5000)
                                                        .getText("(//*[@class='ml-2 mt-3 text-slate-600 dark:text-white'])[1]", function(result) {
                                                            if (result.value === testData.candidate.candidateName) {
                                                                browser.getText("(//*[@role='tabpanel'])[1]",function(result){
                                                                    console.log(result.value)
                                                                    const expectedCandidateDetails = testData.candidate; // Get the expected job description from test data
                                                                    const actualCandidateDetails = result.value;

                                                                    const isMatch = 
                                                                    actualCandidateDetails.includes(expectedCandidateDetails.CurrentLocation) && 
                                                                    actualCandidateDetails.includes(expectedCandidateDetails.CurrentNoticePeriod) && 
                                                                    actualCandidateDetails.includes(expectedCandidateDetails.CurrentCTC) && 
                                                                    actualCandidateDetails.includes(expectedCandidateDetails.ExpectedCTC) && 
                                                                    actualCandidateDetails.includes(expectedCandidateDetails.ReasonforChange);
                
                                                                    if (isMatch) {
                                                                        console.log("Candidate details matches the expected data.");
                                                                    } else {
                                                                        console.log("The candidate details does not match the expected data.");
                                                                    }
                                                                                })
                                                                
                                                                
                                                               
                                                               
                            
                                                               
                                                            } else {
                                                                console.log("Candidate title does not match, going back to previous page");
                                                                browser
                                                                    .back()
                                                                    .pause(5000)
                                                                    .perform(() => processElement(index + 2)); // Recursive call to process next element, incrementing by 3
                                                                   browser.pause(3000)
                                                            }
                                                        });
                                                } 
                                            })(0); // Start processing elements from index 0
                                        });
                                    }
                                
                            
                                    iterateThroughCadidate();
                                                            
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
                                
                                console.log("----------------->")
                                browser.click(nextPageButtonSelector)
                                    .pause(9000)
                                    .moveToElement("//*[text()='Active Jobs']", 10, 10)
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
       
   
});

