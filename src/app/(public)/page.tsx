import Hero from '@/components/home/Hero'

export default function HomePage() {
    return (
        <main>
            <Hero />

            {/* Trust Badges Section */}
            <section className="py-12 bg-white border-t border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-blue-900 font-bold text-lg mb-1">Playgroup - Grade 10</div>
                            <div className="text-gray-600 text-sm">Complete Education</div>
                        </div>
                        <div>
                            <div className="text-blue-900 font-bold text-lg mb-1">Safe Environment</div>
                            <div className="text-gray-600 text-sm">CCTV Monitored</div>
                        </div>
                        <div>
                            <div className="text-blue-900 font-bold text-lg mb-1">Activity-Based Learning</div>
                            <div className="text-gray-600 text-sm">Engaging Classes for Students</div>
                        </div>
                        <div>
                            <div className="text-blue-900 font-bold text-lg mb-1">Smart Classes</div>
                            <div className="text-gray-600 text-sm">Tech-Enabled Learning</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* More sections will be added here */}
        </main>
    )
}