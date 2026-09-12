/**
 * Client-computed label based on total assets value (computed on-device only).
 * The server stores only the tier label — never asset amounts or balances.
 */
export enum WealthTier {
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
  Ruby = 'ruby',
  Sapphire = 'sapphire',
  Jade = 'jade',
}

export const WEALTH_TIER_ORDER: WealthTier[] = [
  WealthTier.Gold,
  WealthTier.Platinum,
  WealthTier.Diamond,
  WealthTier.Ruby,
  WealthTier.Sapphire,
  WealthTier.Jade,
];
