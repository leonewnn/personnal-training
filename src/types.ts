export type Link = { href: string };

export type Customer = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  _links: {
    self: Link;
    customer: Link;
    trainings: Link;
  };
};

export type CustomerForm = Omit<Customer, "_links">;

export type CustomersResponse = {
  _embedded: {
    customers: Customer[];
  };
};



export type Training = {
  date: string; 
  duration: number;
  activity: string;
  _links: {
    self: Link;
    training: Link;
    customer: Link;
  };
};

export type TrainingForm = {
  date: string;
  activity: string;
  duration: number;
  customer: string;
};

export type TrainingsResponse = {
  _embedded: {
    trainings: Training[];
  };
};

export type TrainingWithCustomer = {
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
  };
};