import { useMemo, useState } from "react";
import { ArrowRight, Menu, X, Leaf, Waves, Hexagon, TreePine, Gem, Flower2, Instagram, Facebook, MessageCircle, Smartphone, ChevronDown, CheckCircle2 } from "lucide-react";

const patterns = [
  { name: "Ocean Waves", detail: "Flowing coastal lines", icon: Waves },
  { name: "Honeycomb", detail: "Modern geometric cells", icon: Hexagon },
  { name: "Forest Nature", detail: "Leaves and organic forms", icon: TreePine },
  { name: "Wood Grain", detail: "Natural timber character", icon: Leaf },
  { name: "Minimal Luxury", detail: "Quiet, refined simplicity", icon: Gem },
  { name: "Floral", detail: "Soft botanical details", icon: Flower2 },
];
const products = ["NFC Business Card", "NFC Keychain", "Personalized Wooden Gift"];
const finishes = ["Natural Oak", "Dark Walnut", "Golden Brown", "Matte Black", "Light Oak", "Custom"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [product, setProduct] = useState(products[0]);
  const [pattern, setPattern] = useState(patterns[3].name);
  const [finish, setFinish] = useState(finishes[1]);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [contact, setContact] = useState("");
  const [destination, setDestination] = useState("Business website");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [sent, setSent] = useState(false);

  const waMessage = useMemo(() => [
    "Hello WOODIFY! I would like to request a custom product.",
    `Product: ${product}`, `Pattern: ${pattern}`, `Finish: ${finish}`,
    `Name: ${name}`, `Business: ${business}`, `Contact: ${contact}`,
    `NFC destination: ${destination}`, `Link/details: ${url}`,
    `Notes: ${notes}`, `Logo selected: ${logo?.name || "No file selected"}`
  ].join("\n"), [product, pattern, finish, name, business, contact, destination, url, notes, logo]);

  function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    // Add the official WOODIFY WhatsApp number before launch.
    const whatsappNumber = "REPLACE_WITH_WOODIFY_NUMBER";
    if (/^\d{8,15}$/.test(whatsappNumber)) {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`, "_blank");
    }
  }

  return (
    <div>
      <div className="topline">PERSONALIZED WOODEN NFC · MADE WITH MEANING</div>
      <header className="header">
        <a className="brand" href="#"><span className="brand-mark">W</span><span>WOODIFY<small>CRAFT · CONNECT · PERSONALIZE</small></span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#patterns" onClick={() => setMenuOpen(false)}>Personalize</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
          <a className="nav-cta" href="#customize" onClick={() => setMenuOpen(false)}>Create yours <ArrowRight size={15}/></a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span/> A MORE NATURAL WAY TO CONNECT</div>
            <h1>Make your first<br/><em>impression</em> lasting.</h1>
            <p>Thoughtfully crafted wooden NFC cards and keepsakes, personalized to tell your story — one tap at a time.</p>
            <div className="hero-actions"><a className="button primary" href="#customize">Design your piece <ArrowRight size={17}/></a><a className="text-link" href="#collection">Explore collection <span>↗</span></a></div>
            <div className="hero-note"><span className="note-icon"><Leaf size={17}/></span><span>Natural character. Smart connection.<br/><b>Made personal, just for you.</b></span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-glow"/>
            <div className="card-photo">
              <div className="wood-card">
                <div className="card-corner">W.</div><div className="card-center"><div className="mini-mark">W</div><b>YOUR NAME</b><small>YOUR BUSINESS</small></div><div className="nfc-mark"><Smartphone size={20}/><span>NFC</span></div>
              </div>
              <div className="floating-label"><span className="pulse"/> NFC ENABLED <b>Tap to connect</b></div>
            </div>
            <div className="visual-caption">01 / THE SIGNATURE CARD</div>
          </div>
        </section>

        <section className="trust-strip"><span>DESIGNED AROUND YOU</span><i/> <span>PERSONALIZED DETAILS</span><i/> <span>SMART NFC TECHNOLOGY</span><i/> <span>TIMELESS MATERIAL</span></section>

        <section className="section collection" id="collection">
          <div className="section-heading"><div><div className="eyebrow">THE WOODIFY COLLECTION</div><h2>Objects with a<br/><em>personal touch.</em></h2></div><p>From the way you introduce yourself to the gifts you give, make every detail feel considered.</p></div>
          <div className="product-grid">
            <article className="product-card card-one"><div className="product-image"><div className="mock-card"><b>W.</b><span>YOUR NAME</span><small>CONNECT WITH A TAP</small></div><span className="product-number">01</span></div><div className="product-meta"><div><h3>Wooden NFC Cards</h3><p>A memorable introduction, reimagined.</p></div><a href="#customize" aria-label="Customize NFC card">↗</a></div></article>
            <article className="product-card card-two"><div className="product-image"><div className="mock-key"><span>W</span><i/></div><span className="product-number">02</span></div><div className="product-meta"><div><h3>NFC Keychains</h3><p>Your essentials, with a clever connection.</p></div><a href="#customize" aria-label="Customize keychain">↗</a></div></article>
            <article className="product-card card-three"><div className="product-image"><div className="mock-gift"><span>W</span><small>MADE FOR YOU</small></div><span className="product-number">03</span></div><div className="product-meta"><div><h3>Personalized Gifts</h3><p>Small details. Meaningful moments.</p></div><a href="#customize" aria-label="Customize gift">↗</a></div></article>
          </div>
        </section>

        <section className="pattern-section" id="patterns">
          <div className="pattern-intro"><div className="eyebrow">YOUR STYLE, YOUR STORY</div><h2>Made to feel<br/><em>uniquely yours.</em></h2><p>Choose a pattern and finish that reflect your personality. Every piece begins with your idea.</p><a href="#customize" className="text-link light">Explore customization <span>↗</span></a></div>
          <div className="pattern-grid">{patterns.map((p, i) => { const Icon = p.icon; return <button className="pattern-tile" key={p.name} onClick={() => {setPattern(p.name); document.getElementById("customize")?.scrollIntoView({behavior:"smooth"});}}><span className="pattern-symbol"><Icon size={25}/></span><span className="pattern-index">0{i+1}</span><b>{p.name}</b><small>{p.detail}</small></button>; })}</div>
        </section>

        <section className="custom-section section" id="customize">
          <div className="section-heading"><div><div className="eyebrow">LET'S MAKE IT YOURS</div><h2>Start with an idea.<br/><em>We'll shape the details.</em></h2></div><p>Tell us what you have in mind. We'll review your request and confirm the design details with you.</p></div>
          <div className="custom-layout">
            <form className="custom-form" onSubmit={submitRequest}>
              <div className="form-step"><span>01</span><div><h3>Choose your piece</h3><p>What would you like personalized?</p></div></div>
              <label>PRODUCT<select value={product} onChange={e=>setProduct(e.target.value)}>{products.map(p=><option key={p}>{p}</option>)}</select></label>
              <div className="form-step"><span>02</span><div><h3>Choose your style</h3><p>Pick a pattern and wood finish.</p></div></div>
              <label>PATTERN<select value={pattern} onChange={e=>setPattern(e.target.value)}>{patterns.map(p=><option key={p.name}>{p.name}</option>)}</select></label>
              <label>COLOUR / FINISH<select value={finish} onChange={e=>setFinish(e.target.value)}>{finishes.map(f=><option key={f}>{f}</option>)}</select></label>
              <div className="form-step"><span>03</span><div><h3>Your details</h3><p>Share the information to personalize your piece.</p></div></div>
              <div className="two-fields"><label>YOUR NAME<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></label><label>BUSINESS NAME<input value={business} onChange={e=>setBusiness(e.target.value)} placeholder="Business or brand"/></label></div>
              <label>CONTACT NUMBER<input required value={contact} onChange={e=>setContact(e.target.value)} placeholder="+94 ..."/></label>
              <label>WHERE SHOULD NFC CONNECT?<select value={destination} onChange={e=>setDestination(e.target.value)}><option>Business website</option><option>Personal profile</option><option>Phone number</option><option>Social media</option><option>Multiple social links</option><option>Custom URL</option></select></label>
              <label>WEBSITE / SOCIAL LINK / DETAILS<input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..."/></label>
              <label>UPLOAD YOUR LOGO<input type="file" accept="image/png,image/jpeg,image/svg+xml,application/pdf" onChange={e=>setLogo(e.target.files?.[0] || null)}/><small className="field-hint">Please provide your own logo. Preferred: SVG or transparent PNG. This starter form does not upload the file to a server yet.</small></label>
              <label>ANY OTHER DETAILS?<textarea rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Tell us about your idea..."/></label>
              <button className="button primary submit" type="submit">Prepare order enquiry <ArrowRight size={17}/></button>
              {sent && <p className="success-note"><CheckCircle2 size={16}/> Your enquiry details are prepared. WhatsApp ordering will activate after the official number is configured. Please send your logo separately when contacting WOODIFY.</p>}
            </form>
            <aside className="preview-panel"><div className="preview-top"><span>YOUR DESIGN DIRECTION</span><span className="live-dot">● PREVIEW</span></div><div className="preview-card"><div className="preview-emblem">W</div><div className="preview-name">{business || name || "YOUR NAME"}</div><div className="preview-sub">{pattern.toUpperCase()}</div><div className="preview-nfc"><Smartphone size={19}/></div></div><div className="preview-details"><div><small>PRODUCT</small><b>{product}</b></div><div><small>PATTERN</small><b>{pattern}</b></div><div><small>FINISH</small><b>{finish}</b></div></div><p className="preview-disclaimer">Illustrative preview only. Final engraving and wood grain may vary naturally.</p></aside>
          </div>
        </section>

        <section className="story-section" id="story"><div className="story-mark">W</div><div><div className="eyebrow">THE IDEA BEHIND WOODIFY</div><h2>Natural materials.<br/><em>Meaningful connections.</em></h2><p>We bring together the warmth of wood and the convenience of NFC to create personal pieces that are made to be used, remembered and shared.</p></div><div className="story-signature">WOODIFY <span>CRAFT · CONNECT · PERSONALIZE</span></div></section>
      </main>

      <footer><a className="brand footer-brand" href="#"><span className="brand-mark">W</span><span>WOODIFY<small>CRAFT · CONNECT · PERSONALIZE</small></span></a><p>Made with intention. Connected with a tap.</p><div className="socials"><a href="#customize" aria-label="Contact"><MessageCircle/></a><a href="#collection" aria-label="Instagram"><Instagram/></a><a href="#collection" aria-label="Facebook"><Facebook/></a></div><small className="copyright">© {new Date().getFullYear()} WOODIFY. All rights reserved.</small></footer>
    </div>
  );
}
