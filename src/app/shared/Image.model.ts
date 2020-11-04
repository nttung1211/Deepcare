export class Image {
  formats?: {
    large?: { url?: string },
    medium?: { url?: string },
    small?: { url?: string },
    thumbnail?: { url?: string }
  };
  url?: string
}