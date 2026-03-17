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

/* Adding expenseInputs and putting the total in expenseTotal */

// function to add inputs together
function totalExpenses() {
    // get all inputs with class expenseInput
    const expenseInputs = document.querySelectorAll(".expenseInput");
    let total = 0;
    // for each input, add value to total, and if thwere is no value add 0
    expenseInputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });

    // Keep the student loan total updated (sum of all inputs with id="studentloanInput")
    updateStudentLoanTotal();

    // set expenseTotal to total
    document.querySelector(".expenseTotal").value = total.toFixed(2);
}

// add event listener to all inputs with class expenseInput
const expenseInputs = document.querySelectorAll(".expenseInput");

for (let input of expenseInputs) {
    input.addEventListener("input", totalExpenses);
}












/* chart */

// NOTE: HTML uses the same id for multiple student loan inputs. QuerySelectorAll still works.
const studentloanInputs = document.querySelectorAll(".studentloanInput");
let studentLoanTotal = 0;

function updateStudentLoanTotal() {
    studentLoanTotal = Array.from(studentloanInputs).reduce((sum, input) => sum + (parseFloat(input.value) || 0), 0);

    if (typeof myChart !== "undefined" && myChart?.data?.datasets?.[0]) {
        myChart.data.datasets[0].data[0] = studentLoanTotal;    
        myChart.update();
    }

    return studentLoanTotal;
}

const housingInputs = document.getElementsByClassName("housingInput");
const essentialsInputs = document.getElementsByClassName("essentialsInput");
const lifestyleInputs = document.getElementsByClassName("lifestyleInput");
const futureproofingInputs = document.getElementsByClassName("futureproofingInput");

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Student Loans', 'Housing', 'Essentials', 'Lifestyle', 'Future-Proofing'],
        datasets: [{
            label: '$',
            data: [studentLoanTotal,
                   6,
                   3,
                   5,
                   2],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});