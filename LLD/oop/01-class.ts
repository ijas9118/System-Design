/**
 * Design a Car Rental System.
 * You must model Cars with various brands and models that can be rented, keep track of their status,
 * and support operations like rent, return, and seeing which cars are available.
 */

enum CarStatus {
  Available = "available",
  Rented = "rented",
}

type CarData = {
  brand: string;
  model: string;
};

class Cars {
  constructor(
    public brand: string,
    public model: string,
    private status: CarStatus = CarStatus.Available,
  ) {}

  rentCar(): boolean {
    if (this.status === "rented") {
      return false;
    }

    this.status = CarStatus.Rented;
    return true;
  }

  returnCar(): boolean {
    this.status = CarStatus.Available;
    return true;
  }

  isAvailable(): boolean {
    return this.status === CarStatus.Available;
  }
}

class CarRentalSystem {
  private cars: Cars[] = [];

  addCar(car: Cars) {
    this.cars.push(car);
  }

  getAvailableCars() {
    return this.cars.filter((car) => car.isAvailable() === true);
  }

  rentCar(data: CarData) {
    const car = this.cars.find(
      (c) => c.brand === data.brand && c.model === data.model,
    );

    if (!car || !car.isAvailable()) {
      return `Car not available`;
    }

    car.rentCar();
    return `Rented ${car.brand} ${car.model}`;
  }

  returnCar(data: CarData) {
    const car = this.cars.find(
      (c) =>
        c.brand === data.brand && c.model === data.model && !c.isAvailable(),
    );

    if (!car) {
      return "No matching rented car found";
    }

    car.returnCar();
    return `Returned: ${data.brand} ${data.model}`;
  }
}

const rentalSystem = new CarRentalSystem();

rentalSystem.addCar(new Cars("Toyota", "Camery"));
rentalSystem.addCar(new Cars("Toyota", "Land Cruiser"));
rentalSystem.addCar(new Cars("Rolls Roys", "Ghost"));

console.log(rentalSystem.getAvailableCars());
console.log(rentalSystem.rentCar({ brand: "Toyota", model: "Camery" }));
console.log(rentalSystem.rentCar({ brand: "Toyota", model: "Corolla" }));
console.log(rentalSystem.getAvailableCars());
console.log(rentalSystem.returnCar({ brand: "Toyota", model: "Camery" }));
