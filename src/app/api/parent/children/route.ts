import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SupabaseService } from '@/lib/services/supabase-service'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'PARENT') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
        }

        const { data, error } = await SupabaseService.getChildrenByParent(session.user.id)

        if (error) {
            console.error('Supabase get children error:', error)
            return NextResponse.json({ success: false, message: 'Error fetching children' }, { status: 500 })
        }

        // Transform data to match frontend expectations
        const transformedData = data?.map((item: any) => ({
            id: item.student.id,
            name: `${item.student.first_name} ${item.student.last_name}`,
            rollNumber: item.student.student_id,
            grade: item.student.class?.grade_level ? `Class ${item.student.class.grade_level}` : 'N/A',
            section: item.student.class?.section || 'N/A',
            photoUrl: item.student.photo_url,
            relationship: item.relationship
        }))

        return NextResponse.json({ success: true, data: transformedData })
    } catch (error) {
        console.error('Get children error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}