import type IAddress from "@/common/interfaces/IAddress";
import type IOrderItem from "@/common/interfaces/IOrderItem";

interface IStop {
  stop_id: number;
  name: string;
  comment: string | null;
  telephone: string | null;
  eta: string;
  time_start: string;
  time_end: string;
  status: number;
  address: IAddress;
  orders: IOrderItem[];
}

export default IStop;
