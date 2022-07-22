console.log("This is Library Project");

showbooks();

//If user adds a book add it to a local storage
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let edition = document.getElementById('edition').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    if (name.length > 3 && author.length > 3) {
        let books = localStorage.getItem("books");
        if (books == null) {
            booksObj = [];
        }
        else {
            booksObj = JSON.parse(books);
        }
        myBooks = {
            book_name: name,
            book_author: author,
            book_edition: edition,
            book_type: type
        }
        booksObj.push(myBooks);
        localStorage.setItem("books", JSON.stringify(booksObj));
        clear();
        showbooks();
        showmsg('success', 'Your book has been successfully added');
    }
    else {
        showmsg('danger', 'Sorry you cannot add this book');
    }
    e.preventDefault();
}


//Function to show elements from localStorage
function showbooks() {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    let uistring = "";
    booksObj.forEach(function (element, index) {
        uistring = uistring + ` 
            <tr class="booksrow">
                <td>${index+1}</td>
                <td>${element.book_name}</td>
                <td>${element.book_author}</td>
                <td>${element.book_edition}</td>
                <td>${element.book_type}</td>
                <td><button onclick="deleteBook(this.id)" id="${index}" class="btn btn-dark" style="float:right;">Delete Book</button></td>
            </tr>`;
    });
    let tableBody = document.getElementById("tableBody");
    if (booksObj.length != 0) {
        tablepara.style.display = "none";
        tableHead.style.display = "table";
        tableBody.innerHTML = uistring;
    }
    else {
        tableHead.style.display = "none";
        tablepara.style.display = "block";
    }
}


function clear() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}


function showmsg(type, displaymsg) {
    let message = document.getElementById('message');
    let boldText;
    if (type === 'success') {
        boldText = 'Congratulations';
        message.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </symbol>
            </svg>
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    <strong>${boldText}</strong> ${displaymsg}
                </div>
            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 3000);
    }
    else {
        boldText = 'Error!';
        message.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
            </svg>
            <div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    <strong>${boldText}</strong> ${displaymsg}
                </div>
            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 3000);
    }
}


//Function to Delete a note 
function deleteBook(index) {
    let books = localStorage.getItem("books");
    if (books == null) {
        booksObj = [];
    }
    else {
        booksObj = JSON.parse(books);
    }
    booksObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(booksObj));
    showbooks();
}


//Function to Search a note 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("Search Event Fired", inputVal);
    let booksrow = document.getElementsByClassName('booksrow');
    Array.from(booksrow).forEach(function (element) {
        let booksN = element.getElementsByTagName("td")[1].innerText.toLowerCase();
        let booksA = element.getElementsByTagName("td")[2].innerText.toLowerCase();
        let booksE = element.getElementsByTagName("td")[3].innerText.toLowerCase();
        let booksT = element.getElementsByTagName("td")[4].innerText.toLowerCase();
        if ((booksN.includes(inputVal)) || (booksA.includes(inputVal)) || (booksE.includes(inputVal))|| (booksT.includes(inputVal))) {
            // element.style.display = "table";
        }
        else {
            element.style.display = "none";
        }
    });
})
