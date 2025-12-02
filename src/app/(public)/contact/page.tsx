"use client";

import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar, Users } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.phone && formData.subject && formData.message) {
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                })
            }, 3000)
        }
    }

    return (
        <main className="pt-20">

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions about admissions, curriculum, or campus facilities?
                        We're here to help. Get in touch with us today.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-6">

                        <div className="bg-blue-50 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-600 text-sm mb-2">Call us anytime</p>
                            <a href="tel:+92423xxxxxxx" className="text-blue-900 font-semibold hover:underline">
                                +92 42 3XXXXXXX
                            </a>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600 text-sm mb-2">Send us a message</p>
                            <a href="mailto:info@ivs.edu.pk" className="text-green-700 font-semibold hover:underline">
                                info@ivs.edu.pk
                            </a>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Location</h3>
                            <p className="text-gray-600 text-sm mb-2">Visit our campus</p>
                            <p className="text-purple-700 font-semibold">
                                Lahore, Pakistan
                            </p>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Office Hours</h3>
                            <p className="text-gray-600 text-sm mb-2">Monday - Friday</p>
                            <p className="text-amber-700 font-semibold">
                                8:00 AM - 3:00 PM
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div className="bg-white rounded-3xl shadow-xl p-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                            <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>

                            {submitted && (
                                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6">
                                    <p className="text-green-700 font-semibold">✓ Message sent successfully! We'll contact you soon.</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                        placeholder="+92 3XX XXXXXXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="admission">Admission Inquiry</option>
                                        <option value="curriculum">Curriculum Information</option>
                                        <option value="fees">Fee Structure</option>
                                        <option value="visit">Campus Visit</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-900 focus:outline-none transition resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">

                            {/* Quick Contact */}
                            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-10 text-white">
                                <h2 className="text-3xl font-bold mb-6">Quick Contact</h2>
                                <div className="space-y-6">

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Call Us</h3>
                                            <p className="opacity-90">Main Office: +92 42 3XXXXXXX</p>
                                            <p className="opacity-90">Admission Office: +92 3XX XXXXXXX</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Email Us</h3>
                                            <p className="opacity-90">General: info@ivs.edu.pk</p>
                                            <p className="opacity-90">Admissions: admissions@ivs.edu.pk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">Visit Us</h3>
                                            <p className="opacity-90">International Vision School</p>
                                            <p className="opacity-90">Main Campus, Lahore, Pakistan</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Department Contacts */}
                            <div className="bg-white rounded-3xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h3>
                                <div className="space-y-4">

                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                                        <Users className="w-5 h-5 text-blue-900" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Admissions Office</p>
                                            <p className="text-sm text-gray-600">admissions@ivs.edu.pk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                                        <MessageSquare className="w-5 h-5 text-green-700" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Principal's Office</p>
                                            <p className="text-sm text-gray-600">principal@ivs.edu.pk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                                        <Calendar className="w-5 h-5 text-purple-700" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Accounts Office</p>
                                            <p className="text-sm text-gray-600">accounts@ivs.edu.pk</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-amber-700" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Reception</p>
                                            <p className="text-sm text-gray-600">reception@ivs.edu.pk</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Find Us on the Map</h2>
                    <p className="text-center text-gray-600 mb-12">Located in the heart of Lahore, easily accessible from all areas</p>

                    <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-xl h-96 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Map integration placeholder</p>
                            <p className="text-sm text-gray-500">Add Google Maps embed here</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-center text-gray-600 mb-12">Quick answers to common questions</p>

                    <div className="space-y-4">

                        <details className="bg-white rounded-xl shadow-md overflow-hidden">
                            <summary className="px-8 py-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition">
                                What are the admission requirements?
                            </summary>
                            <div className="px-8 pb-6 text-gray-600">
                                Admission requirements vary by grade level. Generally, we require previous academic records,
                                birth certificate, and an entrance assessment. Please contact our admissions office for specific requirements.
                            </div>
                        </details>

                        <details className="bg-white rounded-xl shadow-md overflow-hidden">
                            <summary className="px-8 py-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition">
                                When can I schedule a campus visit?
                            </summary>
                            <div className="px-8 pb-6 text-gray-600">
                                Campus visits are available Monday through Friday from 9:00 AM to 2:00 PM.
                                Please call us at least one day in advance to schedule your visit.
                            </div>
                        </details>

                        <details className="bg-white rounded-xl shadow-md overflow-hidden">
                            <summary className="px-8 py-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition">
                                What is the fee structure?
                            </summary>
                            <div className="px-8 pb-6 text-gray-600">
                                Our fee structure varies by grade level and includes tuition, books, and activities.
                                Please contact our accounts office or download our fee structure document from the admissions page.
                            </div>
                        </details>

                        <details className="bg-white rounded-xl shadow-md overflow-hidden">
                            <summary className="px-8 py-6 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition">
                                Do you provide transportation?
                            </summary>
                            <div className="px-8 pb-6 text-gray-600">
                                Yes, we provide safe and reliable transportation services covering major areas of Lahore.
                                Transportation fees are separate from tuition fees.
                            </div>
                        </details>

                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-gradient-to-br from-white to-white text-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
                    <p className="text-xl opacity-90 mb-8">
                        Our team is ready to assist you. Contact us today and we'll be happy to help!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="tel:+92423xxxxxxx" className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
                            Call Now
                        </a>
                        <a href="/admissions" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition">
                            Apply for Admission
                        </a>
                    </div>
                </div>
            </section>

        </main>
    )
}