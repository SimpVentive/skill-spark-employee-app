import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Search, RotateCcw, CheckCircle2, Library as LibraryIcon } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FeatureIntro from "@/components/shared/FeatureIntro";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Library = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: books, isLoading: booksLoading } = useQuery({
    queryKey: ["library_books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_books")
        .select("*")
        .order("title");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: myCheckouts } = useQuery({
    queryKey: ["library_checkouts", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_checkout_records")
        .select("*")
        .eq("user_id", user!.id)
        .eq("status", "checked_out");
      if (error) throw error;
      return data ?? [];
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (bookId: string) => {
      if (!user?.id) throw new Error("You must be signed in.");
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      const { error } = await supabase.from("library_checkout_records").insert({
        book_id: bookId,
        user_id: user.id,
        due_date: dueDate.toISOString(),
        status: "checked_out",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Book checked out for 14 days");
      qc.invalidateQueries({ queryKey: ["library_checkouts"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Check out failed"),
  });

  const checkinMutation = useMutation({
    mutationFn: async (checkoutId: string) => {
      const { error } = await supabase
        .from("library_checkout_records")
        .update({ status: "returned", return_date: new Date().toISOString() })
        .eq("id", checkoutId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Book returned");
      qc.invalidateQueries({ queryKey: ["library_checkouts"] });
    },
    onError: (e: any) => toast.error(e.message ?? "Check in failed"),
  });

  const checkoutByBook = new Map(
    (myCheckouts ?? []).map((c: any) => [c.book_id, c])
  );

  const filtered = (books ?? []).filter((b: any) => {
    const q = searchQuery.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    );
  });

  return (
    <ProtectedRoute>
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Digital Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse, check out and return books from your company library
          </p>
        </div>

        <FeatureIntro
          title="How the Library works"
          description="Find a book, click Check Out to borrow it for 14 days, and click Return when you're done. Your active loans are tracked automatically."
        />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, author or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {booksLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No books found.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((book: any) => {
              const myCheckout = checkoutByBook.get(book.id);
              const isMine = !!myCheckout;
              const isAvailable = book.availability === "Available";

              return (
                <Card key={book.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <BookOpen className="h-8 w-8 text-primary" />
                      {isMine ? (
                        <Badge>Checked out by you</Badge>
                      ) : !isAvailable ? (
                        <Badge variant="secondary">Unavailable</Badge>
                      ) : (
                        <Badge variant="outline">Available</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <CardDescription>by {book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {book.category && <Badge variant="outline">{book.category}</Badge>}
                    {book.location && (
                      <p className="text-sm text-muted-foreground">
                        Location: {book.location}
                      </p>
                    )}
                    {isMine && myCheckout.due_date && (
                      <p className="text-sm text-orange-600">
                        Due: {new Date(myCheckout.due_date).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {isMine ? (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => checkinMutation.mutate(myCheckout.id)}
                          disabled={checkinMutation.isPending}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Return
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => checkoutMutation.mutate(book.id)}
                          disabled={checkoutMutation.isPending || !isAvailable}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Check Out
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Library;
