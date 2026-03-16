
CREATE TABLE public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  eggs_found INTEGER NOT NULL DEFAULT 0,
  quiz_score INTEGER NOT NULL DEFAULT 0,
  quiz_time_seconds INTEGER,
  total_score INTEGER GENERATED ALWAYS AS (eggs_found * 10 + quiz_score * 20) STORED,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view leaderboard" ON public.leaderboard FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert scores" ON public.leaderboard FOR INSERT TO anon, authenticated WITH CHECK (true);
