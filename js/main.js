let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');

document.querySelectorAll('.learnMoreBtn').forEach(btn => {
  btn.onclick = () => {
    window.location.href = 'about.html';
  };
});

document.querySelectorAll('.joinUsBtn').forEach(btn => {
  btn.onclick = () => {
    document.getElementById('join-us').scrollIntoView({ behavior: 'smooth' });
  };
});


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

function sendMessage() {
    const token = grecaptcha.getResponse()
    if (token.length === 0) {
        alert("Please complete the captcha");
        return;
    }
    if (!$('#contact-email').get(0).checkValidity()) {
        alert("Please enter a valid email address");
        return;
    }
    $.ajax({
        type: "POST",
        url: "https://ringed-rune-465501-e3.uc.r.appspot.com/api/contact",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            name: $("#contact-name").val(),
            email: $("#contact-email").val(),
            message: $("#contact-message").val(),
            token: token
        }),
        success: function (data) {
            if (data.code === 0) {
                alert("Message sent");
            } else if (data.code === 1) {
                alert("System error");
            } else if (data.code === 2){
                alert("Please complete the captcha");
            }
        },
        error: function (data) {
            alert("Error");
        }
    })
}
