-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  year VARCHAR(10) NOT NULL,
  area VARCHAR(100),
  architect VARCHAR(255) DEFAULT 'Hariom Jangid Architects',
  photographer VARCHAR(255),
  client VARCHAR(255),
  status VARCHAR(100) DEFAULT 'Completed',
  hero_image TEXT,
  description TEXT,
  images TEXT[], -- Array of image URLs
  content JSONB, -- Flexible content structure
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create design_board table
CREATE TABLE IF NOT EXISTS design_board (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create instagram_posts table
CREATE TABLE IF NOT EXISTS instagram_posts (
  id SERIAL PRIMARY KEY,
  image TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  post_link TEXT,
  post_date DATE NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for projects
INSERT INTO projects (title, subtitle, category, location, year, area, photographer, client, hero_image, description, images, content) VALUES
(
  'Modern Villa Complex',
  'Sustainable Residential Development',
  'Residential',
  'Mumbai, India',
  '2023',
  '2,450 m²',
  'Architectural Photography Studio',
  'Private Developer',
  '/images/modern-villa.jpg',
  'This modern villa complex represents a new paradigm in sustainable residential architecture, seamlessly blending contemporary design with environmental consciousness.',
  ARRAY['/images/modern-villa.jpg', '/images/corporate-building.jpg', '/images/interior-design.jpg', '/images/sustainable-building.jpg', '/images/cultural-center.jpg', '/images/hotel-lobby.jpg'],
  '[
    {
      "type": "text",
      "content": "The Modern Villa Complex stands as a testament to innovative residential design, where sustainability meets luxury. Located in the heart of Mumbai, this project redefines urban living through its thoughtful integration of green spaces, natural light, and contemporary architectural elements."
    },
    {
      "type": "image",
      "src": "/images/corporate-building.jpg",
      "caption": "The main facade showcases clean lines and large windows that maximize natural light penetration."
    },
    {
      "type": "text",
      "content": "The design philosophy centers around creating spaces that breathe. Each villa is strategically positioned to ensure privacy while maintaining visual connectivity with the surrounding landscape. The use of local materials and passive cooling strategies reduces the environmental footprint while creating comfortable living spaces."
    }
  ]'::jsonb
),
(
  'Corporate Headquarters',
  'Next-Generation Office Design',
  'Commercial',
  'Delhi, India',
  '2023',
  '5,200 m²',
  'Commercial Architecture Photos',
  'Tech Corporation',
  '/images/corporate-building.jpg',
  'A state-of-the-art corporate facility designed to foster innovation, collaboration, and employee well-being in the modern workplace.',
  ARRAY['/images/corporate-building.jpg', '/images/modern-villa.jpg', '/images/interior-design.jpg', '/images/cultural-center.jpg'],
  '[
    {
      "type": "text",
      "content": "The Corporate Headquarters project reimagines the modern workplace as a dynamic environment that adapts to the evolving needs of contemporary business. This 5,200 square meter facility in Delhi represents a new standard in commercial architecture."
    },
    {
      "type": "image",
      "src": "/images/interior-design.jpg",
      "caption": "The central atrium creates a sense of openness and facilitates natural ventilation throughout the building."
    }
  ]'::jsonb
);

-- Insert sample data for design board
INSERT INTO design_board (title, category, image, description) VALUES
('Material Palette', 'Materials', '/images/modern-villa.jpg', 'Natural stone, wood, and glass combinations'),
('Color Schemes', 'Colors', '/images/interior-design.jpg', 'Earthy tones with contemporary accents'),
('Lighting Concepts', 'Lighting', '/images/hotel-lobby.jpg', 'Natural and artificial lighting integration'),
('Texture Studies', 'Textures', '/images/sustainable-building.jpg', 'Rough and smooth surface combinations'),
('Spatial Flow', 'Layout', '/images/cultural-center.jpg', 'Open plan concepts with defined zones'),
('Green Integration', 'Landscape', '/images/corporate-building.jpg', 'Indoor-outdoor living connections');

-- Insert sample data for instagram posts
INSERT INTO instagram_posts (image, likes, comments, post_link, post_date, caption) VALUES
('/images/instagram-1.jpg', 245, 12, 'https://instagram.com/p/example1', '2024-01-15', 'Contemporary villa design with clean lines and natural materials. #architecture #design #villa #hariomjangidarchitects'),
('/images/instagram-2.jpg', 189, 8, 'https://instagram.com/p/example2', '2024-01-12', 'Urban planning project showcasing sustainable development principles. #urbanplanning #sustainability #architecture'),
('/images/instagram-4.jpg', 156, 6, 'https://instagram.com/p/example4', '2024-01-08', 'Green building design incorporating renewable energy solutions. #greenbuilding #sustainable #architecture'),
('/images/instagram-5.jpg', 278, 15, 'https://instagram.com/p/example5', '2024-01-05', 'Luxury residential complex with integrated community spaces. #residential #luxury #community #pool');
