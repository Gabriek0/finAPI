export interface Account {
  id: string;
  name: string;
  cpf: string;
  statement?: {
    description: string;
    created_at: Date;
    amount: number;
    type: string;
  }[];
}
