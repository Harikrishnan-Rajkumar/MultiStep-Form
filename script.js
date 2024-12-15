document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem("selectedPlan")) {
        localStorage.setItem("selectedPlan", "arcadeBox");
    }

    // Form elements
    let nameEl = document.getElementById("idName");
    let emailEl = document.getElementById("idEmail");
    let telEl = document.getElementById("idTel");

    // Error messages
    let nameError = document.querySelector(".name-error");
    let emailError = document.querySelector(".email-error");
    let telError = document.querySelector(".phone-error");

    // Plan/Addon Elements
    let totalTermEl = document.querySelector(".total-term");    
    let planFreeElements = document.querySelectorAll('.plan-free');
    let monthlyPlans = document.querySelectorAll(".plan-rate-m");
    let yearlyPlans = document.querySelectorAll('.plan-rate-y');
    let monthlyAddons = document.querySelectorAll(".addon-rate-m");    
    let yearlyAddons = document.querySelectorAll(".addon-rate-y");
    let addonMonthlyRateEl = document.querySelectorAll(".rm");
    let addonYearlyRateEl = document.querySelectorAll(".ry");

    //Get Page1 Saved Inputs
    let savedName = localStorage.getItem("name");
    let savedEmail = localStorage.getItem("email");
    let savedTel = localStorage.getItem("tel");

    //If Page1 has saved inputs substitute it to empty values
    if (savedName) {
        nameEl.value = savedName;
    }
    if (savedEmail) {
        emailEl.value = savedEmail;
    }
    if (savedTel) {
        telEl.value = savedTel;
    }

    // Sidebar Button Elements      
    let firstBtnEl = document.getElementById("first-btn")
    let secondBtnEl = document.getElementById("second-btn")
    let thirdBtnEl = document.getElementById("third-btn")
    let fourthBtnEl = document.getElementById("fourth-btn")

    // Next Button Elements 
    let nxtBtnTo2ndPageEl = document.getElementById("nxtBtnTo2ndPage");
    let nxtBtnTo3rdPageEl = document.getElementById("nxtBtnTo3rdPage");
    let nxtBtnTo4thPageEl = document.getElementById("nxtBtnTo4thPage");
    let nxtBtnTo5thPageEl = document.getElementById("nxtBtnTo5thPage");

    // Back Button Elements 
    let backBtnTo1stPageEl = document.getElementById("backBtnTo1stPage"); 
    let backBtnTo2ndPageEl = document.getElementById("backBtnTo2ndPage"); 
    let backBtnTo3rdPageEl = document.getElementById("backBtnTo3rdPage");  

    //Finishing Page to Plan Page Change Btn Element
    let changeBtnEl = document.getElementById("changeBtn");

    //Each Page Elements
    let planPage = document.getElementById("planPage");
    let infoPage = document.getElementById("infoPage");
    let addOnsPage = document.getElementById("addonsPage");
    let finishingPage = document.getElementById("finishingPage");
    let thankyouPage = document.getElementById("thankyouPage");


    let finishPlanTitleEl = document.getElementById("finishingPlanTitle");
    let finishPlanRateEl = document.getElementById("finishingPlanRate");
    let totalAmountEl = document.getElementById("totalAmount");
    totalAmountEl.textContent = finishPlanRateEl.textContent;
    
    let totalAmount = 0;

    //Finishing Page Addon List
    let FinishAddOnContainerEl = document.getElementById("finish-addon-list");
    
    //Toggle Button Element
    let toggle = document.getElementById('check');

    // Selected plan and add-ons storage
    let selectedPlan = null;
    let selectedAddons = [];
    let planPrice = 0;
    let addonPrice = 0;

