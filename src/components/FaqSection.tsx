import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem, Language } from '../types';

interface FaqSectionProps {
  faqs: FaqItem[];
  currentLang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, currentLang }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0b0f] relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{currentLang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {currentLang === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী' : 'Got Questions? We Have Answers.'}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base">
            {currentLang === 'bn'
              ? 'নেক্সফ্লিক্স ব্যবহারের নিয়ম, নিরাপত্তা ও আপডেট সম্পর্কিত তথ্যাবলী জেনে নিন।'
              : 'Everything you need to know about NexFlix safety, streaming quality, and device compatibility.'}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const question = currentLang === 'bn' ? faq.questionBn : faq.questionEn;
            const answer = currentLang === 'bn' ? faq.answerBn : faq.answerEn;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all border ${
                  isOpen 
                    ? 'bg-[#151520] border-red-500/30 shadow-lg shadow-black/40' 
                    : 'bg-[#111118] border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-extrabold text-white text-sm sm:text-base">
                    {question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-red-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
