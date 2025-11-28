async function bookSeat(seatId: number, user: string) {
    try {
        const response = await fetch('http://localhost:3000/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seatId, user }),
        });
        const data = await response.json();
        console.log(`User ${user} booking result:`, data);
    } catch (error) {
        console.error(`User ${user} booking failed:`, error);
    }
}

async function main() {
    console.log('Simulating concurrency...');
    // Try to book seat 1 simultaneously
    const p1 = bookSeat(1, 'UserA');
    const p2 = bookSeat(1, 'UserB');
    const p3 = bookSeat(1, 'UserC');

    await Promise.all([p1, p2, p3]);
}

main();
