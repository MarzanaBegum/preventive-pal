export function getExtension(filename: string) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isImage(filename: string) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'png':
    case 'webp':
    case 'svg':
      return true;
  }
  return false;
}

export function isVideo(filename: string) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
    case 'webm':
    case 'flv':
      return true;
  }
  return false;
}

export const isEmbedded = (v: string) =>
  typeof v === 'string' &&
  (v.startsWith('https://www.youtube.com') ||
    v.startsWith('https://player.vimeo.com'));
