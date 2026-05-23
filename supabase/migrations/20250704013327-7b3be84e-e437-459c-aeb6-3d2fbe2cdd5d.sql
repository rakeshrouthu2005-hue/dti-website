
-- Create teams table to store all team data
CREATE TABLE public.teams (
  id SERIAL PRIMARY KEY,
  team_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  abstract TEXT,
  leader_username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id INTEGER REFERENCES public.teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_media table for project photos, videos, and presentations
CREATE TABLE public.team_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id INTEGER REFERENCES public.teams(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('project_photo', 'video', 'presentation')),
  file_url TEXT NOT NULL,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('team-media', 'team-media', true),
  ('team-videos', 'team-videos', true),
  ('team-presentations', 'team-presentations', true);

-- Enable RLS on all tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_media ENABLE ROW LEVEL SECURITY;

-- Create policies for teams table
CREATE POLICY "Anyone can view teams" ON public.teams FOR SELECT TO public USING (true);
CREATE POLICY "Team leaders can update their team" ON public.teams FOR UPDATE TO public USING (true);
CREATE POLICY "Team leaders can insert their team" ON public.teams FOR INSERT TO public WITH CHECK (true);

-- Create policies for team_members table
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can manage team members" ON public.team_members FOR ALL TO public USING (true) WITH CHECK (true);

-- Create policies for team_media table
CREATE POLICY "Anyone can view team media" ON public.team_media FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can manage team media" ON public.team_media FOR ALL TO public USING (true) WITH CHECK (true);

-- Create storage policies for file uploads
CREATE POLICY "Anyone can view team media files" ON storage.objects FOR SELECT TO public USING (bucket_id IN ('team-media', 'team-videos', 'team-presentations'));
CREATE POLICY "Anyone can upload team media files" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id IN ('team-media', 'team-videos', 'team-presentations'));
CREATE POLICY "Anyone can update team media files" ON storage.objects FOR UPDATE TO public USING (bucket_id IN ('team-media', 'team-videos', 'team-presentations'));
CREATE POLICY "Anyone can delete team media files" ON storage.objects FOR DELETE TO public USING (bucket_id IN ('team-media', 'team-videos', 'team-presentations'));

-- Insert initial team data
INSERT INTO public.teams (id, team_name, project_title, abstract, leader_username) VALUES
(1, 'Team 1', 'Project Title for Team 1', 'Project abstract for Team 1. This is a placeholder description that can be edited by the team leader.', '23KD1A0201'),
(2, 'Team 2', 'Project Title for Team 2', 'Project abstract for Team 2. This is a placeholder description that can be edited by the team leader.', '23KD1A0214'),
(3, 'Team 3', 'Project Title for Team 3', 'Project abstract for Team 3. This is a placeholder description that can be edited by the team leader.', '23KD1A0234'),
(4, 'Team 4', 'Project Title for Team 4', 'Project abstract for Team 4. This is a placeholder description that can be edited by the team leader.', '23KD1A0253'),
(5, 'Team 5', 'Project Title for Team 5', 'Project abstract for Team 5. This is a placeholder description that can be edited by the team leader.', '23KD1A0238'),
(6, 'Team 6', 'Project Title for Team 6', 'Project abstract for Team 6. This is a placeholder description that can be edited by the team leader.', '23KD1A0246'),
(7, 'Team 7', 'Project Title for Team 7', 'Project abstract for Team 7. This is a placeholder description that can be edited by the team leader.', '23KD1A0233'),
(8, 'Team 8', 'Project Title for Team 8', 'Project abstract for Team 8. This is a placeholder description that can be edited by the team leader.', '23KD1A0224'),
(9, 'Team 9', 'Project Title for Team 9', 'Project abstract for Team 9. This is a placeholder description that can be edited by the team leader.', '23KD1A0251'),
(10, 'Team 10', 'Project Title for Team 10', 'Project abstract for Team 10. This is a placeholder description that can be edited by the team leader.', '23KD1A0222'),
(11, 'Team 11', 'Project Title for Team 11', 'Project abstract for Team 11. This is a placeholder description that can be edited by the team leader.', '24KD5A0202'),
(12, 'Team 12', 'Project Title for Team 12', 'Project abstract for Team 12. This is a placeholder description that can be edited by the team leader.', '23KD1A0237'),
(13, 'Team 13', 'Project Title for Team 13', 'Project abstract for Team 13. This is a placeholder description that can be edited by the team leader.', '23KD1A0219'),
(14, 'Team 14', 'Project Title for Team 14', 'Project abstract for Team 14. This is a placeholder description that can be edited by the team leader.', '23KD1A0257'),
(15, 'Team 15', 'Project Title for Team 15', 'Project abstract for Team 15. This is a placeholder description that can be edited by the team leader.', '23KD1A0220'),
(16, 'Team 16', 'Project Title for Team 16', 'Project abstract for Team 16. This is a placeholder description that can be edited by the team leader.', '23KD1A0239'),
(17, 'Team 17', 'Project Title for Team 17', 'Project abstract for Team 17. This is a placeholder description that can be edited by the team leader.', '23KD1A0264');

-- Insert initial team members (3 placeholder members per team)
INSERT INTO public.team_members (team_id, name, photo_url) 
SELECT 
  t.id,
  'Team Member ' || generate_series(1, 3),
  '/placeholder.svg'
FROM public.teams t
CROSS JOIN generate_series(1, 3);
