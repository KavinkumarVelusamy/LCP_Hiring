// const testData = require('./testData.json');
// describe('Create new job description', function() {
//     this.timeout(120000); // Increase timeout to 120 seconds for the entire suite
//     it('open the browser', function(browser) {
//         this.timeout(120000); // Increase timeout for this specific test
//         browser
//             .url(testData.urls.baseUrl)
//             .maximizeWindow()
//             .pause(3000)
//             .useXpath()
//             .setValue("//input[@name='username']", testData.credentials.username)
//             .setValue("//input[@name='password']", testData.credentials.password)
//             .click("//button[@name='action']")
//             .pause(3000)
//             .click("//a[text()='Hiring']")
//             .pause(3000)
//             .click("//a[text()='Job Description']")
//             .pause(3000);
//             const xPathSelector = "(//*[@class='text-sm font-medium'])";
//             const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";
    
//             function iterateThroughJobs() {
//                 browser.elements('xpath', xPathSelector, function(result) {
//                     const elementsCount = result.value.length;
//                     console.log("Total elements found:", elementsCount);
    
//                     (function processElement(index) {
//                         if (index <elementsCount) {
//                             browser
//                                 .click(`(${xPathSelector})[${index + 3}]`) // index+1 because index is zero-based
//                                 .pause(4000)
//                                 .getValue("//*[@placeholder='Enter your Job Title']", function(result) {
//                                     console.log(result)
//                                     if (result.value === testData.addnewjd.jobtitle) {
//                                     browser.click("//*[@type='submit']")         
//                                     } else {
//                                         console.log("Job title does not match, going back to previous page",result.value);
//                                         browser
//                                             .back()
//                                             .pause(3000)
//                                             .perform(() => processElement(index + 3)); // Recursive call to process next element, incrementing by 3
//                                            browser.pause(3000)
//                                     }
//                                 });
//                         } else {
//                             browser.elements('xpath', nextPageButtonSelector, function(result) {
//                                 if (result.value && result.value.length > 0) { // Next button exists
//                                     browser
//                                         .click(nextPageButtonSelector)
//                                         .pause(3000)
//                                         .perform(() => {
//                                             console.log("Moving to next page");
//                                             iterateThroughJobs(); // Recursive call to start over on the new page
//                                         });
//                                 } else {
//                                     console.log("No more pages left.");
//                                     browser.end();
//                                 }
//                             });
//                         }
//                     })(0); // Start processing elements from index 0
//                 });
//             }
//             iterateThroughJobs();
//             // const xPathSelector = "(//*[@class='text-sm font-medium'])";
//             // const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";
    
//             // Step 2: Function to iterate through jobs
//             function iterateThroughcopyJobs() {
//                 browser.elements('xpath', xPathSelector, function(result) {
//                     const elementsCount = result.value.length;
//                     console.log("Total elements found:", elementsCount);
    
//                     (function processElement(index) {
//                         if (index < elementsCount) {
//                             // Click on the job element
//                             browser
//                                 .click(`(${xPathSelector})[${index + 1}]`) // index+1 because index is zero-based
//                                 .pause(4000)
//                                 .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
//                                     // Step 3: Compare job title
//                                     if (result.value === testData.addnewjd2.jobtitle) {
//                                         console.log("Job title matches:", result.value);
    
//                                         // Step 4: Fetch and compare job description
//                                         browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(descriptionResult) {
//                                             console.log('JOB DESCRIPTION:');
//                                             console.log('--------------------------------------------------');
//                                             console.log(descriptionResult.value);
//                                             console.log('--------------------------------------------------');
    
//                                             const expectedJobDescription = testData.addnewjd2; // Expected job description
//                                             const actualJobDescription = descriptionResult.value; // Job description from the browser
    
//                                             // Step 5: Compare the actual job description with the expected one
//                                             const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) &&
//                                                 expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
//                                                 expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
//                                                 expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));
    
//                                             if (isMatch) {
//                                                 console.log("The job description matches the expected data.");
//                                             } else {
//                                                 console.log("The job description does not match the expected data.");
//                                             }
//                                         });
    
