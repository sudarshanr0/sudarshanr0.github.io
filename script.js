document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    if (!themeToggle) {
        return;
    }

    // Helper to set the theme while clearing previous modifiers
    const applyTheme = (theme) => {
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(theme);
        themeToggle.textContent = theme === "dark-mode" ? "Toggle to Light Mode" : "Toggle to Dark Mode";
        localStorage.setItem("theme", theme);
    };

    const savedTheme = localStorage.getItem("theme");
    const prefersDarkQuery = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    const userPrefersDark = prefersDarkQuery ? prefersDarkQuery.matches : false;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (userPrefersDark) {
        applyTheme("dark-mode");
    } else {
        applyTheme("light-mode");
    }

    themeToggle.addEventListener("click", () => {
        const newTheme = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
        applyTheme(newTheme);
    });
});

const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
const supportsIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = targetElement.offsetTop - 70;
            window.scrollTo({
                top: offset,
                behavior: scrollBehavior
            });
        }
    });
});

const navLinksArray = Array.from(navLinks);
const observedSections = document.querySelectorAll('main section[id]');

const setActiveNavLink = (sectionId) => {
    if (!sectionId) {
        return;
    }

    navLinksArray.forEach((link) => {
        const linkTarget = link.getAttribute('href').substring(1);
        link.classList.toggle('active', linkTarget === sectionId);
    });
};

if (supportsIntersectionObserver && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveNavLink(entry.target.id);
            }
        });
    }, {
        rootMargin: '-45% 0px -45% 0px'
    });

    observedSections.forEach((section) => sectionObserver.observe(section));
} else if (observedSections.length) {
    setActiveNavLink(observedSections[0].id);
} else if (navLinksArray.length) {
    navLinksArray[0].classList.add('active');
}

const revealElements = document.querySelectorAll('.reveal-on-scroll');

if (revealElements.length) {
    if (!supportsIntersectionObserver || prefersReducedMotion) {
        revealElements.forEach((element) => element.classList.add('in-view'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18
        });

        revealElements.forEach((element) => revealObserver.observe(element));
    }
}

const highlightCounters = document.querySelectorAll('[data-count-target]');

const formatCountValue = (value, decimals, locale) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return '0';
    }

    if (decimals > 0) {
        return numericValue.toLocaleString(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    return Math.round(numericValue).toLocaleString(locale);
};

const updateCounterText = (element, value, options) => {
    const { prefix, suffix, decimals, locale } = options;
    element.textContent = `${prefix}${formatCountValue(value, decimals, locale)}${suffix}`;
};

const animateCount = (element) => {
    const targetValue = Number(element.dataset.countTarget);

    if (Number.isNaN(targetValue) || element.dataset.countAnimated === 'true') {
        return;
    }

    const prefix = element.dataset.countPrefix ?? '';
    const suffix = element.dataset.countSuffix ?? '';
    const decimals = Number(element.dataset.countDecimals ?? '0');
    const locale = element.dataset.countLocale ?? 'en-IN';
    const datasetStart = element.dataset.countStart;
    const inferredStart = Math.max(0, Math.round(targetValue * 0.25));
    const startValue = datasetStart !== undefined ? Number(datasetStart) : inferredStart;
    const safeStartValue = Number.isNaN(startValue) ? 0 : startValue;
    const duration = Number(element.dataset.countDuration ?? '1600');
    const options = { prefix, suffix, decimals, locale };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    let startTimestamp;

    updateCounterText(element, safeStartValue, options);
    element.dataset.countAnimated = 'true';

    const step = (timestamp) => {
        if (!startTimestamp) {
            startTimestamp = timestamp;
        }

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = safeStartValue + (targetValue - safeStartValue) * easedProgress;

        updateCounterText(element, currentValue, options);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            updateCounterText(element, targetValue, options);
        }
    };

    window.requestAnimationFrame(step);
};

