var websiteNameInput = document.getElementById("siteName");
var websiteUrlInput = document.getElementById("siteUrl");
var bookmarks = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

// adding the values to the empty array
function addBookmark() {
  if (
    websiteUrlInput.value.trim() === "" || 
    websiteNameInput.value.trim() === "" ||
    websiteUrlInput.classList.contains("is-invalid") ||
    websiteNameInput.classList.contains("is-invalid") 
  ) {
    alertBoxCheck();
    return;
  }
  var bookmark = {
    siteName: websiteNameInput.value,
    siteUrl: websiteUrlInput.value,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  clearForm();
  displayBookmarks();
}

// resetting the form to blanks
function clearForm() {
  websiteNameInput.value = null;
  websiteUrlInput.value = null;
  websiteUrlInput.classList.remove("is-valid");
  websiteNameInput.classList.remove("is-valid");
  websiteUrlInput.classList.remove("is-invalid");
  websiteNameInput.classList.remove("is-invalid");
}

// displaying the form values
function displayBookmarks() {
  var blackBox = "";
  for (var i = 0; i < bookmarks.length; i++) {
    blackBox += ` <tr>
            <td> ${i + 1} </td>
            <td> ${bookmarks[i].siteName} </td>
            <td>
              <button onclick="urlBookmark('${
                bookmarks[i].siteUrl
              }')" class="btn bg-success text-white">
                <i class="fa-solid fa-eye pe-1"></i>Visit
              </button>
            </td>
            <td>
              <button onclick="removeBookmark(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash pe-1"></i>
                Delete
              </button>
            </td>
          </tr> `;
  }

  document.getElementById("bookmarksTable").innerHTML = blackBox;
}

// remove an index from the array and update the array and local storage
function removeBookmark(removedIndex) {
  bookmarks.splice(removedIndex, 1);
  displayBookmarks();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// open the url
function urlBookmark(url) {
  if (!/^https?:\/\//.test(url)) {
    url = "https://" + url;
  }
  window.open(url, "_blank");
}

// REGEX
function validateInputName(input) {
  var regex = /^[a-zA-Z0-9]{3,}$/;
  var value = input.value.trim();

  if (regex.test(value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function validateInputUrl(input) {
  var regex = /^[a-zA-Z0-9]+(\.[a-zA-Z]{2,})+$/;
  var value = input.value.trim();

  if (regex.test(value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

//alert box
var alert = document.getElementById("alertBox");
var close = document.getElementById("close");

function alertBoxCheck() {
  if (
    websiteUrlInput.value.trim() === "" || 
    websiteNameInput.value.trim() === "" ||
    websiteUrlInput.classList.contains("is-invalid") ||
    websiteNameInput.classList.contains("is-invalid")
  ) {
    alert.classList.remove("d-none");
    alert.classList.add("d-block");
  } else {
    alert.classList.remove("d-block");
    alert.classList.add("d-none");
  }
}

close.addEventListener("click", () => {
  alert.classList.remove("d-block");
  alert.classList.add("d-none");
});
