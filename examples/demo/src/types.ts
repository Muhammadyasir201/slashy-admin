import { number } from './../../../packages/ra-core/src/form/validate';
import { ReduxState, Record, Identifier } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Category extends Record {
    name: string;
}

export interface Product extends Record {
    category_id: Identifier;
    description: string;
    height: number;
    image: string;
    price: number;
    reference: string;
    stock: number;
    thumbnail: string;
    width: number;
}

export interface Invoice extends Record {
    is_paid: boolean;
    venue_name: string;
    vendor: number;
    total_amount: string;
    total_hours: string;
    total_workers: number;
    company: Company;
    role: string[];
}

export interface Company {
    id: number;
    name: string;
    image: {
        src: string;
    };
    address: string;
    vat_number: number;
    tob: string;
}

export interface Vendor extends Record {
    name: string;
    email: string;
    contact: string;
    avatar: {
        src: string;
    };
    venues: [
        {
            id: Identifier;
            name: string;
        }
    ];
    company: Company;
    is_deleted: boolean;
}

export type ShiftStatus =
    | 'browse'
    | 'upcoming'
    | 'ongoing'
    | 'review_pending'
    | 'past';

export interface ShiftListing extends Record {
    booked_staff: [];
    booked_staff_count: number;
    category_id: number;
    company: Company;
    job_description: string;
    hourly_rate: number;
    interested_staff: [];
    is_deleted: boolean;
    num_of_staff: number;
    pending_staff: [];
    role: string;
    role_id: number;
    shift_status: number;
    uniform: {
        male: string;
        female: string;
    };
    slots: [
        {
            day: string;
            times: [
                {
                    from: string;
                    time_in: string;
                    time_out: string;
                    to: string;
                }
            ];
        }
    ];
    status: ShiftStatus;
    status_id: number;
    vendor_id: number;
    state: string;
    venue_name: string;
    venue_id: number;
}
export interface Role extends Record {
    category: Identifier;
    display_name: string;
    image: string;
}

export interface Notification extends Record {
    text: string;
    createdAt: string;
}

export interface Industry extends Record {
    name: string;
    image: string;
}

// export interface Roles extends Array<Role> {}

export interface Staff extends Record {
    role_id: Identifier;
    name: string;
    shift_id: number;
    username: string;
    email: string;
    contact: string;
    gender: string;
    description: string;
    deletedAt: string;
    avatar: {
        src: string;
    };
    address: string;
    status: string;
    // cerified_roles: string[];
    experience: [
        {
            title: string;
            company: string;
            start_date: string;
            end_date: string;
        }
    ];
    documents: [
        {
            createdAt: string;
            doc_name: string;
            expiry: string;
            pdf: string;
            staff: number;
            updatedAt: string;
        }
    ];

    noc_pass_visa_info: string;
    noc_pass_visa_expdate: string;
}

export interface PayOrderManagement extends Record {
    amount: number;
    payorder: number;
    company: string;
    venue: [];
    padyorder_doc: string;
}

export interface PayRolls extends Record {
    is_paid: boolean;
    hours_worked: string;
    staff: Staff;
    shift: ShiftListing;
    vendor: Vendor;
    company: Company;
    venue: number;
    role: Role;
    amount: string;
}
export interface Reviews extends Record {
    rating: number;
    review: string;
    role: string;
    venue: string;
}
export interface Manager extends Record {
    name: string;
    email: string;
    address: string;
    list: string;
}
export interface Status extends Record {
    data: string;
}

export interface Customer extends Record {
    first_name: string;
    last_name: string;
    address: string;
    stateAbbr: string;
    city: string;
    zipcode: string;
    avatar: string;
    birthday: string;
    first_seen: string;
    last_seen: string;
    has_ordered: boolean;
    latest_purchase: string;
    has_newsletter: boolean;
    groups: string[];
    nb_commands: number;
    total_spent: number;
}

export type OrderStatus = 'ordered' | 'delivered' | 'cancelled';

export interface Order extends Record {
    status: OrderStatus;
    basket: BasketItem[];
    date: Date;
    total: number;
}

export interface BasketItem {
    product_id: Identifier;
    quantity: number;
}

// export interface Invoice extends Record {}

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends Record {
    date: Date;
    status: ReviewStatus;
    customer_id: Identifier;
    product_id: Identifier;
}

declare global {
    interface Window {
        restServer: any;
    }
}
