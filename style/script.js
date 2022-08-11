function reveal() {
    // https://codepen.io/alvarotrigo/pen/PoKamZy
    var reveals = document.querySelectorAll("li");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 0;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();