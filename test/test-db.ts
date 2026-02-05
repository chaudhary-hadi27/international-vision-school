// test-db.ts (run this with: npx tsx test-db.ts)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
    try {
        console.log('🔍 Testing database connection...')

        // Test raw query
        await prisma.$queryRaw`SELECT 1`
        console.log('✅ Raw query successful')

        // Test count query
        const count = await prisma.admission.count()
        console.log(`✅ Found ${count} admissions in database`)

        console.log('✅ All database tests passed!')
    } catch (error) {
        console.error('❌ Database test failed:')
        console.error(error)
    } finally {
        await prisma.$disconnect()
    }
}

testConnection()