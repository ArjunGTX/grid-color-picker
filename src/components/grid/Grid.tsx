import React, { useMemo, useState } from "react";
import { GridCell, RGBColor } from "../../models/types";
import { Cell } from "../cell/Cell";
import styles from "./Grid.module.css";

export const Grid = () => {
  const [dimension, setDimension] = useState(10);

  const [grid, setGrid] = useState<GridCell[][]>([]);

  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);

  const gridStyles = useMemo(() => {
    return {
      gridTemplateColumns: `repeat(${grid.length},1fr)`,
      gridTemplateRows: `repeat(${grid.length},1fr)`,
    };
  }, [grid.length]);

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDimension(+e.target.value);
  };

  const getRandomRGB = () => {
    return Math.floor(Math.random() * 256);
  };

  const handleCreateGrid = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const grid: GridCell[][] = [];
    for (let i = 0; i < dimension; i++) {
      const row: GridCell[] = [];
      for (let j = 0; j < dimension; j++) {
        let cell: GridCell;
        if (i === dimension - 1) {
          const red = getRandomRGB();
          const green = getRandomRGB();
          const blue = getRandomRGB();
          cell = {
            column: j,
            row: i,
            isColorPicker: true,
            colorPicker: `rgb(${red}, ${green}, ${blue})`,
          };
        } else {
          cell = {
            row: i,
            column: j,
            isColorPicker: false,
            color: null,
          };
        }
        row.push(cell);
      }
      grid.push(row);
    }
    setGrid(grid);
  };

  const updateCellColor = (cell: GridCell, color: RGBColor) => {
    setGrid((grid) =>
      grid.map((row, index) =>
        index === cell.row
          ? row.map((column, index) =>
              index === cell.column
                ? {
                    ...column,
                    color,
                  }
                : column
            )
          : row
      )
    );
  };

  const handleCellClick = (cell: GridCell) => {
    if (cell.isColorPicker) {
      setSelectedCell(cell);
    } else {
      if (selectedCell?.isColorPicker) {
        updateCellColor(cell, selectedCell.colorPicker);
      }
    }
  };

  const handleDrop = (color: RGBColor, cell: GridCell) => {
    if (cell.isColorPicker) return;
    updateCellColor(cell, color);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateGrid}>
        <input
          type="number"
          className={styles.input}
          inputMode="numeric"
          placeholder="Enter dimension of Grid"
          value={dimension === 0 ? "" : dimension}
          onChange={handleDimensionChange}
        />
        <button className={styles.button}>CREATE GRID</button>
      </form>
      <div style={gridStyles} className={styles.grid}>
        {grid.map((item, row) => (
          <React.Fragment key={row}>
            {item.map((cell, column) => (
              <Cell
                onDrop={handleDrop}
                cell={cell}
                isSelected={
                  selectedCell?.column === column && selectedCell.row === row
                }
                onClick={handleCellClick}
                key={column}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