//                                     } else {
//                                         console.log("Job title does not match, going back to previous page");
//                                         browser
//                                             .back()
//                                             .pause(3000)
//                                             .perform(() => processElement(index + 3)); // Recursive call to process next element
//                                     }
//                                 });
//                         } else {
//                             // Step 6: Check if next page button exists
//                             browser.elements('xpath', nextPageButtonSelector, function(result) {
//                                 if (result.value && result.value.length > 0) { // Next button exists
//                                     browser
//                                         .click(nextPageButtonSelector)
//                                         .pause(3000)
//                                         .perform(() => {
//                                             console.log("Moving to next page");
//                                             iterateThroughcopyJobs(); // Recursive call to start over on the new page
//                                         });
//                                 } else {
//                                     console.log("No more pages left.");
//                                     browser.end();
//                                 }
//                             });
//                         }
//                     })(0); // Start processing elements from index 0
//                 });
//             }
    
//             iterateThroughcopyJobs(); // Start iterating through job listings

//         });
//     });
    
    
           
            //  const xPathSelector1 = "(//*[@class='text-sm font-medium'])";
            //                         const nextPageButtonSelector1 = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";                            
            //                         function iterateThroughcopyJobs() {
            //                             describe('Create new job description', function() {
            //                                 this.timeout(120000); // Increase timeout to 120 seconds for the entire suite
            //                                 it('open the browser', function(browser) {
            //                             browser.elements('xpath', xPathSelector1, function(result) {
            //                                 const elementsCount = result.value.length;
            //                                 console.log("Total elements found:", elementsCount);
                            
            //                                 (function processElement(index) {
            //                                     if (index <elementsCount) {
            //                                         browser
            //                                             .click(`(${xPathSelector1})[${index + 1}]`) // index+1 because index is zero-based
            //                                             .pause(4000)
            //                                             .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
            //                                                 if (result.value === testData.addnewjd2.jobtitle) {
            //                                                             console.log("Job title matches:", result.value);
            //                                                             browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(result) {
            //                                                                 console.log('jOB DESCRIPTION:');
            //                                                                 console.log('--------------------------------------------------');
            //                                                                 console.log(result.value);
            //                                                                 console.log('--------------------------------------------------');
            //                                                             const expectedJobDescription = testData.addnewjd2; // Get the expected job description from test data
            //                                                             const actualJobDescription = result.value; // The job description fetched from the browser
                                    
            //                                                             // Compare the actual job description with the expected one
            //                                                             const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) && 
            //                                                                             expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
            //                                                                             expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
            //                                                                             expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));
                                    
            //                                                             if (isMatch) {
            //                                                                 console.log("The job description matches the expected data.");
            //                                                             } else {
            //                                                                 console.log("The job description does not match the expected data.");
            //                                                             }
            //                                                             })
                                                                        
            //                                                         // }
            //                                                     // })
                                                                
                            
                                                               
            //                                                 } else {
            //                                                     console.log("Job title does not match, going back to previous page");
            //                                                     browser
            //                                                         .back()
            //                                                         .pause(3000)
            //                                                         .perform(() => processElement(index + 3)); // Recursive call to process next element, incrementing by 3
            //                                                        browser.pause(3000)
            //                                                 }
            //                                             });
            //                                     } else {
            //                                         browser.elements('xpath', nextPageButtonSelector1, function(result) {
            //                                             if (result.value && result.value.length > 0) { // Next button exists
            //                                                 browser
            //                                                     .click(nextPageButtonSelector)
            //                                                     .pause(3000)
            //                                                     .perform(() => {
            //                                                         console.log("Moving to next page");
            //                                                         iterateThroughcopyJobs(); // Recursive call to start over on the new page
            //                                                     });
            //                                             } else {
            //                                                 console.log("No more pages left.");
            //                                                 browser.end();
            //                                             }
            //                                         });
            //                                     }
            //                                 })(0); // Start processing elements from index 0
            //                             });
            //                         })
            //                     })
            //                         }
                            
            //                         iterateThroughcopyJobs();



const testData = require('./Td1.json');

