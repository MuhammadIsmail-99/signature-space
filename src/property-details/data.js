export const propertyData = {
  id: "1",
  title: "Luxury Villa with Ocean View", // Changed from 'name' to 'title'
  type: "Villa", // Added 'type' based on the property description
  location: "Lahore, Pakistan",
  rating: 4.8,
  reviewsCount: 120,
  pricePerNight: 190,
  images: [
    require("../assets/header-image.jpg"),
    require("../assets/Marina.jpg"),
    require("../assets/Lake tower.jpg"),
    require("../assets/beach-res.jpg"),
    require("../assets/downtown.jpg"),
    require("../assets/list-property-image.png"),
  ],
  // Extracted from essentials to top-level for easy access by the component
  bedrooms: 3,
  bathrooms: 2,
  guests: 6,
  essentials: [
    { icon: "Bed", label: "3 Bedrooms" },
    { icon: "Bath", label: "2 Bathrooms" },
    { icon: "Users", label: "6 Guests" },
  ],
  included: [
    { icon: "Pool", text: "Private pool" },
    { icon: "Dishwasher", text: "Dishwasher" },
    { icon: "WashingMachine", text: "Washing machine" },
    { icon: "TV", text: "TV" },
    { icon: "AirConditioning", text: "Air conditioning" },
    { icon: "Wifi", text: "WiFi" },
    { icon: "Fireplace", text: "Fireplace" },
    { icon: "Microwave", text: "Microwave" },
    { icon: "NoPets", text: "No pets" },
  ],
  rooms: [
    {
      name: "Master Bedroom",
      details: ["King bed", "En-suite bathroom", "Ocean view"],
    },
    {
      name: "Guest Bedroom 1",
      details: ["Queen bed", "Shared bathroom", "Garden view"],
    },
    {
      name: "Guest Bedroom 2",
      details: ["2 Single beds", "Shared bathroom", "City view"],
    },
  ],
  additionalRooms: [
    {
      name: "Living Room",
      details: ["Spacious seating", "Smart TV", "Fireplace"],
    },
    {
      name: "Kitchen",
      details: ["Fully equipped", "Dining area", "Coffee machine"],
    },
  ],
  description:
    "Experience unparalleled luxury in this stunning villa with breathtaking ocean views. Located in a serene neighborhood, this property offers spacious living areas, modern amenities, and direct access to the beach. Perfect for families or groups seeking a memorable getaway.",
  locationDetails: {
    overview:
      "The villa is situated in a prime location, offering both tranquility and easy access to local attractions. It's just a 5-minute walk to the beach and a 10-minute drive to the city center.",
    neighborhood:
      "The neighborhood is known for its vibrant local markets, exquisite dining options, and friendly community. Enjoy evening strolls along the promenade or explore the hidden gems of the city.",
    gettingAround:
      "Public transportation is readily available, with a bus stop just a block away. Taxis and ride-sharing services are also common. For those who prefer to drive, free parking is available on-site.",
  },
  reviews: [
    {
      id: 1,
      author: "Alice B.",
      rating: 5,
      date: "July 10, 2025",
      comment:
        "Absolutely stunning villa! The views were incredible, and the house was spotless. We had a fantastic time and would highly recommend it.",
    },
    {
      id: 2,
      author: "Bob C.",
      rating: 4,
      date: "June 28, 2025",
      comment:
        "Great location and amenities. The pool was a huge hit with the kids. A few minor issues with the Wi-Fi, but overall a wonderful stay.",
    },
  ],
  hostAccepts: ["Visa", "MasterCard", "Amex"], // Example payment methods
  agent: {
    name: "Zeshan",
    isSuperhost: true,
    profileImage: require("../assets/logo.png"),
    reviewsCount: 138,
    rating: 4.98,
    yearsHosting: 2,
  },

};