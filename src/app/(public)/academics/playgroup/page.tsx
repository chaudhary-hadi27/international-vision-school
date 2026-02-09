import Link from 'next/link'
import { Baby, Heart, Palette, Music, Users, Clock, Calendar, ArrowLeft } from 'lucide-react'

export default function PlaygroupPage() {
    return (
        <main className="pt-20">

            {/* Back Button */}
            <div className="bg-white py-4 px-4 border-b border-pink-100">
                <div className="max-w-7xl mx-auto">
                    <Link href="/academics" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-semibold">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Academics
                    </Link>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-gradient-to-br from-pink-50 to-rose-100 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="w-24 h-24 bg-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Baby className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Playgroup Program</h1>
                    <p className="text-xl text-gray-600 mb-2">Ages 2-3 Years</p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        A nurturing environment where your child's learning journey begins through play and exploration
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Program Overview</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Our Playgroup program is designed for children aged 2-3 years, providing a safe, loving,
                            and stimulating environment where early learning happens naturally through play-based activities.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We focus on social, emotional, physical, and cognitive development through age-appropriate
                            activities that encourage curiosity, creativity, and confidence in young learners.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What We Offer</h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Loving Care</h3>
                            <p className="text-gray-700">
                                Trained teachers provide individual attention and create a warm, secure environment
                                where children feel comfortable and happy.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Palette className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Creative Play</h3>
                            <p className="text-gray-700">
                                Art, crafts, coloring, and sensory activities that develop fine motor skills
                                and encourage creative expression.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Music className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Music & Movement</h3>
                            <p className="text-gray-700">
                                Rhymes, songs, dancing, and physical activities that develop coordination
                                and language skills through fun.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Skills</h3>
                            <p className="text-gray-700">
                                Group activities that teach sharing, taking turns, and building friendships
                                with other children.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                <Baby className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Safe Environment</h3>
                            <p className="text-gray-700">
                                Child-friendly furniture, soft play areas, and constant supervision
                                ensure your child's safety at all times.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-16 h-16 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-rose-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Small Groups</h3>
                            <p className="text-gray-700">
                                Maximum 15 children per class ensures each child receives personal
                                attention and care from teachers.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Daily Activities */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Daily Activities</h2>

                    <div className="space-y-4">
                        <div className="bg-pink-50 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Circle Time & Greetings</h3>
                                <p className="text-gray-700">Morning assembly with songs, rhymes, and sharing time</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Creative Activities</h3>
                                <p className="text-gray-700">Art, coloring, clay modeling, and craft work</p>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Play Time</h3>
                                <p className="text-gray-700">Indoor and outdoor play with toys and games</p>
                            </div>
                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">4</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Snack & Lunch Time</h3>
                                <p className="text-gray-700">Healthy eating habits and table manners</p>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">5</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Story Time</h3>
                                <p className="text-gray-700">Picture books, storytelling, and language development</p>
                            </div>
                        </div>

                        <div className="bg-rose-50 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">6</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Goodbye Time</h3>
                                <p className="text-gray-700">Review of the day and preparation for home</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timings */}
            <section className="py-20 px-4 bg-gradient-to-br from-pink-500 to-rose-600 text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Class Timings</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8">
                            <Clock className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Morning Session</h3>
                            <p className="text-xl mb-2">8:00 AM - 12:00 PM</p>
                            <p className="opacity-90">Monday to Friday</p>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8">
                            <Calendar className="w-12 h-12 mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Class Size</h3>
                            <p className="text-xl mb-2">Maximum 15 Students</p>
                            <p className="opacity-90">1 Teacher + 1 Helper</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Enroll Your Child Today</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Give your child the best start in their educational journey
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/admissions" className="px-8 py-4 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition shadow-lg">
                            Apply for Admission
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-white text-pink-500 border-2 border-pink-500 rounded-lg font-semibold hover:bg-gray-50 transition">
                            Schedule a Visit
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}