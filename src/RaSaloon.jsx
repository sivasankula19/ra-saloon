import { useState, useEffect, useRef } from "react";
import { services, reviews, gallery } from "./constants";
import "./rasaloon.css";

function useIntersect(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function AnimSection({ children, className = "", delay = 0 }) {
    const [ref, visible] = useIntersect();
    return (
        <div ref={ref} className={className} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
        }}>
            {children}
        </div>
    );
}

export default function RASaloon() {
    const [activeService, setActiveService] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeNav, setActiveNav] = useState("home");

    const navLinks = ["home", "services", "pricing", "gallery", "reviews", "contact"];

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60);
            const offsets = navLinks.map(id => {
                const el = document.getElementById(id);
                return el ? { id, top: el.getBoundingClientRect().top } : null;
            }).filter(Boolean);
            const current = offsets.filter(o => o.top <= 120).pop();
            if (current) setActiveNav(current.id);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };


    return (
        <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a0a", color: "#f0e8d8", minHeight: "100vh", overflowX: "hidden" }}>
            {/* NAV */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
                transition: "all 0.4s ease",
                padding: "14px 5%",
                display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", fontWeight: "bold", color: "#0a0a0a",
                        animation: "pulse-ring 2.5s infinite"
                    }}>RA</div>
                    <span style={{ fontSize: "1.1rem", fontWeight: "bold", letterSpacing: "1px" }} className="gold-text">RA Unisex Saloon</span>
                </div>

                {/* Desktop nav */}
                <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
                    {navLinks.map(l => (
                        <button key={l} onClick={() => { scrollTo(l); setActiveNav(l); }} style={{
                            background: "none", border: "none", cursor: "pointer",
                            fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase",
                            fontFamily: "Georgia, serif", transition: "all 0.25s",
                            padding: "6px 2px", position: "relative",
                            color: activeNav === l ? "#c9a84c" : "rgba(240,232,216,0.7)",
                            fontWeight: activeNav === l ? "bold" : "normal",
                        }}>
                            {l}
                            <span style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                height: "2px", borderRadius: "1px",
                                background: "linear-gradient(90deg, #9a7030, #c9a84c)",
                                transform: activeNav === l ? "scaleX(1)" : "scaleX(0)",
                                transition: "transform 0.3s ease",
                                transformOrigin: "center",
                                display: "block"
                            }} />
                        </button>
                    ))}
                    <button className="btn-gold" onClick={() => scrollTo("contact")} style={{ padding: "8px 20px", borderRadius: "4px", fontSize: "0.8rem" }}>
                        Book Now
                    </button>
                </div>

                {/* Hamburger — hidden when menu is open */}
                {!menuOpen && (
                    <button onClick={() => setMenuOpen(true)} style={{
                        background: "none", border: "none", color: "#c9a84c", cursor: "pointer",
                        fontSize: "1.6rem", display: "none", padding: "4px"
                    }} className="hamburger" id="hamburger">☰</button>
                )}
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000,
                    background: "rgba(10,10,10,0.98)", display: "flex", flexDirection: "column",
                    animation: "fade-in-up 0.3s ease", overflowY: "auto"
                }}>
                    {/* Sticky header row: logo left, close right */}
                    <div style={{
                        position: "sticky", top: 0, zIndex: 1001,
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "rgba(10,10,10,0.98)",
                        borderBottom: "1px solid rgba(201,168,76,0.15)"
                    }}>
                        {/* Logo */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%",
                                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "14px", fontWeight: "bold", color: "#0a0a0a"
                            }}>RA</div>
                            <span style={{ fontSize: "1rem", fontWeight: "bold", letterSpacing: "1px" }} className="gold-text">RA Unisex Saloon</span>
                        </div>
                        {/* Close button */}
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{
                                background: "rgba(20,20,20,0.95)", border: "1.5px solid rgba(201,168,76,0.5)",
                                borderRadius: "50%", width: "44px", height: "44px",
                                color: "#c9a84c", fontSize: "1.3rem", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                WebkitTapHighlightColor: "transparent", touchAction: "manipulation"
                            }}
                        >✕</button>
                    </div>

                    {/* Nav items */}
                    <div style={{
                        display: "flex", flexDirection: "column", alignItems: "center",
                        gap: "28px", padding: "30px 20px 60px", width: "100%", flex: 1,
                        justifyContent: "center"
                    }}>
                        {navLinks.map(l => (
                            <button key={l} onClick={() => { scrollTo(l); setActiveNav(l); }} style={{
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: "1.4rem", letterSpacing: "3px", textTransform: "uppercase",
                                fontFamily: "Georgia, serif", padding: "8px 0",
                                color: activeNav === l ? "#c9a84c" : "#f0e8d8",
                                fontWeight: activeNav === l ? "bold" : "normal",
                                borderBottom: activeNav === l ? "2px solid #c9a84c" : "2px solid transparent",
                                transition: "all 0.2s", WebkitTapHighlightColor: "transparent"
                            }}>{l}</button>
                        ))}
                    </div>
                </div>
            )}

            <style>{`@media (max-width: 768px) { .desktop-nav { display: none !important; } #hamburger { display: block !important; } }`}</style>

            {/* HERO */}
            <section id="home" style={{
                minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                background: "radial-gradient(ellipse at 60% 40%, #1a1200 0%, #0a0a0a 60%)"
            }}>
                {/* Decorative rings */}
                {[280, 420, 560].map((size, i) => (
                    <div key={i} style={{
                        position: "absolute", width: size, height: size,
                        borderRadius: "50%", border: `1px solid rgba(201,168,76,${0.06 - i * 0.015})`,
                        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                        animation: `spin-slow ${20 + i * 10}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`
                    }} />
                ))}

                {/* Scissor decoration */}
                <div style={{
                    position: "absolute", top: "15%", right: "8%", fontSize: "5rem", opacity: 0.06,
                    animation: "float 6s ease-in-out infinite"
                }}>✂️</div>
                <div style={{
                    position: "absolute", bottom: "20%", left: "6%", fontSize: "4rem", opacity: 0.06,
                    animation: "float 8s ease-in-out infinite 2s"
                }}>💈</div>

                <div style={{ textAlign: "center", zIndex: 1, padding: "0 20px", animation: "fade-in-up 1s ease 0.3s both" }}>
                    <div style={{
                        display: "inline-block", padding: "6px 20px", marginBottom: "20px",
                        border: "1px solid rgba(201,168,76,0.4)", borderRadius: "20px",
                        fontSize: "0.75rem", letterSpacing: "3px", color: "#c9a84c", textTransform: "uppercase"
                    }}>✦ Gachibowli, Hyderabad ✦</div>

                    <h1 className="hero-title" style={{ fontSize: "4.5rem", lineHeight: 1.1, marginBottom: "16px", fontWeight: "normal" }}>
                        <span className="gold-text">RA</span><br />
                        <span style={{ color: "#f0e8d8", letterSpacing: "6px", fontSize: "0.55em", textTransform: "uppercase" }}>Unisex Saloon</span>
                    </h1>

                    <p style={{ fontSize: "1rem", color: "rgba(240,232,216,0.6)", letterSpacing: "2px", marginBottom: "40px", textTransform: "uppercase" }}>
                        Where Style Meets Perfection
                    </p>

                    <div className="hero-buttons" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-gold" onClick={() => scrollTo("services")} style={{ padding: "14px 36px", borderRadius: "4px", fontSize: "0.85rem" }}>
                            Explore Services
                        </button>
                        <button className="btn-outline" onClick={() => scrollTo("contact")} style={{ padding: "14px 36px", borderRadius: "4px", fontSize: "0.85rem" }}>
                            Book Appointment
                        </button>
                    </div>

                    <div style={{ display: "flex", gap: "40px", justifyContent: "center", marginTop: "60px", flexWrap: "wrap" }}>
                        {[["500+", "Happy Clients"], ["50+", "Services"], ["5★", "Google Rating"], ["5+", "Years Exp."]].map(([n, l]) => (
                            <div key={l} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: "1.6rem", fontWeight: "bold" }} className="gold-text">{n}</div>
                                <div style={{ fontSize: "0.7rem", letterSpacing: "2px", color: "rgba(240,232,216,0.5)", textTransform: "uppercase" }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll cue */}
                <div style={{
                    position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                    animation: "float 2s ease-in-out infinite"
                }}>
                    <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, #c9a84c)" }} />
                    <div style={{ fontSize: "0.6rem", letterSpacing: "3px", color: "#c9a84c", textTransform: "uppercase" }}>Scroll</div>
                </div>
            </section>

            {/* ABOUT STRIP */}
            <AnimSection>
                <div style={{
                    background: "linear-gradient(135deg, #1a1200, #0f0f0f)",
                    borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)",
                    padding: "40px 5%", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center"
                }}>
                    {[
                        { icon: "💈", title: "Unisex Salon", desc: "Services for Men, Women & Kids" },
                        { icon: "🌿", title: "Premium Products", desc: "Top branded, skin-safe products" },
                        { icon: "🕐", title: "Open Daily", desc: "9 AM – 9 PM, 7 days a week" },
                        { icon: "📍", title: "Gachibowli", desc: "Easily accessible location" },
                    ].map(({ icon, title, desc }) => (
                        <div key={title} style={{
                            display: "flex", alignItems: "center", gap: "14px",
                            padding: "16px 24px", flex: "1 1 220px", maxWidth: "280px"
                        }}>
                            <span style={{ fontSize: "2rem" }}>{icon}</span>
                            <div>
                                <div style={{ fontSize: "0.9rem", fontWeight: "bold", color: "#c9a84c", marginBottom: "3px" }}>{title}</div>
                                <div style={{ fontSize: "0.8rem", color: "rgba(240,232,216,0.6)" }}>{desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimSection>

            {/* SERVICES */}
            <section id="services" style={{ padding: "100px 5%", background: "#0a0a0a" }}>
                <AnimSection>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "12px" }}>✦ What We Offer ✦</div>
                        <h2 className="section-title gold-text" style={{ fontSize: "2.8rem", fontWeight: "normal" }}>Our Services</h2>
                    </div>
                </AnimSection>

                <AnimSection delay={0.1}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "40px" }}>
                        {services.map((s, i) => (
                            <button key={i} onClick={() => setActiveService(i)}
                                className={`service-tab ${activeService === i ? "active" : ""}`}
                                style={{
                                    padding: "10px 24px", borderRadius: "30px",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    background: activeService === i ? "" : "transparent",
                                    color: activeService === i ? "#0a0a0a" : "#c9a84c",
                                    cursor: "pointer", fontFamily: "Georgia, serif",
                                    fontSize: "0.9rem", letterSpacing: "1px",
                                    transition: "all 0.3s"
                                }}>
                                {s.icon} {s.category}
                            </button>
                        ))}
                    </div>
                </AnimSection>

                <AnimSection delay={0.2}>
                    <div className="services-grid" style={{
                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px", maxWidth: "900px", margin: "0 auto"
                    }}>
                        {services[activeService].items.map((item, i) => (
                            <div key={i} className="price-card" style={{
                                background: "#141414", border: "1px solid rgba(201,168,76,0.15)",
                                borderRadius: "12px", padding: "20px",
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                transition: "all 0.3s", cursor: "default"
                            }}>
                                <span style={{ fontSize: "0.9rem", color: "rgba(240,232,216,0.85)" }}>{item.name}</span>
                                <span style={{
                                    color: "#c9a84c", fontWeight: "bold", fontSize: "1rem",
                                    whiteSpace: "nowrap", marginLeft: "12px"
                                }}>₹{item.price}</span>
                            </div>
                        ))}
                    </div>
                </AnimSection>
            </section>

            {/* PRICING HIGHLIGHT */}
            <section id="pricing" style={{ padding: "80px 5%", background: "#0d0d0d" }}>
                <AnimSection>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "12px" }}>✦ Special Packages ✦</div>
                        <h2 className="section-title gold-text" style={{ fontSize: "2.8rem", fontWeight: "normal" }}>Value Packages</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
                    {[
                        { name: "Glow Up – Men", price: "₹499", features: ["Haircut", "Beard Trim", "Head Massage", "Face Cleanup"], tag: "Popular" },
                        { name: "Queen Package – Women", price: "₹999", features: ["Haircut + Wash", "Basic Facial", "Manicure", "Eyebrow Threading"], tag: "Best Value" },
                        { name: "Bridal Prep", price: "₹2499", features: ["Gold Facial", "Keratin Treatment", "Gel Nails", "Full Body Wax", "Blow Dry"], tag: "Premium" },
                    ].map((pkg, i) => (
                        <AnimSection key={i} delay={i * 0.15}>
                            <div style={{
                                background: i === 1 ? "linear-gradient(145deg, #1a1200, #2a1f00)" : "#141414",
                                border: i === 1 ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(201,168,76,0.15)",
                                borderRadius: "16px", padding: "36px 28px", width: "280px", height: "24.5rem",
                                textAlign: "center", transition: "all 0.3s", position: "relative", overflow: "hidden"
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                                {pkg.tag && (
                                    <div style={{
                                        position: "absolute", top: "16px", right: "-28px",
                                        background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                                        color: "#0a0a0a", fontSize: "0.65rem", fontWeight: "bold",
                                        padding: "4px 36px", transform: "rotate(45deg)",
                                        letterSpacing: "1px", textTransform: "uppercase"
                                    }}>{pkg.tag}</div>
                                )}
                                <h3 style={{ fontSize: "1.1rem", color: "#c9a84c", marginBottom: "8px" }}>{pkg.name}</h3>
                                <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }} className="gold-text">{pkg.price}</div>
                                <ul style={{ listStyle: "none", marginBottom: "28px", textAlign: "left" }}>
                                    {pkg.features.map(f => (
                                        <li key={f} style={{ padding: "7px 0", fontSize: "0.9rem", color: "rgba(240,232,216,0.8)", display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ color: "#c9a84c" }}>✓</span>{f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="btn-gold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                                    style={{ width: "100%", padding: "12px", borderRadius: "6px", fontSize: "0.85rem" }}>
                                    Book Now
                                </button>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* GALLERY */}
            <section id="gallery" style={{ padding: "80px 5%", background: "#0a0a0a" }}>
                <AnimSection>
                    <div style={{ textAlign: "center", marginBottom: "50px" }}>
                        <div style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "12px" }}>✦ Our Space ✦</div>
                        <h2 className="section-title gold-text" style={{ fontSize: "2.8rem", fontWeight: "normal" }}>Salon Gallery</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", maxWidth: "1060px", margin: "0 auto" }}>
                    {gallery.map(({ img, label }) => (
                        <AnimSection key={label}>
                            <div style={{
                                borderRadius: "14px", overflow: "hidden",
                                border: "1px solid rgba(201,168,76,0.15)",
                                height: "220px", position: "relative", cursor: "pointer",
                                transition: "all 0.35s"
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.55)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,76,0.18)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                {/* Gradient overlay + label */}
                                <div style={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    background: "linear-gradient(to top, rgba(0,0,0,0.82), transparent)",
                                    padding: "28px 14px 14px",
                                    display: "flex", alignItems: "flex-end"
                                }}>
                                    <span style={{ fontSize: "0.78rem", letterSpacing: "2px", textTransform: "uppercase", color: "#c9a84c", fontWeight: "bold" }}>{label}</span>
                                </div>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section id="reviews" style={{ padding: "80px 5%", background: "#0d0d0d" }}>
                <AnimSection>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "12px" }}>✦ Client Love ✦</div>
                        <h2 className="section-title gold-text" style={{ fontSize: "2.8rem", fontWeight: "normal" }}>Reviews</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto" }}>
                    {reviews.map((r, i) => (
                        <AnimSection key={i} delay={i * 0.1}>
                            <div className="review-card" style={{
                                background: "#141414", border: "1px solid rgba(201,168,76,0.15)",
                                borderRadius: "14px", padding: "28px", transition: "all 0.3s"
                            }}>
                                <div style={{ color: "#c9a84c", fontSize: "1.1rem", marginBottom: "12px" }}>{"★".repeat(r.stars)}</div>
                                <p style={{ fontSize: "0.9rem", color: "rgba(240,232,216,0.75)", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" }}>
                                    "{r.text}"
                                </p>
                                <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#c9a84c" }}>— {r.name}</div>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" style={{ padding: "80px 5%", background: "#0a0a0a" }}>
                <AnimSection>
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <div style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "12px" }}>✦ Find Us ✦</div>
                        <h2 className="section-title gold-text" style={{ fontSize: "2.8rem", fontWeight: "normal" }}>Contact & Location</h2>
                    </div>
                </AnimSection>

                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", maxWidth: "900px", margin: "0 auto" }}>
                    <AnimSection delay={0.1}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {[
                                { icon: "📍", title: "Address", detail: "RA Unisex Saloon, Gachibowli, Hyderabad, Telangana – 500032" },
                                { icon: "📞", title: "Phone", detail: "+91 98765 43210" },
                                { icon: "✉️", title: "Email", detail: "raunisexsaloon@gmail.com" },
                                { icon: "🕐", title: "Hours", detail: "Mon – Sun: 9:00 AM – 9:00 PM" },
                                { icon: "📍", title: "Nearby", detail: "Near DLF Cyber City, Gachibowli Metro" },
                            ].map(({ icon, title, detail }) => (
                                <div key={title} style={{
                                    display: "flex", gap: "16px", alignItems: "flex-start",
                                    padding: "16px 20px", background: "#141414",
                                    border: "1px solid rgba(201,168,76,0.12)", borderRadius: "10px"
                                }}>
                                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{icon}</span>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", letterSpacing: "2px", color: "#c9a84c", textTransform: "uppercase", marginBottom: "4px" }}>{title}</div>
                                        <div style={{ fontSize: "0.9rem", color: "rgba(240,232,216,0.8)", lineHeight: 1.5 }}>{detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimSection>

                    <AnimSection delay={0.2}>
                        <div style={{
                            background: "#141414", border: "1px solid rgba(201,168,76,0.2)",
                            borderRadius: "14px", padding: "32px", height: "100%"
                        }}>
                            <h3 style={{ color: "#c9a84c", fontSize: "1.2rem", marginBottom: "24px", letterSpacing: "1px" }}>Book an Appointment</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {[
                                    { placeholder: "Your Name", type: "text" },
                                    { placeholder: "Phone Number", type: "tel" },
                                    { placeholder: "Service Required", type: "text" },
                                ].map(({ placeholder, type }) => (
                                    <input key={placeholder} type={type} placeholder={placeholder} style={{
                                        background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.2)",
                                        color: "#f0e8d8", borderRadius: "6px", padding: "12px 16px",
                                        fontSize: "0.9rem", fontFamily: "Georgia, serif", outline: "none",
                                        transition: "border-color 0.2s"
                                    }}
                                        onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.6)"}
                                        onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                                    />
                                ))}
                                <select style={{
                                    background: "#0a0a0a", border: "1px solid rgba(201,168,76,0.2)",
                                    color: "rgba(240,232,216,0.7)", borderRadius: "6px", padding: "12px 16px",
                                    fontSize: "0.9rem", fontFamily: "Georgia, serif", outline: "none"
                                }}>
                                    <option>Preferred Time</option>
                                    <option>9 AM – 11 AM</option>
                                    <option>11 AM – 1 PM</option>
                                    <option>1 PM – 3 PM</option>
                                    <option>3 PM – 5 PM</option>
                                    <option>5 PM – 7 PM</option>
                                    <option>7 PM – 9 PM</option>
                                </select>
                                <button className="btn-gold" style={{ padding: "14px", borderRadius: "6px", fontSize: "0.9rem", marginTop: "6px" }}
                                    onClick={() => alert("Thank you! We'll confirm your appointment shortly. 📞")}>
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </AnimSection>
                </div>

                {/* Map */}
                <AnimSection delay={0.3}>
                    <div style={{ maxWidth: "900px", margin: "40px auto 0" }}>
                        <div style={{
                            borderRadius: "14px", overflow: "hidden",
                            border: "1px solid rgba(201,168,76,0.25)",
                            background: "linear-gradient(145deg, #141414, #1a1200)"
                        }}>
                            {/* Map visual area */}
                            <div style={{
                                height: "280px", position: "relative",
                                background: "#111",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                overflow: "hidden"
                            }}>
                                {/* Grid lines to simulate map feel */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px"
                                }} />
                                {/* Radial glow at pin location */}
                                <div style={{
                                    position: "absolute", width: "220px", height: "220px", borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(229,57,53,0.15) 0%, transparent 70%)",
                                    top: "50%", left: "50%", transform: "translate(-50%,-50%)"
                                }} />
                                {/* Pulse rings */}
                                {[60, 90, 120].map((size, i) => (
                                    <div key={i} style={{
                                        position: "absolute", width: size, height: size, borderRadius: "50%",
                                        border: `1px solid rgba(229,57,53,${0.4 - i * 0.12})`,
                                        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                                        animation: `pulse-ring ${1.8 + i * 0.5}s ease-out infinite`,
                                        animationDelay: `${i * 0.4}s`
                                    }} />
                                ))}
                                {/* Red pin */}
                                <div style={{
                                    display: "flex", flexDirection: "column", alignItems: "center",
                                    animation: "float 2.5s ease-in-out infinite", zIndex: 2
                                }}>
                                    <div style={{
                                        width: "32px", height: "32px",
                                        background: "linear-gradient(135deg, #e53935, #b71c1c)",
                                        borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)",
                                        boxShadow: "0 4px 20px rgba(229,57,53,0.7)",
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <div style={{ width: "10px", height: "10px", background: "#fff", borderRadius: "50%", transform: "rotate(45deg)" }} />
                                    </div>
                                    <div style={{ width: "6px", height: "6px", background: "rgba(229,57,53,0.5)", borderRadius: "50%", marginTop: "2px" }} />
                                </div>
                                {/* Coordinates badge */}
                                <div style={{
                                    position: "absolute", top: "16px", left: "16px",
                                    background: "rgba(10,10,10,0.85)", border: "1px solid rgba(201,168,76,0.3)",
                                    borderRadius: "8px", padding: "8px 14px", backdropFilter: "blur(8px)"
                                }}>
                                    <div style={{ fontSize: "0.65rem", color: "#c9a84c", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "3px" }}>Coordinates</div>
                                    <div style={{ fontSize: "0.82rem", color: "#f0e8d8", fontFamily: "monospace" }}>17.441103° N, 78.360282° E</div>
                                </div>
                                {/* Saloon name badge */}
                                <div style={{
                                    position: "absolute", bottom: "16px",
                                    background: "rgba(10,10,10,0.9)", border: "1px solid rgba(201,168,76,0.4)",
                                    borderRadius: "20px", padding: "8px 20px", backdropFilter: "blur(8px)",
                                    display: "flex", alignItems: "center", gap: "8px"
                                }}>
                                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e53935", boxShadow: "0 0 6px rgba(229,57,53,0.8)" }} />
                                    <span style={{ fontSize: "0.85rem", color: "#f0e8d8", fontWeight: "bold" }}>RA Unisex Saloon</span>
                                    <span style={{ fontSize: "0.75rem", color: "rgba(240,232,216,0.5)" }}>· Gachibowli, Hyderabad</span>
                                </div>
                            </div>

                            {/* Info row */}
                            <div style={{
                                display: "flex", flexWrap: "wrap", gap: "0",
                                borderTop: "1px solid rgba(201,168,76,0.15)"
                            }}>
                                {[
                                    { icon: "📍", label: "Address", value: "Gachibowli, Hyderabad – 500032" },
                                    { icon: "🕐", label: "Hours", value: "9 AM – 9 PM, All Days" },
                                    { icon: "📞", label: "Phone", value: "+91 98765 43210" },
                                ].map(({ icon, label, value }, i) => (
                                    <div key={label} style={{
                                        flex: "1 1 200px", padding: "16px 20px",
                                        borderRight: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none",
                                        display: "flex", gap: "10px", alignItems: "center"
                                    }}>
                                        <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                                        <div>
                                            <div style={{ fontSize: "0.65rem", color: "#c9a84c", letterSpacing: "1.5px", textTransform: "uppercase" }}>{label}</div>
                                            <div style={{ fontSize: "0.82rem", color: "rgba(240,232,216,0.8)", marginTop: "2px" }}>{value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Open in Google Maps button */}
                        <a
                            href="https://www.google.com/maps?q=17.441103,78.360282"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                                marginTop: "14px", padding: "14px 28px",
                                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                                borderRadius: "10px", color: "#0a0a0a", textDecoration: "none",
                                fontSize: "0.9rem", fontWeight: "bold", letterSpacing: "1px",
                                cursor: "pointer", width: "fit-content", margin: "14px auto 0",
                                transition: "all 0.25s", boxShadow: "0 4px 20px rgba(201,168,76,0.3)"
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(201,168,76,0.5)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.3)"; }}
                        >
                            <span style={{ fontSize: "1.1rem" }}>📍</span>
                            Get Directions — Open in Google Maps ↗
                        </a>
                    </div>
                </AnimSection>
            </section>

            {/* FOOTER */}
            <footer style={{
                background: "#050505", borderTop: "1px solid rgba(201,168,76,0.2)",
                padding: "40px 5%", textAlign: "center"
            }}>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "6px" }} className="gold-text">RA Unisex Saloon</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(240,232,216,0.4)", letterSpacing: "2px" }}>GACHIBOWLI, HYDERABAD</div>
                </div>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
                    {navLinks.map(l => (
                        <button key={l} onClick={() => scrollTo(l)} style={{
                            background: "none", border: "none", color: "rgba(240,232,216,0.4)",
                            cursor: "pointer", fontSize: "0.75rem", letterSpacing: "1.5px",
                            textTransform: "uppercase", fontFamily: "Georgia, serif",
                            transition: "color 0.2s"
                        }}
                            onMouseEnter={e => e.target.style.color = "#c9a84c"}
                            onMouseLeave={e => e.target.style.color = "rgba(240,232,216,0.4)"}
                        >{l}</button>
                    ))}
                </div>
                <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "0 auto 20px" }} />
                <div style={{ fontSize: "0.75rem", color: "rgba(240,232,216,0.3)", letterSpacing: "1px" }}>
                    © 2026 RA Unisex Saloon. All rights reserved. ✦ Made with ❤️ in Gachibowli
                </div>
            </footer>
        </div>
    );
}