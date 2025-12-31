document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  let current = 0;

  const counters = document.querySelectorAll("[data-count]");
  const fill = document.querySelector(".fill");
  const options = document.querySelectorAll(".option");
  const hiddenMsg = document.getElementById("hidden");
  const countdownEl = document.getElementById("countdown");

  // --- Navigation Buttons ---
  const updateScreen = (index) => {
    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === index);
    });
    current = index;
  };

  document.querySelectorAll(".next").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (current < screens.length - 1) updateScreen(current + 1);
    });
  });

  document.querySelectorAll(".prev").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (current > 0) updateScreen(current - 1);
    });
  });

  // --- Show hidden message on kitten tap ---
  document.querySelectorAll(".tap-confetti").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (hiddenMsg && hiddenMsg.style.display === "none") {
        hiddenMsg.style.display = "block";
        hiddenMsg.classList.add("fade");
        confettiBurst(isMobile ? 15 : 50);
      }
      e.stopPropagation();
    });
  });

  // --- Bucket list toggle with keyboard support ---
  options.forEach((opt) => {
    opt.addEventListener("click", () => opt.classList.toggle("selected"));
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        opt.classList.toggle("selected");
      }
    });
  });

  // --- Stats animation ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => {
          let target = +counter.getAttribute("data-count"),
            count = 0,
            step = Math.ceil(target / 100);
          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(interval);
            }
            counter.textContent = count;
          }, 20);
        });
        if (fill) fill.style.width = "92%";
      }
    });
  });
  const statsScreen = document.querySelector("#screen4");
  if (statsScreen) observer.observe(statsScreen);

  // --- Confetti ---
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  function confettiBurst(count = 50) {
    for (let i = 0; i < count; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "%";
      c.style.backgroundColor = `hsl(${Math.random() * 360},70%,60%)`;
      c.style.animationDuration = 2 + Math.random() * 2 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }

  // --- Stars ---
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5,
  }));
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
      s.y += s.d;
      if (s.y > canvas.height) s.y = 0;
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // --- Countdown Timer ---
  function updateCountdown() {
    const now = new Date();
    const nextYear = new Date("Jan 1, 2026 00:00:00");
    const diff = nextYear - now;
    if (diff <= 0) {
      countdownEl.textContent = "🎉 Happy 2026! 🎉";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();
});
