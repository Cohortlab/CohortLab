import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'stats';
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    
    let url = `${BACKEND_URL}/api/newsletter/${endpoint}`;
    const params = new URLSearchParams();
    
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Newsletter GET API error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Forward the JSON data to the backend
    const response = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
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

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Newsletter POST API error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}