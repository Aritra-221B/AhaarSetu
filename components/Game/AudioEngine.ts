export class AudioEngine {
    private audioContext: AudioContext;
    private buffers: Map<string, AudioBuffer> = new Map();
  
    constructor() {
      this.audioContext = new window.AudioContext();
    }
  
    resume() {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    }
  
    async loadSounds(soundMap: { [note: string]: string }) {
      console.log('Attempting to load sounds with map:', soundMap);
      for (const note in soundMap) {
        const url = soundMap[note];
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
          this.buffers.set(note, audioBuffer);
          console.log(`Successfully loaded sound: ${note}`);
        } catch (error) {
          console.error(`Error loading sound for note ${note} from URL ${url}:`, error);
        }
      }
    }
  
    playSound(note: string) {
      this.resume(); // Ensure context is resumed before playing
      const buffer = this.buffers.get(note);
      if (buffer) {
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        console.log(`Playing sound: ${note}`);
      } else {
        console.warn(`Sound buffer not found for note: ${note}`);
      }
    }
  
    playChord(notes: string[]) {
      this.resume(); // Ensure context is resumed before playing
      console.log('Playing chord with individual notes:', notes);
      for (const note of notes) {
        this.playSound(note);
      }
    }

  public getAudioContext() {
    return this.audioContext;
  }

  public playChordFile(chordName: string) {
    this.resume(); // Ensure context is resumed before playing
    console.log('Attempting to play chord file:', chordName);
    const buffer = this.buffers.get(chordName);
    if (buffer) {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);
      console.log(`Playing chord file: ${chordName}`);
    } else {
      console.warn(`Chord file buffer not found for: ${chordName}. This might indicate a loading issue or incorrect filename.`);
    }
  }
  }
     