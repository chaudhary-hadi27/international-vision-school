// app/(public)/layout.tsx

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <WhatsAppButton />
        </>
    )
}