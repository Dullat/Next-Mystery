import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  console.log("Request:", request.nextUrl.pathname)

  if (request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/posts", request.url))
  }

  return NextResponse.next()
}
