// Load saved counters
let likeCount = localStorage.getItem("likeCount") || 0;
let commentCount = localStorage.getItem("commentCount") || 0;
let shareCount = localStorage.getItem("shareCount") || 0;

// Display saved values
document.getElementById("likeCount").textContent = likeCount;
document.getElementById("commentCount").textContent = commentCount;
document.getElementById("shareCount").textContent = shareCount;

// Like click
function addLike() {
    likeCount++;
    localStorage.setItem("likeCount", likeCount);
    document.getElementById("likeCount").textContent = likeCount;
}

// Comment click
function addComment() {
    commentCount++;
    localStorage.setItem("commentCount", commentCount);
    document.getElementById("commentCount").textContent = commentCount;
}

// Copy link
function copyLink() {
    const webpageURL = window.location.href;
    navigator.clipboard.writeText(webpageURL);

    shareCount++;
    localStorage.setItem("shareCount", shareCount);
    document.getElementById("shareCount").textContent = shareCount;

    const msg = document.getElementById("copyMessage");
    msg.style.opacity = 1;

    setTimeout(() => {
        msg.style.opacity = 0;
    }, 1500);
}

// Lightbox functions
function openImage(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeImage() {
    document.getElementById("lightbox").style.display = "none";
}

const thumbs = document.querySelectorAll(".result-thumb");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const popupClose = document.getElementById("popupClose");

// Click any thumbnail → open fullscreen
thumbs.forEach(img => {
    img.addEventListener("click", () => {
        popupImg.src = img.dataset.full;
        popup.style.display = "flex";
    });
});

// Close popup
popupClose.addEventListener("click", () => popup.style.display = "none");
popup.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
});

