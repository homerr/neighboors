// this file seems to be to constrain the app to using specific things that i want

export type ComplaintStatus = 'open' | 'submitted' | 'closed';

// lets have some options for how horrible the neighboors are
export type NusianceType = 
    | 'noise_music'
    | 'noise_dogs'
    | 'noise_construction'
    | 'noise_appliances'
    | 'noise_ventilation'
    | 'noise_cars'
    | 'noise_shouting'
    | 'smell_fire'
    | 'smell_rubbish'
    | 'light'
    | 'smoke'
    | 'other';

// make up the complaint full record (everything)
export interface Complaint {
    id?: number;

    // these bits are for hillingdon local authority
    date: string; // YYYY-MM-DD
    time_start: string; // HH:MM
    time_end?: string; // HH:MM
    description_of_nusisance: string;
    how_affects_you: string;

    // stuff for us 
    type_of_nuisance: NusianceType;
    location?: string;
    private_notes?: string;
    status?: ComplaintStatus;

    // track the cretins 
    created_at?: string; 
    updated_at?: string;
}

// complaint submission interface
export interface CreateComplaintRequest {
    // la required stuff
    date: string;
    time_start: string;
    time_end?: string;
    description_of_nusisance: string;
    how_affects_you: string;
    // bits for us 
    type_of_nuisance: NusianceType;
    location?: string;
    private_notes?: string;
}

// update a complaint interface
export interface UpdateComplaintRequest {
    date?: string;
    time