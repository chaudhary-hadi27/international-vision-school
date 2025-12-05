import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAdminNotification(data: any) {
    try {
        const { error } = await resend.emails.send({
            from: 'IVS Admissions <admissions@ivs.edu.pk>',
            to: process.env.RESEND_ADMIN_EMAIL || 'admin@ivs.edu.pk',
            subject: `🎓 New Admission Application - ${data.applicationId}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .label { font-weight: bold; color: #1e3a8a; }
            .button { display: inline-block; background: #1e3a8a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 New Admission Application</h1>
              <p style="margin: 0; opacity: 0.9;">Application ID: ${data.applicationId}</p>
            </div>
            <div class="content">
              <h2>Student Information</h2>
              <div class="info-row">
                <span class="label">Student Name:</span> ${data.studentName}
              </div>
              <div class="info-row">
                <span class="label">Date of Birth:</span> ${new Date(data.dateOfBirth).toLocaleDateString()}
              </div>
              <div class="info-row">
                <span class="label">Gender:</span> ${data.gender}
              </div>
              <div class="info-row">
                <span class="label">Applying for Grade:</span> ${data.grade}
              </div>
              
              <h2>Parent Information</h2>
              <div class="info-row">
                <span class="label">Father's Name:</span> ${data.fatherName}
              </div>
              <div class="info-row">
                <span class="label">Father's CNIC:</span> ${data.fatherCNIC}
              </div>
              <div class="info-row">
                <span class="label">Father's Phone:</span> ${data.fatherPhone}
              </div>
              <div class="info-row">
                <span class="label">Mother's Name:</span> ${data.motherName}
              </div>
              
              <h2>Contact Details</h2>
              <div class="info-row">
                <span class="label">Email:</span> ${data.email}
              </div>
              <div class="info-row">
                <span class="label">WhatsApp:</span> ${data.whatsappNumber}
              </div>
              <div class="info-row">
                <span class="label">Address:</span> ${data.address}, ${data.city}
              </div>
              
              <div style="text-align: center;">
                <a href="https://ivs.edu.pk/admin/applications/${data.applicationId}" class="button">
                  View Full Application
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
        })

        if (error) {
            console.error('Email Error:', error)
            return false
        }
        return true
    } catch (error) {
        console.error('Email Send Error:', error)
        return false
    }
}

export async function sendConfirmationEmail(
    email: string,
    applicationId: string,
    studentName: string
) {
    try {
        const { error } = await resend.emails.send({
            from: 'IVS Admissions <admissions@ivs.edu.pk>',
            to: email,
            subject: 'Application Received - International Vision School',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .app-id { background: white; border: 2px dashed #3b82f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .app-id-number { font-size: 28px; font-weight: bold; color: #1e3a8a; letter-spacing: 2px; }
            .steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .step { padding: 15px; margin: 10px 0; border-left: 4px solid #10b981; background: #f0fdf4; }
            .contact-box { background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Application Received!</h1>
              <p style="margin: 0; opacity: 0.9;">Thank you for choosing IVS</p>
            </div>
            <div class="content">
              <p>Dear Parent/Guardian,</p>
              
              <p>We have successfully received the admission application for <strong>${studentName}</strong>.</p>
              
              <div class="app-id">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your Application ID</p>
                <div class="app-id-number">${applicationId}</div>
                <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">Please save this ID for future reference</p>
              </div>
              
              <h2>What Happens Next?</h2>
              <div class="steps">
                <div class="step">
                  <strong>📧 Step 1: Application Review</strong><br>
                  Our admissions team will carefully review your application and documents.
                </div>
                <div class="step">
                  <strong>📞 Step 2: We'll Contact You</strong><br>
                  We will call or WhatsApp you within 2-3 business days to schedule an assessment.
                </div>
                <div class="step">
                  <strong>📝 Step 3: Assessment Test</strong><br>
                  Your child will appear for an age-appropriate assessment test.
                </div>
                <div class="step">
                  <strong>✅ Step 4: Final Decision</strong><br>
                  You'll receive the admission decision within 24-48 hours after assessment.
                </div>
              </div>
              
              <div class="contact-box">
                <strong>⚠️ Important:</strong> Please keep your phone and WhatsApp active. We'll contact you soon!
              </div>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              
              <p style="text-align: center; color: #666;">
                <strong>Need Help?</strong><br>
                📞 Call: +92 300 1234567<br>
                📧 Email: admissions@ivs.edu.pk<br>
                💬 WhatsApp: +92 300 1234567
              </p>
              
              <p style="text-align: center; margin-top: 30px;">
                <strong>International Vision School</strong><br>
                Building Tomorrow's Leaders Today
              </p>
            </div>
          </div>
        </body>
        </html>
      `
        })

        if (error) {
            console.error('Confirmation Email Error:', error)
            return false
        }
        return true
    } catch (error) {
        console.error('Email Send Error:', error)
        return false
    }
}


export async function sendStatusUpdateEmail(
    email: string,
    studentName: string,
    applicationId: string,
    status: string
) {
    try {
        const statusMessages = {
            approved: {
                subject: 'Congratulations! Application Approved - IVS',
                title: '🎉 Application Approved!',
                message: `We are pleased to inform you that the admission application for ${studentName} has been approved.`,
                color: '#16a34a'
            },
            rejected: {
                subject: 'Application Status Update - IVS',
                title: 'Application Status',
                message: `Thank you for your interest in IVS. Unfortunately, we are unable to process the application for ${studentName} at this time.`,
                color: '#dc2626'
            },
            under_review: {
                subject: 'Application Under Review - IVS',
                title: 'Application Under Review',
                message: `The admission application for ${studentName} is currently under review by our admissions team.`,
                color: '#2563eb'
            }
        }

        const statusInfo = statusMessages[status as keyof typeof statusMessages]

        if (!statusInfo) return

        const { error } = await resend.emails.send({
            from: 'IVS Admissions <admissions@ivs.edu.pk>',
            to: email,
            subject: statusInfo.subject,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${statusInfo.color}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: ${statusInfo.color}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${statusInfo.title}</h1>
            </div>
            <div class="content">
              <p>Dear Parent/Guardian,</p>
              <p>${statusInfo.message}</p>
              <p><strong>Application ID:</strong> ${applicationId}</p>
              <p><strong>Student Name:</strong> ${studentName}</p>
              
              ${status === 'approved' ? `
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                <h3>Next Steps:</h3>
                <ol>
                  <li>Visit the school office within 3 days</li>
                  <li>Submit original documents</li>
                  <li>Pay the admission fee</li>
                  <li>Collect your admission slip</li>
                </ol>
              ` : ''}
              
              <p style="margin-top: 30px;">For any queries, please contact us:</p>
              <p>
                📞 Phone: +92 300 1234567<br>
                📧 Email: admissions@ivs.edu.pk<br>
                💬 WhatsApp: +92 300 1234567
              </p>
              
              <p style="margin-top: 30px;">Best Regards,<br><strong>IVS Admissions Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `
        })

        if (error) {
            console.error('Status update email error:', error)
            return false
        }
        return true
    } catch (error) {
        console.error('Email send error:', error)
        return false
    }
}