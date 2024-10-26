$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Software Engineer", "Data Analyst", "Business Systems Analyst"],
        typeSpeed: 140,
        backSpeed: 80,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Software Engineer", "Data Analyst", "Business Systems Analyst"],
        typeSpeed: 100,
        backSpeed: 30,
        loop: true,
        showCursor: false // Hide the typing cursor
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 1000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            300:{
                items: 1,
                nav: false
            },
            500:{
                items: 1,
                nav: false
            }
        }
    });
});

function handleSubmit(event) {
   
}

 // Function to create confetti particles
 function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');

    // Create multiple confetti particles (e.g., 50 particles)
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      // Randomly position confetti horizontally and vertically
      const randomPositionX = Math.random() * 100;
      const randomPositionY = Math.random() * 100;
      confetti.style.left = randomPositionX + 'vw';
      confetti.style.top = randomPositionY + 'vh';

      // Randomly apply colors to the confetti particles
      const colors = ['confetti-blue', 'confetti-violet', 'confetti-pink', 'confetti-white', 'confetti-gold'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.classList.add(randomColor);

      confettiContainer.appendChild(confetti);

      // Remove confetti after animation completes
      confetti.addEventListener('animationend', () => {
        confetti.remove();
      });
    }
  }

  // Call the createConfetti function every 30 seconds (30000 milliseconds)
  setInterval(() => {
    createConfetti();
  }, 60000);

  /// JavaScript
function updateDateTime() {
    const currentDate = new Date();
    const day = currentDate.toLocaleString('en-US', { day: 'numeric' });
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const time = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
  
    const formattedDate = `${currentDate.toLocaleString('en-US', { weekday: 'short' })} ${day} ${month} [${time}]`;
    document.getElementById('currentDateTime').textContent = formattedDate;
  }
  
  // Call the function to update the date and time every second
  setInterval(updateDateTime, 1000);
  
  // Initial call to set the date and time when the page loads
  updateDateTime();
  

