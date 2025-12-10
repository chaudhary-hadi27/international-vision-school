/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Format date to short string
 */
export function formatDateShort(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * Format currency (PKR)
 */
export function formatCurrency(amount: number): string {
    return `Rs. ${amount.toLocaleString('en-PK')}`
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '')

    // Format as 0XXX XXXXXXX
    if (cleaned.length === 11) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
    }

    return phone
}

/**
 * Format CNIC
 */
export function formatCNIC(cnic: string): string {
    // Remove all non-digits
    const cleaned = cnic.replace(/\D/g, '')

    // Format as XXXXX-XXXXXXX-X
    if (cleaned.length === 13) {
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12)}`
    }

    return cnic
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date | string): number {
    const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--
    }

    return age
}

/**
 * Get relative time (e.g., "2 days ago")
 */
export function getRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length) + '...'
}

/**
 * Generate application ID
 */
export function generateApplicationId(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000)
    return `IVS${timestamp}${random}`
}