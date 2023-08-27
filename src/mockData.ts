import {TravelEntryModel} from "./models/travelEntry";

const data: {travelEntries: TravelEntryModel[]} = {
    travelEntries: [
        {
            "id": 10,
            "title": "Ukrainian Adventures",
            "description": "From Kyiv to Lviv.",
            "locations": [
                {
                    "latitude": 50.4501,
                    "longitude": 30.5234,
                    "locationName": "Kyiv, Ukraine"
                },
                {
                    "latitude": 49.8397,
                    "longitude": 24.0297,
                    "locationName": "Lviv, Ukraine"
                }
            ]
        },
        {
            "id": 1,
            "title": "European Expedition",
            "description": "Exploring the beauty of Paris and London.",
            "locations": [
                {
                    "latitude": 48.8566,
                    "longitude": 2.3522,
                    "locationName": "Paris, France"
                },
                {
                    "latitude": 51.5074,
                    "longitude": -0.1278,
                    "locationName": "London, UK"
                },
                {
                    "latitude": 41.9028,
                    "longitude": 12.4964,
                    "locationName": "Rome, Italy"
                },
                {
                    "latitude": 50.0755,
                    "longitude": 14.4378,
                    "locationName": "Prague, Czech Republic"
                }
            ]
        },
        {
            "id": 2,
            "title": "American Landmarks",
            "description": "From the Big Apple to the capital.",
            "locations": [
                {
                    "latitude": 40.7128,
                    "longitude": -74.0060,
                    "locationName": "New York City, USA"
                },
                {
                    "latitude": 38.9072,
                    "longitude": -77.0369,
                    "locationName": "Washington, D.C., USA"
                }
            ]
        },
        {
            "id": 3,
            "title": "Asian Attractions",
            "description": "Visiting Tokyo and Beijing.",
            "locations": [
                {
                    "latitude": 35.6895,
                    "longitude": 139.6917,
                    "locationName": "Tokyo, Japan"
                },
                {
                    "latitude": 39.9042,
                    "longitude": 116.4074,
                    "locationName": "Beijing, China"
                }
            ]
        },
        {
            "id": 4,
            "title": "African Safari",
            "description": "From Nairobi to Cape Town.",
            "locations": [
                {
                    "latitude": -1.286389,
                    "longitude": 36.817223,
                    "locationName": "Nairobi, Kenya"
                },
                {
                    "latitude": -33.9249,
                    "longitude": 18.4241,
                    "locationName": "Cape Town, South Africa"
                }
            ]
        },
        {
            "id": 5,
            "title": "Oceanian Wonders",
            "description": "Exploring Sydney and Auckland.",
            "locations": [
                {
                    "latitude": -33.8688,
                    "longitude": 151.2093,
                    "locationName": "Sydney, Australia"
                },
                {
                    "latitude": -36.8485,
                    "longitude": 174.7633,
                    "locationName": "Auckland, New Zealand"
                }
            ]
        },
        {
            "id": 6,
            "title": "Middle Eastern Marvels",
            "description": "Dubai to Cairo exploration.",
            "locations": [
                {
                    "latitude": 25.276987,
                    "longitude": 55.296249,
                    "locationName": "Dubai, UAE"
                },
                {
                    "latitude": 30.802498,
                    "longitude": 31.265007,
                    "locationName": "Cairo, Egypt"
                }
            ]
        },
        {
            "id": 7,
            "title": "South American Sites",
            "description": "From Rio to Buenos Aires.",
            "locations": [
                {
                    "latitude": -22.9068,
                    "longitude": -43.1729,
                    "locationName": "Rio de Janeiro, Brazil"
                },
                {
                    "latitude": -34.6037,
                    "longitude": -58.3816,
                    "locationName": "Buenos Aires, Argentina"
                }
            ]
        },
        {
            "id": 8,
            "title": "Canadian Cities",
            "description": "Toronto to Vancouver.",
            "locations": [
                {
                    "latitude": 43.6532,
                    "longitude": -79.3832,
                    "locationName": "Toronto, Canada"
                },
                {
                    "latitude": 49.2827,
                    "longitude": -123.1207,
                    "locationName": "Vancouver, Canada"
                }
            ]
        },
        {
            "id": 9,
            "title": "Indian Icons",
            "description": "Delhi to Mumbai journey.",
            "locations": [
                {
                    "latitude": 28.6139,
                    "longitude": 77.2090,
                    "locationName": "New Delhi, India"
                },
                {
                    "latitude": 19.0760,
                    "longitude": 72.8777,
                    "locationName": "Mumbai, India"
                }
            ]
        }
    ]

}

export default data