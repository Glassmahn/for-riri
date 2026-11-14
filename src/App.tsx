import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Heart,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

type Page = 'home' | 'birthday' | 'truth' | 'gallery';

const nav: { id: Page; label: string; number: string }[] = [
  { id: 'birthday', label: 'A birthday letter', number: '01' },
  { id: 'truth', label: 'A little confession', number: '02' },
  { id: 'gallery', label: 'The Riri archives', number: '03' },
];

const photos = Array.from({ length: 8 }, (_, i) => ({
  src: `/resources/riri-${String(i + 1).padStart(2, '0')}.jpg`,
  number: String(i + 1).padStart(2, '0'),
}));

function App() {
  const [page, setPage] = useState<Page>('home');
  const [letterOpen, setLetterOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const enter = () => {
    setPage('birthday');
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  const go = (next: Page) => {
    setPage(next);
    setLetterOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPhoto = (direction: number) => {
    if (selectedPhoto === null) return;
    setSelectedPhoto(
      (selectedPhoto + direction + photos.length) % photos.length
    );
  };

  return (
    <main className="site-shell">
      <audio
        ref={audioRef}
        src="/resources/beautiful-by-phyno.mp3"
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <button
          className="wordmark"
          onClick={() => go('home')}
          aria-label="Back to beginning"
        >
          FOR RIRI<span>♥</span>
        </button>
        <div className="topbar-right">
          {page !== 'home' && (
            <span className="top-note">MADE WITH INTENTION · 17 NOV 2026</span>
          )}
          <button
            className="music-toggle"
            onClick={toggleMusic}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{playing ? 'PAUSE' : 'OUR SONG'}</span>
          </button>
        </div>
      </header>

      {page === 'home' && (
        <section className="hero page-enter">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-content">
            <p className="eyebrow">
              <span className="eyebrow-line" /> MADE WITH LOVE
            </p>
            <div className="cupid-scene" aria-label="A little cupid with a heart and arrow">
              <svg viewBox="0 0 260 220" role="img" aria-hidden="true">
                <defs>
                  <linearGradient id="cupidGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff0d8" />
                    <stop offset=".42" stopColor="#e8a99c" />
                    <stop offset="1" stopColor="#a95c70" />
                  </linearGradient>
                  <linearGradient id="cupidWing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff0e6" />
                    <stop offset="1" stopColor="#c77d89" />
                  </linearGradient>
                  <radialGradient id="cupidHeart">
                    <stop offset="0" stopColor="#ffccd0" />
                    <stop offset="1" stopColor="#c65f78" />
                  </radialGradient>
                  <filter id="cupidShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                </defs>
                <ellipse cx="130" cy="193" rx="63" ry="10" fill="#080307" opacity=".45" filter="url(#cupidShadow)" />
                <g className="cupid-wings" fill="url(#cupidWing)" stroke="#f8d9ce" strokeOpacity=".55" strokeWidth="1.2">
                  <path d="M111 91C83 49 38 45 24 75c-9 20 11 48 42 54-17-17-19-31-8-36 13-6 31 11 42 29-10-26-8-37 2-39 10-2 20 10 27 24-2-7-8-12-18-16Z" />
                  <path d="M149 91c28-42 73-46 87-16 9 20-11 48-42 54 17-17 19-31 8-36-13-6-31 11-42 29 10-26 8-37-2-39-10-2-20 10-27 24 2-7 8-12 18-16Z" />
                  <path d="M42 81c18-10 37 3 48 23M35 94c17-5 32 8 42 23M218 81c-18-10-37 3-48 23M225 94c-17-5-32 8-42 23" fill="none" stroke="#fff0e6" strokeWidth="3" strokeLinecap="round" />
                </g>
                <g fill="url(#cupidGold)" stroke="#f9d8c7" strokeOpacity=".65" strokeWidth="1">
                  <circle cx="130" cy="64" r="22" />
                  <path d="M112 58c1-19 34-27 42-4-9-7-17-8-25-4-4 7-9 10-17 8Z" fill="#9d5367" stroke="none" />
                  <path d="M111 88c-13 11-17 30-8 45l18 25 29-2 16-30c5-17-4-31-18-39-9 10-26 11-37 1Z" />
                  <path d="M112 145c-13 13-18 24-15 35 2 7 11 9 16 3l17-24 18 24c6 6 15 3 16-5 1-10-7-23-17-34Z" />
                  <path d="M108 99c-18 10-22 24-13 34 7 9 19 4 26-7M151 99c18 10 22 24 13 34-7 9-19 4-26-7" fill="none" stroke="#f8d5c3" strokeWidth="7" strokeLinecap="round" />
                </g>
                <path d="M90 115c-18-17-35-12-38 2-2 12 10 23 24 18 9-3 13-10 14-20Z" fill="url(#cupidHeart)" stroke="#ffd6d6" strokeWidth="1.5" />
                <path d="M173 54c22 17 22 45 0 62" fill="none" stroke="#f1c5b5" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M169 55l7-7 2 10" fill="none" stroke="#f1c5b5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M174 91l31-21m-8 1 8-1-2 8" fill="none" stroke="#f4d4c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M207 69l9-7-2 11" fill="none" stroke="#f4d4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="130" cy="64" r="2" fill="#6d3445" />
                <path d="M122 73q8 7 16 0" fill="none" stroke="#9b5262" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h1>
              For <em>Riri.</em>
            </h1>
            <p className="hero-sub">A little love, just for you.</p>
            <button className="primary-button" onClick={enter}>
              OPEN YOUR SURPRISE <ArrowRight size={16} />
            </button>
            <p className="hero-foot">
              from your Shay Shay <span>♥</span>
            </p>
          </div>
        </section>
      )}

      {page !== 'home' && (
        <>
          <nav className="section-nav" aria-label="Site sections">
            {nav.map(item => (
              <button
                key={item.id}
                className={page === item.id ? 'active' : ''}
                onClick={() => go(item.id)}
              >
                <span>{item.number}</span>
                {item.label}
              </button>
            ))}
          </nav>
          {page === 'birthday' && (
            <section className="content-page page-enter">
              <div className="section-kicker">
                17 NOVEMBER 2026 <span>✳</span> A DAY FOR RIRI
              </div>
              <p className="script-label">To my favourite kind of beautiful</p>
              <h2>
                Happy birthday,
                <br />                <em>Riri.</em>
              </h2>
              <div className="letter-card">
                <div className="letter-top">
                  <span>A NOTE FOR YOU</span>
                  <Heart size={16} />
                </div>
                <p className="letter-intro">Dear Riri,</p>
                <p>
                  Today is a good excuse to remind you of something I hope you
                  never forget: the world is better with you in it.
                </p>
                <p>
                  I hope this new chapter brings you the kind of happiness that
                  stays, opportunities that meet your hard work, and beautiful
                  surprises you couldn't have planned for yourself.
                </p>
                <p>
                  I see how much you put into the things that matter to you. I
                  hope life is just as intentional about rewarding you. May your
                  plans find their way, may your confidence keep growing, and
                  may you never have to shrink yourself to fit anywhere.
                </p>
                <p>
                  And please, keep smiling that smile. It does more than you
                  know.
                </p>
                {letterOpen ? (
                  <div className="letter-extra page-enter">
                    <p>
                      I'm rooting for you, Riri. For the big wins, the quiet
                      victories, the dreams you haven't told anyone about yet,
                      and every version of yourself you're becoming.
                    </p>
                    <p>
                      Have the loveliest birthday. You deserve to feel
                      celebrated, today and always.
                    </p>
                    <p className="signature">
                      With so much warmth,
                      <br />
                      <strong>Shay Shay</strong> <span>♥</span>
                    </p>
                  </div>
                ) : (
                  <button
                    className="text-button"
                    onClick={() => setLetterOpen(true)}
                  >
                    THERE'S A LITTLE MORE <ArrowDown size={13} />
                  </button>
                )}
              </div>
              <button className="next-link" onClick={() => go('truth')}>
                THERE'S SOMETHING ELSE I WANT YOU TO KNOW{' '}
                <ArrowRight size={15} />
              </button>
            </section>
          )}
          {page === 'truth' && (
            <section className="content-page truth-page page-enter">
              <div className="section-kicker">
                A MOMENT OF HONESTY <span>✳</span> FROM SHAY SHAY
              </div>
              <p className="script-label">Okay, jokes aside...</p>
              <h2>
                You're not just
                <br />
                pretty, <em>Riri.</em>
              </h2>
              <div className="truth-copy">
                <p className="truth-lead">
                  You're ridiculously, unfairly, stop-me-mid-sentence beautiful.
                </p>
                <p>
                  Those eyes? Captivating. That smile? An actual problem for my
                  concentration. And somehow, the more I notice the little
                  things about you, the more I find myself wanting to know you
                  beyond the teasing and the banter.
                </p>
                <p>
                  I know I joke around a lot, and maybe that's why you think I'm
                  never serious. But I want you to know that this part isn't a
                  joke:{' '}
                  <strong>
                    I'm genuinely attracted to you. I like you. I want you.
                  </strong>
                </p>
                <p>
                  Not just because you're gorgeous, but because I admire the way
                  you work hard, the way you keep going, and the person you're
                  becoming. I want good things for you, Riri. Properly good
                  things.
                </p>
                <div className="pull-quote">
                  “If I've been making it sound like a joke, let me be clear:
                  I'm very, very serious about finding out what this could be.”
                </div>
                <p>
                  And just so we're clear, this isn't me putting pressure on you
                  or asking you to have all the answers today. I just didn't
                  want another birthday to pass with you thinking Shay Shay is
                  only playing.
                </p>
                <p className="cheeky-line">
                  Besides, I did say I'd be back in 3 years' time. Don't make me
                  keep a calendar. 😉
                </p>
                <p className="signature truth-signature">
                  Still your Shay Shay,
                  <br />
                  <strong>with sincere affection.</strong>
                </p>
              </div>
              <button className="next-link" onClick={() => go('gallery')}>
                ONE MORE THING — YOUR CAMERA ROLL DESERVES A MUSEUM{' '}
                <ArrowRight size={15} />
              </button>
            </section>
          )}
          {page === 'gallery' && (
            <section className="content-page gallery-page page-enter">
              <div className="section-kicker">
                THE RIRI ARCHIVES <span>✳</span> AN APPRECIATION PROJECT
              </div>
              <p className="script-label">A face worth remembering</p>
              <h2>
                Just look
                <br />
                at <em>you.</em>
              </h2>
              <p className="gallery-intro">
                A little collection of favourite moments. Because some people
                deserve their own gallery.
              </p>
              <div className="gallery-grid">
                {photos.map((photo, i) => (
                  <button
                    className={`photo-tile tile-${i + 1}`}
                    key={photo.number}
                    onClick={() => setSelectedPhoto(i)}
                    aria-label={`Open photo ${photo.number}`}
                  >
                    {!imageErrors.includes(i) ? (
                      <img
                        src={photo.src}
                        alt={`Riri, photograph ${photo.number}`}
                        onError={() => setImageErrors(prev => [...prev, i])}
                      />
                    ) : (
                      <div className="photo-placeholder">
                        <Sparkles size={19} />
                        <span>RIRI MOMENT {photo.number}</span>
                        <small>YOUR PHOTO GOES HERE</small>
                      </div>
                    )}
                    <span className="photo-index">{photo.number}</span>
                  </button>
                ))}
              </div>
              <div className="video-panel">
                <div>
                  <span className="mini-kicker">MOVING PICTURES</span>
                  <h3>
                    Her little moments,
                    <br />
                    <em>in motion.</em>
                  </h3>
                </div>
                <video className="riri-video" controls playsInline preload="metadata" poster="/resources/riri-video-cover.jpg">
                  <source src="/resources/riri-video.mp4" type="video/mp4" />
                  Your browser does not support this video.
                </video>
                <p className="video-hint">
                  Little moments of you, kept close.
                </p>
              </div>
              <div className="gallery-end">
                <Heart size={17} />
                <p>Some things are too lovely to leave uncelebrated.</p>
                <span>— SHAY SHAY</span>
              </div>
            </section>
          )}
          <footer className="footer">
            <button onClick={() => go('home')} className="footer-home">
              FOR RIRI <Heart size={12} />
            </button>
            <span>MADE WITH CARE · SHAY SHAY</span>
            <button
              onClick={() =>
                go(
                  page === 'gallery'
                    ? 'birthday'
                    : page === 'birthday'
                      ? 'truth'
                      : 'gallery'
                )
              }
              className="footer-next"            >
              NEXT <ArrowRight size={13} />
            </button>
          </footer>
        </>
      )}

      {selectedPhoto !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <X />
          </button>
          <button
            className="lightbox-arrow left"
            onClick={e => {
              e.stopPropagation();
              nextPhoto(-1);
            }}
            aria-label="Previous photo"
          >
            <ArrowLeft />
          </button>
          {!imageErrors.includes(selectedPhoto) ? (
            <img
              src={photos[selectedPhoto].src}
              alt="Riri"
              onError={() => setImageErrors(prev => [...prev, selectedPhoto])}
            />
          ) : (
            <div className="lightbox-empty">Your photo will appear here.</div>
          )}
          <button
            className="lightbox-arrow right"
            onClick={e => {
              e.stopPropagation();
              nextPhoto(1);
            }}
            aria-label="Next photo"
          >
            <ArrowRight />
          </button>
          <span className="lightbox-count">
            {photos[selectedPhoto].number} / 08
          </span>
        </div>
      )}

      <div className="floating-note">
        <span className="note-dot" /> A LITTLE WORLD FOR RIRI
      </div>
      <button
        className="sound-chip"
        onClick={() => setMuted(!muted)}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </main>
  );
}

export default App;
