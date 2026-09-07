import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Destination = "Future City" | "The Moon" | "Mars";
type Transport =
  | "Future Aircraft"
  | "Ultra-Speed Train"
  | "Autonomous Vehicle"
  | "Spacecraft";

type Screen = "home" | "travel" | "explore";

type Location = {
  id: string;
  name: string;
  icon: string;
  category: string;
  status: "REALISTIC" | "POSSIBLE" | "SPECULATIVE";
  description: string;
  discovery: string;
  x: number;
  y: number;
};

const years = [2035, 2050, 2100];

const destinations: Destination[] = [
  "Future City",
  "The Moon",
  "Mars",
];

const transports: Transport[] = [
  "Future Aircraft",
  "Ultra-Speed Train",
  "Autonomous Vehicle",
  "Spacecraft",
];

const locations: Record<
  Destination,
  Record<number, Location[]>
> = {
  "Future City": {
    2035: [
      {
        id: "city-transport-2035",
        name: "Autonomous Transit Hub",
        icon: "🚄",
        category: "TRANSPORT",
        status: "POSSIBLE",
        description:
          "A major transport station designed around autonomous vehicles and high-speed connections.",
        discovery:
          "Autonomous transport could reduce waiting times and allow vehicles to coordinate their routes automatically.",
        x: 18,
        y: 61,
      },
      {
        id: "city-farm-2035",
        name: "Vertical Farm",
        icon: "🌱",
        category: "FOOD SYSTEMS",
        status: "REALISTIC",
        description:
          "A multi-level farm growing food inside the city instead of using large areas of land outside it.",
        discovery:
          "Vertical farming can grow crops in controlled environments while using much less land than traditional farming.",
        x: 42,
        y: 28,
      },
      {
        id: "city-energy-2035",
        name: "Clean Energy Center",
        icon: "⚡",
        category: "ENERGY",
        status: "REALISTIC",
        description:
          "A city energy facility combining renewable electricity with large-scale storage systems.",
        discovery:
          "Energy storage is important because solar and wind power do not produce electricity at exactly the same time people need it.",
        x: 68,
        y: 55,
      },
      {
        id: "city-drone-2035",
        name: "Drone Operations Tower",
        icon: "◇",
        category: "AIR SYSTEMS",
        status: "POSSIBLE",
        description:
          "A controlled airspace facility coordinating delivery and inspection drones.",
        discovery:
          "Large numbers of drones would require carefully managed airspace to prevent collisions.",
        x: 81,
        y: 25,
      },
      {
        id: "city-tower-2035",
        name: "Smart Tower",
        icon: "▥",
        category: "ARCHITECTURE",
        status: "POSSIBLE",
        description:
          "A high-rise building designed to automatically monitor energy use, temperature and building systems.",
        discovery:
          "Smart buildings can use sensors to adjust systems based on how people actually use the building.",
        x: 55,
        y: 72,
      },
    ],
    2050: [
      {
        id: "city-hub-2050",
        name: "High-Speed Transit Hub",
        icon: "🚄",
        category: "TRANSPORT",
        status: "POSSIBLE",
        description:
          "A huge transport interchange connecting autonomous vehicles with high-speed rail.",
        discovery:
          "Future transport networks could work as one connected system rather than separate vehicles and stations.",
        x: 20,
        y: 62,
      },
      {
        id: "city-farm-2050",
        name: "Vertical Forest Farm",
        icon: "🌳",
        category: "FOOD SYSTEMS",
        status: "POSSIBLE",
        description:
          "A high-rise agricultural complex producing food inside the city.",
        discovery:
          "Controlled-environment agriculture could allow crops to be grown closer to where people live.",
        x: 43,
        y: 25,
      },
      {
        id: "city-fusion-2050",
        name: "Fusion Research Center",
        icon: "✦",
        category: "ENERGY",
        status: "SPECULATIVE",
        description:
          "A research facility investigating whether fusion energy can become a practical large-scale power source.",
        discovery:
          "Fusion could potentially provide large amounts of energy, but making commercial fusion practical remains a major engineering challenge.",
        x: 72,
        y: 52,
      },
      {
        id: "city-sky-2050",
        name: "Sky Tower",
        icon: "◇",
        category: "ARCHITECTURE",
        status: "SPECULATIVE",
        description:
          "A giant vertical structure containing housing, gardens and observation decks.",
        discovery:
          "Very tall buildings face major engineering challenges from wind, weight, elevators and emergency systems.",
        x: 55,
        y: 70,
      },
      {
        id: "city-drone-2050",
        name: "Drone Network",
        icon: "◆",
        category: "AIR SYSTEMS",
        status: "POSSIBLE",
        description:
          "A city-wide network for autonomous aerial deliveries and inspections.",
        discovery:
          "Autonomous aerial systems would need reliable navigation and strict rules for sharing airspace.",
        x: 83,
        y: 27,
      },
    ],
    2100: [
      {
        id: "city-orbital-2100",
        name: "Orbital Terminal",
        icon: "◉",
        category: "SPACE TRANSPORT",
        status: "SPECULATIVE",
        description:
          "A futuristic terminal imagined as a connection between Earth and orbital travel.",
        discovery:
          "Regular passenger travel to orbit would require major advances in launch systems, safety and cost reduction.",
        x: 22,
        y: 27,
      },
      {
        id: "city-energy-2100",
        name: "Fusion Energy Grid",
        icon: "✦",
        category: "ENERGY",
        status: "SPECULATIVE",
        description:
          "A massive energy facility imagined around commercial fusion power.",
        discovery:
          "Fusion power is based on the same basic nuclear process that powers stars, but controlling it on Earth is extremely difficult.",
        x: 70,
        y: 30,
      },
      {
        id: "city-forest-2100",
        name: "Vertical Forest",
        icon: "🌳",
        category: "ECOLOGY",
        status: "SPECULATIVE",
        description:
          "A giant urban structure filled with vegetation, habitats and public spaces.",
        discovery:
          "Future cities may need to combine dense construction with systems that support biodiversity and human wellbeing.",
        x: 45,
        y: 62,
      },
      {
        id: "city-transit-2100",
        name: "Autonomous Transit Grid",
        icon: "🚄",
        category: "TRANSPORT",
        status: "POSSIBLE",
        description:
          "A city transport system where vehicles communicate with infrastructure and each other.",
        discovery:
          "Connected vehicles could coordinate movement and make transport networks more efficient.",
        x: 18,
        y: 70,
      },
      {
        id: "city-tower-2100",
        name: "Sky Megastructure",
        icon: "◇",
        category: "ARCHITECTURE",
        status: "SPECULATIVE",
        description:
          "A massive vertical structure imagined as a self-contained urban district.",
        discovery:
          "The larger a structure becomes, the more difficult problems such as structural loads, energy and evacuation become.",
        x: 82,
        y: 65,
      },
    ],
  },

  "The Moon": {
    2035: [
      {
        id: "moon-habitat-2035",
        name: "Research Habitat",
        icon: "⬡",
        category: "HABITAT",
        status: "POSSIBLE",
        description:
          "A protected lunar habitat designed for scientists and engineers.",
        discovery:
          "The Moon has almost no atmosphere, so habitats must provide pressure, oxygen and protection from radiation.",
        x: 28,
        y: 50,
      },
      {
        id: "moon-rover-2035",
        name: "Exploration Rover",
        icon: "▰",
        category: "ROBOTICS",
        status: "REALISTIC",
        description:
          "A robotic vehicle designed to explore areas around the lunar base.",
        discovery:
          "Rovers can investigate places that would be difficult or risky for humans to reach.",
        x: 55,
        y: 70,
      },
      {
        id: "moon-antenna-2035",
        name: "Communication Array",
        icon: "⌁",
        category: "COMMUNICATION",
        status: "REALISTIC",
        description:
          "A network of antennas maintaining communication between the lunar surface and Earth.",
        discovery:
          "Reliable communication is essential when operating spacecraft and equipment hundreds of thousands of kilometres from Earth.",
        x: 76,
        y: 32,
      },
      {
        id: "moon-pad-2035",
        name: "Landing Site",
        icon: "▽",
        category: "TRANSPORT",
        status: "POSSIBLE",
        description:
          "A prepared area for spacecraft arriving at the lunar settlement.",
        discovery:
          "Lunar dust can be a serious engineering problem because spacecraft engines can blast it across the surface.",
        x: 64,
        y: 52,
      },
    ],
    2050: [
      {
        id: "moon-base-2050",
        name: "Lunar Base",
        icon: "⬡",
        category: "HABITAT",
        status: "POSSIBLE",
        description:
          "A larger lunar settlement supporting long-duration scientific missions.",
        discovery:
          "Long-term lunar habitats would need systems for water recycling, oxygen production and radiation protection.",
        x: 28,
        y: 48,
      },
      {
        id: "moon-resource-2050",
        name: "Resource Facility",
        icon: "◆",
        category: "RESOURCES",
        status: "SPECULATIVE",
        description:
          "A facility imagined for extracting and processing useful lunar materials.",
        discovery:
          "Using resources already found in space could reduce the amount of material future missions need to launch from Earth.",
        x: 66,
        y: 67,
      },
      {
        id: "moon-observatory-2050",
        name: "Lunar Observatory",
        icon: "◉",
        category: "SCIENCE",
        status: "POSSIBLE",
        description:
          "A scientific station taking advantage of the Moon's environment for astronomy.",
        discovery:
          "The far side of the Moon is naturally shielded from much of Earth's radio interference.",
        x: 77,
        y: 30,
      },
      {
        id: "moon-transit-2050",
        name: "Surface Transport Hub",
        icon: "▰",
        category: "TRANSPORT",
        status: "SPECULATIVE",
        description:
          "A future station connecting different parts of a lunar settlement.",
        discovery:
          "Transport on the Moon would have to work in low gravity and deal with abrasive lunar dust.",
        x: 43,
        y: 70,
      },
    ],
    2100: [
      {
        id: "moon-city-2100",
        name: "Lunar City",
        icon: "⬡",
        category: "HABITAT",
        status: "SPECULATIVE",
        description:
          "A large permanent settlement imagined beneath protective structures.",
        discovery:
          "A lunar city would need to create an Earth-like living environment in a place with almost no atmosphere.",
        x: 27,
        y: 48,
      },
      {
        id: "moon-maglev-2100",
        name: "Lunar Maglev",
        icon: "━",
        category: "TRANSPORT",
        status: "SPECULATIVE",
        description:
          "A conceptual magnetic transport system connecting distant lunar settlements.",
        discovery:
          "A low-gravity world could make some transportation concepts very different from those used on Earth.",
        x: 58,
        y: 68,
      },
      {
        id: "moon-industry-2100",
        name: "Resource District",
        icon: "◆",
        category: "INDUSTRY",
        status: "SPECULATIVE",
        description:
          "A futuristic industrial zone processing materials for use in space.",
        discovery:
          "Space-based manufacturing could eventually avoid launching every kilogram of construction material from Earth.",
        x: 76,
        y: 40,
      },
      {
        id: "moon-launch-2100",
        name: "Lunar Launch Terminal",
        icon: "△",
        category: "SPACE TRANSPORT",
        status: "SPECULATIVE",
        description:
          "A conceptual launch facility connecting the Moon with other destinations.",
        discovery:
          "The Moon's weaker gravity could make leaving its surface require less energy than launching from Earth.",
        x: 45,
        y: 27,
      },
    ],
  },

  Mars: {
    2035: [
      {
        id: "mars-rover-2035",
        name: "Science Rover",
        icon: "▰",
        category: "ROBOTICS",
        status: "REALISTIC",
        description:
          "An autonomous rover collecting geological data around the landing region.",
        discovery:
          "Mars rovers can travel across the surface while sending scientific measurements back to Earth.",
        x: 67,
        y: 63,
      },
      {
        id: "mars-landing-2035",
        name: "Landing Zone",
        icon: "▽",
        category: "TRANSPORT",
        status: "POSSIBLE",
        description:
          "The carefully selected area where a future spacecraft could land.",
        discovery:
          "Landing on Mars is difficult because spacecraft must slow down through a thin atmosphere and then land safely.",
        x: 25,
        y: 55,
      },
      {
        id: "mars-weather-2035",
        name: "Weather Station",
        icon: "⌁",
        category: "SCIENCE",
        status: "REALISTIC",
        description:
          "A robotic station monitoring temperature, pressure, wind and dust.",
        discovery:
          "Mars has a thin atmosphere and powerful dust storms that can affect surface missions.",
        x: 47,
        y: 30,
      },
      {
        id: "mars-comms-2035",
        name: "Communication Tower",
        icon: "◇",
        category: "COMMUNICATION",
        status: "POSSIBLE",
        description:
          "A communications system connecting surface equipment with spacecraft and Earth.",
        discovery:
          "Messages between Earth and Mars take time to travel, so robots need a degree of autonomy.",
        x: 82,
        y: 30,
      },
    ],
    2050: [
      {
        id: "mars-habitat-2050",
        name: "Mars Habitat",
        icon: "⬡",
        category: "HABITAT",
        status: "SPECULATIVE",
        description:
          "A protected habitat designed for humans living temporarily on Mars.",
        discovery:
          "A Mars habitat would need protection from radiation, extreme temperatures and the planet's thin atmosphere.",
        x: 26,
        y: 52,
      },
      {
        id: "mars-lab-2050",
        name: "Research Laboratory",
        icon: "✦",
        category: "SCIENCE",
        status: "SPECULATIVE",
        description:
          "A laboratory studying Martian rocks, atmosphere and possible resources.",
        discovery:
          "Studying Martian geology can help scientists understand how rocky planets change over time.",
        x: 57,
        y: 27,
      },
      {
        id: "mars-rover-2050",
        name: "Long-Range Rover",
        icon: "▰",
        category: "ROBOTICS",
        status: "POSSIBLE",
        description:
          "A larger rover designed to travel far beyond the settlement.",
        discovery:
          "Robotic exploration could allow scientists to investigate much larger regions than a single human base.",
        x: 75,
        y: 65,
      },
      {
        id: "mars-greenhouse-2050",
        name: "Experimental Greenhouse",
        icon: "🌱",
        category: "LIFE SUPPORT",
        status: "SPECULATIVE",
        description:
          "A controlled greenhouse testing ways to grow plants in Martian conditions.",
        discovery:
          "Plants would need a carefully controlled environment because Mars has very low pressure and unsuitable surface conditions.",
        x: 45,
        y: 72,
      },
    ],
    2100: [
      {
        id: "mars-settlement-2100",
        name: "Mars Settlement",
        icon: "⬡",
        category: "HABITAT",
        status: "SPECULATIVE",
        description:
          "A large permanent settlement imagined around underground and surface habitats.",
        discovery:
          "Permanent settlements would need closed-loop systems that recycle water, air and other essential resources.",
        x: 26,
        y: 50,
      },
      {
        id: "mars-transit-2100",
        name: "Surface Transit Hub",
        icon: "━",
        category: "TRANSPORT",
        status: "SPECULATIVE",
        description:
          "A future transportation center connecting distant Martian habitats.",
        discovery:
          "Martian transportation would need to deal with dust, rough terrain and communication delays.",
        x: 57,
        y: 70,
      },
      {
        id: "mars-greenhouse-2100",
        name: "Greenhouse District",
        icon: "🌱",
        category: "LIFE SUPPORT",
        status: "SPECULATIVE",
        description:
          "A large controlled agricultural area imagined inside a protected settlement.",
        discovery:
          "Growing food locally could reduce the amount of food that would need to be transported from Earth.",
        x: 75,
        y: 34,
      },
      {
        id: "mars-spaceport-2100",
        name: "Mars Spaceport",
        icon: "△",
        category: "SPACE TRANSPORT",
        status: "SPECULATIVE",
        description:
          "A conceptual launch and landing complex connecting Mars with spacecraft travelling through the solar system.",
        discovery:
          "A true Mars spaceport would require reliable transportation systems capable of operating far from Earth.",
        x: 45,
        y: 28,
      },
    ],
  },
};

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [year, setYear] = useState(2050);
  const [destination, setDestination] =
    useState<Destination>("Future City");
  const [transport, setTransport] =
    useState<Transport>("Future Aircraft");

  const [progress, setProgress] = useState(0);
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  const [discovered, setDiscovered] = useState<string[]>([]);
  const [xp, setXp] = useState(0);

  const worldLocations = useMemo(
    () => locations[destination][year],
    [destination, year]
  );

  useEffect(() => {
    if (screen !== "travel") {
      return;
    }

    setProgress(0);

    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          return 100;
        }

        return current + 2;
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (progress >= 100 && screen === "travel") {
      const timer = window.setTimeout(() => {
        setScreen("explore");
      }, 800);

      return () => window.clearTimeout(timer);
    }
  }, [progress, screen]);

  function startJourney() {
    setSelectedLocation(null);
    setScreen("travel");
  }

  function scanLocation(location: Location) {
    if (!discovered.includes(location.id)) {
      setDiscovered((current) => [...current, location.id]);
      setXp((current) => current + 100);
    }
  }

  function changeDestination(next: Destination) {
    setDestination(next);
    setSelectedLocation(null);
    setDiscovered([]);
    setXp(0);
  }

  function changeYear(nextYear: number) {
    setYear(nextYear);
    setSelectedLocation(null);
    setDiscovered([]);
    setXp(0);
  }

  return (
    <main className="app">
      {screen === "home" && (
        <HomeScreen
          year={year}
          destination={destination}
          transport={transport}
          setYear={changeYear}
          setDestination={changeDestination}
          setTransport={setTransport}
          onStart={startJourney}
        />
      )}

      {screen === "travel" && (
        <TravelScreen
          year={year}
          destination={destination}
          transport={transport}
          progress={progress}
        />
      )}

      {screen === "explore" && (
        <ExploreScreen
          year={year}
          destination={destination}
          locations={worldLocations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          discovered={discovered}
          xp={xp}
          onScan={scanLocation}
          onBack={() => setScreen("home")}
        />
      )}
    </main>
  );
}

