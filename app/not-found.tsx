'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SearchX, Home, ArrowLeft } from 'lucide-react';

/**
 * 404 Not Found Page
 * Displays a user-friendly 404 error with navigation options
 * Built with atomic design principles and shadcn/ui components
 */
const NotFoundPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen mx-auto space-y-8 p-4 md:p-8">
      {/* 404 Content */}
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-6 max-w-md">
          {/* Large 404 Icon */}
          <div className="relative">
            <SearchX className="h-24 w-24 text-muted-foreground mx-auto" />
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" className="gap-2">
              <Link href="/en">
                <Home className="h-4 w-4" />
                Go to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Additional Help */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p>If you think this is a mistake, please contact support.</p>
            <p>Or try searching for what you need from the home page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
