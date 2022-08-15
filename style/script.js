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
    var scrollPos = document.body.scrollTop;
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

function draw(x, y, circleX, circleY) {
    const radius = 5;
    const ctx = document.getElementById("aboutme-canvas").getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    var direction = 1
    if (circleY > y) {
        direction = -1
    }
    ctx.lineTo(circleX - Math.abs(circleY - y) - (radius * direction) + radius, y);
    ctx.lineTo(circleX, circleY - radius + (radius / 2 * direction));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(circleX + radius / 2, circleY-radius,radius, 0, Math.PI * 2, true);
    ctx.stroke();
}
draw(10, 40, 70, 15)
draw(10, 45, 70, 30)
draw(10, 50, 70, 45)
draw(10, 55, 90, 70)
draw(10, 60, 70, 75)