/**
 * Configuration options for the component.
 */
export interface ComponentConfig {
  /**
   * The HTML tag for the component.
   */
  tag: string;

  /**
   * The URL to the component's CSS file (optional).
   */
  styleUrl?: string;

  /**
   * Indicates whether to use shadow DOM (optional).
   */
  shadow?: boolean;
}
