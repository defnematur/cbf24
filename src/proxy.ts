import { NextResponse, type NextRequest } from "next/server";

// Groß-/Kleinschreibung-sensitive Weiterleitung der alten URL /DATENSCHUTZ.
// In next.config.ts würde die Regel auch /datenschutz selbst treffen (Endlosschleife).
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/DATENSCHUTZ") {
    return NextResponse.redirect(new URL("/datenschutz", request.url), 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/DATENSCHUTZ", "/datenschutz"],
};
