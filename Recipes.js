
const addbutton = document.getElementById('add-button')
const modal=document.getElementById('modal')
const innermodal=document.getElementById('modal-inner')
const checkbutton=document.getElementById('check-button')
const exitbutton=document.getElementById('exit-button')
const mealname=document.getElementById('Meal-Name')
const mealwebsite=document.getElementById('Site')
const imagedropzone=document.querySelector('.imagedrop-outer')
const previewcontainer=document.querySelector(".preview-container")
const mealform=document.querySelector(".mealform")
const mealimagebutton=document.querySelector('.bi-file-earmark-plus-fill')

mealimagebutton.addEventListener('click', () =>{
    document.getElementById('File').click();
})

addbutton.addEventListener('click', () => {
    modal.classList.add("open");
    document.querySelector('.mealform').reset();
})

exitbutton.addEventListener('click', () => {
    modal.classList.remove("open");
    (mealform.querySelector('img')).remove()
    
})

modal.addEventListener('click', (e) => {
if (e.target===modal){
        modal.classList.remove("open");
        (mealform.querySelector('img')).remove()
    }; 
});

imagedropzone.addEventListener('dragenter',(e) =>{
    e.preventDefault()
})

imagedropzone.addEventListener('dragleave',(e) =>{
    e.preventDefault()
})

imagedropzone.addEventListener('dragover',(e) =>{
    e.preventDefault()
})

document.getElementById('File').addEventListener('change', (e) =>{
    e.preventDefault()
    const droppedimage=e.target.files
    console.log(droppedimage)
    console.log(droppedimage[0].name)
    const reader=new FileReader();
    reader.onload = () => {
    const imagedropped=document.createElement('img')
    imagedropped.id='image-drop'
    imagedropped.width=350;
    imagedropped.height=350;
    imagedropped.style.left="65px";
    imagedropped.style.top="260px";
    imagedropped.style.position="absolute";
    imagedropped.addEventListener('mouseenter',() => {
        imagedropped.style.border='2px solid red';
            imagedropped.addEventListener('click',() => {
                imagedropped.remove()
        })
    })
     imagedropped.addEventListener('mouseleave',() => {
        imagedropped.style.border='';
    })

    imagedropped.src = reader.result;
    const imagedroppedimgsrc=document.createElement('input')
    imagedroppedimgsrc.type='text'
    imagedroppedimgsrc.name='Img'
    imagedroppedimgsrc.value=('Images/'+(droppedimage[0].name))
    imagedropzone.appendChild(imagedroppedimgsrc)
    imagedroppedimgsrc.style.display="none"
    imagedropped.remove()
    imagedropzone.appendChild(imagedropped)
}
    reader.readAsDataURL(droppedimage[0])
})


document.querySelector(".mealform").addEventListener('submit', async (e) =>{
    e.preventDefault();
    modal.classList.remove("open");
    const formData= new FormData(e.target)
    const data=Object.fromEntries(formData.entries());
    console.log(data)
    // (mealform.querySelector('img')).remove()
    fetch("/save-meal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Saved!");
  document.querySelector('.mealform').reset();
  document.getElementById('image-drop').remove()
})
