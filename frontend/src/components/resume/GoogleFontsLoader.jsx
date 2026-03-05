import {
  Fira_Code,
  Inter,
  JetBrains_Mono,
  Lato,
  Lora,
  Merriweather,
  Montserrat,
  Nunito,
  Open_Sans,
  Playfair_Display,
  Poppins,
  Raleway,
  Roboto,
  Source_Sans_3,
  Ubuntu,
} from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'], display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const nunito = Nunito({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300', '400', '700'], display: 'swap' });
const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['300', '400', '500', '700'], display: 'swap' });

const nextGoogleFontsMap = {
  Inter: inter,
  Roboto: roboto,
  'Open Sans': openSans,
  Lato: lato,
  Poppins: poppins,
  Montserrat: montserrat,
  'Source Sans Pro': sourceSans3,
  'Source Sans 3': sourceSans3,
  Nunito: nunito,
  Raleway: raleway,
  'Playfair Display': playfairDisplay,
  Merriweather: merriweather,
  Lora: lora,
  'Fira Code': firaCode,
  'JetBrains Mono': jetBrainsMono,
  Ubuntu: ubuntu,
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
  'Source Sans 3': '"Source Sans 3", "Source Sans Pro", system-ui, sans-serif',
  'Nunito': '"Nunito", system-ui, sans-serif',
  'Raleway': '"Raleway", system-ui, sans-serif',
  'Playfair Display': '"Playfair Display", Georgia, serif',
  'Merriweather': '"Merriweather", Georgia, serif',
  'Lora': '"Lora", Georgia, serif',
  'Georgia': 'Georgia, "Times New Roman", serif',
  'Times New Roman': '"Times New Roman", Times, serif',
  'Fira Code': '"Fira Code", "Courier New", monospace',
  'JetBrains Mono': '"JetBrains Mono", "Courier New", monospace',
  'Ubuntu': '"Ubuntu", system-ui, sans-serif',
};

/**
 * Kept for backwards compatibility after switching to next/font/google.
 */
export default function GoogleFontsLoader() {
  return null;
}

export function getFontClassName(fontName) {
  return nextGoogleFontsMap[fontName]?.className || '';
}

/**
 * Get the proper CSS font-family value for a font name
 * @param {string} fontName - The font name from customization
 * @returns {string} - CSS font-family value with fallbacks
 */
export function getFontFamily(fontName) {
  const nextFont = nextGoogleFontsMap[fontName];
  if (nextFont?.style?.fontFamily) {
    return `${nextFont.style.fontFamily}, ${fontFamilyMap[fontName] || 'system-ui, sans-serif'}`;
  }

  return fontFamilyMap[fontName] || `"${fontName}", system-ui, sans-serif`;
}

export function getFontStyle(fontName) {
  return { fontFamily: getFontFamily(fontName) };
}
