const dropdown = document.getElementById("careerChoices")
const med = document.getElementsByClassName("Med")
const social = document.getElementsByClassName("Social")
const fed = document.getElementsByClassName("Fed")
const state = document.getElementsByClassName("State")
const autoded = document.querySelectorAll(".autoDed")


let grossMonthIncome = 0;

async function fetchJson(url) {
    const resp = await fetch(url);

    return resp.json();
}

async function getCareers() {
    const url = "https://eecu-data-server.vercel.app/data";

    try {
        const jobs = await fetchJson(url);

        for (let job of jobs){
            const option = document.createElement("option");


            option.innerHTML = `${job.Occupation}: $${job.Salary}`;
            option.setAttribute(`data-salary`, `${job.Salary}`); //attribute with salary given to option
            dropdown.appendChild(option);

        }

    } catch (error) {
        console.log("error", error);
    }
}

getCareers(); 

dropdown.addEventListener("input", (option) => {
    //the optiuon the user picks (the code previous)
    const selectedOption = option.target.selectedOptions[0];
    const salary = selectedOption.getAttribute("data-salary");
    //subtracts thje salary by 12 
    grossMonthIncome = Number(salary) / 12;
    document.getElementById("gross").value = `${grossMonthIncome.toFixed(2)}`;
    calcTax(salary);
});


/*create monthly budget from annual salary pulled from api fetch */

// All taxes
function calcTax(grossIncome) {

    // Taxes
    let standDeduc = 16100;
    const medTax = (grossIncome * 0.0145) / 12;
    const socialTax = (grossIncome * 0.062) / 12;
    const stateTax = (grossIncome * 0.04) / 12;

    // Input
    const medElm = document.getElementById("medDeduc")
    const socialElm = document.getElementById("socialDeduc")
    const fedElm = document.getElementById("fedDeduc")
    const stateElm = document.getElementById("stateDeduc")
 

    medElm.value = medTax.toFixed(2)
    socialElm.value = socialTax.toFixed(2)
    stateElm.value = stateTax.toFixed(2)
    
    
    // find taxable ammount
    let taxedInc = Math.max(0, grossIncome - standDeduc);
    let fedTax = 0
        if (taxedInc <= 12400) {
            fedTax = taxedInc * 0.10;
        } else if(taxedInc <= 50400) {
            fedTax = (12400 * 0.10) + (taxedInc - 12400) * 0.12;
        } else {
            fedTax = (12400 * 0.10) + (38000 * 0.12) + (taxedInc -  50400) * 0.22;
        }
        

    fedElm.value = (fedTax / 12).toFixed(2) 
    
    const totAf = document.getElementById("totAf");
    const totTax = medTax + socialTax + stateTax + (fedTax / 12);
    const aftaxInc = grossMonthIncome - totTax;
    totAf.value = aftaxInc.toFixed(2);

}

