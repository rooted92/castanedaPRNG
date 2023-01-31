// set parent divs
let main = document.querySelector('main');
let showData = document.querySelector('#showData');
let savedDataList = document.querySelector('#savedDataList');
let prevNames = document.querySelector('#prevNames');

// set buttons and input
let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let randomBtn = document.querySelector('#randomBtn');

// set global variables
let input = '';
let previousNames = [];

// set add event listeners
searchBtn.addEventListener('click', function () {
    input = searchInput.value;
    GetStudentData(input);// add input after testing
});

randomBtn.addEventListener('click', function () {
    showData.textContent = '';
    GetRandomStudent();
});

//set create elements functions
const CreateStudentDataElements = (fName, lName) => {
    let h2 = document.createElement('h2');
    h2.textContent = 'Student Name';
    h2.classList.add('text-start', 'm-2', 'mx-5')
    let h4 = document.createElement('h4');
    h4.textContent = `${fName} ${lName}`;
    h4.classList.add('text-start', 'mt-3', 'mx-5');

    showData.append(h2, h4);
}

const CreateStudenListElements = () => {
    let listDiv = document.createElement('div');
    listDiv.classList.add('mt-4')
    prevNames.innerHTML = 'Previous Names';
    prevNames.append(listDiv);
    listDiv.innerHTML = '';

    for (let i = 0; i < previousNames.length; i++)//iterate over list and create element for each name
    {
        let p = document.createElement('p');
        p.textContent = `${previousNames[i]}`;
        listDiv.append(p);
    }
}

// retrieve data
async function GetStudentData() {
    const promise = await fetch('./data/data.json');
    const data = await promise.json();
    if (input === '') {
        alert('Please enter first or last name, or both.');
    }
    else {
        showData.textContent = '';
        for (let i = 0; i < data.studentNames.length; i++) {
            if (data.studentNames[i].firstName.toLowerCase() === input.toLowerCase() || data.studentNames[i].lastName.toLowerCase() === input.toLowerCase()) {
                CreateStudentDataElements(data.studentNames[i].firstName, data.studentNames[i].lastName);
            }
        }
    }
}

async function GetRandomStudent() {
    const promise = await fetch('./data/data.json');
    const data = await promise.json();
    let randomIndex = Math.floor(Math.random() * data.studentNames.length);
    CreateStudentDataElements(data.studentNames[randomIndex].firstName, data.studentNames[randomIndex].lastName);
    PopulateList(data.studentNames[randomIndex].firstName, data.studentNames[randomIndex].lastName);
}

// function to display list
const PopulateList = (fName, lName) => {
    if (previousNames.length >= 5) {
        previousNames.shift();
    }
    previousNames.push(`${fName} ${lName}`);
    CreateStudenListElements();
}