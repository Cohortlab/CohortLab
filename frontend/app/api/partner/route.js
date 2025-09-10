import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward the JSON data to the backend
    const response = await fetch(`${BACKEND_URL}/api/partner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Partner API error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/partner`);
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Partner GET API error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}
