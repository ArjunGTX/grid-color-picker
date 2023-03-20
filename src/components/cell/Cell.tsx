import React, { useState } from "react";
import { GridCell, RGBColor } from "../../models/types";
import styles from "./Cell.module.css";

interface Props {
  cell: GridCell;
  isSelected: boolean;
  onClick: (cell: GridCell) => void;
  onDrop: (color: RGBColor, cell: GridCell) => void;
}

export const Cell: React.FC<Props> = ({
  cell,
  isSelected,
  onClick,
  onDrop,
}) => {
  const [shouldHighlight, setShouldHighlight] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!cell.isColorPicker) return;
    e.dataTransfer.setData("text/plain", cell.colorPicker);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!cell.isColorPicker) {
      setShouldHighlight(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShouldHighlight(false);
    const color = e.dataTransfer.getData("text/plain");
    onDrop(color as RGBColor, cell);
  };

  const handleDragLeave = () => {
    setShouldHighlight(false);
  };

  return (
    <div
      draggable={cell.isColorPicker}
      style={{
        backgroundColor: cell.isColorPicker
          ? cell.colorPicker
          : cell.color ?? "#ffffff",
      }}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => onClick(cell)}
      className={`${styles.cell} ${
        isSelected || shouldHighlight ? styles.highlight : ""
      }`}
      key={cell.column}
    ></div>
  );
};
