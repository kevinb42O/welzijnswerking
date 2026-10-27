import { animate } from 'motion/mini';
import type { AnimationItem } from 'lottie-web';

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ease = [0.16, 1, 0.3, 1] as const;
const running = new Set<ReturnType<typeof animate>>();

export function move(element: Element, frames: Parameters<typeof animate>[1], options: Parameters<typeof animate>[2] = {}) {
  const control = animate(element, frames, { ease, ...options, ...(reducedMotion.matches ? { duration: 0, delay: 0 } : {}) });
  running.add(control);
  const stop = control.stop.bind(control);
  control.stop = () => { running.delete(control); stop(); };
  void control.then(() => running.delete(control));
  return control;
}

reducedMotion.addEventListener('change', event => {
  if (event.matches) for (const control of running) control.complete();
});

// Dialogs remain native: focus containment, Escape and inert backgrounds stay intact.
export function dialogMotion(dialog: HTMLDialogElement) {
  let current: ReturnType<typeof move> | undefined;
  let version = 0;
  const reset = () => {
    dialog.style.removeProperty('opacity');
    dialog.style.removeProperty('transform');
  };
  return {
    enter() {
      ++version;
      current?.stop();
      reset();
      current = move(dialog, { opacity: [0, 1], transform: ['translateY(12px) scale(.985)', 'translateY(0) scale(1)'] }, { duration: .36 });
    },
    close(finish: () => void, immediate = false) {
      const token = ++version;
      current?.stop();
      if (immediate || reducedMotion.matches) { finish(); reset(); return; }
      current = move(dialog, { opacity: 0, transform: 'translateY(8px) scale(.99)' }, { duration: .16 });
      void current.then(() => { if (token === version) { finish(); reset(); } });
    },
  };
}

// Reveal targets are deliberately small and independent of surrounding copy.
// Observe the stationary frame, animate its inner surface, never its caption.
export function startPageMotion() {
  if (document.documentElement.dataset.motionInitialized) return;
  document.documentElement.dataset.motionInitialized = 'true';
  enhanceDisclosures();
  startHero();
  startHeroParallax();
  startHeroTransition();
  startFactsMotion();
  startReveals();
}

function clearMotion(element: HTMLElement) {
  element.style.removeProperty('transform');
  element.style.removeProperty('opacity');
  element.style.removeProperty('will-change');
}

function finishWhenHidden(control: ReturnType<typeof move>) {
  const finish = () => {
    if (!document.hidden) return;
    if (control.state === 'running' || control.state === 'paused') control.complete();
    document.removeEventListener('visibilitychange', finish);
  };
  document.addEventListener('visibilitychange', finish);
  void control.then(() => document.removeEventListener('visibilitychange', finish));
}

function startHero() {
  const play = () => {
    if (reducedMotion.matches || (location.hash && location.hash !== '#home') || scrollY > 32) return;
    const words = [...document.querySelectorAll<HTMLElement>('.hero-word-text')];
    // A clear, authored entrance: each word rises through its own typographic mask.
    // Individual word masks follow natural wrapping on every screen size.
    words.forEach((word, index) => {
      word.style.willChange = 'transform, opacity';
      const control = move(word, {
        opacity: [.15, 1],
        transform: ['translateY(110%)', 'translateY(0)'],
      }, { duration: 1.08, delay: .14 + index * .085 });
      finishWhenHidden(control);
      void control.then(() => clearMotion(word));
    });
    const intro = document.querySelector<HTMLElement>('.hero-intro');
    if (intro) {
      const control = move(intro, {
        opacity: [.45, 1], transform: ['translateY(14px)', 'translateY(0)'],
      }, { duration: .8, delay: .32 });
      finishWhenHidden(control);
      void control.then(() => clearMotion(intro));
    }
    const photo = document.querySelector<HTMLImageElement>('.hero-photo img');
    if (photo) {
      // A lazy/cold image must not use up its motion while the pixels are missing.
      void photo.decode().then(() => {
        if (reducedMotion.matches || document.hidden || scrollY > 32 || (location.hash && location.hash !== '#home')) return;
        const control = move(photo, { transform: ['scale(1.045)', 'scale(1)'] }, { duration: 1.25 });
        finishWhenHidden(control);
        void control.then(() => clearMotion(photo));
      }).catch(() => {});
    }
  };
  // Do not spend the intro in a background tab.
  const visible = () => {
    if (document.hidden) return;
    document.removeEventListener('visibilitychange', visible);
    requestAnimationFrame(play);
  };
  visible();
  if (document.hidden) document.addEventListener('visibilitychange', visible);
}

