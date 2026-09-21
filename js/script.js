/*
  PERSONALIZATION
  ----------------
  Replace these values. Put your photos in assets/photos/.
  Set birthdayDate to the recipient's birthday in YYYY-MM-DD format.
*/
const CONFIG = {
  recipientName: "Kiran",
  senderName: "Kritagya"
  // Example: "2026-09-22"
  birthdayDate: "22-09-2026",

  birthdayMessage:
    "I hope this year brings you happiness, beautiful moments, new adventures, and countless reasons to smile.",

  musicFile: "assets/music/background.mp3",

  photoStory: [
    {
      image: "assets/photos/photo1.jpeg",
      caption: "A little sunshine by the water.",
      message: "Some pictures just make you stop for a second and smile."
    },
    {
      image: "assets/photos/photo2.jpeg",
      caption: "A softer little moment.",
      message: "And then there are moments that feel warm without even trying."
    },
    {
      image: "assets/photos/photo3.jpeg",
      caption: "One of those quiet smiles.",
      message: "I think your smile has a way of making ordinary moments feel special."
    },
    {
      image: "assets/photos/photo4.jpeg",
      caption: "A tiny bit of attitude.",
      message: "Somehow, even your simplest expressions have a way of staying in my mind."
    },
    {
      image: "assets/photos/photo5.jpeg",
      caption: "A moment worth keeping.",
      message: "Maybe I notice these little things because you have become a little more special to me."
    },
    {
      image: "assets/photos/photo6.jpeg",
      caption: "A beautiful day.",
      message: "You look genuinely happy here, and that is something I hope you have a lot more of."
    },
    {
      image: "assets/photos/photo7.jpeg",
      caption: "Just you being you.",
      message: "No big reason. I just really like this picture of you."
    },
    {
      image: "assets/photos/photo8.jpeg",
      caption: "And now for the honest part...",
      message: "After all these pictures, maybe it is time I finally tell you what I have been thinking."
    }
  ]
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const screens = {
  countdownScreen: $("#countdownScreen"),
  birthdayScreen: $("#birthdayScreen"),
  photoScreen: $("#photoScreen"),
  storyScreen: $("#storyScreen"),
  revealScreen: $("#revealScreen"),
  proposalScreen: $("#proposalScreen"),
  positiveScreen: $("#positiveScreen"),
  timeScreen: $("#timeScreen"),
  finalScreen: $("#finalScreen")
};

let photoIndex = 0;
let countdownTimer = null;
let musicStarted = false;

function personalize() {
  $$("[data-recipient]").forEach(el => el.textContent = CONFIG.recipientName);
  $$("[data-sender]").forEach(el => el.textContent = CONFIG.senderName);
  $("[data-birthday-message]").textContent = CONFIG.birthdayMessage;
  document.title = `A Little Something For ${CONFIG.recipientName} ❤️`;
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getBirthdayTarget() {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(CONFIG.birthdayDate)) return null;
  const [y, m, d] = CONFIG.birthdayDate.split("-").map(Number);
  const now = new Date();
  // Target is midnight at the device's local timezone.
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function updateCountdown() {
  const target = getBirthdayTarget();

  if (!target) {
    $("#hours").textContent = "--";
    $("#minutes").textContent = "--";
    $("#seconds").textContent = "--";
    $("#afterMidnightMessage").textContent =
      "Set CONFIG.birthdayDate in js/script.js to enable the countdown.";
    $("#afterMidnightMessage").classList.remove("hidden");
    $("#startAfterMidnight").classList.remove("hidden");
    return;
  }

  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    clearInterval(countdownTimer);
    $("#countdown").classList.add("hidden");
    $(".hint").classList.add("hidden");
    $("#afterMidnightMessage").textContent = "The surprise is ready. ❤️";
    $("#afterMidnightMessage").classList.remove("hidden");
    $("#startAfterMidnight").classList.remove("hidden");
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}

function initCountdown() {
  updateCountdown();
  const target = getBirthdayTarget();

  if (target && Date.now() < target.getTime()) {
    countdownTimer = setInterval(updateCountdown, 1000);
  }
}

function startBirthday() {
  startMusic();
  celebrate();
  showScreen("birthdayScreen");
}

function loadPhoto() {
  const photos = CONFIG.photoStory.filter(p => p.image);
  if (!photos.length) {
    showScreen("storyScreen");
    return;
  }

  const item = photos[photoIndex % photos.length];
  $("#storyImage").src = item.image;
  $("#storyImage").alt = item.caption || "Birthday memory";
  $("#photoCounter").textContent =
    `MEMORY ${String(photoIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
  $("#photoCaption").textContent = item.caption || "";
  $("#photoMessage").textContent = item.message || "";
}

function nextPhoto() {
  const photos = CONFIG.photoStory.filter(p => p.image);
  photoIndex += 1;

  if (photoIndex >= photos.length) {
    showScreen("storyScreen");
    return;
  }
  loadPhoto();
}

function startMusic() {
  if (musicStarted) return;
  const audio = $("#backgroundMusic");
  audio.src = CONFIG.musicFile;
  audio.volume = 0.35;
  audio.play().then(() => {
    musicStarted = true;
    $("#musicToggle").textContent = "🔊";
  }).catch(() => {
    // Browser may require another user gesture; music button remains available.
  });
}

function toggleMusic() {
  const audio = $("#backgroundMusic");
  if (!audio.src || !audio.src.endsWith(CONFIG.musicFile)) audio.src = CONFIG.musicFile;

  if (audio.paused) {
    audio.play().then(() => {
      musicStarted = true;
      $("#musicToggle").textContent = "🔊";
    }).catch(() => {});
  } else {
    audio.pause();
    $("#musicToggle").textContent = "🔇";
  }
}

function celebrate() {
  const burst = document.querySelector(".birthday-burst");
  burst.animate(
    [{ opacity: 0 }, { opacity: 1 }, { opacity: .7 }],
    { duration: 1400, easing: "ease-out" }
  );

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * .9}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.background = `hsl(${Math.random() * 360} 65% 75%)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

function createParticles() {
  const container = $("#particles");
  for (let i = 0; i < 34; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 18}s`;
    p.style.animationDelay = `${-Math.random() * 18}s`;
    p.style.opacity = `${.15 + Math.random() * .45}`;
    container.appendChild(p);
  }
}

function bindEvents() {
  $("#startAfterMidnight").addEventListener("click", startBirthday);

  $$(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.next === "photoScreen") {
        photoIndex = 0;
        loadPhoto();
        showScreen("photoScreen");
      }
    });
  });

  $("#nextPhoto").addEventListener("click", nextPhoto);

  $("#revealLike").addEventListener("click", () => showScreen("revealScreen"));
  $("#openProposal").addEventListener("click", () => showScreen("proposalScreen"));

  $("#yesBtn").addEventListener("click", () => {
    celebrate();
    showScreen("positiveScreen");
  });

  $("#tryBtn").addEventListener("click", () => {
    celebrate();
    showScreen("positiveScreen");
  });

  $("#timeBtn").addEventListener("click", () => showScreen("timeScreen"));

  $$(".date-options button").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".date-options button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      $("#dateChoice").textContent = `${btn.dataset.date} it is. ❤️`;
      $("#finishPositive").classList.remove("hidden");
    });
  });

  $("#finishPositive").addEventListener("click", () => showScreen("finalScreen"));
  $(".finish-btn").addEventListener("click", () => showScreen("finalScreen"));

  $("#replayBtn").addEventListener("click", () => {
    photoIndex = 0;
    showScreen("countdownScreen");
    initCountdown();
  });

  $("#musicToggle").addEventListener("click", toggleMusic);
}

personalize();
createParticles();
bindEvents();
initCountdown();
