-- Seed 20 sample events for testing
-- Replace 'USER_ID' with an actual user ID from auth.users

INSERT INTO public.events (id, name, sport_type, date_time, description, venues, user_id)
VALUES
  (gen_random_uuid(), 'Monday Night Soccer', 'soccer', '2026-01-20 19:00:00+00', 'Competitive match', ARRAY['Central Park Field'], 'USER_ID'),
  (gen_random_uuid(), 'Sunday Soccer Pickup', 'soccer', '2026-01-26 14:00:00+00', 'Friendly game', ARRAY['Prospect Park'], 'USER_ID'),
  (gen_random_uuid(), 'Soccer Training', 'soccer', '2026-02-01 10:00:00+00', 'Skills and drills', ARRAY['Sports Complex'], 'USER_ID'),
  (gen_random_uuid(), 'Soccer Tournament', 'soccer', '2026-02-08 08:00:00+00', 'Multi-team event', ARRAY['Chelsea Piers'], 'USER_ID'),
  
  (gen_random_uuid(), 'Basketball 3v3', 'basketball', '2026-01-21 18:30:00+00', 'Fast-paced game', ARRAY['Rucker Park'], 'USER_ID'),
  (gen_random_uuid(), 'Pickup Basketball', 'basketball', '2026-01-25 16:00:00+00', 'Walk-in welcome', ARRAY['Riverside Park'], 'USER_ID'),
  (gen_random_uuid(), 'Basketball Workshop', 'basketball', '2026-02-03 17:00:00+00', 'Skills training', ARRAY['Sports Arena'], 'USER_ID'),
  
  (gen_random_uuid(), 'Tennis Doubles', 'tennis', '2026-01-22 09:00:00+00', 'Tournament', ARRAY['Tennis Club'], 'USER_ID'),
  (gen_random_uuid(), 'Tennis Coaching', 'tennis', '2026-01-29 15:00:00+00', 'Professional instruction', ARRAY['Tennis Courts'], 'USER_ID'),
  (gen_random_uuid(), 'Mixed Doubles Tennis', 'tennis', '2026-02-05 10:00:00+00', 'Social event', ARRAY['Tennis Club'], 'USER_ID'),
  
  (gen_random_uuid(), '5K Run', 'running', '2026-01-25 07:00:00+00', 'Morning run', ARRAY['Washington Square Park'], 'USER_ID'),
  (gen_random_uuid(), 'Half Marathon Training', 'running', '2026-02-01 06:30:00+00', 'Training session', ARRAY['Hudson River'], 'USER_ID'),
  
  (gen_random_uuid(), 'Beach Volleyball', 'volleyball', '2026-01-26 10:00:00+00', 'Tournament', ARRAY['Rockaway Beach'], 'USER_ID'),
  (gen_random_uuid(), 'Indoor Volleyball', 'volleyball', '2026-01-28 19:00:00+00', 'League match', ARRAY['Sports Complex'], 'USER_ID'),
  
  (gen_random_uuid(), 'Swimming Class', 'swimming', '2026-01-23 08:00:00+00', 'Beginner to intermediate', ARRAY['Aquatic Center'], 'USER_ID'),
  (gen_random_uuid(), 'Open Water Swimming', 'swimming', '2026-02-07 09:00:00+00', 'Ocean swimming', ARRAY['Coney Island'], 'USER_ID'),
  
  (gen_random_uuid(), 'Baseball Training', 'baseball', '2026-02-10 14:00:00+00', 'Spring training', ARRAY['Stadium'], 'USER_ID'),
  
  (gen_random_uuid(), 'Golf Tournament', 'golf', '2026-02-15 08:00:00+00', '18-hole event', ARRAY['Golf Course'], 'USER_ID'),
  
  (gen_random_uuid(), 'Volleyball League', 'volleyball', '2026-02-02 19:30:00+00', 'Weekly match', ARRAY['Sports Hall'], 'USER_ID'),
  (gen_random_uuid(), 'Football Game', 'football', '2026-02-20 15:00:00+00', 'Friendly match', ARRAY['Field'], 'USER_ID');
