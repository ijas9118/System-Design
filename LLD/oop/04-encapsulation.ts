class PaymentProcessor {
  private cardNumber: string;
  private amount: number;

  constructor(cardNumber: string, amount: number) {
    this.cardNumber = this.maskCardNumber(cardNumber);
    this.amount = amount;
  }

  private maskCardNumber(cardNumber: string): string {
    return "****-****-****-" + cardNumber.substring(cardNumber.length - 4);
  }

  processPayment(): void {
    console.log(
      `Processing payment of ${this.amount} for card ${this.cardNumber}`,
    );
  }
}

function main(): void {
  const payment = new PaymentProcessor("1234567812345678", 250.0);
  payment.processPayment();
}

main();
