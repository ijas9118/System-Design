/**
 * Design a Notification Service that supports multiple notification channels (Email, SMS, PushNotification).
 * New channels should be easy to add without changing existing logic.
 * The notification service should use an interface so it can handle any number of channels in a plug-and-play fashion.
 */

type NotificationData = {
  recipient: string;
  message: string;
};

interface NotificationChannel {
  send(data: NotificationData): void;
}

class EmailNotification implements NotificationChannel {
  send(data: NotificationData): void {
    console.log(`Sending EMAIL to ${data.recipient}: ${data.message}`);
  }
}

class SMSNotification implements NotificationChannel {
  send(data: NotificationData): void {
    console.log(`Sending SMS to ${data.recipient}: ${data.message}`);
  }
}

class PushNotification implements NotificationChannel {
  send(data: NotificationData): void {
    console.log(`PUSH notification to ${data.recipient}: ${data.message}`);
  }
}

class NotificationService {
  private channels: NotificationChannel[] = [];

  registerChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }

  notifyAll(data: NotificationData): void {
    this.channels.forEach((channel) => channel.send(data));
  }
}

function main() {
  const emailNotification: NotificationChannel = new EmailNotification();
  const smsNotification: NotificationChannel = new SMSNotification();

  const service = new NotificationService();

  service.registerChannel(emailNotification);
  service.registerChannel(smsNotification);

  service.notifyAll({
    recipient: "user@domain.com",
    message: "Welcome to Typescript!",
  });

  const pushNotification: NotificationChannel = new PushNotification();
  service.registerChannel(pushNotification);

  service.notifyAll({
    recipient: "user@domain.com",
    message: "Welcome to Typescript!",
  });
}

main();
