-- Create a table for storing sustainability history
create table history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sustainability_score integer not null,
  sustainability_level text not null,
  user_data jsonb not null, -- Stores the full input form data
  results_data jsonb not null -- Stores the full analysis result
);

-- Set up Row Level Security (RLS)
alter table history enable row level security;

-- Policy: Users can only insert their own data
create policy "Users can insert their own history"
  on history for insert
  with check (auth.uid() = user_id);

-- Policy: Users can only view their own data
create policy "Users can view their own history"
  on history for select
  using (auth.uid() = user_id);
