
let likes = 0;
let dislikes = 0;
let comments = [];

// Read a cookie
function getCookie(name) {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }

    return "";
}

// Load saved data
function loadData() {
    likes = Number(getCookie("likes")) || 0;
    dislikes = Number(getCookie("dislikes")) || 0;

    let savedComment = getCookie("comment");

    if (savedComment !== "") {
        comments.push(decodeURIComponent(savedComment));
    }

    updateDisplay();
}

// Update the page
function updateDisplay() {
    document.getElementById("likes").textContent = likes;
    document.getElementById("dislikes").textContent = dislikes;

    let commentsDiv = document.getElementById("comments");
    commentsDiv.innerHTML = "";

    comments.forEach(function(comment) {
        let p = document.createElement("p");
        p.textContent = comment;
        commentsDiv.appendChild(p);
    });
}

// Like button
function like() {
    if (getCookie("vote") === "") {
        likes++;
        document.cookie = "likes=" + likes;
        document.cookie = "vote=like";

        updateDisplay();
    }
}

// Dislike button
function dislike() {
    if (getCookie("vote") === "") {
        dislikes++;
        document.cookie = "dislikes=" + dislikes;
        document.cookie = "vote=dislike";

        updateDisplay();
    }
}

// Submit comment
function submitComment() {
    let comment = document.getElementById("commentInput").value.trim();

    if (comment !== "" && getCookie("comment") === "") {
        comments.push(comment);

        document.cookie = "comment=" + encodeURIComponent(comment);

        document.getElementById("commentInput").value = "";

        updateDisplay();
    }
}

// Reset votes and comments
function resetData() {
    document.cookie = "vote=; max-age=0";
    document.cookie = "likes=; max-age=0";
    document.cookie = "dislikes=; max-age=0";
    document.cookie = "comment=; max-age=0";

    likes = 0;
    dislikes = 0;
    comments = [];

    document.getElementById("commentInput").value = "";

    updateDisplay();
}

// Event listeners
document.getElementById("likeBtn").addEventListener("click", like);
document.getElementById("dislikeBtn").addEventListener("click", dislike);
document.getElementById("submitBtn").addEventListener("click", submitComment);
document.getElementById("resetBtn").addEventListener("click", resetData);

// Load data when the page opens
loadData();
