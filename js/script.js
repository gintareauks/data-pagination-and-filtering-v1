/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Search bar 
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

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

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
                        <h3 class="name">${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function paginationButtons(list) {
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
    const firstButton = document.getElementsByTagName("button")[0];
    firstButton.classList.add("active");

    
    linkList.addEventListener("click", (e) => {;
        if (e.target.tagName === "BUTTON") {
            document.querySelector(".active").className = '';
            e.target.classList.add("active");
            showPage(list, e.target.textContent)
        }
    })
}


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
    // console.log(filtered);

    if(search.value.length == ''){
        showPage(data, 1);
        paginationButtons(data);   
    } else if (filtered.length > 0 && search.value.length > 0) {
        showPage(filtered, 1);
        paginationButtons(filtered) 
    } else if (filtered.length === 0 && search.value.length > 0) {
        const studentList = document.querySelector(".student-list")
        studentList.innerHTML = `<p>No results found</p>`;
        paginationButtons(list);
    }
}



// Call functions

showPage(data, 1);
paginationButtons(data);

submit.addEventListener('click', (event) => {
    event.preventDefault;
    performSearch(search, data);
    
});

search.addEventListener('keyup', () => {
    performSearch(search, data);
})