//Validate Page1 Inputs
    //Name Validation
    function validateName() {        
        if (nameEl.value.trim() === "") {
            nameError.classList.remove("d-none");
            nameEl.classList.add("error-brd");  
            nameError.textContent="This field is required";
        } else if(nameEl.value.trim().length < 4){
            nameError.classList.remove("d-none");
            nameEl.classList.add("error-brd");  
            nameError.textContent="Minimum 4 characters required";
        } else {
            nameError.classList.add("d-none");
            nameEl.classList.remove("error-brd");
        }
    }
    //Email Validation
    function validateEmail() {
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailEl.value.trim() === "") {
            emailError.classList.remove("d-none");
            emailEl.classList.add("error-brd");            
            emailError.textContent="This field is required";
        } else if(!emailPattern.test(emailEl.value.trim())){
            emailError.classList.remove("d-none");
            emailEl.classList.add("error-brd");
            emailError.textContent="Please enter a valid email address";
        } else {
            emailError.classList.add("d-none");
            emailEl.classList.remove("error-brd");
        }
    }
    //Phone number validation
    function validateTel() {
        if (telEl.value.trim() === "") {
            telError.classList.remove("d-none");
            telEl.classList.add("error-brd");
            telError.textContent="This field is required";
        } else if (telEl.value.trim().length < 7) {
            telError.classList.remove("d-none");
            telEl.classList.add("error-brd");
            telError.textContent = "Please enter a valid phone number";
        } else if (telEl.value.trim().length > 19) {
            telError.classList.remove("d-none");
            telEl.classList.add("error-brd");
            telError.textContent = "Please enter a valid phone number";
        } else if (!telEl.value.trim().startsWith("+")) {
            telError.classList.remove("d-none");
            telEl.classList.add("error-brd");
            telError.textContent = "Please enter country code";
        }else {
            telError.classList.add("d-none");
            telEl.classList.remove("error-brd");
        }
    }
    
    nameEl.addEventListener("blur", validateName);
    emailEl.addEventListener("blur", validateEmail);
    telEl.addEventListener("blur", validateTel);

    //Phone number validation - Prevent Characters
    telEl.addEventListener('keydown', function (event) {
        if (
            !(event.key >= '0' && event.key <= '9') && 
            event.key !== '+' || 
            (event.key === '+' && telEl.selectionStart !== 0) || 
            event.key === 'Backspace' 
        ) {
            if (
                event.key === 'Backspace' ||  
                event.key === 'Delete' ||     
                event.key === 'ArrowLeft' ||
                event.key === 'ArrowRight'  
            ) {
                return; 
            }
            event.preventDefault(); 
        }
    });
    //Remove Validation Error when in Focus
    nameEl.addEventListener("focus", () => {
        nameError.classList.add("d-none");
        nameEl.classList.remove("error-brd");
    });
    emailEl.addEventListener("focus", () => {
        emailError.classList.add("d-none");
        emailEl.classList.remove("error-brd");
    });
    telEl.addEventListener("focus", () => {
        telError.classList.add("d-none");
        telEl.classList.remove("error-brd");
    });
