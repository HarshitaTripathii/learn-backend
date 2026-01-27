import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 60 * 5, // default TTL = 5 minutes
  checkperiod: 60, // cleanup every 1 minute
  useClones: false, // return same object reference (faster)
});

export default cache;
