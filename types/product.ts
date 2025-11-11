export interface Coverage {
  maxCoverage: number;
  deductible: number;
  coinsurance: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  features: string[];
  coverage: Coverage;
}