//Page1 Validation Completed

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            checkbox.checked = !checkbox.checked;
            event.preventDefault();
            checkbox.blur();
          }
        });
    });
    //updation of other El based on toggle
    function updatePlanDisplay(isChecked) {
        if (isChecked) {
            planFreeElements.forEach(function(element) {
                element.classList.remove('d-none');
            });
            monthlyPlans.forEach(function(plan) {
                plan.classList.add('d-none');
            });
            monthlyAddons.forEach(function(addon) {
                addon.classList.add('d-none');
            });
            yearlyPlans.forEach(function(plan) {
                plan.classList.remove('d-none');
            });
            yearlyAddons.forEach(function(addon) {
                addon.classList.remove('d-none');
            });
            addonYearlyRateEl.forEach(function(addon) {
                addon.classList.remove('d-none');
            });
            addonMonthlyRateEl.forEach(function(addon) {
                addon.classList.add('d-none');
            });
            totalTermEl.textContent = "(per year)";
        } else {
            planFreeElements.forEach(function(element) {
                element.classList.add('d-none');
            });
            yearlyPlans.forEach(function(plan) {
                plan.classList.add('d-none');
            });
            yearlyAddons.forEach(function(addon) {
                addon.classList.add('d-none');
            });
            monthlyPlans.forEach(function(plan) {
                plan.classList.remove('d-none');
            });
            monthlyAddons.forEach(function(addon) {
                addon.classList.remove('d-none');
            });
            addonYearlyRateEl.forEach(function(addon) {
                addon.classList.add('d-none');
            });
            addonMonthlyRateEl.forEach(function(addon) {
                addon.classList.remove('d-none');
            });
            totalTermEl.textContent = "(per month)";
        }
    }

    //Plan term selection (monthly/yearly)
    toggle.addEventListener('change', function() {
        localStorage.setItem('toggleChecked', toggle.checked);    
        updatePlanDisplay(toggle.checked);

        let selectedPlanId = localStorage.getItem("selectedPlan");
        if (selectedPlanId) {
            updateFinishingPage(selectedPlanId);
        }
    });

    function updateCheckboxState(checkbox) {
        let label = checkbox.closest('label');
        label.classList.toggle('addon-label-selected', checkbox.checked);
        localStorage.setItem(checkbox.id, checkbox.checked);
    }
    /////25.11.2024
    let selectedCheckboxes = []; 

    let addonBoxes = document.querySelectorAll('.form-check-input');
    addonBoxes.forEach(function(checkbox) {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
    
        if (checkbox.checked) {
            selectedCheckboxes.push(checkbox.id);
        }
    
        console.log(selectedCheckboxes);
    
        checkbox.addEventListener('change', function() {
            updateCheckboxState(this);
    
            if (this.checked) {
                if (!selectedCheckboxes.includes(this.id)) {
                    selectedCheckboxes.push(this.id);
                }
            } else {
                selectedCheckboxes = selectedCheckboxes.filter(id => id !== this.id);
            }
    
            console.log(selectedCheckboxes);
            updateAddonVisibility();
        });
    });

    function updateAddonVisibility() {
        let addonRows = document.querySelectorAll('#finish-addon-list .table-row');
        let numericFinishPlanRateEl = parseInt(finishPlanRateEl.textContent.replace(/[^0-9.-]+/g, ""));        
        totalAmount = 0;   
        if (selectedCheckboxes.length > 0){
            selectedCheckboxes.forEach(function(addonservice){
                let a = document.getElementById(addonservice);
                let aLabel = a.closest('label');
                let aRateContainer = aLabel.querySelector('.addon-rate-container');
                let aRate = aRateContainer.querySelector(".addon-rate-m").textContent; 
                let numericRate = parseInt(aRate.replace(/[^0-9.-]+/g, ""));
                totalAmount += numericRate;
                console.log(totalAmount);
            });
        } else{         
            console.log(totalAmount);
        }
    
        addonRows.forEach(function(row) {
            let addonTitle = row.querySelector('.f-addon-title');
    
            // Normalize the addon title (remove spaces, convert to lowercase)
            let normalizedTitle = addonTitle.textContent.trim().replace(/\s+/g, '').toLowerCase();
    
            // If the selectedCheckboxes do not contain the normalized title, hide its row
            if (addonTitle && !selectedCheckboxes.some(id => id.replace(/\s+/g, '').toLowerCase() === normalizedTitle)) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
                console.log(row.querySelector(".rm"))
            }
        });
    }   
    
    // Initially, check the visibility of add-ons based on the selected checkboxes
    updateAddonVisibility();
    
    
    function updateCheckboxState(checkbox) {
        localStorage.setItem(checkbox.id, checkbox.checked);
    }   

    addonBoxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateCheckboxState(this);
        });
    });

    function hideAllPage(){
        planPage.classList.add("d-none");
        infoPage.classList.add("d-none");
        addOnsPage.classList.add("d-none");
        finishingPage.classList.add("d-none");
        thankyouPage.classList.add("d-none");
    }
    function removellAllSidebarBtn(){
        firstBtnEl.classList.remove("btn-selected");
        secondBtnEl.classList.remove("btn-selected");
        thirdBtnEl.classList.remove("btn-selected");
        fourthBtnEl.classList.remove("btn-selected");
    }

    function navigateToPlanPage() {
        hideAllPage();
        planPage.classList.remove("d-none");

        removellAllSidebarBtn();   
        secondBtnEl.classList.add("btn-selected");
    }

    function updateFinishingPage(selectedPlanId){
        let planTitles = {
            "arcadeBox" : "Arcade",
            "advancedBox": "Advanced",
            "proBox": "Pro"
        };
        let planRates = { 
            "arcadeBox": 9,
            "advancedBox": 12,
            "proBox": 15
        };
        let planName = planTitles[selectedPlanId];

        let monthlyRate = planRates[selectedPlanId];

        let savedToggleState = localStorage.getItem('toggleChecked');
        let toggleChecked = (savedToggleState === 'true');
        toggle.checked = toggleChecked;

        if (toggleChecked) {
            // Yearly rate is 10 times the monthly rate
            finishPlanTitleEl.textContent = `${planName} (Yearly)`;
            finishPlanRateEl.textContent = `$${monthlyRate * 10}/yr`;  
        } else {
            // Monthly rate
            finishPlanTitleEl.textContent = `${planName} (Monthly)`;
            finishPlanRateEl.textContent = `$${monthlyRate}/mo`;  
        }
    }
    function updateTotal(){
        let numericFinalPlanRate = parseInt(finishPlanRateEl.textContent.replace(/[^0-9.-]+/g, ""));

        let savedToggleState = localStorage.getItem('toggleChecked');
        let toggleChecked = (savedToggleState === 'true');
        toggle.checked = toggleChecked;
        if (toggleChecked){
            totalAmount = totalAmount * 10;
        } else if (totalAmount > 0){
            totalAmount += numericFinalPlanRate;
            console.log(totalAmount)
        } else{
            console.log(totalAmount)
        }
    }
    nxtBtnTo2ndPageEl.addEventListener('click', (event)=>{        
        event.preventDefault();

        validateName();
        validateEmail();
        validateTel();

        if (nameError.classList.contains("d-none") && emailError.classList.contains("d-none") && telError.classList.contains("d-none")) {
            //Save Valid Page1 Input Elements Locally
            localStorage.setItem("name", nameEl.value.trim());
            localStorage.setItem("email", emailEl.value.trim());
            localStorage.setItem("tel", telEl.value.trim());
            
            hideAllPage();
            planPage.classList.remove("d-none");    
            removellAllSidebarBtn();
            secondBtnEl.classList.add("btn-selected");

            let selectedPlanId = localStorage.getItem("selectedPlan");

            if (selectedPlanId) {
                updateFinishingPage(selectedPlanId);  // Update the plan rate when moving to finishing page
            }
            updatePlanDisplay(toggle.checked);
            
            let radioButtons = document.querySelectorAll('input[name="planTypeRadio"]');
        
            let savedPlan = localStorage.getItem("selectedPlan");
            if (savedPlan) {
                let savedRadioButton = document.getElementById(savedPlan);
                if (savedRadioButton) {
                    savedRadioButton.checked = true;
                    updateFinishingPage(savedPlan);
                }
            }
            radioButtons.forEach(function(radioButton) {
                radioButton.addEventListener('change', function() {
                    if (radioButton.checked) {
                        localStorage.setItem("selectedPlan", radioButton.id);
                        updateFinishingPage(radioButton.id);
                    }
                });
            });
            
        }
    });
    nxtBtnTo3rdPageEl.addEventListener('click', (event)=>{
        event.preventDefault();
        hideAllPage();
        addOnsPage.classList.remove("d-none"); 

        removellAllSidebarBtn();  
        thirdBtnEl.classList.add("btn-selected");
        
        totalAmountEl.textContent = finishPlanRateEl.textContent;//total final page update
        
    });
    nxtBtnTo4thPageEl.addEventListener('click', (event)=>{
        event.preventDefault();
        hideAllPage();
        finishingPage.classList.remove("d-none"); 

        removellAllSidebarBtn();  
        fourthBtnEl.classList.add("btn-selected");
    });
    nxtBtnTo5thPageEl.addEventListener('click', (event)=>{
        event.preventDefault();
        hideAllPage();
        thankyouPage.classList.remove("d-none");

        removellAllSidebarBtn(); 
        fourthBtnEl.classList.add("btn-selected");  
    });
    backBtnTo1stPageEl.addEventListener('click', (event)=>{
        event.preventDefault();
        hideAllPage();
        infoPage.classList.remove("d-none");  

        removellAllSidebarBtn(); 
        firstBtnEl.classList.add("btn-selected");
    });
    backBtnTo2ndPageEl.addEventListener('click', (event)=>{
        event.preventDefault();
        navigateToPlanPage();
    });
    changeBtnEl.addEventListener('click', (event)=>{
        event.preventDefault();
        navigateToPlanPage();
    });
    backBtnTo3rdPageEl.addEventListener('click', (event)=>{
        event.preventDefault();
        hideAllPage();
        addOnsPage.classList.remove("d-none");    

        removellAllSidebarBtn();
        thirdBtnEl.classList.add("btn-selected");
    });
});
