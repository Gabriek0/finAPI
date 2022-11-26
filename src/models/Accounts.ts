export interface Account {
  id: string;
  name: string;
  cpf: string;
  statement: Statement[];
}

export interface Statement {
  description?: string;
  created_at: Date;
  amount: number;
  type: string;
}
