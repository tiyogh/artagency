"use client"

export default function Contact() {
  return (
    <section className="bg-[#0d0d0d] text-[#f5f5f7] py-24 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <span className="text-ts uppercase tracking-[0.3em] text-purple-400 font-semibold mb-4 block">
            Initiate Project
          </span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight uppercase leading-none">Let&apos;s Create <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Together</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-zinc-400 font-light text-lg">Have idea for an exhibition, a digital art project, or a visual collaboration. Send message and let&apos;s discuss your concept.</p>

          <form name="email" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <input
              id="email"
              type="email"
              placeholder="Your Email Address"
              className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-full text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
              autoComplete="email"
            />
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-semibold rounded-full uppercase tracking-wider text-xs hover:bg-zinc-200 transition-colors">
              Send Inquiry
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <p>© 2026 Art Agency Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Behance</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </section>
  )
}