describe('Copy job description', function() {
    this.timeout(120000); // Increase timeout to 120 seconds for the entire suite

    it('open the browser', function(browser) {
        this.timeout(120000); // Increase timeout for this specific test
        browser
            .url(testData.urls.baseUrl)
            .maximizeWindow()
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

        // Function to iterate through job elements
        function iterateThroughJobs() {
            browser.elements('xpath', xPathSelector, function(result) {
                const elementsCount = result.value.length;
                console.log("Total elements found on page:", elementsCount);

                (function processElement(index) {
                    if (index < elementsCount) {
                        browser
                            .click(`(${xPathSelector})[${index + 3}]`) // Click the job element
                            .pause(4000)
                            .getValue("//*[@placeholder='Enter your Job Title']", function(titleResult) {
                                console.log("Job Title:", titleResult.value);
                                
                                if (titleResult.value === testData.editjd.jobtitle) {
                                    
                                    browser.setValue("//input[@label='Job Title']", testData.copyjd.jobtitle)
                                    // .setValue("//input[@label='Job Title']",testData.addnewjd2.jobtitle)
                                    .pause(2000)
                                    .setValue("(//button[@role='combobox'])[1]",'Chennai')
                                    .pause(3000)
                                    .setValue("//*[@placeholder='Enter Skills']",testData.copyjd.skills)
                                    .pause(1000)
                                    // .setValue("(//button[@role='combobox'])[2]",'Active')
                                    .pause(3000)
                                    // .click("(//*[@class='tiptap ProseMirror rounded-md border min-h-[150px] border-input p-2'])[1]")
                                    // .pause(3000)
                                    .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[1]", testData.copyjd.responsibilities)
                                    .pause(3000)
                                    .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[2]", testData.copyjd.requirements)
                                    .pause(3000)
                                    .click("//button[@type='submit']")
                                    
                                    // browser.back()
                                    .pause(6000)
                                    .perform(() => {
                                        // console.log("Moving to next page");
                                        iterateThroughCopyJobs(); // Recursive call for next page
                                    });  

                                } else {
                                    // Job title does not match, go back to previous page
                                    console.log("Job title does not match, going back.",elementsCount);
                                    browser
                                        .back()
                                        .pause(3000)
                                        .perform(() => processElement(index + 3)); // Recursive call for next element
                                }
                            });
                    } else {
                        // End of current page; check if there's a next page
                        browser.elements('xpath', nextPageButtonSelector, function(nextPageResult) {
                            if (nextPageResult.value && nextPageResult.value.length > 0) { // Next button exists
                                browser
                                    .click(nextPageButtonSelector)
                                    .pause(3000)
                                    .perform(() => {
                                        console.log("Moving to next page");
                                        iterateThroughJobs(); // Recursive call for the next page
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

        iterateThroughJobs(); // Start the iteration process for job listings

        // Function to iterate through jobs for comparing descriptions
        function iterateThroughCopyJobs() {
            const xPathSelector = "(//*[@class='text-sm font-medium'])";
            const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";
            browser.elements('xpath', xPathSelector, function(result) {
                const elementsCount = result.value.length;
                console.log("Total elements found for copy jobs:", elementsCount);

                (function processElement(index) {
                    if (index < elementsCount) {
                        browser
                            .click(`(${xPathSelector})[${index + 1}]`) // Click on the job element
                            .pause(4000)
                            .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(titleResult) {
                                if (titleResult.value === testData.copyjd.jobtitle) {
                                    console.log("Job title matches:", titleResult.value);

                                    // Fetch and compare job description
                                    browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(descriptionResult) {
                                        console.log('COPY JOB DESCRIPTION:');
                                        console.log('--------------------------------------------------');
                                        console.log(descriptionResult.value);
                                        console.log('--------------------------------------------------');

                                        const expectedJobDescription = testData.copyjd;
                                        const actualJobDescription = descriptionResult.value;

                                        // Compare the actual job description with the expected one
                                        const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) &&
                                            expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
                                            expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
                                            expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));

                                        if (isMatch) {
                                            console.log("The job description was copied and matches the expected data.");
                                        } else {
                                            console.log("The copy job description does not match the expected data.");
                                        }
                                    });
                                } else {
                                    console.log("Job title does not match, going back.",elementsCount);
                                    browser
                                        .back()
                                        .pause(3000)
                                        .perform(() => processElement(index + 3)); // Process next element
                                }
                            });
                    } else {
                        // End of current page; check if there's a next page
                        browser.elements('xpath', nextPageButtonSelector, function(nextPageResult) {
                            if (nextPageResult.value && nextPageResult.value.length > 0) {
                                browser
                                    .click(nextPageButtonSelector)
                                    .pause(3000)
                                    .perform(() => {
                                        console.log("Moving to next page");
                                        iterateThroughCopyJobs(); // Recursive call for next page
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

        iterateThroughCopyJobs(); // Start the job description comparison process
    });
});



       