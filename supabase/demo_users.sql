-- ==========================================
-- DOFACE HUB - DEMO USERS SEEDER
-- Run this in the Supabase SQL Editor
-- ==========================================

-- Pastikan extension pgcrypto aktif untuk enkripsi password
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  agen_id uuid := gen_random_uuid();
  affiliate_id uuid := gen_random_uuid();
  product_paket_id uuid;
  product_facewash_id uuid;
  order_id_1 uuid := gen_random_uuid();
  order_id_2 uuid := gen_random_uuid();
BEGIN

  -- 1. Buat User Admin (admin@doface.com / password123)
  INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
  VALUES (admin_id, '00000000-0000-0000-0000-000000000000', 'admin@doface.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Admin Utama"}', false, 'authenticated');

  -- 2. Buat User Agen (agen@doface.com / password123)
  INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
  VALUES (agen_id, '00000000-0000-0000-0000-000000000000', 'agen@doface.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Budi (Agen Resmi)"}', false, 'authenticated');

  -- 3. Buat User Affiliate (affiliate@doface.com / password123)
  INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
  VALUES (affiliate_id, '00000000-0000-0000-0000-000000000000', 'affiliate@doface.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Siti (Affiliator)"}', false, 'authenticated');

  -- Catatan: Trigger handle_new_user() sudah otomatis membuatkan baris di public.profiles untuk 3 user di atas dengan role 'customer'.
  
  -- Update role, points, dan commissions mereka
  UPDATE public.profiles SET role = 'admin' WHERE id = admin_id;
  UPDATE public.profiles SET role = 'agen', points = 150 WHERE id = agen_id;
  UPDATE public.profiles SET role = 'affiliate', total_commission = 1500000 WHERE id = affiliate_id;

  -- Ambil ID Produk untuk dibuatkan riwayat order (Ambil 2 produk)
  SELECT id INTO product_paket_id FROM public.products WHERE slug = 'paket-lengkap' LIMIT 1;
  SELECT id INTO product_facewash_id FROM public.products WHERE slug = 'refreshing-facewash' LIMIT 1;

  -- Buat Riwayat Order untuk Agen (2 Order: 1 Selesai/Shipped, 1 Pending)
  IF product_paket_id IS NOT NULL AND product_facewash_id IS NOT NULL THEN
    
    -- Order 1: Sudah Selesai (Shipped)
    INSERT INTO public.orders (id, user_id, customer_name, customer_phone, shipping_address, total_amount, status, created_at)
    VALUES (order_id_1, agen_id, 'Budi (Agen Resmi)', '081234567890', 'Jl. Sudirman No 1', (217750 * 5), 'shipped', now() - interval '2 days');
    
    INSERT INTO public.order_items (order_id, product_id, quantity, price_at_time)
    VALUES (order_id_1, product_paket_id, 5, 217750);

    -- Order 2: Menunggu Pembayaran (Pending)
    INSERT INTO public.orders (id, user_id, customer_name, customer_phone, shipping_address, total_amount, status, created_at)
    VALUES (order_id_2, agen_id, 'Budi (Agen Resmi)', '081234567890', 'Jl. Sudirman No 1', (65000 * 10), 'pending', now() - interval '2 hours');
    
    INSERT INTO public.order_items (order_id, product_id, quantity, price_at_time)
    VALUES (order_id_2, product_facewash_id, 10, 65000);

  END IF;

END $$;
