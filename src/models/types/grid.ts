export type RGBColor = `rgb(${number}, ${number}, ${number})`;

export type GridCell = {
  row: number;
  column: number;
} & (
  | {
      color: string | null;
      isColorPicker: false;
    }
  | {
      colorPicker: RGBColor;
      isColorPicker: true;
    }
);