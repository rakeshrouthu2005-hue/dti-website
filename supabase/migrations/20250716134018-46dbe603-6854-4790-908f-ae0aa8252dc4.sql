
-- First, let's add progress and rating columns to existing tables
ALTER TABLE teams ADD COLUMN IF NOT EXISTS progress INTEGER DEFAULT 0;

-- Add rating column to team_members table
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 0;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for teams table to update timestamp on changes
DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for teams and team_members tables
ALTER TABLE teams REPLICA IDENTITY FULL;
ALTER TABLE team_members REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER publication supabase_realtime ADD TABLE teams;
ALTER publication supabase_realtime ADD TABLE team_members;

-- Create RLS policies for admin access to update data
CREATE POLICY "Allow admin updates on teams" ON teams
FOR UPDATE USING (true);

CREATE POLICY "Allow admin updates on team_members" ON team_members  
FOR UPDATE USING (true);
