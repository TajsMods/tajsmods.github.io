/**
 * Mods Registry - Single source of truth for all mod data
 * This file powers:
 * - Homepage featured mods
 * - /mods directory listing
 * - /mods/<slug> detail pages
 * - Navigation and footer links
 */

export type ModStatus = 'stable' | 'beta' | 'wip';

export interface ModLink {
  type: 'steam' | 'github' | 'docs' | 'issues' | 'discord' | 'modio' | 'website';
  url: string;
  label?: string;
}

export interface Mod {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  status: ModStatus;
  tags: string[];
  links: ModLink[];
  version?: string;
  updatedAt?: string; // ISO date string
  heroImage?: string;
  logo?: string;
  screenshots?: string[];
  features?: string[];
  installInstructions?: string;
  compatibility?: string[];
  knownIssues?: string[];
  featured?: boolean;
  game?: string;
}

// Status display configuration
export const statusConfig = {
  stable: { label: 'Stable', color: 'green', bgClass: 'bg-green-500/10 text-green-600 dark:text-green-400' },
  beta: { label: 'Beta', color: 'yellow', bgClass: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' },
  wip: { label: 'Work in Progress', color: 'orange', bgClass: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
} as const;

/**
 * Tag categories for filtering and display
 * Can be used to add icons/colors to tag chips in the UI
 * Future enhancement: Use these in ModCard and filter UI for visual consistency
 */
export const tagCategories = {
  'QoL': { icon: '✨', color: 'blue' },
  'UI': { icon: '🎨', color: 'purple' },
  'Utility': { icon: '🔧', color: 'green' },
  'Graphics': { icon: '🖼️', color: 'pink' },
  'Gameplay': { icon: '🎮', color: 'orange' },
  'Debug': { icon: '🐛', color: 'gray' },
  'Tools': { icon: '⚙️', color: 'slate' },
} as const;

/**
 * The mods registry
 * Add new mods here - they will automatically appear on all relevant pages
 */
export const mods: Mod[] = [
  {
    slug: 'tajs-mod',
    name: "Taj's Mod",
    shortDescription: 'A growing collection of Utility / QoL + Visual Tweaks for Upload Labs, without overhauling the core gameplay loop.',
    longDescription: `Taj's Mod is a comprehensive quality-of-life enhancement mod for Upload Labs. It provides a wide range of features designed to improve your gameplay experience without fundamentally changing the game's core mechanics.

From the Command Palette for quick access to any feature, to customizable group patterns and wire colors, Taj's Mod focuses on making your experience smoother and more enjoyable.`,
    status: 'stable',
    tags: ['QoL', 'UI', 'Utility', 'Gameplay'],
    links: [
      { type: 'steam', url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3628222709', label: 'Steam Workshop' },
      { type: 'github', url: 'https://github.com/TajemnikTV/TajsMod', label: 'GitHub' },
      { type: 'docs', url: '/docs/', label: 'Documentation' },
      { type: 'issues', url: 'https://github.com/TajemnikTV/TajsMod/issues', label: 'Report Issues' },
      { type: 'discord', url: 'https://discord.gg/enigmadev', label: 'Discord' },
    ],
    version: '0.1.0',
    updatedAt: '2025-01-01',
    heroImage: '/brand/TajsModHeader.png',
    logo: '/brand/TajsModLogo.png',
    screenshots: [
      '/screenshots/command-palette.png',
      '/screenshots/settings-panel.png',
    ],
    features: [
      'Command Palette - Quick access to commands with fuzzy search',
      'Mod Settings Panel - Comprehensive configuration UI',
      'Toast History - Never miss notifications',
      'Mute on Focus Loss - Auto-mute when tabbed out',
      'Smart Screenshots - High-quality capture with options',
      'Group Node Patterns - Custom visual patterns',
      'Wire Colors - Customize wire appearance',
      'Disconnected Node Highlighter - Find unconnected nodes',
      'Wire Drop Menu - Quick node spawning',
      'Sticky Notes - Canvas organization tools',
      'Buy Max Button - Smart upgrade purchases',
      'Node Limit Control - Increase or remove limits',
    ],
    installInstructions: 'Subscribe on the Steam Workshop for automatic installation and updates. The mod will be enabled automatically when you launch Upload Labs.',
    compatibility: [
      'Compatible with the latest version of Upload Labs',
      'Works with most other mods',
      'Some features may conflict with mods that modify the same systems',
    ],
    knownIssues: [
      'Some features require a game restart to take effect',
    ],
    featured: true,
    game: 'Upload Labs',
  },
  // Add more mods here as they become available
  // Example structure for a new mod:
  // {
  //   slug: 'another-mod',
  //   name: 'Another Mod',
  //   shortDescription: 'Description here',
  //   status: 'wip',
  //   tags: ['QoL'],
  //   links: [],
  //   featured: false,
  // },
];

/**
 * Get all featured mods
 */
export function getFeaturedMods(): Mod[] {
  return mods.filter(mod => mod.featured);
}

/**
 * Get a mod by its slug
 */
export function getModBySlug(slug: string): Mod | undefined {
  return mods.find(mod => mod.slug === slug);
}

/**
 * Get mods by tag
 */
export function getModsByTag(tag: string): Mod[] {
  return mods.filter(mod => mod.tags.includes(tag));
}

/**
 * Get all unique tags from all mods
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  mods.forEach(mod => mod.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

/**
 * Get all unique games from all mods
 */
export function getAllGames(): string[] {
  const games = new Set<string>();
  mods.forEach(mod => {
    if (mod.game) games.add(mod.game);
  });
  return Array.from(games).sort();
}

/**
 * Search mods by query
 */
export function searchMods(query: string): Mod[] {
  const q = query.toLowerCase();
  return mods.filter(mod =>
    mod.name.toLowerCase().includes(q) ||
    mod.shortDescription.toLowerCase().includes(q) ||
    mod.tags.some(t => t.toLowerCase().includes(q))
  );
}

/**
 * Sort mods by different criteria
 */
export function sortMods(modsToSort: Mod[], sortBy: 'name' | 'updated' | 'status'): Mod[] {
  return [...modsToSort].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'updated':
        return (b.updatedAt || '').localeCompare(a.updatedAt || '');
      case 'status':
        const statusOrder = { stable: 0, beta: 1, wip: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });
}

/**
 * Get related mods based on shared tags
 */
export function getRelatedMods(mod: Mod, limit = 3): Mod[] {
  return mods
    .filter(m => m.slug !== mod.slug)
    .map(m => ({
      mod: m,
      score: m.tags.filter(t => mod.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ mod }) => mod);
}
