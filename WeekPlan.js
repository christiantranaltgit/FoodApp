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
const savebutton=document.getElementById('save')
const savefoodplan=document.getElementById('Save')
const reset=document.getElementById('Reset')


// Create dropdown list selection for weekdays
weekdays.forEach(weekday => {
let options=document.createElement('option')
options.value=weekday.id 
// The value of the weekdays were assigned their ID's i.e. M, T, W, etc. 
options.textContent=weekday.textContent
weekdayselector.append(options)
})


addbutton.addEventListener('click', () => {
    modal.classList.add("open");
    createinnermodals()
   selectedmealplan.textContent=localStorage.getItem("mealplan");
    modal.addEventListener('click', (e) => {
    if (e.target=="modal"){
        modal.classList.remove("open");
    }; 
});

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

let clonenumber=0;

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
boxElement.dataset.uid=`clonenumber-${clonenumber++}`;
const innerButtong = boxElement.querySelector('.bi-check-circle-fill');
const innerButtonr = boxElement.querySelector('.bi-x-circle-fill');
const weekdaydropdown=boxElement.querySelector('.days')
const deleteappended=boxElement.querySelector('.bi-trash3-fill')
const mealsdropdown=boxElement.querySelector('.meals')
const modalimages=boxElement.querySelector('.modal-images')


//Populate the list selection for meals 
fetch('/food.json')
.then(response=> response.json())
.then(data=>{
(data.map(json=>json.Meal)).forEach(item => {
    let mealoptions=document.createElement('option')
    mealoptions.textContent=item
    mealsdropdown.append(mealoptions)
})  
const mealimageslink=modalimages.querySelector('a')
let savedstatus=false
mealimageslink.addEventListener('click', (e) => {
    if (!savedstatus)
    e.preventDefault()
})

  
mealsdropdown.addEventListener("change", (e) => {
console.log(e.target.parentElement.dataset.uid)
const mealimageslink=modalimages.querySelector('a')
const mealimagessrc=modalimages.querySelector('img')
mealimagessrc.src=data[e.target.selectedIndex].Img
mealimageslink.href=data[e.target.selectedIndex].URL


const mealchangeinnermodaloriginalstate=JSON.parse(localStorage.getItem("ogstate"))
console.log(mealchangeinnermodaloriginalstate)
const mealchangedindex=mealchangeinnermodaloriginalstate.findIndex(obj=>obj.assignedindex===e.target.parentElement.dataset.uid)
console.log(mealchangedindex)
mealchangeinnermodaloriginalstate[mealchangedindex].mealvalue=e.target.parentElement.querySelector('.meals').value
mealchangeinnermodaloriginalstate[mealchangedindex].mealimagesrc=data[e.target.selectedIndex].Img
mealchangeinnermodaloriginalstate[mealchangedindex].mealimagehref=data[e.target.selectedIndex].URL
localStorage.setItem("ogstate",JSON.stringify(mealchangeinnermodaloriginalstate))
console.log(JSON.parse(localStorage.getItem('ogstate')))
})

})

// After clicking check button in preview screen, these apply changes to innermodal
innerButtong.addEventListener('click', () => {
document.getElementById(String(weekdaydropdown.value)).appendChild(boxElement);
modal.classList.remove('open')
boxElement.classList.add('appended')
deleteappended.classList.add('appended')
innerButtong.remove()
innerButtonr.remove()
// mealsdropdown.style.display="none"
weekdaydropdown.style.display="none"
console.log(modalimages)
deleteappended.addEventListener('click', (e) =>{
    boxElement.remove()
})

const innermodaloriginalstate=[...document.querySelectorAll(".modal-inner.appended")].map((boxel,index)=>({
mealbanner:boxel.querySelector(".selectedmeal").className,
mealbannertext:boxel.querySelector(".selectedmeal").textContent,
mealimagesrc:boxel.querySelector('.modal-images').querySelector('img').src,
mealimagehref:boxel.querySelector('.modal-images').querySelector('a').href, 
mealvalue:boxel.querySelector('.meals').value,
mealclass:boxel.className,
mealweekday:boxel.parentElement.id,
selectedmealid:boxel.id,
deletebutton:'bi bi-trash3-fill appended',
assignedindex:boxel.dataset.uid
}))

localStorage.setItem("ogstate",JSON.stringify(innermodaloriginalstate))
console.log(JSON.parse(localStorage.getItem('ogstate')))

// Allows for user to also change where they want to place it using drop down 
weekdaydropdown.addEventListener("change", (e) => {
e.preventDefault();
document.getElementById(String(weekdaydropdown.value)).appendChild(boxElement);  
})

reset.addEventListener('click', () =>{
            boxElement.remove()
        })
})

// Delete Button 
deleteappended.addEventListener('click', () =>{
boxElement.remove()
const innermodaloriginalstate=[...document.querySelectorAll(".modal-inner appended")].map(boxel=>({
mealbanner:boxel.querySelector(".selectedmeal").className,
mealbannertext:boxel.querySelector(".selectedmeal").textContent,
mealvalue:boxel.querySelector('.meals').value,
mealclass:boxel.className,
mealweekday:boxel.parentElement.id,
selectedmealid:boxel.id,
deletebutton:'bi bi-trash3-fill appended'
}))

localStorage.setItem("ogstate",JSON.stringify(innermodaloriginalstate))
})



// Event Listeners Controling Movements of Items

boxElement.addEventListener('dblclick',(e) => {
modal.classList.add("open");
// weekdayselector.remove()
})
boxElement.addEventListener("dragstart", (e)=> {
    chosen=e.target;
    isdragging=true;
    
})
boxElement.addEventListener("dragend", (e)=> {
    e.preventDefault()
    isdragging=true;
    
})

let isdragging=false
let holdTimer;
boxElement.addEventListener('mousedown', (e)=>{
    if (isdragging) {return};
    holdTimer=setTimeout(()=>{
        console.log('Press detected')
    },3000)
})

weekdays.forEach((weekday,weekdayindex) =>{
    weekday.addEventListener("dragover", (e) =>{
    e.preventDefault()
    isdragging=true
});




weekday.addEventListener("drop", (e) =>{
    weekday.appendChild(chosen)   
    const dropdown=chosen.querySelector('.days')
    dropdown.options[weekdayindex].selected=true;

    const dropinnermodaloriginalstate=JSON.parse(localStorage.getItem("ogstate"))
    const droppedindex=dropinnermodaloriginalstate.findIndex(obj=>obj.assignedindex===chosen.dataset.uid)
    console.log(droppedindex)
    dropinnermodaloriginalstate[droppedindex].mealweekday=chosen.parentElement.id 
    localStorage.setItem("ogstate",JSON.stringify(dropinnermodaloriginalstate))
    console.log(JSON.parse(localStorage.getItem('ogstate')))
    })

    });
innerButtonr.addEventListener('click', () => {
modal.classList.remove('open')
boxElement.remove()
});


}
// const savefoodplan=document.getElementById('Save')
// const reset=document.getElementById('Reset')

savefoodplan.addEventListener('click', () => {
    location.reload()
})

// Returns Everything to Original Window Upon Reload 
window.addEventListener("DOMContentLoaded", () => {
const saved = JSON.parse(localStorage.getItem("ogstate"));
console.log(saved)
if (!saved) return;
    saved.forEach(item => {
        const box = document.createElement("div");
        const modalimages=document.createElement("div");
        const mealbanner=document.createElement("span")
        const deletebutton=document.createElement("i")
        const mealsdropdown=document.createElement("select")
        const mealsdropdownvalue=document.createElement("option")
        const mealimagesrc=document.createElement("img")
        const mealimagehref=document.createElement('a')
        mealimagesrc.width=150;
        mealimagesrc.height=150;
        mealimagehref.href=item.mealimagehref
        mealimagesrc.src=item.mealimagesrc
        mealimagehref.appendChild(mealimagesrc)
        modalimages.className='modal-images'
        modalimages.appendChild(mealimagehref)
        mealsdropdown.className='meals'
        mealsdropdownvalue.value=item.mealvalue
        mealsdropdown.appendChild(mealsdropdownvalue)
        box.id=item.selectedmealid
        box.className=item.mealclass
        mealbanner.className=item.mealbanner
        mealbanner.textContent=item.mealvalue
        console.log(mealbanner.textContent)
        mealbanner.classList.add('appended')
        deletebutton.className=item.deletebutton
        box.appendChild(mealbanner)
        console.log(mealbanner)
        box.appendChild(modalimages)
        box.appendChild(deletebutton)
        box.appendChild(mealsdropdown)
        mealsdropdown.style.visibility="hidden";
        const weekcontainer=item.mealweekday 
        const testmealplan=item.selectedmeal
        console.log(box)
        document.getElementById(String(weekcontainer)).appendChild(box);
        reset.addEventListener('click', () =>{
            box.remove()
        })

deletebutton.addEventListener('click', () =>{
box.remove()
    });
})
    
})