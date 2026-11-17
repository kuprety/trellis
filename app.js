/* Shared helpers for the logged-in pages: storage, icons, mentor data, nav, mentor card */
(function () {
    const svg = d => s => `<svg viewBox="0 0 24 24" width="${s || 20}" height="${s || 20}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
    
    window.ICON = {
      briefcase: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>'),
      history: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>'),
      check: svg('<path d="M5 12l4 4 10-10"/>'),
      chat: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>'),
      pencil: svg('<path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4"/>'),
      bell: svg('<path d="M6 16v-5a6 6 0 1 1 12 0v5l2 2H4l2-2zM10 21h4"/>'),
      cal: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
      arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
      sprout: svg('<path d="M12 21v-9M12 12c0-4-3-6-8-6 0 4 2 6 8 6zM12 14c0-3 2-5 7-5 0 3-2 5-7 5z"/>'),
      people: svg('<circle cx="7" cy="9" r="2"/><circle cx="17" cy="9" r="2"/><path d="M3 19c0-2 2-3.5 4-3.5s4 1.5 4 3.5M13 19c0-2 2-3.5 4-3.5s4 1.5 4 3.5"/>'),
      shuffle: svg('<path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3"/>')
    };

    ICON.chevron = svg('<path d="M6 9l6 6 6-6"/>');
  
    window.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  
    // localStorage wrapper (falls back silently if blocked)
    window.store = {
      get(k, d) { try { const v = localStorage.getItem('trellis:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
      set(k, v) { try { localStorage.setItem('trellis:' + k, JSON.stringify(v)); } catch (e) {} }
    };
  
    // Placeholder data: swap in real details. Photos live at images/mentor-<slug>.jpg
    window.MENTORS = [
      { slug: 'maya', name: 'Maya Vance', first: 'Maya', role: 'Senior Product Designer', co: 'Adobe', gap: 4, years: 6, tag: 'Also returned to design after a long break', headline: 'Practical support for your resumé, portfolio and next interview.', blurb: 'Practical edits to your resumé, with advice on explaining your career break.', next: ['Tue, 10 Nov', '10:30 AM'], quote: '“Let’s make your CV and portfolio show what you can bring to your next role.”' },
      { slug: 'alex', name: 'Alex Chen', first: 'Alex', role: 'Associate Product Designer', co: 'WHOOP', gap: 3, years: 5, tag: 'Helps with portfolio feedback', headline: 'Portfolio & case-study feedback', blurb: 'Improve your project structure and show the thinking behind your design decisions.', next: ['Thu, 12 Nov', '11:00 AM'], quote: '“Your case studies should tell the story of how you think.”' },
      { slug: 'sophia', name: 'Sophia Gonzales', first: 'Sophia', role: 'Product Design Lead', co: 'Spotify', gap: 5, years: 8, tag: 'Helps with interview preparation', headline: 'CV review & interview preparation', blurb: 'Refine your CV and practise telling your story in your next design interview.', next: ['Fri, 13 Nov', '2:00 PM'], quote: '“Your break is part of your story. Let’s practise telling it well.”' },
      { slug: 'nina', name: 'Nina Patel', first: 'Nina', role: 'UX Designer', co: 'Microsoft', gap: 2, years: 7, tag: 'Helps with portfolio structure', headline: 'CV review & portfolio structure', blurb: 'Choose stronger projects and make your CV easier for design teams to scan.', next: ['Mon, 16 Nov', '9:30 AM'], quote: '“Fewer, stronger projects beat a long list every time.”' },
      { slug: 'daniel', name: 'Daniel Park', first: 'Daniel', role: 'Interaction Designer', co: 'Atlassian', gap: 3, years: 6, tag: 'Helps with interview practice', headline: 'CV review & interview practice', blurb: 'Connect your past experience to a product role and practise clear interview answers.', next: ['Tue, 17 Nov', '1:00 PM'], quote: '“Let’s turn your past experience into clear interview answers.”' },
      { slug: 'jamie', name: 'Jamie Morgan', first: 'Jamie', role: 'Content Designer', co: 'Shopify', gap: 6, years: 9, tag: 'Helps with resume review', headline: 'Portfolio storytelling & CV review', blurb: 'Build concise case studies and describe the skills you bring back to work.', next: ['Wed, 18 Nov', '10:30 AM'], quote: '“Concise case studies show how you work, not just what you made.”' }
    ];
    window.mentorBySlug = s => MENTORS.find(m => m.slug === s) || MENTORS[0];
  
    // Signed-in header. Add <header class="app-nav" id="app-nav"></header> and call mountNav('home' | 'find')
    window.mountNav = function (active) {
      const el = document.getElementById('app-nav');
      const name = store.get('name', 'Ashlynn');
      const a = (k, t, h) => `<a href="${h}"${active === k ? ' aria-current="page"' : ''}>${t}</a>`;
      el.innerHTML = `<a class="logo" href="dashboard.html"><img src="images/logo.svg" alt="" width="24" height="24">Trellis</a>
        <nav class="app-links" aria-label="Primary">${a('home', 'Home', 'dashboard.html')}${a('find', 'Find a mentor', 'find-mentor.html')}${a('sessions', 'My sessions', '#sessions')}${a('messages', 'Messages', '#messages')}</nav>
        <div class="app-user">
          <button class="icon-btn" type="button" aria-label="Notifications">${ICON.bell(24)}</button>
          <div class="user-menu">
            <button class="user-btn" type="button" id="user-btn" aria-haspopup="menu" aria-expanded="false" aria-controls="user-pop">
              <span class="avatar-initial">${esc(name[0].toUpperCase())}</span><span>${esc(name)}</span>${ICON.chevron(18)}
            </button>
            <div class="user-pop" id="user-pop" role="menu" hidden>
              <a role="menuitem" href="index.html">Log out</a>
            </div>
          </div>
        </div>`;
    
      // Open/close the account menu
      const btn = el.querySelector('#user-btn'), pop = el.querySelector('#user-pop');
      const setOpen = open => { pop.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
      btn.addEventListener('click', () => setOpen(pop.hidden));
      document.addEventListener('click', e => { if (!el.contains(e.target)) setOpen(false); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) { setOpen(false); btn.focus(); } });
    };
  
    // Mentor card used on the dashboard and Find a mentor
    window.mentorCard = (m, o = {}) => `<article class="mcard${o.selected ? ' is-selected' : ''}" data-slug="${m.slug}" tabindex="0">
      <img class="mphoto" src="images/mentor-${m.slug}.svg" alt="${m.name}">
      <div class="mbody">
        ${o.best ? '<span class="badge">Best match</span>' : ''}
        <h3>${m.name}</h3>
        <p class="mrow">${ICON.briefcase(18)}${m.role} · ${m.co}</p>
        <p class="mrow">${ICON.history(18)}Returned after a ${m.gap}-year career break</p>
        <p class="mtag">${ICON.check(14)}${m.tag}</p>
        ${o.detail ? `<p class="mhead">${m.headline}</p><p class="mblurb">${m.blurb}</p>` : ''}
      </div>
      <div class="mavail">
        <p class="small">Next available</p>
        <p class="mdate">${m.next[0]}</p>
        <p class="small">${m.next[1]} · Eastern Time</p>
        <a class="btn btn-mint" href="find-mentor.html?mentor=${m.slug}" data-view="${m.slug}">View profile</a>
        <a class="btn btn-line" href="#message">${ICON.chat(22)}Send message</a>
      </div>
    </article>`;


    // Filled check used in the stepper and the confirmation screen
ICON.checkFilled = s => `<svg viewBox="0 0 24 24" width="${s || 24}" height="${s || 24}" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// The booking the person is making (falls back to a sample so the page never breaks)
window.currentBooking = () => {
  const b = store.get('booking', null);
  return b && b.mentor && b.slot ? b : { mentor: 'maya', day: 12, slot: [11, 0] };
};

// Turns { day, slot: [hour, minute] } into display strings (November 2026)
window.bookingInfo = bk => {
  const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dow = DOW[new Date(2026, 10, bk.day).getDay()];
  const start = bk.slot, end = start[1] === 30 ? [start[0] + 1, 0] : [start[0], 30];
  const f = ([h, mi]) => ({ t: ((h + 11) % 12 + 1) + ':' + String(mi).padStart(2, '0'), ap: h < 12 ? 'AM' : 'PM' });
  const s = f(start), e = f(end);
  const range = s.ap === e.ap ? `${s.t}–${e.t} ${e.ap}` : `${s.t} ${s.ap}–${e.t} ${e.ap}`;
  return {
    dow, day: bk.day, start, end, range,
    long: `${dow}, ${bk.day} November`,
    long2026: `${dow}, ${bk.day} November 2026`
  };
};

// Mentor summary box (same markup book.html builds inline), used by book-note.html
window.mentorBoxHTML = m => `
  <div class="mb-head"><img class="ring" src="images/mentor-${m.slug}.svg" alt=""><div><h3>${m.name}</h3><p>${m.role}</p><p class="small2">${m.co} · ${m.years} years’ experience</p></div></div>
  <dl><div><dt>${ICON.history(24)}Duration</dt><dd>30 minutes</dd></div>
  <div><dt>${ICON.cal(24)}Meeting</dt><dd>Video call</dd></div>
  <div><dt>${ICON.check(24)}Fee</dt><dd class="free">Free</dd></div></dl>`;

  
  })();