
-- Add rating column to teams table for leader ratings if it doesn't exist
ALTER TABLE teams ADD COLUMN IF NOT EXISTS leader_rating INTEGER DEFAULT 0;

-- Update team_members table to ensure rating column exists with proper default
ALTER TABLE team_members ALTER COLUMN rating SET DEFAULT 0;

-- Make sure both tables have proper indexes for performance
CREATE INDEX IF NOT EXISTS idx_teams_leader_rating ON teams(leader_rating);
CREATE INDEX IF NOT EXISTS idx_team_members_rating ON team_members(rating);

-- Ensure realtime is enabled for both tables
ALTER TABLE teams REPLICA IDENTITY FULL;
ALTER TABLE team_members REPLICA IDENTITY FULL;

-- Add tables to realtime publication if not already added
DO $$
BEGIN
    -- Add teams table to realtime publication
    BEGIN
        ALTER publication supabase_realtime ADD TABLE teams;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL; -- Table already in publication
    END;
    
    -- Add team_members table to realtime publication  
    BEGIN
        ALTER publication supabase_realtime ADD TABLE team_members;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL; -- Table already in publication
    END;
END $$;