// Move the photo frame independently of its image's opening zoom.
// Scroll events schedule one compositor transform; there is no idle animation loop.
function startHeroParallax() {
  const hero = document.querySelector<HTMLElement>('.hero-invitation');
  const photo = hero?.querySelector<HTMLElement>('.hero-photo');
  if (!hero || !photo || hero.closest('.hero--invitation')) return;
  let frame = 0;
  const update = () => {
    frame = 0;
    if (reducedMotion.matches) {
      photo.removeAttribute('data-parallax');
      photo.style.removeProperty('transform');
      photo.style.removeProperty('will-change');
      return;
    }
    photo.dataset.parallax = 'true';
    const bounds = hero.getBoundingClientRect();
    const visible = bounds.bottom > 0 && bounds.top < innerHeight && !document.hidden;
    photo.style.willChange = visible ? 'transform' : 'auto';
    // Overscan reserves 12% at both edges; travel never uses more than 11%.
    // Mobile has a gentler depth, while desktop lets the candlelit room linger.
    const rate = innerWidth <= 600 ? .12 : .22;
    const offset = Math.min(bounds.height * .11, Math.max(0, -bounds.top * rate));
    photo.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', schedule);
  update();
}

// Native scrolling drives two physical panels; no wheel interception or idle loop.
function startHeroTransition() {
  const scene = document.querySelector<HTMLElement>('[data-hero-transition]');
  const stage = scene?.querySelector<HTMLElement>('.hero-transition-stage');
  const hero = stage?.querySelector<HTMLElement>('.hero');
  const invitation = hero?.querySelector<HTMLElement>('.hero-invitation');
  const left = hero?.querySelector<HTMLElement>('.hero-inner');
  const right = hero?.querySelector<HTMLElement>('.hero-photo');
  const practical = stage?.querySelector<HTMLElement>('.practical');
  if (!scene || !stage || !hero || !invitation || !left || !right || !practical) return;
  let frame = 0;
  let travel = 0;
  let enabled = false;
  const update = () => {
    frame = 0;
    if (!enabled || document.body.classList.contains('menu-open')) return;
    const progress = Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / travel));
    // Smooth starts and finishes, with the scroll position always authoritative.
    const eased = progress * progress * (3 - 2 * progress);
    left.style.transform = `translate3d(${-eased * 101}%, 0, 0)`;
    right.style.transform = `translate3d(${eased * 101}%, 0, 0)`;
    practical.style.transform = `translate3d(0, ${(1 - eased) * 28}px, 0)`;
    practical.style.opacity = `${.7 + eased * .3}`;
    hero.style.visibility = progress === 1 ? 'hidden' : 'visible';
    hero.style.pointerEvents = progress > 0 ? 'none' : '';
    hero.inert = progress > 0;

    const moving = progress > 0 && progress < 1;
    left.style.willChange = right.style.willChange = moving ? 'transform' : 'auto';
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const measure = () => {
    scene.removeAttribute('data-split-active');
    scene.style.removeProperty('--split-hero-height');
    scene.style.removeProperty('--split-travel');
    hero.style.removeProperty('visibility');
    hero.style.removeProperty('pointer-events');
    hero.inert = practical.inert = false;
    for (const panel of [left, right, practical]) {
      panel.style.removeProperty('transform');
      panel.style.removeProperty('opacity');
      panel.style.removeProperty('will-change');
    }
    // The stacked mobile composition remains readable in ordinary document flow.
    enabled = !reducedMotion.matches && matchMedia('(min-width: 1001px)').matches;
    if (!enabled) return;
    const height = Math.max(invitation.getBoundingClientRect().height, innerHeight);
    travel = Math.round(innerHeight * 1.1);
    scene.style.setProperty('--split-hero-height', `${height}px`);
    scene.style.setProperty('--split-travel', `${travel}px`);
    scene.dataset.splitActive = 'true';
    scene.style.setProperty('--split-stage-height', `${stage.getBoundingClientRect().height}px`);
    update();
  };
  const revealAnchor = () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (enabled && target === hero) {
      window.scrollTo({ top: scrollY + scene.getBoundingClientRect().top, behavior: 'instant' });
      update();
    } else if (enabled && target && practical.contains(target)) {
      window.scrollTo({ top: scrollY + scene.getBoundingClientRect().top + travel + Math.max(0, target.getBoundingClientRect().top - practical.getBoundingClientRect().top + practical.offsetTop - 24), behavior: 'instant' });
      update();
    }
  };
  // Browser anchor positioning assumes normal flow; account for the pinned runway.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    const target = link && document.getElementById(link.hash.slice(1));
    if (!enabled || !target || (!practical.contains(target) && target !== hero)) return;
    event.preventDefault();
    history.pushState(null, '', link!.hash);
    revealAnchor();
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
  practical.addEventListener('focusin', event => {
    if (!enabled || hero.style.visibility === 'hidden' || !(event.target instanceof HTMLElement)) return;
    const target = event.target;
    window.scrollTo({ top: scrollY + scene.getBoundingClientRect().top + travel + Math.max(0, target.getBoundingClientRect().top - practical.getBoundingClientRect().top + practical.offsetTop - 120), behavior: 'instant' });
    update();
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('pageshow', () => { measure(); revealAnchor(); });
  window.addEventListener('hashchange', revealAnchor);
  reducedMotion.addEventListener('change', measure);
  measure();
  void document.fonts.ready.then(() => { measure(); revealAnchor(); });
}

// A real, locally hosted Lottie team pulls the whole summary into its final slot.
// Motion owns the measured journey; Lottie owns the reindeer's articulated gait.
function startFactsMotion() {
  const frame = document.querySelector<HTMLElement>('.hero-facts');
  const scene = document.querySelector<HTMLElement>('.facts-sleigh-scene');
  const team = scene?.querySelector<HTMLElement>('.facts-sleigh');
  const rope = scene?.querySelector<SVGElement>('.facts-towline');
  if (!frame || !scene || !team || !rope || reducedMotion.matches) return;
  let state: 'pending' | 'loading' | 'ready' | 'playing' | 'done' = 'pending';
  let player: AnimationItem | undefined;
  let gaitFrame = 0;
  const controls: ReturnType<typeof move>[] = [];
  const observer = new IntersectionObserver(() => { void check(); }, {
    rootMargin: '200px 0px', threshold: [0, .45, 1],
  });
  const finish = () => {
    if (state === 'done') return;
    state = 'done';
    frame.dataset.sleighState = 'done';
    observer.disconnect();
    controls.forEach(control => { control.stop(); control.cancel(); });
    cancelAnimationFrame(gaitFrame);
    player?.destroy();
    scene.hidden = true;
    const reset = () => {
      clearMotion(frame);
      team.removeAttribute('style');
      rope.removeAttribute('style');
    };
    reset();
    requestAnimationFrame(reset);
    document.removeEventListener('visibilitychange', visibility);
    document.removeEventListener('close', check, true);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', scroll);
    window.removeEventListener('hashchange', finish);
    window.removeEventListener('pagehide', finish);
    reducedMotion.removeEventListener('change', preference);
  };
  const check = async () => {
    if (state === 'done' || state === 'playing') return;
    const rect = frame.getBoundingClientRect();
    if (reducedMotion.matches || rect.bottom <= 0) { finish(); return; }
    if (document.hidden || document.body.matches('.menu-open, .modal-open')) return;
    if (rect.top < 0 || (location.hash && location.hash !== '#home')) { finish(); return; }
    if (rect.top > innerHeight + 200) return;
    if (state === 'loading') return;
    if (state === 'pending') {
      state = 'loading';
      try {
        // Load the SVG-only player and artwork only near this strip, never on reduce.
        const [module, response] = await Promise.all([
          import('lottie-web/build/player/lottie_light'),
          fetch('/animations/santa-sleigh.json'),
        ]);
        if (!response.ok) throw new Error('Sleigh artwork unavailable');
        const data = await response.json();
        if ((state as string) === 'done' || reducedMotion.matches) { finish(); return; }
        player = module.default.loadAnimation({
          container: team, renderer: 'svg', loop: true, autoplay: false,
          animationData: data, rendererSettings: { preserveAspectRatio: 'xMinYMid meet' },
        });
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Sleigh render timeout')), 3000);
          player!.addEventListener('DOMLoaded', () => { clearTimeout(timeout); resolve(); });
          player!.addEventListener('data_failed', () => { clearTimeout(timeout); reject(new Error('Sleigh render failed')); });
        });
        if ((state as string) === 'done') return;
        team.querySelector('svg')?.setAttribute('viewBox', '100 180 600 190');
        state = 'ready';
      } catch { finish(); return; }
    }
    // Re-measure after the lazy load: never replay above a visitor's scroll position.
    const current = frame.getBoundingClientRect();
    if (current.top < 0 || reducedMotion.matches) { finish(); return; }
    if (document.hidden || document.body.matches('.menu-open, .modal-open')) return;
    const visible = Math.min(current.bottom, innerHeight) - Math.max(current.top, 0);
    if (visible < Math.min(current.height, innerHeight) * .45) return;
    state = 'playing';
    frame.dataset.sleighState = 'playing';
    observer.disconnect();
    const strip = frame.parentElement!.getBoundingClientRect();
    const label = frame.querySelector('.hero-price dd span')!;
    const hitch = document.createRange();
    hitch.selectNodeContents(label);
    const right = hitch.getBoundingClientRect().right - strip.left;
    const width = Math.min(360, Math.max(220, innerWidth * .25));
    const from = -right - width - 80;
    // The complete automatic sequence stays below five seconds.
    const duration = 3.2;
    const travelEase = [.25, .15, .55, 1] as const;
    const transform = [`translateX(${from}px)`, 'translateX(0px)'];
    team.style.left = `${right + 60}px`;
    team.style.width = `${width}px`;
    rope.style.inset = '0';
    rope.style.width = `${strip.width}px`;
    rope.style.height = `${strip.height}px`;
    rope.setAttribute('viewBox', `0 0 ${strip.width} ${strip.height}`);
    frame.style.willChange = 'transform';
    const path = rope.querySelector('.facts-cord')!;
    const highlight = rope.querySelector('.facts-cord-light')!;
    const binding = rope.querySelector('.facts-hitch')!;
    const artwork = team.querySelector('svg')!;
    path.setAttribute('d', '');
    team.style.height = '80px';
    team.style.top = '0px';
    scene.hidden = false;
    // Put the sleigh's attachment at the text's height, rather than drawing a
    // diagonal through the scene. The smaller team fits above and below this line.
    const textBox = hitch.getBoundingClientRect();
    const attachment = new DOMPoint(140, 280).matrixTransform(artwork.getScreenCTM()!);
    team.style.top = `${textBox.top + textBox.height * .5 - attachment.y}px`;
    // A real text range supplies the hitch point. The other endpoint is a point
    // inside the sleigh's body, transformed through the actual SVG screen matrix.
    // Recompute both while travelling: no guessed baseline or disconnected line.
    const drawTowline = () => {
      const text = hitch.getBoundingClientRect();
      const bounds = scene.getBoundingClientRect();
      const matrix = artwork.getScreenCTM();
      if (!matrix) return;
      const sleighHitch = new DOMPoint(140, 280).matrixTransform(matrix);
      const rightEdge = text.right - bounds.left;
      const y = text.top - bounds.top + text.height * .5;
      const x = rightEdge + 7;
      const endX = sleighHitch.x - bounds.left;
      const endY = sleighHitch.y - bounds.top;
      const mid = (x + endX) * .5;
      const cord = `M${x} ${y}Q${mid} ${y + 4} ${endX} ${endY}`;
      path.setAttribute('d', cord);
      highlight.setAttribute('d', cord);
      // A small wrap and binding catch the last letter instead of extending it
      // into a ruler-straight stroke. They disappear with the cord at the handoff.
      binding.setAttribute('d', `M${rightEdge - 5} ${y + 4}C${rightEdge + 2} ${y + 6} ${rightEdge + 5} ${y + 4} ${rightEdge + 5} ${y}C${rightEdge + 5} ${y - 4} ${rightEdge + 2} ${y - 6} ${rightEdge - 5} ${y - 4}M${rightEdge + 3} ${y - 2}L${rightEdge + 8} ${y + 2}M${rightEdge + 3} ${y + 2}L${rightEdge + 8} ${y - 2}`);
    };
    // The one-second source cycle now takes at least 3.6 seconds. Its cadence
    // follows travel gently, with no fast gallop or four-pixel arrival bounce.
    let lastX = right + 60 + from;
    let lastAt = performance.now();
    let lastSpeed = 0;
    let galloping = false;
    const gait = (now: number) => {
      if (state !== 'playing') return;
      drawTowline();
      const elapsed = now - lastAt;
      if (elapsed >= 80) {
        const x = team.getBoundingClientRect().left;
        const velocity = Math.abs(x - lastX) / elapsed * 1000;
        const speed = Math.min(.28, Math.max(.1, velocity / 900));
        if (velocity < 5) {
          if (galloping) { player!.pause(); galloping = false; }
        } else {
          if (Math.abs(speed - lastSpeed) > .015) {
            player!.setSpeed(speed);
            lastSpeed = speed;
          }
          if (!galloping) { player!.play(); galloping = true; }
        }
        lastX = x;
        lastAt = now;
      }
      gaitFrame = requestAnimationFrame(gait);
    };
    const journey = move(frame, { transform }, { duration, ease: travelEase });
    controls.push(journey, move(team, { transform }, { duration, ease: travelEase }));
    gaitFrame = requestAnimationFrame(gait);
    void journey.then(async () => {
      if (state !== 'playing') return;
      clearMotion(frame);
      // Hold both endpoints still until the connection has gently disappeared.
      const release = move(rope, { opacity: [1, 0] }, { duration: .3 });
      controls.push(release);
      await release;
      if (state !== 'playing') return;
      const departure = move(team, {
        transform: ['translateX(0px)', `translateX(${Math.max(200, innerWidth - right + width)}px)`],
      }, { duration: 1.2, ease: [.35, .15, .55, 1] });
      controls.push(departure);
      await departure;
      finish();
    });
  };
  const visibility = () => { if (document.hidden && state === 'playing') finish(); else void check(); };
  const resize = () => { if (state === 'playing') finish(); else void check(); };
  const preference = () => { if (reducedMotion.matches) finish(); };
  let scrollQueued = false;
  const scroll = () => {
    if (scrollQueued || (state !== 'pending' && state !== 'ready')) return;
    scrollQueued = true;
    requestAnimationFrame(() => { scrollQueued = false; void check(); });
  };
  document.addEventListener('visibilitychange', visibility);
  document.addEventListener('close', check, true);
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', scroll, { passive: true });
  window.addEventListener('hashchange', finish);
  window.addEventListener('pagehide', finish);
  reducedMotion.addEventListener('change', preference);
  observer.observe(frame);
  void check();
}

