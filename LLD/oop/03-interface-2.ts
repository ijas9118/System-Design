/**
 * Design Payment Gateway Service. Support multiple payment providers (Stripe, Razorpay, PayPal)
 * The checkout logic should not care which provider is used
 * Add new gateways easily
 */

interface PaymentGateway {
  initiatePayment(amount: number): void;
}

class StripePayment implements PaymentGateway {
  initiatePayment(amount: number): void {
    console.log(`Processing payment via Stripe: $${amount}`);
  }
}

class RazorpayPayment implements PaymentGateway {
  initiatePayment(amount: number): void {
    console.log(`Processing payment via Razorpay: ₹${amount}`);
  }
}

class PayPalPayment implements PaymentGateway {
  initiatePayment(amount: number): void {
    console.log(`Processing payment via PayPal: ₹${amount}`);
  }
}

class CheckoutService {
  constructor(private paymentGateway: PaymentGateway) {}

  setPaymentGateway(gateway: PaymentGateway) {
    this.paymentGateway = gateway;
  }

  checkout(amount: number) {
    this.paymentGateway.initiatePayment(amount);
  }
}

function main() {
  const stripe = new StripePayment();
  const service = new CheckoutService(stripe);
  service.checkout(123);

  const payPal = new PayPalPayment();
  service.setPaymentGateway(payPal);
  service.checkout(345);

  const razorPay = new RazorpayPayment();
  service.setPaymentGateway(razorPay);
  service.checkout(456);
}

main();
