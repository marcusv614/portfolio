// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
    }
  });
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Here you would normally send the form data to a server
  // For now, we'll just show a success message
  alert(`Obrigado pela sua mensagem, ${name}! Entraremos em contato em breve.`);

  // Reset form
  contactForm.reset();
});

// Scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply animation to elements
document
  .querySelectorAll(".project-card, .skill-category, .stat-card")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");
const contactBar = document.querySelector(".contact-bar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "none";
  } else {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
  }

  lastScroll = currentScroll;
});

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-progress");
const skillSection = document.querySelector(".skills");

const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.transition = "width 1s ease";
          bar.style.width = width;
        }, 100);
      });
      skillObserver.unobserve(skillSection);
    }
  });
}, observerOptions);

if (skillSection) {
  skillObserver.observe(skillSection);
}

// Typing effect for hero title (optional)
function typeWriter() {
  const title = document.querySelector(".hero-title");
  const text = title.textContent;
  title.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      title.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }

  // Only trigger on page load
  if (window.location.hash === "") {
    type();
  }
}

// Initialize typing effect after DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", typeWriter);
} else {
  typeWriter();
}

// Add active class to nav links based on current scroll position
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});
