
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

/**
 * REKAN CURHAT - Project Landing Page
 * Style: Minimalist, Calming, Pastel
 */

const App: React.FC = () => {
  const [pseudonym, setPseudonym] = useState('');
  const [story, setStory] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCurhatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User (Pseudonym: ${pseudonym || 'Anonim'}) says: ${story}`,
        config: {
          systemInstruction: "Anda adalah 'Rekan Curhat', seorang pendengar yang sangat empatik, hangat, dan menenangkan. Berikan respon singkat yang memvalidasi perasaan pengguna. Ingatkan mereka bahwa ini bukan layanan medis profesional, namun Anda di sini untuk mendengarkan. Gunakan bahasa Indonesia yang santai tapi sopan. Fokus pada dukungan emosional.",
        },
      });

      setResponse(result.text || "Terima kasih sudah bercerita. Aku di sini mendengarkanmu.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Maaf, sepertinya aku sedang kesulitan terhubung. Tapi ketahuilah bahwa ceritamu berharga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* 1. Element Selector */
        body {
          margin: 0;
          font-family: 'Quicksand', sans-serif;
          background-color: #fdfbfb;
          color: #4a4a4a;
          line-height: 1.6;
          scroll-behavior: smooth;
        }

        header {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 1rem 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        section {
          scroll-margin-top: 80px;
        }

        h1, h2, h3 {
          color: #2d6a4f;
          font-weight: 700;
        }

        /* 2. Class Selector */
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .flex-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.6rem;
          font-weight: 800;
          color: #2d6a4f;
          text-decoration: none;
          letter-spacing: -0.5px;
        }

        .nav-links a {
          margin-left: 24px;
          text-decoration: none;
          color: #555;
          font-weight: 600;
          transition: all 0.3s;
          font-size: 0.95rem;
        }

        .nav-links a:hover {
          color: #a8dadc;
        }

        /* 3. ID Selector */
        #hero-section {
          min-height: 85vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        #hero-section::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(168,218,220,0.2) 0%, rgba(255,255,255,0) 70%);
          top: -100px;
          right: -100px;
          border-radius: 50%;
        }

        #hero-section h1 {
          font-size: clamp(2.5rem, 8vw, 4rem);
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .section-padding {
          padding: 100px 0;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }

        .feature-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #f0f0f0;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 20px;
          display: block;
        }

        .card-main {
          background: white;
          border-radius: 32px;
          padding: 50px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
          max-width: 800px;
          margin: -80px auto 0;
          position: relative;
          z-index: 2;
        }

        /* 4. Descendant Selector */
        .vent-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          color: #666;
        }

        .vent-form textarea {
          width: 100%;
          min-height: 180px;
          border: 2px solid #f0f0f0;
          border-radius: 16px;
          padding: 20px;
          font-family: inherit;
          font-size: 1.05rem;
          margin-bottom: 24px;
          resize: vertical;
          transition: all 0.3s;
          background: #fbfbfb;
        }

        .vent-form textarea:focus {
          outline: none;
          border-color: #a8dadc;
          background: white;
          box-shadow: 0 0 0 4px rgba(168,218,220,0.1);
        }

        /* 5. Attribute Selector */
        input[type="text"] {
          width: 100%;
          padding: 14px 20px;
          margin-bottom: 24px;
          border: 2px solid #f0f0f0;
          border-radius: 16px;
          box-sizing: border-box;
          background: #fbfbfb;
          font-size: 1rem;
        }

        input[type="text"]:focus {
          outline: none;
          border-color: #a8dadc;
          background: white;
        }

        .btn-primary {
          background-color: #a8dadc;
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 100px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-block;
          font-weight: 700;
          box-shadow: 0 10px 20px rgba(168,218,220,0.3);
        }

        .btn-primary:hover {
          background-color: #457b9d;
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(69,123,157,0.3);
        }

        .ai-response {
          margin-top: 40px;
          padding: 30px;
          background-color: #f1faee;
          border-radius: 20px;
          border: 1px solid #d8e2dc;
          animation: slideIn 0.6s ease-out;
          position: relative;
        }

        .ai-response::before {
          content: '✨';
          position: absolute;
          top: -15px;
          left: 20px;
          background: #a8dadc;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.8rem;
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-top: 50px;
        }

        .media-item {
          background: white;
          padding: 30px;
          border-radius: 24px;
          border: 1px solid #f0f0f0;
          text-align: center;
        }

        video {
          width: 100%;
          border-radius: 16px;
          margin-top: 15px;
        }

        audio {
          width: 100%;
          margin-top: 15px;
        }

        .disclaimer {
          font-size: 0.9rem;
          color: #999;
          text-align: center;
          max-width: 700px;
          margin: 60px auto;
          padding: 30px;
          border-top: 1px solid #eee;
          line-height: 1.8;
        }

        footer {
          background-color: #fff;
          padding: 60px 0;
          text-align: center;
          border-top: 1px solid #eee;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .title-accent {
          color: #a8dadc;
        }

        .how-it-works {
          background-color: #f1faee;
          border-radius: 40px;
          padding: 60px;
          margin-top: 60px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .step-num {
          background: #a8dadc;
          color: white;
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
      `}</style>

      <header>
        <nav className="container flex-nav">
          <a href="#" className="logo">Rekan<span className="title-accent">Curhat</span></a>
          <div className="nav-links">
            <a href="#about">Tentang</a>
            <a href="#curhat">Curhat</a>
            <a href="#media">Relaksasi</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero-section">
          <div className="container">
            <span style={{color: '#a8dadc', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem'}}>Your Safe Space</span>
            <h1>Lepaskan beban pikiranmu. <br/> <span className="title-accent">Kami mendengarkan.</span></h1>
            <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#666'}}>
              Platform anonim untuk mencurahkan isi hati. Tidak perlu identitas, cukup kejujuran dari dalam hatimu.
            </p>
            <a href="#curhat" className="btn-primary">Mulai Cerita Sekarang</a>
          </div>
        </section>

        <section id="about" className="section-padding">
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '60px'}}>
              <h2>Kenapa Kamu Membutuhkan Ini?</h2>
              <p style={{color: '#777', fontSize: '1.1rem'}}>Kadang, kata-kata yang terucap adalah langkah pertama menuju ketenangan.</p>
            </div>

            <div className="grid-3">
              <div className="feature-card">
                <span className="feature-icon">🛡️</span>
                <h3>100% Anonim</h3>
                <p>Identitasmu tetap menjadi rahasiamu. Kami tidak menyimpan data pribadi yang bisa melacakmu.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🌙</span>
                <h3>Tersedia 24/7</h3>
                <p>Butuh teman bicara di jam 3 pagi? Rekan Curhat selalu ada di sini untuk mendengarkanmu.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🕊️</span>
                <h3>Bebas Penghakiman</h3>
                <p>Curhat apa saja tanpa takut dinilai. Kami di sini untuk memvalidasi dan mendukungmu.</p>
              </div>
            </div>

            <div className="how-it-works">
              <h3 style={{textAlign: 'center', marginBottom: '40px'}}>Cara Kerja Rekan Curhat</h3>
              <div className="step">
                <div className="step-num">1</div>
                <div>
                  <h4>Pilih Nama Samaran</h4>
                  <p>Gunakan nama apa pun yang membuatmu merasa nyaman dan bebas.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div>
                  <h4>Tuliskan Segalanya</h4>
                  <p>Tuangkan beban, kebahagiaan, atau kecemasanmu tanpa batas kata.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div>
                  <h4>Dapatkan Respon Empati</h4>
                  <p>Teknologi AI kami akan memberikan respon hangat yang mendengarkan perasaanmu.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="curhat" className="section-padding" style={{backgroundColor: '#fdfbfb', backgroundImage: 'radial-gradient(#e2d1c3 0.5px, #fdfbfb 0.5px)', backgroundSize: '20px 20px'}}>
          <div className="container">
            <div className="card-main">
              <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Tuangkan Isi Hatimu</h2>
              <p style={{textAlign: 'center', color: '#888', marginBottom: '40px'}}>Tarik napas dalam, dan mulailah menulis...</p>
              
              <form className="vent-form" onSubmit={handleCurhatSubmit}>
                <label htmlFor="pseudonym">Nama Samaran</label>
                <input 
                  type="text" 
                  id="pseudonym" 
                  placeholder="Contoh: Senja Di Desa" 
                  value={pseudonym}
                  onChange={(e) => setPseudonym(e.target.value)}
                />

                <label htmlFor="story">Apa yang sedang kamu pikirkan?</label>
                <textarea 
                  id="story" 
                  placeholder="Ceritakan apa saja... aku mendengarkan." 
                  required
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                ></textarea>

                <div style={{textAlign: 'center'}}>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Sabar ya, aku sedang menyimak...' : 'Kirim Curhatan'}
                  </button>
                </div>
              </form>

              {response && (
                <div className="ai-response">
                  <p style={{fontSize: '0.9rem', fontWeight: 700, color: '#2d6a4f', marginBottom: '10px'}}>PESAN UNTUKMU:</p>
                  <p style={{fontSize: '1.1rem', fontStyle: 'italic', color: '#444', lineHeight: '1.8'}}>"{response}"</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="media" className="section-padding">
          <div className="container">
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <h2>Relaksasi Sejenak</h2>
              <p>Ambil waktu untuk dirimu sendiri dengan konten yang menenangkan.</p>
            </div>
            
            <div className="media-grid">
              <div className="media-item">
                <h3 style={{fontSize: '1.1rem'}}>Visual Alam</h3>
                <video controls poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800">
                  <source src="https://assets.mixkit.co/videos/4132/4132-720.mp4" type="video/mp4" />
                </video>
                <p style={{fontSize: '0.8rem', color: '#999', marginTop: '10px'}}>Pemandangan gunung yang damai</p>
              </div>

              <div className="media-item">
                <h3 style={{fontSize: '1.1rem'}}>Suara Hujan & Burung</h3>
                <audio controls>
                  <source src="https://assets.mixkit.co/active_storage/sfx/2473/2473-preview.mp3" type="audio/mpeg" />
                </audio>
                <p style={{fontSize: '0.8rem', color: '#999', marginTop: '10px'}}>Suasana hutan di pagi hari</p>
              </div>
            </div>
          </div>
        </section>

        <section className="disclaimer">
          <div className="container">
            <p>
              <strong>PENTING:</strong> Rekan Curhat adalah platform pendukung emosional yang ditenagai oleh AI. 
              Layanan ini <strong>BUKAN</strong> pengganti bantuan medis profesional, psikolog, atau psikiater. 
              Jika Anda berada dalam bahaya atau memikirkan untuk menyakiti diri sendiri, segera hubungi layanan darurat 
              atau hotline pencegahan bunuh diri di wilayah Anda.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p style={{fontWeight: 700, color: '#2d6a4f', marginBottom: '20px'}}>RekanCurhat</p>
          <p style={{fontSize: '0.9rem', color: '#999'}}>&copy; 2024 Rekan Curhat. Berani bercerita adalah awal dari pemulihan.</p>
          <div style={{marginTop: '20px'}}>
            <a href="#" style={{color: '#a8dadc', margin: '0 15px', textDecoration: 'none', fontWeight: 600}}>Twitter</a>
            <a href="#" style={{color: '#a8dadc', margin: '0 15px', textDecoration: 'none', fontWeight: 600}}>Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
