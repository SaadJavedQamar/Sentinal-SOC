import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function ThreatMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll("*").remove();

    // Simple world map dots representation
    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.5]);

    // Mock map data (dots)
    const dots = [];
    for (let i = 0; i < 500; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lng = (Math.random() - 0.5) * 360;
      dots.push({ lat, lng });
    }

    svg.append("g")
      .selectAll("circle")
      .data(dots)
      .enter()
      .append("circle")
      .attr("cx", d => projection([d.lng, d.lat])?.[0] || 0)
      .attr("cy", d => projection([d.lng, d.lat])?.[1] || 0)
      .attr("r", 1)
      .attr("fill", "#27272a")
      .attr("opacity", 0.5);

    // Active threats
    const threats = [
      { lng: -74.006, lat: 40.7128, intensity: 5, label: 'New York' },
      { lng: 139.6503, lat: 35.6762, intensity: 8, label: 'Tokyo' },
      { lng: -0.1278, lat: 51.5074, intensity: 3, label: 'London' },
      { lng: 103.8198, lat: 1.3521, intensity: 6, label: 'Singapore' },
      { lng: 37.6173, lat: 55.7558, intensity: 10, label: 'Moscow' },
    ];

    const threatGroups = svg.append("g")
      .selectAll("g")
      .data(threats)
      .enter()
      .append("g");

    threatGroups.append("circle")
      .attr("cx", d => projection([d.lng, d.lat])?.[0] || 0)
      .attr("cy", d => projection([d.lng, d.lat])?.[1] || 0)
      .attr("r", d => d.intensity * 2)
      .attr("fill", "#ef4444")
      .attr("opacity", 0.2)
      .append("animate")
      .attr("attributeName", "r")
      .attr("values", d => `${d.intensity * 2};${d.intensity * 4};${d.intensity * 2}`)
      .attr("dur", "2s")
      .attr("repeatCount", "indefinite");

    threatGroups.append("circle")
      .attr("cx", d => projection([d.lng, d.lat])?.[0] || 0)
      .attr("cy", d => projection([d.lng, d.lat])?.[1] || 0)
      .attr("r", 2)
      .attr("fill", "#ef4444");

  }, []);

  return (
    <div className="glass-panel h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-soc-border flex justify-between items-center bg-zinc-900/30">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Global Threat Landscape</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-soc-critical" />
            <span className="text-[10px] uppercase font-bold text-zinc-500">High Intensity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-soc-accent" />
            <span className="text-[10px] uppercase font-bold text-zinc-500">Normal Traffic</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <svg ref={svgRef} className="w-full h-full" />
        <div className="absolute bottom-4 left-4 p-3 bg-soc-bg/80 border border-soc-border rounded-lg backdrop-blur-sm">
          <p className="text-[10px] font-mono text-zinc-500 mb-1">LIVE FEED</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-soc-critical font-bold">CRITICAL</span>
              <span className="text-zinc-400">Inbound from 185.x.x.x</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-soc-high font-bold">HIGH</span>
              <span className="text-zinc-400">Port scan detected (US-WEST)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
