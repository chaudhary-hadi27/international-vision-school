export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Server-side initialization
        console.log('Server instrumentation loaded')
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
        // Edge runtime initialization
        console.log('Edge instrumentation loaded')
    }
}