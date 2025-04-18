import Counter from "../models/counter.model";

export const assignTicket = async (counterName: string): Promise<number> => {
  const counter = await Counter.findOneAndUpdate(
    { _id: counterName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq + 500;
};
