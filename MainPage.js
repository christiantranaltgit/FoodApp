let searchForm=document.querySelector('.search-form');

document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active')
}

let navsidebar=document.querySelector('.navsidebar');

document.querySelector('#menu-btn').onclick=()=>{
    document.querySelector('.navsidebar').classList.toggle('clicked')
    document.querySelector('#menu-btn').classList.toggle('clicked')
}
document.querySelector
// const button=document.querySelectorAll('#check-button');
// const boxes=document.querySelectorAll('.box');

// // button.addEventListener('mouseover', () => {
// //     box.classList.add('active');
// // });
// // button.addEventListener('mouseout', () => {
// //     box.classList.remove('active');
// // });

document.querySelectorAll('.check-button i').forEach((button,i) => {
    button.addEventListener('click',() => {
        document.querySelectorAll('.check-button i').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
    });
});

document.querySelectorAll('.check-button').forEach((button,i) => {
    button.addEventListener('click',() => {
        document.querySelectorAll('.check-button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
    });
});

document.querySelectorAll('.box').forEach((boxes,i) => {
    const check_button=boxes.querySelector('.check-button i');
    if (check_button) {
        check_button.addEventListener('click',() => {
        document.querySelectorAll('.box').forEach(b2 => b2.classList.remove('active'));
        boxes.classList.add('active');
        const mealplan=document.getElementsByTagName('h3')[i].textContent
        localStorage.setItem("mealplan", mealplan);
        localStorage.setItem('selectedbox',i)
     });
    }
});

 window.addEventListener("load", () => {
    let boxindex=localStorage.getItem('selectedbox')
    if (boxindex !=null) {
        document.querySelectorAll('.check-button i')[boxindex].classList.add("active");
        document.querySelectorAll('.check-button')[boxindex].classList.add("active");
        document.querySelectorAll('.box')[boxindex].classList.add("active");
    }
})