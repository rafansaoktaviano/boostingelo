export interface Orders {
  order_id: number;
  booster: string;
  username: string;
  password: string;
  order_complete_proof: string;
  type_order: string;
  region: string;
  status: string;
  games: any;
  orders_details: OrdersDetail[];
}

export type Game = {
  name: string;
  created_at: string;
  id: number;
};

export interface OrdersDetail {
  stream: boolean;
  end_rank: string;
  no_stack: boolean;
  priority: boolean;
  win_match: number;
  start_rank: string;
  rank_rating: number;
  end_division: string;
  offline_chat: boolean;
  type_service: string;
  agents_request: string[];
  start_division: string;
}
