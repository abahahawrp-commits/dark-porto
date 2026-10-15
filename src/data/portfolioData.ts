export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  year: string;
  colSpan: 7 | 5;
  image: string;
  description: string;
  metrics: string;
  tech: string[];
  liveUrl?: string;
  client?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  col: 1 | 2;
  rotation: string; // e.g. "-rotate-2" or "rotate-3"
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'automotive-motion',
    title: 'Automotive Motion',
    subtitle: 'Real-time 3D vehicle customizer & launch film',
    tag: 'WebGL & Motion',
    year: '2026',
    colSpan: 7,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80',
    description: 'An immersive real-time WebGL configurator and cinematic visual showcase engineered for next-generation electric hypercars. Features photorealistic PBR materials and interactive physics.',
    metrics: '+140% session duration, locked 60fps WebGL pipeline',
    tech: ['Three.js', 'GLSL Shaders', 'GSAP', 'TypeScript', 'WebAudio API'],
    client: 'Apex Automobili',
    liveUrl: 'https://automotive-motion.demo',
  },
  {
    id: 'urban-architecture',
    title: 'Urban Architecture',
    subtitle: 'Monolithic spatial identity & dynamic computational archive',
    tag: 'Spatial Architecture',
    year: '2025',
    colSpan: 5,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'Generative spatial layout system exploring natural light, raw concrete shadow angles, and architectural brutalism across high-density urban environments.',
    metrics: 'Featured in ArchDaily & FastCompany Design Awards',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Canvas2D'],
    client: 'Brutalist Forum International',
    liveUrl: 'https://urban-arch.demo',
  },
  {
    id: 'human-perspective',
    title: 'Human Perspective',
    subtitle: 'Editorial photography platform & interactive archive',
    tag: 'Editorial & Storytelling',
    year: '2025',
    colSpan: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    description: 'Interactive editorial publication platform archiving cross-cultural documentary photography, audio interviews, and tactile long-form narratives.',
    metrics: 'Over 850k monthly active global readers',
    tech: ['Next.js', 'HLS Video', 'Tailwind CSS', 'GSAP ScrollTrigger'],
    client: 'Vanguard Documentary Collective',
    liveUrl: 'https://humanperspective.demo',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    subtitle: 'Visual system, variable typography & design token ecosystem',
    tag: 'Design Systems',
    year: '2026',
    colSpan: 7,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    description: 'End-to-end design token ecosystem, variable font geometry, and modular component library scaled harmoniously across 14 enterprise cloud applications.',
    metrics: 'Reduced design-to-production turnaround by 65%',
    tech: ['Design Tokens', 'Figma API', 'React 19', 'Tailwind CSS v4'],
    client: 'Synthetix Global',
    liveUrl: 'https://brandidentity.demo',
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'invisible-interfaces',
    title: 'The Architecture of Invisible Interfaces',
    date: 'Oct 2026',
    readTime: '4 min read',
    category: 'Interaction Design',
    excerpt: 'Why the most profound user experiences are defined by kinetic subtlety and tactile micro-gestures you never explicitly notice.',
    content: 'When an interface responds with the weight and elasticity of physical matter, cognitive load disappears. We stop interacting with software and start directly manipulating ideas. The transition from flat glass screens to micro-elastic kinetic feedback is reshaping modern design systems.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fluidity-120hz',
    title: 'Latency, Fluidity, and the 120Hz Imperative',
    date: 'Sep 2026',
    readTime: '6 min read',
    category: 'Engineering',
    excerpt: 'Building perception-driven animation engines that harmonize physics simulation with instantaneous tactile response.',
    content: 'Human tactile perception operates in milliseconds. At 120Hz, a 16ms delay feels like dragging a finger through wet sand, whereas sub-5ms spring response feels telepathic. Here is how we architect frame-budgeted rendering loops using GPU transforms and GSAP tick synchronization.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sculpting-dark-mode',
    title: 'Sculpting Dark Mode with Real Radiance',
    date: 'Aug 2026',
    readTime: '5 min read',
    category: 'Color Theory',
    excerpt: 'Moving beyond flat pure blacks into nuanced atmospheric depth, soft specular glares, and tactile contrast.',
    content: 'True deep black (#000000) causes intense optical smearing and harsh contrast fatigue on modern OLED displays. By calibrating deep warm greys (HSL 0 0% 4%) paired with low-opacity specular edge gradients, surfaces gain palpable three-dimensional volume and serenity.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'concept-to-production',
    title: 'Bridging the Chasm Between Concept and Production',
    date: 'Jul 2026',
    readTime: '7 min read',
    category: 'Craft & Engineering',
    excerpt: 'How hybrid designer-engineers eliminate fidelity loss and ship uncompromised artistic vision directly to production.',
    content: 'The traditional handoff model is broken: mockups turn into compromises, and delicate timing curves get flattened into generic easings. When the creator writes code, the vision remains pristine and every nuance survives to reach real users.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  },
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'kinetic-01',
    title: 'Kinetic Geometry 01',
    category: '3D Procedural',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    col: 1,
    rotation: '-rotate-2',
    description: 'Parametric knot topology calculated in real-time GLSL with iridescent subsurface scattering.',
  },
  {
    id: 'acoustic-ui',
    title: 'Acoustic Synthesizer UI',
    category: 'Audio Hardware UI',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    col: 1,
    rotation: 'rotate-3',
    description: 'Tactile matrix patching interface designed for polyphonic analog modular synthesizers.',
  },
  {
    id: 'fluid-refraction',
    title: 'Fluid Dynamics Study',
    category: 'Visual Research',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    col: 1,
    rotation: '-rotate-1',
    description: 'High-viscosity liquid prism simulations rendering dynamic caustic lights on black canvas.',
  },
  {
    id: 'swiss-poster',
    title: 'Monochrome Typographic Poster',
    category: 'Print & Graphic',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    col: 2,
    rotation: 'rotate-2',
    description: 'Strict modernist Swiss grid with custom variable serifs celebrating experimental editorial print.',
  },
  {
    id: 'haptic-knob',
    title: 'Haptic Knob Controller',
    category: 'Physical Computing',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    col: 2,
    rotation: '-rotate-3',
    description: 'Machined bead-blasted aluminum controller with brushless haptic detents for fine scrubbing.',
  },
  {
    id: 'celestial-mesh',
    title: 'Celestial Orbital Mesh',
    category: 'Generative Art',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    col: 2,
    rotation: 'rotate-1',
    description: 'Point cloud volumetric trajectory simulation tracking 100,000 gravitational bodies.',
  },
];

export const STATS: StatItem[] = [
  {
    value: '20+',
    label: 'Years Experience',
    subtext: 'Designing and engineering high-impact digital experiences and products',
  },
  {
    value: '95+',
    label: 'Projects Done',
    subtext: 'From seed prototypes to scalable global systems used by millions',
  },
  {
    value: '200%',
    label: 'Satisfied Clients',
    subtext: 'Longstanding partnerships with founders, design studios, and innovators',
  },
];
