import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  let loader = document.querySelector(".content p");
  let div_loader = document.querySelector(".content div");
  loader.setAttribute("id", `hide-loader`);
  div_loader.setAttribute("id", `hide-loader`);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

return fetch(config.backendEndpoint+"cities")
.then(res=>res.json())
.then(data=>data)
.catch(err=>null)
  

}

//Implementatio of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let row_ele=document.querySelector("#data")
  let column_ele=document.createElement("div")
  column_ele.setAttribute("class","column col-6 col-sm-6 col-lg-3 activity-card mb-4")
  //row_ele.append(column_ele)
  
  let column_ele_a=document.createElement("a")
  // column_ele_a.setAttribute("href",`../../frontend/pages/adventures/?city=${id}`)
   column_ele_a.setAttribute(
     "href",
     `./pages/adventures/?city=${id}`
   );
  column_ele_a.setAttribute("id",`${id}`)
  column_ele.append(column_ele_a)

  let column_ele_a_img=document.createElement("img")
  column_ele_a_img.setAttribute("src",image)
  column_ele_a.append(column_ele_a_img)

  let column_ele_a_div=document.createElement("div")
  column_ele_a_div.setAttribute("id","text")
  column_ele_a.append(column_ele_a_div)
  
  let div_heading=document.createElement("h4")
  div_heading.textContent=city
  column_ele_a_div.append(div_heading)

  let div_para=document.createElement("p")
  div_para.textContent=description
  column_ele_a_div.append(div_para)
  
  row_ele.append(column_ele)


}

export { init, fetchCities, addCityToDOM };
