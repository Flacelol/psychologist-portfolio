CREATE TABLE IF NOT EXISTS public.certificates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url text NOT NULL,
    title text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies for table
DROP POLICY IF EXISTS "Allow public read" ON public.certificates;
CREATE POLICY "Allow public read" ON public.certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.certificates;
CREATE POLICY "Allow public insert" ON public.certificates FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete" ON public.certificates;
CREATE POLICY "Allow public delete" ON public.certificates FOR DELETE USING (true);