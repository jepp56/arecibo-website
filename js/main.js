let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');

document.getElementById('learnMoreBtn').onclick = function () {
  window.location.href = 'about.html'; 
};

document.getElementById('joinUsBtn').onclick = function () {
  document.getElementById('join-us').scrollIntoView({ 
    behavior: 'smooth' 
  });
};


function resetAutoSlide() {
    clearInterval(runAuto);
    runAuto = setInterval(() => {
        showSlider('next');
    }, timeAutoNext);
}

nextDom.onclick = function(){
    showSlider('next');
    resetAutoSlide();
}
prevDom.onclick = function(){
    showSlider('prev');
    resetAutoSlide();
}
let timeAutoNext = 8000;
let runAuto = setInterval(() => {
        showSlider('next');
    }, timeAutoNext);

function showSlider(type){
    let itemSlider = document.querySelectorAll('.carousel .list .item');

    if(type === 'next'){
        listItemDom.appendChild(itemSlider[0]);
    }else{
        let positionLastItem = itemSlider.length -1;
        listItemDom.prepend(itemSlider[positionLastItem]);
    }
}


