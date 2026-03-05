const addbutton = document.getElementById('add-button')
const modal=document.getElementById('modal')
const innermodal=document.getElementById('modal-inner')
const exitbutton=document.querySelector('.bi-x-circle-fill')
const checkbutton=document.querySelector('.bi-check-circle-fill')
const weekdays=document.querySelector('.Calendar').querySelectorAll('div');
const weekdayselector=document.querySelector('.days')
const selectedmealplan=document.querySelector('.selectedmeal')
const meals=document.querySelector('.meals')
const mealimages=document.querySelector('.modal-images')




//Populate the list selection for meals 
fetch('food.json')
.then(response=> response.json())
.then(data=>{
(data.map(json=>json.Meal)).forEach(item => {
    let mealoptions=document.createElement('option')
    mealoptions.textContent=item
    mealsdropdown.append(mealoptions)
})  
  
mealsdropdown.addEventListener("change", (e) => {
const mealimageslink=modalimages.querySelector('a')
const mealimagessrc=modalimages.querySelector('img')
mealimagessrc.src=data[e.target.selectedIndex].Img
mealimageslink.href=data[e.target.selectedIndex].URL
})


})

// Create dropdown list selection for weekdays
weekdays.forEach(weekday => {
let options=document.createElement('option')
options.value=weekday.id 
// The value of the weekdays were assigned their ID's i.e. M, T, W, etc. 
options.textContent=weekday.textContent
weekdayselector.append(options)
})
console.log(weekdayselector.options)


addbutton.addEventListener('click', () => {
modal.classList.add("open");
selectedmealplan.textContent=localStorage.getItem("mealplan");
const innermodalclone=innermodal.cloneNode(true)
const innerButtong = innermodalclone.querySelector('.bi-check-circle-fill');
const innerButtonr = innermodalclone.querySelector('.bi-x-circle-fill');
const weekdaydropdown=innermodalclone.querySelector('.days')
const deleteappended=innermodalclone.querySelector('.bi-trash3-fill')
const mealsdropdown=innermodalclone.querySelector('.meals')
const modalimages=innermodalclone.querySelector('.modal-images')
modal.appendChild(innermodalclone)
    innerButtong.addEventListener('click', () =>{
        document.getElementById(String(weekdaydropdown.value)).appendChild(innermodalclone);
        modal.classList.remove('open')
        innermodalclone.classList.add('appended')
        innerButtong.remove()
        innerButtonr.remove()
    })
   selectedmealplan.textContent=localStorage.getItem("mealplan");
    modal.addEventListener('click', (e) => {
    if (e.target=="modal"){
        modal.classList.remove("open");
    }; 
});
    // if (!modal.contains(innermodal)){
    //     createinnermodals(); 
    // }
});

modal.addEventListener('click', (e) => {
if (e.target===modal){
        modal.classList.remove("open");
    }; 
});

exitbutton.addEventListener('click', () =>{
    if (modal.classList.contains('open')) {
        modal.classList.remove("open");
    } else{
        innermodal.remove()
        createinnermodals()
    }
})

const testing1=[innermodal].map(elements=>{
    console.log(elements.textContent)
})
function savestate(){
    const elements =[innermodal].map(elements =>({
        text: elements.textContent,
        color:elements.style.backgroundColor,
        id:elements.id
    }))
    localStorage.setItem("pageState,",JSON.stringify(elements))
}


function createinnermodals(){
selectedmealplan.textContent=localStorage.getItem("mealplan");
const innermodalclone=innermodal.cloneNode(true)
modal.appendChild(innermodalclone)
attachButtonEvents(innermodalclone)
}
// function editinnermodals(){
// modal.classList.add("open");
// const innermodalclone=innermodal.cloneNode(true)
// // modal.appendChild(innermodalclone)
// attachButtonEvents(innermodalclone)
// }

