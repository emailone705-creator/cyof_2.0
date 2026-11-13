import React from 'react';
import { ViewRoute } from '../types';

interface AboutUsViewProps {
  onNavigate: (route: ViewRoute) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col bg-[#fcf9f4] min-h-screen text-[#1c1c19] pb-24">
      {/* Breadcrumb Bar */}
      <div className="w-full bg-[#f6f3ee] px-4 md:px-8 lg:px-16 pt-6 pb-3 sm:py-3 border-b border-[#E9DFD2]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between font-['Manrope'] text-xs">
          <div className="flex items-center gap-2 text-[#57534E]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#B94700] transition-colors uppercase tracking-wider cursor-pointer"
            >
              Flagship
            </button>
            <span className="text-[#E9DFD2]">/</span>
            <span className="text-[#57534E] uppercase tracking-wider">About CYOF</span>
            <span className="text-[#E9DFD2]">/</span>
            <span className="text-[#111111] font-semibold uppercase tracking-wider">About Us</span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="hidden sm:flex items-center gap-1 uppercase tracking-widest text-[#57534E] hover:text-[#B94700] transition-colors font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Flagship</span>
          </button>
        </div>
      </div>

      {/* Main Editorial Header Lockup */}
      <header className="w-full max-w-[1000px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-8 border-b border-[#E9DFD2]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#B94700]" />
            <span className="font-['Manrope'] text-[10px] tracking-[0.28em] text-[#57534E] uppercase font-bold">
              A STORY OF ART, CREATIVITY &amp; THE LOVE OF HANDCRAFTED FASHION
            </span>
          </div>

          <h1 className="font-['EB_Garamond'] text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight font-normal">
            The Story of CYOF
          </h1>

          <p className="font-['Manrope'] text-xs uppercase tracking-[0.2em] text-[#B94700] font-semibold">
            Crafted Your Own Fashion
          </p>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* Requested Story Section */}
        <section className="border border-[#E9DFD2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#E9DFD2] pb-4">
            <span className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700] font-bold block mb-1">
              #CraftedYourOwnFashion
            </span>
            <h2 className="font-['EB_Garamond'] text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide font-normal">
              OUR STORY
            </h2>
          </div>

          <div className="font-['Manrope'] text-sm sm:text-base text-[#2c2b29] leading-relaxed space-y-5">
            <p>
              <strong>CYOF — Crafted Your Own Fashion</strong> was born from a simple love for art, colours, creativity and the beauty of things made by hand.
            </p>

            <p>
              Some people see fabric as something to wear. We see it as a canvas, waiting to tell a story.
            </p>

            <p>
              The journey of CYOF began with its founder and CEO, <strong>Kajal Das</strong>, whose connection with art and craftsmanship goes back to her childhood. Coming from a family with roots in clay sculpting and ceramic art, Kajal grew up surrounded by creativity. Working with her hands, playing with colours, sketching and creating handmade pieces became a natural part of her life. Over the years, she developed a deep understanding of handcrafted art and a special love for hand-painted creations.
            </p>

            <p>
              For Kajal, art was never just a hobby. It was a way of expressing herself.
            </p>

            <p>
              As her love for creating grew, she began to imagine bringing that same artistic expression into fashion. She wanted to create something for people who appreciate the beauty of handmade things — those who love thoughtful designs, beautiful colours, hand-painted details, handloom, and clothing that feels a little different from the ordinary.
            </p>

            <p>
              That thought gave birth to CYOF.
            </p>

            <p>
              CYOF is a fashion brand where creativity finds its place in everyday clothing. We bring together art, craft and fashion to create pieces that are designed to look beautiful and feel special, whether worn casually or on occasions when you simply want to express your own style.
            </p>

            <p>
              Every creation reflects the joy of making something by hand. It carries the spirit of an artist who loves to draw, paint, experiment and turn imagination into something you can wear.
            </p>

            <p>
              At its heart, CYOF is also a story of women, creativity and independence. It celebrates the hands, ideas and determination of women who create, dream and build something of their own. We believe that every woman has an artist within her, and that creativity deserves a place in everyday life.
            </p>

            <p>
              We are here for the handmade fashion lovers, the art enthusiasts, the admirers of handloom and everyone who finds happiness in owning something created with care.
            </p>

            <p>
              <strong>CYOF is more than what we make. It is about the people who appreciate it, the art that inspires it and the hands that bring it to life.</strong>
            </p>

            <p>
              Our story is still being created — with every sketch, every brushstroke, every colour and every piece of clothing.
            </p>

            <p>
              And to everyone who chooses CYOF, thank you for being a part of this journey.
            </p>

            <p>
              <strong>CYOF — Crafted Your Own Fashion.</strong>
            </p>

            <p className="italic text-[#B94700]">
              Made with art. Inspired by creativity. Crafted for you.
            </p>
          </div>
        </section>

        {/* Bottom Navigation CTA */}
        <div className="pt-8 border-t border-[#D34500] flex flex-col sm:flex-row items-center justify-between gap-4 font-['Manrope']">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D34500] hover:bg-[#B94700] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Return to Flagship Boutique
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs text-[#57534E] hover:text-[#B94700] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
          >
            Explore Handcrafted Creations →
          </button>
        </div>

        {/* Closing Note */}
        <div className="border-t border-[#E9DFD2] pt-6 space-y-3 text-center">
          <p className="font-['EB_Garamond'] text-xl sm:text-2xl text-[#111111] italic">
            Thank you for choosing CYOF.
          </p>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-[0.25em] text-[#B94700]">
            #CraftedYourOwnFashion
          </p>
        </div>

      </main>
    </div>
  );
};
