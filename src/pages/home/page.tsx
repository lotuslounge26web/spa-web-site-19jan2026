import { useEffect, useState } from 'react';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState<null | 'cancellation' | 'etiquette'>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 240);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!scrolled && mobileOpen) {
      setMobileOpen(false);
    }
  }, [scrolled, mobileOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setMobileOpen(false);
    }, 150);
  };

  const galleryImages = [
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/2e2ffdd8603b7944efddf5d605161cd5.png',
      alt: 'Treatment Room',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/c25f724e6f892b53f540f52f5a42e86e.png',
      alt: 'Relaxation Lounge',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/d3dde9d65164610bb73af7e4da048fa6.png',
      alt: 'Ocean View',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/6f15ac15652c3f470b0207b798b467cf.png',
      alt: 'Spa Details',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/08122c703782bd8ba88b8ba95010dccd.png',
      alt: 'Evening Atmosphere',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/716d300097fe91ca076aabdac4882eff.png',
      alt: 'Placeholder 6',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/1a7e5ad0096af87c72d432012b9a68ae.png',
      alt: 'Placeholder 7',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/c72a36db607537c27051fe46986ed4ea.png',
      alt: 'Placeholder 8',
    },
    {
      url: 'https://static.readdy.ai/image/950ece443f523582842352d95e566920/6d10a6ea9911aad0fdf73f54f061732c.png',
      alt: 'Placeholder 9',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-b from-[#3E2723]/95 to-[#3E2723]/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent backdrop-blur-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
          {/* Logo (appears after scroll) */}
          <div className="flex items-center">
            <img
              src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/302fb6d132b3fb98ed6e256e13ecd84e.png"
              alt="Lotus Lounge &amp; Spa"
              className={`
                h-9 sm:h-10 w-auto　transform
    sm:scale-[1.2]
    origin-left
                transition-all duration-500 ease-out
                ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
              `}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {['TOP', 'CONCEPT', 'MENU', 'GALLERY', 'LOCATIONS'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#F5F1E8] text-sm tracking-widest font-light hover:text-[#D4AF37] transition-colors duration-300 relative group whitespace-nowrap cursor-pointer"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`
              md:hidden text-[#F5F1E8] hover:text-[#D4AF37]
              transition-all duration-500 ease-out
              ${scrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
            `}
          >
            <i className={mobileOpen ? 'ri-close-line text-2xl' : 'ri-menu-line text-2xl'}></i>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 sm:px-8 pb-4 pt-2 bg-[#3E2723]/95 backdrop-blur-md border-t border-white/10">
            <div className="flex flex-col gap-3">
              {['TOP', 'CONCEPT', 'MENU', 'GALLERY', 'LOCATIONS'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-[#F5F1E8] text-sm tracking-widest font-light hover:text-[#D4AF37] transition-colors duration-300 py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

     {/* Hero Section */}
<section
  id="top"
  className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
>
  {/* Background Image */}
  <img
    src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/b6520b651a3b2876af44898db0cb56bd.png"
    alt="Ocean view from spa"
    className="
  absolute inset-0
  w-full h-full
  object-cover
  object-[50%_22%]
  sm:object-[50%_40%]
  transform scale-110 sm:scale-100
  origin-center
"

  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20"></div>

  {/* Hero Content */}
  <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center h-full pt-[80px]">

    {/* Brand Package（薄プレート完全削除） */}
    <div
      className="
        flex flex-col items-center
        mb-6 sm:mb-8
        transform -translate-y-[58px] sm:translate-y-0
      "
    >
      {/* Logo Mark */}
      <img
        src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/8400fe8e1f29c1b11a99952188d6a36a.png"
        alt="Lotus Lounge & Spa"
        className="h-[58px] sm:h-[84px] lg:h-[92px] w-auto mb-3 opacity-95"
      />

      {/* Brand Name */}
     <div
  className="font-serif font-medium tracking-[0.25em] mb-1 text-[12px] sm:text-[16px]"
  style={{
    color: "#c7a04b",
    opacity: 1,
    textShadow: "0 1px 16px rgba(0,0,0,0.38)",
  }}
>
  LOTUS LOUNGE & SPA
</div>


      {/* Tagline */}
    <div
  className="font-serif font-normal tracking-[0.3em] text-[10px] sm:text-[13px]"
  style={{
    color: "#c7a04b",
    opacity: 1,
    textShadow: "0 1px 16px rgba(0,0,0,0.34)",
  }}
>
  Beauty Thru Asia
</div>
  
    </div>

    {/* Main Headline（モバイルのみ上へ） */}
    <div className="transform -translate-y-[58px] sm:translate-y-0">
      <h1 className="mb-4 text-center">
        <div className="text-[#F5F1E8] font-serif font-light text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 tracking-wide leading-tight">
          A Sky Sanctuary
        </div>
     <div
  className="
    font-serif font-light tracking-wide
    text-white
    text-[115%] sm:text-[100%]
  "
  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
>
  Granbell Hotel, Level{" "}
  <span
    className="inline-block scale-[0.9] origin-left"
    style={{
      fontFamily: '"Noto Serif JP", "Source Han Serif JP", serif',
    }}
  >
    10
  </span>
</div>

<div
  className="
    mt-1
    font-serif font-light tracking-wide
    text-white
    text-[115%] sm:text-[100%]
  "
  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
>
  Le Grand Galle, Level{" "}
  <span
    className="inline-block scale-[0.9] origin-left"
    style={{
      fontFamily: '"Noto Serif JP", "Source Han Serif JP", serif',
    }}
  >
    2
  </span>
</div>

    </div>

    {/* CTA */}
    <button
      onClick={() => scrollToSection("menu")}
  className="
  mt-6 sm:mt-10
  bg-[#C4A57B]/25
  text-white
  px-5 sm:px-10 py-2 sm:py-3
  rounded-full
  text-xs sm:text-base
  font-medium tracking-wide
  hover:bg-[#C4A57B]/60
  transition-all duration-300
  inline-flex items-center gap-3
  shadow-sm
  whitespace-nowrap
  cursor-pointer
"
   

 
    >
      View Treatments
    </button>

  </div>
</section>


 {/* Concept Section */}
<section id="concept" className="py-16 sm:py-24 lg:py-32 bg-[#F5F1E8]">
  <div className="max-w-7xl mx-auto px-4 sm:px-8">
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
      <div className="w-full lg:w-2/5">

        {/* OUR PHILOSOPHY：モバイル中央・枠なし */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <span className="text-[#3E2723] text-xs tracking-widest font-light">
            OUR PHILOSOPHY
          </span>
        </div>

        {/* Headline：モバイル中央 */}
        <h2 className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="text-[#3E2723] font-bold text-3xl sm:text-4xl lg:text-5xl mb-2">
            A Sanctuary
          </div>
          <div className="text-[#8B7355] font-light text-3xl sm:text-4xl lg:text-5xl">
            Within the City
          </div>
        </h2>

        {/* Body：モバイル中央 */}
        <div className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed space-y-4 lg:pr-8 text-center sm:text-left">
          <p>
            Located within Granbell Hotel, Lotus Lounge &amp; Spa offers a calm sanctuary away from the
            city pace.
          </p>
          <p>
            Inspired by Japanese hospitality, the spa focuses on quiet attentiveness, refined
            treatments, and a deeply private atmosphere.
          </p>
          <p>
            Each experience is designed to restore balance and provide a moment of true tranquility
            in the heart of the urban landscape.
          </p>
        </div>
      </div>

      {/* 画像側（変更なし） */}
      <div className="w-full lg:w-3/5 relative mt-8 lg:mt-0">
        <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:h-[520px]">
          <div
            className="
              relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl
              lg:absolute lg:top-0 lg:left-0 lg:w-80
            "
          >
            <img
              src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/130d7dc66681dac82276419d56141ced.png"
              alt="Relaxation Lounge"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div
            className="
              relative mt-6 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl
              lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-80
            "
          >
            <img
              src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/385a66fe0b285bd5fc7caf8c85bdfdbc.png"
              alt="Ocean View"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

     

      {/* Menu Section */}
      <section id="menu" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#3E2723] to-[#D2691E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="bg-[#F5F1E8]/90 backdrop-blur-sm rounded-3xl p-6 sm:p-12 lg:p-16">
            <div className="flex justify-center mb-12 sm:mb-16">
              <div className="text-center">
                <div className="text-[#D4AF37] text-sm tracking-widest mb-4">TREATMENTS</div>
                <h2 className="text-[#3E2723] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                  Curated Experiences
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  name: 'FOOT MASSAGE',
                  description:
                    'A complete pampering treatment focusing on pressure points to relieve stress and restore comfort.',
                  duration: '45 minutes',
                  price: 'LKR 12,800',
                },
                {
                  name: 'HEAD, NECK & SHOULDER MASSAGE',
                  description:
                    'A calming massage from head to shoulders and hands to reduce tension and promote relaxation.',
                  duration: '45 minutes',
                  price: 'LKR 12,800',
                },
                {
                  name: 'AROMA THERAPY MASSAGE',
                  description:
                    "Pure aroma oils combined with soothing techniques to activate the body's self-healing response.",
                  duration: '60 minutes',
                  price: 'LKR 15,200',
                },
                {
                  name: 'AROMA THERAPY MASSAGE',
                  description:
                    "Pure aroma oils combined with soothing techniques to activate the body's self-healing response. Includes head massage.",
                  duration: '90 minutes',
                  price: 'LKR 19,600',
                },
                {
                  name: 'HOT OIL SCALP MASSAGE',
                  description:
                    'A therapeutic scalp treatment promoting relaxation, scalp health, and wellbeing.',
                  duration: '45 minutes',
                  price: 'LKR 15,300',
                },
                {
                  name: 'DEEP TISSUE MASSAGE',
                  description: 'Targets deep muscle layers to release knots and chronic tension.',
                  duration: '60 minutes',
                  price: 'LKR 15,700',
                },
                {
                  name: 'DEEP TISSUE MASSAGE',
                  description:
                    'Targets deep muscle layers to release knots and chronic tension. Includes head massage.',
                  duration: '90 minutes',
                  price: 'LKR 19,800',
                },
                {
                  name: 'DIAMOND MASSAGE',
                  description:
                    'A deeply relaxing full-body massage targeting pressure points from head to feet.',
                  duration: '90 minutes',
                  price: 'LKR 17,600',
                },
                {
                  name: 'PLATINUM FULL BODY MASSAGE',
                  description:
                    'Hot herbal compress focused on the lower back followed by a full 360-degree massage, ending with a calming head massage.',
                  duration: '90 minutes',
                  price: 'LKR 20,160',
                },
                {
                  name: 'DIAMOND FULL BODY MASSAGE',
                  description:
                    'Hot herbal compress and complete head-to-toe massage for deep relaxation.',
                  duration: '90 minutes',
                  price: 'LKR 24,200',
                },
              ].map((treatment, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 hover:bg-white/80 transition-all duration-300"
                >
                  <h3 className="text-[#3E2723] font-bold text-lg sm:text-xl mb-4 tracking-wide">
                    {treatment.name}
                  </h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6">
                    {treatment.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D2691E] text-sm sm:text-base font-medium">
                      {treatment.duration}
                    </span>
                    <span className="text-[#3E2723] text-base sm:text-lg font-bold">
                      {treatment.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[#4A4A4A] text-xs mt-8 sm:mt-12">
              All prices are subject to 10% service charge and applicable taxes.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[#3E2723] font-light text-3xl sm:text-4xl lg:text-5xl mb-4">
              Atmosphere
            </h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          </div>

          {/* Slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <div className="w-full h-80 sm:h-[460px] lg:h-[600px]">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 border border-[#3E2723] rounded-full flex items-center justify-center bg-white/90 hover:bg-[#D4AF37] transition-colors duration-300"
            >
              <i className="ri-arrow-left-line text-xl text-[#3E2723]"></i>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 border border-[#3E2723] rounded-full flex items-center justify-center bg-white/90 hover:bg-[#D4AF37] transition-colors duration-300"
            >
              <i className="ri-arrow-right-line text-xl text-[#3E2723]"></i>
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3 mt-8 sm:mt-12">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Locations Section */}
<section
  id="locations"
  className="py-16 sm:py-24 lg:py-32 bg-gradient-to-r from-[#F5F1E8] to-[#F0E5D8]"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-8">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-[#3E2723] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
        Our Locations
      </h2>
      <p className="text-[#8B7355] font-light italic text-lg sm:text-xl">
        Two Sanctuaries, One Philosophy
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
      {/* Colombo */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="w-full h-56 sm:h-72">
          <img
            src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/39dd14c388b84df9bedccff62aae33a2.png"
            alt="Granbell Hotel Colombo"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 sm:p-10">
          <h3 className="text-[#3E2723] font-bold text-xl sm:text-2xl tracking-wide mb-2">
            LOTUS LOUNGE &amp; SPA
          </h3>

          <p className="text-[#D2691E] text-base sm:text-lg mb-2">
            <a
              href="https://maps.app.goo.gl/RoxK3x14M6X3g2R18"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Granbell Hotel
            </a>
          </p>

          <p className="text-[#4A4A4A] font-light text-sm mb-4 sm:mb-6">
            Colombo, Sri Lanka
          </p>

          <p className="text-[#4A4A4A] text-sm leading-relaxed">
            A hotel-integrated urban spa overlooking the Indian Ocean. Located on the 10th floor, this
            sanctuary offers breathtaking sunset views and a peaceful escape from the vibrant city below.
          </p>
        </div>
      </div>

      {/* Galle */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="w-full h-56 sm:h-72">
          <img
            src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/756dbd30e1ad3c0a954eadd9a827b5c4.png"
            alt="Le Grand Hotel Galle"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-6 sm:p-10">
          <h3 className="text-[#3E2723] font-bold text-xl sm:text-2xl tracking-wide mb-2">
            LOTUS LOUNGE &amp; SPA
          </h3>

          <p className="text-[#D2691E] text-base sm:text-lg mb-2">
            <a
              href="https://maps.app.goo.gl/zUgjYcVbpPV1c66t9"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Le Grand Hotel
            </a>
          </p>

          <p className="text-[#4A4A4A] font-light text-sm mb-4 sm:mb-6">
            Galle, Sri Lanka
          </p>

          <p className="text-[#4A4A4A] text-sm leading-relaxed">
            Located within Le Grand Hotel in a calm resort-style setting. Surrounding tropical beauty,
            this location provides a serene retreat with the same refined philosophy.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#3E2723] to-[#2C1810]">
        <div className="px-8 sm:px-16 lg:px-24 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
              {/* Block A - Brand Info */}
              <div className="lg:w-1/3">
                {/* Logo */}
                <img
                  src="https://static.readdy.ai/image/950ece443f523582842352d95e566920/302fb6d132b3fb98ed6e256e13ecd84e.png"
                  alt="Lotus Lounge &amp; Spa"
                  className="h-10 sm:h-12 w-auto mb-6 opacity-90"
                />
                <h3 className="text-[#D4AF37] font-serif text-2xl sm:text-3xl mb-4 tracking-wider">
                  LOTUS LOUNGE &amp; SPA
                </h3>
                <p className="text-[#F5F1E8] text-sm leading-relaxed mb-4">Beauty Thru Asia</p>
                <p className="text-[#F5F1E8]/80 text-sm leading-relaxed mb-6">
                  A quiet luxury day spa within Granbell Hotel Colombo.
                </p>
                <div className="text-[#F5F1E8] text-sm mb-6">
                  <p className="font-medium mb-1">Hours</p>
                  <p className="text-[#F5F1E8]/80">09:00 – 21:00</p>
                  <p className="text-xs text-[#F5F1E8]/60">(Last entry 20:00)</p>
                </div>
              </div>

              {/* Block B - Navigation + Policies */}
              <div className="lg:w-1/3">
                <h4 className="text-[#D4AF37] text-xs tracking-widest mb-6">NAVIGATION</h4>
                <div className="space-y-3 mb-8">
                  {['Top', 'Concept', 'Menu', 'Gallery', 'Locations'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block text-[#F5F1E8] text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <h4 className="text-[#D4AF37] text-xs tracking-widest mb-4">POLICIES</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPolicyOpen('cancellation')}
                    className="block text-[#F5F1E8] text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Cancellation Policy
                  </button>
                  <button
                    onClick={() => setPolicyOpen('etiquette')}
                    className="block text-[#F5F1E8] text-sm hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                  >
                    Spa Etiquette
                  </button>
                </div>
              </div>

              {/* Block C - Social Icons */}
              <div className="lg:w-1/3 lg:flex lg:justify-end">
                <div>
                  <h4 className="text-[#D4AF37] text-xs tracking-widest mb-6">CONNECT</h4>
                  <div className="flex items-center gap-4">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/lotusloungeandspa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lotus Lounge &amp; Spa Instagram"
                      className="
                        w-10 h-10
                        border border-[#D4AF37]/70
                        rounded-full
                        flex items-center justify-center
                        transition-all duration-300
                        hover:bg-[#D4AF37]
                      "
                    >
                      <i className="ri-instagram-line text-[#D4AF37] text-lg hover:text-[#3E2723]"></i>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/lotusloungeandspa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lotus Lounge &amp; Spa Facebook"
                      className="
                        w-10 h-10
                        border border-[#D4AF37]/70
                        rounded-full
                        flex items-center justify-center
                        transition-all duration-300
                        hover:bg-[#D4AF37]
                      "
                    >
                      <i className="ri-facebook-line text-[#D4AF37] text-lg hover:text-[#3E2723]"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20">
          <div className="px-8 sm:px-16 lg:px-24 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto">
              <p className="text-[#F5F1E8]/60 text-xs leading-relaxed mb-4 text-center">
                This website is presented as a digital catalogue of Lotus Lounge &amp; Spa.<br />
                For inquiries, please contact our hotel.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <p className="text-[#F5F1E8]/60 text-xs text-center">
                  © 2026 Lotus Lounge &amp; Spa. All rights reserved.
                </p>
                <p className="text-[#8B7355]/70 text-[11px] tracking-[0.2em] uppercase">
                  By Lotus Lounge &amp; Spa
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal (hidden until clicked) */}
      {policyOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4 sm:px-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setPolicyOpen(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal Panel */}
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl bg-[#F5F1E8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#F5F1E8] border-b border-black/10 px-6 sm:px-8 py-4 flex items-center justify-between">
              <h3 className="text-[#3E2723] font-serif text-lg sm:text-xl tracking-wide">
                {policyOpen === 'cancellation' ? 'Cancellation Policy' : 'Spa Etiquette'}
              </h3>
              <button
                onClick={() => setPolicyOpen(null)}
                className="text-[#3E2723]/70 hover:text-[#3E2723] transition-colors"
                aria-label="Close"
                type="button"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-6 text-[#4A4A4A] text-sm leading-relaxed space-y-6">
              {policyOpen === 'cancellation' ? (
                <>
                  <p>
                    We understand that plans may change. To ensure we can accommodate all our guests,
                    we kindly request advance notice for cancellations.
                  </p>
                  <p>
                    <strong className="text-[#3E2723]">Cancellation Notice:</strong> Please provide at
                    least 24 hours notice if you need to cancel or reschedule your appointment.
                  </p>
                  <p>
                    <strong className="text-[#3E2723]">Late Cancellations:</strong> Cancellations made
                    with less than 24 hours notice or no-shows may incur a 50% charge of the scheduled
                    treatment price.
                  </p>
                  <p>We appreciate your understanding and cooperation in helping us serve all our guests effectively.</p>
                  <p>
                    For cancellations or rescheduling, please contact us directly at the spa or through the
                    hotel reception.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    To ensure a peaceful and restorative experience for all guests, we kindly ask you to
                    observe the following spa etiquette guidelines.
                  </p>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">Arrival Time</p>
                    <p>
                      Please arrive at least 15 minutes before your scheduled appointment. This allows time
                      to complete any necessary forms and begin your treatment on time.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">Mobile Phones</p>
                    <p>
                      To maintain a tranquil atmosphere, please ensure your mobile phone is silenced or
                      switched off during your visit.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">Health Conditions</p>
                    <p>
                      Please inform our therapists of any health conditions, allergies, injuries, or areas of
                      sensitivity before the treatment begins. This helps us provide the safest and most
                      effective care.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">Valuables</p>
                    <p>
                      We recommend leaving valuables in your hotel room. The spa is not responsible for
                      lost or stolen items.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-[#3E2723] mb-2">Gratuities</p>
                    <p>
                      Gratuities are appreciated but not mandatory. If you wish to show appreciation for
                      exceptional service, you may do so at your discretion.
                    </p>
                  </div>

                  <p>
                    Thank you for helping us maintain a serene and respectful environment for all our
                    guests.
                  </p>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-black/10 flex justify-end bg-[#F5F1E8]">
              <button
                onClick={() => setPolicyOpen(null)}
                className="bg-[#3E2723] text-[#F5F1E8] px-5 py-2 rounded-full text-xs tracking-widest hover:opacity-90 transition"
                type="button"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
