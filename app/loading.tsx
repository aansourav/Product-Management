import { Loader2, Package } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Animated Logo */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg">
          <Package className="h-10 w-10 text-primary-foreground" />
          <div className="absolute inset-0 rounded-2xl bg-primary animate-pulse opacity-50" />
        </div>

        {/* Loading Spinner */}
        <div className="animate-spin">
          <Loader2 className="h-8 w-8 text-primary" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-foreground">Loading...</p>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
