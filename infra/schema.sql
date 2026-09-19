-- Supabase Database Schema for CRM Immobilier IA
-- Based on DATABASE.md specifications

-- 1. profiles table - Users of the agency
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  role TEXT CHECK (role IN ('admin', 'agent', 'manager')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. prospects table - Prospects/leads
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  job_title TEXT,
  company TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  country TEXT DEFAULT 'Burkina Faso',
  category TEXT CHECK (category IN ('vip', 'middle_manager', 'employee')),
  score INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('new', 'to_contact', 'contacted', 'interested', 'client', 'not_interested', 'inactive')),
  source TEXT,
  source_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. properties table - Real estate properties
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT,
  title TEXT,
  type TEXT CHECK (type IN ('house', 'villa', 'duplex', 'apartment', 'building', 'office', 'land', 'other')),
  transaction_type TEXT CHECK (transaction_type IN ('sale', 'rent')),
  price NUMERIC,
  city TEXT,
  neighborhood TEXT,
  address TEXT,
  area NUMERIC, -- in m²
  rooms INTEGER,
  description TEXT,
  availability TEXT CHECK (availability IN ('available', 'reserved', 'sold', 'rented', 'archived')),
  owner_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. property_images table - Property images
CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. requests table - Property requests from prospects/clients
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE SET NULL,
  type TEXT,
  transaction_type TEXT CHECK (transaction_type IN ('sale', 'rent')),
  min_budget NUMERIC,
  max_budget NUMERIC,
  city TEXT,
  neighborhood TEXT,
  requirements TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. opportunities table - Commercial opportunities
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  title TEXT,
  stage TEXT CHECK (stage IN ('new', 'contacted', 'interested', 'visit', 'negotiation', 'won', 'lost')),
  amount NUMERIC,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. activities table - Activity history
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('call', 'meeting', 'note', 'task')),
  title TEXT,
  description TEXT,
  due_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. prospect_searches table - IA search history
CREATE TABLE IF NOT EXISTS prospect_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  city TEXT,
  sector TEXT,
  prospect_type TEXT,
  category TEXT,
  requested_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. prospect_search_results table - IA search results
CREATE TABLE IF NOT EXISTS prospect_search_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id UUID REFERENCES prospect_searches(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  job_title TEXT,
  company TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  category TEXT,
  score INTEGER DEFAULT 0,
  source TEXT,
  source_url TEXT,
  is_imported BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_prospects_category ON prospects(category);
CREATE INDEX IF NOT EXISTS idx_prospects_city ON prospects(city);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(score DESC);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_requests_prospect_id ON requests(prospect_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_prospect_id ON opportunities(prospect_id);
CREATE INDEX IF NOT EXISTS idx_activities_prospect_id ON activities(prospect_id);
CREATE INDEX IF NOT EXISTS idx_prospect_search_results_search_id ON prospect_search_results(search_id);
CREATE INDEX IF NOT EXISTS idx_prospect_search_results_is_imported ON prospect_search_results(is_imported);

-- Comment to document the schema
COMMENT ON TABLE profiles IS 'Users of the agency (admin, agent, manager)';
COMMENT ON TABLE prospects IS 'Prospects/leads generated or imported into the CRM';
COMMENT ON TABLE properties IS 'Real estate properties managed by the agency';
COMMENT ON TABLE opportunities IS 'Commercial opportunities linked to prospects/properties';