type Reveal = {
  frame: HTMLElement;
  surface: HTMLElement;
  image?: HTMLImageElement;
  state: 'pending' | 'loading' | 'playing' | 'done';
  control?: ReturnType<typeof move>;
};

function startReveals() {
  const reveals: Reveal[] = [];
  // Photo frames already present in markup remain stable even while their images move.
  document.querySelectorAll<HTMLElement>('[data-motion-frame]').forEach(frame => {
    const surface = frame.querySelector<HTMLElement>('[data-motion-surface]');
    const image = frame.querySelector<HTMLImageElement>('img');
    if (surface && image) reveals.push({ frame, surface, image, state: 'pending' });
  });
  const title = document.querySelector<HTMLElement>('.welcome-intro>h2');
  if (title) reveals.push({ frame: title, surface: title, state: 'pending' });

  const finish = (reveal: Reveal) => {
    reveal.state = 'done';
    reveal.control?.stop();
    reveal.control?.cancel();
    clearMotion(reveal.surface);
    observer?.unobserve(reveal.frame);
  };
  const bounds = (reveal: Reveal) => {
    const rect = reveal.frame.getBoundingClientRect();
    const height = Math.min(rect.height, innerHeight);
    const visible = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0));
    // Start only after 30% of the photo (or viewport for a tall photo) is visible,
    // and its top is above the lower 82% line. No offscreen pre-roll.
    return { rect, ready: rect.top <= innerHeight * .82 && visible >= height * .30 && rect.bottom > 0 };
  };
  const blocked = () => document.hidden || document.body.matches('.menu-open, .modal-open');
  const check = async (reveal: Reveal) => {
    if (reveal.state !== 'pending' || blocked()) return;
    if (reducedMotion.matches) { finish(reveal); return; }
    const { rect, ready } = bounds(reveal);
    // Fast scroll or an anchor may skip a scene; never play it late above the screen.
    if (rect.bottom <= 0) { finish(reveal); return; }
    if (!ready) return;
    if (reveal.surface.contains(document.activeElement)) { finish(reveal); return; }
    reveal.state = 'loading';
    if (reveal.image) {
      try { await reveal.image.decode(); }
      catch { finish(reveal); return; }
    }
    if (reveal.state !== 'loading') return;
    const current = bounds(reveal);
    if (blocked() || !current.ready) {
      reveal.state = 'pending';
      if (current.rect.bottom <= 0) finish(reveal);
      return;
    }
    // If decoding finished after the visitor has already scrolled past the top,
    // show the photo in its final state rather than suddenly dimming it.
    if (reducedMotion.matches || current.rect.top < 0) { finish(reveal); return; }
    reveal.state = 'playing';
    reveal.surface.style.willChange = 'transform, opacity';
    reveal.control = move(reveal.surface, reveal.image
      ? { opacity: [.82, 1], transform: ['scale(1.055)', 'scale(1)'] }
      : { opacity: [.6, 1], transform: ['translateY(18px)', 'translateY(0)'] },
      { duration: reveal.image ? .8 : .64 });
    observer?.unobserve(reveal.frame);
    finishWhenHidden(reveal.control);
    void reveal.control.then(() => finish(reveal));
  };

  // Dense thresholds are intentional: isIntersecting alone is true even when
  // the initial entry is below the requested ratio. Geometry is checked again.
  let observer: IntersectionObserver | undefined;
  const observe = () => {
    observer?.disconnect();
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const reveal = reveals.find(item => item.frame === entry.target);
        if (reveal && entry.isIntersecting) void check(reveal);
      }
    }, {
      rootMargin: `0px 0px -${Math.round(innerHeight * .18)}px 0px`,
      threshold: Array.from({ length: 21 }, (_, index) => index / 20),
    });
    reveals.filter(item => item.state === 'pending').forEach(item => observer!.observe(item.frame));
  };
  // Never take already-visible content away on a slow startup or restored scroll.
  const initialTarget = document.getElementById(location.hash.slice(1));
  for (const reveal of reveals) {
    const rect = reveal.frame.getBoundingClientRect();
    const anchored = initialTarget && (initialTarget.contains(reveal.frame) || reveal.frame.contains(initialTarget));
    if (reducedMotion.matches || anchored || rect.top < innerHeight) {
      reveal.state = 'done';
    } else {
      // Prepare only offscreen surfaces. The first visible pixels already have
      // their starting appearance; nothing flashes visible and then fades out.
      reveal.surface.style.opacity = reveal.image ? '.82' : '.6';
      if (reveal.image) reveal.surface.style.transform = 'scale(1.055)';
    }
  }
  observe();
  const revisit = () => requestAnimationFrame(() => {
    if (blocked()) return;
    for (const reveal of reveals) void check(reveal);
  });
  document.addEventListener('visibilitychange', revisit);
  document.addEventListener('close', revisit, true);
  window.addEventListener('resize', () => {
    // Rotation and responsive reflow finish a live reveal rather than restarting it.
    for (const reveal of reveals) if (reveal.state === 'playing' || reveal.state === 'loading') finish(reveal);
    observe();
    revisit();
  });
  window.addEventListener('hashchange', () => {
    for (const reveal of reveals) {
      const target = document.getElementById(location.hash.slice(1));
      if (target && (target.contains(reveal.frame) || reveal.frame.contains(target))) finish(reveal);
    }
    revisit();
  });
  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Element)) return;
    for (const reveal of reveals) if (reveal.frame.contains(event.target)) finish(reveal);
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) for (const reveal of reveals) finish(reveal);
  });
}

