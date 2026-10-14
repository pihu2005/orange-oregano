import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Calendar, Check } from 'lucide-react';

export const GoaStudio: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingGuests, setBookingGuests] = useState('1');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
      setBookingName('');
      setBookingDate('');
    }, 2500);
  };

  return (
    <section id="studio" className="py-20 lg:py-28 bg-[#f4ede2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#ef8535] bg-[#FFFDF9] border border-[#ef8535]/30 px-4 py-1.5 rounded-full inline-block mb-3">
            Atelier & Flagship
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#763c00] tracking-tight">
            Visit Our Candolim Studio
          </h2>
          <div className="w-16 h-1 bg-[#ef8535] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base sm:text-lg text-[#554030]">
            Nestled inside a restored heritage Goan villa in Marquis Vaddo, Candolim. Experience our artisanal fabrics firsthand in a serene tropical courtyard.
          </p>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Image Mosaic */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden canva-box-shadow border-2 border-[#763c00] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Goa Villa architecture at Candolim"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden canva-box-shadow border-2 border-[#763c00] aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
                  alt="Textiles inside Orange Oregano Goa Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-[#ef8535] text-[#f9f7dc] rounded-2xl border-2 border-[#763c00] canva-box-shadow">
                <span className="text-xs uppercase font-bold tracking-widest block mb-1">
                  Private Appointments
                </span>
                <p className="font-display text-xl leading-tight">
                  Enjoy complimentary tender coconut water while our head stylist curates your resort wardrobe.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Address & Contact Card matching Canva */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 border-2 border-[#763c00] canva-box-shadow space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#ef8535]">
                Say Hello
              </span>
              <h3 className="font-display text-3xl text-[#763c00] mt-1">
                Orange Oregano Studio
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5 text-[#554030]">
              <div className="p-2.5 rounded-xl bg-[#ef8535]/15 text-[#ef8535] mt-1">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#763c00]">Studio Address:</p>
                <p className="text-sm mt-0.5 leading-relaxed">
                  House no, 406-A, Marquis Vaddo,<br />
                  Vaddi, Candolim, Goa 403515
                </p>
                <a
                  href="https://maps.google.com/?q=House+no+406-A+Marquis+Vaddo+Candolim+Goa+403515"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-1.5 text-xs font-bold text-[#ef8535] hover:underline"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5 text-[#554030]">
              <div className="p-2.5 rounded-xl bg-[#ef8535]/15 text-[#ef8535] mt-1">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#763c00]">Direct Concierge & Orders:</p>
                <a
                  href="tel:09823610024"
                  className="text-base font-display font-bold text-[#ef8535] hover:underline block"
                >
                  09823610024 / +91 98236 10024
                </a>
                <span className="text-[11px] text-gray-500">Available Mon-Sat, 10:00 AM - 8:00 PM IST</span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3.5 text-[#554030]">
              <div className="p-2.5 rounded-xl bg-[#ef8535]/15 text-[#ef8535] mt-1">
                <Clock size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#763c00]">Studio Hours:</p>
                <p className="text-xs mt-0.5">Monday to Saturday: 10:30 AM – 7:30 PM</p>
                <p className="text-xs text-gray-500">Sundays: By Prior Appointment</p>
              </div>
            </div>

            {/* Interactive CTAs */}
            <div className="pt-4 border-t border-[#ef8535]/20 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 py-3 px-4 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                <span>Book Styling Session</span>
              </button>

              <a
                href="https://wa.me/919823610024?text=Hello%20Orange%20Oregano,%20I%20am%20interested%20in%20your%20handcrafted%20collection."
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-[#1ebd5a] transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Appointment Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-3xl max-w-md w-full p-8 border-2 border-[#763c00] canva-box-shadow animate-fadeIn relative">
            <h3 className="font-display text-2xl text-[#763c00] mb-2">
              Book a Private Styling Session
            </h3>
            <p className="text-xs text-[#554030] mb-6">
              Candolim Studio • House no, 406-A, Marquis Vaddo
            </p>

            {bookingSuccess ? (
              <div className="py-8 text-center text-green-700 bg-green-50 rounded-2xl border border-green-200">
                <Check size={36} className="mx-auto mb-2 text-green-600 animate-bounce" />
                <h4 className="font-display text-lg font-bold">Appointment Requested!</h4>
                <p className="text-xs mt-1 text-green-800">
                  Our Candolim concierge will confirm your session via WhatsApp shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#763c00] uppercase mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Alisha Fernandes"
                    className="w-full px-3 py-2 text-xs border border-[#ef8535]/30 rounded-xl bg-white focus:outline-none focus:border-[#ef8535]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#763c00] uppercase mb-1">
                    Preferred Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#ef8535]/30 rounded-xl bg-white focus:outline-none focus:border-[#ef8535]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#763c00] uppercase mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={bookingGuests}
                    onChange={(e) => setBookingGuests(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#ef8535]/30 rounded-xl bg-white focus:outline-none focus:border-[#ef8535]"
                  >
                    <option value="1">1 Person (Private Fitting)</option>
                    <option value="2">2 Persons</option>
                    <option value="3+">3+ Persons (Group Visit)</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#ef8535] text-[#f9f7dc] rounded-xl text-xs font-bold uppercase tracking-wider canva-box-shadow"
                  >
                    Confirm Visit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
