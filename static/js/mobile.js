// HOME
// Mobile hero slideshow 
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";

  setTimeout(function() {
    plusSlides(1);
  }, 5000);
}

// TUTTE LE PAGINE
// Full screen menu -> mobile 
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerButton = document.querySelector('.hamburger');
    const overlayMenu = document.querySelector('.overlay-menu');
    const closeButton = document.querySelector('.btn-close');
    
    hamburgerButton.addEventListener('click', function () {
        // Toggle the 'overlay-open' class to show/hide the menu
        overlayMenu.classList.toggle('overlay-open');
    });
    
    closeButton.addEventListener('click', function () {
        // Remove the 'overlay-open' class to close the menu
        overlayMenu.classList.remove('overlay-open');
    });
});

// Menu mobile -> sub-menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(function (submenuToggle) {
    submenuToggle.addEventListener('click', function (event) {
        event.preventDefault();
        const parentListItem = submenuToggle.closest('li');

        if (parentListItem) {
            const mobileMenu = parentListItem.querySelector('.sub-menu');

            if (mobileMenu) {
                // Iterate through all submenuToggles to close other submenus
                submenuToggles.forEach(function (otherToggle) {
                    if (otherToggle !== submenuToggle) {
                        const otherParentListItem = otherToggle.closest('li');
                        const otherMobileMenu = otherParentListItem.querySelector('.sub-menu');

                        if (otherMobileMenu) {
                            otherMobileMenu.classList.remove('show');
                        }
                    }
                });
                // Toggle the 'show' class to display/hide the mobile menu
                mobileMenu.classList.toggle('show');
            }
        }
    });
    });

});