/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Display search bar 
function displaySearchBar() {
    const searchBarHTML = `
        <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>
    `

    const header = document.querySelector("header");
    header.insertAdjacentHTML("beforeend", searchBarHTML);
    return header.innerHTML;
}

displaySearchBar()


// Display a page with 9 students at most
function showPage(list, page) {
    let startIndex = (page * 9) - 9;
    let endIndex = page * 9;
    const studentList = document.querySelector(".student-list")
    studentList.innerHTML = ''

    for (i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            const studentHTML = `
                <li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                        <h3 class="name">${list[i].name.first} ${list[i].name.last}</h3>
                        <span class="email">${list[i].email}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">Joined ${list[i].registered.date}</span>
                    </div>
                </li>
            `
            studentList.insertAdjacentHTML("beforeend", studentHTML);
        }
    }
}


// Displays pagination buttons and shows which one is active
function addPagination(list) {
    const numOfPages = Math.ceil(list.length / 9)
    const linkList = document.querySelector(".link-list");
    linkList.innerHTML = ''
    for (i = 1; i <= numOfPages; i++) {
        const buttonHTML = `
            <li>
                <button type="button">${[i]}</button>
            </li>
        `
        linkList.insertAdjacentHTML("beforeend", buttonHTML);
    }
    
    if (document.getElementsByTagName("button")[1]){
        document.getElementsByTagName("button")[1].className = "active";
    }
    
    linkList.addEventListener("click", (e) => {;
        if (e.target.tagName === "BUTTON") {
            document.querySelector(".active").className = '';
            e.target.classList.add("active");
            showPage(list, e.target.textContent)
        }
    })
}

// searches for the name typed
const search = document.getElementById("search");
const submit = document.querySelector("button");

function performSearch(searchInput, list) {
    let filtered = [];

    for (i = 0; i < list.length; i++) {
        let name = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}` 

        if (searchInput.value.length > 0 && name.includes(searchInput.value.toLowerCase())) {
            filtered.push(list[i]);
        }
    }

    if(search.value.length == ''){
        showPage(data, 1);
        addPagination(data);   
    } else if (filtered.length > 0 && search.value.length > 0) {
        showPage(filtered, 1);
        addPagination(filtered) 
    } else if (filtered.length === 0 && search.value.length > 0) {
        const studentList = document.querySelector(".student-list")
        studentList.innerHTML = `<p>No results found</p>`;
        addPagination(filtered);
    }
}


// Call functions
showPage(data, 1);
addPagination(data);


// Search made responsive
submit.addEventListener('click', (event) => {
    event.preventDefault;
    performSearch(search, data);
});

search.addEventListener('keyup', () => {
    performSearch(search, data);
})

