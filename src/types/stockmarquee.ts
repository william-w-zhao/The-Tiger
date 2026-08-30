export type Stock = {
  id: number, 
  title: string,
  value: string,
  change: string,
};

export type MarqueeConfig = {
    speed: number,
    pauseOnHover: boolean,
    direction: "left" | "right",
    items: Stock[]
};