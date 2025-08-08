-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  year VARCHAR(10) NOT NULL,
  area VARCHAR(100),
  architect VARCHAR(255) DEFAULT 'Hariom Jangid',
  photographer VARCHAR(255),
  client VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Completed',
  hero_image TEXT,
  description TEXT,
  images TEXT[], -- Array of image URLs
  content JSONB, -- Array of content blocks
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

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  image TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  year VARCHAR(10) NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'award', 'certification', 'publication'
  icon VARCHAR(50) DEFAULT 'Award', -- Icon name for display
  description TEXT,
  image TEXT,
  certificate_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  journal VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  author VARCHAR(255) DEFAULT 'Hariom Jangid',
  image TEXT,
  description TEXT,
  link TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for projects
INSERT INTO projects (title, subtitle, category, location, year, area, photographer, client, hero_image, description, images, content) VALUES
('Modern Villa Complex', 'Sustainable luxury living', 'Residential', 'Mumbai, India', '2023', '2,500 m²', 'Architectural Photography Co.', 'Private Client', '/images/modern-villa.jpg', 'A contemporary residential complex that seamlessly blends modern architecture with sustainable design principles.', ARRAY['/images/modern-villa.jpg', '/images/interior-design.jpg'], '[{"type": "text", "content": "This modern villa complex represents the pinnacle of contemporary residential design."}, {"type": "image", "src": "/images/modern-villa.jpg", "caption": "Exterior view of the villa complex"}]'::jsonb),
('Corporate Headquarters', 'Innovation in workspace design', 'Commercial', 'Bangalore, India', '2022', '5,000 m²', 'Urban Lens Studio', 'Tech Solutions Ltd.', '/images/corporate-building.jpg', 'A state-of-the-art corporate headquarters designed to foster creativity and collaboration.', ARRAY['/images/corporate-building.jpg', '/images/interior-design.jpg'], '[{"type": "text", "content": "The corporate headquarters features open-plan offices and collaborative spaces."}, {"type": "image", "src": "/images/corporate-building.jpg", "caption": "Main entrance and facade"}]'::jsonb),
('Cultural Center', 'Preserving heritage through design', 'Public', 'Delhi, India', '2021', '3,200 m²', 'Heritage Photography', 'Delhi Municipal Corporation', '/images/cultural-center.jpg', 'A cultural center that celebrates local heritage while providing modern amenities.', ARRAY['/images/cultural-center.jpg'], '[{"type": "text", "content": "The cultural center serves as a bridge between tradition and modernity."}]'::jsonb),
('Luxury Hotel', 'Hospitality redefined', 'Hospitality', 'Goa, India', '2023', '8,000 m²', 'Hospitality Focus', 'Resort Group International', '/images/hotel-lobby.jpg', 'A luxury hotel that offers guests an immersive experience in contemporary design.', ARRAY['/images/hotel-lobby.jpg'], '[{"type": "text", "content": "Every space in the hotel is designed to create memorable experiences for guests."}]'::jsonb),
('Sustainable Office Building', 'Green architecture at its finest', 'Sustainable', 'Chennai, India', '2022', '4,500 m²', 'Green Building Photography', 'Eco Corp', '/images/sustainable-building.jpg', 'An office building that sets new standards for sustainable commercial architecture.', ARRAY['/images/sustainable-building.jpg'], '[{"type": "text", "content": "This building achieves net-zero energy consumption through innovative design."}]'::jsonb);

-- Insert sample data for design_board
INSERT INTO design_board (title, category, image, description) VALUES
('Natural Stone Textures', 'Materials', '/images/instagram-1.jpg', 'Exploring the beauty of natural stone in contemporary architecture'),
('Warm Color Palette', 'Colors', '/images/instagram-2.jpg', 'Earth tones that create inviting and comfortable spaces'),
('Ambient Lighting Design', 'Lighting', '/images/instagram-4.jpg', 'Strategic lighting that enhances architectural features'),
('Minimalist Layout', 'Layout', '/images/instagram-5.jpg', 'Clean lines and open spaces for modern living'),
('Sustainable Materials', 'Materials', '/images/publication-1.jpg', 'Eco-friendly materials for responsible architecture'),
('Garden Integration', 'Landscape', '/images/publication-2.jpg', 'Seamless integration of indoor and outdoor spaces');

