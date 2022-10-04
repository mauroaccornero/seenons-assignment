import mockData from "./data/mock.data.json";
import type { Connect } from "vite";
import type * as http from "http";

type MockStopsFunction = {
  (
    req: Connect.IncomingMessage,
    res: http.ServerResponse,
    urlVars?: { [key: string]: string }
  ): void;
};

type MockStopsHandler = {
  pattern: string;
  method?: string;
  handle: MockStopsFunction;
};

const mutableMockData = mockData;

const mocks: MockStopsHandler[] = [
  {
    pattern: "/api/stops/{stopId}",
    method: "GET",
    handle: (req, res, pathVars) => {
      const data = mutableMockData.stops.find(
        (stop) =>
          pathVars &&
          "stopId" in pathVars &&
          stop["stop_id"].toString() === pathVars.stopId
      );
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    },
  },
  {
    pattern: "/api/stops",
    method: "GET",
    handle: (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(mutableMockData));
    },
  },
];

export default mocks;
