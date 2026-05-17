// components/landing/ContactSection.jsx

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function ContactSection() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    {
      name: "GITHUB",
      url: "https://github.com/Kashyap-Manish-Kumar",
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      name: "LINKEDIN",
      url: "https://www.linkedin.com/in/manish-kashyap-22154732b/",
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      name: "LEETCODE",
      url: "https://leetcode.com/u/Kashyap-Manish-Kumar/",
      icon: <SiLeetcode className="w-5 h-5" />,
    },
    {
      name: "WHATSAPP",
      url: "https://wa.me/917046894649",
      icon: <FaWhatsapp className="w-5 h-5" />,
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formRef.current) return;

    const form = formRef.current;

    emailjs
      .sendForm(
        "service_2a2mhgk",
        "template_syl5k6n",
        form,
        "oIDt_BpZGhe7Ls8Ni"
      )
      .then(
        () => {
          alert("Message sent ✅");
          form.reset();
          setLoading(false);
        },
        () => {
          alert("Failed ❌");
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="mt-16 pb-12 scroll-mt-24 px-4"
    >
      <div className="w-full max-w-screen-xl mx-auto">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border border-cyan-400/10
            bg-gradient-to-b
            from-[#07111f]
            to-[#010e35]
            shadow-[0_0_60px_rgba(6,182,212,0.08)]
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12))]
              pointer-events-none
            "
          />

          <div className="relative z-10 p-2 sm:p-3 lg:p-5">
            {/* HEADER */}
            <div className="text-center max-w-2xl mx-auto">
              <p
                className="
                  uppercase
                  tracking-[0.15em]
                  text-cyan-400
                  text-5xl
                  font-semibold
                "
              >
                CONNECT
              </p>

              <h2
                className="
                  mt-2
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-extrabold
                  text-white
                "
              >
                Let’s Work Together
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  sm:text-base
                  leading-relaxed
                  text-slate-400
                "
              >
                Have an idea, project, or opportunity?
                Let’s build something impactful together.
              </p>
            </div>

            {/* MAIN GRID */}
            <div
              className="
                mt-3
                grid
                lg:grid-cols-2
                gap-6
              "
            >
              {/* MAP */}
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                "
              >
                <iframe
                  src="https://www.google.com/maps?q=Vadodara&output=embed"
                  className="w-full h-[280px]"
                  loading="lazy"
                />
              </div>

              {/* FORM */}
              <div
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  p-2 sm:p-2
                "
              >
                <form
                  ref={formRef}
                  onSubmit={sendEmail}
                  className="space-y-2"
                >
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border border-white/10
                      bg-black/30
                      px-4
                      text-sm
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      transition-all duration-300
                      focus:border-cyan-400
                      focus:bg-black/50
                    "
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border border-white/10
                      bg-black/30
                      px-4
                      text-sm
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      transition-all duration-300
                      focus:border-cyan-400
                      focus:bg-black/50
                    "
                  />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write your message..."
                    required
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-black/30
                      px-4
                      py-3
                      text-sm
                      text-white
                      placeholder:text-slate-500
                      outline-none
                      resize-none
                      transition-all duration-300
                      focus:border-cyan-400
                      focus:bg-black/50
                    "
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      h-12
                      rounded-xl
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      text-sm
                      font-semibold
                      tracking-wide
                      text-white
                      transition-all duration-300
                      hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]
                      hover:-translate-y-0.5
                    "
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* SOCIALS */}
            <div
              className="
                mt-6
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-4
              "
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.03]
                    px-4
                    py-4
                    flex
                    items-center
                    justify-center
                    gap-3
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:border-cyan-400/40
                    hover:bg-cyan-500/10
                    hover:-translate-y-1
                  "
                >
                  <div
                    className="
                      text-cyan-300
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  >
                    {social.icon}
                  </div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      tracking-[0.18em]
                      text-white
                    "
                  >
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;