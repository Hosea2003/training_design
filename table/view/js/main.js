import data from "./data.js"

const nameEntry=document.getElementById("name")
const tbody = document.getElementById("data-display")
const teamEntry = document.getElementById("team")

function display(name=null, team=null){
    let result=data
    if(name)
        result=result.filter(d=>d.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    if(team)
        result=result.filter(d=>d.team.toLocaleLowerCase().includes(team))

    tbody.innerHTML=""

    for(const person of result){
        tbody.innerHTML+=`
        <tr>
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.team}</td>
        </tr>
        `
    }
}

display();



nameEntry.addEventListener("keyup", e=>{
    display(nameEntry.value)
})

teamEntry.addEventListener("keyup", e=>{
    display(nameEntry.value, teamEntry.value)
})