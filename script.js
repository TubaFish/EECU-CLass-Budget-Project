const dropdown = document.getElementById("careerChoices")

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

dropdown.addEventListener("input", (option) => { //figure out a way to grab salary from option


})

function getMonthlyIncome() {
    getMonthlyIncome = []
    getMonthlyIncome = '${job.Salary} / 12'

getMonthlyIncome()
}