if (highlightCounters.length) {
    if (!supportsIntersectionObserver || prefersReducedMotion) {
        highlightCounters.forEach((counter) => {
            const prefix = counter.dataset.countPrefix ?? '';
            const suffix = counter.dataset.countSuffix ?? '';
            const decimals = Number(counter.dataset.countDecimals ?? '0');
            const locale = counter.dataset.countLocale ?? 'en-IN';
            const targetValue = Number(counter.dataset.countTarget);
            if (Number.isNaN(targetValue)) {
                return;
            }

            updateCounterText(counter, targetValue, {
                prefix,
                suffix,
                decimals,
                locale
            });
        });
    } else {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.35
        });

        highlightCounters.forEach((counter) => counterObserver.observe(counter));
    }
}

// Back to top button handling with basic debounce
const backToTopButton = document.getElementById('back-to-top');
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (!backToTopButton) {
        return;
    }

    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
        const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolled > 240) {
            backToTopButton.classList.add('show-btn');
        } else {
            backToTopButton.classList.remove('show-btn');
        }
    }, 120);
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: scrollBehavior
        });
    });
}

const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');

if (testimonialCarousel) {
    const track = testimonialCarousel.querySelector('[data-testimonial-track]');
    const cards = track ? Array.from(track.querySelectorAll('.testimonial-card')) : [];
    const cardsPerGroup = 3;

    if (track && cards.length > cardsPerGroup) {
        testimonialCarousel.classList.add('is-enhanced');

        const totalGroups = Math.ceil(cards.length / cardsPerGroup);
        const clones = cards.slice(0, cardsPerGroup).map((card) => card.cloneNode(true));

        clones.forEach((clone) => {
            clone.classList.add('testimonial-card--clone');
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });

        let currentGroup = 0;
        let autoplayId;

        const getGapSize = () => {
            const computedStyle = window.getComputedStyle(track);
            const rawGap = computedStyle.columnGap && computedStyle.columnGap !== 'normal'
                ? computedStyle.columnGap
                : computedStyle.gap;
            const parsedGap = parseFloat(rawGap);

            return Number.isFinite(parsedGap) ? parsedGap : 0;
        };

        const enableTransition = () => {
            track.style.transition = '';
        };

        const disableTransition = () => {
            track.style.transition = 'none';
        };

        const updateOffset = () => {
            const offset = (testimonialCarousel.clientWidth + getGapSize()) * currentGroup;
            track.style.transform = `translateX(-${offset}px)`;
        };

        const jumpToStart = () => {
            disableTransition();
            currentGroup = 0;
            updateOffset();
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    enableTransition();
                });
            });
        };

        const advanceGroup = () => {
            if (currentGroup >= totalGroups) {
                return;
            }

            currentGroup += 1;
            enableTransition();
            updateOffset();
        };

        const stopAutoplay = () => {
            if (autoplayId) {
                window.clearInterval(autoplayId);
                autoplayId = undefined;
            }
        };

        const startAutoplay = () => {
            stopAutoplay();
            autoplayId = window.setInterval(() => {
                if (currentGroup >= totalGroups) {
                    return;
                }
                advanceGroup();
            }, 5200);
        };

        track.addEventListener('transitionend', () => {
            if (currentGroup >= totalGroups) {
                jumpToStart();
            }
        });

        window.addEventListener('resize', () => {
            disableTransition();
            updateOffset();
            requestAnimationFrame(() => {
                enableTransition();
            });
        });

        testimonialCarousel.addEventListener('mouseenter', stopAutoplay);
        testimonialCarousel.addEventListener('mouseleave', startAutoplay);
        testimonialCarousel.addEventListener('focusin', stopAutoplay);
        testimonialCarousel.addEventListener('focusout', (event) => {
            if (!testimonialCarousel.contains(event.relatedTarget)) {
                startAutoplay();
            }
        });

        disableTransition();
        updateOffset();
        requestAnimationFrame(() => {
            enableTransition();
            startAutoplay();
        });
    }
}
