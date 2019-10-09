// set new variables
const linkCategory = document.getElementById('linkCategory');
const submitButton = document.getElementById('submitButton');
const addButton = document.getElementById('addButton');
const cancelButton = document.getElementById('cancelButton');
const linkPanel = document.getElementById('linkPanel');
const linkList = document.getElementById('linkList');
const addedCategory = document.getElementById('addedCategory');
const deleteLinkButton = document.getElementById('deleteLinkButton');
const editLinkButton = document.getElementById('editLinkButton');
const addLinkContainer = document.getElementById('addLinkContainer');
let linkCategories = [];
let edit = false;
let editIndex;
let links = [{
    title: 'Link 1',
    url: 'link1.com',

    categories: ['node js', 'javascript'],
  },
  {
    title: 'Link 2',
    url: 'link2.com',
    categories: ['angular', 'javascript'],
  },
  {
    title: 'Link 3',
    url: 'link3.com',
    categories: ['react js', 'javascript'],
  },
];

//call display links funtion
displayLinks();

/*
 handle categories input field . take in comma seperated
 values and store in linkCategoriesarray
*/

// add an event listener on linkCategory input field
linkCategory.addEventListener('keydown', function(event) {
  // everytime comma pressed append value before to linkCategories array
  if (event.keyCode === 188) {

    //stops comma from staying by preventing default action
    event.preventDefault();

    // append to array
    linkCategories.push(linkCategory.value);

    //display Categories as entered
    displayLinkCategories();

    // reset input field
    linkCategory.value = '';



  }

});

//function to display the linkCategories
function displayLinkCategories() {
  //clear out addedCategory <div>
  addedCategory.innerHTML = '';
  //generate category for each one in linkCategories array
  for (let category of linkCategories) {
    let categoryHTMLString = `<span class="category">${category}</span>`;
    console.log(categoryHTMLString);
    //add each to addedCategory <div>
    addedCategory.innerHTML += categoryHTMLString;
  }
}

/*
 Submit Button
 1) get the input from the title, url
   input fields & categories from linkCategories array
 2)create a link object
 3)add link object to links array
*/

// add an event listener on submit buttons
submitButton.addEventListener('click', function(event) {

  //prevent page from submitting so we can see the log
  event.preventDefault();

  //create a link object from inputs
  const newLink = {
    //key : value
    title: linkTitle.value,
    url: linkUrl.value,
    categories: linkCategories,
  };
  if (edit == true){
    links[editIndex] = newLink;
  }
  else{
    links.unshift(newLink);
  }
  //append newLink to links array unshift puts new items first


  // reset
  resetForm();

  // call function displayLinkCategories as entered
  displayLinkCategories();

  //hide addLinkContainer
  hideElement(addLinkContainer);

  //call displayLinks to update with new link
  displayLinks();


});

function resetForm(){
  linkTitle.value = '';
  linkUrl.value = '';
  linkCategory.value = '';
  linkCategories = [];
  addedCategory.innerHTML = '';
}

/*
  Add Button
 1)
 2)
 3)
*/
addButton.addEventListener('click', function(event) {
  resetForm();
  //set edit to false
  edit = false;
  //show addLinkContainer
  showElement(addLinkContainer);
  addLinkHeading.innerHTML = `Add Link`;

  // alert('addButton working');
  // console.log('add button working');

});

/*
 Cancel Button
 1)
 2)
 3)
*/
cancelButton.addEventListener('click', function(event) {
  event.preventDefault();
  // reset
  resetForm();
  //hide
  hideElement(addLinkContainer);
  // alert('cancelButton working');
  // console.log('cancelButton working');

});

// function to hide items
function hideElement(element) {

  element.classList.add('hidden');
}

//funtion to show items
function showElement(element) {
  element.classList.remove('hidden');
}


/*
 funtion to display links dynamically
 1)clear all from linkList <div>
 2)iterrate through array of links
 3)
*/
function displayLinks() {
  //get the date and timeout
  var date = Date();
  date = date.toString().slice(4,-40);
  //clear linkList <div>
  linkList.innerHTML = '';

  //itterate through links array
  for (let link of links) {
    let index = links.indexOf(link);
    let linkHTMLString = `
    <div class="flex-item">
        <div class="link panel">

            <div class="linkButtons">
                <button class="sm-but link-button"
                    onclick="deleteLink(${index})">Delete</button>
                <button class="sm-but link-button"
                    onclick="editLink(${index})">Edit</button>
            </div>

            <a href="${link.url}">
              <h1 class="panelHeading">${link.title}</h1>
            </a>

            <p class="linkDate">${date}</p>

            <div class="linkCategories">
              Categories:`;

    //iterate through categories add to string
    for (let category of link.categories) {
      linkHTMLString += `<span class="category">${category}</span>`;
    }
    // add the end to string literal
    linkHTMLString += `
                        </div>
                    </div>
                  </div>`;

    //add each nuw link to linkList
    linkList.innerHTML += linkHTMLString;
  }
}


/*
 deleteLinkButton
 1)pass in index through on onclick function
 2)use splice to remove the object at index
 3)redisplay the links that are left
*/
function deleteLink(index){
  alert('working');
  links.splice(index, 1);
  displayLinks();

}

/*
 deleteLinkButton
 1)launch the
 2)
 3)
*/
function editLink(index){
  editIndex = index;
  //set the input values to the valus of link at that index
  linkTitle.value = links[index].title;
  linkUrl.value = links[index].url;
	linkCategories = links[index].categories;
  // addLinkHeading.innerHTML = '';
  showElement(addLinkContainer);
  edit = true;
  addLinkHeading.innerHTML = `Edit Link`;
}
