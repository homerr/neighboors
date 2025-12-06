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

        return this.getComplaintById(result.lastInsertRowid as number)!;
    }

    // grab a complaint by its id
    static getComplaintById(id: number): Complaint | undefined {
        const stmt = db.prepare(`SELECT * FROM complaints WHERE id = ?`);
        return stmt.get(id) as Complaint | undefined;
    }

    // get all complaints newest first 
    static getAllComplaints(): Complaint[] {
        const stmt = db.prepare(`
            SELECT * FROM complaints
            ORDER BY date DESC, time_start DESC
        `);
        return stmt.all() as Complaint[];
    }
    
    // get complaints by status
    static getComplaintsByStatus(status: ComplaintStatus): Complaint[] {
        const stmt = db.prepare(`
            SELECT * FROM complaints
            WHERE status = ?
            ORDER BY date DESC, time_start DESC
        `);
        return stmt.all(status) as Complaint[];
    }

    // get complaints by
    static getComplaintsByType(type: string): Complaint[] {
        const.stmt = db.prepare(`
            SELECT * FROM complaints
            WHERE type_of_nuisance = ?
            ORDER BY date DESC, time_start DESC
        `);
        return stmt.all(type) as Complaint[];
    }

    // get complaints in a range of dates
    static getComplaintsByDateRange(startDate: string, endDate:string): Complaint[] {
        

