import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Truck } from 'lucide-react';
import { brandContact } from './brand';
export const packages = [
  { name: 'Basic', quantity: 1, usd: 28, lkr: 3000, offer: 2550 },
  { name: 'Standard', quantity: 2, usd: 50, lkr: 5000, offer: 4250 },
  { name: 'Premium', quantity: 5, usd: 110, lkr: 9500, offer: 8075 },
];
const countryCodes = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
export function Pricing() {
 const [country, setCountry] = useState('');
 const [detecting, setDetecting] = useState(true);
 const manual = useRef(false);
 const countries = countryCodes.map(code => ({ code, name: displayNames.of(code) || code })).sort((a,b) => a.name.localeCompare(b.name));
 useEffect(() => {
  try { const saved = localStorage.getItem('woodify-country'); if (saved && countryCodes.includes(saved)) { manual.current = true; setCountry(saved); setDetecting(false); return; } } catch {}
  fetch('/api/country', { signal: AbortSignal.timeout(7000) }).then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => { if (!manual.current && countryCodes.includes(data.country)) setCountry(data.country); }).catch(() => {}).finally(() => setDetecting(false));
 }, []);
 const local = country === 'LK';
 return <section className="section pricing" id="pricing"><div className="section-heading"><div><div className="eyebrow">THE SIGNATURE NFC COLLECTION</div><h2>A considered card.<br/><em>A lasting connection.</em></h2></div><label className="country-selector">YOUR COUNTRY<select value={country} onChange={e => { manual.current = true; setCountry(e.target.value); try { localStorage.setItem('woodify-country', e.target.value); } catch {} }}><option value="" disabled>{detecting ? 'Detecting your country…' : 'Select your country'}</option>{countries.map(c => <option value={c.code} key={c.code}>{c.name}</option>)}</select><small>{detecting ? 'Checking your region using IP geolocation.' : country ? 'Prices follow your selected country.' : 'Detection unavailable. Select your country to see prices.'}</small></label></div>
 <div className="delivery-offer"><Truck size={28}/><div><strong>FREE DELIVERY ON YOUR FIRST ORDER!</strong><p>Shipping is normally charged separately. Your first order qualifies for free delivery, in Sri Lanka and worldwide.</p></div></div>
 {local && <div className="local-offer"><strong>GET 15% OFF YOUR FIRST ORDER!</strong><p>For customers in Sri Lanka. First-order NFC package prices below include your 15% discount and free delivery.</p></div>}
 <div className="pricing-grid" aria-live="polite">{packages.map(p => <article className="price-card" key={p.name}><div className="eyebrow">{p.name.toUpperCase()} PACKAGE</div><h3>{p.quantity} personalized wooden<br/>NFC business card{p.quantity > 1 ? 's' : ''}</h3><div className="price">{!country ? <span className="price-prompt">Select country for pricing</span> : local ? <><del aria-label={`Regular price LKR ${p.lkr.toLocaleString('en-US')}`}>LKR {p.lkr.toLocaleString('en-US')}</del><strong>LKR {p.offer.toLocaleString('en-US')}</strong><small>First order · Regular LKR {p.lkr.toLocaleString('en-US')}</small></> : <><strong>${p.usd}</strong><small>USD · Package price</small></>}</div><p>Personalized engraving. Natural wood grain. A connection in a tap.</p><a className="button dark" href={`https://wa.me/${brandContact.whatsapp}?text=${encodeURIComponent(`Hello WOODIFY, I would like the ${p.name} package (${p.quantity} wooden NFC card${p.quantity > 1 ? 's' : ''}). ${country ? `My country is ${displayNames.of(country)}. ${local ? `Regular LKR ${p.lkr}; first-order offer LKR ${p.offer}.` : `Package price USD ${p.usd}.`}` : 'Please help me confirm country pricing.'} Please confirm personalization and first-order eligibility.`)}`} target="_blank" rel="noreferrer">Order via WhatsApp <ArrowUpRight size={16}/></a></article>)}</div><p className="collection-note">First-order offers apply to your first order with WOODIFY. Returning orders use regular prices with shipping charged separately. We confirm eligibility, artwork and delivery before production. No online payment is taken.</p></section>;
}
