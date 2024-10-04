const testData = require('./test/Flow1/Td1.json');
describe('Create new Candidate', function() {

    it('open the browser', function(browser) {

        browser.url(testData.urls.baseUrl)
            .windowMaximize()
            .pause(6000)
            .useXpath()
            .setValue("//input[@name='username']", testData.credentials.username)
            .setValue("//input[@name='password']", testData.credentials.password)
            .click("//button[@name='action']")
            .pause(4000)
            .click("//a[text()='Hiring']")
            .pause(4000)
            .click("//a[text()='Job Description']")
            .pause(4000)
            .click("(//*[@class='text-sm font-medium'])[1]")
            .pause(4000)
            .click("//*[text()='Candidate']")
            .pause(4000)
            .click("//*[text()='Add New']")
            .pause(4000)

            .execute(function() {
                document.querySelector("input[type='file']").style.display = 'block'; // Make the input visible
            })
            .setValue("//input[@id='file']", require('path').resolve('D:/Desktop/Resume/Abinaya.pdf')) // Correct file path
            .pause(20000)
            .setValue("//*[@name='current_location']", testData.candidate.CurrentLocation)
            .pause(3000)
            .click("//*[@value='yes']")
            .pause(3000)
            .setValue("//*[@name='current_notice_period']", testData.candidate.CurrentNoticePeriod)
            .pause(3000)
            .setValue("//*[@name='current_ctc']", testData.candidate.CurrentCTC)
            .pause(3000)
            .setValue("//*[@name='expected_ctc']", testData.candidate.ExpectedCTC)
            .pause(3000)
            .setValue("//*[@name='reason_for_change']", testData.candidate.ReasonforChange)
            .click("//button[text()='Submit']") // Click the submit button
            .pause(9000);
        const xPathSelector = "//*[@class='text-[#586f83] dark:text-dark-6']";
        // const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";

        function iterateThroughCadidate() {
            browser.elements('xpath', xPathSelector, function(result) {
                // this.timeout(240000); 
                const elementsCount = result.value.length;
                console.log("Total elements found:", elementsCount);

                (function processElement(index) {
                    if (index < elementsCount) {

                        browser
                            .pause(3000)
                            .click(`(${xPathSelector})[${index + 1}]`) // index+1 because index is zero-based
                            .pause(5000)
                            .getText("(//*[@class='ml-2 mt-3 text-slate-600 dark:text-white'])[1]", function(result) {
                                if (result.value === testData.candidate.candidateName) {
                                    browser.getText("(//*[@role='tabpanel'])[1]", function(result) {
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

    })
})