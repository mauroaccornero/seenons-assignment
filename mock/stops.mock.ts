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
    pattern: "/api/order/{orderId}/{action}",
    method: "PATCH",
    handle: (req, res, pathVars) => {
      mutableMockData.stops.map((stop) => {
        if (pathVars && "orderId" in pathVars && "action" in pathVars) {
          const newOrders = stop.orders.map((o) => {
            if (o["order_id"] === pathVars.orderId) {
              switch (pathVars.action) {
                case "increase":
                  o.quantity++;
                  break;
                case "decrease":
                  o.quantity--;
                  break;
                case "complete":
                  o.status = 4;
                  break;
              }
            }
            return o;
          });
          stop = { ...stop, orders: newOrders };
        }
        return stop;
      });
      res.setHeader("Content-Type", "application/json");

      const output = { message: "Order updated " + JSON.stringify(pathVars) };
      res.end(JSON.stringify(output));
    },
  },
  {
    pattern: "/api/stops/{stopId}/orders",
    method: "GET",
    handle: (req, res, pathVars) => {
      const data = mutableMockData.stops.find(
        (stop) =>
          pathVars &&
          "stopId" in pathVars &&
          stop["stop_id"].toString() === pathVars.stopId
      );
      res.setHeader("Content-Type", "application/json");

      const output =
        data && "orders" in data ? data.orders : { message: "not found" };
      res.end(JSON.stringify(output));
    },
  },
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
      const output = data ? data : { message: "not found" };
      res.end(JSON.stringify(output));
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
