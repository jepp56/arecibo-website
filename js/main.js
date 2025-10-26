//Hero Carousel
(function () {
  const nextDom = document.getElementById('next');
  const prevDom = document.getElementById('prev');
  const carouselDom = document.querySelector('.carousel');
  const listItemDom = document.querySelector('.carousel .list');

  if (carouselDom && listItemDom && nextDom && prevDom) {
    let timeAutoNext = 8000;
    let runAuto = setInterval(() => {
      showSlider('next');
    }, timeAutoNext);

    function showSlider(type) {
      let itemSlider = document.querySelectorAll('.carousel .list .item');
      if (itemSlider.length === 0) return;

      if (type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
      } else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
      }
    }

    function resetAutoSlide() {
      clearInterval(runAuto);
      runAuto = setInterval(() => {
        showSlider('next');
      }, timeAutoNext);
    }

    nextDom.onclick = function () {
      showSlider('next');
      resetAutoSlide();
    };

    prevDom.onclick = function () {
      showSlider('prev');
      resetAutoSlide();
    };
  }
})();


//Hero Buttons 
document.querySelectorAll('.learnMoreBtn').forEach(btn => {
  btn.onclick = () => {
    window.location.href = 'about.html';
  };
});

document.querySelectorAll('.learnMoreARC').forEach(btn => {
  btn.onclick = () => {
    window.location.href = 'products.html';
  };
});

document.querySelectorAll('.learnMoreAIaaS').forEach(btn => {
  btn.onclick = () => {
    window.location.href = 'services.html';
  };
});

document.querySelectorAll('.joinUsBtn').forEach(btn => {
  btn.onclick = () => {
    const target = document.getElementById('join-us');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
});

//Toast Notifications
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return; // Ensure container exists

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}


//Contact Form 
function sendMessage() {
  const token = grecaptcha.getResponse();
  if (token.length === 0) {
    showToast("Please complete the captcha", "error");
    return;
  }
  if (!$('#contact-email').get(0).checkValidity()) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  const sendMessageBtn = $('input[onclick="sendMessage()"]');
  sendMessageBtn.prop('disabled', true).addClass('disabled');
  sendMessageBtn.val('Sending...');

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
      sendMessageBtn.prop('disabled', false).removeClass('disabled');
      sendMessageBtn.val('Send Message');

      if (data.code === 0) {
        showToast("Message sent successfully!", "success");
      } else if (data.code === 1) {
        showToast("System error. Please try again later.", "error");
      } else if (data.code === 2) {
        showToast("Please complete the captcha", "error");
      }
    },
    error: function () {
      sendMessageBtn.prop('disabled', false).removeClass('disabled');
      sendMessageBtn.val('Send Message');
      showToast("Error occurred. Please try again.", "error");
    }
  });
}


//Subscribe 
function subscribe() {
  var email = $("#email").val();
  if (email.length === 0 || !$('#email').get(0).checkValidity()) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  const subscribeBtn = $('button[onclick="subscribe()"]');
  subscribeBtn.prop('disabled', true).addClass('disabled');
  subscribeBtn.text('Subscribing...');

  $.ajax({
    type: "POST",
    // url: "https://ringed-rune-465501-e3.uc.r.appspot.com/api/subscribe",
    url: "http://localhost:8080/api/subscribe",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({ email: email }),
    success: function (data) {
      subscribeBtn.prop('disabled', false).removeClass('disabled');
      subscribeBtn.text('Subscribe');

      if (data.code === 0) {
        showToast("Successfully subscribed!", "success");
      } else if (data.code === 1) {
        showToast("System error. Please try again later.", "error");
      } else if (data.code === 2) {
        showToast("This email is already subscribed, please try another one.", "error");
      } else if (data.code === 3) {
        showToast("Spam detected, please try again later.", "error");
      }
    },
    error: function () {
      subscribeBtn.prop('disabled', false).removeClass('disabled');
      subscribeBtn.text('Subscribe');
      showToast("Error occurred. Please try again.", "error");
    }
  });
}


// Owl Carousel 
$(document).ready(function () {
  if ($('.owl-carousel').length) {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      center: true,
      dots: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
  }
});

//behind the numbers animation
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const step = target / (duration / 20);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        // Format text for final display
        if (target === 50) counter.textContent = "50%";
        else if (target === 257) counter.textContent = "$257B";
        else counter.textContent = "16M";
      }
    };
    update();
  });
}

// Trigger animation on scroll into view
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !hasAnimated) {
    animateCounters();
    hasAnimated = true;
  }
}, { threshold: 0.5 });

observer.observe(document.querySelector('#stats'));
