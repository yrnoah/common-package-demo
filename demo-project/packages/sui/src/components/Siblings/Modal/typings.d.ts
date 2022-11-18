export interface ISuiModalProps {
  open?: boolean;
  /** content */
  children?: React.ReactNode;
  /** click function on click background layer */
  onBGClick?: () => void;
  /**
   * cancel background layer
   * @default false
   */
  disableBG?: boolean;
  /**
   * which root div will be considered as modal's parent
   * @default SuiModalPortalID "sui-modals"
   */
  portalID?: string;
  /**
   * display & dismiss animation duration
   * @unit million seconds
   * @default 200
   */
  duration?: number;
  style?: React.CSSProperties;
  backgroundStyle?: React.CSSProperties;
}
