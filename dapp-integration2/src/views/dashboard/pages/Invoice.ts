export interface Invoice {
  id: string;
  supplier: string;
  debtor: string;
  fechaEmision: Date;
  dueDate: Date;
  title: string;
  invoiceNumber: string;
  documentUrl: string;
  montoCertificado: number;
  status: string;
  externalId: string;
  documentOwner: string;
  trust: string;
  investor: string;
  valorFacial: number;
}
