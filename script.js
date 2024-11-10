document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");
    let percentage = 0;
    let startX = 0;
    let isDragging = false;

    const handleOnWheel = (e) => {
        e.preventDefault();
        const delta = -e.deltaX;
        updatePosition(delta * 0.1);
    }

    const handleTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    }

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        const delta = startX - currentX;
        startX = currentX;
        
        updatePosition(delta * 0.1);
    }

    const handleTouchEnd = () => {
        isDragging = false;
    }

    const updatePosition = (delta) => {
        percentage += delta;
        percentage = Math.max(Math.min(percentage, 0), -100);
        
        track.animate({
            transform: `translate(${percentage}%, -50%)`
        }, { duration: 1500, fill: "forwards", easing: "ease-out" });
        
        for(const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + percentage}% center`
            }, { duration: 1500, fill: "forwards", easing: "ease-out" });
        }
    }

    window.addEventListener('wheel', handleOnWheel, { passive: false });
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);
});
