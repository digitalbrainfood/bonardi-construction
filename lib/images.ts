// Bonardi Construction project photos.
// Web-optimized copies live in /public/images/web (generated from the raw
// project folders under /public/images, which are excluded from git due to size).
// Unsplash placeholders remain only for services without real photos yet.

const u = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const local = (p: string) => `/images/web/${p}`;

const series = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) =>
    local(`${folder}/${String(i + 1).padStart(2, "0")}.jpg`)
  );

export const heroImages = {
  main: local("hero/hero-1.jpg"),
  overlay: local("hero/hero-2.jpg"),
};

export const blogImages = {
  featured: local("hero/hero-2.jpg"),
  posts: [
    u("photo-1621905252507-b35492cc74b4", 600, 400), // contractor guide
    local("asphalt-commercial/01.jpg"), // asphalt
    u("photo-1567521464027-f127ff144326", 600, 400), // sidewalk
    u("photo-1600585154340-be6161a56a0c", 600, 400), // waterproofing/basement
    u("photo-1600573472591-ee6981cf81f0", 600, 400), // foundation
    u("photo-1600596542815-611643e8bab4", 600, 400), // hardscaping
  ],
};

// Gallery project images by category — all real Bonardi project photos
export const galleryImages: Record<string, string[]> = {
  "Commercial Paving": series("asphalt-commercial", 10),
  "Residential Paving": series("asphalt-residential", 8),
  "Roofing": series("roofing", 8),
  "Office Buildouts": series("office-buildouts", 8),
  "Home Extensions": series("home-extensions", 6),
  "Drainage & Drywells": series("drainage", 2),
  "Commercial Projects": series("commercial", 8),
};

// Human-friendly project titles per gallery category
export const galleryTitles: Record<string, string> = {
  "Commercial Paving": "Commercial Milling & Paving",
  "Residential Paving": "Residential Driveway & Paving",
  "Roofing": "Residential Roofing",
  "Office Buildouts": "Commercial Office Buildout",
  "Home Extensions": "Home Addition & Extension",
  "Drainage & Drywells": "Drywell & Drainage Installation",
  "Commercial Projects": "Commercial Construction",
};

// Service page images keyed by slug — real photos where we have them
export const serviceImages: Record<string, string> = {
  "asphalt": local("asphalt-residential/01.jpg"),
  "concrete": u("photo-1504307651254-35680f356dfd", 1200, 675),
  "roofing-services": local("roofing/01.jpg"),
  "masonry-brick-pointing": u("photo-1587582423116-ec07293f0395", 1200, 675),
  "new-construction": local("home-extensions/02.jpg"),
  "home-additions-extensions": local("home-extensions/01.jpg"),
  "foundation-repair-restoration": u("photo-1600573472591-ee6981cf81f0", 1200, 675),
  "fire-damage-restoration": u("photo-1585128903994-9788298932a5", 1200, 675),
  "water-and-mold-restoration": u("photo-1517581177684-1a54ed4f51bf", 1200, 675),
  "waterproofing": u("photo-1600047509807-ba8f99d2cdde", 1200, 675),
  "hardscaping": u("photo-1600585154526-990dced4db0d", 1200, 675),
  "demolition": u("photo-1564013799919-ab600027ffc6", 1200, 675),
  "drainage": local("drainage/01.jpg"),
  "excavation": local("drainage/02.jpg"),
  "construction-management": local("commercial/03.jpg"),
  "office-buildouts": local("office-buildouts/01.jpg"),
  "framing": local("home-extensions/04.jpg"),
  "flooring": u("photo-1600607687644-c7171b42498f", 1200, 675),
  "generac-generators": u("photo-1621922688758-1e16a9c0d71a", 1200, 675),
  "sidewalks": u("photo-1567521464027-f127ff144326", 1200, 675),
  "asphalt-sealcoating": local("asphalt-residential/04.jpg"),
  "asphalt-milling": local("asphalt-commercial/05.jpg"),
  "dormer-additions": local("home-extensions/03.jpg"),
  "kitchen-remodeling": u("photo-1556909114-f6e7ad7d3136", 1200, 675),
  "bathroom-remodeling": u("photo-1552321554-5fefe8c9ef14", 1200, 675),
  "sheetrock-painting": u("photo-1562259929-b4e1fd3aef09", 1200, 675),
  "masonry-restoration": u("photo-1587582423116-ec07293f0395", 1200, 675),
  "parapet-wall-repair-rebuild": u("photo-1486406146926-c627a92ad1ab", 1200, 675),
  "construction-consultation": local("commercial/04.jpg"),
  "concrete-leveling": u("photo-1504307651254-35680f356dfd", 1200, 675),
  "soil-stabilization": local("drainage/01.jpg"),
  "commercial-milling-paving": local("asphalt-commercial/03.jpg"),
  "commercial-parking-lot-maintenance": local("asphalt-commercial/07.jpg"),
  "concreteblacktop-striping": local("asphalt-commercial/02.jpg"),
};
