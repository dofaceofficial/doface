-- ==========================================
-- DOFACE HUB - SEED PRODUCTS
-- Run this in the Supabase SQL Editor
-- ==========================================

INSERT INTO public.products (
  name, slug, description, size, base_price, agent_price, sub_agent_price, reseller_price, dropshipper_price, points_reward, image_url, stock, is_active
) VALUES 
(
  'Paket Lengkap 3-in-1', 
  'paket-lengkap', 
  'Dapatkan rangkaian perawatan lengkap Doface dengan harga lebih hemat. Solusi paripurna untuk kulit cerah dan glowing maksimal setiap hari!', 
  'Facewash + Day Cream + Night Cream', 
  335000, 
  217750, -- Diskon 35%
  251250, -- Diskon 25%
  284750, -- Diskon 15%
  300000, -- Margin Dropshipper Rp35k
  1,      -- Dapat 1 poin per paket
  'bundle', 
  1000, 
  true
),
(
  'Refreshing Facewash', 
  'refreshing-facewash', 
  'Pembersih wajah lembut yang mengangkat kotoran & minyak berlebih tanpa membuat kulit kering.', 
  '100ml / 3.4 FL.OZ', 
  100000, 
  65000, 
  75000, 
  85000, 
  90000, 
  0, 
  '/Isi/facewash.png', 
  1000, 
  true
),
(
  'Glow Day Cream', 
  'glow-day-cream', 
  'Pelembab siang hari dengan SPF untuk melindungi paparan kulit dari paparan sinar UV dan polusi.', 
  '10g', 
  100000, 
  65000, 
  75000, 
  85000, 
  90000, 
  0, 
  '/Isi/daycream.png', 
  1000, 
  true
),
(
  'Collagen Night Cream', 
  'collagen-night-cream', 
  'Krim malam yang bekerja optimal saat tidur untuk regenerasi sel kulit dan mencerahkan', 
  '10g', 
  150000, 
  97500, 
  112500, 
  127500, 
  135000, 
  0, 
  '/Isi/nightcream.png', 
  1000, 
  true
);
