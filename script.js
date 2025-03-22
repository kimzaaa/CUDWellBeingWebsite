// Menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    const isMobile = window.innerWidth <= 768;
  
    if (isMobile && navLinks.classList.contains('active')) {
      document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
        const dropdownId = dropdownToggle.getAttribute('data-dropdown');
        const dropdownMenu = document.getElementById(dropdownId);
        if (dropdownMenu) {
          dropdownToggle.parentElement.appendChild(dropdownMenu);
        }
      });
    } else if (!isMobile) {
      document.querySelectorAll('.dropdown-menu').forEach(dropdownMenu => {
        document.body.appendChild(dropdownMenu);
      });
    }
  });
  
  // Dropdown toggle for Blog menu
  document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function(e) {
          e.preventDefault();
          const dropdownId = this.getAttribute('data-dropdown');
          const dropdownMenu = document.getElementById(dropdownId);
          const isMobile = window.innerWidth <= 768;
          const isActive = dropdownMenu.classList.contains('active');
  
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
              if (menu !== dropdownMenu) {
                  menu.classList.remove('active');
              }
          });
  
          if (!isActive) {
              dropdownMenu.classList.add('active');
              if (!isMobile) {
                  const toggleRect = dropdownToggle.getBoundingClientRect();
                  dropdownMenu.style.top = `${toggleRect.bottom + window.scrollY}px`;
                  dropdownMenu.style.left = `${toggleRect.left + window.scrollX}px`;
              }
          } else {
              dropdownMenu.classList.remove('active');
          }
      });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown') && !e.target.closest('.dropdown-menu')) {
          document.querySelectorAll('.dropdown-menu').forEach(dropdownMenu => {
              dropdownMenu.classList.remove('active');
          });
      }
  });
  
  // Reposition dropdown on window resize
  window.addEventListener('resize', function() {
      const isMobile = window.innerWidth <= 768;
      const navLinks = document.querySelector('.nav-links');
  
      if (isMobile && navLinks.classList.contains('active')) {
          document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
              const dropdownId = dropdownToggle.getAttribute('data-dropdown');
              const dropdownMenu = document.getElementById(dropdownId);
              if (dropdownMenu) {
                  dropdownToggle.parentElement.appendChild(dropdownMenu);
              }
          });
      } else if (!isMobile) {
          document.querySelectorAll('.dropdown-menu').forEach(dropdownMenu => {
              document.body.appendChild(dropdownMenu);
          });
  
          document.querySelectorAll('.dropdown-menu.active').forEach(dropdownMenu => {
              const dropdownToggle = document.querySelector(`.dropdown-toggle[data-dropdown="${dropdownMenu.id}"]`);
              if (dropdownToggle) {
                  const toggleRect = dropdownToggle.getBoundingClientRect();
                  dropdownMenu.style.top = `${toggleRect.bottom + window.scrollY}px`;
                  dropdownMenu.style.left = `${toggleRect.left + window.scrollX}px`;
              }
          });
      }
  });
  
  // Poster section navigation (Static - only toggles main-img)
  const posterContainer = document.querySelector('.poster-container');
  const posterImages = document.querySelector('.poster-images');
  const posters = document.querySelectorAll('.poster-img');
  const totalPosters = posters.length;
  let currentIndex = Math.floor(totalPosters / 2); // Start with the middle poster
  
  // Function to create dots dynamically
  function createDots() {
      const dotsContainer = document.querySelector('.poster-dots');
      for (let i = 0; i < totalPosters; i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (i === currentIndex) dot.classList.add('active');
          dot.addEventListener('click', () => {
              currentIndex = i;
              updatePosterDisplay();
          });
          dotsContainer.appendChild(dot);
      }
  }
  
  function updatePosterDisplay() {
      // Update main-img class
      posters.forEach((img, index) => {
          img.classList.remove('main-img');
          if (index === currentIndex) {
              img.classList.add('main-img');
          }
      });
  
      // Update dots
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
          dot.classList.remove('active');
          if (index === currentIndex) {
              dot.classList.add('active');
          }
      });
      // No transform needed for static layout
  }
  
  // Right button navigation
  document.querySelector('.right-btn').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalPosters;
      updatePosterDisplay();
  });
  
  // Left button navigation
  document.querySelector('.left-btn').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalPosters) % totalPosters;
      updatePosterDisplay();
  });
  
  // Initialize the slideshow and dots
  createDots();
  updatePosterDisplay();
  window.addEventListener('resize', updatePosterDisplay); // Still useful for responsiveness
  
  // Fade-in on scroll (both directions)
  const sections = document.querySelectorAll('.content, .second-section, .poster-section, .fourth-section, .fifth-section');
  
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              entry.target.classList.remove('visible');
          }
      });
  }, {
      threshold: 0.1
  });
  
  sections.forEach(section => {
      observer.observe(section);
  });
  
  // Smooth scroll for nav and footer links
  document.querySelectorAll('.nav-links a, .footer-links a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href.startsWith('#')) {
              e.preventDefault();
              const targetId = href.substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
              }
          }
      });
  });
  
  // Collage cycling for second and fourth sections
  function cycleCollageImages(sectionClass) {
      const collageImages = document.querySelectorAll(`${sectionClass} .collage-image`);
      let currentCollageIndex = 0;
  
      function showNextImage() {
          collageImages[currentCollageIndex].classList.remove('active');
          currentCollageIndex = (currentCollageIndex + 1) % collageImages.length;
          collageImages[currentCollageIndex].classList.add('active');
      }
  
      collageImages.forEach((img, index) => {
          if (index !== 0) img.classList.remove('active');
      });
  
      setInterval(showNextImage, 5000);
  }
  
  cycleCollageImages('.left-section-second');
  cycleCollageImages('.left-section-fourth');
  
  // Podium cycling for multiple sections
  const podiumData = {
      "results-section": [
          { category: "", ranks: [{ name: "นางสาว รมณ หาญวนานนท์", place: "2nd" }, { name: "ด.ญ.ณัชชา วาสนาประดิษฐ์", place: "1st" }, { name: "อ. พงษ์ภัค พิทยชินโชติ", place: "3rd" }] },
          //{ category: "", ranks: [{ name: "", place: "2nd" }, { name: "", place: "1st" }, { name: "", place: "3rd" }] }
      ],
      "nike-run-section": [
          { category: "", ranks: [{ name: "อาจารย์ ดร.นที ปิติวรรณ", place: "2nd" }, { name: "ผศ.กฤติญา ทิมสถิตย์", place: "1st" }, { name: "อาจารย์ ดร.กวิตา ฟองสถาพร", place: "3rd" }] },
          //{ category: "", ranks: [{ name: "", place: "2nd" }, { name: "", place: "1st" }, { name: "", place: "3rd" }] }
      ]
  };
  
  function updatePodium(sectionId) {
      const section = document.querySelector(`#${sectionId}`);
      const categoryElement = section.querySelector('.category');
      const podiumElement = section.querySelector('.podium');
      const ranks = podiumElement.querySelectorAll('.rank');
      const leaderboardList = section.querySelector('.leaderboard-list');
      let currentPodiumIndex = section.dataset.podiumIndex ? parseInt(section.dataset.podiumIndex) : 0;
  
      podiumElement.classList.add('fade-out');
      setTimeout(() => {
          categoryElement.textContent = podiumData[sectionId][currentPodiumIndex].category;
          ranks[0].querySelector('.name').textContent = podiumData[sectionId][currentPodiumIndex].ranks[0].name;
          ranks[0].childNodes[1].textContent = podiumData[sectionId][currentPodiumIndex].ranks[0].place;
          ranks[1].querySelector('.name').textContent = podiumData[sectionId][currentPodiumIndex].ranks[1].name;
          ranks[1].childNodes[1].textContent = podiumData[sectionId][currentPodiumIndex].ranks[1].place;
          ranks[2].querySelector('.name').textContent = podiumData[sectionId][currentPodiumIndex].ranks[2].name;
          ranks[2].childNodes[1].textContent = podiumData[sectionId][currentPodiumIndex].ranks[2].place;
  
          leaderboardList.innerHTML = `
              <li>1. ${podiumData[sectionId][currentPodiumIndex].ranks[1].name}</li>
              <li>2. ${podiumData[sectionId][currentPodiumIndex].ranks[0].name}</li>
              <li>3. ${podiumData[sectionId][currentPodiumIndex].ranks[2].name}</li>
          `;
  
          podiumElement.classList.remove('fade-out');
      }, 500);
  
      section.dataset.podiumIndex = currentPodiumIndex;
  }
  
  document.querySelectorAll('.fifth-section').forEach(section => {
      const sectionId = section.id;
      section.dataset.podiumIndex = 0;
  
      section.querySelector('.left-arrow').addEventListener('click', () => {
          let currentIndex = parseInt(section.dataset.podiumIndex);
          currentIndex = (currentIndex - 1 + podiumData[sectionId].length) % podiumData[sectionId].length;
          section.dataset.podiumIndex = currentIndex;
          updatePodium(sectionId);
      });
  
      section.querySelector('.right-arrow').addEventListener('click', () => {
          let currentIndex = parseInt(section.dataset.podiumIndex);
          currentIndex = (currentIndex + 1) % podiumData[sectionId].length;
          section.dataset.podiumIndex = currentIndex;
          updatePodium(sectionId);
      });
  
      updatePodium(sectionId);
  });