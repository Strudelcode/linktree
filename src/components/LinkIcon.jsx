import React from 'react';
import {
  Youtube,
  Instagram,
  Github,
  Twitter,
  Twitch,
  Linkedin,
  Facebook,
  Mail,
  Globe,
  ShoppingBag,
  Headphones,
  BookOpen,
  Sparkles,
  Heart,
  Coffee,
  Camera,
  Code,
  Send,
  Star,
  User,
  ExternalLink
} from 'lucide-react';

const iconModules = import.meta.glob('../assets/icons/*.{png,jpg,jpeg,svg}', { eager: true });

function getLocalIconUrl(iconKey) {
  if (!iconKey) return null;
  const normKey = iconKey.toLowerCase().replace(/[^a-z0-9]/g, '');

  const keywordMap = {
    globe: ['globe', 'web', 'browser', 'site'],
    twitter: ['twitter', 'x', 'xtwitter'],
    shoppingbag: ['shop', 'store', 'bag', 'merch'],
    bookopen: ['book', 'blog', 'article'],
    headphones: ['podcast', 'audio', 'headphones'],
    coffee: ['coffee', 'buymeacoffee', 'kofi'],
    telegram: ['telegram', 'send', 'tg'],
    patreon: ['patreon', 'star'],
    epic: ['epic', 'epicgames'],
    steam: ['steam'],
    discord: ['discord'],
    instagram: ['instagram'],
    tiktok: ['tiktok'],
    spotify: ['spotify'],
    github: ['github'],
    twitch: ['twitch'],
    youtube: ['youtube']
  };

  const keywords = keywordMap[normKey] || [normKey];

  for (const [path, mod] of Object.entries(iconModules)) {
    const cleanPath = path.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const kw of keywords) {
      if (cleanPath.includes(kw)) {
        return mod.default || mod;
      }
    }
  }
  return null;
}

/**
 * Auto-detect matching icon based on entered URL
 */
export function detectIconFromUrl(url = '') {
  const norm = url.trim().toLowerCase();
  if (!norm) return null;

  if (norm.includes('youtube.com') || norm.includes('youtu.be')) return 'youtube';
  if (norm.includes('instagram.com')) return 'instagram';
  if (norm.includes('tiktok.com')) return 'tiktok';
  if (norm.includes('spotify.com') || norm.includes('open.spotify.com')) return 'spotify';
  if (norm.includes('github.com')) return 'github';
  if (norm.includes('twitter.com') || norm.includes('x.com')) return 'twitter';
  if (norm.includes('twitch.tv')) return 'twitch';
  if (norm.includes('discord.gg') || norm.includes('discord.com')) return 'discord';
  if (norm.includes('steamcommunity.com') || norm.includes('steampowered.com')) return 'steam';
  if (norm.includes('epicgames.com') || norm.includes('epicgames')) return 'epic';
  if (norm.includes('linkedin.com')) return 'linkedin';
  if (norm.includes('facebook.com') || norm.includes('fb.com')) return 'facebook';
  if (norm.includes('t.me') || norm.includes('telegram.me')) return 'telegram';
  if (norm.includes('patreon.com')) return 'patreon';
  if (norm.includes('buymeacoffee.com') || norm.includes('ko-fi.com')) return 'coffee';
  if (norm.startsWith('mailto:')) return 'mail';
  if (norm.includes('shop') || norm.includes('store') || norm.includes('merch') || norm.includes('etsy.com') || norm.includes('gumroad.com')) return 'shopping-bag';
  if (norm.includes('medium.com') || norm.includes('substack.com') || norm.includes('blog')) return 'book-open';
  if (norm.includes('podcast') || norm.includes('apple.com/podcast') || norm.includes('anchor.fm')) return 'headphones';

  return 'globe';
}

/**
 * Universal Link Icon Renderer
 */
export function LinkIcon({
  link,
  userAvatarUrl = '',
  userDisplayName = '',
  size = 18,
  className = ''
}) {
  if (!link) return null;

  // 1. User Avatar option
  if (link.iconType === 'avatar') {
    if (userAvatarUrl) {
      return (
        <img
          src={userAvatarUrl}
          alt="Avatar icon"
          className={`link-icon-avatar-img ${className}`}
          style={{ width: size + 4, height: size + 4, borderRadius: '50%', objectFit: 'cover' }}
        />
      );
    }
    return (
      <div
        className={`link-icon-avatar-fallback ${className}`}
        style={{
          width: size + 4,
          height: size + 4,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          fontSize: Math.max(10, size - 6),
          fontWeight: 'bold',
          background: 'rgba(0,0,0,0.15)',
          color: 'inherit'
        }}
      >
        {(userDisplayName || 'L').slice(0, 1).toUpperCase()}
      </div>
    );
  }

  // 2. Custom Uploaded Icon / Image
  if (link.iconType === 'custom' && link.customIconUrl) {
    return (
      <img
        src={link.customIconUrl}
        alt={link.title || 'Link icon'}
        className={`link-icon-custom-img ${className}`}
        style={{
          width: size + 4,
          height: size + 4,
          borderRadius: '6px',
          objectFit: 'cover'
        }}
      />
    );
  }

  // 3. Explicit or Auto Standard Icon
  const iconKey = link.icon || detectIconFromUrl(link.url) || 'globe';

  // Check if local PNG/image exists in assets/icons
  const localIconUrl = getLocalIconUrl(iconKey);
  if (localIconUrl) {
    return (
      <img
        src={localIconUrl}
        alt={iconKey}
        className={`link-icon-local-img ${className}`}
        style={{
          width: size + 4,
          height: size + 4,
          borderRadius: '4px',
          objectFit: 'contain'
        }}
      />
    );
  }

  // Fallback to Lucide Icons mapping if no local PNG found
  const iconProps = { size, className: `link-icon-lucide ${className}` };

  switch (iconKey) {
    case 'youtube':
      return <Youtube {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    case 'github':
      return <Github {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'twitch':
      return <Twitch {...iconProps} />;
    case 'linkedin':
      return <Linkedin {...iconProps} />;
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'mail':
      return <Mail {...iconProps} />;
    case 'shopping-bag':
      return <ShoppingBag {...iconProps} />;
    case 'headphones':
      return <Headphones {...iconProps} />;
    case 'book-open':
      return <BookOpen {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'heart':
      return <Heart {...iconProps} />;
    case 'coffee':
      return <Coffee {...iconProps} />;
    case 'camera':
      return <Camera {...iconProps} />;
    case 'code':
      return <Code {...iconProps} />;
    case 'telegram':
      return <Send {...iconProps} />;
    case 'patreon':
      return <Star {...iconProps} />;
    case 'globe':
    default:
      return <Globe {...iconProps} />;
  }
}
