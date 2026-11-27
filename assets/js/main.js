/**
 * TRANSPORTE EXECUTIVO POÇOS DE CALDAS
 * Main Interactive Scripts (Cleaned for Single Page Landing Page)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Slow down hero background video for smooth, elegant executive look
  const heroVideo = document.querySelector('.hero-video-bg video');
  if (heroVideo) {
    heroVideo.playbackRate = 0.55;
  }

  // Language Selector (PT | EN | ES)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      if (lang === 'en') {
        const waBtns = document.querySelectorAll('a[href^="https://wa.me"]');
        waBtns.forEach(a => {
          if (!a.dataset.originalHref) a.dataset.originalHref = a.getAttribute('href');
          a.setAttribute('href', 'https://wa.me/553591215394?text=Hello!%20I%20would%20like%20to%20request%20a%20quote%20for%20executive%20transportation.');
        });
      } else if (lang === 'es') {
        const waBtns = document.querySelectorAll('a[href^="https://wa.me"]');
        waBtns.forEach(a => {
          if (!a.dataset.originalHref) a.dataset.originalHref = a.getAttribute('href');
          a.setAttribute('href', 'https://wa.me/553591215394?text=Hola!%20Me%20gustar%C3%ADa%20solicitar%20un%20presupuesto%20de%20transporte%20ejecutivo.');
        });
      } else {
        const waBtns = document.querySelectorAll('a[href^="https://wa.me"]');
        waBtns.forEach(a => {
          if (a.dataset.originalHref) a.setAttribute('href', a.dataset.originalHref);
        });
      }
    });
  });

  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Header Scroll Effect (Navbar shadow on scroll)
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open current if wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Services Category Filter
  const filterButtons = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Fleet Interactive Carousel
  const fleetTrack = document.getElementById('fleetTrack');
  const fleetSlides = document.querySelectorAll('.fleet-slide');
  const fleetPrev = document.getElementById('fleetPrev');
  const fleetNext = document.getElementById('fleetNext');
  const fleetDots = document.querySelectorAll('.fleet-dot');
  
  if (fleetTrack && fleetSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = fleetSlides.length;

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      fleetTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update dots
      fleetDots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    if (fleetPrev) {
      fleetPrev.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }

    if (fleetNext) {
      fleetNext.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }

    fleetDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
        goToSlide(targetIndex);
      });
    });

    // Touch Swipe Support for Mobile
    let startX = 0;
    let endX = 0;
    fleetTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    fleetTrack.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
    }, { passive: true });
  }

  // Fast Quote Form (FourVIP Style)
  const quoteForm = document.getElementById('fastQuoteForm');
  const quoteTabBtns = document.querySelectorAll('.quote-tab-btn');
  let currentQuoteType = 'Orçamento';

  if (quoteTabBtns.length > 0) {
    quoteTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        quoteTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentQuoteType = btn.getAttribute('data-type') || 'Orçamento';
        
        const submitBtn = document.getElementById('btnSubmitQuote');
        if (submitBtn) {
          submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.841.879 2.791.879 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.765-5.768-5.765zm3.385 8.163c-.145.411-.744.757-1.026.787-.278.029-.637.135-2.07-.464-1.724-.72-2.827-2.483-2.912-2.597-.085-.114-.701-.933-.701-1.776 0-.843.439-1.258.596-1.428.156-.17.341-.213.455-.213.114 0 .228.001.328.006.105.006.246-.04.385.293.145.349.497 1.213.54 1.301.043.088.072.19.014.305-.058.115-.087.187-.173.287-.086.1-.181.223-.258.299-.086.085-.176.178-.076.35.1.171.444.733.953 1.186.655.584 1.207.765 1.378.851.171.086.271.072.371-.043.1-.115.428-.499.542-.671.114-.171.228-.143.385-.086.157.057.999.471 1.17.557.171.086.285.128.328.199.043.072.043.414-.102.825z"/></svg>
            ${currentQuoteType === 'Reserva' ? 'Confirmar Reserva no WhatsApp' : 'Enviar pelo WhatsApp'}
          `;
        }
      });
    });
  }

  // Set default date and time if empty
  const quoteDateInput = document.getElementById('quoteData');
  const quoteTimeInput = document.getElementById('quoteHora');
  if (quoteDateInput && !quoteDateInput.value) {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    quoteDateInput.value = `${yyyy}-${mm}-${dd}`;
  }
  if (quoteTimeInput && !quoteTimeInput.value) {
    quoteTimeInput.value = '08:00';
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('quoteNome')?.value.trim() || '';
      const origem = document.getElementById('quoteOrigem')?.value.trim() || '';
      const destino = document.getElementById('quoteDestino')?.value.trim() || '';
      const data = document.getElementById('quoteData')?.value || '';
      const hora = document.getElementById('quoteHora')?.value || '';
      const passageiros = document.getElementById('quotePassageiros')?.value || '';
      const veiculo = document.getElementById('quoteVeiculo')?.value || '';

      // Format date nicely (DD/MM/YYYY)
      let formattedDate = data;
      if (data && data.includes('-')) {
        const parts = data.split('-');
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }

      let msg = `Olá! Gostaria de um *${currentQuoteType}* de Transporte Executivo:\n\n`;
      if (nome) msg += `👤 *Nome:* ${nome}\n`;
      if (origem) msg += `📍 *Origem:* ${origem}\n`;
      if (destino) msg += `🏁 *Destino:* ${destino}\n`;
      if (formattedDate) msg += `📅 *Data:* ${formattedDate}\n`;
      if (hora) msg += `⏰ *Horário:* ${hora}\n`;
      if (passageiros) msg += `👥 *Passageiros:* ${passageiros}\n`;
      if (veiculo) msg += `🚗 *Veículo:* ${veiculo}\n`;
      msg += `\nAguardo proposta formal por escrito. Obrigado!`;

      const encoded = encodeURIComponent(msg);
      window.open(`https://wa.me/5535999990000?text=${encoded}`, '_blank');
    });
  }
});
