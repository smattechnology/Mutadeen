// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Example: log pathname or set header based on route
  console.log("Middleware matched route:", pathname);

  if (pathname.startsWith("/admin")) {
    // Optional: set a custom header to detect admin route
    const response = NextResponse.next();
    response.headers.set("x-skip-root-layout", "true");
    return response;
  }

  return NextResponse.next();
}

// Apply middleware to all routes, or narrow it if you want
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
