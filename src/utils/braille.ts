/**
 * Braille translation utility for Spanish text according to Argentine Braille standards
 * and Art. 14 of the Municipal Ordinance: 6-dot matrix (3 rows x 2 columns).
 * 
 * Column 1: Dots 1, 2, 3 (top to bottom)
 * Column 2: Dots 4, 5, 6 (top to bottom)
 */

export interface BrailleCellData {
  char: string;
  brailleChar: string;
  // Dots 1 to 6 indexed 1-6 (true if raised)
  dots: [boolean, boolean, boolean, boolean, boolean, boolean];
  isNumberSign?: boolean;
}

// Map characters to active dot numbers (1-6)
const SPANISH_BRAILLE_MAP: Record<string, number[]> = {
  // Letters
  a: [1],
  b: [1, 2],
  c: [1, 4],
  d: [1, 4, 5],
  e: [1, 5],
  f: [1, 2, 4],
  g: [1, 2, 4, 5],
  h: [1, 2, 5],
  i: [2, 4],
  j: [2, 4, 5],
  k: [1, 3],
  l: [1, 2, 3],
  m: [1, 3, 4],
  n: [1, 3, 4, 5],
  ñ: [1, 2, 4, 5, 6],
  o: [1, 3, 5],
  p: [1, 2, 3, 4],
  q: [1, 2, 3, 4, 5],
  r: [1, 2, 3, 5],
  s: [2, 3, 4],
  t: [2, 3, 4, 5],
  u: [1, 3, 6],
  v: [1, 2, 3, 6],
  w: [2, 4, 5, 6],
  x: [1, 3, 4, 6],
  y: [1, 3, 4, 5, 6],
  z: [1, 3, 5, 6],

  // Accented vowels (Spanish)
  á: [1, 2, 3, 5, 6],
  é: [2, 3, 4, 6],
  í: [3, 4],
  ó: [3, 4, 6],
  ú: [2, 3, 4, 5, 6],
  ü: [1, 2, 5, 6],

  // Digits (represented by letters a-j, preceded by number sign [3,4,5,6])
  '1': [1],
  '2': [1, 2],
  '3': [1, 4],
  '4': [1, 4, 5],
  '5': [1, 5],
  '6': [1, 2, 4],
  '7': [1, 2, 4, 5],
  '8': [1, 2, 5],
  '9': [2, 4],
  '0': [2, 4, 5],

  // Punctuation and symbols
  ' ': [],
  ',': [2],
  ';': [2, 3],
  ':': [2, 5],
  '.': [3],
  '?': [2, 6],
  '!': [2, 3, 5],
  '-': [3, 6],
  '(': [1, 2, 6],
  ')': [3, 4, 5],
  '/': [3, 4],
  '$': [1, 2, 4, 6],
  '+': [2, 3, 5],
  '%': [1, 4, 6],
};

const NUMBER_SIGN_DOTS = [3, 4, 5, 6]; // ⠼

/**
 * Calculates Unicode Braille character from dot numbers.
 * Unicode Braille Pattern Blank is 0x2800.
 * Bit values: Dot 1 = 0x01, Dot 2 = 0x02, Dot 3 = 0x04,
 *             Dot 4 = 0x08, Dot 5 = 0x10, Dot 6 = 0x20.
 */
export function dotsToBrailleChar(dots: number[]): string {
  let code = 0x2800;
  for (const dot of dots) {
    switch (dot) {
      case 1: code |= 0x01; break;
      case 2: code |= 0x02; break;
      case 3: code |= 0x04; break;
      case 4: code |= 0x08; break;
      case 5: code |= 0x10; break;
      case 6: code |= 0x20; break;
    }
  }
  return String.fromCharCode(code);
}

export function dotsToTuple(dots: number[]): [boolean, boolean, boolean, boolean, boolean, boolean] {
  return [
    dots.includes(1),
    dots.includes(2),
    dots.includes(3),
    dots.includes(4),
    dots.includes(5),
    dots.includes(6),
  ];
}

/**
 * Converts Spanish text into a sequence of BrailleCellData objects
 * including the number prefix (⠼) where needed.
 */
export function textToBrailleCells(text: string): BrailleCellData[] {
  const result: BrailleCellData[] = [];
  const normalized = text.toLowerCase();
  let inNumberSequence = false;

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const isDigit = /[0-9]/.test(char);

    if (isDigit && !inNumberSequence) {
      // Add number sign prefix cell
      result.push({
        char: '#',
        brailleChar: dotsToBrailleChar(NUMBER_SIGN_DOTS),
        dots: dotsToTuple(NUMBER_SIGN_DOTS),
        isNumberSign: true,
      });
      inNumberSequence = true;
    } else if (!isDigit && inNumberSequence) {
      inNumberSequence = false;
    }

    const dotList = SPANISH_BRAILLE_MAP[char] ?? [];
    result.push({
      char: text[i] || char,
      brailleChar: dotsToBrailleChar(dotList),
      dots: dotsToTuple(dotList),
    });
  }

  return result;
}

/**
 * Convenience helper to return just the Unicode Braille text string
 */
export function textToBrailleString(text: string): string {
  return textToBrailleCells(text)
    .map((c) => c.brailleChar)
    .join('');
}
