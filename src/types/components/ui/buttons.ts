export type TButtonType = "button" | "submit";

export interface IProps {
  readonly label?: string;
  readonly type?: TButtonType;
  readonly disabled?: boolean;
}

  