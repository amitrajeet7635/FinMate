document.addEventListener("DOMContentLoaded", function () {
    let wt = document.querySelector(".tagline");

    // Reset the animation
    wt.classList.remove("animate");
    
    // Trigger the animation after a short delay
    setTimeout(() => {
        wt.classList.add("animate");
    }, 10); // Short delay to ensure the browser registers the change
});