-- Insert sample data for instagram_posts
INSERT INTO instagram_posts (image, likes, comments, post_link, post_date, caption) VALUES
('/images/instagram-1.jpg', 1250, 45, 'https://instagram.com/p/example1', '2024-01-15', 'Natural textures meet modern design in our latest residential project. #architecture #design'),
('/images/instagram-2.jpg', 980, 32, 'https://instagram.com/p/example2', '2024-01-10', 'Warm earth tones create a welcoming atmosphere in this contemporary home. #interiordesign'),
('/images/instagram-4.jpg', 1450, 67, 'https://instagram.com/p/example3', '2024-01-05', 'Strategic lighting transforms spaces throughout the day. #architecturallighting'),
('/images/instagram-5.jpg', 1100, 28, 'https://instagram.com/p/example4', '2023-12-28', 'Minimalist design principles create serene living spaces. #minimalism #architecture');

-- Insert sample data for testimonials
INSERT INTO testimonials (name, role, company, image, rating, text, featured) VALUES
('Rajesh Kumar', 'CEO', 'Tech Solutions Mumbai', '/placeholder-user.jpg', 5, 'Hariom Jangid Architects transformed our vision into reality. Their attention to detail and innovative approach resulted in a workspace that truly reflects our company culture.', true),
('Priya Sharma', 'Homeowner', 'Delhi', '/placeholder-user.jpg', 5, 'Working with this team was an absolute pleasure. They created our dream home while staying within budget and timeline. The sustainable features are exactly what we wanted.', true),
('Dr. Amit Patel', 'Hospital Director', 'Bangalore Medical Center', '/placeholder-user.jpg', 5, 'The healthcare facility they designed for us is both functional and beautiful. Patient feedback has been overwhelmingly positive about the calming and modern environment.', true),
('Sarah Johnson', 'Interior Designer', 'Design Studio International', '/placeholder-user.jpg', 5, 'Collaborating with Hariom Jangid Architects was seamless. Their understanding of space and light is exceptional, and they bring creativity to every project.', false),
('Michael Chen', 'Real Estate Developer', 'Urban Properties Ltd', '/placeholder-user.jpg', 4, 'Professional, reliable, and innovative. They delivered our commercial project on time and exceeded our expectations in terms of design quality.', false);

-- Insert sample data for achievements
INSERT INTO achievements (title, organization, year, category, icon, description, featured) VALUES
('Best Emerging Architect 2015', 'Indian Institute of Architects', '2015', 'award', 'Award', 'Recognized for innovative design approach and sustainable architecture practices in residential and commercial projects.', true),
('Sustainable Design Excellence', 'Green Building Council of India', '2018', 'award', 'Trophy', 'Awarded for outstanding contribution to green building design and implementation of eco-friendly construction practices.', true),
('Architectural Innovation Award', 'National Architecture Awards', '2020', 'award', 'Star', 'Honored for revolutionary approach to contemporary residential architecture and integration of smart building technologies.', true),
('Excellence in Commercial Design', 'Commercial Architecture Society', '2021', 'award', 'Medal', 'Recognized for exceptional commercial building design and space optimization in corporate environments.', true),
('LEED Accredited Professional', 'U.S. Green Building Council', '2017', 'certification', 'Medal', 'Certified professional in Leadership in Energy and Environmental Design, specializing in sustainable building practices.', false),
('Certified Sustainable Designer', 'International Sustainable Design Council', '2019', 'certification', 'Medal', 'Advanced certification in sustainable design principles and green building methodologies.', false),
('Featured in Architectural Digest India', 'Architectural Digest India', '2022', 'publication', 'Star', 'Cover story featuring sustainable residential design and innovative architectural solutions.', false),
('International Design Recognition', 'World Architecture Community', '2023', 'award', 'Trophy', 'Global recognition for innovative sustainable architecture solutions and contribution to international design standards.', true);

-- Insert sample data for publications
INSERT INTO publications (title, journal, date, author, image, description, link, featured) VALUES
('Sustainable Architecture in Urban Planning', 'Architectural Review India', '2023-03-15', 'Hariom Jangid', '/images/publication-1.jpg', 'An in-depth analysis of sustainable design principles and their implementation in modern urban architecture.', '#', true),
('Contemporary Design Trends', 'Design Today', '2023-01-20', 'Hariom Jangid', '/images/publication-2.jpg', 'Exploring the evolution of contemporary architectural design and its impact on modern living spaces.', '#', true),
('Green Building Technologies', 'Eco Architecture Quarterly', '2022-11-10', 'Hariom Jangid', '/images/publication-3.jpg', 'Research on innovative green building technologies and their practical applications in construction.', '#', false),
('The Future of Residential Design', 'Home & Design Magazine', '2023-06-05', 'Hariom Jangid', '/images/modern-villa.jpg', 'Examining emerging trends in residential architecture and their impact on lifestyle and sustainability.', '#', true),
('Commercial Architecture Innovation', 'Business Architecture Review', '2023-04-12', 'Hariom Jangid', '/images/corporate-building.jpg', 'How innovative commercial architecture is reshaping the modern workplace environment.', '#', false);
