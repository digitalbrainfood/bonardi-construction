// Unsplash placeholder images organized by category
// Replace with real project photos when available

const u = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const heroImages = {
  main: u("photo-1504307651254-35680f356dfd", 1920, 1080),
  overlay: u("photo-1541888946425-d81bb19240f5", 1920, 1080),
};

export const aboutImages = {
  gary: u("photo-1560250097-0b93528c311a", 600, 750), // professional man
  team: u("photo-1581578731548-c64695cc6952", 1200, 600), // construction team
};

export const blogImages = {
  featured: u("photo-1504307651254-35680f356dfd", 1200, 675),
  posts: [
    u("photo-1621905252507-b35492cc74b4", 600, 400), // contractor guide
    u("photo-1558618666-fcd25c85f7e7", 600, 400), // asphalt
    u("photo-1567521464027-f127ff144326", 600, 400), // sidewalk
    u("photo-1600585154340-be6161a56a0c", 600, 400), // waterproofing/basement
    u("photo-1600573472591-ee6981cf81f0", 600, 400), // foundation
    u("photo-1600596542815-611643e8bab4", 600, 400), // hardscaping
  ],
};

// Gallery project images by category
export const galleryImages: Record<string, string[]> = {
  "Asphalt & Paving": [
    u("photo-1558618666-fcd25c85f7e7", 800, 600),
    u("photo-1590496793929-36417d3117de", 800, 600),
    u("photo-1517089596392-fb9a9033e05b", 800, 1000),
    u("photo-1621922688758-1e16a9c0d71a", 800, 600),
  ],
  "Concrete & Masonry": [
    u("photo-1541888946425-d81bb19240f5", 800, 1000),
    u("photo-1504307651254-35680f356dfd", 800, 600),
    u("photo-1587582423116-ec07293f0395", 800, 600),
    u("photo-1621905252507-b35492cc74b4", 800, 1000),
  ],
  "Roofing": [
    u("photo-1632759145351-1d592919f522", 800, 600),
    u("photo-1625722662825-d9b7837a5bf0", 800, 1000),
    u("photo-1600585154340-be6161a56a0c", 800, 600),
    u("photo-1600573472591-ee6981cf81f0", 800, 600),
  ],
  "New Construction": [
    u("photo-1503387762-592deb58ef4e", 800, 1000),
    u("photo-1486406146926-c627a92ad1ab", 800, 600),
    u("photo-1600596542815-611643e8bab4", 800, 600),
    u("photo-1564013799919-ab600027ffc6", 800, 1000),
  ],
  "Hardscaping": [
    u("photo-1600585154526-990dced4db0d", 800, 600),
    u("photo-1600566753190-17f0baa2a6c3", 800, 1000),
    u("photo-1600566753086-00f18fb6b3ea", 800, 600),
    u("photo-1600607687939-ce8a6c25118c", 800, 600),
  ],
  "Restoration": [
    u("photo-1581578731548-c64695cc6952", 800, 600),
    u("photo-1517581177684-1a54ed4f51bf", 800, 1000),
    u("photo-1585128903994-9788298932a5", 800, 600),
    u("photo-1600047509807-ba8f99d2cdde", 800, 600),
  ],
};

// Service page images keyed by slug
export const serviceImages: Record<string, string> = {
  "asphalt": u("photo-1558618666-fcd25c85f7e7", 1200, 675),
  "concrete": u("photo-1504307651254-35680f356dfd", 1200, 675),
  "roofing-services": u("photo-1632759145351-1d592919f522", 1200, 675),
  "masonry-brick-pointing": u("photo-1587582423116-ec07293f0395", 1200, 675),
  "new-construction": u("photo-1503387762-592deb58ef4e", 1200, 675),
  "home-additions-extensions": u("photo-1600585154340-be6161a56a0c", 1200, 675),
  "foundation-repair-restoration": u("photo-1600573472591-ee6981cf81f0", 1200, 675),
  "fire-damage-restoration": u("photo-1585128903994-9788298932a5", 1200, 675),
  "water-and-mold-restoration": u("photo-1517581177684-1a54ed4f51bf", 1200, 675),
  "waterproofing": u("photo-1600047509807-ba8f99d2cdde", 1200, 675),
  "hardscaping": u("photo-1600585154526-990dced4db0d", 1200, 675),
  "demolition": u("photo-1564013799919-ab600027ffc6", 1200, 675),
  "drainage": u("photo-1590496793929-36417d3117de", 1200, 675),
  "excavation": u("photo-1581578731548-c64695cc6952", 1200, 675),
  "construction-management": u("photo-1486406146926-c627a92ad1ab", 1200, 675),
  "office-buildouts": u("photo-1497366216548-37526070297c", 1200, 675),
  "framing": u("photo-1541888946425-d81bb19240f5", 1200, 675),
  "flooring": u("photo-1600607687644-c7171b42498f", 1200, 675),
  "generac-generators": u("photo-1621922688758-1e16a9c0d71a", 1200, 675),
  "sidewalks": u("photo-1567521464027-f127ff144326", 1200, 675),
  "asphalt-sealcoating": u("photo-1517089596392-fb9a9033e05b", 1200, 675),
  "asphalt-milling": u("photo-1590496793929-36417d3117de", 1200, 675),
  "dormer-additions": u("photo-1600596542815-611643e8bab4", 1200, 675),
  "kitchen-remodeling": u("photo-1556909114-f6e7ad7d3136", 1200, 675),
  "bathroom-remodeling": u("photo-1552321554-5fefe8c9ef14", 1200, 675),
  "sheetrock-painting": u("photo-1562259929-b4e1fd3aef09", 1200, 675),
  "masonry-restoration": u("photo-1587582423116-ec07293f0395", 1200, 675),
  "parapet-wall-repair-rebuild": u("photo-1486406146926-c627a92ad1ab", 1200, 675),
  "construction-consultation": u("photo-1560250097-0b93528c311a", 1200, 675),
  "concrete-leveling": u("photo-1504307651254-35680f356dfd", 1200, 675),
  "soil-stabilization": u("photo-1564013799919-ab600027ffc6", 1200, 675),
  "commercial-underpinning": u("photo-1503387762-592deb58ef4e", 1200, 675),
  "commercial-milling-paving": u("photo-1558618666-fcd25c85f7e7", 1200, 675),
  "commercial-parking-lot-maintenance": u("photo-1590496793929-36417d3117de", 1200, 675),
  "concreteblacktop-striping": u("photo-1517089596392-fb9a9033e05b", 1200, 675),
};
