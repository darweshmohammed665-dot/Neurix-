import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoldCinematicIntroProps {
  onComplete?: () => void;
  isOpenByDefault?: boolean;
}

export const GoldCinematicIntro: React.FC<GoldCinematicIntroProps> = ({ 
  onComplete,
  isOpenByDefault = true 
}) => {
  const [isActive, setIsActive] = useState(isOpenByDefault);

  useEffect(() => {
    if (!isActive) return;

    // إبقاء الأبواب مغلقة لمدة 2.8 ثانية (للسماح بنزول الحروف وقراءتها)، ثم تبدأ بالانفتاح
    const tFinish = setTimeout(() => {
      setIsActive(false);
      
      // الانتظار حتى يكتمل أنيميشن الانفتاح (1.5 ثانية) قبل إزالة المكون
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500); 
    }, 2800);

    return () => {
      clearTimeout(tFinish);
    };
  }, [isActive, onComplete]);

  const word = ['N', 'E', 'U', 'R', 'I', 'X'];

  return (
    <div style={{ perspective: '3000px' }} className="fixed inset-0 z-[100] pointer-events-none flex">
      <AnimatePresence>
        {isActive && (
          <>
            {/* الصفحة/الباب الأيسر - ذهبي */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ 
                rotateY: -105, // الباب ينفتح لليسار
                opacity: [1, 1, 0],
                scale: 0.95,
                transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
              }}
              className="absolute left-0 w-1/2 h-full pointer-events-auto overflow-hidden"
              style={{
                transformOrigin: 'left center',
                background: 'radial-gradient(circle at 100% 50%, #38BDF8 0%, #0ea5e9 50%, #0284c7 90%, #0369a1 100%)',
                borderRight: '1px solid rgba(0,0,0,0.8)',
                boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.5)',
                zIndex: 10,
              }}
            >
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e0f2fe_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
            </motion.div>

            {/* الصفحة/الباب الأيمن - كحلي (Navy Blue) مع تفاصيل بسيطة */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 0 }}
              exit={{ 
                rotateY: 105, // الباب ينفتح لليمين
                opacity: [1, 1, 0],
                scale: 0.95,
                transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
              }}
              className="absolute right-0 w-1/2 h-full pointer-events-auto overflow-hidden"
              style={{
                transformOrigin: 'right center',
                background: 'radial-gradient(circle at 0% 50%, #111827 0%, #0B0F19 60%, #0B0F19 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.2)',
                boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.7)',
                zIndex: 10,
              }}
            >
              {/* تفاصيل بسيطة في اللون الكحلي: شبكة خفيفة جداً وإضاءة زرقاء خافتة */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>

            {/* الحروف المتساقطة تتجمع في منتصف الشاشة (بين الذهبي والكحلي) */}
            <motion.div 
              exit={{ opacity: 0, scale: 1.3, filter: 'blur(10px)' }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="flex items-center gap-2 sm:gap-4 overflow-visible">
                {word.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: -800, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 12,
                      mass: 1,
                      delay: index * 0.15, // تنزل الحروف واحداً تلو الآخر
                    }}
                    className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem] font-black tracking-tight"
                    style={{
                      color: '#F9FAFBFFF', // لون أبيض ساطع ليظهر بقوة على الذهبي والكحلي
                      textShadow: '0 10px 30px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.4)',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* شعاع ضوئي سينمائي يظهر في الشق بين البابين قبل فتحهما مباشرة */}
            <motion.div
              initial={{ opacity: 0, height: '0%' }}
              animate={{ opacity: [0, 0.5, 1], height: ['0%', '50%', '100%'] }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 2.3, ease: "easeIn" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 bg-[#F9FAFB] z-20 pointer-events-none"
              style={{
                boxShadow: '0 0 30px 10px rgba(255,255,255,0.8), 0 0 60px 20px #38BDF8',
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoldCinematicIntro;
