import { supabaseAdmin } from '../supabase'

/**
 * Service to interact with the new Supabase schema
 * This uses supabaseAdmin to bypass RLS for administrative tasks
 */
export const SupabaseService = {
    // --- Profiles & Users ---
    async getProfile(userId: string) {
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()
        return { data, error }
    },

    // --- Classes ---
    async getClasses() {
        const { data, error } = await supabaseAdmin
            .from('classes')
            .select(`
        *,
        teacher:profiles(full_name)
      `)
            .order('grade_level', { ascending: true })
        return { data, error }
    },

    async createClass(classData: any) {
        const { data, error } = await supabaseAdmin
            .from('classes')
            .insert([classData])
            .select()
        return { data, error }
    },

    // --- Students ---
    async getStudents(filters?: { classId?: string, query?: string }) {
        let query = supabaseAdmin
            .from('students')
            .select(`
                *,
                class:classes(name, grade_level, section),
                parents:parent_student(
                    relationship,
                    is_primary,
                    parent:profiles(full_name, phone)
                )
            `)

        if (filters?.classId) {
            query = query.eq('class_id', filters.classId)
        }

        if (filters?.query) {
            query = query.or(`first_name.ilike.%${filters.query}%,last_name.ilike.%${filters.query}%,student_id.ilike.%${filters.query}%`)
        }

        const { data, error } = await query.order('last_name', { ascending: true })
        return { data, error }
    },

    async createStudent(studentData: any) {
        const { data, error } = await supabaseAdmin
            .from('students')
            .insert([studentData])
            .select()
        return { data, error }
    },

    async createStudentWithParent(studentData: any, parentData: { full_name: string, phone: string, relationship: string }) {
        // 1. Create Student
        const { data: student, error: studentError } = await supabaseAdmin
            .from('students')
            .insert([studentData])
            .select()
            .single()

        if (studentError) return { error: studentError }

        // 2. Look for existing parent profile by phone
        let { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('phone', parentData.phone)
            .single()

        if (!profile) {
            // If No profile exists (parent hasn't signed up), 
            // the link can't be established to a real user id yet.
            // For now we'll just return the student.
            return { data: student, warning: 'Parent profile not found. Account creation required for linking.' }
        }

        // 3. Link Student to Parent
        const { error: linkError } = await supabaseAdmin
            .from('parent_student')
            .insert([{
                parent_id: profile.id,
                student_id: student.id,
                relationship: parentData.relationship,
                is_primary: true
            }])

        return { data: student, error: linkError }
    },

    async findClass(gradeLevel: number, section: string) {
        const { data, error } = await supabaseAdmin
            .from('classes')
            .select('id')
            .eq('grade_level', gradeLevel)
            .eq('section', section)
            .single()
        return { data, error }
    },

    // --- Attendance ---
    async markAttendance(attendanceRecords: any[]) {
        const { data, error } = await supabaseAdmin
            .from('attendance')
            .upsert(attendanceRecords.map(r => ({
                ...r,
                status: r.status.toLowerCase() // Ensure lowercase as per schema
            })), { onConflict: 'student_id,date' })
        return { data, error }
    },

    async getAttendance(filters: { date?: string, gradeLevel?: number, section?: string }) {
        let query = supabaseAdmin
            .from('attendance')
            .select(`
                *,
                student:students(
                    first_name, 
                    last_name, 
                    student_id,
                    class:classes(grade_level, section)
                )
            `)

        if (filters.date) {
            query = query.eq('date', filters.date)
        }

        const { data, error } = await query.order('date', { ascending: false })

        // Post-filter for grade/section if needed (or we could use complex joins/RPC if many records)
        let filteredData = data;
        if (data && (filters.gradeLevel || filters.section)) {
            filteredData = data.filter((record: any) => {
                const studentClass = record.student?.class;
                const matchesGrade = !filters.gradeLevel || studentClass?.grade_level === filters.gradeLevel;
                const matchesSection = !filters.section || studentClass?.section === filters.section;
                return matchesGrade && matchesSection;
            });
        }

        return { data: filteredData, error }
    },

    // --- Announcements ---
    async getAnnouncements(audience?: string) {
        let query = supabaseAdmin
            .from('announcements')
            .select('*')
            .order('created_at', { ascending: false })

        if (audience) {
            query = query.contains('target_audience', [audience])
        }

        const { data, error } = await query
        return { data, error }
    },

    async createAnnouncement(announcementData: any) {
        const { data, error } = await supabaseAdmin
            .from('announcements')
            .insert([announcementData])
            .select()
        return { data, error }
    },

    // --- Fees ---
    async getFeePayments(filters?: { studentId?: string, month?: string }) {
        let query = supabaseAdmin
            .from('fee_payments')
            .select(`
                *,
                student:students(
                    first_name, 
                    last_name, 
                    student_id,
                    class:classes(grade_level, section)
                ),
                structure:fee_structure(fee_type, amount)
            `)

        if (filters?.studentId) {
            query = query.eq('student_id', filters.studentId)
        }

        const { data, error } = await query.order('payment_date', { ascending: false })
        return { data, error }
    },

    async createFeePayment(paymentData: any) {
        const { data, error } = await supabaseAdmin
            .from('fee_payments')
            .insert([paymentData])
            .select()
        return { data, error }
    },

    async getFeeStructure(classId?: string) {
        let query = supabaseAdmin
            .from('fee_structure')
            .select('*')

        if (classId) {
            query = query.eq('class_id', classId)
        }

        const { data, error } = await query
        return { data, error }
    },

    // --- Parents/Parent Portal ---
    async getChildrenByParent(parentUserId: string) {
        const { data, error } = await supabaseAdmin
            .from('parent_student')
            .select(`
                relationship,
                student:students(
                    id,
                    student_id,
                    first_name,
                    last_name,
                    status,
                    photo_url,
                    class:classes(grade_level, section)
                )
            `)
            .eq('parent_id', parentUserId)

        return { data, error }
    }
}
