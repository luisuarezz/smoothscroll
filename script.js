document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");
    let percentage = 0;

    const handleOnWheel = (e) => {
        e.preventDefault();
        
        // Invert the delta value to match natural scroll direction
        const delta = -e.deltaX;
        
        // Fine-tuned sensitivity
        percentage += delta * 0.1;
        
        // Constrain the percentage between -100 and 0
        percentage = Math.max(Math.min(percentage, 0), -100);
        
        // Animate the track
        track.animate({
            transform: `translate(${percentage}%, -50%)`
        }, { duration: 1500, fill: "forwards", easing: "ease-out" });
        
        // Animate each image
        for(const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + percentage}% center`
            }, { duration: 1500, fill: "forwards", easing: "ease-out" });
        }
    }

    // Add wheel event listener
    window.addEventListener('wheel', handleOnWheel, { passive: false });
});
