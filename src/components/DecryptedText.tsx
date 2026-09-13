import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  delay?: number;
  highlightClass?: string;
}

const GLYPHS = '0123456789ABCDEF!@#$%&*+~?/><';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  speed = 40,
  maxIterations = 10,
  delay = 200,
  highlightClass = 'text-[#FBBF24]',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / (maxIterations / text.length);
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span
      onMouseEnter={() => {
        setIsHovered(true);
        scramble();
      }}
      className={`inline-block cursor-default font-mono transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
