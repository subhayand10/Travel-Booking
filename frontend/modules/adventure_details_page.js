import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id=search.split("=")[1]
  return id


  // Place holder for functionality to work in the Stubs
 // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let details=await fetch(config.backendEndpoint+`adventures/detail?adventure=${adventureId}`)
    let json_details=await details.json()
    return json_details
  }
  catch{
    return null
  }


  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name =document.getElementById("adventure-name")
  let subtitle =document.getElementById("adventure-subtitle")
  let content =document.getElementById("adventure-content")
  let photos=document.getElementById("photo-gallery")
  name.textContent=adventure.name
  subtitle.textContent=adventure.subtitle
  content.textContent=adventure.content
  adventure.images.forEach((img)=>{
    let new_div =document.createElement("div")
    //new_div.setAttribute("class",`activity-card-image`)
    let new_img =document.createElement("img")
    new_img.setAttribute("src",img)
    new_img.setAttribute("class",`activity-card-image`)
    new_div.append(new_img)
    photos.append(new_div)
  })


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery")
   photoGallery.innerHTML=`
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
   </div>
   <div class="carousel-inner"  id="carousel-inner">
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
   `
   images.map((key,index)=>{
     let divElement = document.createElement("div");
     divElement.className=`carousel-item ${index===0?'active':''}`;
     divElement.innerHTML=`
       <img src=${key} class="activity-card-image pb-3"/>
     `;
     document.getElementById("carousel-inner").appendChild(divElement);
   });
}




//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message
  if(adventure.available===true)
  {
  document.querySelector('#reservation-panel-sold-out').style.display = "none";
  document.querySelector('#reservation-panel-available').style.display = "block"
  document.querySelector('#reservation-person-cost').textContent = adventure.costPerHead;
  }
  else{
  document.querySelector('#reservation-panel-available').style.display = "none";
  document.querySelector('#reservation-panel-sold-out').style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total_cost=persons*adventure.costPerHead
  document.querySelector("#reservation-cost").textContent=total_cost

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  myForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let  data={
      name:myForm.elements["name"].value,
      date:new Date(myForm.elements["date"].value),
      person:myForm.elements["person"].value,
      adventure:adventure["id"]
    }
    //console.log(data);
    try{
      const url=config.backendEndpoint+`reservations/new`;
      const res=await fetch(url,{
        method:"POST",
       headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
      });
     alert("success");
     window.location.reload();
    }
    catch(error){
      console.log(error);
      alert("failed");
 
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure["reserved"]==true){
    document.getElementById("reserved-banner").style.display="block";}
    else{
    document.getElementById("reserved-banner").style.display="none";}

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
