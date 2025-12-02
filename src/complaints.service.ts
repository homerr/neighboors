import db from './database';

import {
    Complaint,
    CreateComplaintRequest,
    UpdateComplaintRequest,
    ComplaintExport,
    ComplaintStatus
} from './types';

export class ComplaintsService {
    // new complaint 
    static createComplaint(data: CreateComplaintRequest): Complaint {
        const stmt = db.prepare(`
            INSERT INTO complaints (
                date, time_start, time_end,
                description_of_nusisance, how_affects_you,
                type_of_nuisance, location, private_notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            data.date,
            data.time_start,
            data.time_end || null,
            data.description_of_nusisance,
            data.how_affects_you,
            data.type_of_nuisance,
            data.location || null,
            data.private_notes || null
        );

    }