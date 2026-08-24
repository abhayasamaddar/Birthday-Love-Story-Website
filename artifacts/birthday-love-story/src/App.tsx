import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Heart, LockKeyhole, Volume2, VolumeX, Sparkles, ArrowDown, ArrowUpRight, Bike, CalendarDays, Camera, Check, ChevronRight, Gift, HandHeart, Mail, Star, X } from 'lucide-react';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import roadKiss from '@assets/WhatsApp_Image_2026-08-24_at_00.07.17_1787591436322.jpeg';
import herBlack from '@assets/WhatsApp_Image_2026-08-24_at_21.02.17_1787591436319.jpeg';
import herGreen from '@assets/WhatsApp_Image_2026-08-24_at_21.03.08_1787591436320.jpeg';
import herHearts from '@assets/WhatsApp_Image_2026-08-24_at_21.04.34_1787591436320.jpeg';
import herSun from '@assets/WhatsApp_Image_2026-08-24_at_21.06.21_1787591436321.jpeg';
import himMoon from '@assets/WhatsApp_Image_2026-08-24_at_21.09.26_1787591436321.jpeg';
import coupleRoad from '@assets/WhatsApp_Image_2026-08-24_at_21.00.01_1787591436315.jpeg';
import coupleRoadTwo from '@assets/WhatsApp_Image_2026-08-24_at_21.00.30_1787591436318.jpeg';
import fairNight from '@assets/WhatsApp_Image_2026-08-24_at_21.00.40_1787591436319.jpeg';
import waterfall from '@assets/WhatsApp_Image_2026-08-24_at_21.01.38_1787591436319.jpeg';
import firstFrame from '@assets/WhatsApp_Image_2026-08-24_at_21.02.35_1787591436320.jpeg';

const queryClient = new QueryClient();

const chapters = [
  { number: '01', date: 'The beginning', title: 'The Day Everything Changed', label: 'The First Sight', image: herGreen, text: 'It all began with a photo on Pragya’s status. Among all the faces, there was ONE that stopped my world. A photo that made my heart whisper: “This is her. This is the one.” And then came our first “Hii” — your ONE word replies… and my paragraphs of feelings. But then came that moment — the “Hnjii” — the first time someone said it to me. And I KNEW. I just KNEW. You didn’t just enter my life. You REVOLUTIONIZED it.' },
  { number: '02', date: 'August — September 2024', title: 'Running For Your Love', label: 'The Chase', image: coupleRoadTwo, text: 'The race between your Scooty and my bike… Every time I got close, you turned your face away. But NOTHING has changed, right? I’m STILL running for you. And I WILL catch you. One day, you’ll be MINE. Only MINE. Till then, I’ll keep running — running for your happiness, running for your dreams, running for the future you DESERVE.' },
  { number: '03', date: 'October 2024', title: 'When Dreams Met Reality', label: 'The First Meet', image: waterfall, text: 'I remember EVERY detail of our first meeting. The nervousness. The excitement. The MAGIC. You taught me how to LOVE. You taught me how to CARE. You taught me how to DISTURB someone lovingly. You taught me how to RESPECT a girl. You taught me how to SHARE feelings at night. Before you, I was always the SECOND option. But YOU made me feel FIRST. You made me WIN — Hackathon, Sports, Cultural Activities, Studies… Everything changed because YOU entered my life.' },
  { number: '04', date: 'November — December 2024', title: 'When Love Became A Habit', label: 'The Best Phase', image: fairNight, text: 'You became my HABIT. My favorite one. From hostel to home, all I could think was YOU. The excitement of meeting you again… Seeing your photo through the journey… Then came our FIRST MOVIE DATE. “First Friendship Date” — I called it. You sat beside me. You tried to get closer. I wanted to hold your hand… but I FAILED. Fear. Anxiety. Regret. BUT THEN CAME DECEMBER 19TH, 2024. The day I FINALLY confessed. The day I told you I loved you. You cried. It hurt me to see you cry. But I waited. I RAN for it. I never gave up.' },
  { number: '05', date: 'January — April 2025', title: 'Long Distance, But Never Far', label: 'The Wait', image: herSun, text: 'January 2025 — Everyone warned me not to love you. But I fell HARDER. February 2025 — Long distance, but our love grew STRONGER. March 2025 — I distanced from friends for YOU. April 2025 — Even in exams, I wrote YOUR name. Every moment was YOURS. Every thought was ABOUT YOU. I used your name as examples in exam papers! That’s how DEEPLY you were etched in my mind.' },
  { number: '06', date: 'May 14th — July 2025', title: 'The BEST CHAPTER', label: 'The Best Three Months', image: roadKiss, text: 'Three months that changed EVERYTHING. We fought. We hurt each other. But the excitement of meeting the NEXT DAY… The obsession of saying SORRY… The anger of “Main mana kya thaa naa sorry bole ko.” THIS IS LOVE. THIS IS HAPPINESS. This is US. We promised NEVER to leave each other. We promised to MARRY each other. We realized what’s good and bad in life. Every day was a step towards GROWTH. Every day we became BETTER people.' },
];

