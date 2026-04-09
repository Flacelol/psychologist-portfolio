-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for storage
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Public Insert" ON storage.objects;
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'photos');

DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'photos');

-- Create table for group photos
CREATE TABLE IF NOT EXISTS public.group_photos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.group_photos ENABLE ROW LEVEL SECURITY;

-- Policies for table
DROP POLICY IF EXISTS "Allow public read" ON public.group_photos;
CREATE POLICY "Allow public read" ON public.group_photos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.group_photos;
CREATE POLICY "Allow public insert" ON public.group_photos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete" ON public.group_photos;
CREATE POLICY "Allow public delete" ON public.group_photos FOR DELETE USING (true);