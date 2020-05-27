export interface Geocode {
    plus_code: {};
    results: Place[];
    status: string;
}

export interface Place {
    access_points: [];
    address_components: Adresse[];
    formatted_address: string;
    geometry: {};
    place_id: string;
    plus_code: {};
    types: [];
}

export interface Adresse {
    long_name: string;
    short_name: string;
    types: string[];
}
