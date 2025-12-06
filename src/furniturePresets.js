export const BED_SIZE_PRESETS = {
  single: { width: 120, height: 200 },
  superSingle: { width: 140, height: 210 },
  king: { width: 180, height: 220 },
};

const COLORS = {
  bed: "#fde68a",
  desk: "#bfdbfe",
  chair: "#bbf7d0",
  closet: "#fecaca",
  drawer: "#e5e7eb",
  table: "#ddd6fe",
};

const PRESETS = {
  bed: { width: 140, height: 210, label: "침대", bedSize: "superSingle" },
  desk: { width: 140, height: 70, label: "책상" },
  chair: { width: 60, height: 60, label: "의자" },
  closet: { width: 100, height: 200, label: "옷장" },
  drawer: { width: 80, height: 90, label: "서랍" },
  table: { width: 120, height: 80, label: "테이블" },
};

const uid = () => "item_" + Math.random().toString(36).slice(2, 10);

export function createFurniture(type) {
  const base = PRESETS[type];

  return {
    id: uid(),
    type,
    label: base.label,
    x: 20,
    y: 20,
    width: base.width,
    height: base.height,
    rotation: 0,
    color: COLORS[type],
    ...(type === "bed" && { bedSize: base.bedSize }),
  };
}
