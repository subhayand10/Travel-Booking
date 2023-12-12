
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const queryParams = new URLSearchParams(search);
  let city=queryParams.get("city")
  return city

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let url=config.backendEndpoint+`adventures?city=${city}`
    const data=await fetch(url)
    const json_data=await data.json()
    return json_data
  }
  catch{
    return null
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures)
  if(adventures)
  {
    let row_ele=document.querySelector("#data")
    adventures.forEach((item)=>{
      var div=document.createElement("div");
      div.setAttribute("class", "col-6 col-md-6 col-lg-3");
      let html_card=`
        <a href="detail/?adventure=${item.id}" id="${item.id}">
          <div class="activity-card card">
            <img src="${item.image}" alt="Resort" >
            <div class="card-body col-md-12 mt-2">
              <div class="  d-flex justify-content-between">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">₹${item.costPerHead}</p>
              </div>
              <div class="text-center d-flex justify-content-between">
                <h5 class="card-duration">Duration</h5>
                <p class="card-durationValue">${item.duration} Hours</p>
              </div>
            </div>
          </div>
        </a>
     `
      div.innerHTML=html_card
      document.getElementById("data").append(div);
  
      /*document.querySelector("#data div a div img").setAttribute("src",`${item.image}`)
      document.querySelector(".card-title").textContent=item.name
      document.querySelector(".card-text").textContent="₹"+item.costPerHead
      document.querySelector(".card-durationValue").textContent=item.duration+" "+"Hours"
      document.querySelector("#data div a").setAttribute("id",`${item.id}`)*/
    //  document.querySelector("#data div a").setAttribute("href",`detail/?adventure=${item.id}`)
      //console.log(item.image)
      
    })
  }
  

  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const adventures_list=list.filter((obj)=>{
    if(obj.duration<=high && obj.duration>=low)
    {
      return obj
    }
  })
return adventures_list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let cat=[]
  let filtered_list=[]
  list.forEach((ele)=>{
    cat.push(ele.category)
  })
  const set_cat=new Set(cat)
  set_cat.forEach((ele,index)=>{
    categoryList.forEach((element)=>{
      if(element.includes(ele))
      {
       filtered_list.push(ele)
      }
    })
})
let adventures_list=list.filter((ele)=>{
  for(let i=0;i<filtered_list.length;i++)
  {
    if(ele.category===filtered_list[i])
    {
      return ele
    }
  }
})
return adventures_list
 

}
//filterByCategory(list,filters.category)

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const duration_string=filters.duration
  let low
  let high
  if(duration_string.includes("+"))
  {
    low=12
    high=Infinity
  }
  else{
  low=parseInt(duration_string.split("-")[0])
  high=parseInt(duration_string.split("-")[1])
  }
  let adventures_list
  
  if(filters!==null && filters.category.length!=0 && filters.duration==="")
  {
    adventures_list=filterByCategory(list,filters.category)
    //console.log("CATEGORY")
    console.log(adventures_list)
  }
  
  if(filters!==null && filters.duration!="" && filters.category.length===0)
  {
    adventures_list=filterByDuration(list,low,high)
    //console.log(adventures_list)
    //console.log("DURATION")
    console.log(adventures_list)
  }

  if(filters!==null && filters.duration!="" && filters.category.length!=0)
  {
    adventures_list=filterByCategory(list,filters.category)
    adventures_list=filterByDuration(adventures_list,low,high)
    //console.log("BOTH")
    //console.log(adventures_list)
  }


  // Place holder for functionality to work in the Stubs
  return adventures_list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  //let duration=filters.duration
  //let category=filters.category
  localStorage.setItem('filters',JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let item
  let return_obj={ duration: "", 
                category: [] 
                }
  let new_set=new Set()
  if(localStorage.length!==0)
  {
    item=localStorage.getItem('filters')
    //console.log( JSON.parse(item))
    let all_filters=JSON.parse(item)
    //console.log(all_filters)
   /*JSON.parse(item).forEach((obj)=>{
      new_set.add(obj.category)
      if(obj.duration>=0 && obj.duration<=2)
        return_obj.duration="0-2"
      if(obj.duration>=2 && obj.duration<=6)
        return_obj.duration="2-6"
      if(obj.duration>=6 && obj.duration<=12)
        return_obj.duration="6-12"
      if(obj.duration>=12)
        return_obj.duration="12+"
    })*/
    for(let i=0;i<all_filters.length;i++)
    {
      new_set.add(all_filters[i].category)
      if(all_filters[i].duration>=0 && all_filters[i].duration<=2)
      return_obj.duration="0-2"
      if(all_filters[i].duration>=2 && all_filters[i].duration<=6)
      return_obj.duration="2-6"
      if(all_filters[i].duration>=6 && all_filters[i].duration<=12)
      return_obj.duration="6-12"
      if(all_filters[i].duration>=12)
      return_obj.duration="12+"
    }
    new_set.forEach((ele)=>{
      return_obj.category.push(ele)
    })
    //console.log(return_obj)
    return return_obj
  }   
    return null


  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let duration=filters.duration
  let category=filters.category
  let insert_here=document.getElementById("category-list")
  insert_here.setAttribute("class","category-filter")
  category.forEach(item => {
    const div = document.createElement("div");
    div.setAttribute("style","display:inline;padding-right:20px")
    div.textContent = item;
    insert_here.appendChild(div);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
