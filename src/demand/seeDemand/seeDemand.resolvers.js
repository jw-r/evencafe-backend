import client from "../../client";

export default {
  Query: {
    seeDemand: () => client.demand.findMany(),
  },
};
