export interface ProductApi {
  id: string;
  title: string;
  condition: string;
  thumbnail_id: string;
  catalog_product_id: string;
  listing_type_id: string;
  sanitized_title: string;
  permalink: string;
  buying_mode: string;
  site_id: string;
  category_id: string;
  domain_id: string;
  thumbnail: string;
  currency_id: string;
  order_backend: number;
  price: number;
  original_price: string | null;
  sale_price: SalePrice;
  available_quantity: number;
  official_store_id: number;
  official_store_name: string;
  use_thumbnail_id: boolean;
  accepts_mercadopago: boolean;
  shipping: Shipping;
  stop_time: string;
  seller: Seller;
  attributes: Attribute[];
  installments: Installments;
  winner_item_id: string | null;
  catalog_listing: boolean;
  discounts: string | null;
  promotions: (string | null)[];
  differential_pricing: DifferentialPricing;
  inventory_id: string;
}

export interface SalePrice {
  price_id: string;
  amount: number;
  conditions: Conditions;
  currency_id: string;
  exchange_rate: string | null;
  payment_method_prices: (string | null)[];
  payment_method_type: string;
  regular_amount: string | null;
  type: string;
  metadata: Metadata;
}

export interface Conditions {
  eligible: boolean;
  context_restrictions: (string | null)[];
  start_time: string | null;
  end_time: string | null;
}

export interface Metadata {}

export interface Shipping {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  mode: string;
  tags: string[];
  benefits: string | null;
  promise: string | null;
  shipping_score: number;
}

export interface Seller {
  id: number;
  nickname: string;
}

export interface Attribute {
  id: string;
  name: string;
  value_id?: string;
  value_name: string;
  attribute_group_id: string;
  attribute_group_name: string;
  value_struct?: ValueStruct;
  values: Value[];
  source: number;
  value_type: string;
}

export interface ValueStruct {
  number: number;
  unit: string;
}

export interface Value {
  id?: string;
  name: string;
  struct?: Struct;
  source: number;
}

export interface Struct {
  number: number;
  unit: string;
}

export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

export interface DifferentialPricing {
  id: number;
}
