let creating: any;

const hasOffscreenDocument = async (offscreenPath: string) => {
   const matchedClients = await clients.matchAll();
   for (const client of matchedClients) {
      if (client.url === offscreenPath) return true
   }
   return false;
}

export const setupOffscreen = async (path: string) => {
   const offscreenUrl = chrome.runtime.getURL(path);

   if (await hasOffscreenDocument(offscreenUrl)) return;

   if (creating) {
      await creating;
   } else {
      creating = await chrome.offscreen.createDocument({
         url: path,
         reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
         justification: 'Start audio'
      })
      creating = null;
   }
}