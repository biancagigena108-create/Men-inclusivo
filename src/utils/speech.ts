/**
 * Web Speech API synthesizer for Spanish reading accessibility
 */

class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private onStateChangeListeners: Array<(speaking: boolean, text: string) => void> = [];
  private currentText = '';

  public subscribe(listener: (speaking: boolean, text: string) => void): () => void {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isSpeaking = speaking;
    this.currentText = text;
    this.onStateChangeListeners.forEach((l) => l(speaking, text));
  }

  public speak(text: string, rate: number = 0.95): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        resolve();
        return;
      }

      // Stop previous utterance
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-AR'; // Preferred Spanish Argentine
      utterance.rate = Math.max(0.6, Math.min(1.4, rate));
      utterance.pitch = 1.0;

      // Select a Spanish voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) => v.lang.startsWith('es-AR') || v.lang.startsWith('es-419') || v.lang.startsWith('es')
      );
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onstart = () => {
        this.notify(true, text);
      };

      utterance.onend = () => {
        this.notify(false, '');
        resolve();
      };

      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        this.notify(false, '');
        resolve();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  public stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
    this.notify(false, '');
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getCurrentText(): string {
    return this.currentText;
  }
}

export const speechService = new SpeechService();
