$(document).ready(function () {
  $(".menu-toggler").on("click", function () {
    $(this).toggleClass("open");
    $(".top-nav").toggleClass("open");
  });

  /*navigate to necessary section*/
  $(".top-nav .nav-link").on("click", function () {
    $(".menu-toggler").removeClass("open");
    $(".top-nav").removeClass("open");
  });

  /*Scrolling animation*/
  $('nav a[href*="#"]').on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 100,
      },
      2000
    );
  });

  /*scroll to top*/
  $("#up").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      2000
    );
  });

  AOS.init({
    easing: "ease",
    duration: 1800,
    // once: true   // stop animation once loaded
  });
});

/* ******Typing Carousel Start****** */
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
/* ******Typing Carousel End****** */

/* ******Particle animate start****** */
if (document.body.animate) {
  document.querySelector('#button').addEventListener('click', pop);
}

function pop (e) {
  // Quick check if user clicked the button using a keyboard
  if (e.clientX === 0 && e.clientY === 0) {
    const bbox = document.querySelector('#button').getBoundingClientRect();
    const x = bbox.left + bbox.width / 2;
    const y = bbox.top + bbox.height / 2;
    for (let i = 0; i < 30; i++) {
      // We call the function createParticle 30 times
      // We pass the coordinates of the button for x & y values
      createParticle(x, y);
    }
  } else {
    for (let i = 0; i < 40; i++) {
      // We call the function createParticle 30 times
      // As we need the coordinates of the mouse, we pass them as arguments
      createParticle(e.clientX, e.clientY);
    }
  }
}

function createParticle (x, y) {
  const particle = document.createElement('particle');
  document.body.appendChild(particle);
  
  // Calculate a random size from 5px to 25px
  const size = Math.floor(Math.random() * 12 + 5);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  // Generate a random color in a blue/purple palette
  particle.style.background = `hsl(${Math.random() * 90 + 90}, 50%, 40%)`;
  
  // Generate a random x & y destination within a distance of 75px from the mouse
  const destinationX = x + (Math.random() - 0.5) * 2 * 75;
  const destinationY = y + (Math.random() - 0.5) * 2 * 75;

  // Store the animation in a variable as we will need it later
  const animation = particle.animate([
    {
      // Set the origin position of the particle
      // We offset the particle with half its size to center it around the mouse
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
      opacity: 1
    },
    {
      // We define the final coordinates as the second keyframe
      transform: `translate(${destinationX}px, ${destinationY}px)`,
      opacity: 0
    }
  ], {
    // Set a random duration from 500 to 1500ms
    duration: Math.random() * 1000 + 500,
    easing: 'cubic-bezier(0, .9, .57, 1)',
    // Delay every particle with a random value of 200ms
    delay: Math.random() * 200
  });
  
  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    particle.remove();
  };
}