const testData = require('./Td1.json');

module.exports = {
    'Open the browser': function(browser) {
        browser.url(testData.urls.baseUrl)
            .windowMaximize()
            .pause(3000);
    },

    'Login into Ntp page': function(browser) {
        browser.useXpath()
            .setValue("//input[@name='username']", testData.credentials.username)
            .setValue("//input[@name='password']", testData.credentials.password)
            .click("//button[@name='action']")
            .pause(5000)
            .assert.urlContains('hiring', 'Login successful and redirected to Hiring page');
    },

    'Go to hiring model': function(browser) {
        browser.useXpath()
            .click("//a[text()='Hiring']")
            .click("//a[text()='Job Description']")
            .pause(7000)
            .assert.urlContains('jobDescription', 'Navigated to Job Description page');
    },

    'Create new job description': function(browser) {
        browser.useXpath()
            .click("//a[text()='Create New Job']")
            .pause(5000)
            .assert.urlContains('add', 'Navigated to Create New Job page');
    },

    'Enter the data for creating new job description': function(browser) {
        browser.useXpath()
            .setValue("//input[@label='Job Title']", testData.addnewjd.jobtitle)
            .pause(1000)
            .setValue("(//button[@role='combobox'])[1]", 'Trichy')
            .pause(2000)
            .setValue("//*[@placeholder='Enter Skills']", testData.addnewjd.skills)
            .pause(1000)
            .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[1]", testData.addnewjd.responsibilities)
            .pause(3000)
            .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[2]", testData.addnewjd.requirements)
            .pause(3000)
            .click("//button[@type='submit']")
            .pause(12000)
            // .assert.containsText("//div[contains(text(), 'Job created successfully')]", "Job creation success message is displayed");
    },

    'Verify job description created or not': function(browser) {
        const xPathSelector = "(//*[@class='text-sm font-medium'])";
        const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";

        function iterateThroughJobs() {
            browser.elements('xpath', xPathSelector, function(result) {
                const elementsCount = result.value.length;
                console.log("Total elements found:", elementsCount);

                (function processElement(index) {
                    if (index < elementsCount) {
                        browser
                            .click(`(${xPathSelector})[${index + 1}]`)
                            .pause(4000)
                            .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                if (result.value === testData.addnewjd.jobtitle) {
                                    console.log("Job title matches:", result.value);
                                    browser.assert.equal(result.value, testData.addnewjd.jobtitle, "Job title matches the expected title.");

                                    // Fetch and assert job description details
                                    browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(result) {
                                        console.log('JOB DESCRIPTION:');
                                        console.log('--------------------------------------------------');
                                        console.log(result.value);
                                        console.log('--------------------------------------------------');
                                        const expectedJobDescription = testData.addnewjd;
                                        const actualJobDescription = result.value;

                                        const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) &&
                                            expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
                                            expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
                                            expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));

                                        browser.assert.ok(isMatch, "The job description created and matches the expected data.");
                                        browser.back()// Create and verify jd ended
                                        browser.pause(5000)


                                        
                                            const xPathSelector = "(//*[@class='text-sm font-medium'])";
                                            const nextPageButtonSelector = "//li[@class='next']";
                                    
                                            function iterateThroughEditJobs() {
                                                browser.elements('xpath', xPathSelector, function(result) {
                                                    const elementsCount = result.value.length;
                                                    browser.assert.ok(elementsCount > 0, 'Job elements found on the page');
                                    
                                                    (function processElement(index) {
                                                        if (index < elementsCount) {
                                                            browser
                                                                .click(`(${xPathSelector})[${index + 1}]`)
                                                                .pause(4000)
                                                                .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                                                    browser.assert.ok(result.value, 'Job title fetched successfully');
                                                                    
                                                                    if (result.value === testData.addnewjd.jobtitle) {
                                                                        browser
                                                                            .click("//*[text()='Edit']")
                                                                            .pause(3000)
                                                                            .clearValue("//input[@label='Job Title']")
                                                                            .setValue("//input[@label='Job Title']", testData.editjd.jobtitle)
                                                                            .pause(2000)
                                                                            .setValue("(//button[@role='combobox'])[1]", 'Chennai')
                                                                            .pause(3000)
                                                                            .clearValue("//*[@placeholder='Enter Skills']")
                                                                            .setValue("//*[@placeholder='Enter Skills']", testData.editjd.skills)
                                                                            .pause(1000)
                                                                            .clearValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror')])[1]")
                                                                            .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror')])[1]", testData.editjd.responsibilities)
                                                                            .pause(3000)
                                                                            .clearValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror')])[2]")
                                                                            .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror')])[2]", testData.editjd.requirements)
                                                                            .pause(3000)
                                                                            .click("//button[@type='submit']")
                                                                            .pause(9000)
                                                                            .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                                                                browser.assert.strictEqual(result.value, testData.editjd.jobtitle, 'Job title updated correctly');
                                                                                browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function(result) {
                                                                                    console.log('JOB DESCRIPTION:');
                                                                                    console.log('--------------------------------------------------');
                                                                                    console.log(result.value);
                                                                                    console.log('--------------------------------------------------');
                                                                                    const expectedJobDescription = testData.editjd;
                                                                                    const actualJobDescription = result.value;
                                    
                                                                                    const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) &&
                                                                                        expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
                                                                                        expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
                                                                                        expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));
                                    
                                                                                    browser.assert.ok(isMatch, 'The job description was edited and matches the expected data');
                                                                                    browser.back() // edit jd ended
                                                                                    .pause(4000) 
                                                                                    const xPathSelector = "(//*[@class='text-sm font-medium'])";
                                                                                    const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";
                                                                            
                                                                                    // Function to Copy job elements
                                                                                    function checkjd() {
                                                                                        browser.elements('xpath', xPathSelector, function(result) {
                                                                                            const elementsCount = result.value.length;
                                                                                            console.log("Total elements found on page:", elementsCount);
                                                                            
                                                                                            (function processElement(index) {
                                                                                                if (index < elementsCount) {
                                                                                                    browser
                                                                                                        .click(`(${xPathSelector})[${index + 3}]`)
                                                                                                        .pause(4000)
                                                                                                        .getValue("//*[@placeholder='Enter your Job Title']", function(titleResult) {
                                                                                                            console.log("Job Title:", titleResult.value);
                                                                                                            
                                                                                                            if (titleResult.value === testData.editjd.jobtitle) {
                                                                                                                // Perform the job copy
                                                                                                                browser
                                                                                                                    .setValue("//input[@label='Job Title']", testData.copyjd.jobtitle)
                                                                                                                    .pause(2000)
                                                                                                                    .setValue("(//button[@role='combobox'])[1]", 'Chennai')
                                                                                                                    .pause(3000)
                                                                                                                    .setValue("//*[@placeholder='Enter Skills']", testData.copyjd.skills)
                                                                                                                    .pause(1000)
                                                                                                                    .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[1]", testData.copyjd.responsibilities)
                                                                                                                    .pause(3000)
                                                                                                                    .setValue("(//div[@contenteditable='true' and contains(@class, 'ProseMirror') and contains(@class, 'border') and contains(@class, 'rounded-md')])[2]", testData.copyjd.requirements)
                                                                                                                    .pause(3000)
                                                                                                                    .click("//button[@type='submit']")
                                                                                                                    .pause(6000)
                                                                                                                    const xPathSelector = "(//*[@class='text-sm font-medium'])";
                                                                                                                    const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";

                                                                                                                    function iterateThroughCopyJobs() {
                                                                                                                        browser.elements('xpath', xPathSelector, function(result) {
                                                                                                                            const elementsCount = result.value.length;
                                                                                                                            console.log("Total elements found for copy jobs:", elementsCount);

                                                                                                                            (function processElement(index) {
                                                                                                                                if (index < elementsCount) {
                                                                                                                                    browser
                                                                                                                                        .click(`(${xPathSelector})[${index + 1}]`)
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

                                                                                                                                                    browser.assert.ok(isMatch, "Copy Job description matches the expected data.");
                                                                                                                                                    browser.back() //copy js ended
                                                                                                                                                           .pause(3000)
                                                                                                                                                           const xPathSelector = "(//*[@class='text-sm font-medium'])";
                                                                                                                                                            const nextPageButtonSelector = "(//*[@class='lucide lucide-chevron-right'])[2]";

                                                                                                                                                            function iterateThroughJobs() {
                                                                                                                                                                browser.elements('xpath', xPathSelector, function (result) {
                                                                                                                                                                    const elementsCount = result.value.length;
                                                                                                                                                                    console.log("Total elements found:", elementsCount);

                                                                                                                                                                    (function processElement(index) {
                                                                                                                                                                        if (index < elementsCount) {
                                                                                                                                                                            browser
                                                                                                                                                                                .click(`(${xPathSelector})[${index + 1}]`) // Click job element
                                                                                                                                                                                .pause(4000)
                                                                                                                                                                                .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function (textResult) {
                                                                                                                                                                                   
                                                                                                                                                                                    
                                                                                                                                                                                    if (textResult.value === testData.editjd.jobtitle) {
                                                                                                                                                                                        browser
                                                                                                                                                                                            .click("//*[text()='Archive']")
                                                                                                                                                                                            .pause(15000)                                                                                                                                                                                            
                                                                                                                                                                                            .click("//button[text()='Archive']")
                                                                                                                                                                                            .pause(5000);
                                                                                                                                                                            
                                                                                                                                                                                        function iterateThroughArchive() {
                                                                                                                                                                                            browser.elements('xpath', xPathSelector, function (result) {
                                                                                                                                                                                                const elementsCount = result.value.length;
                                                                                                                                                                                                console.log("Total elements found in Archive:", elementsCount);
                                                                                                                                                                            
                                                                                                                                                                                                (function processElement(index) {
                                                                                                                                                                                                    if (index < elementsCount) {
                                                                                                                                                                                                        browser
                                                                                                                                                                                                            .click(`(${xPathSelector})[${index + 1}]`) // Click archived job element
                                                                                                                                                                                                            .pause(4000)
                                                                                                                                                                                                            .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function (textResult) {
                                                                                                                                                                                                                if (textResult.value === testData.editjd.jobtitle) {
                                                                                                                                                                                                                    console.log("Archived job title matches:", textResult.value);
                                                                                                                                                                            
                                                                                                                                                                                                                    browser.getText("//*[@class='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card']", function (descriptionResult) {
                                                                                                                                                                                                                        console.log('ARCHIVE JOB DESCRIPTION:');
                                                                                                                                                                                                                        console.log('--------------------------------------------------');
                                                                                                                                                                                                                        console.log(descriptionResult.value);
                                                                                                                                                                                                                        console.log('--------------------------------------------------');
                                                                                                                                                                                                                        const actualJobDescription = descriptionResult.value;
                                                                                                                                                                                                                        const expectedJobDescription = testData.editjd; // Fetch expected job description
                                                                                                                                                                            
                                                                                                                                                                                                                        // Compare actual job description with expected job description
                                                                                                                                                                                                                        const isMatch = actualJobDescription.includes(expectedJobDescription.jobtitle) &&
                                                                                                                                                                                                                            expectedJobDescription.skills.every(skill => actualJobDescription.includes(skill)) &&
                                                                                                                                                                                                                            expectedJobDescription.responsibilities.every(responsibility => actualJobDescription.includes(responsibility)) &&
                                                                                                                                                                                                                            expectedJobDescription.requirements.every(requirement => actualJobDescription.includes(requirement));
                                                                                                                                                                            
                                                                                                                                                                                                                        browser.assert.ok(isMatch, "Archived job description matches the expected data.");//Archive jd ended
                                                                                                                                                                                                                        browser.back()
                                                                                                                                                                                                                               .pause(3000)
                                                                                                                                                                                                                               const xPathSelector = "(//*[@class='text-sm font-medium'])";
                                                                                                                                                                                                                               const nextPageButtonSelector = "(//*[@class='flex h-8 w-8 items-center justify-center rounded-[3px] hover:bg-primary hover:text-white disabled:opacity-30'])[2]";
                                                                                                                                                                                                                       
                                                                                                                                                                                                                               function iterateThroughJobs() {
                                                                                                                                                                                                                                   browser.elements('xpath', xPathSelector, function(result) {
                                                                                                                                                                                                                                       const elementsCount = result.value.length;
                                                                                                                                                                                                                                       console.log("Total elements found:", elementsCount);
                                                                                                                                                                                                                       
                                                                                                                                                                                                                                       (function processElement(index) {
                                                                                                                                                                                                                                           if (index < elementsCount) {
                                                                                                                                                                                                                                               browser
                                                                                                                                                                                                                                                   .click(`(${xPathSelector})[${index + 1}]`)  // Click job at index
                                                                                                                                                                                                                                                   .pause(4000)
                                                                                                                                                                                                                                                   .getText("(//*[@class='ml-2 mt-3  text-slate-600 dark:text-white'])[1]", function(result) {
                                                                                                                                                                                                                                                       browser.assert.ok(result.value !== '', 'Job title found.');
                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                       if (result.value === testData.editjd.jobtitle) {
                                                                                                                                                                                                                                                           browser
                                                                                                                                                                                                                                                               .click("//*[text()='Edit']")  // Click 'Edit' button
                                                                                                                                                                                                                                                               .setValue("(//button[@role='combobox'])[2]", 'Active')  // Set job status to 'Active'
                                                                                                                                                                                                                                                               .pause(3000)
                                                                                                                                                                                                                                                               .click("//button[@type='submit']")  // Submit form
                                                                                                                                                                                                                                                               .pause(15000)
                                                                                                                                                                                                                                                               .getText("(//*[text()='Active'])[2]", function(result) {
                                                                                                                                                                                                                                                                   const actualJobDescription = result.value;
                                                                                                                                                                                                                                                                   const isMatch = actualJobDescription === 'Active'
                                                                                                                                                                                                                                                                   browser.assert.ok(isMatch, "EditArchived job description matches the expected data.");//EditArchive jd ended
                                                                                                                                                                                                                                                               });
                                                                                                                                                                                                                                                       } else {
                                                                                                                                                                                                                                                           console.log("Job title does not match, going back to previous page");
                                                                                                                                                                                                                                                           browser
                                                                                                                                                                                                                                                               .back()
                                                                                                                                                                                                                                                               .pause(3000)
                                                                                                                                                                                                                                                               .perform(() => processElement(index + 2));  // Recursive call to process next element
                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                   });
                                                                                                                                                                                                                                           } else {
                                                                                                                                                                                                                                               browser.elements('xpath', nextPageButtonSelector, function(result) {
                                                                                                                                                                                                                                                   if (result.value && result.value.length > 0) {  // Check if next page button exists
                                                                                                                                                                                                                                                       browser
                                                                                                                                                                                                                                                           .click(nextPageButtonSelector)  // Click next page
                                                                                                                                                                                                                                                           .pause(3000)
                                                                                                                                                                                                                                                           .perform(() => {
                                                                                                                                                                                                                                                               console.log("Moving to next page");
                                                                                                                                                                                                                                                               iterateThroughJobs();  // Recursive call to iterate jobs on the new page
                                                                                                                                                                                                                                                           });
                                                                                                                                                                                                                                                   } else {
                                                                                                                                                                                                                                                       console.log("No more pages left.");
                                                                                                                                                                                                                                                       browser.end();  // End test if no more pages are available
                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                               });
                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                       })(0);  // Start processing elements from index 0
                                                                                                                                                                                                                                   });
                                                                                                                                                                                                                               }
                                                                                                                                                                                                                       
                                                                                                                                                                                                                               iterateThroughJobs(); 
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                    console.log("Archived job title does not match, going back.");
                                                                                                                                                                                                                    browser.back().pause(3000).perform(() => processElement(index + 2)); // Recursive call for next element
                                                                                                                                                                                                                }
                                                                                                                                                                                                            });
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                        browser.elements('xpath', nextPageButtonSelector, function (result) {
                                                                                                                                                                                                            if (result.value.length > 0) {
                                                                                                                                                                                                                browser
                                                                                                                                                                                                                    .click(nextPageButtonSelector)
                                                                                                                                                                                                                    .pause(3000)
                                                                                                                                                                                                                    .perform(() => {
                                                                                                                                                                                                                        console.log("Moving to next page in Archive.");
                                                                                                                                                                                                                        iterateThroughArchive(); // Recursive call for next page
                                                                                                                                                                                                                    });
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                console.log("No more pages left in Archive.");
                                                                                                                                                                                                                browser.end();
                                                                                                                                                                                                            }
                                                                                                                                                                                                        });
                                                                                                                                                                                                    }
                                                                                                                                                                                                })(0); // Start processing elements from index 0
                                                                                                                                                                                            });
                                                                                                                                                                                        }
                                                                                                                                                                            
                                                                                                                                                                                        iterateThroughArchive();
                                                                                                                                                                                    } else {
                                                                                                                                                                                        console.log("Job title does not match, going back to previous page.");
                                                                                                                                                                                        browser
                                                                                                                                                                                            .back()
                                                                                                                                                                                            .pause(3000)
                                                                                                                                                                                            .perform(() => processElement(index + 3)); // Skip 3 elements for the next iteration
                                                                                                                                                                                    }
                                                                                                                                                                                });
                                                                                                                                                                        } else {
                                                                                                                                                                            browser.elements('xpath', nextPageButtonSelector, function (result) {
                                                                                                                                                                                if (result.value.length > 0) {
                                                                                                                                                                                    browser
                                                                                                                                                                                        .click(nextPageButtonSelector)
                                                                                                                                                                                        .pause(9000)
                                                                                                                                                                                        .perform(() => {
                                                                                                                                                                                            console.log("Moving to next page.");
                                                                                                                                                                                            iterateThroughJobs(); // Start over on the new page
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
                                                                                                                                            } else {
                                                                                                                                                console.log("Job title does not match, going back.");
                                                                                                                                                browser
                                                                                                                                                    .back()
                                                                                                                                                    .pause(3000)
                                                                                                                                                    .perform(() => processElement(index + 3)); // Process next element
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                } else {
                                                                                                                                    browser.elements('xpath', nextPageButtonSelector, function(nextPageResult) {
                                                                                                                                        if (nextPageResult.value && nextPageResult.value.length > 0) {
                                                                                                                                            browser
                                                                                                                                                .click(nextPageButtonSelector)
                                                                                                                                                .pause(3000)
                                                                                                                                                .perform(() => {
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

                                                                                                                    iterateThroughCopyJobs(); 
                                                                            
                                                                                                            } else {
                                                                                                                console.log("Job title does not match, going back.");
                                                                                                                browser
                                                                                                                    .back()
                                                                                                                    .pause(3000)
                                                                                                                    .perform(() => processElement(index + 3)); // Process next element
                                                                                                            }
                                                                                                        });
                                                                                                } else {
                                                                                                    // Check for next page
                                                                                                    browser.elements('xpath', nextPageButtonSelector, function(nextPageResult) {
                                                                                                        if (nextPageResult.value && nextPageResult.value.length > 0) {
                                                                                                            browser
                                                                                                                .click(nextPageButtonSelector)
                                                                                                                .pause(3000)
                                                                                                                .perform(() => {
                                                                                                                    checkjd(); // Recursive call for next page
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
                                                                            
                                                                                    checkjd();
                                                                                    
                                                                                    
                                                                                });
                                                                            });

                                                                    } else {
                                                                        browser
                                                                            .back()
                                                                            .pause(3000)
                                                                            .perform(() => processElement(index + 3));
                                                                        browser.pause(3000);
                                                                    }
                                                                });
                                                        } else {
                                                            browser.elements('xpath', nextPageButtonSelector, function(result) {
                                                                if (result.value.length > 0) {
                                                                    browser
                                                                        .click(nextPageButtonSelector)
                                                                        .pause(9000)
                                                                        .moveToElement("//*[text()='Active Jobs']", 10, 10)
                                                                        .pause(3000)
                                                                        .perform(() => {
                                                                            iterateThroughEditJobs();
                                                                        });
                                                                } else {
                                                                    console.log("No more pages left.");
                                                                    browser.end();
                                                                }
                                                            });
                                                        }
                                                    })(0);
                                                });
                                            }
                                    
                                            iterateThroughEditJobs();
                                    
                                        
                                    });
                                    // browser.end();
                                } else {
                                    console.log("Job title does not match, going back to previous page");
                                    browser
                                        .back()
                                        .pause(3000)
                                        .perform(() => processElement(index + 3));  // Process the next element
                                }
                            });
                    } else {
                        browser.elements('xpath', nextPageButtonSelector, function(result) {
                            if (result.value && result.value.length > 0) {
                                browser
                                    .click(nextPageButtonSelector)
                                    .pause(3000)
                                    .perform(() => {
                                        console.log("Moving to next page");
                                        iterateThroughJobs();
                                    });
                            } else {
                                console.log("No more pages left.");
                                browser.end();
                            }
                        });
                    }
                })(0);
            });
        }

        iterateThroughJobs();
    },
   
    after: function(browser) {
        browser.end();
    }
};
