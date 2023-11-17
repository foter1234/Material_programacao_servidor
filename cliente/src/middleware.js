'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";


export const middleware =async (request) => {

    const token = request.cookies.get('token')?.value;

    const urlLogin = new URL('/', request.url);

    const urlDashboard = new URL('/pages/dashboard', request.url);

    const urlregister = new URL('/pages/register', request.url);

    const urlalterar = new URL('/pages/alterar', request.url);

    const isTokenValidated = await validateToken(token);

    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard') {
            return NextResponse.redirect(urlLogin);
        }
    }

    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/alterar') {
            return NextResponse.redirect(urlLogin);
        }
    }
    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/register') {
            return NextResponse.redirect(urlLogin);
        }
    }


    if (isTokenValidated) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urlDashboard);
        }
    }

    if (isTokenValidated) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urlregister);
        }
    }

    if (isTokenValidated) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urlalterar);
        }
    }



    NextResponse.next();
};
export const config = {
    matcher: ['/', '/pages/dashboard','/pages/register','/pages/alterar', ]
};

