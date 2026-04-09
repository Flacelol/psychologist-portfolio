CREATE TABLE IF NOT EXISTS public.articles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    date date NOT NULL,
    text text NOT NULL,
    link text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON public.articles
    FOR SELECT
    USING (true);

-- Allow public insert (for our simple admin panel)
CREATE POLICY "Allow public insert" ON public.articles
    FOR INSERT
    WITH CHECK (true);

-- Allow public delete (for our simple admin panel)
CREATE POLICY "Allow public delete" ON public.articles
    FOR DELETE
    USING (true);