export interface Endorsement {
  id: number;
  billId: number;
  newBeneficiary: string;
  previousEndorsementId: number;
  newBeneficiaryId: number;
}