type HomeProps = {
  year: number;
  destination: Destination;
  transport: Transport;
  setYear: (year: number) => void;
  setDestination: (destination: Destination) => void;
  setTransport: (transport: Transport) => void;
  onStart: () => void;
};

function HomeScreen({
  year,
  destination,
  transport,
  setYear,
  setDestination,
  setTransport,
  onStart,
}: HomeProps) {
  return (
    <section className="home-screen">
      <div className="stars" />
      <div className="home-orbit orbit-one" />
      <div className="home-orbit orbit-two" />

      <div className="home-content">
        <div className="eyebrow">FUTURE TRAVEL SIMULATOR</div>

        <h1>
          TRAVELLING
          <span>IN FUTURE</span>
        </h1>

        <p className="home-description">
          Choose a year. Choose a destination.
          <br />
          Then find out what travel might really feel like.
        </p>

        <div className="planner">
          <div className="planner-block">
            <label>YEAR</label>

            <div className="choice-row">
              {years.map((item) => (
                <button
                  className={year === item ? "choice active" : "choice"}
                  key={item}
                  onClick={() => setYear(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="planner-block">
            <label>DESTINATION</label>

            <div className="choice-row">
              {destinations.map((item) => (
                <button
                  className={
                    destination === item
                      ? "choice active"
                      : "choice"
                  }
                  key={item}
                  onClick={() => setDestination(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="planner-block">
            <label>TRANSPORT</label>

            <div className="choice-row">
              {transports.map((item) => (
                <button
                  className={
                    transport === item
                      ? "choice active"
                      : "choice"
                  }
                  key={item}
                  onClick={() => setTransport(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="launch-button" onClick={onStart}>
            <span>BEGIN JOURNEY</span>
            <strong>→</strong>
          </button>
        </div>
      </div>
    </section>
  );
}

type TravelProps = {
  year: number;
  destination: Destination;
  transport: Transport;
  progress: number;
};

function TravelScreen({
  year,
  destination,
  transport,
  progress,
}: TravelProps) {
  return (
    <section className="travel-screen">
      <div className="travel-stars" />

      <div className="travel-top">
        <div>
          <span>MISSION</span>
          <strong>TF-{year}</strong>
        </div>

        <div className="travel-status">
          <span>STATUS</span>
          <strong>IN TRANSIT</strong>
        </div>
      </div>

      <div className="travel-center">
        <div className="travel-route">
          <div className="route-line" />
          <div
            className="route-progress"
            style={{ width: `${progress}%` }}
          />

          <div className="route-node start">
            <span>EARTH</span>
          </div>

          <div
            className="vehicle"
            style={{ left: `${progress}%` }}
          >
            {destination === "The Moon"
              ? "◉"
              : destination === "Mars"
                ? "◆"
                : "✦"}
          </div>

          <div className="route-node end">
            <span>{destination.toUpperCase()}</span>
          </div>
        </div>

        <div className="travel-title">
          <span>{transport.toUpperCase()}</span>
          <h2>TRAVELLING TO {destination.toUpperCase()}</h2>
        </div>

        <div className="travel-data">
          <div>
            <span>YEAR</span>
            <strong>{year}</strong>
          </div>

          <div>
            <span>JOURNEY</span>
            <strong>{progress}%</strong>
          </div>

          <div>
            <span>VEHICLE</span>
            <strong>{transport}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

type ExploreProps = {
  year: number;
  destination: Destination;
  locations: Location[];
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  discovered: string[];
  xp: number;
  onScan: (location: Location) => void;
  onBack: () => void;
};

function ExploreScreen({
  year,
  destination,
  locations,
  selectedLocation,
  setSelectedLocation,
  discovered,
  xp,
  onScan,
  onBack,
}: ExploreProps) {
  return (
    <section className="explore-screen">
      <div className="explore-background" />

      <header className="explore-header">
        <div>
          <div className="eyebrow">ARRIVAL CONFIRMED</div>
          <h1>{destination}</h1>
          <p>{year} • EXPLORATION ZONE</p>
        </div>

        <div className="explore-stats">
          <div>
            <span>DISCOVERIES</span>
            <strong>
              {discovered.length}/{locations.length}
            </strong>
          </div>

          <div>
            <span>XP</span>
            <strong>{xp}</strong>
          </div>

          <button onClick={onBack}>NEW JOURNEY</button>
        </div>
      </header>

      <div className="explore-layout">
        <div className="world">
          <div className="world-grid" />

          <div className="world-horizon" />

          {locations.map((location) => {
            const isDiscovered = discovered.includes(location.id);
            const isSelected =
              selectedLocation?.id === location.id;

            return (
              <button
                key={location.id}
                className={[
                  "location-marker",
                  isSelected ? "selected" : "",
                  isDiscovered ? "discovered" : "",
                ].join(" ")}
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <span className="marker-pulse" />
                <span className="marker-icon">
                  {isDiscovered ? "✓" : location.icon}
                </span>

                <span className="marker-label">
                  {location.name}
                </span>
              </button>
            );
          })}

          <div className="world-instruction">
            <span className="scanner-dot" />
            SELECT A LOCATION TO INVESTIGATE
          </div>
        </div>

        <aside className="investigation-panel">
          {!selectedLocation ? (
            <div className="empty-panel">
              <div className="panel-symbol">⌖</div>

              <span>EXPLORATION MODE</span>

              <h2>Look around.</h2>

              <p>
                This world contains {locations.length} points of
                interest.
                <br />
                Select one to begin investigating.
              </p>

              <div className="scan-tip">
                <strong>MISSION OBJECTIVE</strong>
                <span>
                  Explore the environment and discover how
                  future technology could actually work.
                </span>
              </div>
            </div>
          ) : (
            <div className="selected-panel">
              <div className="panel-top">
                <span>{selectedLocation.category}</span>

                <button
                  onClick={() => setSelectedLocation(null)}
                >
                  ×
                </button>
              </div>

              <div className="big-location-icon">
                {selectedLocation.icon}
              </div>

              <div
                className={`reality ${selectedLocation.status.toLowerCase()}`}
              >
                {selectedLocation.status}
              </div>

              <h2>{selectedLocation.name}</h2>

              <p className="location-main-description">
                {selectedLocation.description}
              </p>

              {discovered.includes(selectedLocation.id) ? (
                <div className="discovery-result">
                  <div className="discovery-heading">
                    <span>✓</span>
                    DISCOVERY UNLOCKED
                  </div>

                  <p>{selectedLocation.discovery}</p>

                  <div className="xp-earned">
                    <strong>+100 XP</strong>
                    <span>DATA ADDED TO MISSION LOG</span>
                  </div>
                </div>
              ) : (
                <button
                  className="scan-button"
                  onClick={() => onScan(selectedLocation)}
                >
                  <span>SCAN LOCATION</span>
                  <strong>→</strong>
                </button>
              )}
            </div>
          )}
        </aside>
      </div>

      <footer className="explore-footer">
        <span>TF-SIMULATION</span>
        <span>WORLD STATUS: ACTIVE</span>
        <span>SCANNERS ONLINE</span>
      </footer>
    </section>
  );
}

export default App;