function enhanceDisclosures() {
  const items = [...document.querySelectorAll<HTMLDetailsElement>('.welcome-questions details, .centres-disclosure')];
  const controllers = new Map<HTMLDetailsElement, (open: boolean) => void>();
  for (const details of items) {
    const summary = details.querySelector('summary');
    if (!summary) continue;
    let current: ReturnType<typeof move> | undefined;
    let version = 0;
    let desired = details.open;
    const reset = () => {
      details.style.removeProperty('height');
      details.style.removeProperty('overflow');
    };
    const change = (open: boolean) => {
      const token = ++version;
      desired = open;
      current?.stop();
      const from = details.getBoundingClientRect().height;
      reset();
      details.open = true;
      const expanded = details.getBoundingClientRect().height;
      const style = getComputedStyle(details);
      const collapsed = summary.getBoundingClientRect().height + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      if (reducedMotion.matches) { details.open = open; return; }
      // Only this small, user-triggered disclosure animates measured layout.
      details.style.overflow = 'clip';
      current = move(details, { height: [`${from}px`, `${open ? expanded : collapsed}px`] }, { duration: open ? .32 : .22 });
      void current.then(() => {
        if (version !== token) return;
        details.open = open;
        reset();
      });
    };
    controllers.set(details, change);
    // Progressive enhancement: without this script native details[name] still works.
    if (details.name === 'welcome-faq') details.removeAttribute('name');
    summary.addEventListener('click', event => {
      event.preventDefault();
      const open = !desired;
      if (open && details.closest('.welcome-questions')) {
        for (const [other, update] of controllers) {
          if (other !== details && other.closest('.welcome-questions') && other.open) update(false);
        }
      }
      change(open);
    });
    // Hash navigation can open the centre list directly; do not delay its layout.
    details.addEventListener('toggle', () => { if (!current || current.state === 'finished') desired = details.open; });
    window.addEventListener('resize', () => {
      ++version;
      current?.stop();
      details.open = desired;
      reset();
    });
  }
}
