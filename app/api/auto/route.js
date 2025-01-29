import { NextResponse } from 'next/server';

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request) {
  try {
    const { reg, vin } = await request.json();

    if (!reg || !vin) {
      return NextResponse.json(
        { error: 'Trūkst reģistrācijas vai apliecības numurs(VIN)' },
        { status: 400 },
      );
    }

    const companies = [
      {
        id: 'balcia',
        logo: '/balcia.png',
        prices: { 1: 14.5, 3: 33.56, 6: 65.2, 9: 98.8, 12: 117.23 },
      },
      {
        id: 'gjensidige',
        logo: '/gjensidige.png',
        prices: { 1: 13.19, 3: 31.12, 6: 62.34, 9: 93.01, 12: 113.24 },
      },
      {
        id: 'ergo',
        logo: '/ergo.png',
        prices: { 1: 12.92, 3: 29.84, 6: 59.96, 9: 90.13, 12: 110.04 },
      },
    ];

    await pause(1000);

    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
