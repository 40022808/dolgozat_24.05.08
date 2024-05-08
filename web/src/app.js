/*Author: Ye Haoze
Group: I-2-N
Date: 2024-05-08 */

const doc = {
    empsBody:document.querySelector("#empsBody"),
    addbutton:document.querySelector("#addbutton"),
    exampleModalLabel:document.querySelector("#exampleModalLabel"),
    idInput:document.querySelector("#idInput"),
    nameInput:document.querySelector("#nameInput"),
    cityInput:document.querySelector("#cityInput"),
    salaryInput:document.querySelector("#salaryInput")
}

const state = {
    host: 'http://localhost:8000',
    endpoint:'employees',
    complainant:'névtelen',
    description:'Hiba',
    products: 'valami'

}

doc.addbutton.addEventListener('click',()=>{
    addEmployees()
})

function addEmployees() {
    let url = state.host + '/' + state.endpoint
    if (doc.idInput.value == "") {
        fetch(url, {
            method:'Post',
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                complainant: state.complainant,
                description: state.description,
                products: state.products})
        })
    }
    else if (doc.idInput.value != "") {
        szerkesztes(doc.idInput.value)
    }
}

function szerkesztes(id) {
    const url = state.host + '/' +
        state.endpoint +
        '/' + id
    fetch(url, {
        method:'PUT',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            complainant: state.complainant,
            description: state.description,
            products: state.products})
    })
}


function getEmployees() {
    let url = state.host + '/' + state.endpoint
    fetch(url)
    .then((response)=> response.json())
    .then(result => {
        renderEmployees(result)
    })
}

function renderEmployees(empList) {

    empList.forEach(emp => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.complainant}</td>
            <td>${emp.description}</td>
            <td>${emp.products}</td>
            <td>${emp.type}</td>
            <td>
                <button class="btn btn-primary" data-id="${emp.id}" data-name="${emp.name}" data-city="${emp.city}" data-salary="${emp.salary}" onclick="updataEmployee(this)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Szerkesztés
                </button>
                <button class="btn btn-danger" onclick="deleteEmployee(${emp.id})">
                    Törlés
                </button>
                <button class="btn btn-danger" onclick="updataEmployee2(${emp.id})">
                    megoldva
                </button>
            </td>
        `
        doc.empsBody.appendChild(tr)
        console.log(emp.city)
    });
}

function updataEmployee(source) {
    doc.exampleModalLabel.textContent = "Szerkesztés"
    const url = state.host + '/' +
        state.endpoint +
        '/' + source.dataset.id
    console.log(source.dataset.id)
    doc.idInput.value = source.dataset.id
    doc.nameInput.value = source.dataset.name
    doc.cityInput.value = source.dataset.city
    doc.salaryInput.value = source.dataset.salary
    
}


function updataEmployee2(source) {
    doc.exampleModalLabel.textContent = "Szerkesztés"
    const url = state.host + '/' +
        state.endpoint +
        '/' + source.dataset.id
    console.log(source.dataset.id)
    doc.idInput.value = source.dataset.id
    doc.nameInput.value = source.dataset.name
    doc.cityInput.value = source.dataset.city
    doc.salaryInput.value = source.dataset.salary
    
}

function deleteEmployee(id) {
    const url = state.host + '/' +
        state.endpoint +
        '/' + id
    fetch(url, {method:'Delete'})
}


getEmployees()