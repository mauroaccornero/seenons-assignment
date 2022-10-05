interface IOrderItem {
  quantity: number;
  order_id: string;
  stream_type: string;
  type: number;
  size: number;
  status: number;
  issue: number | null;
  stream_product_id: number;
}

export default IOrderItem;
