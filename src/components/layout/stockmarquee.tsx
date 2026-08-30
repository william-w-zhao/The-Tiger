"use client";
import { useState, useEffect } from "react";
import type { Stock, MarqueeConfig } from "@/types/stockmarquee";

import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import Marquee from "react-fast-marquee";
import yaml from "js-yaml";

async function loadMarqueeConfig() {
  const res = await fetch("/Stocks.yaml");
  const text = await res.text();
  const parsed = yaml.load(text) as {
    speed?: number;
    pauseOnHover?: boolean;
    direction?: "left" | "right";
    items?: Stock[];
  };

  return {
    speed: parsed?.speed ?? 50,
    pauseOnHover: parsed?.pauseOnHover ?? true,
    direction: parsed?.direction ?? "left",
    items: Array.isArray(parsed?.items) ? parsed.items : [],
  };
}

const MarqueeComponent = ({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) => {
  const negativity = change.trim().startsWith("-");
  const color = negativity ? "text-red-400" : "text-green-400";
  const Icon = negativity ? ArrowTrendingDownIcon : ArrowTrendingUpIcon;

  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <span className="font-bold">{title}</span>
      <span className={`font-bold ${color}`}>{value}</span>
      <span className={color}>{change}</span>
      <Icon className={`w-4 h-4 ${color} shrink-0`} />
    </div>
  );
};

const MarqueeBar = () => {
  const [config, setConfig] = useState<MarqueeConfig | null>(null);

  useEffect(() => {
    loadMarqueeConfig().then(setConfig);
  }, []);

  if (!config) return null;

  return (
    <Marquee
      speed={config.speed}
      pauseOnHover={config.pauseOnHover}
      direction={config.direction}
      className="h-8"
    >
      <div className="flex items-center gap-8 px-4 whitespace-nowrap">
        {(config?.items ?? []).map((item) => (
          <MarqueeComponent key={item.id} {...item} />
        ))}
      </div>
    </Marquee>
  );
};

export default MarqueeBar;
