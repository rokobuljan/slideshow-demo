// Helper functions
const EL = (sel, EL) => (EL || document).querySelector(sel);
const ELS = (sel, EL) => (EL || document).querySelectorAll(sel);
const ELNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

// Slideshow Component
const Slideshow = (EL_slideshow, options = {}) => {

    const EL_mover = EL(".Slideshow-mover", EL_slideshow);
    const ELS_items = ELS(".Slideshow-item", EL_slideshow);
    const EL_menu = EL(".Slideshow-menu", EL_slideshow);
    const EL_prev = EL(".Slideshow-navBtn.prev", EL_slideshow);
    const EL_next = EL(".Slideshow-navBtn.next", EL_slideshow);
    const tot = ELS_items.length;
    const speed = options.speed || "600ms"; // Animation speed
    let curr = options.index || 0; // Current index

    // Set speed
    EL_mover.style.transitionDuration = speed;

    // Create dynamic menu buttons
    ELS_items.forEach((_, idx) => {
        EL_menu.append(ELNew("button", {
            type: "button",
            className: "Slideshow-menuBtn",
            textContent: idx+1,
            onclick() {
                curr = idx;
                anim();
            }
        }));
    });
    // Colect the created buttons
    const ELS_menuBtn = ELS(".Slideshow-menuBtn", EL_menu);

    // Methods
    const anim = () => {
        EL_mover.style.transform = `translateX(-${curr * 100}%)`;
        ELS_menuBtn.forEach((el, idx) => {
            el.classList.toggle("is-active", curr === idx);
        });
    };

    const prev = () => {
        curr -= 1;
        if (curr < 0) curr = tot - 1;
        anim();
    };

    const next = () => {
        curr += 1;
        if (curr > tot - 1) curr = 0;
        anim();
    };

    // Events:
    EL_prev.addEventListener("click", prev);
    EL_next.addEventListener("click", next);

    // Init:
    anim();

};

ELS(".Slideshow").forEach(el => Slideshow(el, {
    index: 0,
    speed: "1000ms",
}));