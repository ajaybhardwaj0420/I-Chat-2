export const WALLPAPER_SECTIONS = [
  { id: "nature", title: "Nature" },
  { id: "landscapes", title: "Landscapes" },
];

export const WALLPAPERS = [
  {
    id: "sonoma-horizon",
    label: "Sonoma Horizon",
    category: "nature",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "mountain-lake",
    label: "Mountain Lake",
    category: "landscapes",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "alpine-evening",
    label: "Alpine Evening",
    category: "landscapes",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
  },
];

export function getWallpaperById(id) {
  return WALLPAPERS.find((wallpaper) => wallpaper.id === id) || WALLPAPERS[0];
}

export function frameStyleFromUrl(url) {
  return {
    backgroundImage: `linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 35%)), url("${url}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  };
}
