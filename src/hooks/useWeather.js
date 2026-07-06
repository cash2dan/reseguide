import { useState, useEffect } from "react";

// Simple in-memory cache for the session so we don't refetch the same day.
const cache = {};

export function useWeather(coords, iso) {
  const [state, setState] = useState({ loading: false, data: null });

  useEffect(() => {
    if (!coords || !iso) return;

    const target = new Date(iso + "T12:00:00");
    const now = new Date();
    const diffDays = Math.floor((target - now) / 86400000);
    // Open-Meteo forecast covers ~16 days ahead. Skip out-of-range dates.
    if (diffDays < -1 || diffDays > 15) {
      setState({ loading: false, data: null });
      return;
    }

    const key = `${coords[0]},${coords[1]},${iso}`;
    if (cache[key]) {
      setState({ loading: false, data: cache[key] });
      return;
    }

    let cancelled = false;
    setState({ loading: true, data: null });

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto` +
      `&start_date=${iso}&end_date=${iso}`;

    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        const d = j && j.daily;
        if (!d || !d.time || !d.time.length) {
          setState({ loading: false, data: null });
          return;
        }
        const data = {
          code: d.weather_code[0],
          tmax: Math.round(d.temperature_2m_max[0]),
          tmin: Math.round(d.temperature_2m_min[0]),
        };
        cache[key] = data;
        setState({ loading: false, data });
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [coords && coords[0], coords && coords[1], iso]);

  return state;
}
