
// Get the modal
const modal = document.getElementById("myModal");

function openModal() {

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

modal.style.display = "block";

}

function closeModal(){
    modal.style.display = "none";
    // document.location.reload();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*
navigator.permissions.query({ name: "camera" }).then((result) => {
  if (result.state === "granted") {
    console.log('granted');
  } else if (result.state === "prompt") {
    console.log('not granted');
  } else {console.log('denied!!')}
});
*/