// Function that controls all actions of the innermodal
function attachButtonEvents(boxElement) {
const innerButtong = boxElement.querySelector('.bi-check-circle-fill');
const innerButtonr = boxElement.querySelector('.bi-x-circle-fill');
const weekdaydropdown=boxElement.querySelector('.days')
const deleteappended=boxElement.querySelector('.bi-trash3-fill')
const mealsdropdown=boxElement.querySelector('.meals')
const modalimages=boxElement.querySelector('.modal-images')

// function savestate(){
//     const elements =[].

// }

//Populate the list selection for meals 
fetch('food.json')
.then(response=> response.json())
.then(data=>{
(data.map(json=>json.Meal)).forEach(item => {
    let mealoptions=document.createElement('option')
    mealoptions.textContent=item
    mealsdropdown.append(mealoptions)
})  
  
mealsdropdown.addEventListener("change", (e) => {
const mealimageslink=modalimages.querySelector('a')
const mealimagessrc=modalimages.querySelector('img')
mealimagessrc.src=data[e.target.selectedIndex].Img
mealimageslink.href=data[e.target.selectedIndex].URL
})


})

// After clicking check button in preview screen, these apply changes to innermodal
innerButtong.addEventListener('click', () => {
document.getElementById(String(weekdaydropdown.value)).appendChild(boxElement);
modal.classList.remove('open')
boxElement.classList.add('appended')
innerButtong.remove()
innerButtonr.remove()
// weekdaydropdown.remove()

// Will likely need same code here for rebuilding as with dropping
mealsdropdown.style.display="none"
const test2=[boxElement].map(boxel=>{
    console.log(boxel.id)
    console.log(boxel.parentElement.id)
})
// Allows for user to also change where they want to place it using drop down 
weekdaydropdown.addEventListener("change", (e) => {
e.preventDefault();
document.getElementById(String(weekdaydropdown.value)).appendChild(boxElement);  
})


})




// Event Listeners Controling Movements of Items

boxElement.addEventListener('dblclick',(e) => {
modal.classList.add("open");
// weekdayselector.remove()

      })
boxElement.addEventListener("dragstart", (e)=> {
    chosen=e.target;
    
})
weekdays.forEach((weekday,weekdayindex) =>{
    weekday.addEventListener("dragover", (e) =>{
    e.preventDefault()
});
    // boxElement.addEventListener('dragend', () => {
    // weekdaydropdown.value=weekday.textContent
    // console.log(weekdaydropdown.value)
    // })

weekday.addEventListener("drop", (e) =>{
    weekday.appendChild(chosen)    
    const dropdown=chosen.querySelector('.days')
    dropdown.options[weekdayindex].selected=true;

    console.log(chosen)
    const chosenmeal=chosen.querySelector(".meals")
    const test2=[chosen].map(boxel=>({
    mealbanner:boxel.querySelector(".selectedmeal").className,
    mealbannertext:boxel.querySelector(".selectedmeal").textContent,
    mealvalue:chosenmeal.value,
    mealclass:boxel.className,
    mealweekday:boxel.parentElement.id,
    selectedmealid:boxel.id
}))
console.log(test2)
localStorage.setItem("ogstate",JSON.stringify(test2))
  const saved = JSON.parse(localStorage.getItem("ogstate"));
    console.log(saved)
    if (!saved) return;
    saved.forEach(item => {
        const box = document.createElement("div");
        const mealbanner=document.createElement("span")
        box.value=item.mealvalue
        box.id=item.selectedmealid
        box.className=item.mealclass
        mealbanner.className=item.mealbanner
        mealbanner.textContent=item.mealbannertext
        box.appendChild(mealbanner)
        const weekcontainer=item.mealweekday 
        const testmealplan=item.selectedmeal
        console.log(box)
        document.getElementById(String(weekcontainer)).appendChild(box);
    });

    })

});


// Create a Save and Restart Button for the Week. Save will contain window event listener while refresh will will be location.reload() to reset the calendar
window.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("ogstate"));
    console.log(saved)
    if (!saved) return;
    saved.forEach(item => {
        const box = document.createElement("div");
        box.value=item.mealvalue
        box.id=item.mealid
        box.classList.add('appended')
        const weekcontainer=item.mealweekday
        document.getElementById(String(weekcontainer)).appendChild(box);
    });
});


innerButtonr.addEventListener('click', () => {
modal.classList.remove('open')
boxElement.remove()
});


}
