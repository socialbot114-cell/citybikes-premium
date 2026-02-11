import axios from 'axios';
import type { WeatherCondition, AirQuality, Earthquake, ChargeStation, POI } from '../types';

// Open-Meteo API
const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1';
const AIR_QUALITY_BASE = 'https://air-quality-api.open-meteo.com/v1';

// USGS Earthquake API
const USGS_BASE = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';

// Open Charge Map API (Using Keyless access for now if possible, otherwise placeholder)
const OCM_BASE = 'https://api.openchargemap.io/v3/poi';

// Overpass API (OSM)
const OVERPASS_BASE = 'https://overpass-api.de/api/interpreter';

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherCondition> => {
    const url = `${OPEN_METEO_BASE}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation,windspeed_10m`;
    const response = await axios.get(url);
    const { current_weather } = response.data;

    const getWeatherDescription = (code: number) => {
        if (code === 0) return 'Clear Sky';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 55) return 'Drizzle';
        if (code <= 65) return 'Rainy';
        if (code <= 75) return 'Snowy';
        if (code <= 82) return 'Rain Showers';
        return 'Stormy';
    };

    return {
        temperature: current_weather.temperature,
        windSpeed: current_weather.windspeed,
        precipitation: 0,
        description: getWeatherDescription(current_weather.weathercode),
        icon: `weather-${current_weather.weathercode}`,
        timestamp: current_weather.time
    };
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQuality> => {
    const url = `${AIR_QUALITY_BASE}/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone`;
    const response = await axios.get(url);
    const { current } = response.data;

    const getAqiLabel = (pm25: number) => {
        if (pm25 <= 12) return 'Healthy Area';
        if (pm25 <= 35) return 'Sensitive Alert';
        if (pm25 <= 55) return 'Unhealthy Air';
        return 'Hazardous';
    };

    return {
        aqi: Math.round(current.pm2_5),
        pm2_5: current.pm2_5,
        pm10: current.pm10,
        co: current.carbon_monoxide,
        no2: current.nitrogen_dioxide,
        o3: current.ozone,
        label: getAqiLabel(current.pm2_5)
    };
};

export const fetchRecentEarthquakes = async (): Promise<Earthquake[]> => {
    const url = `${USGS_BASE}/2.5_day.geojson`;
    const response = await axios.get(url);

    return response.data.features.map((f: any) => ({
        id: f.id,
        place: f.properties.place,
        magnitude: f.properties.mag,
        time: f.properties.time,
        latitude: f.geometry.coordinates[1],
        longitude: f.geometry.coordinates[0],
        depth: f.geometry.coordinates[2],
        alert: f.properties.alert,
        tsunami: f.properties.tsunami === 1
    }));
};

export const fetchChargeStations = async (lat: number, lon: number, dist: number = 10): Promise<ChargeStation[]> => {
    const url = `${OCM_BASE}/?output=json&latitude=${lat}&longitude=${lon}&distance=${dist}&maxresults=50&compact=true&verbose=false`;
    const response = await axios.get(url);

    return response.data.map((item: any) => ({
        id: item.ID,
        title: item.AddressInfo.Title,
        latitude: item.AddressInfo.Latitude,
        longitude: item.AddressInfo.Longitude,
        usageType: item.UsageType?.Title,
        operator: item.OperatorInfo?.Title,
        statusType: item.StatusType?.Title,
        connections: (item.Connections || []).map((c: any) => ({
            type: c.ConnectionType?.Title || 'Unknown',
            powerKW: c.PowerKW,
            quantity: c.Quantity
        }))
    }));
};

export const fetchPOIs = async (lat: number, lon: number, type: POI['type'], radius: number = 1000): Promise<POI[]> => {
    const typeMap: Record<string, string> = {
        toilet: 'amenity=toilets',
        water: 'amenity=drinking_water',
        parking: 'amenity=bicycle_parking',
        bench: 'amenity=bench',
        pharmacy: 'amenity=pharmacy'
    };

    const query = `[out:json];node["${typeMap[type]}"](around:${radius},${lat},${lon});out;`;
    const url = `${OVERPASS_BASE}?data=${encodeURIComponent(query)}`;
    const response = await axios.get(url);

    return response.data.elements.map((el: any) => ({
        id: el.id.toString(),
        type: type,
        name: el.tags.name,
        latitude: el.lat,
        longitude: el.lon,
        tags: el.tags
    }));
};
