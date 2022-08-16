function reveal() {
    // https://codepen.io/alvarotrigo/pen/PoKamZy
    var reveals = document.querySelectorAll("li");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
    var scrollPos = window.scrollY;
    var nav = document.querySelectorAll(".navigation")
    for (var i = 0; i < nav.length; i++) {
        if (scrollPos > 100) {
            nav[i].classList.add("active")
        } else {
            nav[i].classList.remove("active")
        }
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}


window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();

drawCircuit("aboutme-canvas");