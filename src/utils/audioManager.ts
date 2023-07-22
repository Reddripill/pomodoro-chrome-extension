/* let audioCtx: AudioContext;
let audioSource: AudioBufferSourceNode;

const initializeAudio = () => {
   audioCtx = new (window.AudioContext || window.webkitAudioContext)()
}

const decodeAudio = async (audioData: ArrayBuffer) => {
   const decodedData = await audioCtx.decodeAudioData(audioData);
   audioSource = audioCtx.createBufferSource();
   audioSource.buffer = decodedData;
   audioSource.connect(audioCtx.destination)
}

const fetchAndStartAudio = async () => {
   try {
      const response = await fetch('./audio/mainSound.mp3');
      const buffer = await response.arrayBuffer();
      if(!audioCtx) {
         initializeAudio()
      }
      decodeAudio(buffer);
      audioSource.start()
   } catch(err) {
      console.error('Error loading audio: ', err);
   }
}

const playAudio = () => {
   if (!audioCtx) {
      initializeAudio()
   }

   if (!audioSource) {
      fetchAndStartAudio()
   }
   audioSource.start()
}

const stopAudio = () => {
   if (audioSource && audioCtx.state === 'running') {
      audioSource.stop()
   }
} */