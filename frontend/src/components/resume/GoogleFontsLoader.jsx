'use client';

import { useEffect } from 'react';

// Map of font names to their Google Fonts family parameter
const googleFontsMap = {
  'Inter': 'Inter:wght@300;400;500;600;700',
  'Roboto': 'Roboto:wght@300;400;500;700',
  'Open Sans': 'Open+Sans:wght@300;400;500;600;700',
  'Lato': 'Lato:wght@300;400;700',
  'Poppins': 'Poppins:wght@300;400;500;600;700',
  'Montserrat': 'Montserrat:wght@300;400;500;600;700',
  'Source Sans Pro': 'Source+Sans+3:wght@300;400;500;600;700', // Updated to Source Sans 3
  'Nunito': 'Nunito:wght@300;400;500;600;700',
  'Raleway': 'Raleway:wght@300;400;500;600;700',
  'Playfair Display': 'Playfair+Display:wght@400;500;600;700',
  'Merriweather': 'Merriweather:wght@300;400;700',
  'Lora': 'Lora:wght@400;500;600;700',
  'Fira Code': 'Fira+Code:wght@300;400;500;600;700',
  'JetBrains Mono': 'JetBrains+Mono:wght@300;400;500;600;700',
};

// CSS font-family values with proper fallbacks
export const fontFamilyMap = {
  'Inter': '"Inter", system-ui, sans-serif',
  'Roboto': '"Roboto", system-ui, sans-serif',
  'Open Sans': '"Open Sans", system-ui, sans-serif',
  'Lato': '"Lato", system-ui, sans-serif',
  'Poppins': '"Poppins", system-ui, sans-serif',
  'Montserrat': '"Montserrat", system-ui, sans-serif',
  'Source Sans Pro': '"Source Sans 3", "Source Sans Pro", system-ui, sans-serif',
  'Nunito': '"Nunito", system-ui, sans-serif',
  'Raleway': '"Raleway", system-ui, sans-serif',
  'Playfair Display': '"Playfair Display", Georgia, serif',
  'Merriweather': '"Merriweather", Georgia, serif',
  'Lora': '"Lora", Georgia, serif',
  'Georgia': 'Georgia, "Times New Roman", serif',
  'Times New Roman': '"Times New Roman", Times, serif',
  'Fira Code': '"Fira Code", "Courier New", monospace',
  'JetBrains Mono': '"JetBrains Mono", "Courier New", monospace',
};

/**
 * Component to dynamically load Google Fonts
 * @param {Object} props
 * @param {string[]} props.fonts - Array of font names to load
 */
export default function GoogleFontsLoader({ fonts = [] }) {
  useEffect(() => {
    if (!fonts || fonts.length === 0) return;

    // Filter to only Google Fonts (exclude system fonts like Georgia, Times New Roman)
    const googleFonts = fonts.filter(font => googleFontsMap[font]);
    
    if (googleFonts.length === 0) return;

    // Build the Google Fonts URL
    const fontFamilies = googleFonts.map(font => googleFontsMap[font]).join('&family=');
    const fontsUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;

    // Check if this link already exists
    const existingLink = document.querySelector(`link[href="${fontsUrl}"]`);
    if (existingLink) return;

    // Create and append the link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontsUrl;
    link.setAttribute('data-google-fonts', 'true');
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount (optional - fonts are cached anyway)
    };
  }, [fonts]);

  return null;
}

/**
 * Get the proper CSS font-family value for a font name
 * @param {string} fontName - The font name from customization
 * @returns {string} - CSS font-family value with fallbacks
 */
export function getFontFamily(fontName) {
  return fontFamilyMap[fontName] || `"${fontName}", system-ui, sans-serif`;
}