const photos = [
  { title: 'First flower moment', caption: 'Haa bahi moment haa! The first flower for my first love', image: fairNight, note: 'The first flower I gave you. Small enough to hold, big enough to change everything.' },
  { title: 'First photo together', caption: 'The beginning of forever — our first frame of love', image: firstFrame, note: 'Look at us: two people who had no idea how much life was about to happen.' },
  { title: 'First Friendship Date', caption: 'When we became “US”', image: fairNight, note: 'You sat beside me. I wanted to hold your hand. Fear won that round.' },
  { title: 'The promise', caption: 'The promise of never letting go', image: roadKiss, note: 'Some promises do not need witnesses. They just need two people who keep choosing each other.' , locked: true },
  { title: 'From Hii to Forever', caption: 'A little archive of us', image: coupleRoad, note: 'Every road, every late night, every “sorry” — I would choose it all again.' },
];

const monthNotes: Record<string, string> = {
  January: 'Everyone warned me not to love you. I fell harder.',
  February: 'Long distance, but our love grew stronger.',
  March: 'I distanced from friends for you.',
  April: 'Even in exams, I wrote your name.',
};

function HeartField({ count, onCatch }: { count: number; onCatch: () => void }) {
  const [floating, setFloating] = useState<{ id: number; left: number; top: number }[]>([]);
  useEffect(() => {
    if (count >= 10) return;
    const timer = window.setInterval(() => {
      setFloating((items) => [...items.slice(-5), { id: Date.now(), left: 8 + Math.random() * 84, top: 10 + Math.random() * 70 }]);
    }, 1100);
    return () => window.clearInterval(timer);
  }, [count]);
  return (
    <div className="relative mt-8 h-[360px] overflow-hidden rounded-[1.5rem] border border-[#5b4967]/20 bg-[#241e38]">
      <div className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.22em] text-[#f7dfc0]/55">
        <span>the heart catcher</span><span>{count.toString().padStart(2, '0')} / 10 collected</span>
      </div>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #db7180 0 1px, transparent 1px), radial-gradient(circle at 80% 60%, #dca86a 0 1px, transparent 1px)', backgroundSize: '46px 46px' }} />
      {floating.map((heart) => (
        <button key={heart.id} type="button" data-testid={`button-catch-heart-${heart.id}`} onClick={() => { onCatch(); setFloating((items) => items.filter((item) => item.id !== heart.id)); }} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-[#f08c98] transition-transform hover:scale-125" style={{ left: `${heart.left}%`, top: `${heart.top}%` }} aria-label="Catch this heart">
          <Heart size={30} fill="currentColor" strokeWidth={1.4} />
        </button>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f7dfc0]">
        <Heart className="mb-4 text-[#e7818c]" size={42} fill="currentColor" strokeWidth={1.2} />
        <p className="font-serif text-3xl italic">{count >= 10 ? 'All my hearts are yours.' : 'Catch the ones I keep dropping.'}</p>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[#f7dfc0]/60">{count >= 10 ? 'You caught ALL my hearts — now they’re yours forever.' : 'Tap the floating hearts before they drift away.'}</p>
      </div>
    </div>
  );
}

function Home() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [yesCaught, setYesCaught] = useState(false);
  const [yesPos, setYesPos] = useState({ x: 50, y: 55 });
  const [noHover, setNoHover] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [month, setMonth] = useState('');
  const [photoOpen, setPhotoOpen] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [answer, setAnswer] = useState('');
  const [finalReveal, setFinalReveal] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [notesCaught, setNotesCaught] = useState<string[]>([]);

  const celebrationBits = useMemo(() => Array.from({ length: 46 }, (_, index) => ({ index, left: `${(index * 37) % 100}%`, color: ['#df7380', '#e3aa61', '#f4dfb7', '#77609b'][index % 4], delay: `${(index % 10) * .12}s`, fall: `${2.8 + (index % 5) * .35}s` })), []);
  const moveYes = () => setYesPos({ x: 15 + Math.random() * 70, y: 20 + Math.random() * 62 });
  const catchHeart = () => setHeartCount((value) => Math.min(10, value + 1));
  const catchNote = (note: string) => setNotesCaught((items) => items.includes(note) ? items : [...items, note]);

  return (
    <main className="noise min-h-[100dvh] overflow-hidden bg-[#f4eee4] text-[#2c263c]">
      <div className="fixed right-5 top-5 z-40 flex items-center gap-2 rounded-full border border-[#f7dfc0]/20 bg-[#241e38]/90 px-3 py-2 text-[#f7dfc0] shadow-xl backdrop-blur-md">
        <button type="button" data-testid="button-music-toggle" onClick={() => setMusicOn((value) => !value)} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.12em]" aria-label={musicOn ? 'Mute music' : 'Unmute music'}>
          {musicOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span className="hidden sm:inline">{musicOn ? 'Music on' : 'Sound off'}</span>
        </button>
        <div className="h-4 w-px bg-[#f7dfc0]/25" />
        <span className="font-mono text-[9px] text-[#f7dfc0]/55">optional</span>
      </div>

      {!opened ? (
        <section className="hero-grid relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#241e38] px-6 py-20 text-[#f7dfc0]">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#ba6173]/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#dca86a]/15 blur-3xl" />
          <div className="absolute left-[14%] top-[24%] animate-[drift_6s_ease-in-out_infinite] text-[#e7818c]/70"><Heart size={22} fill="currentColor" /></div>
          <div className="absolute right-[16%] top-[34%] animate-[drift_8s_ease-in-out_infinite] text-[#dca86a]/70"><Star size={18} fill="currentColor" /></div>
          <div className="relative z-10 max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[.32em] text-[#e5b877]"><span className="h-px w-10 bg-[#e5b877]/60" /> a private little archive <span className="h-px w-10 bg-[#e5b877]/60" /></div>
            <p className="font-mono text-xs uppercase tracking-[.34em] text-[#f7dfc0]/55">For Mousumi — Sweetu, Jannu, Kuchupuch, Daby</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,12vw,9.5rem)] leading-[.82] tracking-[-.04em]">Happy Birthday,<br /><em className="text-[#e7818c]">my love.</em></h1>
            <p className="mx-auto mt-8 max-w-lg font-serif text-2xl leading-tight text-[#f7dfc0]/80 md:text-3xl">The day the universe gained its brightest star.</p>
            <div className="mx-auto mt-10 flex max-w-md items-center justify-between border-y border-[#f7dfc0]/20 py-4 text-left font-mono text-[10px] uppercase tracking-[.17em] text-[#f7dfc0]/55"><span>Born · 2006</span><span>Today · your special day</span></div>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-[#f7dfc0]/60">“From the moment I saw you on Pragya’s status, I knew my heart had found its forever home. This is our story — from that first Hii to forever.”</p>
            <button type="button" data-testid="button-open-surprise" onClick={() => { setOpened(true); window.setTimeout(() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }), 80); }} className="group mx-auto mt-10 flex items-center gap-3 rounded-full bg-[#e7818c] px-6 py-3.5 text-sm font-semibold text-[#241e38] shadow-[0_14px_35px_rgba(231,129,140,.28)] transition-transform hover:-translate-y-1 active:scale-95"><LockKeyhole size={17} /> Click to open your surprise <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            <p className="mt-7 font-mono text-[9px] uppercase tracking-[.25em] text-[#f7dfc0]/35">authored with unreasonable amounts of love · Abhaya</p>
          </div>
        </section>
      ) : (
        <>
          <nav className="sticky top-0 z-30 border-b border-[#2c263c]/10 bg-[#f4eee4]/90 px-5 py-3 backdrop-blur-lg md:px-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <a href="#top" data-testid="link-home-top" className="font-serif text-2xl italic text-[#d15e70]">M<span className="text-[#2c263c]"> & </span>A</a>
              <div className="hidden items-center gap-7 font-mono text-[10px] uppercase tracking-[.18em] text-[#665e6b] md:flex">
                <a href="#story" data-testid="link-story">Our story</a><a href="#poems" data-testid="link-poems">The love notes</a><a href="#play" data-testid="link-play">Play with me</a><a href="#memories" data-testid="link-memories">Memories</a>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[.2em] text-[#665e6b]">19.12.24 → always</span>
            </div>
          </nav>

          <section id="top" className="relative bg-[#f4eee4] px-6 pb-24 pt-20 md:px-12 md:pb-32 md:pt-32">
            <div className="mx-auto grid max-w-7xl items-end gap-12 md:grid-cols-[1fr_.83fr]">
              <div className="reveal">
                <p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#d15e70]">A note from Abhaya</p>
                <h2 className="mt-5 max-w-2xl font-serif text-[clamp(4rem,9vw,8.5rem)] leading-[.83] tracking-[-.04em] text-[#2c263c]">I remember<br /><em className="text-[#d15e70]">everything.</em></h2>
                <p className="mt-8 max-w-md text-base leading-7 text-[#665e6b]">The tiny things. The long things. The things you think I forgot. I made this so you can walk through us one more time.</p>
                <a href="#story" data-testid="link-begin-story" className="mt-8 inline-flex items-center gap-2 border-b border-[#d15e70] pb-2 text-sm font-semibold text-[#d15e70]">Begin at the beginning <ArrowDown size={15} /></a>
              </div>
              <div className="relative mx-auto w-full max-w-[440px] rotate-2">
                <div className="absolute -left-7 -top-8 z-10 rounded-full bg-[#e6b36e] px-4 py-3 font-mono text-[9px] uppercase tracking-[.16em] text-[#2c263c] shadow-lg">our little world</div>
                <div className="photo-frame aspect-[4/5] -rotate-2"><img src={coupleRoad} alt="Mousumi kissing Abhaya on a mountain road" /></div>
                <p className="mt-4 font-serif text-xl italic text-[#665e6b]">“This is her. This is the one.”</p>
              </div>
            </div>
          </section>

          <section id="story" className="bg-[#2c263c] px-6 py-24 text-[#f7dfc0] md:px-12 md:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div><p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#e5b877]">Chapter one through six</p><h2 className="mt-4 max-w-2xl font-serif text-6xl leading-[.88] md:text-8xl">The love<br /><em className="text-[#e7818c]">story.</em></h2></div>
                <p className="max-w-xs text-sm leading-6 text-[#f7dfc0]/50">A timeline of all the ways you changed the shape of my days.</p>
              </div>
              <div className="space-y-24 md:space-y-36">
                {chapters.map((chapter, index) => (
                  <article key={chapter.number} className={`grid items-center gap-10 md:grid-cols-[.4fr_1fr] md:gap-20 ${index % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
                    <div className="relative">
                      <span className="font-mono text-6xl text-[#e7818c]/40 md:text-8xl">{chapter.number}</span>
                      <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.18em] text-[#e5b877]"><span className="h-px w-7 bg-[#e5b877]" /> {chapter.date}</div>
                      <h3 className="mt-3 font-serif text-4xl leading-none md:text-5xl">{chapter.label}</h3>
                    </div>
                    <div className="grid gap-8 md:grid-cols-[.7fr_1fr] md:items-center">
                      <div className="aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-[#f7dfc0]/20"><img className="h-full w-full object-cover grayscale-[.1] transition duration-500 hover:scale-105" src={chapter.image} alt={chapter.title} /></div>
                      <div><h4 className="font-serif text-4xl leading-[.95] text-[#e7818c] md:text-5xl">{chapter.title}</h4><p className="mt-6 text-sm leading-7 text-[#f7dfc0]/65">{chapter.text}</p>{index === 1 && <div className="mt-7 flex items-center gap-3 rounded-xl border border-[#f7dfc0]/15 bg-[#f7dfc0]/5 px-4 py-3 text-xs text-[#f7dfc0]/60"><Bike size={19} className="text-[#e5b877]" /> Scooty vs bike · still running for you</div>}{index === 3 && <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#e5b877]/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-[#e5b877]"><CalendarDays size={14} /> Since 19 December 2024</div>}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#e6b36e] px-6 py-24 md:px-12 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[.75fr_1fr] md:items-center">
              <div><p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#6b4250]">A small game for the wait</p><h2 className="mt-4 font-serif text-6xl leading-[.85] text-[#2c263c] md:text-8xl">Four months.<br /><em>Four secrets.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#2c263c]/70">Tap a month. I hid the memories in here because some things are more fun when they are discovered.</p></div>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(monthNotes).map((item, index) => <button type="button" data-testid={`button-month-${item.toLowerCase()}`} key={item} onClick={() => setMonth(item)} className={`group min-h-32 rounded-2xl border p-4 text-left transition-all hover:-translate-y-1 ${month === item ? 'border-[#2c263c] bg-[#f4eee4]' : 'border-[#2c263c]/20 bg-[#f4eee4]/35'}`}><span className="font-mono text-[10px] text-[#6b4250]">0{index + 1}</span><strong className="mt-6 block font-serif text-2xl text-[#2c263c]">{item}</strong><ChevronRight className="mt-3 transition-transform group-hover:translate-x-1" size={16} /></button>)}
                <div className="col-span-2 min-h-24 rounded-2xl border border-[#2c263c]/20 bg-[#2c263c] p-5 text-[#f7dfc0]">{month ? <><p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#e5b877]">{month} 2025</p><p className="mt-2 font-serif text-2xl italic">{monthNotes[month]}</p></> : <p className="text-sm text-[#f7dfc0]/55">Your hidden memory will appear here.</p>}</div>
              </div>
            </div>
          </section>

          <section id="poems" className="bg-[#f4eee4] px-6 py-24 md:px-12 md:py-36">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-12 md:grid-cols-[.65fr_1fr]">
                <div className="md:sticky md:top-28 md:self-start"><p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#d15e70]">The love notes</p><h2 className="mt-4 font-serif text-6xl leading-[.84] text-[#2c263c] md:text-8xl">I love you,<br /><em className="text-[#d15e70]">Jaanu.</em></h2><div className="mt-8 aspect-[4/5] max-w-[260px] rotate-[-3deg] overflow-hidden bg-[#e6b36e] p-3 shadow-xl"><img className="h-full w-full object-cover" src={herBlack} alt="Mousumi in a black jacket" /></div></div>
                <div>
                  <div className="mb-14 max-w-2xl border-l-2 border-[#d15e70] pl-6"><p className="font-serif text-3xl leading-tight text-[#2c263c]">“From the first flower I gave you… to you picking me up from home. From dropping you home early… to spending late nights lost in each other. We’ve GROWN. We’ve MATURED. And here we are, holding each other’s hands.”</p><p className="mt-5 font-mono text-[10px] uppercase tracking-[.18em] text-[#665e6b]">— My bada gift choice, the one you loved</p></div>
                  <div className="space-y-5">
                    <div className="rounded-[1.4rem] bg-[#2c263c] p-7 text-[#f7dfc0] md:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#e5b877]">01 · Sirf Tu</p><p className="mt-6 text-lg leading-9 md:text-xl" lang="hi">मुझे सिर्फ़ तू चाहिए… ना तुझसे कोई अच्छा, ना तुझसे कोई बेहतर, मुझे सिर्फ़ तू चाहिए।<br />तुझसे प्यार करना अगर गलती है, तो मुझे उस गलती की सज़ा भी मंज़ूर है। लेकिन उस सज़ा के बाद भी मुझे बस तू ही चाहिए।<br />मंज़ूर है मुझे लोगों की भली-बुरी बातें सुनना, मंज़ूर है उनकी बातें सहना भी… लेकिन उन सारी बातों के बाद भी, मुझे सिर्फ़ तू चाहिए। क्योंकि चाहे दुनिया कुछ भी कहे, मेरे दिल को आज भी सिर्फ़ तू चाहिए।</p></div>
                    <div className="rounded-[1.4rem] border border-[#2c263c]/15 bg-[#ead7c2] p-7 md:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#d15e70]">02 · Without You</p><p className="mt-6 text-lg leading-9 md:text-xl" lang="hi">क्या तुम जानना चाहती हो तुम्हारे बिना मैं कैसा हूँ, तो सोचो हिमालय से बर्फ़ रूठ जाए तो कैसा होगा, सोचो गणेश जी से मोदक रूठ जाए तो कैसा होगा, सोचो तुम्हारे सपनों का आईना तुम्हारे सपनों से टूट जाए तो कैसा होगा, जैसे शब्द अधूरे हैं मात्रा के बिना, जैसे कक्षा अधूरी है छात्रों के बिना, जैसे दुर्गा बिना आरती की, जहाँ शिव खड़े हों बिना पार्वती के।</p></div>
                    <div className="rounded-[1.4rem] bg-[#d15e70] p-7 text-[#f7dfc0] md:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#f7dfc0]/70">03 · My Khuda</p><p className="mt-6 text-lg leading-9 md:text-xl" lang="hi">तू बता, किस मन्नत में माँगूँ तुझे, कौन-सी दरगाह में सजदा करूँ तेरा? हर रास्ता तेरी ही गली को मुड़ा अब, और कहाँ जाकर ठहरूँ मैं? सुना है वो सुनता है सबकी दुआ, पर तू ही बता, मेरा ख़ुदा है कहाँ? तू मिल जाए तो ये मुसाफ़िर मुकम्मल हो, वरना सुनसान लगता है सारा जहाँ। अब तू लौटा तो मानूँ मैं इसे ख़ुदा, वरना क्या रहा है इस जहाँ में, इस वफ़ा में? मेरा ख़ुदा तो आने से रहा मेरी दुआ में, बस वीरान रह जाएगी ये ज़िंदगी तेरी राह में।</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="play" className="bg-[#ead7c2] px-6 py-24 md:px-12 md:py-36">
            <div className="mx-auto max-w-7xl"><div className="mb-16 max-w-2xl"><p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#d15e70]">The important questions</p><h2 className="mt-4 font-serif text-6xl leading-[.86] text-[#2c263c] md:text-8xl">Play with<br /><em>my heart.</em></h2></div>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
                <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-[#2c263c] p-7 text-[#f7dfc0] md:p-10"><div className="absolute right-6 top-6 rounded-full border border-[#f7dfc0]/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[.16em] text-[#f7dfc0]/50">Question 01</div><div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center"><Heart className="mb-6 text-[#e7818c]" size={40} fill="currentColor" /><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#e5b877]">Be honest, Jaanu</p><h3 className="mt-5 font-serif text-5xl leading-none md:text-7xl">Do you love me?</h3>{yesCaught ? <div className="reveal mt-7"><p className="font-serif text-3xl italic text-[#e7818c]">I knew it.</p><p className="mt-2 text-sm text-[#f7dfc0]/60">I love you too — more than yesterday, less than tomorrow.</p><div className="mt-5 flex justify-center gap-1 text-[#e5b877]"><Sparkles size={16} /><Sparkles size={12} /><Sparkles size={16} /></div></div> : <div className="relative mt-9 h-16 w-full max-w-sm"><button type="button" data-testid="button-yes-love" onMouseEnter={moveYes} onTouchStart={moveYes} onClick={() => { setYesCaught(true); setConfetti(true); }} className="absolute rounded-full bg-[#e7818c] px-8 py-3 text-sm font-semibold text-[#2c263c] transition-all" style={{ left: `${yesPos.x}%`, top: `${yesPos.y}%`, transform: 'translate(-50%, -50%)' }}>YES</button><button type="button" data-testid="button-no-love" onMouseEnter={() => setNoHover(true)} onMouseLeave={() => setNoHover(false)} onClick={moveYes} className="absolute left-[72%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f7dfc0]/30 px-7 py-3 text-sm text-[#f7dfc0]">{noHover ? 'CLICK YES' : 'NO'}</button></div>}</div></div>
                <div className="rounded-[1.5rem] bg-[#f4eee4] p-7 paper-shadow md:p-10"><div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#d15e70]">Question 02</p><h3 className="mt-3 font-serif text-4xl text-[#2c263c]">Catch my heart</h3></div><HandHeart className="text-[#d15e70]" size={34} /></div><p className="mt-4 text-sm leading-6 text-[#665e6b]">There are ten pieces of it drifting around. Catch every one and I’ll give you the whole thing.</p><HeartField count={heartCount} onCatch={catchHeart} /></div>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-[#2c263c]/10 bg-[#f4eee4] p-7 paper-shadow md:p-10"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#d15e70]">Question 03 · sliding love notes</p><h3 className="mt-3 font-serif text-4xl text-[#2c263c]">Collect our firsts.</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#665e6b]">Tap each memory as it slides past. If you miss one, don’t worry — I’ll never forget it.</p></div><div className="flex flex-wrap gap-2">{['First Hii', 'First movie', 'First fight', 'First sorry'].map((note) => <button type="button" data-testid={`button-note-${note.toLowerCase().replaceAll(' ', '-')}`} key={note} onClick={() => catchNote(note)} className={`rounded-full border px-4 py-2 text-xs transition-all ${notesCaught.includes(note) ? 'border-[#d15e70] bg-[#d15e70] text-[#f4eee4]' : 'border-[#2c263c]/20 text-[#665e6b] hover:border-[#d15e70]'}`}>{notesCaught.includes(note) && <Check className="mr-1 inline" size={12} />}{note}</button>)}</div></div></div>
            </div>
          </section>

          <section id="memories" className="bg-[#f4eee4] px-6 py-24 md:px-12 md:py-36">
            <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#d15e70]">Photo archive</p><h2 className="mt-4 font-serif text-6xl leading-[.85] text-[#2c263c] md:text-8xl">Proof that<br /><em className="text-[#d15e70]">we happened.</em></h2></div><p className="max-w-xs text-sm leading-6 text-[#665e6b]">Tap a frame. Some memories are shy; they need a little coaxing.</p></div>
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
                {photos.map((photo, index) => <button type="button" data-testid={`button-photo-${index + 1}`} key={photo.title} onClick={() => setPhotoOpen(index)} className={`group text-left ${index === 0 ? 'lg:col-span-4 lg:mt-10' : index === 1 ? 'lg:col-span-3' : index === 2 ? 'lg:col-span-5 lg:mt-16' : index === 3 ? 'lg:col-span-5' : 'lg:col-span-4 lg:mt-10'}`}><div className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e6b36e] p-2 shadow-xl transition duration-500 ${index % 2 ? 'rotate-2 group-hover:rotate-0' : '-rotate-2 group-hover:rotate-0'}`}><img src={photo.image} alt={photo.title} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${photo.locked && !unlocked ? 'blur-md brightness-75' : ''}`} />{photo.locked && !unlocked ? <span className="absolute inset-0 flex flex-col items-center justify-center text-[#f7dfc0]"><LockKeyhole size={28} /><span className="mt-2 font-mono text-[9px] uppercase tracking-[.18em]">locked memory</span></span> : <span className="absolute right-4 top-4 rounded-full bg-[#f4eee4]/90 p-2 text-[#d15e70] opacity-0 transition-opacity group-hover:opacity-100"><Camera size={15} /></span>}</div><p className="mt-4 font-serif text-2xl text-[#2c263c]">{photo.title}</p><p className="mt-1 text-xs leading-5 text-[#665e6b]">{photo.caption}</p></button>)}
              </div>
            </div>
          </section>

          <section className="bg-[#2c263c] px-6 py-24 text-[#f7dfc0] md:px-12 md:py-36">
            <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[.72fr_1fr] md:items-start"><div><p className="font-mono text-[10px] uppercase tracking-[.26em] text-[#e5b877]">The final letter</p><h2 className="mt-4 font-serif text-6xl leading-[.85] md:text-8xl">To my<br /><em className="text-[#e7818c]">Mousumi.</em></h2><div className="mt-10 flex items-center gap-3 text-[#f7dfc0]/50"><Mail size={18} /><span className="font-mono text-[10px] uppercase tracking-[.18em]">sealed for my Jaanu</span></div></div><div className="max-w-2xl border-t border-[#f7dfc0]/20 pt-8"><p className="font-serif text-3xl leading-tight md:text-4xl">Everything changed with time.</p><p className="mt-7 text-sm leading-8 text-[#f7dfc0]/65">From me picking you up… to you picking me up from home. From early evenings dropping you home… to late nights forgetting about time. From finding the best food for you… to you finding the best in me. From hurting everyone… to loving everyone. From confusion… to CLARITY.</p><p className="mt-7 text-sm leading-8 text-[#f7dfc0]/65">We STAND HERE today. Holding each other’s hands. MY love. MY life. MY everything. Here’s to our first flower moment. Here’s to our first photo together. Here’s to all our firsts. Here’s to FOREVER.</p><p className="mt-7 font-serif text-3xl italic text-[#e7818c]">I LOVE YOU. And I will ALWAYS love you.</p><p className="mt-8 font-mono text-[10px] uppercase tracking-[.18em] text-[#e5b877]">More than yesterday. Less than tomorrow. Till my LAST breath. And even after.<br /><span className="mt-3 inline-block text-[#f7dfc0]/50">Apka Abhaya</span></p><div className="mt-12 rounded-2xl border border-[#f7dfc0]/15 bg-[#f7dfc0]/5 p-6"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#e5b877]">The promise</p><p className="mt-4 text-base leading-8 text-[#f7dfc0]/75">I want to tell you: मैं ज़्यादा प्यार करता हूँ आपसे और करता रहूँगा FOREVER AND EVER. Till my last breath. And beyond. In another universe. In another timeline. I will find you again. With MORE love. With a BETTER version of me. Meri Mousumi… I love you the MOOOST! Take care of yourself. Don’t forget to drink water. Eat your food on time. Have a GREAT day, my love.</p></div></div></div>
          </section>

          <section className="relative overflow-hidden bg-[#d15e70] px-6 py-28 text-center text-[#f7dfc0] md:px-12 md:py-40">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full border border-[#f7dfc0]/20" /><div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full border border-[#f7dfc0]/20" />
            <div className="relative z-10 mx-auto max-w-4xl"><Gift className="mx-auto mb-8" size={40} strokeWidth={1.4} /><p className="font-mono text-[10px] uppercase tracking-[.28em] text-[#f7dfc0]/70">A birthday wish for you</p><h2 className="mt-5 font-serif text-[clamp(4rem,10vw,9rem)] leading-[.8]">Happy Birthday,<br /><em>Sweetu.</em></h2><div className="mx-auto mt-10 max-w-2xl text-base leading-8 text-[#f7dfc0]/80">On this special day, I wish you: ALL the happiness you deserve. ALL the success you dream of. ALL the love you’ve given me… times infinity. You were born on THIS day to make MY life beautiful. And today, I celebrate YOU. The most AMAZING person I’ve ever met. I wish I could give you the WORLD. But for now, I give you MY HEART. It’s ALL yours. Always was. Always will be.</div><div className="mt-12 grid gap-3 font-serif text-2xl italic sm:grid-cols-2 md:grid-cols-5 md:text-xl"><span>Happy Birthday Sweetu</span><span>Happy Birthday Jannu</span><span>Happy Birthday Kuchupuch</span><span>Happy Birthday Daby</span><span>Happy Birthday My Love</span></div><button type="button" data-testid="button-final-surprise" onClick={() => { setFinalReveal(true); setConfetti(true); }} className="mt-14 inline-flex items-center gap-3 rounded-full bg-[#f7dfc0] px-7 py-4 text-sm font-semibold text-[#2c263c] shadow-xl transition-transform hover:-translate-y-1 active:scale-95"><Sparkles size={17} /> One last surprise <ArrowUpRight size={17} /></button>{finalReveal && <div className="reveal mx-auto mt-9 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-[#f7dfc0]/30 bg-[#2c263c]/25 p-5 text-left"><Heart size={28} fill="currentColor" /><div><p className="font-serif text-2xl">You are my hope. My peace. My everything.</p><p className="mt-1 text-xs text-[#f7dfc0]/60">I love you, Jaanu. Always.</p></div></div>}</div>
          </section>

          <footer className="bg-[#f4eee4] px-6 py-12 text-center text-[#665e6b]"><p className="font-serif text-3xl italic text-[#d15e70]">From Hii to forever.</p><p className="mt-4 font-mono text-[9px] uppercase tracking-[.2em]">made with every little detail · Abhaya for Mousumi</p></footer>

          {photoOpen !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#241e38]/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="relative grid max-h-[90vh] max-w-4xl gap-8 overflow-auto rounded-[1.4rem] bg-[#f4eee4] p-5 md:grid-cols-[.9fr_1fr] md:p-8"><button type="button" data-testid="button-close-photo" onClick={() => setPhotoOpen(null)} className="absolute right-4 top-4 z-10 rounded-full bg-[#2c263c] p-2 text-[#f7dfc0]" aria-label="Close photo"><X size={18} /></button><div className="photo-pop aspect-[4/5] max-h-[70vh] overflow-hidden rounded-xl bg-[#e6b36e] p-2"><img className="h-full w-full object-cover" src={photos[photoOpen].image} alt={photos[photoOpen].title} /></div><div className="flex flex-col justify-center p-2 md:p-5"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#d15e70]">memory {String(photoOpen + 1).padStart(2, '0')}</p><h3 className="mt-4 font-serif text-5xl leading-none text-[#2c263c]">{photos[photoOpen].title}</h3><p className="mt-5 text-sm leading-7 text-[#665e6b]">{photos[photoOpen].note}</p>{photos[photoOpen].locked && !unlocked && <div className="mt-7 rounded-xl border border-[#2c263c]/10 bg-[#ead7c2] p-4"><p className="text-sm font-semibold text-[#2c263c]">Unlock this memory</p><p className="mt-1 text-xs leading-5 text-[#665e6b]">What did I say when I first saw you?</p><div className="mt-3 flex gap-2"><input data-testid="input-photo-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#2c263c]/15 bg-[#f4eee4] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#d15e70]" placeholder="your answer" /><button type="button" data-testid="button-unlock-photo" onClick={() => { if (answer.trim().length > 1) setUnlocked(true); }} className="rounded-lg bg-[#d15e70] px-3 py-2 text-[#f4eee4]" aria-label="Unlock photo"><Check size={16} /></button></div></div>}</div></div></div>}
          {confetti && <div className="pointer-events-none fixed inset-0 z-[70]" onAnimationEnd={() => setConfetti(false)}>{celebrationBits.map((bit) => <span key={bit.index} className="confetti-bit" style={{ left: bit.left, backgroundColor: bit.color, animationDelay: bit.delay, ['--fall' as string]: bit.fall, transform: `rotate(${bit.index * 27}deg)` }} />)}</div>}
        </>
      )}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;