import { SCHOOL_INFO } from './constants'

export function sendWhatsAppMessage(message: string) {
    const url = `https://wa.me/${SCHOOL_INFO.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
}

export function sendAdmissionInquiry(data: {
    studentName: string
    parentName: string
    phone: string
    grade: string
}) {
    const message = `
🎓 *Admission Inquiry - IVS*

Student Name: ${data.studentName}
Parent Name: ${data.parentName}
Phone: ${data.phone}
Grade: ${data.grade}

Please provide more information.
  `.trim()

    sendWhatsAppMessage(message)
}