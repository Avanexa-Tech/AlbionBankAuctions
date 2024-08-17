import { useState } from "react";
import { Appearance } from "react-native";

export const IconName = {
  name: 'check-circle',
  check: 'check',
};

export const ColorTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme);
  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });
};

export const ItemFont = {
  fontSize: 14,
};

export const linearGradient = {
  color: ['#FFFFFF', '#FFFFFF'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  style: { flex: 1 },
};